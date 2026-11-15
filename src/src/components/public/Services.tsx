import React from 'react';

const SERVICES = [
  {
    id: 'screen',
    title: 'ओरिजिनल डिस्प्ले & टच ग्लास रिप्लेसमेंट',
    titleEn: 'Original Display & Glass OCA Lamination',
    desc: 'iPhone Super Retina, Samsung Dynamic AMOLED, OnePlus व Curved डिस्प्ले का 100% ओरिजिनल OCA लैमिनेशन। 90 दिन वारंटी।',
    image: '/images/service-screen.jpg',
    tag: '30 मिनट में तैयार'
  },
  {
    id: 'battery',
    title: '100% ओरिजिनल बैटरी रिप्लेसमेंट',
    titleEn: 'OEM Battery Replacement with IC Tag',
    desc: 'iPhone 100% Battery Health सपोर्ट, नो अननोन पार्ट मैसेज, सैमसंग व वनप्लस ओरिजिनल लिथियम-आयन बैटरी।',
    image: '/images/service-battery.jpg',
    tag: '6 महीने वारंटी'
  },
  {
    id: 'motherboard',
    title: 'मदरबोर्ड चिप-लेवल व IC रिपेयर',
    titleEn: 'Motherboard Chip-Level & IC Repair',
    desc: 'डेड फोन, नेटवर्क IC, ऑडियो IC, पावर IC, चार्जिंग IC व शार्ट सर्किट का थर्मल कैमरा व माइक्रोस्कोप से सटीक इलाज।',
    image: '/images/service-motherboard.jpg',
    tag: 'माइक्रोस्कोप लैब'
  },
  {
    id: 'charging',
    title: 'चार्जिंग पोर्ट व फ्लेक्स सब-बोर्ड',
    titleEn: 'Type-C Charging Sub-Board Flex Care',
    desc: 'फास्ट चार्जिंग, माइक, हेडफोन जैक और टाइप-सी पोर्ट डैमेज की तत्काल रिपेयरिंग ओरिजिनल पार्ट्स के साथ।',
    image: '/images/service-charging.jpg',
    tag: 'तुरंत सर्विस'
  },
  {
    id: 'water',
    title: 'पानी में गिरा (Water Damage) रिवाइवल',
    titleEn: 'Water & Liquid Damage Phone Revival',
    desc: 'अल्ट्रासोनिक मदरबोर्ड डी-ऑक्सीडेशन क्लीनिंग और 24-घंटे थर्मल हीटिंग से फोन को 95% मामलों में दोबारा चालू करना।',
    image: '/images/service-water.jpg',
    tag: 'अल्ट्रासोनिक क्लीन'
  },
  {
    id: 'software',
    title: 'सॉफ्टवेयर, अनलॉकिंग व डेटा रिकवरी',
    titleEn: 'Software, Unlocking & Dead Boot Repair',
    desc: 'Apple Logo Stuck, Bootloop, हैंग ऑन लोगो, डेड बूट रिपेयर और सुरक्षित पर्सनल डेटा रिकवरी सर्विस।',
    image: '/images/service-software.jpg',
    tag: 'डेटा सुरक्षित'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-12 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-wider">
            Expert Lab Care
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            हमारी मुख्य रिपेयरिंग सेवाएं
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            हाई-टेक माइक्रोस्कोप व थर्मल इमेजिंग लैब में प्रशिक्षित इंजीनियरों द्वारा सभी ब्रांड्स की चिप-लेवल रिपेयरिंग।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map(s => (
            <div key={s.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                  {s.tag}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-black leading-snug">{s.title}</h3>
                  <span className="text-[10px] text-slate-300 block">{s.titleEn}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {s.desc}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#calculator"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>खर्च अनुमान देखें →</span>
                  </a>
                  <a
                    href="https://wa.me/917905859701"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition"
                  >
                    सलाह लें
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
