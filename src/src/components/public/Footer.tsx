import React from 'react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { branches } = useApp();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo-badge.svg" alt="MMS" className="w-8 h-8" />
              <span className="text-base font-black text-white">Monu Mobile Solution</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              उत्तर प्रदेश की सबसे विश्वसनीय एक्सप्रेस स्मार्टफोन रिपेयरिंग लैब और पार्ट्स डिस्ट्रीब्यूशन नेटवर्क।
            </p>
          </div>

          <div>
            <h4 className="font-black text-slate-200 text-sm mb-3">त्वरित लिंक्स</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-blue-400 transition">होम पेज</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition">सर्विस व रेट लिस्ट</a></li>
              <li><a href="#tracker" className="hover:text-blue-400 transition">लाइव रिपेयर ट्रैकर</a></li>
              <li><a href="#branches" className="hover:text-blue-400 transition">शाखाएं व मैप लोकेशन</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-slate-200 text-sm mb-3">हमारी शाखाएं</h4>
            <div className="space-y-3">
              {branches.map(b => (
                <div key={b.id} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block text-xs">{b.name}</strong>
                    <span className="text-[11px] text-slate-400">{b.timings}</span>
                  </div>
                  <a href={`tel:${b.phone}`} className="text-blue-400 font-bold hover:underline">{b.phone}</a>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Monu Mobile Solution (MMS). All Rights Reserved.</p>
          <p>Powered by Monu Mobile Dedicated Cloud ERP v6.2</p>
        </div>
      </div>
    </footer>
  );
};
