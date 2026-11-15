import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { InvoiceItem } from '@/types';

export const PosTab: React.FC = () => {
  const { inventory, addInvoice, currentUser, branches, activeBranch } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(
    activeBranch !== 'all' ? activeBranch : 'branch_hazratganj'
  );
  const [cart, setCart] = useState<InvoiceItem[]>([]);
  const [searchItem, setSearchItem] = useState('');
  const [paymentMode, setPaymentMode] = useState<'cash' | 'upi' | 'card' | 'khata'>('cash');
  const [discount, setDiscount] = useState(0);
  const [includeGst, setIncludeGst] = useState(false);
  const [lastBill, setLastBill] = useState<any | null>(null);

  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  const addToCart = (name: string, rate: number) => {
    const existing = cart.find(c => c.name === name);
    if (existing) {
      setCart(cart.map(c => c.name === name ? { ...c, qty: c.qty + 1, amount: (c.qty + 1) * c.rate } : c));
    } else {
      setCart([...cart, { id: 'it_' + Date.now(), name, qty: 1, rate, amount: rate }]);
    }
  };

  const removeFromCart = (name: string) => {
    setCart(cart.filter(c => c.name !== name));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.amount, 0);
  const gstAmount = includeGst ? Math.round(subtotal * 0.18) : 0;
  const total = Math.max(0, subtotal + gstAmount - discount);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('कृपया बिल में कम से कम 1 आइटम या सर्विस जोड़ें!');
      return;
    }
    if (!customerPhone || customerPhone.length < 10) {
      alert('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें!');
      return;
    }

    const now = new Date();
    const billNo = 'MMS-INV-' + Math.floor(100 + Math.random() * 900);

    const invoice = addInvoice({
      billNo,
      invoiceNo: billNo,
      customerName: customerName || 'काउंटर ग्राहक',
      customerPhone,
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: cart,
      subtotal,
      gstRate: includeGst ? 18 : 0,
      gstAmount,
      discount,
      total,
      net: total,
      paid: total,
      due: 0,
      paymentMode,
      billedBy: currentUser?.name || 'स्टाफ'
    });

    setLastBill(invoice);
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">🧾 POS बिलिंग काउंटर (Billing System)</h2>
        <p className="text-xs text-slate-500 mt-0.5">थर्मल 3-इंच 80mm रसीद, A4 GST इनवॉइस व व्हाट्सएप रसीद</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Item Catalog & Services */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="स्पेयर पार्ट्स या सर्विस खोजें (उदा. iPhone Display, Battery)..."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {inventory
              .filter(i => i.name.toLowerCase().includes(searchItem.toLowerCase()) || i.category.includes(searchItem.toLowerCase()))
              .map(item => (
                <div
                  key={item.id}
                  onClick={() => addToCart(item.name, item.sellingPrice)}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl cursor-pointer transition flex items-center justify-between"
                >
                  <div>
                    <strong className="text-xs font-bold text-slate-800 block">{item.name}</strong>
                    <span className="text-[10px] text-slate-500">स्टॉक: {item.qty} | {item.brand}</span>
                  </div>
                  <span className="text-xs font-black text-blue-600">₹{item.sellingPrice}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Cart & Billing Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">काउंटर बिल विवरण</h3>

          <form onSubmit={handleCheckout} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">मोबाइल नंबर *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">ग्राहक का नाम</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="नाम दर्ज करें"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl outline-none"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="border border-slate-200 rounded-xl p-3 min-h-[120px] max-h-48 overflow-y-auto space-y-2">
              {cart.length === 0 ? (
                <p className="text-slate-400 text-center py-6 text-xs">कार्ट खाली है। बाईं तरफ से पार्ट्स चुनें।</p>
              ) : (
                cart.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs border-b border-slate-100 pb-1">
                    <div className="truncate max-w-[160px]">
                      <span className="font-bold text-slate-800 block truncate">{item.name}</span>
                      <span className="text-[10px] text-slate-500">{item.qty} × ₹{item.rate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">₹{item.amount}</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.name)}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Financial Summary */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>उप-कुल (Subtotal):</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGst}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                  />
                  <span>GST 18% लगाएं:</span>
                </label>
                <span>₹{gstAmount}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                <span>कुल देय राशि:</span>
                <span className="text-blue-600">₹{total}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">पेमेंट माध्यम:</label>
              <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
                {(['cash', 'upi', 'card', 'khata'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`py-1.5 rounded-lg border uppercase transition ${
                      paymentMode === mode ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition cursor-pointer"
            >
              🧾 बिल बनाएं व प्रिंट करें
            </button>
          </form>

        </div>

      </div>

      {/* Bill Success Modal */}
      {lastBill && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <span className="text-4xl">🎉</span>
            <h3 className="text-base font-black text-slate-900">बिल सफलतापूर्वक जनरेट हुआ!</h3>
            <p className="text-xs text-slate-600 font-mono">बिल नंबर: <strong>{lastBill.billNo}</strong> | राशि: <strong>₹{lastBill.total}</strong></p>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/91${lastBill.customerPhone}?text=${encodeURIComponent(`नमस्ते ${lastBill.customerName}, Monu Mobile Solution से आपका इनवॉइस ${lastBill.billNo} कुल ₹${lastBill.total} जनरेट हो चुका है। आपका बहुत बहुत धन्यवाद!`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>💬 व्हाट्सएप पर इनवॉइस भेजें</span>
              </a>
              <button
                onClick={() => setLastBill(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
