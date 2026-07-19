/* ===================================================================
   Ashvin Beauty & Silai Ghar — Shared data layer (Hindi content)
   =================================================================== */

const STORE_KEY = "asbg_store_v1";

const DEFAULT_DATA = {
  products: [
    { id:"bl-001", cat:"blouse", name:"जरी बॉर्डर सिल्क ब्लाउज़", price:650, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", desc:"हाथ से बने जरी बॉर्डर वाला रिच सिल्क ब्लाउज़, प्रिंसेस कट, पूरी तरह लाइन किया हुआ।", tag:"बेस्टसेलर" },
    { id:"bl-002", cat:"blouse", name:"डिज़ाइनर बोट नेक ब्लाउज़", price:550, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600&q=80", desc:"पीछे टाई-अप के साथ ट्रेंडी बोट नेक, सिल्क और कॉटन साड़ी के लिए बिल्कुल सही।", tag:"नया" },
    { id:"bl-003", cat:"blouse", name:"सिंपल कॉटन ब्लाउज़", price:350, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80", desc:"रोज़ पहनने के लिए आरामदायक ब्लाउज़, हल्का कॉटन कपड़ा, साफ फिनिशिंग।", tag:"" },
    { id:"bl-004", cat:"blouse", name:"ब्राइडल हैवी वर्क ब्लाउज़", price:1200, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1610190586974-6b9a387d0c7e?w=600&q=80", desc:"शादी के लिए हैवी हैंड एम्ब्रॉयडरी ब्लाउज़, आपके नाप के हिसाब से बनाया जाता है।", tag:"प्रीमियम" },
    { id:"pt-001", cat:"petticoat", name:"कॉटन शेपवियर पेटीकोट", price:250, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1617952385804-33a8a4b7645a?w=600&q=80", desc:"सॉफ्ट कॉटन पेटीकोट, एडजस्टेबल नाड़ा, सभी साइज़ में उपलब्ध।", tag:"बेस्टसेलर" },
    { id:"pt-002", cat:"petticoat", name:"सैटिन फ्लेयर पेटीकोट", price:320, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1591369822093-a0e1a5c8c6c6?w=600&q=80", desc:"साड़ी की परफेक्ट ड्रेप के लिए सिल्की सैटिन फॉल, बिना सिलवट के।", tag:"" },
    { id:"pt-003", cat:"petticoat", name:"शेपवियर पेटीकोट (स्ट्रेच)", price:400, unit:"प्रति नग", img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80", desc:"4-वे स्ट्रेच कपड़ा जो साड़ी की प्लीट्स को परफेक्ट शेप में रखता है।", tag:"नया" },
    { id:"bp-001", cat:"beauty", name:"ब्राइडल मेकअप पैकेज", price:3500, unit:"प्रति सेवा", img:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", desc:"HD ब्राइडल मेकअप, हेयरस्टाइल, साड़ी ड्रेपिंग और टच-अप किट शामिल।", tag:"प्रीमियम" },
    { id:"bp-002", cat:"beauty", name:"पार्टी मेकअप", price:1200, unit:"प्रति सेवा", img:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80", desc:"किसी भी occasion के लिए आई और लिप स्टाइलिंग के साथ फुल फेस पार्टी मेकअप।", tag:"बेस्टसेलर" },
    { id:"bp-003", cat:"beauty", name:"फेशियल और क्लीनअप", price:500, unit:"प्रति सेवा", img:"https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=80", desc:"चमकती और तरोताज़ा त्वचा के लिए डीप क्लींजिंग फेशियल।", tag:"" },
    { id:"bp-004", cat:"beauty", name:"हेयर स्टाइलिंग और स्पा", price:600, unit:"प्रति सेवा", img:"https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80", desc:"ब्लो-ड्राई, स्टाइलिंग और पोषण देने वाला हेयर स्पा ट्रीटमेंट।", tag:"" },
    { id:"bp-005", cat:"beauty", name:"वैक्सिंग और थ्रेडिंग", price:300, unit:"प्रति सेवा", img:"https://images.unsplash.com/photo-1614108988205-1e46e26a26a7?w=600&q=80", desc:"फुल आर्म्स और लेग्स वैक्सिंग के साथ आईब्रो थ्रेडिंग।", tag:"" },
    { id:"bp-006", cat:"beauty", name:"मेहंदी (ब्राइडल)", price:1500, unit:"प्रति सेवा", img:"https://images.unsplash.com/photo-1594736797933-d0cce0b1c34d?w=600&q=80", desc:"हाथों और पैरों के लिए बारीक ब्राइडल मेहंदी डिज़ाइन।", tag:"नया" }
  ],
  orders: [],
  reviews: [
    { name:"प्रिया शर्मा", loc:"खैरा", rating:5, text:"ब्लाउज़ की फिटिंग बिल्कुल परफेक्ट थी, बहुत जल्दी मिल गया। इलाके का सबसे अच्छा सिलाई घर!" },
    { name:"अंजलि वर्मा", loc:"सराय दुर्गा दास", rating:5, text:"ब्राइडल मेकअप एकदम सुंदर किया था, सबने तारीफ की। हाइली रिकमेंडेड।" },
    { name:"सुनीता देवी", loc:"खैरा", rating:4, text:"पेटीकोट का फॉल बहुत अच्छा है, साड़ी परफेक्टली सेट हो जाती है।" },
    { name:"रेखा सिंह", loc:"राम जानकी मंदिर के पास", rating:5, text:"होम डिलीवरी सिर्फ ₹10 में, बहुत सुविधाजनक है। क्वालिटी भी ज़बरदस्त।" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=500&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0cce0b1c34d?w=500&q=80"
  ]
};

const BIZ = {
  name: "अश्विन ब्यूटी एंड सिलाई घर",
  tagline: "आपकी खूबसूरती, हमारा स्टाइल",
  phone: "8948247366",
  whatsapp: "918948247366",
  address: "सराय दुर्गा दास, खैरा, राम जानकी मंदिर के पास",
  deliveryFee: 10
};

function loadStore(){
  let raw = localStorage.getItem(STORE_KEY);
  if(!raw){
    localStorage.setItem(STORE_KEY, JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  try{
    let parsed = JSON.parse(raw);
    if(!parsed.products) parsed.products = DEFAULT_DATA.products;
    if(!parsed.orders) parsed.orders = [];
    if(!parsed.reviews) parsed.reviews = DEFAULT_DATA.reviews;
    if(!parsed.gallery) parsed.gallery = DEFAULT_DATA.gallery;
    return parsed;
  }catch(e){
    localStorage.setItem(STORE_KEY, JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveStore(store){
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function uid(prefix){
  return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}

function waLink(number, text){
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
}

function money(n){
  return "₹" + Number(n).toLocaleString("en-IN");
}
