import React from 'react';
import { useApp } from '@/context/AppContext';

export const BalanceTab: React.FC = () => {
  const { invoices, expenses, inventory, isOwner } = useApp();

  if (!isOwner) {
    return (
      <div className="p-8 text-center text-rose-600 font-bold bg-white rounded-2xl border border-rose-200">
        🚫 यह मॉड्यूल केवल सुपर एडमिन (मोनू जी) के लिए आरक्षित है।
      </div>
    );
  }

  const totalSales = invoices.reduce((sum, i) => sum + (i.total || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const inventoryAssetValue = inventory.reduce((sum, i) => sum + (i.qty * i.costPrice), 0);
  const grossProfit = totalSales - totalExpenses;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">⚖️ बैलेंस शीट & P&L (सुपर एडमिन)</h2>
        <p className="text-xs text-slate-500 mt-0.5">लाभ-हानि विवरण, कुल संपत्ति व शुद्ध व्यापारिक मार्जिन</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">कुल सकल बिक्री (Revenue)</span>
          <span className="text-2xl font-black text-slate-900">₹{totalSales.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">POS व रिपेयर इनवॉइस बिल</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">कुल दुकान खर्च (Expenses)</span>
          <span className="text-2xl font-black text-rose-600">₹{totalExpenses.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-rose-600 font-bold block mt-1">चाय, कूरियर व अन्य खर्च</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 block mb-1">शुद्ध लाभ (Net Profit)</span>
          <span className={`text-2xl font-black ${grossProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            ₹{grossProfit.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-slate-400 font-bold block mt-1">बिक्री - खर्च मार्जिन</span>
        </div>

      </div>

      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900">करेंट एसेट्स & इन्वेंट्री वैल्यूएशन</h3>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <strong className="text-xs font-bold text-slate-800 block">कुल स्पेयर पार्ट्स स्टॉक वैल्यू (At Cost)</strong>
            <span className="text-[11px] text-slate-500">सभी 3 शाखाओं में मौजूद ओरिजिनल पार्ट्स</span>
          </div>
          <span className="text-lg font-black text-blue-700">₹{inventoryAssetValue.toLocaleString('en-IN')}</span>
        </div>
      </div>

    </div>
  );
};
