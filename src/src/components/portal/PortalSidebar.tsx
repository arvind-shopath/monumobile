import React from 'react';
import { useApp } from '@/context/AppContext';

export const PortalSidebar: React.FC = () => {
  const { activeTab, setActiveTab, isOwner, isManager, setCurrentView } = useApp();

  const allTabs = [
    { id: 'dashboard', name: 'मुख्य डैशबोर्ड (KPIs)', icon: '📊', minRole: 'manager' },
    { id: 'pos', name: 'POS बिलिंग (काउंटर)', icon: '🧾', minRole: 'manager' },
    { id: 'jobs', name: 'रिपेयर जॉब-शीट (टोकन)', icon: '🔧', minRole: 'employee' },
    { id: 'inventory', name: 'इन्वेंट्री & स्पेयर SKU', icon: '📦', minRole: 'manager' },
    { id: 'directory', name: 'ग्राहक व दुकानदार CRM', icon: '👥', minRole: 'manager' },
    { id: 'sales', name: 'डेली सेल्स & गल्ला', icon: '📈', minRole: 'manager' },
    { id: 'khata', name: 'उधार खाता-बही (Khata)', icon: '📖', minRole: 'manager' },
    { id: 'expenses', name: 'दुकान खर्च (Expenses)', icon: '💸', minRole: 'manager' },
    { id: 'balance', name: 'बैलेंस शीट & P&L (एडमिन)', icon: '⚖️', minRole: 'admin' },
    { id: 'attendance', name: 'सेल्फी व GPS अटेंडेंस', icon: '📸', minRole: 'employee' },
    { id: 'staff', name: 'कर्मचारी व सैलरी (HR)', icon: '👔', minRole: 'manager' },
    { id: 'settings', name: 'सिस्टम व शाखा सेटिंग्स', icon: '⚙️', minRole: 'employee' }
  ];

  const visibleTabs = allTabs.filter(tab => {
    if (tab.minRole === 'admin') return isOwner;
    if (tab.minRole === 'manager') return isOwner || isManager;
    return true; // employee
  });

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen">
      
      {/* Brand Header in Sidebar */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800">
        <img src="/logo-badge.svg" alt="MMS" className="w-8 h-8" />
        <div>
          <h1 className="text-sm font-black text-white leading-none">CONTROL PANEL</h1>
          <span className="text-[10px] text-blue-400 font-bold">Monu Mobile ERP v6.2</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {visibleTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="truncate">{tab.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer in Sidebar */}
      <div className="p-4 border-t border-slate-800 text-center">
        <button
          onClick={() => setCurrentView('public')}
          className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
        >
          <span>🌐 पब्लिक वेबसाइट</span>
        </button>
      </div>

    </aside>
  );
};
