import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export const PortalHeader: React.FC = () => {
  const { 
    currentUser, logout, branches, activeBranch, setActiveBranch,
    shopStatusMode, setShopStatusMode, isShopOpen, isOwner, dutyAlerts, markAlertsAsRead
  } = useApp();

  const [showAlerts, setShowAlerts] = useState(false);
  const unreadAlerts = dutyAlerts.filter(a => !a.read);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
      
      {/* User greeting and Branch Selector */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5 leading-none">
            <span>नमस्ते, <strong>{currentUser?.name || 'मोनू जी'}</strong></span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {currentUser?.roleLabel || 'सुपर एडमिन (OWNER)'}
            </span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <label className="text-[10px] font-bold text-slate-500">शाखा:</label>
            <select
              value={activeBranch}
              onChange={(e) => setActiveBranch(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-lg px-2 py-0.5 focus:outline-none"
            >
              <option value="all">🏢 सभी शाखाएं (All Branches)</option>
              {branches.map(b => (
                <option key={b.id} value={b.id}>📍 {b.shortName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Right Actions: Shop Status, Duty Alerts (Admin only), Logout */}
      <div className="flex items-center gap-3">
        
        {/* Shop Status Toggle */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold border border-slate-200">
          <button
            type="button"
            onClick={() => setShopStatusMode('force_open')}
            className={`px-2 py-1 rounded-lg text-[11px] transition ${shopStatusMode === 'force_open' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🟢 खुली रखें
          </button>
          <button
            type="button"
            onClick={() => setShopStatusMode('force_closed')}
            className={`px-2 py-1 rounded-lg text-[11px] transition ${shopStatusMode === 'force_closed' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            🔴 बंद रखें
          </button>
          <button
            type="button"
            onClick={() => setShopStatusMode('auto')}
            className={`px-2 py-1 rounded-lg text-[11px] transition ${shopStatusMode === 'auto' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            ⏱️ ऑटो टाइम
          </button>
        </div>

        {/* Duty Alerts (Admin Only) */}
        {isOwner && (
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowAlerts(!showAlerts);
                if (!showAlerts) markAlertsAsRead();
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 relative transition cursor-pointer"
            >
              <span className="text-base">🔔</span>
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {showAlerts && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-xs z-50">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 font-bold text-slate-800">
                  <span>🔔 स्टाफ ड्यूटी ऑन/ऑफ अलर्ट्स</span>
                  <button onClick={() => setShowAlerts(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {dutyAlerts.length === 0 ? (
                    <p className="text-slate-400 text-center py-4">कोई नया अलर्ट नहीं</p>
                  ) : (
                    dutyAlerts.map(a => (
                      <div key={a.id} className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                        <div className="flex items-center justify-between font-black text-[11px]">
                          <span>⚠️ गलत लोकेशन से पंच</span>
                          <span className="text-slate-500 font-normal">{a.time}</span>
                        </div>
                        <p className="text-xs font-bold">{a.empName} ने {a.branchName} में हाजिरी लगाई</p>
                        <p className="text-[10px] text-rose-700 font-semibold">
                          दुकान से {a.distanceMeters >= 1000 ? (a.distanceMeters / 1000).toFixed(1) + ' km' : a.distanceMeters + 'm'} दूर
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition border border-rose-200"
        >
          लॉगआउट
        </button>

      </div>
    </header>
  );
};
