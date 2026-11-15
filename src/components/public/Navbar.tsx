import React from 'react';
import { useApp } from '@/context/AppContext';

interface NavbarProps {
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const { t, currentUser, setCurrentView } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <img src="/logo-badge.svg" alt="MMS Logo" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              Monu Mobile Solution
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              {t.siteTagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <a href="#services" className="hover:text-blue-600 transition">{t.navServices}</a>
          <a href="#tracker" className="hover:text-blue-600 transition">{t.navTrack}</a>
          <a href="#branches" className="hover:text-blue-600 transition">{t.navBranches}</a>
        </nav>

        {/* Login or Portal Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <button
              onClick={() => setCurrentView('portal')}
              className="py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition flex items-center gap-2"
            >
              <span>⚡ {t.navPortal}</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-1.5"
            >
              <span>🔒 {t.navLogin}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
