import React from 'react';
import { useApp } from '@/context/AppContext';

export const Hero: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white py-12 sm:py-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>100% Genuine Parts & Expert Chip-Level Care</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t.heroTitle} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {t.heroHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {t.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#calculator"
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-blue-500/20 text-center transition flex items-center justify-center gap-2"
              >
                <span>⚡ {t.ctaEstimate}</span>
              </a>
              <a
                href="#tracker"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold shadow-xs text-center transition flex items-center justify-center gap-2"
              >
                <span>🔍 {t.ctaTrack}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-lg font-black text-blue-600 block">30 Min</span>
                <span className="text-[10px] font-bold text-slate-600 uppercase">एक्सप्रेस रिपेयर</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-lg font-black text-indigo-600 block">90 Days</span>
                <span className="text-[10px] font-bold text-slate-600 uppercase">हैंडसेट वारंटी</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-lg font-black text-emerald-600 block">3 Labs</span>
                <span className="text-[10px] font-bold text-slate-600 uppercase">लखनऊ व कन्नौज</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/images/hero-repair.jpg"
                alt="Express Mobile Repair Lab"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-600 block">हेड ऑफिस & लैब</span>
                  <span className="text-xs font-black text-slate-900">श्रीराम टॉवर हजरतगंज, लखनऊ</span>
                </div>
                <a
                  href="https://wa.me/917905859701"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
