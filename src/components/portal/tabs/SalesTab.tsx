import React from 'react';
import { useApp } from '@/context/AppContext';

export const SalesTab: React.FC = () => {
  const { invoices, activeBranch } = useApp();

  const filtered = activeBranch === 'all' ? invoices : invoices.filter(i => i.branchId === activeBranch);

  const cashSales = filtered.filter(i => i.paymentMode === 'cash').reduce((sum, i) => sum + i.total, 0);
  const upiSales = filtered.filter(i => i.paymentMode === 'upi').reduce((sum, i) => sum + i.total, 0);
  const cardSales = filtered.filter(i => i.paymentMode === 'card').reduce((sum, i) => sum + i.total, 0);
  const khataSales = filtered.filter(i => i.paymentMode === 'khata').reduce((sum, i) => sum + i.total, 0);
  const totalSales = cashSales + upiSales + cardSales + khataSales;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">📈 डेली सेल्स & गल्ला रिकॉन्सिलिएशन (Daily Register)</h2>
        <p className="text-xs text-slate-500 mt-0.5">कैश, UPI, कार्ड व उधार का डेली क्लोजिंग हिसाब</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">नकद गल्ला (Cash In Hand)</span>
          <span className="text-2xl font-black text-emerald-700">₹{cashSales.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-1">शाम को गल्ला मिलाएँ</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">ऑनलाइन UPI (QR / PhonePe)</span>
          <span className="text-2xl font-black text-blue-700">₹{upiSales.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-1">बैंक अकाउंट क्रेडिट</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">कार्ड स्वाइप (POS Machine)</span>
          <span className="text-2xl font-black text-purple-700">₹{cardSales.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-1">डेबिट / क्रेडिट कार्ड</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">उधार खाता बिलिंग</span>
          <span className="text-2xl font-black text-amber-700">₹{khataSales.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 block mt-1">खाता-बही में दर्ज</span>
        </div>

      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">कुल दैनिक कलेक्शन</h3>
          <span className="text-lg font-black text-blue-700">₹{totalSales.toLocaleString('en-IN')}</span>
        </div>
      </div>

    </div>
  );
};
