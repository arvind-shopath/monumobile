import React from 'react';
import { useApp } from '@/context/AppContext';

export const StaffTab: React.FC = () => {
  const { staff } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">👔 कर्मचारी व सैलरी (Staff & HR)</h2>
        <p className="text-xs text-slate-500 mt-0.5">स्टाफ रोस्टर, शिफ्ट टाइमिंग्स, सैलरी व मासिक उपस्थिति गणना</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staff.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
                {s.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{s.name}</h4>
                <span className="text-[11px] font-bold text-blue-600 block">{s.roleLabel}</span>
                <span className="text-[10px] text-slate-400 font-mono">{s.phone}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between text-slate-600">
                <span>शाखा:</span>
                <strong className="text-slate-800">{s.branchName}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>शिफ्ट टाइम:</span>
                <strong className="text-slate-800">{s.shiftInTime} - {s.shiftOutTime}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>मंथली सैलरी:</span>
                <strong className="text-emerald-700 font-black">₹{s.baseSalary.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>टारगेट घंटे:</span>
                <strong className="text-slate-800">{s.targetHours} hrs / माह</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                सक्रिय (Active)
              </span>
              <a
                href={`tel:${s.phone}`}
                className="text-blue-600 font-bold hover:underline"
              >
                कॉल करें
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
