import React from 'react';
import { useApp } from '@/context/AppContext';

export const KhataTab: React.FC = () => {
  const { customers } = useApp();
  const debtors = customers.filter(c => c.pendingDue > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">📖 उधार खाता-बही (Credit Ledger)</h2>
        <p className="text-xs text-slate-500 mt-0.5">ग्राहकों व दुकानदारों का बकाया हिसाब व 1-क्लिक व्हाट्सएप तगादा</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">ग्राहक का नाम</th>
                <th className="p-3">मोबाइल नंबर</th>
                <th className="p-3">बकाया राशि (Due)</th>
                <th className="p-3">अंतिम विजिट</th>
                <th className="p-3">पेमेंट रिमाइंडर (WhatsApp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {debtors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-emerald-700 font-bold">
                    🎉 बहुत बढ़िया! किसी भी ग्राहक का उधार बकाया नहीं है।
                  </td>
                </tr>
              ) : (
                debtors.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 font-mono font-bold text-slate-600">{c.phone}</td>
                    <td className="p-3 font-black text-rose-600">₹{c.pendingDue}</td>
                    <td className="p-3 text-slate-400">{c.lastVisit}</td>
                    <td className="p-3">
                      <a
                        href={`https://wa.me/91${c.phone}?text=${encodeURIComponent(`नमस्ते ${c.name} जी, Monu Mobile Solution पर आपका पिछला रिपेयर बिल बकाया ₹${c.pendingDue} शेष है। कृपया ऑनलाइन या दुकान पर जमा करने का कष्ट करें। धन्यवाद!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                      >
                        <span>💬 तगादा भेजें (Reminder)</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
