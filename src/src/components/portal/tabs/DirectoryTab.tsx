import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export const DirectoryTab: React.FC = () => {
  const { customers, invoices } = useApp();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">👥 ग्राहक व दुकानदार CRM (Customer Directory)</h2>
        <p className="text-xs text-slate-500 mt-0.5">कस्टमर फोन डायरेक्टरी, कुल खरीदारी इतिहास व बकाया हिसाब</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ग्राहक का नाम या मोबाइल नंबर खोजें..."
          className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium w-full sm:w-80 outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">ग्राहक का नाम</th>
                <th className="p-3">मोबाइल नंबर</th>
                <th className="p-3">कुल विज़िट</th>
                <th className="p-3">लाइफटाइम स्पेंड</th>
                <th className="p-3">बकाया (Due)</th>
                <th className="p-3">अंतिम विजिट</th>
                <th className="p-3">क्विक एक्शन</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{c.name}</td>
                  <td className="p-3 font-mono font-bold text-blue-600">{c.phone}</td>
                  <td className="p-3 text-slate-600">{c.totalVisits} बार</td>
                  <td className="p-3 font-black text-slate-900">₹{c.totalSpend.toLocaleString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`font-bold ${c.pendingDue > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ₹{c.pendingDue}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{c.lastVisit}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${c.phone}`}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-[11px]"
                      >
                        कॉल करें
                      </a>
                      <a
                        href={`https://wa.me/91${c.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-[11px]"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
