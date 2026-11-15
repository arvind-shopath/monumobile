import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { JobCard } from '@/types';

export const JobsTab: React.FC = () => {
  const { jobs, addJob, updateJobStatus, branches, activeBranch } = useApp();

  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [problem, setProblem] = useState('');
  const [estCost, setEstCost] = useState(0);
  const [paid, setPaid] = useState(0);
  const [branchId, setBranchId] = useState('branch_hazratganj');

  const filteredJobs = activeBranch === 'all' ? jobs : jobs.filter(j => j.branchId === activeBranch);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone || !model || !problem) {
      alert('कृपया मोबाइल नंबर, मॉडल व समस्या भरें!');
      return;
    }

    const token = 'MMS-' + Math.floor(1000 + Math.random() * 9000);
    const branch = branches.find(b => b.id === branchId) || branches[0];

    addJob({
      token,
      tokenNo: token,
      customerName: customerName || 'ग्राहक',
      customerPhone,
      brand,
      model,
      problem,
      estCost: Number(estCost),
      finalCost: Number(estCost),
      paid: Number(paid),
      due: Math.max(0, Number(estCost) - Number(paid)),
      status: 'in-progress',
      branchId: branch.id,
      branchName: branch.name,
      date: new Date().toISOString().split('T')[0]
    });

    setShowNewJobModal(false);
    setCustomerName('');
    setCustomerPhone('');
    setModel('');
    setProblem('');
    setEstCost(0);
    setPaid(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">🔧 रिपेयर जॉब-शीट व टोकन (Job Cards)</h2>
          <p className="text-xs text-slate-500 mt-0.5">लाइव हैंडसेट रिपेयरिंग स्टेटस व टोकन ट्रैकिंग</p>
        </div>

        <button
          onClick={() => setShowNewJobModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          + नया जॉब टोकन बनाएं
        </button>
      </div>

      {/* Jobs Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">टोकन नं</th>
                <th className="p-3">ग्राहक विवरण</th>
                <th className="p-3">डिवाइस / मॉडल</th>
                <th className="p-3">समस्या</th>
                <th className="p-3">लागत / बकाया</th>
                <th className="p-3">शाखा</th>
                <th className="p-3">स्टेटस अपडेट</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-black text-blue-600">{job.token || job.tokenNo}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    <div>{job.customerName}</div>
                    <div className="text-[10px] text-slate-400">{job.customerPhone}</div>
                  </td>
                  <td className="p-3 font-bold text-slate-700">{job.brand} {job.model}</td>
                  <td className="p-3 text-slate-600 max-w-[200px] truncate">{job.problem}</td>
                  <td className="p-3 font-semibold text-slate-800">
                    <div>अनुमानित: ₹{job.estCost}</div>
                    <div className={`text-[10px] ${job.due > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}`}>
                      बकाया: ₹{job.due}
                    </div>
                  </td>
                  <td className="p-3 text-slate-500 text-[11px]">{job.branchName}</td>
                  <td className="p-3">
                    <select
                      value={job.status}
                      onChange={(e) => updateJobStatus(job.id, e.target.value as JobCard['status'])}
                      className={`text-[11px] font-bold p-1 rounded-lg border outline-none ${
                        job.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                        job.status === 'ready' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                        'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="in-progress">⏳ इन-प्रोग्रेस</option>
                      <option value="ready">🎉 तैयार (Ready)</option>
                      <option value="delivered">✅ डिलीवर (Delivered)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">नया रिपेयर जॉब टोकन दर्ज करें</h3>
              <button onClick={() => setShowNewJobModal(false)} className="text-slate-400 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ग्राहक का नाम</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="उदा. राहुल कुमार"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मोबाइल नंबर *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">ब्रांड</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="Apple">Apple iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Xiaomi">Xiaomi / Redmi</option>
                    <option value="Realme">Realme</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मॉडल *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="उदा. 13 Pro Max"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">समस्या (Issue Diagnosis) *</label>
                <input
                  type="text"
                  required
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="उदा. डिस्प्ले क्रैक / टच काम नहीं कर रहा"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">अनुमानित खर्च (₹) *</label>
                  <input
                    type="number"
                    required
                    value={estCost || ''}
                    onChange={(e) => setEstCost(Number(e.target.value))}
                    placeholder="4500"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">एडवांस जमा (₹)</label>
                  <input
                    type="number"
                    value={paid || ''}
                    onChange={(e) => setPaid(Number(e.target.value))}
                    placeholder="1000"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">शाखा</label>
                <select
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs"
                >
                  टोकन बनाएं
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
