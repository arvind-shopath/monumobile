import React from 'react';
import { useApp } from '@/context/AppContext';

export const BranchCards: React.FC = () => {
  const { branches } = useApp();

  return (
    <section id="branches" className="py-12 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-wider">
            3 Express Locations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            हमारी शाखाएं व लैब
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            लखनऊ (हजरतगंज व नाका हिंडोला) और कन्नौज (सरायमीरा) में आपकी सेवा में सदैव तत्पर।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {branches.map(b => (
            <div key={b.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={b.bannerUrl}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-md">
                  {b.shortName}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-blue-300 font-bold block">
                    📍 Lat {b.lat}° • Long {b.lng}°
                  </span>
                  <h3 className="text-base sm:text-lg font-black leading-snug">{b.name}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">🏢</span>
                    <p className="text-slate-700 font-medium leading-relaxed">{b.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">⏰</span>
                    <span className="text-slate-800 font-bold">{b.timings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">📞</span>
                    <a href={`tel:${b.phone}`} className="text-blue-700 font-bold hover:underline">{b.phone}</a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-xs text-center transition flex items-center justify-center gap-1.5"
                  >
                    <span>📍 मैप देखें</span>
                  </a>
                  <a
                    href={`https://wa.me/91${b.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs transition"
                  >
                    WhatsApp
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
