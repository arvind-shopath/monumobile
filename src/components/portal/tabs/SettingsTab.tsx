import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export const SettingsTab: React.FC = () => {
  const { branches, isOwner, purgeOldData, attendance, jobs } = useApp();
  const [purgeMsg, setPurgeMsg] = useState('');

  const handlePurge = () => {
    if (!window.confirm('⚠️ क्या आप वाकई 2 महीने (60 दिन) से पुराना डेटा क्लीन करना चाहते हैं? कृपया पहले जरूरी रिकॉर्ड्स नोट कर लें।')) {
      return;
    }
    const res = purgeOldData(2);
    setPurgeMsg(`✅ क्लीनअप सफल! ${res.deletedAttendance} पुरानी अटेंडेंस और ${res.deletedJobs} पूर्ण जॉब्स हटाई गईं।`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-4xl">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">⚙️ सिस्टम व शाखा सेटिंग्स</h2>
        <p className="text-xs text-slate-500 mt-0.5">शाखा समय, क्लाउड सिंक व डेटा सुरक्षा प्रबंधन</p>
      </div>

      {/* Branch Timings Configuration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">
          🏢 शाखा शिफ्ट व टाइमिंग सेटिंग्स
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map(b => (
            <div key={b.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <strong className="text-slate-900 block font-black text-sm">{b.shortName}</strong>
              <div className="text-[11px] text-slate-600">
                <span className="block font-bold">समय: {b.timings}</span>
                <span className="block text-slate-500 mt-1">{b.address}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
                GPS: {b.lat}, {b.lng} | दायरा: {b.radiusMeters}m
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud Server Link */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900">☁️ प्राइवेट सर्वर कनेक्शन व बैकअप</h3>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
          <div>
            <strong className="text-emerald-900 block font-bold">🟢 MMS Enterprise Dedicated Cloud Server</strong>
            <span className="text-[11px] text-emerald-700">डोमेन: monumobile.in | SSL: 256-Bit Google Trust Encrypted</span>
          </div>
          <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs">सिंक सक्रिय</span>
        </div>
      </div>

      {/* Data Lifecycle & 2-Month Purge (ADMIN ONLY) */}
      {isOwner && (
        <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="text-sm font-black text-slate-900">प्राइवेट सर्वर स्टोरेज सुरक्षा व 2-माह डेटा लाइफसाइकिल</h3>
              <p className="text-xs text-slate-500">केवल सुपर एडमिन (मोनू जी) के लिए अधिकृत</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <p className="text-slate-700 font-medium">
              डेटाबेस स्पेस कभी फुल न हो इसके लिए 2 महीने (60 दिन) से पुराने पूर्ण हो चुके रिपेयर जॉब्स और पुरानी हाजिरी सेल्फी को आप एक क्लिक में क्लीन कर सकते हैं।
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handlePurge}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>🗑️ 2 महीने पुराना डेटा क्लीन करें</span>
              </button>
            </div>
          </div>

          {purgeMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold text-center">
              {purgeMsg}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
