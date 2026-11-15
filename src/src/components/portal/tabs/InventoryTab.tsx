import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export const InventoryTab: React.FC = () => {
  const { inventory, updateInventoryStock, addInventoryItem, activeBranch, branches } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'screen' | 'battery' | 'charging' | 'motherboard' | 'glass' | 'accessories' | 'tools'>('screen');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [qty, setQty] = useState(10);
  const [minQty, setMinQty] = useState(3);
  const [costPrice, setCostPrice] = useState(1000);
  const [sellingPrice, setSellingPrice] = useState(1800);
  const [branchId, setBranchId] = useState('branch_hazratganj');

  const filtered = inventory.filter(i => {
    const matchCat = filterCategory === 'all' || i.category === filterCategory;
    const matchBranch = activeBranch === 'all' || i.branchId === activeBranch;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchBranch && matchSearch;
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const branch = branches.find(b => b.id === branchId) || branches[0];
    addInventoryItem({
      sku: sku || 'SKU-' + Date.now().toString().slice(-4),
      name,
      category,
      brand,
      model,
      qty: Number(qty),
      minQty: Number(minQty),
      costPrice: Number(costPrice),
      sellingPrice: Number(sellingPrice),
      branchId: branch.id,
      branchName: branch.shortName
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">📦 इन्वेंट्री & स्पेयर पार्ट्स SKU (Stock Control)</h2>
          <p className="text-xs text-slate-500 mt-0.5">ओरिजिनल डिस्प्ले, बैटरी, IC व स्पेयर पार्ट्स का लाइव स्टॉक</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          + नया SKU पार्ट जोड़ें
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="पार्ट का नाम या SKU कोड खोजें..."
          className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium w-full sm:w-64 outline-none"
        />

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          {['all', 'screen', 'battery', 'charging', 'motherboard', 'glass'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border capitalize transition ${
                filterCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3">SKU</th>
                <th className="p-3">पार्ट का नाम व मॉडल</th>
                <th className="p-3">कैटेगरी</th>
                <th className="p-3">शाखा</th>
                <th className="p-3">लागत / विक्रय मूल्य</th>
                <th className="p-3">स्टॉक स्थिति</th>
                <th className="p-3">क्विक स्टॉक एडजस्ट</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(item => {
                const isLow = item.qty <= item.minQty;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-slate-600">{item.sku}</td>
                    <td className="p-3">
                      <strong className="text-slate-900 block">{item.name}</strong>
                      <span className="text-[10px] text-slate-400">{item.brand} • {item.model}</span>
                    </td>
                    <td className="p-3 uppercase text-[10px] font-bold">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">{item.category}</span>
                    </td>
                    <td className="p-3 text-slate-600 text-[11px]">{item.branchName}</td>
                    <td className="p-3 text-xs">
                      <div>क्रय: ₹{item.costPrice}</div>
                      <div className="font-bold text-blue-600">विक्रय: ₹{item.sellingPrice}</div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                        isLow ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.qty} पीस {isLow && '(कम स्टॉक)'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateInventoryStock(item.id, -1)}
                          className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateInventoryStock(item.id, 1)}
                          className="w-7 h-7 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Part Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">नया स्पेयर SKU पार्ट जोड़ें</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">पार्ट का नाम *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. iPhone 14 Pro Max OLED Folder"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
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
                    <option value="screen">Screen / Display</option>
                    <option value="battery">Battery</option>
                    <option value="charging">Charging Sub-board</option>
                    <option value="motherboard">Motherboard IC</option>
                    <option value="glass">Glass & OCA</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">मॉडल</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="उदा. 14 Pro Max"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">खरीद लागत (₹)</label>
                  <input
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">विक्रय दर (₹)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">शुरुआती मात्रा (Qty)</label>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">न्यूनतम थ्रेशोल्ड अलर्ट</label>
                  <input
                    type="number"
                    value={minQty}
                    onChange={(e) => setMinQty(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs"
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
