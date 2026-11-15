import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useApp();
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = login(phone, pass);
    if (res.success) {
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-2xl font-black leading-none"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center">
            <img src="/logo-badge.svg" alt="MMS Emblem" className="w-full h-full object-contain" />
          </div>
          <h3 className="text-xl font-black text-slate-900">कर्मचारी व एडमिन लॉगिन</h3>
          <p className="text-xs text-slate-500 mt-1">Monu Mobile Solution ERP कंट्रोल पैनल</p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">रजिस्टर्ड मोबाइल नंबर *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="उदा. 7905859701 या 9988772211"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">पासवर्ड *</label>
            <input
              type="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="पासवर्ड दर्ज करें"
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-black shadow-md transition cursor-pointer"
          >
            🔒 पोर्टल में लॉगिन करें
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-500">
          <span>सुरक्षित प्राइवेट ERP नेटवर्क • 256-Bit SSL एन्क्रिप्टेड</span>
        </div>

      </div>
    </div>
  );
};
