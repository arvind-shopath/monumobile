import React from 'react';
import { useApp } from '@/context/AppContext';

export const DashboardTab: React.FC = () => {
  const { jobs, invoices, inventory, attendance, activeBranch, setActiveTab } = useApp();

  const filteredJobs = activeBranch === 'all' ? jobs : jobs.filter(j => j.branchId === activeBranch);
  const filteredInvoices = activeBranch === 'all' ? invoices : invoices.filter(i => i.branchId === activeBranch);

  const todayRevenue = filteredInvoices.reduce((sum, inv) => sum + (inv.paid || 0), 0);
  const pendingJobs = filteredJobs.filter(j => j.status === 'in-progress' || j.status === 'received').length;
  const readyJobs = filteredJobs.filter(j => j.status === 'ready').length;
  const lowStockItems = inventory.filter(i => i.qty <= i.minQty).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">📊 मुख्य डैशबोर्ड (Business KPIs)</h2>
          <p className="text-xs text-slate-500 mt-0.5">शाखा अनुसार लाइव रिपेयर, रेवेन्यू व स्टॉक समरी</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pos')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            + नया बिल बनाएं
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            + नया रिपेयर जॉब
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>आज का कलेक्शन</span>
            <span className="text-emerald-600">₹</span>
          </div>
          <span className="text-2xl font-black text-slate-900 block">₹{todayRevenue.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400 font-semibold">{filteredInvoices.length} इनवॉइस बिल कटे</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>चालू रिपेयरिंग</span>
            <span className="text-amber-600">⏳</span>
          </div>
          <span className="text-2xl font-black text-amber-600 block">{pendingJobs}</span>
          <span className="text-[10px] text-slate-400 font-semibold">लैब में टेस्टिंग व कार्य चालू</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>डिलीवरी के लिए तैयार</span>
            <span className="text-blue-600">🎉</span>
          </div>
          <span className="text-2xl font-black text-blue-600 block">{readyJobs}</span>
          <span className="text-[10px] text-slate-400 font-semibold">ग्राहक को कॉल या SMS भेजें</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>कम स्टॉक अलर्ट</span>
            <span className="text-rose-600">📦</span>
          </div>
          <span className={`text-2xl font-black block ${lowStockItems > 0 ? 'text-rose-600' : 'text-slate-900'}`}>{lowStockItems}</span>
          <span className="text-[10px] text-slate-400 font-semibold">थ्रेशोल्ड से कम स्पेयर पार्ट्स</span>
        </div>

      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-800">हालिया काउंटर बिल (Recent Invoices)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 font-bold">
                <th className="pb-2">बिल नं</th>
                <th className="pb-2">ग्राहक</th>
                <th className="pb-2">शाखा</th>
                <th className="pb-2">अमाउंट</th>
                <th className="pb-2">पेमेंट</th>
                <th className="pb-2">समय</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.slice(0, 5).map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 font-bold text-blue-600">{inv.billNo}</td>
                  <td className="py-2.5 font-semibold text-slate-800">{inv.customerName} ({inv.customerPhone})</td>
                  <td className="py-2.5 text-slate-600">{inv.branchName}</td>
                  <td className="py-2.5 font-black text-slate-900">₹{inv.total}</td>
                  <td className="py-2.5 uppercase font-bold text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">{inv.paymentMode}</span>
                  </td>
                  <td className="py-2.5 text-slate-400">{inv.date} {inv.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
