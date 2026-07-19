(function(){
  const store = loadStore();
  let activeCat = "all";
  let searchTerm = "";

  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2600);
  }

  function productCard(p){
    const tagHtml = p.tag ? `<span class="product-tag">${p.tag}</span>` : "";
    return `
    <div class="product-card" data-id="${p.id}" data-name="${p.name.toLowerCase()}" data-cat="${p.cat}">
      <div class="product-img">${tagHtml}<img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="product-price"><span class="amt">${money(p.price)}</span><span class="unit">${p.unit}</span></div>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="openOrderModal('${p.id}')">अभी ऑर्डर करें</button>
          <a href="tel:+${BIZ.phone}" class="btn btn-outline icon-only" title="अभी कॉल करें" aria-label="अभी कॉल करें">📞</a>
          <a href="${waLink(BIZ.whatsapp, 'नमस्ते, मुझे यह ऑर्डर करना है: ' + p.name + ' (' + money(p.price) + ')')}" target="_blank" rel="noopener" class="btn btn-whatsapp icon-only" title="व्हाट्सएप करें" aria-label="व्हाट्सएप करें">💬</a>
        </div>
      </div>
    </div>`;
  }

  function renderGrids(){
    const cats = ["blouse","petticoat","beauty"];
    cats.forEach(cat => {
      const el = document.getElementById('grid-' + cat);
      if(!el) return;
      const items = store.products.filter(p => p.cat === cat);
      const filtered = items.filter(p => {
        const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || p.desc.toLowerCase().includes(searchTerm);
        const matchesCat = activeCat === "all" || activeCat === cat;
        return matchesSearch && matchesCat;
      });
      if(filtered.length === 0){
        el.innerHTML = `<div class="no-results">इस श्रेणी में${searchTerm ? ' "' + searchTerm + '" के लिए' : ''} कोई आइटम नहीं मिला।</div>`;
      } else {
        el.innerHTML = filtered.map(productCard).join("");
      }
      const section = el.closest('section');
      if(activeCat !== "all" && activeCat !== cat){
        section.style.display = "none";
      } else {
        section.style.display = "";
      }
    });
  }

  document.getElementById('searchInput').addEventListener('input', e => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderGrids();
  });
  document.getElementById('filterChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if(!chip) return;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCat = chip.dataset.cat;
    renderGrids();
  });

  function renderReviews(){
    const track = document.getElementById('reviewTrack');
    track.innerHTML = store.reviews.map(r => `
      <div class="review-card">
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
        <p>"${r.text}"</p>
        <div class="reviewer">
          <div class="reviewer-avatar">${r.name.charAt(0)}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-loc">${r.loc}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderGallery(){
    const g = document.getElementById('galleryGrid');
    g.innerHTML = store.gallery.map(src => `<img src="${src}" alt="अश्विन ब्यूटी एंड सिलाई घर के काम का नमूना" loading="lazy">`).join("");
  }

  document.getElementById('faqList').addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if(!q) return;
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });

  const ordCategory = document.getElementById('ordCategory');
  const ordItem = document.getElementById('ordItem');
  function populateItemDropdown(){
    const items = store.products.filter(p => p.cat === ordCategory.value);
    ordItem.innerHTML = items.map(p => `<option value="${p.id}">${p.name} — ${money(p.price)}</option>`).join("");
  }
  ordCategory.addEventListener('change', populateItemDropdown);
  populateItemDropdown();

  function saveOrder(order){
    store.orders.unshift(order);
    saveStore(store);
  }

  document.getElementById('orderForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('ordName').value;
    const phone = document.getElementById('ordPhone').value;
    const catVal = ordCategory.value;
    const itemId = ordItem.value;
    const product = store.products.find(p => p.id === itemId);
    const qty = document.getElementById('ordQty').value;
    const delivery = document.getElementById('ordDelivery').value;
    const address = document.getElementById('ordAddress').value;
    const note = document.getElementById('ordNote').value;
    const deliveryFee = delivery === 'delivery' ? BIZ.deliveryFee : 0;
    const total = product ? (product.price * qty) + deliveryFee : deliveryFee;

    const order = {
      id: uid('ord'),
      date: new Date().toISOString(),
      name, phone,
      item: product ? product.name : catVal,
      itemId, category: catVal, qty, delivery, address, note,
      amount: total,
      status: "Pending"
    };
    saveOrder(order);

    const text = `नया ऑर्डर — अश्विन ब्यूटी एंड सिलाई घर\n`
      + `नाम: ${name}\nफोन: ${phone}\n`
      + `आइटम: ${order.item}\nमात्रा: ${qty}\n`
      + `डिलीवरी: ${delivery === 'delivery' ? 'होम डिलीवरी (+₹10)' : 'खुद आकर लेंगे'}\n`
      + (address ? `पता: ${address}\n` : "")
      + (note ? `नोट: ${note}\n` : "")
      + `अनुमानित कुल राशि: ${money(total)}`;

    window.open(waLink(BIZ.whatsapp, text), '_blank');
    showToast('ऑर्डर सेव हो गया — व्हाट्सएप खुल रहा है ✓');
    this.reset();
    populateItemDropdown();
  });

  let modalProduct = null;
  const modalOverlay = document.getElementById('modalOverlay');

  window.openOrderModal = function(productId){
    modalProduct = store.products.find(p => p.id === productId);
    if(!modalProduct) return;
    document.getElementById('modalProduct').innerHTML = `
      <img src="${modalProduct.img}" alt="${modalProduct.name}">
      <div>
        <h3 style="font-size:16px;margin-bottom:4px;">${modalProduct.name}</h3>
        <span class="amt">${money(modalProduct.price)}</span> <span style="font-size:12px;color:var(--grey);">${modalProduct.unit}</span>
      </div>`;
    modalOverlay.classList.add('open');
  };

  document.getElementById('modalClose').addEventListener('click', () => modalOverlay.classList.remove('open'));
  modalOverlay.addEventListener('click', e => { if(e.target === modalOverlay) modalOverlay.classList.remove('open'); });

  document.getElementById('quickOrderForm').addEventListener('submit', function(e){
    e.preventDefault();
    if(!modalProduct) return;
    const name = document.getElementById('qName').value;
    const phone = document.getElementById('qPhone').value;
    const qty = document.getElementById('qQty').value;
    const delivery = document.getElementById('qDelivery').value;
    const note = document.getElementById('qNote').value;
    const deliveryFee = delivery === 'delivery' ? BIZ.deliveryFee : 0;
    const total = (modalProduct.price * qty) + deliveryFee;

    const order = {
      id: uid('ord'),
      date: new Date().toISOString(),
      name, phone,
      item: modalProduct.name,
      itemId: modalProduct.id, category: modalProduct.cat, qty, delivery, address:"", note,
      amount: total,
      status: "Pending"
    };
    saveOrder(order);

    const text = `नया ऑर्डर — अश्विन ब्यूटी एंड सिलाई घर\n`
      + `नाम: ${name}\nफोन: ${phone}\n`
      + `आइटम: ${modalProduct.name}\nमात्रा: ${qty}\n`
      + `डिलीवरी: ${delivery === 'delivery' ? 'होम डिलीवरी (+₹10)' : 'खुद आकर लेंगे'}\n`
      + (note ? `नोट: ${note}\n` : "")
      + `अनुमानित कुल राशि: ${money(total)}`;

    window.open(waLink(BIZ.whatsapp, text), '_blank');
    showToast('ऑर्डर सेव हो गया — व्हाट्सएप खुल रहा है ✓');
    this.reset();
    modalOverlay.classList.remove('open');
  });

  renderGrids();
  renderReviews();
  renderGallery();
})();
