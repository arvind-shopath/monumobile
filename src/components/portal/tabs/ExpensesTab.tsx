import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export const ExpensesTab: React.FC = () => {
  const { expenses, addExpense, branches, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<'tea_snack' | 'electricity' | 'rent' | 'courier' | 'tools' | 'salary_advance' | 'misc'>('tea_snack');
  const [branchId, setBranchId] = useState('branch_hazratganj');
  const [paymentMode, setPaymentMode] = useState<'cash' | 'upi'>('cash');
  const [showModal, setShowModal] = useState(false);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) {
      alert('कृपया खर्च का विवरण व राशि दर्ज करें!');
      return;
    }
    const branch = branches.find(b => b.id === branchId) || branches[0];

    addExpense({
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      branchId: branch.id,
      branchName: branch.shortName,
      paidBy: currentUser?.name || 'स्टाफ',
      paymentMode
    });

    setShowModal(false);
    setTitle('');
    setAmount(0);
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">💸 दुकान खर्च (Shop Expenses)</h2>
          <p className="text-xs text-slate-500 mt-0.5">चाय, नाश्ता, कूरियर, टूल्स व विविध दैनिक खर्च वाउचर</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          + नया खर्च दर्ज करें
        </button>
      </div>

      <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
        <span className="text-xs font-bold text-slate-600">कुल दर्ज खर्च:</span>
        <span className="text-xl font-black text-rose-600">₹{totalExpense.toLocaleString('en-IN')}</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">विवरण</th>
                <th className="p-3">कैटेगरी</th>
                <th className="p-3">शाखा</th>
                <th className="p-3">राशि</th>
                <th className="p-3">माध्यम</th>
                <th className="p-3">तारीख</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">{e.title}</td>
                  <td className="p-3 uppercase text-[10px] font-bold text-slate-600">{e.category}</td>
                  <td className="p-3 text-slate-600">{e.branchName}</td>
                  <td className="p-3 font-black text-rose-600">₹{e.amount}</td>
                  <td className="p-3 uppercase font-bold text-[10px] text-slate-500">{e.paymentMode}</td>
                  <td className="p-3 text-slate-400">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-900">नया खर्च दर्ज करें</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">खर्च विवरण *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="उदा. लैब चाय, स्पेयर पार्सल कूरियर"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">राशि (₹) *</label>
                <input
                  type="number"
                  required
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="150"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-black text-rose-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">कैटेगरी</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="tea_snack">चाय व नाश्ता</option>
                    <option value="courier">कूरियर डिलीवरी</option>
                    <option value="electricity">बिजली / बिल</option>
                    <option value="tools">लैब टूल्स</option>
                    <option value="misc">विविध (Misc)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">माध्यम</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase"
                  >
                    <option value="cash">Cash</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-xs"
                >
                  सेव करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
