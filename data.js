// Monu Mobile Solution - Database, Translations & Default Seeds
window.MMS_DATA = {
  storeInfo: {
    name: "Monu Mobile Solution",
    tagline: "Express Mobile Repair Lab & Retail POS",
    city: "Hazratganj, Lucknow",
    phone: "7905859701",
    whatsapp: "917905859701",
    email: "monumobilesolution@gmail.com",
    address: "216, 2nd Floor, Sree Rama Towers, Ashok Marg, Sadullah Nagar, Narhi, Hazratganj, Lucknow, Uttar Pradesh 226001",
    timings: "10:30 AM - 08:30 PM (सोमवार - रविवार)",
    mapsUrl: "https://maps.google.com/?q=Sree+Rama+Towers+Ashok+Marg+Hazratganj+Lucknow",
    instagramHandle: "@monumobilesolution",
    instagramUrl: "https://instagram.com"
  },

  // Role Credentials (Real Working Accounts - 3 Accounts Only)
  users: [
    { phone: "7905859701", pass: "Mms@859701", role: "admin", name: "मोनू जी (Monu - Owner)", branchId: "all" },
    { phone: "9988772211", pass: "Mms@772211", role: "manager", name: "सूरज वर्मा (Suraj - Manager)", branchId: "branch_hazratganj" },
    { phone: "9955443311", pass: "Mms@443311", role: "technician", name: "रवि कुमार (Ravi - Tech Staff)", branchId: "branch_hazratganj" }
  ],

  // Bilingual Localization
  translations: {
    hi: {
      topTagline: "🏢 3 एक्सप्रेस लैब्स: हजरतगंज, नाका हिंडोला (लखनऊ) व कन्नौज",
      topAddress: "🏢 3 एक्सप्रेस लैब्स: हजरतगंज, नाका हिंडोला (लखनऊ) व कन्नौज",
      topTimings: "⏰ लखनऊ: 12:00 PM - 09:00 PM • कन्नौज: 10:00 AM - 06:00 PM",
      loginPortal: "लॉगिन",
      staffLogin: "लॉगिन",
      navHome: "होम",
      navServices: "सर्विसेज",
      navEstimate: "खर्च कैलकुलेटर",
      navTrack: "स्टेटस ट्रैकर",
      navInsta: "इंस्टाग्राम",
      navContact: "दुकान का पता",
      callUs: "7905859701",
      whatsappUs: "व्हाट्सएप करें",

      heroBadge: "हजरतगंज, लखनऊ का #1 भरोसेमंद एक्सप्रेस मोबाइल रिपेयरिंग लैब",
      heroHeading: "एक्सप्रेस मोबाइल रिपेयर • 100% ओरिजिनल पार्ट्स",
      heroSubheading: "एक्सप्रेस मोबाइल रिपेयरिंग लैब • 100% ओरिजिनल स्पेयर पार्ट्स • नो फिक्स नो फीस • अनुभवी इंजीनियर्स",
      estimateCostBtn: "रिपेयर खर्च चेक करें",
      trackRepairBtn: "रिपेयर स्टेटस ट्रैक करें",

      statRepairs: "15,000+ सफल रिपेयर",
      statRepairsSub: "हजरतगंज व लखनऊ में",
      statSpeed: "सुपरफास्ट",
      statSpeedSub: "एक्सप्रेस सर्विस",
      statRating: "4.9 ★",
      statRatingSub: "गूगल कस्टमर रेटिंग",
      statExp: "10+ वर्ष",
      statExpSub: "अनुभवी इंजीनियर्स",

      servicesBadge: "All-in-One Solutions",
      servicesTitle: "हमारी प्रीमियम एक्सप्रेस रिपेयरिंग सेवाएं",
      servicesDesc: "हमारे पास आधुनिक OCA लेमिनेशन मशीन, 4K माइक्रोस्कोप, थर्मल कैमरा और अनुभवी टेक्नीशियन उपलब्ध हैं।",
      
      servScreen: "डिस्प्ले व केवल ग्लास चेंज",
      servScreenDesc: "ओरिजिनल कॉम्बो, सिर्फ टच ग्लास चेंज और बिना बबल OCA लेमिनेशन तकनीक।",
      servScreenBadge: "एक्सप्रेस सर्विस",
      servScreenTag: "एक्सप्रेस रिपेयर",

      servBattery: "बैटरी रिप्लेसमेंट",
      servBatteryDesc: "100% ओरिजिनल हाई-कैपेसिटी बैटरी और तुरंत लॉन्ग-लास्टिंग बैकअप।",
      servBatteryBadge: "फास्ट सर्विस",
      servBatteryTag: "फास्ट सर्विस",

      servMotherboard: "मदरबोर्ड IC लेवल रिपेयर",
      servMotherboardDesc: "डेड फोन, शॉर्टिंग, पावर IC, ऑडियो IC व CPU रिबॉलिंग स्पेशलिस्ट लैब।",
      servMotherboardBadge: "Micro-Soldering",
      servMotherboardTag: "एक्सप्रेस IC लैब",

      servWater: "वॉटर डैमेज रिकवरी",
      servWaterDesc: "पानी में गिरे फोन की अल्ट्रासोनिक क्लीनिंग और 95% डेटा सुरक्षित रिकवरी।",
      servWaterBadge: "Ultrasonic Clean",
      servWaterTag: "डेटा सेफ सर्विस",

      servCharging: "चार्जिंग जैक व पोर्ट रिपेयर",
      servChargingDesc: "फास्ट चार्जिंग सपोर्ट, ओरिजिनल सब-बोर्ड व माइक्रो-सोल्डरिंग फिक्स।",
      servChargingBadge: "Fast Charging",
      servChargingTag: "क्विक फिक्स",

      servSoftware: "सॉफ्टवेयर व अनलॉकिंग",
      servSoftwareDesc: "हैंग ऑन लोगो, फ्लैशिंग, डेटा बैकअप व लेटेस्ट OS अपडेट्स।",
      servSoftwareBadge: "Instant Solution",
      servSoftwareTag: "डेटा प्राइवेसी 100%",

      checkRateLink: "रेट चेक करें ↗",

      calcBadge: "Smart Price Tool",
      calcTitle: "तुरंत रिपेयर खर्च कैलकुलेटर (Instant Estimator)",
      calcDesc: "अपने मोबाइल का ब्रांड, मॉडल और समस्या चुनें और 1 सेकंड में अनुमानित खर्च जानें।",
      selectBrand: "मोबाइल ब्रांड चुनें",
      selectModel: "मॉडल चुनें",
      selectIssue: "समस्या चुनें",
      estimatedCostLabel: "अनुमानित खर्च",
      estimatedTimeLabel: "रिपेयरिंग समय",
      warrantyLabel: "सर्विस टाइप",
      bookOnWhatsApp: "व्हाट्सएप पर यह रिपेयर बुक करें",

      trackBadge: "Live Token Lookup",
      trackTitle: "लाइव रिपेयर स्टेटस ट्रैकर",
      trackDesc: "दुकान से मिली जॉब-शीट / टोकन नंबर (जैसे MMS-1001) या अपना मोबाइल नंबर दर्ज करें।",
      trackPlaceholder: "टोकन नंबर दर्ज करें (उदा. MMS-1001)...",
      checkStatusBtn: "स्टेटस चेक करें",
      trackGuideTitle: "💡 टोकन नंबर कैसे प्राप्त करें?",
      trackGuideDesc: "जब आप Monu Mobile Solution पर अपना फोन रिपेयर के लिए जमा करते हैं, तो आपको मिलने वाली जॉब रसीद पर 'टोकन नंबर' (उदा. MMS-1001) लिखा होता है। आप अपने रजिस्टर्ड मोबाइल नंबर से भी सीधे सर्च कर सकते हैं।",
      demoTokensHint: "डेमो चेक करने के लिए किसी एक पर क्लिक करें:",

      statusPending: "स्वीकार किया गया (जॉब कार्ड बना)",
      statusDiagnosing: "जांच एवं रिपेयरिंग चालू (In-Progress)",
      statusReady: "रिपेयरिंग पूरी (तैयार है, कलेक्ट करें)",
      statusDelivered: "हैंडओवर / डिलीवर हो चुका",

      instaTitle: "इंस्टाग्राम लाइव शोकेस",
      instaDesc: "हमारे हालिया रिपेयरिंग काम, असली पार्ट्स और लैब के लाइव अपडेट्स इंस्टाग्राम पर देखें।",
      followBtn: "फॉलो करें ↗",

      locBadge: "Visit Our Lab",
      locTitle: "दुकान पर पधारें - संपर्क सूत्र",
      locAddressTitle: "हमारा पूरा पता (हजरतगंज, लखनऊ)",
      locAddressText: "216, 2nd Floor, Sree Rama Towers, Ashok Marg, Sadullah Nagar, Narhi, Hazratganj, Lucknow, UP 226001",
      locAddressNote: "(हजरतगंज चौराहा और अशोक मार्ग के पास, श्री रामा टॉवर्स की दूसरी मंजिल)",
      locTimingsTitle: "खुलने का समय",
      locTimingsText: "10:30 AM - 08:30 PM",
      locTimingsSub: "रोजाना खुला (सोमवार - रविवार)",
      locContactTitle: "फ़ोन व व्हाट्सएप",
      locContactSub: "तुरंत सहायता",
      locDirectionsBtn: "Google Maps पर डायरेक्शन देखें",
      locInquiryBtn: "✍️ त्वरित इंक्वायरी फॉर्म",

      leadModalTitle: "त्वरित रिपेयर पूछताछ (Quick Repair Inquiry)",
      leadModalDesc: "सीधे हमारे व्हाट्सएप पर रिपेयर कोटेशन प्राप्त करें",
      leadName: "आपका नाम",
      leadPhone: "मोबाइल नंबर",
      leadDevice: "मोबाइल मॉडल",
      leadIssue: "क्या समस्या है?",
      sendOnWhatsAppBtn: "सीधे व्हाट्सएप पर भेजें",

      dockHome: "होम",
      dockServices: "सेवाएं",
      dockEstimate: "कैलकुलेटर",
      dockTrack: "स्टेटस",
      dockChat: "व्हाट्सएप"
    },

    en: {
      topTagline: "🏢 3 Express Labs: Hazratganj, Naka Hindola (Lucknow) & Kannauj",
      topAddress: "🏢 3 Express Labs: Hazratganj, Naka Hindola (Lucknow) & Kannauj",
      topTimings: "⏰ Lucknow: 12:00 PM - 09:00 PM • Kannauj: 10:00 AM - 06:00 PM",
      loginPortal: "Login",
      staffLogin: "Login",
      navHome: "Home",
      navServices: "Services",
      navEstimate: "Estimator",
      navTrack: "Tracker",
      navInsta: "Instagram",
      navContact: "Location",
      callUs: "7905859701",
      whatsappUs: "WhatsApp",

      heroBadge: "Hazratganj, Lucknow's #1 Trusted Express Mobile Repair Lab",
      heroHeading: "Express Mobile Repair • 100% Genuine Spare Parts",
      heroSubheading: "Express smartphone diagnostics and repair • 100% genuine spares • No Fix No Fee • Advanced tech lab in Hazratganj",
      estimateCostBtn: "Check Repair Cost",
      trackRepairBtn: "Track Repair Status",

      statRepairs: "15,000+ Repairs",
      statRepairsSub: "In Hazratganj & Lucknow",
      statSpeed: "Superfast",
      statSpeedSub: "Express Service",
      statRating: "4.9 ★",
      statRatingSub: "Google Reviews",
      statExp: "10+ Years",
      statExpSub: "Expert Techs",

      servicesBadge: "All-in-One Solutions",
      servicesTitle: "Our Premium Express Repair Services",
      servicesDesc: "Equipped with OCA lamination chambers, stereo microscopes, thermal cameras and certified technicians.",

      servScreen: "Display & Touch Glass Change",
      servScreenDesc: "Original AMOLED combo, only touch glass replacement and bubble-free OCA lamination.",
      servScreenBadge: "Express Service",
      servScreenTag: "Express Repair",

      servBattery: "Battery Replacement",
      servBatteryDesc: "100% genuine high-capacity battery for all iPhones and Android devices.",
      servBatteryBadge: "20 Mins Express",
      servBatteryTag: "Fast Service",

      servMotherboard: "Motherboard IC Level Repair",
      servMotherboardDesc: "Dead phones, short-circuits, Power IC, Audio IC & CPU reballing lab.",
      servMotherboardBadge: "Micro-Soldering",
      servMotherboardTag: "Express IC Lab",

      servWater: "Water Damage Recovery",
      servWaterDesc: "Ultrasonic cleaning and 95% data retention for liquid damaged smartphones.",
      servWaterBadge: "Ultrasonic Clean",
      servWaterTag: "Data Safe Service",

      servCharging: "Charging Port & Jack Fix",
      servChargingDesc: "Fast charging restoration, original sub-board soldering and jack replacements.",
      servChargingBadge: "Fast Charging",
      servChargingTag: "Quick Fix",

      servSoftware: "Software & Unlocking",
      servSoftwareDesc: "Logo hang fix, firmware flashing, safe data transfer and OS updates.",
      servSoftwareBadge: "Instant Solution",
      servSoftwareTag: "100% Data Safe",

      checkRateLink: "Check Rates ↗",

      calcBadge: "Smart Price Tool",
      calcTitle: "Instant Repair Price Estimator",
      calcDesc: "Select your smartphone brand, model and issue to get estimated pricing in 1 second.",
      selectBrand: "Select Brand",
      selectModel: "Select Model",
      selectIssue: "Select Issue",
      estimatedCostLabel: "Estimated Price",
      estimatedTimeLabel: "Turnaround Time",
      warrantyLabel: "Service Type",
      bookOnWhatsApp: "Book on WhatsApp",

      trackBadge: "Live Token Lookup",
      trackTitle: "Live Repair Status Tracker",
      trackDesc: "Enter the job token number given by the shop (e.g. MMS-1001) or customer mobile number.",
      trackPlaceholder: "Enter Job Token (e.g. MMS-1001)...",
      checkStatusBtn: "Check Status",
      trackGuideTitle: "💡 How to find your Token Number?",
      trackGuideDesc: "When you submit your phone for repair at Monu Mobile Solution, your job receipt contains a 'Token Number' (e.g. MMS-1001). You can also directly search with your registered mobile number.",
      demoTokensHint: "Click any demo token to test:",

      statusPending: "Received (Job Card Created)",
      statusDiagnosing: "Under Repair & Diagnostics",
      statusReady: "Repair Done! Ready for Pickup",
      statusDelivered: "Device Delivered to Customer",

      instaTitle: "Instagram Live Showcase",
      instaDesc: "Explore our recent smartphone repairs, genuine parts and live shop updates on Instagram.",
      followBtn: "Follow ↗",

      locBadge: "Visit Our Lab",
      locTitle: "Visit Our Store - Contact Details",
      locAddressTitle: "Full Address (Hazratganj, Lucknow)",
      locAddressText: "216, 2nd Floor, Sree Rama Towers, Ashok Marg, Sadullah Nagar, Narhi, Hazratganj, Lucknow, UP 226001",
      locAddressNote: "(Near Hazratganj Chauraha & Ashok Marg, 2nd Floor of Sree Rama Towers)",
      locTimingsTitle: "Store Timings",
      locTimingsText: "10:30 AM - 08:30 PM",
      locTimingsSub: "Open 7 Days (Mon - Sun)",
      locContactTitle: "Phone & WhatsApp",
      locContactSub: "Instant Assistance",
      locDirectionsBtn: "Get Directions on Google Maps",
      locInquiryBtn: "✍️ Quick Inquiry Form",

      leadModalTitle: "Quick Repair Inquiry",
      leadModalDesc: "Get an instant repair quote on WhatsApp directly",
      leadName: "Your Full Name",
      leadPhone: "Mobile Number",
      leadDevice: "Phone Model",
      leadIssue: "Describe Issue",
      sendOnWhatsAppBtn: "Send Inquiry on WhatsApp",

      dockHome: "Home",
      dockServices: "Services",
      dockEstimate: "Estimate",
      dockTrack: "Track",
      dockChat: "WhatsApp"
    }
  },

  // Expanded Repair Estimation Matrix (With Glass OCA, Combo, Speaker, IC)
  estimatorData: {
    brands: [
      {
        id: "apple",
        name: "Apple (iPhone)",
        models: ["iPhone 15 / 15 Pro", "iPhone 14 / 14 Pro", "iPhone 13 / 13 Pro", "iPhone 12 / 12 Mini", "iPhone 11", "iPhone XR / XS"],
        issues: {
          glass: { cost: "₹1,499 - ₹3,499", time: "30-40 Mins", warranty: "Express Repair", note: "सिर्फ ऊपर का ग्लास चेंज (ओरिजिनल डिस्प्ले सुरक्षित)" },
          screen: { cost: "₹3,499 - ₹8,999", time: "30-45 Mins", warranty: "Express Repair", note: "पूरा डिस्प्ले कॉम्बो / फोल्डर (TrueTone कॉपी)" },
          battery: { cost: "₹1,899 - ₹3,499", time: "25 Mins", warranty: "Express Repair", note: "100% Battery Health हाई कैपेसिटी" },
          charging: { cost: "₹1,199 - ₹1,999", time: "20 Mins", warranty: "Express Repair", note: "Lightning / Type-C ओरिजिनल पोर्ट चेंज" },
          backglass: { cost: "₹1,499 - ₹2,999", time: "40 Mins", warranty: "Express Repair", note: "लेजर मशीन बैक ग्लास रिप्लेसमेंट" },
          audio: { cost: "₹899 - ₹1,599", time: "20 Mins", warranty: "Express Repair", note: "इयर स्पीकर / लाउडस्पीकर / माइक चेंज" },
          motherboard: { cost: "₹2,499 - ₹5,999", time: "2-4 Hours", warranty: "Express Repair", note: "ऑडियो IC, पैनिक लॉग, पावर IC रिबॉलिंग" }
        }
      },
      {
        id: "samsung",
        name: "Samsung",
        models: ["Galaxy S24 / S23 Ultra", "Galaxy S22 / S21 FE", "Galaxy A54 / A53 / A52", "Galaxy M34 / M33", "Galaxy Z Flip / Fold"],
        issues: {
          glass: { cost: "₹999 - ₹2,899", time: "30 Mins", warranty: "Express Repair", note: "सिर्फ ऊपर का ग्लास चेंज (Super AMOLED सुरक्षित)" },
          screen: { cost: "₹2,499 - ₹9,499", time: "35 Mins", warranty: "Express Repair", note: "पूरा Super AMOLED 120Hz डिस्प्ले कॉम्बो" },
          battery: { cost: "₹1,299 - ₹2,199", time: "20 Mins", warranty: "Express Repair", note: "ओरिजिनल Samsung Li-ion बैटरी" },
          charging: { cost: "₹799 - ₹1,499", time: "20 Mins", warranty: "Express Repair", note: "ओरिजिनल 25W/45W सुपरफास्ट चार्जिंग सब-बोर्ड" },
          backglass: { cost: "₹899 - ₹1,799", time: "30 Mins", warranty: "Express Repair", note: "OEM गोरिल्ला ग्लास बैक पैनल" },
          audio: { cost: "₹699 - ₹1,199", time: "15 Mins", warranty: "Express Repair", note: "माइक / स्पीकर / कॉल आवाज समस्या" },
          motherboard: { cost: "₹1,999 - ₹4,499", time: "1-3 Hours", warranty: "Express Repair", note: "Exynos/Snapdragon पावर IC व चार्जिंग IC" }
        }
      },
      {
        id: "oneplus",
        name: "OnePlus",
        models: ["OnePlus 12 / 12R", "OnePlus 11 / 11R", "OnePlus 10 Pro / 10T", "OnePlus 9 / 9 Pro / 9R", "OnePlus Nord CE 3 / 2"],
        issues: {
          glass: { cost: "₹1,199 - ₹2,999", time: "35 Mins", warranty: "Express Repair", note: "कर्व्ड / फ्लैट ग्लास OCA चेंज (Fluid AMOLED सुरक्षित)" },
          screen: { cost: "₹3,199 - ₹7,499", time: "30 Mins", warranty: "Express Repair", note: "पूरा Fluid AMOLED डिस्प्ले कॉम्बो" },
          battery: { cost: "₹1,399 - ₹2,299", time: "25 Mins", warranty: "Express Repair", note: "ड्युअल-सेल 65W/80W Warp & SuperVOOC रेडी" },
          charging: { cost: "₹899 - ₹1,599", time: "20 Mins", warranty: "Express Repair", note: "SuperVOOC 100W फास्ट चार्जिंग फ्लेक्स" },
          backglass: { cost: "₹999 - ₹1,899", time: "30 Mins", warranty: "Express Repair", note: "फ्रॉस्टेड मैट AG ग्लास बैक पैनल" },
          audio: { cost: "₹699 - ₹1,299", time: "20 Mins", warranty: "Express Repair", note: "माइक / ईयरपीस / डॉल्बी स्पीकर रिपेयर" },
          motherboard: { cost: "₹2,199 - ₹4,999", time: "2 Hours", warranty: "Express Repair", note: "CPU रिबॉलिंग व क्रैश डंप समाधान" }
        }
      },
      {
        id: "xiaomi",
        name: "Xiaomi / Redmi / POCO",
        models: ["Redmi Note 13 / 12 Pro", "Redmi Note 11 / 10 Pro", "POCO X6 / X5 Pro", "POCO F5 / F4", "Xiaomi 13 / 12 Series"],
        issues: {
          glass: { cost: "₹699 - ₹1,499", time: "25 Mins", warranty: "Express Repair", note: "सिर्फ ऊपर का टच ग्लास चेंज (ओरिजिनल डिस्प्ले सेफ)" },
          screen: { cost: "₹1,499 - ₹3,899", time: "25 Mins", warranty: "Express Repair", note: "पूरा FHD+ AMOLED / IPS डिस्प्ले फोल्डर" },
          battery: { cost: "₹999 - ₹1,699", time: "20 Mins", warranty: "Express Repair", note: "5000mAh ओरिजिनल Li-Polymer बैटरी" },
          charging: { cost: "₹699 - ₹1,199", time: "15 Mins", warranty: "Express Repair", note: "67W/33W टर्बो चार्ज सब-बोर्ड" },
          backglass: { cost: "₹699 - ₹1,299", time: "25 Mins", warranty: "Express Repair", note: "OEM कैमरा लेंस व बैक पैनल" },
          audio: { cost: "₹499 - ₹899", time: "15 Mins", warranty: "Express Repair", note: "माइक / रिंगर / स्पीकर आवाज फिक्स" },
          motherboard: { cost: "₹1,499 - ₹3,499", time: "1-2 Hours", warranty: "Express Repair", note: "Snapdragon / MediaTek PMIC चिप रिपेयर" }
        }
      },
      {
        id: "vivo_oppo",
        name: "Vivo / Oppo / Realme",
        models: ["Vivo V29 / V27 / V25", "Oppo Reno 11 / 10 / 8", "Realme 12 / 11 / 10 Pro", "Vivo T2 / Y Series", "Realme Narzo Series"],
        issues: {
          glass: { cost: "₹799 - ₹1,799", time: "30 Mins", warranty: "Express Repair", note: "सिर्फ ऊपर का 3D कर्व्ड / फ्लैट ग्लास चेंज" },
          screen: { cost: "₹1,599 - ₹4,499", time: "30 Mins", warranty: "Express Repair", note: "पूरा कर्व्ड 3D AMOLED / फ्लैट कॉम्बो" },
          battery: { cost: "₹999 - ₹1,799", time: "20 Mins", warranty: "Express Repair", note: "हाई-कैपेसिटी फ्लैश-चार्ज बैटरी" },
          charging: { cost: "₹699 - ₹1,299", time: "15 Mins", warranty: "Express Repair", note: "FlashCharge / SuperVOOC कनेक्टर बोर्ड" },
          backglass: { cost: "₹799 - ₹1,399", time: "25 Mins", warranty: "Express Repair", note: "कलर चेंजिंग फेदर फिनिश बैक पैनल" },
          audio: { cost: "₹499 - ₹999", time: "15 Mins", warranty: "Express Repair", note: "माइक / ईयर स्पीकर रिपेयर" },
          motherboard: { cost: "₹1,699 - ₹3,999", time: "1-3 Hours", warranty: "Express Repair", note: "डिस्प्ले IC, कैमरा IC व पावर IC रिपेयर" }
        }
      }
    ]
  },

  // Pre-seeded SKU Inventory with comprehensive categories
  initialInventory: [
    { sku: "GLS-IP13-OCA", name: "iPhone 13 Touch Glass (OCA Grade A)", category: "Glass (केवल टच/ग्लास)", costPrice: 350, sellPrice: 1200, stock: 12, minStock: 3, unit: "Pcs" },
    { sku: "SCR-IP13-ORG", name: "iPhone 13 OLED Display Folder (OEM Premium)", category: "Screen (पूरा फोल्डर)", costPrice: 3200, sellPrice: 4800, stock: 4, minStock: 2, unit: "Pcs" },
    { sku: "GLS-SAM-S21", name: "Samsung S21 5G Curved Front Glass", category: "Glass (केवल टच/ग्लास)", costPrice: 400, sellPrice: 1400, stock: 8, minStock: 2, unit: "Pcs" },
    { sku: "SCR-SAM-S21-AMO", name: "Samsung Galaxy S21 AMOLED Combo", category: "Screen (पूरा फोल्डर)", costPrice: 3800, sellPrice: 5600, stock: 3, minStock: 2, unit: "Pcs" },
    { sku: "SCR-RN12-COM", name: "Redmi Note 12 Pro Display Folder", category: "Screen (पूरा फोल्डर)", costPrice: 1600, sellPrice: 2600, stock: 7, minStock: 3, unit: "Pcs" },
    { sku: "BAT-IP12-HP", name: "iPhone 12 High-Capacity Battery", category: "Battery (बैटरी)", costPrice: 1100, sellPrice: 1999, stock: 5, minStock: 2, unit: "Pcs" },
    { sku: "BAT-OP9-65W", name: "OnePlus 9 / 9R 4500mAh Dual-Cell Battery", category: "Battery (बैटरी)", costPrice: 1050, sellPrice: 1850, stock: 2, minStock: 3, unit: "Pcs" },
    { sku: "BAT-SAM-M31", name: "Samsung M31 / M21 6000mAh Battery", category: "Battery (बैटरी)", costPrice: 750, sellPrice: 1350, stock: 8, minStock: 2, unit: "Pcs" },
    { sku: "SUB-VIVO-V27", name: "Vivo V27 Charging Board with IC", category: "Charging (चार्जिंग बोर्ड/जैक)", costPrice: 380, sellPrice: 850, stock: 5, minStock: 2, unit: "Pcs" },
    { sku: "AUD-EAR-IP", name: "iPhone Earpiece Speaker & Sensor Flex", category: "Audio (माइक/स्पीकर)", costPrice: 250, sellPrice: 650, stock: 6, minStock: 2, unit: "Pcs" },
    { sku: "IC-PM8150B", name: "PM8150B Power Management IC (Original)", category: "Motherboard IC (चिप लेवल)", costPrice: 340, sellPrice: 900, stock: 4, minStock: 2, unit: "Pcs" },
    { sku: "BGL-OPPO-R8", name: "Oppo Reno 8 AG Matte Back Glass", category: "Back Glass & Lens", costPrice: 280, sellPrice: 799, stock: 6, minStock: 2, unit: "Pcs" },
    { sku: "CHG-65W-GAN", name: "Monu Pro 65W GaN Fast Charger (Type-C)", category: "Accessories (एक्सेसरीज)", costPrice: 550, sellPrice: 1199, stock: 14, minStock: 4, unit: "Pcs" },
    { sku: "CBL-TC-100W", name: "Heavy Braided 100W Type-C Cable (1.5M)", category: "Accessories (एक्सेसरीज)", costPrice: 110, sellPrice: 299, stock: 25, minStock: 5, unit: "Pcs" },
    { sku: "TMP-11D-AST", name: "11D Super Tough Tempered Glass (Assorted)", category: "Accessories (एक्सेसरीज)", costPrice: 25, sellPrice: 149, stock: 60, minStock: 15, unit: "Pcs" },
    { sku: "OCA-GLUE-50P", name: "Mechanic 250um OCA Optical Glue (Pack 50)", category: "Tools & Consumables", costPrice: 420, sellPrice: 750, stock: 6, minStock: 2, unit: "Pack" }
  ],

  // Pre-seeded Repair Job Cards (Fresh Clean Slate)
  initialJobCards: [],

  // Pre-seeded Invoices (Fresh Clean Slate)
  initialInvoices: [],

  // Instagram Photo Showcase Grid
  instagramFeed: [
    {
      id: "ig-1",
      image: "images/user_img_9.jpg",
      caption: "हजरतगंज शॉप पर लाइव OCA ग्लास लेमिनेशन व टच स्क्रीन रिपेयरिंग सेटअप! ⚡📱 #lucknow #mobilerepair",
      likes: "248",
      comments: "19",
      date: "1 दिन पहले"
    },
    {
      id: "ig-2",
      image: "images/user_img_2.jpg",
      caption: "मदरबोर्ड IC लेवल रिपेयर - 4K स्टीरियो माइक्रोस्कोप पर शॉर्टिंग IC फिक्स! 🔬🔥 #expressrepair",
      likes: "312",
      comments: "34",
      date: "2 दिन पहले"
    },
    {
      id: "ig-3",
      image: "images/user_img_11.jpg",
      caption: "क्रैक ग्लास व टूटी स्क्रीन का 100% ओरिजिनल OCA लेमिनेशन रिपेयर! बिल्कुल नए जैसा फोन। 📱✨ #crackedscreen #lucknow",
      likes: "580",
      comments: "64",
      date: "2 दिन पहले"
    },
    {
      id: "ig-4",
      image: "images/user_img_6.jpg",
      caption: "ओरिजिनल बैटरी रिप्लेसमेंट व पावर रेल कैलिब्रेशन। ⚡ 100% बैटरी हेल्थ गारंटी।",
      likes: "510",
      comments: "62",
      date: "5 दिन पहले"
    },
    {
      id: "ig-5",
      image: "images/user_img_5.jpg",
      caption: "स्मार्टफोन लॉजिक बोर्ड शील्ड व IC कंपोनेंट फिटिंग - Monu Mobile Solution Lab 🔌",
      likes: "189",
      comments: "15",
      date: "1 हफ्ता पहले"
    },
    {
      id: "ig-6",
      image: "images/user_img_8.jpg",
      caption: "प्रीमियम मोबाइल एक्सेसरीज, ओरिजिनल फास्ट चार्जर्स और 11D टेम्पर्ड ग्लास स्टॉक! 🛡️✨",
      likes: "275",
      comments: "23",
      date: "1 हफ्ता पहले"
    }
  ]
,

  // Multi-Branch Offices (3 Branches)
  branches: [
    {
      id: "branch_hazratganj",
      name: "श्रीराम टावर हजरतगंज (मुख्य लैब)",
      shortName: "हजरतगंज (श्रीराम टावर)",
      city: "लखनऊ",
      phone: "7905859701",
      whatsapp: "917905859701",
      address: "216, 2nd Floor, Sree Rama Towers, Ashok Marg, Sadullah Nagar, Narhi, Hazratganj, Lucknow, UP 226001",
      lat: 26.850138,
      lng: 80.948449,
      radiusMeters: 10,
      openTime: "12:00",
      closeTime: "21:00",
      image: "images/branch_hazratganj_banner.jpg",
      tag: "मुख्य लैब व हेड ऑफिस • एक्सप्रेस OCA रिपेयर",
      mapsUrl: "https://maps.google.com/?q=26.850138,80.948449"
    },
    {
      id: "branch_naka",
      name: "नाका हिंडोला शाखा (Naka Hindola Lucknow)",
      shortName: "नाका हिंडोला (लखनऊ)",
      city: "लखनऊ",
      phone: "9988772211",
      whatsapp: "919988772211",
      address: "नाका हिंडोला मार्केट (निकट गुरुद्वारा व चारबाग), लखनऊ, उत्तर प्रदेश 226004",
      lat: 26.8370,
      lng: 80.9241,
      radiusMeters: 10,
      openTime: "12:00",
      closeTime: "21:00",
      image: "images/branch_naka_banner.jpg",
      tag: "फास्ट स्क्रीन फोल्डर व होलसेल स्पेयर पार्ट्स",
      mapsUrl: "https://maps.google.com/?q=26.8370,80.9241"
    },
    {
      id: "branch_kannauj",
      name: "कन्नौज शाखा (Saraimeera Kannauj)",
      shortName: "कन्नौज (सरायमीरा)",
      city: "कन्नौज",
      phone: "9839988776",
      whatsapp: "919839988776",
      address: "2WHG+7HC, सरायमीरा (Saraimeera), जी.टी. रोड, कन्नौज, उत्तर प्रदेश 209727",
      lat: 27.0283,
      lng: 79.926383,
      radiusMeters: 10,
      openTime: "10:00",
      closeTime: "18:00",
      image: "images/branch_kannauj_banner.jpg",
      tag: "ऑथराइज्ड सर्विस सेंटर • चिप लेवल लैब",
      mapsUrl: "https://maps.google.com/?q=27.0283,79.926383"
    }
  ],

  // Employee HR Database - 3 Real Staff Accounts Only
  staff: [
    {
      id: "emp_101",
      name: "मोनू जी (Monu)",
      phone: "7905859701",
      pass: "Mms@859701",
      role: "admin",
      roleLabel: "सुपर एडमिन (Owner)",
      branchId: "all",
      branchName: "सभी शाखाएं (All Branches)",
      shiftHours: 10,
      shiftInTime: "12:00 PM",
      shiftOutTime: "09:00 PM",
      shiftInTime24: "12:00",
      shiftOutTime24: "21:00",
      allowedLeaves: 4,
      baseSalary: 45000,
      targetHours: 260,
      hourlyRate: 173.08,
      active: true,
      joinDate: "2024-01-01",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "emp_102",
      name: "सूरज वर्मा (Suraj)",
      phone: "9988772211",
      pass: "Mms@772211",
      role: "manager",
      roleLabel: "ब्रांच मैनेजर (हजरतगंज)",
      branchId: "branch_hazratganj",
      branchName: "हजरतगंज लैब",
      shiftHours: 9,
      shiftInTime: "12:00 PM",
      shiftOutTime: "09:00 PM",
      shiftInTime24: "12:00",
      shiftOutTime24: "21:00",
      allowedLeaves: 4,
      baseSalary: 26000,
      targetHours: 234,
      hourlyRate: 111.11,
      active: true,
      joinDate: "2024-03-15",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "emp_103",
      name: "रवि कुमार (Ravi)",
      phone: "9955443311",
      pass: "Mms@443311",
      role: "technician",
      roleLabel: "हजरतगंज स्टाफ (इंजीनियर)",
      branchId: "branch_hazratganj",
      branchName: "हजरतगंज लैब",
      shiftHours: 9,
      shiftInTime: "12:00 PM",
      shiftOutTime: "09:00 PM",
      shiftInTime24: "12:00",
      shiftOutTime24: "21:00",
      allowedLeaves: 2,
      baseSalary: 18000,
      targetHours: 252,
      hourlyRate: 71.43,
      active: true,
      joinDate: "2024-05-10",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80"
    }
  ],

  // Smart Attendance Log Seeds (Fresh Clean Slate)
  initialAttendance: [],

  // Staff Advances & Loan Repayment Seeds
  initialAdvances: [],

  // Store Overhead Expenses (Fresh Clean Slate)
  initialExpenses: []

};
