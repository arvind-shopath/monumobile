import React from 'react';
import { useApp } from '@/context/AppContext';

export const TopBar: React.FC = () => {
  const { lang, setLang, isShopOpen } = useApp();

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <span className="text-amber-300 font-bold truncate flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            🏢 3 एक्सप्रेस लैब्स: हजरतगंज, नाका हिंडोला (लखनऊ) व कन्नौज
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:flex items-center gap-2 text-slate-300">
            <span>⏰ लखनऊ (हजरतगंज व नाका): 12:00 PM - 09:00 PM • कन्नौज: 10:00 AM - 06:00 PM</span>
            <span className="text-slate-600">•</span>
            {isShopOpen ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[11px] border border-emerald-500/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>🟢 दुकान खुली है (Open Now)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[11px] border border-rose-500/40">
                <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                <span>🔴 दुकान अभी बंद है (Opens 10 AM / 12 PM)</span>
              </span>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex rounded-lg border border-slate-700 p-0.5 bg-slate-800 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 rounded-md transition ${lang === 'hi' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'}`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-md transition ${lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
