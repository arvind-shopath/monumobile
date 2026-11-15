import React, { useState } from 'react';

const BRAND_MODELS: Record<string, string[]> = {
  Apple: ['iPhone 15 Pro Max', 'iPhone 15', 'iPhone 14 Pro Max', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone 11'],
  Samsung: ['Galaxy S24 Ultra', 'Galaxy S23', 'Galaxy S22 Ultra', 'Galaxy S21', 'Galaxy A54', 'Galaxy M34'],
  OnePlus: ['OnePlus 12', 'OnePlus 11R', 'OnePlus 10 Pro', 'OnePlus Nord CE 3', 'OnePlus 9 Pro'],
  Xiaomi: ['Redmi Note 13 Pro', 'Xiaomi 13 Pro', 'Redmi Note 12', 'Poco X6 Pro', 'Poco F5'],
  Realme: ['Realme 12 Pro+', 'Realme 11 Pro', 'Realme Narzo 60', 'Realme GT Neo 3'],
  Vivo: ['Vivo X100 Pro', 'Vivo V29', 'Vivo T2 Pro', 'Vivo Y200'],
  Oppo: ['Oppo Reno 11 Pro', 'Oppo Reno 10', 'Oppo F25 Pro', 'Oppo A78']
};

const ISSUES: Record<string, { price: number; time: string; warranty: string }> = {
  'स्क्रीन क्रैक / ओरिजिनल OLED फोल्डर': { price: 3800, time: '30 मिनट', warranty: '90 दिन' },
  'टच ग्लास रिप्लेसमेंट (ओरिजिनल डिस्प्ले सेफ)': { price: 1400, time: '45 मिनट', warranty: '60 दिन' },
  'बैटरी रिप्लेसमेंट (100% हेल्थ)': { price: 1800, time: '20 मिनट', warranty: '6 महीने' },
  'चार्जिंग पोर्ट / सब-बोर्ड रिपेयर': { price: 850, time: '25 मिनट', warranty: '30 दिन' },
  'डेड फोन / मदरबोर्ड चिप-लेवल IC रिपेयर': { price: 2400, time: '2 से 4 घंटे', warranty: '30 दिन' },
  'कैमरा ग्लास / लेंस या कैमरा रिपेयर': { price: 950, time: '30 मिनट', warranty: '30 दिन' },
  'स्पीकर / ईयरपीस आवाज समस्या': { price: 650, time: '20 मिनट', warranty: '30 दिन' }
};

export const PriceEstimator: React.FC = () => {
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState(BRAND_MODELS.Apple[0]);
  const [issue, setIssue] = useState(Object.keys(ISSUES)[0]);

  const models = BRAND_MODELS[brand] || BRAND_MODELS.Apple;
  const currentEst = ISSUES[issue] || ISSUES[Object.keys(ISSUES)[0]];

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    setModel(BRAND_MODELS[newBrand][0]);
  };

  return (
    <section id="calculator" className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            स्मार्ट रिपेयर खर्च कैलकुलेटर
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            अपने मोबाइल का ब्रांड, मॉडल और समस्या चुनें और तुरंत पारदर्शी रेट प्राप्त करें।
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-xs">
            
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">1. ब्रांड चुनें</label>
              <select
                value={brand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                {Object.keys(BRAND_MODELS).map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">2. मॉडल चुनें</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                {models.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">3. समस्या (Issue) चुनें</label>
              <select
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
              >
                {Object.keys(ISSUES).map(iss => (
                  <option key={iss} value={iss}>{iss}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Result Card */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                {brand} • {model}
              </span>
              <h4 className="text-base font-black text-slate-900">{issue}</h4>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1">⏱️ समय: <strong>{currentEst.time}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">🛡️ वारंटी: <strong>{currentEst.warranty}</strong></span>
              </div>
            </div>

            <div className="text-center sm:text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">अनुमानित खर्च (Approx)</span>
              <span className="text-3xl sm:text-4xl font-black text-blue-700">₹{currentEst.price}</span>
              <div className="pt-2">
                <a
                  href={`https://wa.me/917905859701?text=${encodeURIComponent(`नमस्ते, मुझे मेरे ${brand} ${model} के लिए ${issue} कराना है (अनुमानित खर्च ₹${currentEst.price})। कृपया बुकिंग स्लॉट कन्फर्म करें।`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                >
                  <span>💬 रिपेयर बुक करें</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
