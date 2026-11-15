import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JobCard } from '@/types';

export const LiveTracker: React.FC = () => {
  const { t, jobs, invoices } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobCard | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (forcedVal?: string) => {
    const val = (forcedVal || query || '').trim().toUpperCase();
    if (!val) {
      alert('कृपया टोकन नंबर या मोबाइल नंबर दर्ज करें!');
      return;
    }
    setQuery(val);
    setLoading(true);
    setNotFound(false);
    setResult(null);

    const cleanInput = val.replace(/[^0-9]/g, '');

    // 1. Search in local state jobs
    let matched = jobs.find(j => 
      (j.token && j.token.toUpperCase() === val) || 
      (j.tokenNo && j.tokenNo.toUpperCase() === val) || 
      (cleanInput.length >= 10 && j.customerPhone.includes(cleanInput))
    );

    // 2. Search in local state invoices
    if (!matched) {
      const inv = invoices.find(i => 
        (i.billNo && i.billNo.toUpperCase() === val) || 
        (cleanInput.length >= 10 && i.customerPhone.includes(cleanInput))
      );
      if (inv) {
        const item = inv.items[0];
        matched = {
          id: inv.id,
          token: inv.billNo,
          tokenNo: inv.billNo,
          customerName: inv.customerName,
          customerPhone: inv.customerPhone,
          brand: 'स्मार्टफोन',
          model: item ? item.name : 'रिपेयर पार्ट्स व सर्विस',
          problem: 'काउंटर बिल / रिपेयर पार्ट्स व सर्विस (POS Invoice)',
          estCost: inv.total,
          finalCost: inv.total,
          paid: inv.paid,
          due: inv.due,
          status: inv.due > 0 ? 'in-progress' : 'ready',
          branchId: inv.branchId,
          branchName: inv.branchName,
          date: inv.date
        };
      }
    }

    // 3. Query Cloud Server API
    if (!matched) {
      try {
        const res = await fetch('/api/track?q=' + encodeURIComponent(val) + '&t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.found && data.job) {
            matched = data.job;
          }
        }
      } catch (e) {
        console.warn('API track query error:', e);
      }
    }

    setLoading(false);
    if (matched) {
      setResult(matched);
    } else {
      setNotFound(true);
    }
  };

  const getBadge = (status: JobCard['status']) => {
    switch (status) {
      case 'delivered':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">✅ डिलीवर (Delivered)</span>;
      case 'ready':
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800">🎉 तैयार (Ready to Pickup)</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800">⏳ रिपेयरिंग चालू है (In Progress)</span>;
    }
  };

  return (
    <section id="tracker" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider">
            {t.trackBadge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {t.trackTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.trackDesc}
          </p>
        </div>

        {/* How it works info card */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <span className="text-lg">💡</span>
            <div>
              <h4 className="font-bold text-blue-900 text-xs sm:text-sm mb-1">
                💡 टोकन नंबर कैसे प्राप्त करें?
              </h4>
              <p className="leading-relaxed text-slate-600 text-[11px] sm:text-xs">
                जब आप Monu Mobile Solution पर अपना फोन रिपेयर के लिए जमा करते हैं, तो आपको मिलने वाली जॉब रसीद पर &apos;टोकन नंबर&apos; (उदा. MMS-1001) लिखा होता है। आप अपने रजिस्टर्ड मोबाइल नंबर से भी सीधे सर्च कर सकते हैं।
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-xl mx-auto mb-3">
          <div className="relative flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              placeholder={t.trackPlaceholder}
              className="w-full p-3.5 pl-4 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white uppercase tracking-wider outline-none"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <span>खोजा जा रहा है...</span> : <span>{t.checkStatusBtn}</span>}
          </button>
        </div>

        {/* Quick Demo Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 max-w-xl mx-auto mb-6">
          <span className="font-medium text-[11px]">डेमो चेक करने के लिए किसी एक पर क्लिक करें:</span>
          <button
            type="button"
            onClick={() => handleSearch('MMS-1001')}
            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg border border-blue-200 text-[11px] transition cursor-pointer"
          >
            MMS-1001
          </button>
          <button
            type="button"
            onClick={() => handleSearch('MMS-1002')}
            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg border border-emerald-200 text-[11px] transition cursor-pointer"
          >
            MMS-1002
          </button>
          <button
            type="button"
            onClick={() => handleSearch('9723338321')}
            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-lg border border-purple-200 text-[11px] transition cursor-pointer"
          >
            9723338321
          </button>
        </div>

        {/* Results Card */}
        {result && (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-md max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">टोकन / जॉब नंबर:</span>
                <span className="text-base sm:text-lg font-black text-slate-900">{result.token || result.tokenNo}</span>
              </div>
              {getBadge(result.status)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">ग्राहक का नाम:</span>
                <strong className="text-slate-800 text-sm">{result.customerName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">डिवाइस / मॉडल:</span>
                <strong className="text-slate-800 text-sm">{result.brand} {result.model}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">समस्या:</span>
                <p className="text-slate-700 font-medium">{result.problem}</p>
              </div>
              <div>
                <span className="text-slate-500 block">रिपेयर लैब शाखा:</span>
                <p className="text-blue-700 font-bold">{result.branchName}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-xl border border-slate-200 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">अनुमानित खर्च:</span>
                <strong className="text-slate-900">₹{result.estCost}</strong>
              </div>
              <div>
                <span className="text-[10px] text-emerald-600 block">एडवांस जमा:</span>
                <strong className="text-emerald-700">₹{result.paid}</strong>
              </div>
              <div>
                <span className="text-[10px] text-rose-600 block">शेष बकाया:</span>
                <strong className="text-rose-700">₹{result.due}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <a
                href={`https://wa.me/917905859701?text=${encodeURIComponent(`नमस्ते, मुझे मेरे टोकन नंबर ${result.token || result.tokenNo} के बारे में जानकारी चाहिए।`)}`}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <span>💬 व्हाट्सएप पर स्टेटस पूछें</span>
              </a>
            </div>
          </div>
        )}

        {notFound && (
          <div className="p-6 text-center text-rose-700 bg-rose-50 rounded-2xl border border-rose-200 max-w-xl mx-auto">
            <p className="font-bold text-sm">❌ कोई रिकॉर्ड नहीं मिला (No Record Found)</p>
            <p className="text-xs text-slate-600 mt-1">
              कृपया टोकन नंबर या 10 अंकों का मोबाइल नंबर दोबारा जांचें, या तुरंत कॉल करें: <strong>7905859701</strong>
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
