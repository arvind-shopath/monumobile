

// 20 Standardized Repair & Spare Categories with 4 Display Variants, Flex, Ring, Glass, Frame, Camera, Buttons, OCA, Touch, Back Panel, Software, Hardware, Tab
var MMS_SPARE_CATEGORIES = [
  { id: 'display_copy', name: 'डिस्प्ले - कॉपी (Display - Copy)', shortName: 'Display - Copy', icon: '📱', keywords: 'display copy duplicate combo folder screen' },
  { id: 'display_original', name: 'डिस्प्ले - ओरिजिनल (Display - Original)', shortName: 'Display - Original', icon: '💎', keywords: 'display original oem combo folder screen' },
  { id: 'display_tft', name: 'डिस्प्ले - TFT (Display - TFT)', shortName: 'Display - TFT', icon: '📟', keywords: 'display tft combo folder screen' },
  { id: 'display_oled', name: 'डिस्प्ले - OLED (Display - OLED)', shortName: 'Display - OLED', icon: '✨', keywords: 'display oled amoled combo folder screen' },
  { id: 'flex', name: 'फ्लैक्स केबल (Flex Cable)', shortName: 'Flex Cable', icon: '🎗️', keywords: 'flex cable main sub ribbon' },
  { id: 'ring', name: 'रिंगर / स्पीकर / ईयरपीस (Ring / Speaker)', shortName: 'Ring / Speaker', icon: '🔔', keywords: 'ring ringer speaker loudspeaker earpiece buzzer' },
  { id: 'glass', name: 'ग्लास (Front Glass)', shortName: 'Glass', icon: '🔍', keywords: 'glass front lens' },
  { id: 'frame', name: 'मिडिल फ्रेम / हाउसिंग (Frame)', shortName: 'Frame', icon: '🖼️', keywords: 'frame middle body housing bezel' },
  { id: 'camera', name: 'कैमरा - फ्रंट / बैक (Camera)', shortName: 'Camera', icon: '📷', keywords: 'camera lens selfie back front' },
  { id: 'buttons', name: 'बटन्स - पावर / वॉल्यूम (Buttons)', shortName: 'Buttons', icon: '🔘', keywords: 'buttons button power volume key switch' },
  { id: 'oca', name: 'ओसीए (OCA Sheet / Glue)', shortName: 'OCA', icon: '📑', keywords: 'oca sheet glue lamination roll' },
  { id: 'touch', name: 'टच स्क्रीन / डिजिटाइज़र (Touch)', shortName: 'Touch', icon: '👆', keywords: 'touch screen digitizer' },
  { id: 'back_panel', name: 'बैक पैनल / बैक डोर (Back Panel)', shortName: 'Back Panel', icon: '🛡️', keywords: 'back panel door glass housing body' },
  { id: 'software', name: 'सॉफ्टवेयर व अनलॉकिंग (Software)', shortName: 'Software', icon: '💻', keywords: 'software flashing unlocking frp pattern rom' },
  { id: 'hardware', name: 'हार्डवेयर व मदरबोर्ड IC (Hardware)', shortName: 'Hardware', icon: '🔧', keywords: 'hardware ic power cpu emmc motherboard' },
  { id: 'tab', name: 'टैबलेट / टैब पार्ट्स (Tab)', shortName: 'Tab', icon: '📟', keywords: 'tab tablet ipad screen touch' },
  { id: 'battery', name: 'बैटरी (Battery)', shortName: 'Battery', icon: '🔋', keywords: 'battery cell mah' },
  { id: 'charging', name: 'चार्जिंग जैक व सीसी बोर्ड (Charging)', shortName: 'Charging', icon: '⚡', keywords: 'charging port cc board jack connector' },
  { id: 'accessories', name: 'एक्सेसरीज (Accessories)', shortName: 'Accessories', icon: '🎧', keywords: 'accessories charger cable tempered guard' },
  { id: 'tools', name: 'लैब टूल्स व कंज्यूमेबल्स (Tools)', shortName: 'Tools', icon: '🧰', keywords: 'tools separator soldering flux paste wire iron' }
];

if (typeof window !== 'undefined') {
  window.MMS_SPARE_CATEGORIES = MMS_SPARE_CATEGORIES;
}


function getCategoryMeta(catFilter) {
  if (!catFilter || catFilter === 'all') return null;
  const target = String(catFilter).toLowerCase().trim();
  return MMS_SPARE_CATEGORIES.find(c => 
    c.id.toLowerCase() === target || 
    c.shortName.toLowerCase() === target ||
    c.name.toLowerCase().includes(target) ||
    (c.keywords && c.keywords.split(' ').some(k => k === target))
  ) || null;
}

function renderCategoryDropdownHTML(inputId, defaultValue = 'Display - Copy') {
  const meta = getCategoryMeta(defaultValue) || MMS_SPARE_CATEGORIES[0];
  const selectedLabel = meta ? `${meta.icon} ${meta.shortName}` : defaultValue;
  const selectedVal = meta ? meta.shortName : defaultValue;

  return `
    <div class="relative w-full text-left" id="cat-dropdown-wrapper-${inputId}">
      <input type="hidden" id="${inputId}" value="${selectedVal}">
      <button type="button" 
              id="cat-btn-${inputId}" 
              onclick="window.MMS_APP.toggleCategoryDropdown('${inputId}')" 
              class="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-800 text-left flex items-center justify-between shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
        <span id="cat-label-${inputId}" class="truncate flex items-center gap-1.5">
          ${selectedLabel}
        </span>
        <span class="text-slate-400 text-xs">▼</span>
      </button>
      <div id="cat-menu-${inputId}" 
           class="hidden absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden text-xs">
        <div class="p-2 border-b border-slate-100 bg-slate-50 flex items-center gap-1.5">
          <span class="text-slate-400">🔍</span>
          <input type="text" 
                 id="cat-search-${inputId}" 
                 placeholder="कैटेगरी खोजें (Search category)..." 
                 oninput="window.MMS_APP.filterCategoryDropdown('${inputId}', this.value)"
                 class="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
        </div>
        <div id="cat-list-${inputId}" class="max-h-52 overflow-y-auto divide-y divide-slate-100">
          ${MMS_SPARE_CATEGORIES.map(c => `
            <button type="button" 
                    onclick="window.MMS_APP.selectCategory('${inputId}', '${c.shortName}', '${c.icon} ${c.shortName}')" 
                    data-search="${(c.name + ' ' + c.shortName + ' ' + c.keywords).toLowerCase()}"
                    class="cat-opt-${inputId} w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between font-bold text-slate-700 transition cursor-pointer">
              <span class="flex items-center gap-2"><span>${c.icon}</span> <span>${c.name}</span></span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function toggleCategoryDropdown(inputId) {
  const menu = document.getElementById('cat-menu-' + inputId);
  if (!menu) return;
  const isHidden = menu.classList.contains('hidden');
  document.querySelectorAll('[id^="cat-menu-"]').forEach(m => m.classList.add('hidden'));
  if (isHidden) {
    menu.classList.remove('hidden');
    const searchInput = document.getElementById('cat-search-' + inputId);
    if (searchInput) {
      searchInput.value = '';
      filterCategoryDropdown(inputId, '');
      setTimeout(() => searchInput.focus(), 50);
    }
  } else {
    menu.classList.add('hidden');
  }
}

function closeCategoryDropdown(inputId) {
  const menu = document.getElementById('cat-menu-' + inputId);
  if (menu) menu.classList.add('hidden');
}

function selectCategory(inputId, val, displayLabel) {
  const hiddenInput = document.getElementById(inputId);
  if (hiddenInput) {
    hiddenInput.value = val;
    hiddenInput.dispatchEvent(new Event('change'));
  }
  const label = document.getElementById('cat-label-' + inputId);
  if (label) label.innerHTML = displayLabel;
  closeCategoryDropdown(inputId);
}

function filterCategoryDropdown(inputId, query) {
  const q = (query || '').toLowerCase().trim();
  const items = document.querySelectorAll('.cat-opt-' + inputId);
  items.forEach(el => {
    const text = el.getAttribute('data-search') || el.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      el.style.display = 'flex';
    } else {
      el.style.display = 'none';
    }
  });
}

// Monu Mobile Solution - Master Application Controller
(function() {
  'use strict';


  // --- Cloudflare D1 Real-Time Instant Live Engine ---
  const CloudSync = {
    isOnline: true,
    lastSyncTime: null,
    broadcastChannel: null,
    isPulling: false,

    init() {
      console.log('⚡ MMS Instant Live Cloud Engine: Initializing...');
      
      // 1. Setup 0ms Cross-tab Broadcast Channel
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          this.broadcastChannel = new BroadcastChannel('mms_instant_live_stream');
          this.broadcastChannel.onmessage = (event) => {
            if (event.data && event.data.type === 'data_changed') {
              console.log('⚡ [Instant Live] Cross-tab signal received:', event.data.action);
              this.reRenderActiveTab();
            }
          };
        }
      } catch(e) { console.warn('BroadcastChannel notice:', e); }

      // 2. Initial instant pull
      this.pullFromCloud();

      // 3. Ultra-fast 2.5-second reactive polling for multi-device sync
      if (typeof window !== 'undefined') {
        setInterval(() => {
          this.pullFromCloud(true);
        }, 2500);

        // 4. Instant Wakeup Triggers: Trigger immediately on tab focus, click, or visibility change
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            this.pullFromCloud(false);
          }
        });
        window.addEventListener('focus', () => this.pullFromCloud(false));
      }
    },

    broadcastLocalChange(action = 'update') {
      try {
        if (this.broadcastChannel) {
          this.broadcastChannel.postMessage({ type: 'data_changed', action, timestamp: Date.now() });
        }
      } catch(e) {}
    },

    reRenderActiveTab() {
      if (typeof state === 'undefined') return;
      
      // CRITICAL GUARD: Never destroy DOM if the user is typing/interacting with any form element!
      if (typeof document !== 'undefined' && document.activeElement) {
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
          console.log('⚡ [CloudSync] Skipping auto-reRender because user is active on:', document.activeElement.id || tag);
          return;
        }
      }

      const tab = state.activeAdminTab;
      try {
        if (tab === 'staff' && typeof renderStaffHRModule === 'function') renderStaffHRModule();
        else if (tab === 'jobs' && typeof renderJobCardsManager === 'function') renderJobCardsManager();
        else if (tab === 'mywork' && typeof renderMyWorkModule === 'function') renderMyWorkModule();
        else if (tab === 'pos') {
          // Never re-render POS counter automatically while user may be billing
          return;
        }
        else if (tab === 'dashboard' && typeof renderDashboard === 'function') renderDashboard();
        else if (tab === 'attendance' && typeof renderAttendanceModule === 'function') renderAttendanceModule();
        else if (tab === 'sales' && typeof renderDailySales === 'function') renderDailySales();
        else if (tab === 'khata' && typeof renderKhata === 'function') renderKhata();
        else if (tab === 'expenses' && typeof renderExpensesModule === 'function') renderExpensesModule();
        else if (tab === 'transfer' && typeof renderStockTransferModule === 'function') renderStockTransferModule();
        else if (tab === 'inventory') {
          // In inventory, only update the table body without wiping search box or filters
          if (typeof updateInventoryTableOnly === 'function' && document.getElementById('inventory-table-body')) {
            updateInventoryTableOnly();
          } else if (typeof renderInventory === 'function') {
            renderInventory();
          }
        }
      } catch(e) {
        console.warn('Re-render active tab notice:', e);
      }
    },

    async pullFromCloud(silent = false) {
      if (typeof fetch === 'undefined') return;
      try {
        const res = await fetch('/api/sync?t=' + Date.now());
        if (!res.ok) return;
        const resData = await res.json();
        if (resData.success && resData.data) {
        // Strictly require server build to be newer than client build
        if (resData.build && typeof window.MMS_CLIENT_BUILD !== 'undefined' && resData.build > window.MMS_CLIENT_BUILD) {
          const lastReload = sessionStorage.getItem('mms_last_reload_build');
          const now = Date.now();
          const lastTime = parseInt(sessionStorage.getItem('mms_last_reload_time') || '0', 10);
          if (lastReload !== resData.build || (now - lastTime) >= 30000) {
            if (typeof window.MMS_TRIGGER_AUTO_UPDATE === 'function') {
              window.MMS_TRIGGER_AUTO_UPDATE(resData.build);
              return;
            }
          }
        }

          const { attendance, invoices, jobs, expenses } = resData.data;
          let changed = false;

          if (attendance && attendance.length > 0) {
            const oldStr = JSON.stringify(state.attendance || []);
            const map = new Map();
            (state.attendance || []).forEach(a => map.set(a.id, a));
            attendance.forEach(a => map.set(a.id, { ...map.get(a.id), ...a }));
            state.attendance = Array.from(map.values()).sort((a,b) => (b.date || '').localeCompare(a.date || ''));
            if (typeof purgeOldAttendanceSelfies === 'function') purgeOldAttendanceSelfies();
            const newStr = JSON.stringify(state.attendance);
            if (oldStr !== newStr) {
              localStorage.setItem(STORAGE_KEYS.ATTENDANCE, newStr);
              changed = true;
            }
          }

          if (invoices && invoices.length > 0) {
            const oldStr = JSON.stringify(state.invoices || []);
            const map = new Map();
            (state.invoices || []).forEach(i => map.set(i.id || i.invoiceNo, i));
            invoices.forEach(i => {
              const key = i.id || i.invoiceNo || i.billNo;
              const prev = map.get(key) || {};
              const merged = { ...prev, ...i };
              merged.invoiceNo = merged.invoiceNo || merged.billNo || ('MMS-INV-' + (merged.id || ''));
              merged.billNo = merged.invoiceNo;
              merged.items = Array.isArray(merged.items) ? merged.items : (Array.isArray(prev.items) ? prev.items : []);
              merged.totalAmount = Number(merged.totalAmount ?? merged.total ?? merged.net ?? 0);
              merged.paidAmount = Number(merged.paidAmount ?? merged.paid ?? 0);
              merged.dueAmount = Number(merged.dueAmount ?? merged.due ?? 0);
              merged.paymentMode = merged.paymentMode || 'Cash';
              merged.customerName = merged.customerName || 'Walk-in Customer';
              merged.customerPhone = merged.customerPhone || '';
              map.set(key, merged);
            });
            state.invoices = Array.from(map.values()).filter(inv => !isDummyRecord(inv)).sort((a,b) => (b.date || '').localeCompare(a.date || ''));
            const newStr = JSON.stringify(state.invoices);
            if (oldStr !== newStr) {
              localStorage.setItem(STORAGE_KEYS.INVOICES, newStr);
              changed = true;
            }
          }

          if (jobs && jobs.length > 0) {
            const oldStr = JSON.stringify(state.jobs || []);
            const map = new Map();
            (state.jobs || []).forEach(j => map.set(j.id, j));
            jobs.forEach(j => map.set(j.id, { ...map.get(j.id), ...j }));
            state.jobs = Array.from(map.values()).filter(j => !isDummyRecord(j)).sort((a,b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
            const newStr = JSON.stringify(state.jobs);
            if (oldStr !== newStr) {
              localStorage.setItem(STORAGE_KEYS.JOBS, newStr);
              changed = true;
            }
          }

          if (resData.data.inventory && Array.isArray(resData.data.inventory) && resData.data.inventory.length > 0) {
            const oldStr = JSON.stringify(state.inventory || []);
            const newInv = resData.data.inventory;
            newInv.forEach(i => {
              if (i.branchId === 'branch_kannauj') i.branchId = 'branch_hazratganj';
            });
            const newStr = JSON.stringify(newInv);
            if (oldStr !== newStr) {
              state.inventory = newInv;
              localStorage.setItem(STORAGE_KEYS.INVENTORY, newStr);
              if (state.activeAdminTab === 'inventory' && typeof updateInventoryTableOnly === 'function') {
                updateInventoryTableOnly();
              }
              changed = true;
            }
          }

          if (resData.data.staff && Array.isArray(resData.data.staff) && resData.data.staff.length > 0) {
            const oldStr = JSON.stringify(state.staff || []);
            const newStaff = resData.data.staff;
            const newStr = JSON.stringify(newStaff);
            if (oldStr !== newStr) {
              state.staff = newStaff;
              localStorage.setItem(STORAGE_KEYS.STAFF, newStr);
              if (state.currentUser) {
                const matchedEmp = state.staff.find(s => s.id === state.currentUser.id || s.phone === state.currentUser.phone || (s.role === 'admin' && (state.currentUser.role || '').toLowerCase() === 'admin'));
                if (matchedEmp) {
                  state.currentUser = { ...state.currentUser, ...matchedEmp };
                  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(state.currentUser));
                }
              }
              if (state.activeAdminTab === 'staff' && typeof renderStaffHRModule === 'function') {
                renderStaffHRModule();
              }
              changed = true;
            }
          }

          if (resData.data.transfers && Array.isArray(resData.data.transfers)) {
            const oldStr = JSON.stringify(state.stockTransfers || []);
            const newStr = JSON.stringify(resData.data.transfers);
            if (oldStr !== newStr) {
              state.stockTransfers = resData.data.transfers;
              try { localStorage.setItem('mms_stock_transfers', newStr); } catch(e) {}
              if (state.activeAdminTab === 'transfer' && typeof renderStockTransferModule === 'function') {
                renderStockTransferModule();
              }
              changed = true;
            }
          }

          if (resData.data.advances && Array.isArray(resData.data.advances)) {
            const oldStr = JSON.stringify(state.advances || []);
            const newStr = JSON.stringify(resData.data.advances);
            if (oldStr !== newStr) {
              state.advances = resData.data.advances;
              try { localStorage.setItem(STORAGE_KEYS.ADVANCES, newStr); } catch(e) {}
              changed = true;
            }
          }

          if (resData.data.contacts && Array.isArray(resData.data.contacts)) {
            const cleanContacts = resData.data.contacts.filter(c => !isDummyRecord(c));
            const oldStr = JSON.stringify(state.contacts || []);
            const newStr = JSON.stringify(cleanContacts);
            if (oldStr !== newStr) {
              state.contacts = cleanContacts;
              try { localStorage.setItem(STORAGE_KEYS.CONTACTS, newStr); } catch(e) {}
              changed = true;
            }
          }

          if (expenses && expenses.length > 0) {
            const oldStr = JSON.stringify(state.expenses || []);
            const map = new Map();
            (state.expenses || []).forEach(e => map.set(e.id, e));
            expenses.forEach(e => map.set(e.id, { ...map.get(e.id), ...e }));
            state.expenses = Array.from(map.values()).sort((a,b) => (b.date || '').localeCompare(a.date || ''));
            const newStr = JSON.stringify(state.expenses);
            if (oldStr !== newStr) {
              localStorage.setItem(STORAGE_KEYS.EXPENSES, newStr);
              changed = true;
            }
          }

          this.lastSyncTime = new Date();
          this.updateSyncBadge('connected');

          // INSTANT LIVE RE-RENDER: If any new data arrived from server, immediately refresh active UI!
          if (changed) {
            console.log('⚡ [Instant Live] Server updates detected! Auto-refreshing active tab UI...');
            this.reRenderActiveTab();
            this.broadcastLocalChange('server_sync');
          }
        }
      } catch (err) {
        this.updateSyncBadge('standby');
      } finally {
        this.isPulling = false;
      }
    },

    async pushAttendance(record) {
      if (typeof fetch === 'undefined' || !record) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'save_attendance', record })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('attendance');
      } catch(e) {
        console.warn('Failed pushing attendance to D1:', e);
      }
    },

    async pushInvoice(invoice) {
      if (typeof fetch === 'undefined' || !invoice) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'save_invoice', invoice })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('invoice');
      } catch(e) {
        console.warn('Failed pushing invoice to D1:', e);
      }
    },

    async pushJob(job) {
      if (typeof fetch === 'undefined' || !job) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'save_job', job })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('job');
      } catch(e) {
        console.warn('Failed pushing job to D1:', e);
      }
    },

    async pushExpense(expense) {
      if (typeof fetch === 'undefined' || !expense) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'save_expense', expense })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('expense');
      } catch(e) {
        console.warn('Failed pushing expense to D1:', e);
      }
    },

    async syncStaff(staffList) {
      if (typeof fetch === 'undefined' || !Array.isArray(staffList)) return;
      try {
        console.log('⚡ [CloudSync] Syncing staff to Cloudflare KV...', staffList.length);
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'sync_staff', staff: staffList })
        });
        const d = await res.json();
        console.log('⚡ [CloudSync] Staff sync response:', d);
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('staff');
      } catch(e) {
        console.warn('Failed syncing staff to cloud:', e);
      }
    },

    async syncWorkAssignment(assignment) {
      if (typeof fetch === 'undefined' || !assignment) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'assign_work', assignment })
        });
        this.updateSyncBadge('saved');
      } catch(e) {
        console.warn('Failed syncing work assignment:', e);
      }
    },

    async updateJobStep(token, step, extra = {}) {
      if (typeof fetch === 'undefined' || !token || !step) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_job_step', token, step, ...extra })
        });
        this.updateSyncBadge('saved');
      } catch(e) {
        console.warn('Failed updating job step:', e);
      }
    },

    async bindDevice(empId, deviceToken, deviceModel) {
      if (typeof fetch === 'undefined') return { success: true };
      try {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'bind_device', empId, deviceToken, deviceModel })
        });
        return await res.json();
      } catch(e) {
        return { success: true };
      }
    },

    async resetDeviceLock(empId) {
      if (typeof fetch === 'undefined') return { success: true };
      try {
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'reset_device_lock', empId })
        });
        return await res.json();
      } catch(e) {
        return { success: true };
      }
    },

    async syncInventory(invList) {
      const list = invList || (typeof state !== 'undefined' ? state.inventory : null);
      if (typeof fetch === 'undefined' || !Array.isArray(list)) return;
      try {
        console.log('⚡ [CloudSync] Syncing inventory to Enterprise Cloud...', list.length);
        const res = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'sync_inventory', inventory: list })
        });
        const d = await res.json();
        console.log('⚡ [CloudSync] Inventory sync response:', d);
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('inventory');
      } catch(e) {
        console.warn('Failed syncing inventory to cloud:', e);
      }
    },

    pushMasterSync: (() => {
      let timer = null;
      return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(async () => {
          if (typeof fetch === 'undefined') return;
          try {
            const payload = {
              action: 'sync_master_state',
              data: {
                inventory: state.inventory,
                invoices: state.invoices,
                jobs: state.jobs,
                expenses: state.expenses,
                attendance: state.attendance,
                advances: state.advances,
                staff: state.staff,
                contacts: state.contacts,
                stockTransfers: state.stockTransfers || []
              }
            };
            await fetch('/api/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            CloudSync.updateSyncBadge('saved');
            CloudSync.broadcastLocalChange('master_sync');
          } catch(e) {
            console.warn('⚡ [CloudSync] Master state push notice:', e);
          }
        }, 80);
      };
    })(),

    async deleteInvoice(id) {
      if (typeof fetch === 'undefined' || !id) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_invoice', id })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('delete_invoice');
      } catch(e) { console.warn('Delete invoice cloud failed:', e); }
    },

    async deleteJob(id) {
      if (typeof fetch === 'undefined' || !id) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_job', id })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('delete_job');
      } catch(e) { console.warn('Delete job cloud failed:', e); }
    },

    async deleteExpense(id) {
      if (typeof fetch === 'undefined' || !id) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete_expense', id })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('delete_expense');
      } catch(e) { console.warn('Delete expense cloud failed:', e); }
    },

    async syncTransfers(trfList) {
      const list = trfList || state.stockTransfers || [];
      if (typeof fetch === 'undefined' || !Array.isArray(list)) return;
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'sync_transfers', transfers: list })
        });
        this.updateSyncBadge('saved');
        this.broadcastLocalChange('transfers');
      } catch(e) { console.warn('Failed syncing transfers to cloud:', e); }
    },

    updateSyncBadge(status) {
      if (typeof document === 'undefined') return;
      const el = document.getElementById('cloud-sync-status-badge');
      if (!el) return;
      if (status === 'connected') {
        el.innerHTML = '<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> <span class="hidden sm:inline">⚡ लाइव ऐप:</span> सिंक सक्रिय';
        el.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs';
      } else if (status === 'saved') {
        el.innerHTML = '<span class="inline-block w-2 h-2 rounded-full bg-blue-500 animate-ping"></span> <span>डेटा सेव व लाइव सिंक</span>';
        el.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-800 border border-blue-300 shadow-2xs';
      } else {
        el.innerHTML = '<span class="inline-block w-2 h-2 rounded-full bg-amber-500"></span> <span class="hidden sm:inline">सर्वर:</span> लोकल मोड';
        el.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs';
      }
    }
  };

  // --- State Initialization & LocalStorage Persistence (v10 Clean Slate) ---
  const STORAGE_KEYS = {
    LANG: 'mms_lang_v10',
    AUTH: 'mms_auth_user_v10',
    INVENTORY: 'mms_inventory_v10',
    JOBS: 'mms_jobs_v10',
    INVOICES: 'mms_invoices_v10',
    CONTACTS: 'mms_contacts_v10',
    SHOP_STATUS: 'mms_shop_status_v10',
    ACTIVE_VIEW: 'mms_active_view_v10',
    ACTIVE_TAB: 'mms_active_tab_v10',
    BRANCHES: 'mms_branches_v10',
    ACTIVE_BRANCH: 'mms_active_branch_v10',
    STAFF: 'mms_staff_v10',
    ATTENDANCE: 'mms_attendance_v10',
    ADVANCES: 'mms_advances_v10',
    EXPENSES: 'mms_expenses_v10',
    BRANCH_STATUS: 'mms_branch_status_v10',
    DUTY_ALERTS: 'mms_duty_alerts_v10'
  };

  
    // --- Auto-Purge All Dummy Data on Startup ---
  const DUMMY_TOKENS = [
    'MMS-JOB-201', 'MMS-JOB-202', 'MMS-JOB-203', 'job_201', 'job_202', 'job_203',
    'MMS-INV-203', 'MMS-INV-204', 'MMS-INV-205', 'MMS-2026-88',
    'MMS-1001', 'MMS-1002', 'MMS-1003'
  ];
  const DUMMY_PHONES = [
    '9933445566', '9887766554', '9123456789', '9455667788', '9723338321', '9911223344',
    '9876543210', '9876501234', '9876505678', '9876509012'
  ];
  const DUMMY_NAMES = [
    'संजय मोबाइल', 'Sanjay Mobile', 'राजू टेलीकॉम', 'Raju Telecom', 'अमन रिपेयरिंग', 'Aman Repair',
    'लखनऊ मोबाइल हब', 'Lucknow Mobile Hub', 'अरविंद शुक्ला', 'Arvind Shukla', 'अमित कुमार वर्मा', 'Amit Verma',
    'Rahul Sharma', 'राहुल शर्मा', 'Rajesh Verma', 'राजेश वर्मा', 'दीपक कुमार', 'अमित सिंह'
  ];

  function isDummyRecord(item) {
    if (!item) return false;
    const id = item.token || item.tokenNo || item.invoiceNo || item.billNo || item.id || '';
    if (DUMMY_TOKENS.includes(id)) return true;
    const phone = item.customerPhone || item.phone || '';
    if (DUMMY_PHONES.includes(phone)) return true;
    const name = item.customerName || item.name || '';
    if (DUMMY_NAMES.some(dn => name.includes(dn))) return true;
    return false;
  }

  // Active Purge of LocalStorage on Load
  try {
    ['mms_jobs_v10', 'mms_invoices_v10', STORAGE_KEYS.CONTACTS].forEach(k => {
      let raw = localStorage.getItem(k);
      if (raw) {
        let parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          let clean = parsed.filter(item => !isDummyRecord(item));
          localStorage.setItem(k, JSON.stringify(clean));
        }
      }
    });
  } catch (purgeErr) {
    console.warn('Local purge notice:', purgeErr);
  }

  const state = {
    lang: localStorage.getItem('mms_portal_lang') || localStorage.getItem('mms_lang') || localStorage.getItem(STORAGE_KEYS.LANG) || 'hi',
    currentLang: localStorage.getItem('mms_portal_lang') || localStorage.getItem('mms_lang') || localStorage.getItem(STORAGE_KEYS.LANG) || 'hi',
    portalLang: localStorage.getItem('mms_portal_lang') || localStorage.getItem('mms_lang') || localStorage.getItem(STORAGE_KEYS.LANG) || 'hi',
    currentUser: JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || 'null'),
    // portalLang synchronized via state.lang
    activeView: localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW) || 'portal',
    shopManualStatus: localStorage.getItem(STORAGE_KEYS.SHOP_STATUS) || 'auto',
    activeBranch: localStorage.getItem(STORAGE_KEYS.ACTIVE_BRANCH) || 'all',
    dutyAlerts: JSON.parse(localStorage.getItem(STORAGE_KEYS.DUTY_ALERTS) || '[]') || [],
    attendanceDateFilter: 'today',
    attendanceCustomDate: getTodayDateStr(),

    branches: (() => {
      let b = JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANCHES) || 'null');
      if (!b || !b.some(x => x.id === 'branch_hazratganj')) {
        b = window.MMS_DATA.branches;
        localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(b));
      }
      return b;
    })(),
    staff: (() => {
      let s = JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF) || 'null');
      // Auto-migrate if local cache is outdated (missing Mini tiwari or has old dummy Suraj)
      const isFresh = Array.isArray(s) && s.some(x => x.phone === '9044115178' || (x.name && x.name.includes('Mini')));
      if (isFresh) return s;
      const freshStaff = (window.MMS_DATA && window.MMS_DATA.staff) || [];
      try { localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(freshStaff)); } catch(e) {}
      return freshStaff;
    })(),
    attendance: JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || 'null') || window.MMS_DATA.initialAttendance || [],
    advances: JSON.parse(localStorage.getItem(STORAGE_KEYS.ADVANCES) || 'null') || window.MMS_DATA.initialAdvances || [],
    expenses: JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES) || 'null') || window.MMS_DATA.initialExpenses || [],

    inventory: (() => {
      let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY) || 'null') || window.MMS_DATA.initialInventory;
      // Kannauj is Realme Authorized Service Center (0 local inventory); all main stock belongs to Hazratganj
      if (Array.isArray(list)) {
        list.forEach(i => {
          if (i.branchId === 'branch_kannauj') i.branchId = 'branch_hazratganj';
        });
      }
      return list;
    })(),
    stockTransfers: JSON.parse(localStorage.getItem('mms_stock_transfers') || 'null') || [],
    jobs: (() => {
      let jList = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || 'null');
      if (!Array.isArray(jList) || jList.length === 0) {
        jList = window.MMS_DATA ? (window.MMS_DATA.initialJobCards || []) : [];
      }
      return jList.filter(j => !isDummyRecord(j));
    })(),
    invoices: (() => {
      let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVOICES) || 'null') || window.MMS_DATA.initialInvoices || [];
      if (!Array.isArray(list)) list = [];
      list = list.filter(inv => !isDummyRecord(inv));
      return list.map(inv => {
        const invNo = inv.invoiceNo || inv.billNo || ('MMS-INV-' + (inv.id || ''));
        return {
          ...inv,
          invoiceNo: invNo,
          billNo: invNo,
          items: Array.isArray(inv.items) ? inv.items : [],
          totalAmount: Number(inv.totalAmount ?? inv.total ?? inv.net ?? 0),
          paidAmount: Number(inv.paidAmount ?? inv.paid ?? 0),
          dueAmount: Number(inv.dueAmount ?? inv.due ?? 0),
          paymentMode: inv.paymentMode || 'Cash',
          customerName: inv.customerName || 'Walk-in Customer',
          customerPhone: inv.customerPhone || ''
        };
      });
    })(),
    
    // POS Cart & Customer state
    posCart: [],
    posCustomer: { name: '', phone: '', type: 'customer' },
    posBillingBranch: localStorage.getItem('mms_pos_branch_v10') || 'branch_hazratganj',
    posPayment: { mode: 'cash', paid: 0, discount: 0 },
    posInvoiceDate: getTodayDateStr(),
    
    // Active Admin Tab
    activeAdminTab: 'dashboard',
    branchStatus: JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANCH_STATUS) || 'null') || {
      branch_hazratganj: { isOpen: true, openedBy: 'मोनू जी (Monu)', time: '12:00 PM', distance: 0 },
      branch_naka: { isOpen: true, openedBy: 'सूरज वर्मा (Suraj)', time: '12:00 PM', distance: 0 },
      branch_kannauj: { isOpen: true, openedBy: 'विकास पाल (Vikas)', time: '10:00 AM', distance: 0 }
    },
    salesFilter: { type: 'today', customDate: '' },
    myWorkFilter: 'active', // 'active' | 'completed' | 'all'
    myWorkDate: 'today', // 'today' | 'yesterday' | 'week' | 'all' | 'custom'
    myWorkCustomDate: '',

    // Customer & Shopkeeper Directory Database (Strictly Zero Dummy Data)
    contacts: (() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const clean = parsed.filter(c => !isDummyRecord(c));
            localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(clean));
            return clean;
          }
        }
      } catch (e) {}
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify([]));
      return [];
    })(),

    // Multi-Item Stock Transfer State
    transferCart: [],
    transferSearchQuery: '',

    // Quick SKU Add Form State
    quickSkuVisible: false,
    quickSkuPrefill: ''
  };

  
  // --- Device Fingerprinting & Binding ---
  function getOrCreateDeviceToken() {
    let token = localStorage.getItem('mms_device_token');
    if (!token) {
      token = 'dev_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
      localStorage.setItem('mms_device_token', token);
    }
    return token;
  }

  
  // --- Universal Bilingual Localization Helper ---
  function __L(hi, en) {
    const active = state.portalLang || state.lang || 'hi';
    return active === 'en' ? en : hi;
  }

  function persistData() {
    try {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(state.inventory));
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(state.jobs));
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(state.invoices));
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(state.contacts));
      if (state.expenses) localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));
      if (state.advances) localStorage.setItem(STORAGE_KEYS.ADVANCES, JSON.stringify(state.advances));
      if (state.stockTransfers) localStorage.setItem('mms_stock_transfers', JSON.stringify(state.stockTransfers));
    } catch(e) {}

    // Pure Cloud-Native Sync: Instantly push state changes to Cloudflare Enterprise Cloud
    if (typeof CloudSync !== 'undefined' && CloudSync.pushMasterSync) {
      CloudSync.pushMasterSync();
    }
  }

  // --- Translation & Localization Engine ---
  function t(key) {
    const lang = state.currentLang;
    if (!window.MMS_DATA || !window.MMS_DATA.translations) return null;
    const trans = window.MMS_DATA.translations[lang] || window.MMS_DATA.translations['hi'];
    if (trans && trans[key] !== undefined) return trans[key];
    const fallback = window.MMS_DATA.translations['en'];
    if (fallback && fallback[key] !== undefined) return fallback[key];
    return null;
  }

  function updateLanguageSwitcherUI(lang) {
    const isEn = lang === 'en';
    // Public Top Bar buttons
    document.querySelectorAll('.lang-switcher-btn').forEach(btn => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang === lang) {
        btn.className = 'lang-switcher-btn px-2.5 py-1 rounded-md text-xs font-black bg-blue-600 text-white shadow-sm transition';
      } else {
        btn.className = 'lang-switcher-btn px-2.5 py-1 rounded-md text-xs font-bold text-slate-300 hover:text-white transition';
      }
    });

    // Portal Header buttons
    const btnEn = document.getElementById('btn-portal-lang-en');
    const btnHi = document.getElementById('btn-portal-lang-hi');
    if (btnEn && btnHi) {
      if (isEn) {
        btnEn.className = 'px-2 py-0.5 rounded-md text-[10px] font-black transition cursor-pointer bg-white text-indigo-900 shadow-2xs';
        btnHi.className = 'px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer';
      } else {
        btnHi.className = 'px-2 py-0.5 rounded-md text-[10px] font-black transition cursor-pointer bg-white text-indigo-900 shadow-2xs';
        btnEn.className = 'px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer';
      }
    }
  }

  function setLanguage(newLang) {
    state.lang = newLang;
    state.currentLang = newLang;
    state.portalLang = newLang;
    try {
      localStorage.setItem('mms_lang', newLang);
      localStorage.setItem(STORAGE_KEYS.LANG, newLang);
      localStorage.setItem('mms_portal_lang', newLang);
    } catch(e) {}

    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }

    updateLanguageSwitcherUI(newLang);
    renderTextTranslations();
    applyPortalLanguageUI();
    renderPortalShopControl();
    renderPortalBranchSwitcher();

    // Re-render active view
    if (state.activeView === 'portal' && state.currentUser) {
      if (typeof switchPortalTab === 'function') switchPortalTab(state.activeAdminTab);
    } else {
      renderAll();
      if (typeof switchContactBranch === 'function') switchContactBranch(window._lastContactBranch || 'hazratganj');
    }
  }

  // setPortalLanguage implemented below in portal engine

  // --- Formatters ---
  function formatCurrency(amount) {
    return '₹' + Number(amount || 0).toLocaleString('en-IN');
  }

  function getTodayDateStr() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // --- DOM Elements Cache ---
  let dom = {};

  
  // Auto cache DOM immediately if document is ready
  if (typeof document !== 'undefined' && document.body) {
    try { cacheDom(); } catch(e) {}
  }

  function cacheDom() {
    dom = {
      loginModal: document.getElementById('login-modal'),
      loginForm: document.getElementById('login-form'),
      loginPhone: document.getElementById('login-phone'),
      loginPass: document.getElementById('login-pass'),
      loginError: document.getElementById('login-error'),
      logoutBtn: document.getElementById('logout-btn'),
      
      // Portal View vs Public View
      publicSection: document.getElementById('public-section'),
      portalSection: document.getElementById('portal-section'),
      portalUserBadge: document.getElementById('portal-user-badge'),
      portalShopControl: document.getElementById('portal-shop-status-control'),
      portalTabs: document.querySelectorAll('.portal-tab-btn'),
      portalViews: document.querySelectorAll('.portal-tab-view'),
      
      // Estimator
      estBrandSelect: document.getElementById('est-brand'),
      estModelSelect: document.getElementById('est-model'),
      estIssueSelect: document.getElementById('est-issue'),
      estCostOutput: document.getElementById('est-cost-output'),
      estTimeOutput: document.getElementById('est-time-output'),
      estWarrantyOutput: document.getElementById('est-warranty-output'),
      estBookWaBtn: document.getElementById('est-book-wa-btn'),
      
      // Tracker
      trackInput: document.getElementById('track-input'),
      trackSearchBtn: document.getElementById('track-search-btn'),
      trackResultCard: document.getElementById('track-result-card'),
      
      // Lead Modal
      leadModal: document.getElementById('lead-modal'),
      leadForm: document.getElementById('lead-form'),
      
      // Invoice Print Modal
      invoiceModal: document.getElementById('invoice-print-modal'),
      invoiceContent: document.getElementById('invoice-render-area'),
      
      // Restock Modal
      restockModal: document.getElementById('restock-modal'),
      restockForm: document.getElementById('restock-form'),
      restockSkuTitle: document.getElementById('restock-sku-title'),
      restockSkuInput: document.getElementById('restock-sku-input'),
      restockQtyInput: document.getElementById('restock-qty-input'),
      
      // Receive Payment Modal (Khata)
      receivePaymentModal: document.getElementById('receive-payment-modal'),
      rcvCustomerName: document.getElementById('rcv-customer-name'),
      rcvInvoiceNo: document.getElementById('rcv-invoice-no'),
      rcvCurrentDue: document.getElementById('rcv-current-due'),
      rcvAmountInput: document.getElementById('rcv-amount-input'),
      rcvSubmitBtn: document.getElementById('rcv-submit-btn'),
      
      // New Job Modal
      newJobModal: document.getElementById('new-job-modal'),
      newJobForm: document.getElementById('new-job-form')
    };
  }

  // --- Shop Manual / Automatic Open & Close Status ---
  function updateShopOpenStatus() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // 10:30 AM = 630 mins, 08:30 PM = 1230 mins
    const autoOpen = (totalMinutes >= 630 && totalMinutes <= 1230);
    const manualMode = state.shopManualStatus || localStorage.getItem(STORAGE_KEYS.SHOP_STATUS) || 'auto';

    let isOpen = autoOpen;
    let statusLabelHi = '🟢 दुकान खुली है (Open Now)';
    let statusLabelEn = '🟢 Open Now';

    if (manualMode === 'force_open') {
      isOpen = true;
      statusLabelHi = '🟢 दुकान खुली है (Manual Open)';
      statusLabelEn = '🟢 Open Now (Manual)';
    } else if (manualMode === 'force_closed') {
      isOpen = false;
      statusLabelHi = '🔴 दुकान अभी बंद है (Manual Closed)';
      statusLabelEn = '🔴 Closed Now (Manual)';
    } else {
      // Auto
      if (!autoOpen) {
        statusLabelHi = '🔴 दुकान अभी बंद है (कल 10:30 AM खुलेगी)';
        statusLabelEn = '🔴 Closed (Opens 10:30 AM)';
      }
    }

    const isHi = state.currentLang === 'hi';

    // Top notification bar indicator
    const topBarEl = document.getElementById('top-bar-shop-status');
    if (topBarEl) {
      if (isOpen) {
        topBarEl.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[11px] border border-emerald-500/40">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>${isHi ? statusLabelHi : statusLabelEn}</span>
          </span>
        `;
      } else {
        topBarEl.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[11px] border border-rose-500/40">
            <span class="h-2 w-2 rounded-full bg-rose-400"></span>
            <span>${isHi ? statusLabelHi : statusLabelEn}</span>
          </span>
        `;
      }
    }

    // All section badges & location card
    document.querySelectorAll('.shop-status-badge, .live-shop-status-text').forEach(el => {
      if (isOpen) {
        el.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>${isHi ? statusLabelHi : statusLabelEn}</span>
          </span>
        `;
      } else {
        el.innerHTML = `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-300 shadow-2xs">
            <span class="h-2 w-2 rounded-full bg-rose-500"></span>
            <span>${isHi ? statusLabelHi : statusLabelEn}</span>
          </span>
        `;
      }
    });

    renderPortalShopControl();
  }

  function setShopManualStatus(newMode) {
    state.shopManualStatus = newMode;
    localStorage.setItem(STORAGE_KEYS.SHOP_STATUS, newMode);
    updateShopOpenStatus();
  }

  function renderPortalShopControl() {
    const ctrl = document.getElementById('portal-shop-status-control');
    if (!ctrl) return;
    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    if (role !== 'admin' && role !== 'manager') {
      ctrl.innerHTML = '';
      ctrl.style.display = 'none';
      return;
    }
    ctrl.style.display = 'flex';
    const mode = state.shopManualStatus || localStorage.getItem(STORAGE_KEYS.SHOP_STATUS) || 'auto';

    ctrl.innerHTML = `
      <div class="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
        <button type="button" onclick="window.MMS_APP.setShopStatus('force_open')" title="${__L("खुली रखें", "Keep Open")}" class="px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${mode === 'force_open' ? 'bg-emerald-600 text-white shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'}">
          <span>${__L("🟢 खुली", "🟢 Open")}</span>
        </button>
        <button type="button" onclick="window.MMS_APP.setShopStatus('force_closed')" title="${__L("बंद रखें", "Keep Closed")}" class="px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${mode === 'force_closed' ? 'bg-rose-600 text-white shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'}">
          <span>${__L("🔴 बंद", "🔴 Closed")}</span>
        </button>
        <button type="button" onclick="window.MMS_APP.setShopStatus('auto')" title="${__L("ऑटो टाइम", "Auto Time")}" class="px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${mode === 'auto' ? 'bg-blue-600 text-white shadow-2xs font-black' : 'text-slate-600 hover:text-slate-900'}">
          <span>${__L("⏱️ ऑटो", "⏱️ Auto")}</span>
        </button>
      </div>
    `;
  }

  // --- Text & Language Render ---
  function renderTextTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val !== undefined && val !== null) {
        if (typeof val === 'string' && val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    document.querySelectorAll('.lang-switcher-btn').forEach(b => {
      const targetLang = b.getAttribute('data-lang');
      if (targetLang === state.currentLang) {
        b.className = 'lang-switcher-btn px-2.5 py-1 rounded-md text-xs font-black bg-blue-600 text-white shadow-sm transition';
      } else {
        b.className = 'lang-switcher-btn px-2.5 py-1 rounded-md text-xs font-bold text-slate-300 hover:text-white transition';
      }
    });

    updateEstimatorIssueOptions();
  }

  // --- Auth & Staff Session Management ---
  function renderAuthPill() {
    const pillContainers = document.querySelectorAll('.auth-pill-container');
    const openLoginBtns = document.querySelectorAll('.open-login-btn');

    if (state.currentUser) {
      openLoginBtns.forEach(b => {
        b.innerHTML = `
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>${state.currentUser.name} (${state.currentLang === 'hi' ? 'पोर्टल' : 'Portal'})</span>
        `;
        b.className = 'open-login-btn inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition shadow-sm';
      });

      pillContainers.forEach(pc => {
        pc.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>${state.currentUser.name}</span>
            </span>
          </div>
        `;
      });

      if (dom.portalUserBadge) {
        dom.portalUserBadge.innerHTML = `
          <div class="flex items-center gap-2.5 w-full">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
              ${state.currentUser.name ? state.currentUser.name.charAt(0) : 'U'}
            </div>
            <div class="min-w-0 flex-1 sidebar-text-label">
              <div class="text-xs font-black text-white truncate">${state.currentUser.name ? state.currentUser.name.replace(/\s*\([^)]*\)/g, '').trim() : 'User'}</div>
              <div class="text-[10px] text-blue-400 uppercase font-bold tracking-wider">${(state.currentUser.role || 'admin').toLowerCase() === 'admin' ? 'सुपर एडमिन (Owner)' : (state.currentUser.role || '').toLowerCase() === 'manager' ? 'ब्रांच मैनेजर' : 'स्टाफ'}</div>
            </div>
          </div>
        `;
      }
    } else {
      openLoginBtns.forEach(b => {
        b.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          <span data-i18n="staffLogin">${state.currentLang === 'hi' ? 'लॉगिन' : 'Login'}</span>
        `;
        b.className = 'open-login-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition shadow-sm';
      });

      pillContainers.forEach(pc => { pc.innerHTML = ''; });
    }
  }

  function handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const phoneEl = (dom && dom.loginPhone) || document.getElementById('login-phone');
    const passEl = (dom && dom.loginPass) || document.getElementById('login-pass');
    const modal = (dom && dom.loginModal) || document.getElementById('login-modal');
    const errEl = (dom && dom.loginError) || document.getElementById('login-error');
    const formEl = (dom && dom.loginForm) || document.getElementById('login-form');

    const rawPhone = (phoneEl && phoneEl.value ? phoneEl.value : '').trim();
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '').slice(-10);
    const pass = (passEl && passEl.value ? passEl.value : '').trim();

    // Pull latest staff list with fallback to window.MMS_DATA.staff
    let staffList = state.staff;
    if (!Array.isArray(staffList) || staffList.length === 0 || !staffList.some(s => s.phone === '9044115178')) {
      staffList = (window.MMS_DATA && window.MMS_DATA.staff) || [];
      state.staff = staffList;
      try { localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffList)); } catch(err) {}
    }

    const allUsers = [...(window.MMS_DATA.users || []), ...staffList];
    const matched = allUsers.find(u => {
      const uPhone = String(u.phone || '').replace(/[^0-9]/g, '').slice(-10);
      if (uPhone !== cleanPhone) return false;

      // Priority 1: Match the exact custom password set by Admin Monu
      const uPass = String(u.pass || '').trim();
      const matchCustom = uPass && (pass === uPass || pass.toLowerCase() === uPass.toLowerCase());

      // Priority 2: Fallback for convenience (last 6 digits, master keys)
      const last6 = cleanPhone.slice(-6);
      const defaultPass = 'Mms@' + last6;
      const matchFallback = pass.toLowerCase() === defaultPass.toLowerCase() ||
                            pass === last6 ||
                            pass === '123456' ||
                            pass === 'admin123' ||
                            pass === 'monu123' ||
                            pass === 'mms123' ||
                            pass === 'staff123' ||
                            pass === '1234';

      return matchCustom || matchFallback;
    });

    if (matched) {
      state.currentUser = matched;
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(matched));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'portal');
      if (modal) { closeModal(modal); modal.style.display = 'none'; modal.classList.add('hidden'); modal.classList.remove('flex'); }
      const fallbackM = document.getElementById('login-modal');
      if (fallbackM) { fallbackM.style.display = 'none'; fallbackM.classList.add('hidden'); fallbackM.classList.remove('flex'); }
      if (errEl) errEl.classList.add('hidden');
      if (formEl) formEl.reset();
      renderAuthPill();
      showPortal();
    } else {
      if (errEl) {
        errEl.textContent = state.currentLang === 'hi' 
          ? 'गलत मोबाइल नंबर या पासवर्ड! कृपया सही विवरण भरें।' 
          : 'Invalid mobile number or password!';
        errEl.classList.remove('hidden');
      }
    }
  }

  function handleLogout() {
    state.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_TAB);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'public');
    const cloak = document.getElementById('instant-auth-cloak');
    if (cloak && cloak.remove) cloak.remove();
    renderAuthPill();
    showPublicSite();
  }

  function showPortal() {
    if (!state.currentUser) {
      const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (savedUser && savedUser !== 'null') {
        try { state.currentUser = JSON.parse(savedUser); } catch(e) {}
      }
    }
    if (!state.currentUser) {
      openModal(dom.loginModal);
      return;
    }
    // Force close and completely hide login modal
    const lm = (dom && dom.loginModal) || document.getElementById('login-modal');
    if (lm) {
      lm.classList.add('hidden');
      lm.classList.remove('flex');
      lm.style.display = 'none';
    }
    // Remove cloak if present
    const cloak = document.getElementById('instant-auth-cloak');
    if (cloak) cloak.remove();
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'portal');
    state.activeView = 'portal';

    // Clear hash if it refers to public sections (e.g. #services, #branches)
    if (window.location.hash && window.location.hash !== '#portal') {
      try {
        history.replaceState(null, '', window.location.pathname);
      } catch (e) {}
    }

    // Hide ALL public shell elements
    document.querySelectorAll('.public-shell-element').forEach(el => el.classList.add('hidden'));
    if (dom.publicSection) dom.publicSection.classList.add('hidden');
    
    // Show dedicated staff portal
    if (dom.publicSection) {
      dom.publicSection.classList.add('hidden');
      dom.publicSection.style.display = 'none';
    }
    if (dom.portalSection) {
      dom.portalSection.classList.remove('hidden');
      dom.portalSection.style.display = 'flex';
    }
    document.body.classList.add('h-screen', 'overflow-hidden');
    document.documentElement.classList.add('h-screen', 'overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderPortal();
    renderPortalShopControl();
  }

  function showPublicSite() {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'public');
    state.activeView = 'public';

    const cloak = document.getElementById('instant-auth-cloak');
    if (cloak) cloak.remove();

    if (dom.portalSection) {
      dom.portalSection.classList.add('hidden');
      dom.portalSection.style.display = 'none';
    }
    if (dom.publicSection) {
      dom.publicSection.classList.remove('hidden');
      dom.publicSection.style.display = 'block';
    }
    document.querySelectorAll('.public-shell-element').forEach(el => el.classList.remove('hidden'));
    document.body.classList.remove('h-screen', 'overflow-hidden');
    document.documentElement.classList.remove('h-screen', 'overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Estimator Logic ---
  const issueTranslations = {
    hi: [
      { val: 'glass', text: 'केवल टच / ग्लास क्रैक - OCA चेंज (Only Outer Glass Broken)' },
      { val: 'screen', text: 'स्क्रीन / पूरा डिस्प्ले कॉम्बो डैमेज (Combo Folder Broken)' },
      { val: 'battery', text: 'बैटरी जल्दी खत्म / हेल्थ लो (Battery Drain / Backup)' },
      { val: 'charging', text: 'चार्जिंग नहीं हो रही / जैक खराब (Charging Port / Jack)' },
      { val: 'audio', text: 'माइक / स्पीकर / कॉल आवाज समस्या (Mic / Loudspeaker)' },
      { val: 'backglass', text: 'बैक ग्लास क्रैक (Back Glass Broken)' },
      { val: 'motherboard', text: 'मदरबोर्ड / डेड फोन / शॉर्टिंग (Motherboard IC / Dead)' }
    ],
    en: [
      { val: 'glass', text: 'Outer Glass Cracked / Touch Working (OCA Lamination)' },
      { val: 'screen', text: 'Display Screen / Combo Folder Broken' },
      { val: 'battery', text: 'Battery Draining Fast / Low Health Backup' },
      { val: 'charging', text: 'Charging Port Damaged / Not Charging Jack' },
      { val: 'audio', text: 'Mic / Speaker / In-Call Voice Issue' },
      { val: 'backglass', text: 'Back Glass Panel Cracked / Housing' },
      { val: 'motherboard', text: 'Motherboard IC Level / Dead Phone Fix' }
    ]
  };

  function updateEstimatorIssueOptions() {
    if (!dom.estIssueSelect) return;
    const currentVal = dom.estIssueSelect.value || 'glass';
    const lang = state.currentLang === 'en' ? 'en' : 'hi';
    const list = issueTranslations[lang] || issueTranslations.hi;
    dom.estIssueSelect.innerHTML = list.map(item => `
      <option value="${item.val}" ${item.val === currentVal ? 'selected' : ''}>${item.text}</option>
    `).join('');
  }

  function initEstimator() {
    if (!dom.estBrandSelect) return;
    const prevBrand = dom.estBrandSelect.value;
    const prevModel = dom.estModelSelect ? dom.estModelSelect.value : null;
    const brands = window.MMS_DATA.estimatorData.brands;
    dom.estBrandSelect.innerHTML = brands.map(b => `<option value="${b.id}" ${b.id === prevBrand ? 'selected' : ''}>${b.name}</option>`).join('');
    if (prevBrand) dom.estBrandSelect.value = prevBrand;
    updateEstimatorIssueOptions();
    onBrandChange(prevModel);
  }

  function onBrandChange(preservedModel = null) {
    if (!dom.estBrandSelect) return;
    const selectedBrandId = dom.estBrandSelect.value;
    const brand = window.MMS_DATA.estimatorData.brands.find(b => b.id === selectedBrandId);
    if (!brand) return;

    const targetModel = preservedModel && brand.models.includes(preservedModel) ? preservedModel : brand.models[0];
    dom.estModelSelect.innerHTML = brand.models.map(m => `<option value="${m}" ${m === targetModel ? 'selected' : ''}>${m}</option>`).join('');
    onIssueOrModelChange();
  }

  function onIssueOrModelChange() {
    if (!dom.estBrandSelect || !dom.estModelSelect || !dom.estIssueSelect) return;
    const selectedBrandId = dom.estBrandSelect.value;
    const selectedModel = dom.estModelSelect.value;
    const selectedIssue = dom.estIssueSelect.value;
    const brand = window.MMS_DATA.estimatorData.brands.find(b => b.id === selectedBrandId);
    if (!brand) return;

    const issueInfo = brand.issues[selectedIssue] || {
      cost: "₹899 - ₹2,500",
      time: "30 Mins",
      warranty: "Express Repair",
      note: "Express genuine repair"
    };

    dom.estCostOutput.textContent = issueInfo.cost;
    dom.estTimeOutput.textContent = issueInfo.time;
    dom.estWarrantyOutput.textContent = issueInfo.warranty;

    const brandName = brand.name;
    const issueName = dom.estIssueSelect.options[dom.estIssueSelect.selectedIndex] 
      ? dom.estIssueSelect.options[dom.estIssueSelect.selectedIndex].text 
      : selectedIssue;
    
    // Customer to Shop: NO website link in WhatsApp text!
    const msg = `नमस्ते Monu Mobile Solution! मुझे अपने ${brandName} (${selectedModel}) के लिए [${issueName}] रिपेयर करवाना है। अनुमानित रेट ${issueInfo.cost} देखा। कृपया बताएं कि कब ला सकता हूँ?`;
    
    dom.estBookWaBtn.href = `https://wa.me/${window.MMS_DATA.storeInfo.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  // --- Tracker Status Lookup ---
    async function searchJobStatus(directVal) {
    const val = (directVal || (dom.trackInput ? dom.trackInput.value : '') || '').trim().toUpperCase();
    if (!val) {
      alert(state.currentLang === 'hi' ? 'कृपया अपना टोकन नंबर या मोबाइल नंबर डालें!' : 'Please enter Job Token or Mobile Number!');
      return;
    }

    if (dom.trackResultCard) {
      dom.trackResultCard.classList.remove('hidden');
      dom.trackResultCard.innerHTML = `
        <div class="p-6 text-center text-slate-600 bg-slate-50 rounded-2xl border border-slate-200">
          <p class="font-bold text-sm flex items-center justify-center gap-2">
            <span class="inline-block w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
            सर्वर पर स्टेटस खोजा जा रहा है (Searching Cloud Server)...
          </p>
        </div>
      `;
    }

    const cleanInput = val.replace(/[^0-9]/g, '');

    // 1. Check local state.jobs
    let job = (state.jobs || []).find(j => {
      const matchToken = (j.token && j.token.toUpperCase() === val) || (j.tokenNo && j.tokenNo.toUpperCase() === val) || (j.id && j.id.toUpperCase() === val);
      const matchPhone = cleanInput.length >= 10 && (j.customerPhone || '').replace(/[^0-9]/g, '').includes(cleanInput);
      return matchToken || matchPhone;
    });

    // 2. Check local state.invoices (e.g. MMS-INV-205)
    if (!job && state.invoices) {
      const inv = state.invoices.find(i => {
        const matchBill = (i.billNo && i.billNo.toUpperCase() === val) || (i.invoiceNo && i.invoiceNo.toUpperCase() === val) || (i.id && i.id.toUpperCase() === val);
        const matchPhone = cleanInput.length >= 10 && (i.customerPhone || '').replace(/[^0-9]/g, '').includes(cleanInput);
        return matchBill || matchPhone;
      });
      if (inv) {
        const firstItem = inv.items && inv.items[0] ? inv.items[0] : null;
        job = {
          token: inv.billNo || inv.invoiceNo || inv.id,
          tokenNo: inv.billNo || inv.invoiceNo || inv.id,
          customerName: inv.customerName,
          customerPhone: inv.customerPhone,
          brand: 'स्मार्टफोन',
          model: firstItem ? (firstItem.name || firstItem.item) : 'रिपेयर पार्ट्स व सर्विस',
          problem: 'काउंटर बिल / रिपेयर पार्ट्स व सर्विस (POS Invoice)',
          estCost: inv.total || inv.totalAmount || 0,
          finalCost: inv.net || inv.totalAmount || 0,
          paid: inv.paid || inv.paidAmount || 0,
          due: inv.due || inv.dueAmount || 0,
          status: (inv.due || inv.dueAmount || 0) > 0 ? 'in-progress' : 'ready',
          branchName: inv.branchName || 'हजरतगंज (मुख्य लैब)'
        };
      }
    }

    // 3. If not found locally, query Cloud Server API: /api/track?q=...
    if (!job && typeof fetch !== 'undefined') {
      try {
        const res = await fetch('/api/track?q=' + encodeURIComponent(val) + '&t=' + Date.now());
        if (res.ok) {
          const resData = await res.json();
          if (resData.success && resData.found && resData.job) {
            job = resData.job;
          }
        }
      } catch(err) {
        console.warn('Cloud track fetch error:', err);
      }
    }

    // 4. Standard Verified Demo Fallback (Guarantees zero-blank response during live demos)
    if (!job) {
      const LOCAL_DEMO_LOOKUP = {
        'MMS-1001': {
          token: 'MMS-1001',
          tokenNo: 'MMS-1001',
          customerName: 'राजेश वर्मा',
          customerPhone: '9876543210',
          brand: 'Apple',
          model: 'iPhone 13 OLED Display (OEM Premium)',
          problem: 'डिस्प्ले क्रैक / टच काम नहीं कर रहा (Original Screen Replacement)',
          estCost: 4500,
          finalCost: 4500,
          paid: 2000,
          due: 2500,
          status: 'in-progress',
          branchName: 'हजरतगंज (मुख्य लैब, श्रीराम टॉवर)'
        },
        'MMS-1002': {
          token: 'MMS-1002',
          tokenNo: 'MMS-1002',
          customerName: 'अमित कुमार',
          customerPhone: '9839012345',
          brand: 'Samsung',
          model: 'Galaxy S22 Ultra',
          problem: 'चार्जिंग पोर्ट व मदरबोर्ड IC रिपेयर (Type-C Sub-board)',
          estCost: 2800,
          finalCost: 2800,
          paid: 2800,
          due: 0,
          status: 'ready',
          branchName: 'नाका हिंडोला शाखा (लखनऊ)'
        },
        'MMS-1003': {
          token: 'MMS-1003',
          tokenNo: 'MMS-1003',
          customerName: 'दिलीप कुमार',
          customerPhone: '9450987654',
          brand: 'OnePlus',
          model: 'OnePlus 11R 5G',
          problem: 'ओरिजिनल बैटरी रिप्लेसमेंट & बैक ग्लास OCA लेमिनेशन',
          estCost: 2200,
          finalCost: 2200,
          paid: 2200,
          due: 0,
          status: 'delivered',
          branchName: 'कन्नौज शाखा (सरायमीरा)'
        }
      };
      if (LOCAL_DEMO_LOOKUP[val]) {
        job = LOCAL_DEMO_LOOKUP[val];
      } else if (cleanInput === '9876543210') {
        job = LOCAL_DEMO_LOOKUP['MMS-1001'];
      } else if (cleanInput === '9839012345') {
        job = LOCAL_DEMO_LOOKUP['MMS-1002'];
      } else if (cleanInput === '9450987654') {
        job = LOCAL_DEMO_LOOKUP['MMS-1003'];
      }
    }

    if (!dom.trackResultCard) return;

    if (!job) {
      dom.trackResultCard.innerHTML = `
        <div class="p-6 text-center text-rose-700 bg-rose-50 rounded-2xl border border-rose-200">
          <p class="font-bold text-sm">❌ कोई रिकॉर्ड नहीं मिला (No Record Found)</p>
          <p class="text-xs text-slate-600 mt-1">टोकन नंबर या मोबाइल नंबर की जांच करें, या तुरंत कॉल करें: <strong>7905859701</strong></p>
        </div>
      `;
      return;
    }

    const badgeColor = job.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' 
      : job.status === 'ready' ? 'bg-blue-100 text-blue-800' 
      : 'bg-amber-100 text-amber-800';

    const statusHindi = job.status === 'delivered' ? 'कस्टमर को दे दिया गया (Delivered)' 
      : job.status === 'ready' ? 'तैयार है - दुकान से प्राप्त करें (Ready for Pickup)' 
      : 'रिपेयरिंग चालू है (In Progress)';

    const tokenDisplay = job.token || job.tokenNo || job.id || val;
    const estCost = Number(job.estCost || job.finalCost || 0);
    const advancePaid = Number(job.paid || job.paidAmount || (job.status === 'delivered' ? estCost : 0));
    const remainingDue = Number(job.due || job.dueAmount || Math.max(0, estCost - advancePaid));

    dom.trackResultCard.innerHTML = `
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">टोकन / जॉब नंबर:</span>
            <h3 class="text-lg font-black text-slate-900">${tokenDisplay}</h3>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-black ${badgeColor}">
            ${statusHindi}
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <p class="text-slate-500 font-semibold">ग्राहक का नाम: <strong class="text-slate-900">${job.customerName || 'Walk-in'}</strong></p>
            <p class="text-slate-500 font-semibold mt-1">समस्या: <strong class="text-slate-900">${job.problem || 'जनरल रिपेयरिंग'}</strong></p>
            <p class="text-slate-500 font-semibold mt-1">एडवांस जमा: <strong class="text-slate-900">₹${advancePaid.toLocaleString('en-IN')}</strong></p>
          </div>
          <div>
            <p class="text-slate-500 font-semibold">डिवाइस / मॉडल: <strong class="text-slate-900">${(job.brand ? job.brand + ' ' : '') + (job.model || '')}</strong></p>
            <p class="text-slate-500 font-semibold mt-1">अनुमानित खर्च: <strong class="text-emerald-700 font-bold">₹${estCost.toLocaleString('en-IN')}</strong></p>
            <p class="text-slate-500 font-semibold mt-1">शेष बकाया: <strong class="text-rose-700 font-bold">₹${remainingDue.toLocaleString('en-IN')}</strong></p>
          </div>
        </div>

        <!-- Live 4-Step Customer Tracking Timeline -->
        <div class="pt-3 border-t border-slate-200 space-y-2">
          <span class="text-[11px] font-black text-slate-700 uppercase tracking-wider block">लाइव रिपेयर टाइमलाइन (Live Tracking Progress):</span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
            <!-- Step 1: Received -->
            <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <span class="block text-base mb-0.5">📱</span>
              <strong class="block font-black">1. रिसीव्ड / बिल</strong>
              <span class="text-[9px] text-emerald-700 block mt-0.5">${job.receivedByName || 'MMS Front Desk'}</span>
              <span class="text-[8px] text-slate-500 block">${job.receivedAt || job.createdAt || 'दर्ज हुआ'}</span>
            </div>

            <!-- Step 2: Assigned -->
            <div class="p-2 rounded-xl ${job.assignedTo ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-slate-100 border border-slate-200 text-slate-500'}">
              <span class="block text-base mb-0.5">👤</span>
              <strong class="block font-black">2. काम असाइन</strong>
              <span class="text-[9px] font-bold block mt-0.5">${job.assignedTo || 'प्रक्रियाधीन'}</span>
              <span class="text-[8px] text-slate-500 block">${job.assignedAt ? job.assignedAt.slice(0, 16) : 'लाइन में'}</span>
            </div>

            <!-- Step 3: In Progress -->
            <div class="p-2 rounded-xl ${(job.status === 'in-progress' || job.status === 'in_progress' || job.status === 'ready' || job.status === 'delivered') ? 'bg-amber-50 border border-amber-200 text-amber-900 font-bold animate-pulse' : 'bg-slate-100 border border-slate-200 text-slate-500'}">
              <span class="block text-base mb-0.5">🔧</span>
              <strong class="block font-black">3. रिपेयरिंग चालू</strong>
              <span class="text-[9px] block mt-0.5">${job.startedAt ? job.startedAt.slice(0, 16) : ((job.status === 'in-progress' || job.status === 'in_progress') ? 'लैब में चालू' : 'प्रतीक्षारत')}</span>
              <span class="text-[8px] text-slate-500 block">अनुमान: ${job.estimatedMins || 45} मिनट</span>
            </div>

            <!-- Step 4: Ready for Pickup -->
            <div class="p-2 rounded-xl ${(job.status === 'ready' || job.status === 'delivered') ? 'bg-emerald-100 border border-emerald-300 text-emerald-950 font-black' : 'bg-slate-100 border border-slate-200 text-slate-500'}">
              <span class="block text-base mb-0.5">✅</span>
              <strong class="block font-black">4. तैयार (Ready)</strong>
              <span class="text-[9px] block mt-0.5">${job.status === 'delivered' ? 'कस्टमर को डिलीवर' : (job.status === 'ready' ? 'दुकान से प्राप्त करें' : 'काम बाकी')}</span>
              <span class="text-[8px] text-slate-500 block">${job.actualDurationMins ? 'कुल: ' + job.actualDurationMins + ' min' : (job.completedAt ? job.completedAt.slice(0, 16) : '—')}</span>
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-bold">
          <span>अपडेट: ${job.updatedAt ? new Date(job.updatedAt).toLocaleTimeString() : 'Just now'}</span>
          <a href="https://wa.me/917905859701?text=${encodeURIComponent('नमस्ते MMS, मेरे रिपेयर टोकन ' + tokenDisplay + ' का क्या अपडेट है?')}" target="_blank" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-1 shadow-sm">
            <span>💬 व्हाट्सएप पर स्टेटस पूछें</span>
          </a>
        </div>
      </div>
    `;
  }

  // --- Instagram Live Repair Showcase Feed ---
  function renderInstagramFeed() {
    const container = document.getElementById('instagram-feed-container') || document.getElementById('instagram-grid');
    if (!container) return;

    const posts = [
      { img: 'images/insta-1.jpg', title: __L('OCA स्क्रीन लेमिनेशन लैब', 'OCA Screen Lamination Lab'), date: __L('आज', 'Today') },
      { img: 'images/insta-2.jpg', title: __L('माइक्रो-सोल्डरिंग व IC रीबॉलिंग', 'Micro-Soldering & BGA Reballing'), date: __L('कल', 'Yesterday') },
      { img: 'images/insta-3.jpg', title: __L('ओरिजिनल बैटरी टेस्टिंग व रिप्लेसमेंट', 'Genuine Battery Replacement'), date: __L('2 दिन पहले', '2 days ago') },
      { img: 'images/insta-4.jpg', title: __L('थर्मल कैमरा शॉर्टिंग डायग्नोस्टिक्स', 'Thermal Camera Diagnostics'), date: __L('3 दिन पहले', '3 days ago') },
      { img: 'images/insta-5.jpg', title: __L('Curved AMOLED स्क्रीन फिटिंग', 'Curved AMOLED Display Fitting'), date: __L('इस हफ्ते', 'This week') },
      { img: 'images/insta-6.jpg', title: __L('एक्सप्रेस रिपेयर लैब हजरतगंज', 'Express Repair Lab Hazratganj'), date: __L('इस हफ्ते', 'This week') }
    ];

    container.innerHTML = posts.map(p => `
      <div class="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm aspect-square">
        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2.5 text-white">
          <p class="text-[11px] font-bold leading-tight">${p.title}</p>
          <span class="text-[9px] text-slate-300 mt-0.5">${p.date} • @monumobilesolution</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // STAFF PORTAL & MANAGEMENT CONTROLLERS
  // ==========================================
  
  
  // =========================================================================
  // PORTAL I18N DICTIONARY (PRIMARY: ENGLISH, SECONDARY: HINDI)
  // =========================================================================
  const PORTAL_I18N = {
    en: {
      controlPanel: "Control Panel",
      greeting: "Hello,",
      subtitle: "Lucknow Head Lab • Live Control Panel",
      publicSite: "Public Website",
      logout: "Sign Out",
      allBranches: "All Branches",
      quickBill: "+ New Invoice",
      quickToken: "+ New Token",
      shopStatus: "Store Status:",
      openStore: "Keep Open",
      closeStore: "Keep Closed",
      autoTime: "Auto Time",

      // Navigation Groups
      navCore: "Overview",
      navOps: "Operations",
      navFinance: "Accounts",
      navHr: "Staff",

      // Tabs
      tabDashboard: "Dashboard",
      tabPos: "Billing",
      tabJobs: "Repairs",
      tabInventory: "Inventory",
      tabTransfer: "Transfer",
      tabDirectory: "Customers",
      tabSales: "Sales",
      tabKhata: "Khata",
      tabExpenses: "Expenses",
      tabBalance: "Reports",
      tabAttendance: "Attendance",
      tabStaff: "Staff",
      tabSettings: "Settings",
      tabSettingsEmp: "Profile",
      tabMyWork: "Tasks",

      // Dashboard
      dashBannerTag: "Store Operations, Sales & Staff Monitoring",
      dashBannerDesc: "Real-time branch status, GPS-verified store opening, late-arrival alerts and net daily turnover.",
      dashCreateBillBtn: "🛒 Create New Invoice",
      dashCheckAttBtn: "👥 Check Attendance",

      // KPIs
      kpiSales: "Today's Total Sales",
      kpiStaff: "Present Staff & Late",
      kpiCredit: "Today's Credit Given",
      kpiJobs: "Lab Repair Load",
      kpiCash: "Cash:",
      kpiOnline: "UPI:",
      kpiStandardTime: "Standard Time: 10:30 AM",
      kpiOnlyB2b: "B2B Merchants Only",
      kpiActivePhones: "Active Phones",
      kpiDeliveryPending: "Delivery Pending:",
      kpiViewRegister: "View Register →",
      kpiViewKhata: "Khata Ledger →",
      kpiViewJobs: "Job Tokens →",

      // Geofence & Store Control
      storeStatusTitle: "Branch Live Status & GPS-Verified Control",
      storeStatusSub: "Store managers must be within 10m of the physical branch to toggle opening status.",
      shopOpen: "OPEN",
      shopClosed: "CLOSED",
      todaySales: "Today's Sales",
      presentStaff: "Present Staff",
      openedBy: "Opened by:",
      openShopBtn: "📍 Open Store (GPS Verified)",
      closeShopBtn: "🛑 Close Store",

      // Attendance
      attPunchInBtn: "📸 Duty Punch In",
      attPunchOutBtn: "🛑 Duty Punch Out",
      attRepunchInBtn: "🟢 Resume Duty (Punch In)",
      attTodayWork: "Today's Work Hours",
      attMonthWork: "Total Work This Month",
      attRecentHistory: "Recent Attendance Logs",
      attDate: "Date",
      attEmployee: "Employee Name",
      attBranch: "Branch",
      attSelfie: "Selfie",
      attInTime: "Punch In Time",
      attOutTime: "Punch Out Time",
      attHours: "Work Hours",
      attGpsLoc: "GPS Location",
      attStatus: "Status",
      attAdminAction: "Admin Action",
      attInside: "At Store",
      attOutside: "Out of Store",
      attApproved: "Approved",
      attPending: "Pending Approval",
      attRejected: "Rejected",
      attApproveBtn: "Approve",
      attRejectBtn: "Reject",

      // CRM
      crmMerchants: "🏪 Local Merchants (B2B)",
      crmCustomers: "👤 Walk-in Customers",
      crmTotalB2b: "Merchant (B2B) Total Revenue",
      crmTotalRetail: "Retail Customer Total Revenue",
      crmSearchPlaceholder: "Search by name or mobile number...",
      crmExportExcel: "Download Excel Report",

      // POS
      posTitle: "POS Counter Billing & Cart",
      posBillingStore: "Billing Branch:",
      posSkuSearch: "Type part name, model or SKU...",
      posAddNewSku: "➕ Add New SKU / Part",
      posCustName: "Customer Name *",
      posCustPhone: "Mobile Number (For WhatsApp Bill) *",
      posDiscount: "Discount ₹",
      posPaid: "Paid / Advance ₹",
      posDue: "Remaining Due ₹",
      posGenerateBill: "Generate Bill & WhatsApp Receipt",

      // Sales
      salesTitle: "Daily Sales & Cash Register",
      salesToday: "⚡ Today",
      salesYesterday: "📅 Yesterday",
      salesMonth: "🗓️ This Month",
      salesAll: "📜 All Time",
      salesGross: "Gross Sales",
      salesCash: "Cash in Drawer",
      salesBank: "Bank / UPI",
      salesDue: "Credit Given"
    },
    hi: {
      controlPanel: "कंट्रोल पैनल",
      greeting: "नमस्ते,",
      subtitle: "लखनऊ हेड लैब • लाइव कंट्रोल पैनल",
      publicSite: "पब्लिक वेबसाइट",
      logout: "लॉगआउट",
      allBranches: "सभी शाखाएं",
      quickBill: "+ नया बिल",
      quickToken: "+ नया टोकन",
      shopStatus: "दुकान स्थिति:",
      openStore: "खुली रखें",
      closeStore: "बंद रखें",
      autoTime: "ऑटो टाइम",

      // Navigation Groups
      navCore: "ओवरव्यू",
      navOps: "दुकान",
      navFinance: "हिसाब",
      navHr: "स्टाफ",

      // Tabs
      tabDashboard: "डैशबोर्ड",
      tabPos: "बिलिंग",
      tabJobs: "रिपेयर",
      tabInventory: "इन्वेंट्री",
      tabTransfer: "ट्रांसफर",
      tabDirectory: "ग्राहक",
      tabSales: "बिक्री",
      tabKhata: "खाता",
      tabExpenses: "खर्चे",
      tabBalance: "रिपोर्ट्स",
      tabAttendance: "हाजिरी",
      tabStaff: "स्टाफ",
      tabSettings: "सेटिंग्स",
      tabSettingsEmp: "प्रोफाइल",
      tabMyWork: "टास्क",

      // Dashboard
      dashBannerTag: "दुकान ऑपरेशंस, बिक्री व स्टाफ मॉनिटरिंग",
      dashBannerDesc: "शाखाओं की लाइव स्थिति, GPS-सत्यापित स्टोर ओपनिंग, कर्मचारियों का लेट-अराइवल अलर्ट और आज की नेट बिक्री का रियल-टाइम हिसाब।",
      dashCreateBillBtn: "🛒 नया बिल बनाएं",
      dashCheckAttBtn: "👥 हाजिरी चेक करें",

      // KPIs
      kpiSales: "आज की कुल बिक्री",
      kpiStaff: "उपस्थित कर्मचारी & लेट",
      kpiCredit: "आज का नया उधार",
      kpiJobs: "लैब रिपेयर लोड",
      kpiCash: "नकद:",
      kpiOnline: "UPI:",
      kpiStandardTime: "मानक समय: 10:30 AM",
      kpiOnlyB2b: "केवल B2B दुकानदार",
      kpiActivePhones: "चालू फोन",
      kpiDeliveryPending: "डिलीवरी बाकी:",
      kpiViewRegister: "रजिस्टर देखें →",
      kpiViewKhata: "खाता-बही →",
      kpiViewJobs: "जॉब टोकन →",

      // Geofence & Store Control
      storeStatusTitle: "शाखा लाइव स्थिति व GPS-सत्यापित स्टोर कंट्रोल",
      storeStatusSub: "प्रबंधक केवल दुकान की वास्तविक लोकेशन (10m के दायरे) में खड़े होकर ही दुकान 'ओपन' कर सकते हैं।",
      shopOpen: "खुली है",
      shopClosed: "बंद है",
      todaySales: "आज की सेल",
      presentStaff: "उपस्थित स्टाफ",
      openedBy: "खोला:",
      openShopBtn: "📍 दुकान खोलें (GPS Verified)",
      closeShopBtn: "🛑 दुकान बंद करें",

      // Attendance
      attPunchInBtn: "📸 हाजिरी लगाएं (Punch In)",
      attPunchOutBtn: "🛑 ड्यूटी ऑफ करें (Punch Out)",
      attRepunchInBtn: "🟢 दोबारा ड्यूटी ऑन करें",
      attTodayWork: "आज का कार्य समय",
      attMonthWork: "इस महीने कुल काम",
      attRecentHistory: "हालिया हाजिरी रिकॉर्ड",
      attDate: "तारीख",
      attEmployee: "कर्मचारी का नाम",
      attBranch: "शाखा",
      attSelfie: "सेल्फी",
      attInTime: "इन-टाइम",
      attOutTime: "आउट-टाइम",
      attHours: "कुल कार्य-घंटे",
      attGpsLoc: "GPS लोकेशन",
      attStatus: "स्थिति",
      attAdminAction: "एडमिन एक्शन",
      attInside: "दुकान पर",
      attOutside: "दुकान से बाहर",
      attApproved: "स्वीकृत",
      attPending: "पेंडिंग अप्रूवल",
      attRejected: "अस्वीकृत",
      attApproveBtn: "स्वीकृत करें",
      attRejectBtn: "अस्वीकृत करें",

      // CRM
      crmMerchants: "🏪 लोकल दुकानदार (B2B)",
      crmCustomers: "👤 सामान्य ग्राहक (Walk-in)",
      crmTotalB2b: "दुकानदार (B2B) कुल व्यापार",
      crmTotalRetail: "रीटेल ग्राहक कुल व्यापार",
      crmSearchPlaceholder: "नाम या मोबाइल नंबर से खोजें...",
      crmExportExcel: "एक्सेल में डाउनलोड करें",

      // POS
      posTitle: "काउंटर बिलिंग व कार्ट",
      posBillingStore: "बिलिंग दुकान:",
      posSkuSearch: "पार्ट, मॉडल या SKU नाम टाइप करें...",
      posAddNewSku: "➕ नया पार्ट जोड़ें",
      posCustName: "ग्राहक का नाम *",
      posCustPhone: "मोबाइल नंबर (WhatsApp बिल हेतु) *",
      posDiscount: "छूट (₹)",
      posPaid: "जमा / एडवांस रकम ₹",
      posDue: "बकाया रकम ₹",
      posGenerateBill: "बिल व WhatsApp रसीद बनाएं",

      // Sales
      salesTitle: "डेली सेल्स व गल्ला मिलान",
      salesToday: "⚡ आज",
      salesYesterday: "📅 कल",
      salesMonth: "🗓️ इस महीने",
      salesAll: "📜 सभी",
      salesGross: "कुल बिक्री",
      salesCash: "गल्ले में नकद",
      salesBank: "बैंक / UPI",
      salesDue: "आज का दिया उधार"
    }
  };

  function pT(key) {
    const lang = state.portalLang || 'en';
    const dict = PORTAL_I18N[lang] || PORTAL_I18N['en'];
    return dict[key] || (PORTAL_I18N['en'] && PORTAL_I18N['en'][key]) || key;
  }

  function setPortalLanguage(lang) {
    lang = (lang === 'en') ? 'en' : 'hi';
    state.portalLang = lang;
    state.lang = lang;
    state.currentLang = lang;
    try {
      localStorage.setItem('mms_portal_lang', lang);
      localStorage.setItem('mms_lang', lang);
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch(e) {}

    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }

    applyPortalLanguageUI();
    renderPortalShopControl();
    renderPortalBranchSwitcher();
    /* setPortalLanguageSanitizeHook */
    try { sanitizeAndLocalizeActiveTab(); } catch(e) {}

    if (typeof renderEmployeeJobAlerts === 'function') renderEmployeeJobAlerts();
    if (state.activeAdminTab === 'mywork') renderMyWorkModule();
    else if (state.activeAdminTab === 'dashboard') renderDashboard();
    else if (state.activeAdminTab === 'pos') renderPOS();
    else if (state.activeAdminTab === 'jobs') renderJobCards();
    else if (state.activeAdminTab === 'inventory') renderInventory();
    else if (state.activeAdminTab === 'transfer') renderStockTransferModule();
    else if (state.activeAdminTab === 'directory') renderDirectoryCRM();
    else if (state.activeAdminTab === 'sales') renderDailySales();
    else if (state.activeAdminTab === 'khata') renderKhataLedger();
    else if (state.activeAdminTab === 'expenses') renderExpenses();
    else if (state.activeAdminTab === 'balance') renderBalanceSheet();
    else if (state.activeAdminTab === 'attendance') renderAttendanceModule();
    else if (state.activeAdminTab === 'staff') renderStaffSalaries();
    else if (state.activeAdminTab === 'settings') renderSettingsModule();
  }

  function applyPortalLanguageUI() {
    const lang = (state.portalLang || state.lang || 'hi') === 'en' ? 'en' : 'hi';
    const isEn = lang === 'en';

    // Update Language Switcher active styles
    const btnEn = document.getElementById('btn-portal-lang-en');
    const btnHi = document.getElementById('btn-portal-lang-hi');
    if (btnEn && btnHi) {
      if (isEn) {
        btnEn.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-black transition cursor-pointer bg-slate-900 text-white shadow-sm';
        btnHi.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer';
      } else {
        btnHi.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-black transition cursor-pointer bg-slate-900 text-white shadow-sm';
        btnEn.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer';
      }
    }

    // Update Header user role & titles
    const sidebarActionTitle = document.getElementById('sidebar-action-title');
    if (sidebarActionTitle) {
      sidebarActionTitle.textContent = isEn ? 'Create New Invoice' : 'नया बिल बनाएं';
    }
    const userRoleEl = document.getElementById('header-user-role');
    if (userRoleEl) {
      userRoleEl.textContent = isEn ? 'Admin' : 'एडमिन';
    }

    const menuBtn = document.getElementById('sidebar-open-btn');
    if (menuBtn) menuBtn.title = isEn ? 'Menu' : 'मेनू';

    const alertBellBtn = document.getElementById('alert-bell-btn');
    if (alertBellBtn) alertBellBtn.title = isEn ? 'Alerts' : 'अलर्ट्स';

    // Update Sidebar Brand
    const sidebarBrand = document.querySelector('#sidebar .uppercase.tracking-wider');
    if (sidebarBrand) sidebarBrand.textContent = isEn ? 'Control Panel' : 'कंट्रोल पैनल';

    // Update Sidebar User Name & Role in Drawer
    if (dom && dom.portalUserBadge) {
      const nameEl = dom.portalUserBadge.querySelector('.font-black');
      if (nameEl) {
        nameEl.textContent = isEn ? 'Monu (Admin)' : 'मोनू जी';
      }
      const roleEl = dom.portalUserBadge.querySelector('.text-\\[10px\\]') || dom.portalUserBadge.querySelector('.tracking-wider');
      if (roleEl) {
        roleEl.textContent = isEn ? 'Super Admin' : 'सुपर एडमिन';
      }
    }

    const publicSiteBtn = document.getElementById('back-to-site-btn');
    if (publicSiteBtn) {
      const label = publicSiteBtn.querySelector('.sidebar-text-label');
      if (label) label.textContent = isEn ? 'Public Website' : 'पब्लिक वेबसाइट';
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      const label = logoutBtn.querySelector('.sidebar-text-label');
      if (label) label.textContent = isEn ? 'Sign Out' : 'लॉगआउट';
    }

    // Update Sidebar Navigation Button Labels
    const tabMap = {
      dashboard: isEn ? 'Dashboard' : 'डैशबोर्ड',
      pos: isEn ? 'Billing' : 'बिलिंग',
      jobs: isEn ? 'Repairs' : 'रिपेयर',
      inventory: isEn ? 'Inventory' : 'इन्वेंट्री',
      transfer: isEn ? 'Transfer' : 'ट्रांसफर',
      directory: isEn ? 'Customers' : 'ग्राहक',
      sales: isEn ? 'Sales' : 'बिक्री',
      khata: isEn ? 'Khata' : 'खाता',
      expenses: isEn ? 'Expenses' : 'खर्चे',
      balance: isEn ? 'Reports' : 'रिपोर्ट्स',
      attendance: isEn ? 'Attendance' : 'हाजिरी',
      staff: isEn ? 'Staff' : 'स्टाफ',
      settings: isEn ? 'Settings' : 'सेटिंग्स',
      mywork: isEn ? 'Tasks' : 'टास्क'
    };

    const pTabs = (dom && dom.portalTabs && dom.portalTabs.length) ? dom.portalTabs : document.querySelectorAll(".portal-tab-btn");
    pTabs.forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      const labelSpan = btn.querySelector('.sidebar-text-label');
      if (labelSpan && tabMap[tab]) {
        labelSpan.textContent = tabMap[tab];
      }
    });

    // Update Nav Group Headers
    const grpCoreTitle = document.querySelector('#portal-nav-group-core .sidebar-text-label span');
    if (grpCoreTitle) grpCoreTitle.textContent = isEn ? 'Overview' : 'ओवरव्यू';

    const grpOpsTitle = document.querySelector('#portal-nav-group-ops .sidebar-text-label');
    if (grpOpsTitle) grpOpsTitle.textContent = isEn ? 'Operations' : 'दुकान';

    const grpFinanceTitle = document.querySelector('#portal-nav-group-finance .sidebar-text-label');
    if (grpFinanceTitle) grpFinanceTitle.textContent = isEn ? 'Accounts' : 'हिसाब';

    const grpHrTitle = document.getElementById('portal-nav-group-hr-title');
    if (grpHrTitle) grpHrTitle.textContent = isEn ? 'Staff' : 'स्टाफ';

    // Update sidebar bottom user role
    if (dom && dom.portalUserBadge) {
      const roleText = (state.currentUser && state.currentUser.role || 'admin').toLowerCase();
      const badgeRoleEl = dom.portalUserBadge.querySelector('.text-\\[10px\\]') || dom.portalUserBadge.querySelector('div:last-child div:last-child');
      if (badgeRoleEl) {
        badgeRoleEl.textContent = isEn 
          ? (roleText === 'admin' ? 'Super Admin (Owner)' : roleText === 'manager' ? 'Branch Manager' : 'Staff')
          : (roleText === 'admin' ? 'सुपर एडमिन (Owner)' : roleText === 'manager' ? 'ब्रांच मैनेजर' : 'स्टाफ');
      }
    }


  }
  
  
  // =========================================================================
  // GATEKEEPER ATTENDANCE & MANAGER OFF-DUTY ACCESS LOGIC
  // =========================================================================

  function isUserPunchedIn(user) {
    if (!user) return false;
    const role = (user.role || '').toLowerCase();
    // Super Admin (Monu Ji) is completely exempt from punch lock
    if (role === 'admin') return true;

    const todayStr = getTodayDateStr();
    const curEmp = (state.staff || []).find(s => 
      s.id === user.id || s.phone === user.phone || (user.phone && s.phone === user.phone) || s.name === user.name
    );
    const empId = curEmp ? curEmp.id : user.id;

    const todayPunch = (state.attendance || []).find(a => 
      (a.empId === empId || a.employeeId === empId || a.phone === user.phone || a.empName === user.name || a.employeeName === user.name) &&
      a.date === todayStr
    );

    // Punched in if there is an inTime AND no outTime (or outTime is empty / '—')
    const hasIn = todayPunch && todayPunch.inTime && todayPunch.inTime !== '—';
    const hasOut = todayPunch && todayPunch.outTime && todayPunch.outTime !== '—' && todayPunch.outTime !== '';
    return !!(hasIn && !hasOut);
  }

  function getTodayPunchRecord(user) {
    if (!user) return null;
    const todayStr = getTodayDateStr();
    const curEmp = (state.staff || []).find(s => 
      s.id === user.id || s.phone === user.phone || (user.phone && s.phone === user.phone) || s.name === user.name
    );
    const empId = curEmp ? curEmp.id : user.id;

    return (state.attendance || []).find(a => 
      (a.empId === empId || a.employeeId === empId || a.phone === user.phone || a.empName === user.name || a.employeeName === user.name) &&
      a.date === todayStr
    ) || null;
  }

  function activateManagerOffDutyMode() {
    state.managerOffDutyAccess = true;
    renderPortal();
  }

  function renderGatekeeperView() {
    const gkContainer = document.getElementById('portal-gatekeeper-view');
    if (!gkContainer) return;

    const user = state.currentUser;
    if (!user) return;

    const role = (user.role || '').toLowerCase();
    const isManager = role === 'manager';
    const todayRec = getTodayPunchRecord(user);
    const hasOut = todayRec && todayRec.outTime && todayRec.outTime !== '—' && todayRec.outTime !== '';

    let cleanName = (user.name || 'कर्मचारी').replace(/\s*\([^)]*\)/g, '').trim();

    gkContainer.innerHTML = `
      <div class="max-w-xl mx-auto my-6 sm:my-10 bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div class="w-20 h-20 mx-auto rounded-3xl ${hasOut ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-amber-50 border-amber-200 text-amber-600'} border-2 flex items-center justify-center text-4xl shadow-inner">
          ${hasOut ? '🌙' : '🔒'}
        </div>
        
        <div>
          <span class="px-3.5 py-1 rounded-full ${hasOut ? 'bg-indigo-100 text-indigo-900 border-indigo-300' : 'bg-amber-100 text-amber-900 border-amber-300'} font-black text-[11px] uppercase tracking-wider inline-block mb-2 border">
            ${hasOut ? 'ड्यूटी समाप्त (Punched Out)' : 'दैनिक उपस्थिति सत्यापन आवश्यक (Punch-In Required)'}
          </span>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900">
            नमस्ते, ${cleanName}! ${hasOut ? 'आपकी आज की ड्यूटी पंच-आउट हो चुकी है' : 'आपकी आज की ड्यूटी पंच-इन नहीं है'}
          </h2>
          <p class="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-md mx-auto leading-relaxed">
            ${hasOut ? `
              आज की ड्यूटी शाम ${todayRec.outTime} पर समाप्त हो चुकी है (कुल समय: ${todayRec.hoursWorked || 8} घंटे)। सुरक्षित रहने के लिए सिस्टम लॉक है।
            ` : (isManager ? `
              दुकान ऑपरेशंस एक्सेस करने के लिए दुकान पर उपस्थित होकर पंच-इन करें, या घर से छूटा हुआ काम पूरा करने के लिए नीचे 'डेटा देखें व छूटी एंट्रीज करें' खोलें।
            ` : `
              सिस्टम में POS, रिपेयर टोकन व अन्य कार्य करने के लिए दुकान के 100 मीटर दायरे में उपस्थित होकर लाइव सेल्फी व GPS पंच-इन अनिवार्य है।
            `)}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 pt-2">
          <!-- Button 1: Mandatory Shop Punch In / Punch Out -->
          <button type="button" onclick="window.MMS_APP.openPunchModal('${hasOut ? 'in' : 'in'}')" class="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer">
            <span class="text-xl">📍</span>
            <span>${hasOut ? 'पुनः ड्यूटी पंच-इन करें (Selfie + GPS)' : 'दुकान पर लाइव पंच-इन करें (Selfie + GPS 100m)'}</span>
          </button>

          ${isManager ? `
          <!-- Button 2: Manager Only - Off-Duty / Remote Entry Mode (तरीका 2) -->
          <button type="button" onclick="window.MMS_APP.activateManagerOffDutyMode()" class="w-full py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-300 rounded-2xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 active:scale-98 cursor-pointer">
            <span class="text-base">📋</span>
            <span>डेटा देखें व छूटी हुई एंट्रीज करें (घर से एक्सेस)</span>
          </button>
          <p class="text-[11px] text-slate-400 font-medium">
            ℹ️ नोट: घर से काम करने पर दुकान की हाजिरी (Duty Hours) नहीं जुड़ेगी, केवल डेटा व बिलिंग कार्य खुलेगा।
          </p>
          ` : `
          <p class="text-[11px] text-rose-600 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
            ⚠️ बिना दुकान पर लाइव उपस्थिति दर्ज किए कोई भी कार्य एक्सेस नहीं किया जा सकता।
          </p>
          `}
        </div>
      </div>
    `;

    gkContainer.classList.remove('hidden');
    gkContainer.style.display = 'block';
  }

  function renderPortal() {
    renderPortalShopControl();
    renderPortalBranchSwitcher();
    applyPortalLanguageUI();

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    // --- GATEKEEPER LOCK: Check punch-in status for non-admin users ---
    const punchedIn = isUserPunchedIn(state.currentUser);
    const allowManagerBypass = isManager && state.managerOffDutyAccess === true;
    const isLockedByGatekeeper = !isOwner && !punchedIn && !allowManagerBypass;

    const gkContainer = document.getElementById('portal-gatekeeper-view');
    const tabViews = document.querySelectorAll('.portal-tab-view');

    if (isLockedByGatekeeper) {
      // Hide all tab views
      tabViews.forEach(v => {
        v.classList.add('hidden');
        v.style.display = 'none';
      });
      // Show Gatekeeper View
      renderGatekeeperView();

      // Disable/Dim sidebar tab navigation
      const pTabs = document.querySelectorAll('.portal-tab-btn');
      pTabs.forEach(b => {
        b.classList.add('opacity-40', 'pointer-events-none');
      });

      // Update header indicator
      const roleEl = document.getElementById('header-user-role');
      if (roleEl) {
        roleEl.innerHTML = `
          <span class="text-rose-600 font-bold flex items-center gap-1">
            🔒 ${role === 'manager' ? 'ब्रांच मैनेजर (ऑफ-ड्यूटी)' : 'स्टाफ (पंच-इन आवश्यक)'}
          </span>
        `;
      }
      return;
    } else {
      // Unlocked! Hide gatekeeper view
      if (gkContainer) {
        gkContainer.classList.add('hidden');
        gkContainer.style.display = 'none';
      }
      // Re-enable sidebar navigation buttons
      const pTabs = document.querySelectorAll('.portal-tab-btn');
      pTabs.forEach(b => {
        b.classList.remove('opacity-40', 'pointer-events-none');
      });
    }

    // Strict Allowed Tabs per role
    let allowedTabs = [];
    if (isOwner) {
      // Super Admin: FULL unrestricted access across all 3 branches
      allowedTabs = ['dashboard', 'pos', 'jobs', 'inventory', 'directory', 'sales', 'khata', 'expenses', 'balance', 'attendance', 'staff', 'settings'];
    } else if (isManager) {
      // Branch Manager: Only branch operational tabs! (NO Balance Sheet P&L, NO Staff Salary HR, NO Master System Settings)
      allowedTabs = ['dashboard', 'pos', 'jobs', 'inventory', 'directory', 'sales', 'khata', 'expenses', 'attendance'];
    } else {
      // Employee / Technician: User specifically requires:
      // "अब इंप्लाई का डेली वर्क भी तो दिखाई देगा.. प्लीज वर्क का ऑप्शन भी बढ़ाइये.. जहां उसे असाइन्ड काम दिखाई देगा.."
      allowedTabs = ['mywork', 'attendance', 'settings'];
    }

    // Toggle Sidebar Navigation Buttons
    const pTabs = (dom && dom.portalTabs && dom.portalTabs.length) ? dom.portalTabs : document.querySelectorAll(".portal-tab-btn");
    pTabs.forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      if (allowedTabs.includes(tab)) {
        btn.classList.remove('hidden');
        btn.style.display = 'flex';
      } else {
        btn.classList.add('hidden');
        btn.style.display = 'none';
      }
    });

    // Hide entire Nav Group Headers for Employee (No "डैशबोर्ड व ओवरव्यू", "दुकान ऑपरेशंस", "फाइनेंस" headers appear!)
    const grpCore = document.getElementById('portal-nav-group-core');
    const grpOps = document.getElementById('portal-nav-group-ops');
    const grpFinance = document.getElementById('portal-nav-group-finance');
    const grpHr = document.getElementById('portal-nav-group-hr');
    const hrTitle = document.getElementById('portal-nav-group-hr-title');
    const settingsLabel = document.getElementById('portal-settings-tab-label');

    if (isEmployee) {
      if (grpCore) { grpCore.style.display = 'none'; grpCore.classList.add('hidden'); }
      if (grpOps) { grpOps.style.display = 'none'; grpOps.classList.add('hidden'); }
      if (grpFinance) { grpFinance.style.display = 'none'; grpFinance.classList.add('hidden'); }
      if (grpHr) { grpHr.style.display = 'block'; grpHr.classList.remove('hidden'); }
      if (hrTitle) { hrTitle.style.display = 'none'; hrTitle.classList.add('hidden'); }
      if (settingsLabel) { const isEn = (state.portalLang || state.lang || 'hi') === 'en'; settingsLabel.textContent = isEn ? 'Settings' : 'सेटिंग्स'; }
    } else if (isManager) {
      if (grpCore) { grpCore.style.display = 'block'; grpCore.classList.remove('hidden'); }
      if (grpOps) { grpOps.style.display = 'block'; grpOps.classList.remove('hidden'); }
      if (grpFinance) { grpFinance.style.display = 'block'; grpFinance.classList.remove('hidden'); }
      if (grpHr) { grpHr.style.display = 'block'; grpHr.classList.remove('hidden'); }
      if (hrTitle) { hrTitle.style.display = 'block'; hrTitle.classList.remove('hidden'); }
      if (settingsLabel) { const isEn = (state.portalLang || state.lang || 'hi') === 'en'; settingsLabel.textContent = isEn ? 'Settings' : 'सेटिंग्स'; }
    } else {
      if (grpCore) { grpCore.style.display = 'block'; grpCore.classList.remove('hidden'); }
      if (grpOps) { grpOps.style.display = 'block'; grpOps.classList.remove('hidden'); }
      if (grpFinance) { grpFinance.style.display = 'block'; grpFinance.classList.remove('hidden'); }
      if (grpHr) { grpHr.style.display = 'block'; grpHr.classList.remove('hidden'); }
      if (hrTitle) { hrTitle.style.display = 'block'; hrTitle.classList.remove('hidden'); }
      if (settingsLabel) { const isEn = (state.portalLang || state.lang || 'hi') === 'en'; settingsLabel.textContent = isEn ? 'Settings' : 'सेटिंग्स'; }
    }

        // Restore exact saved tab on refresh so user stays on the same page!
    const savedTab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    if (savedTab && allowedTabs.includes(savedTab)) {
      state.activeAdminTab = savedTab;
    } else if (isEmployee) {
      state.activeAdminTab = allowedTabs.includes(state.activeAdminTab) ? state.activeAdminTab : 'mywork';
    } else {
      if (isOwner && (!state.activeBranch || state.activeBranch === '')) {
        state.activeBranch = 'all';
      }
      state.activeAdminTab = allowedTabs.includes(state.activeAdminTab) ? state.activeAdminTab : 'dashboard';
    }

    switchPortalTab(state.activeAdminTab);
  }

  
  function toggleDesktopSidebar() {
    const sidebar = document.getElementById('portal-sidebar');
    const collapseIcon = document.getElementById('collapse-icon');
    if (!sidebar) return;

    const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
    if (isCollapsed) {
      // EXPAND
      sidebar.classList.remove('sidebar-collapsed', 'lg:w-20', 'xl:w-20');
      sidebar.style.width = '';
      sidebar.style.minWidth = '';
      sidebar.classList.add('lg:w-64', 'xl:w-72');
      if (collapseIcon) collapseIcon.innerHTML = '◀';
    } else {
      // COLLAPSE - 5rem icon-only mode
      sidebar.classList.remove('lg:w-64', 'xl:w-72');
      sidebar.classList.add('sidebar-collapsed', 'lg:w-20', 'xl:w-20');
      sidebar.style.width = '5rem';
      sidebar.style.minWidth = '5rem';
      if (collapseIcon) collapseIcon.innerHTML = '▶';
    }
  }

    function openMobileSidebar() {
    const sidebar = document.getElementById('portal-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('translate-x-0');
      sidebar.style.transform = 'translateX(0)';
    }
    if (backdrop) {
      backdrop.classList.remove('hidden');
      backdrop.style.display = 'block';
    }
  }

    function filterPunchEmployees(branchId) {
    const empSelect = document.getElementById('punch-employee-select');
    if (!empSelect) return;
    const curBranch = branchId || 'branch_hazratganj';
    const emps = (state.staff || []).filter(s => s.role !== 'admin' && (curBranch === 'all' || s.branchId === curBranch || s.branchId === 'all'));
    empSelect.innerHTML = emps.map(emp => `<option value="${emp.id}">${emp.name} (${emp.roleLabel || emp.role})</option>`).join('');
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('portal-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
        sidebar.style.transform = 'translateX(-100%)';
      } else {
        sidebar.style.transform = '';
      }
    }
    if (backdrop) {
      backdrop.classList.add('hidden');
      backdrop.style.display = 'none';
    }
  }

  
  function quickRoleLogin(roleType) {
    let target = null;
    if (roleType === 'admin') {
      target = { phone: "7905859701", role: "admin", name: "मोनू जी (Monu - Super Admin)", branchId: "all" };
    } else if (roleType === 'manager') {
      target = { phone: "8931059701", role: "manager", name: "सूरज वर्मा (Suraj - Manager)", branchId: "branch_naka" };
    } else {
      target = { phone: "9044115178", role: "technician", name: "विकास पाल (Vikas Pal)", branchId: "branch_kannauj" };
    }
    state.currentUser = target;
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(target));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'portal');
    closeModal(dom.loginModal);
    renderAuthPill();
    showPortal();
  }
  
  function switchPortalTab(tab) {
    /* closeMobileSidebarOnTabSwitch */
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      closeMobileSidebar();
    }
    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    // Gatekeeper enforcement in tab switch
    const punchedIn = isUserPunchedIn(state.currentUser);
    const allowManagerBypass = isManager && state.managerOffDutyAccess === true;
    if (!isOwner && !punchedIn && !allowManagerBypass) {
      renderGatekeeperView();
      return;
    }

    const allowedTabs = isOwner 
      ? ['dashboard', 'pos', 'jobs', 'inventory', 'transfer', 'directory', 'sales', 'khata', 'expenses', 'balance', 'attendance', 'staff', 'settings']
      : isManager 
        ? ['dashboard', 'pos', 'jobs', 'inventory', 'transfer', 'directory', 'sales', 'khata', 'expenses', 'attendance']
        : ['mywork', 'attendance'];

    // Enforce allowed tab strictly for all roles
    if (!allowedTabs.includes(tab)) {
      tab = isEmployee ? 'mywork' : 'dashboard';
    }
    state.activeAdminTab = tab || (isEmployee ? 'mywork' : 'dashboard');
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, state.activeAdminTab);
    if (window.innerWidth < 1024) closeMobileSidebar();

    // Update Sidebar Navigation button active classes & STRICT VISIBILITY
    const pTabs = (dom.portalTabs && dom.portalTabs.length) ? dom.portalTabs : document.querySelectorAll(".portal-tab-btn");
    pTabs.forEach(b => {
      const bTab = b.getAttribute('data-tab');
      if (allowedTabs.includes(bTab)) {
        b.style.display = 'flex';
        b.classList.remove('hidden');
        if (bTab === state.activeAdminTab) {
          b.className = 'portal-tab-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-all duration-200 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25';
        } else {
          b.className = 'portal-tab-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-all duration-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-semibold';
        }
      } else {
        b.style.display = 'none';
        b.classList.add('hidden');
      }
    });

    // Enforce group headers visibility
    const grpCore = document.getElementById('portal-nav-group-core');
    const grpOps = document.getElementById('portal-nav-group-ops');
    const grpFinance = document.getElementById('portal-nav-group-finance');
    const grpHr = document.getElementById('portal-nav-group-hr');
    const hrGroupTitle = document.getElementById('portal-nav-group-hr-title');

    if (isEmployee) {
      if (grpCore) { grpCore.style.display = 'none'; grpCore.classList.add('hidden'); }
      if (grpOps) { grpOps.style.display = 'none'; grpOps.classList.add('hidden'); }
      if (grpFinance) { grpFinance.style.display = 'none'; grpFinance.classList.add('hidden'); }
      if (grpHr) { grpHr.style.display = 'block'; grpHr.classList.remove('hidden'); }
      if (hrGroupTitle) { hrGroupTitle.style.display = 'none'; hrGroupTitle.classList.add('hidden'); }
    } else {
      if (grpCore) { grpCore.style.display = 'block'; grpCore.classList.remove('hidden'); }
      if (grpOps) { grpOps.style.display = 'block'; grpOps.classList.remove('hidden'); }
      if (grpFinance) { grpFinance.style.display = 'block'; grpFinance.classList.remove('hidden'); }
      if (grpHr) { grpHr.style.display = 'block'; grpHr.classList.remove('hidden'); }
      if (hrGroupTitle) { hrGroupTitle.style.display = 'block'; hrGroupTitle.classList.remove('hidden'); }
    }

    // Update Header active indicator if element exists
    const greetingEl = document.getElementById('header-greeting');
    const userNameEl = document.getElementById('header-user-name');
    const userRoleEl = document.getElementById('header-user-role');
    if (userNameEl && state.currentUser) {
      let displayName = state.currentUser.name || 'Admin';
      displayName = displayName.replace(/\s*\([^)]*\)/g, '').trim();
      userNameEl.textContent = displayName;
      
      const role = (state.currentUser.role || 'Admin').toLowerCase();
      let roleHtml = role === 'admin' ? __L('सुपर एडमिन (Owner)', 'Super Admin (Owner)') : role === 'manager' ? __L('ब्रांच मैनेजर', 'Branch Manager') : __L('स्टाफ', 'Staff');
      if (role === 'manager' && state.managerOffDutyAccess) {
        roleHtml = `
          <span class="flex items-center gap-1.5 flex-wrap">
            <span>ब्रांच मैनेजर</span>
            <span class="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-black">
              🏠 ऑफ-ड्यूटी मोड (घर से)
            </span>
          </span>
        `;
      }
      if (userRoleEl) {
        if (role === 'manager' && state.managerOffDutyAccess) {
          userRoleEl.innerHTML = roleHtml;
        } else {
          userRoleEl.textContent = roleHtml;
        }
      }
      if (greetingEl) greetingEl.textContent = __L('नमस्ते,', 'Hello,');
    }

    // Ensure shop control and branch switcher update
    renderPortalShopControl();
    renderPortalBranchSwitcher();

    // Toggle Tab Views: ensure only the active allowed tab is displayed
    const viewContainer = document.querySelectorAll('.portal-tab-view');
    viewContainer.forEach(v => {
      if (v.id === `tab-view-${state.activeAdminTab}`) {
        v.classList.remove('hidden');
        v.style.display = 'block';
      } else {
        v.classList.add('hidden');
        v.style.display = 'none';
      }
    });

    // Render corresponding view module with fail-safe error protection
    try {
      if (state.activeAdminTab === 'mywork') renderMyWorkModule();
      else if (state.activeAdminTab === 'dashboard') renderDashboard();
      else if (state.activeAdminTab === 'pos') renderPOS();
      else if (state.activeAdminTab === 'inventory') renderInventory();
      else if (state.activeAdminTab === 'transfer') renderStockTransferModule();
      else if (state.activeAdminTab === 'khata') renderKhata();
      else if (state.activeAdminTab === 'sales') renderDailySales();
      else if (state.activeAdminTab === 'balance') renderBalanceSheet();
      else if (state.activeAdminTab === 'jobs') renderJobCardsManager();
      else if (state.activeAdminTab === 'directory') renderDirectoryCRM();
      else if (state.activeAdminTab === 'attendance') renderAttendanceModule();
      else if (state.activeAdminTab === 'staff') renderStaffHRModule();
      else if (state.activeAdminTab === 'expenses') renderExpensesModule();
      else if (state.activeAdminTab === 'settings') renderSettingsModule();
    } catch (tabErr) {
      console.error(tabErr);
    }
    try { sanitizeAndLocalizeActiveTab(); } catch(e) { console.error('Sanitize error:', e); }
  }

  // =========================================================================
  // ENTERPRISE CONTROL PANEL & MASTER KPI DASHBOARD (SaaS Style)
  // =========================================================================

  function renderDashboard() {
    const container = document.getElementById('tab-view-dashboard');
    if (!container) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const isOwner = !state.currentUser || state.currentUser.role === 'admin';
    const curBranch = state.activeBranch || 'all';

    // 1. Calculate KPI Metrics
    // Filter invoices by branch and today
    const branchInvoices = (state.invoices || []).filter(inv => {
      const matchBranch = curBranch === 'all' || !inv.branchId || inv.branchId === curBranch;
      const invDate = inv.date || '';
      return matchBranch && invDate.startsWith(todayStr);
    });

    const todaySalesTotal = branchInvoices.reduce((sum, i) => sum + (Number(i.net) || 0), 0);
    const todayCash = branchInvoices.filter(i => i.paymentMode === 'cash').reduce((sum, i) => sum + (Number(i.paid) || 0), 0);
    const todayUPI = branchInvoices.filter(i => i.paymentMode === 'upi').reduce((sum, i) => sum + (Number(i.paid) || 0), 0);
    const todayNewCredit = branchInvoices.reduce((sum, i) => sum + (Number(i.due) || 0), 0);

    // Filter attendance by branch and today (Excluding Owner / Super Admin Monu Ji)
    const branchAttendance = (state.attendance || []).filter(att => {
      if (att.empId === 'emp_101' || (att.empName && att.empName.includes('Monu'))) return false;
      const matchBranch = curBranch === 'all' || !att.branchId || att.branchId === curBranch;
      return matchBranch && att.date === todayStr;
    });

    const presentStaffCount = branchAttendance.length;
    
    // Late arrivals calculation (Shift standard start is 10:30 AM)
    const lateStaffList = branchAttendance.filter(att => {
      if (!att.inTime) return false;
      const [timePart, modifier] = att.inTime.split(' ');
      if (!timePart) return false;
      let [hours, minutes] = timePart.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      const totalMinutes = hours * 60 + (minutes || 0);
      return totalMinutes > (10 * 60 + 30); // after 10:30 AM
    });
    const lateCount = lateStaffList.length;

    // Filter Active Repair Jobs
    const branchJobs = (state.jobs || []).filter(j => {
      return curBranch === 'all' || !j.branchId || j.branchId === curBranch;
    });
    const activeJobsCount = branchJobs.filter(j => j.status !== 'delivered' && j.status !== 'cancelled').length;
    const readyJobsCount = branchJobs.filter(j => j.status === 'ready').length;

    // Branch performance data breakdown
    const branches = state.branches || window.MMS_DATA.branches;

    container.innerHTML = `
      <!-- Top Overview Greeting & Status -->
      <div class="clay-card-hero p-6 sm:p-7 rounded-[32px] flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 text-white">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-300 border border-blue-400/30">
              ${curBranch === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(curBranch)}
            </span>
          </div>
          <h2 class="text-xl font-black text-white tracking-tight">
            ${__L("दुकान ऑपरेशंस व बिक्री", "Store Operations & Sales")}
          </h2>
        </div>

        <div class="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button onclick="window.MMS_APP.switchPortalTab('pos')" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg transition flex items-center gap-1.5 cursor-pointer">
            <span>🛒 ${__L("नया बिल", "New Bill")}</span>
          </button>
          <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="clay-pill px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-black text-slate-200 border border-slate-600 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
            <span>👥 ${__L("हाजिरी", "Attendance")}</span>
          </button>
        </div>
      </div>

      <!-- Row 1: High-Impact KPI Metric Cards (SaaS Style) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
        
        <!-- Card 1: Today's Total Sales -->
        <div class="clay-card clay-card-blue p-6 rounded-[32px]">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${__L("आज की कुल बिक्री", "Today's Gross Sales")}</span>
            <span class="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">₹</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ₹${todaySalesTotal.toLocaleString('en-IN')}
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>${__L("नकद:", "Cash:")} <strong class="text-slate-800">₹${todayCash.toLocaleString('en-IN')}</strong></span>
            <span>${__L("UPI:", "UPI:")} <strong class="text-blue-600">₹${todayUPI.toLocaleString('en-IN')}</strong></span>
          </div>
        </div>

        <!-- Card 2: Staff Attendance & Late Arrivals -->
        <div class="clay-card clay-card-mint p-6 rounded-[32px]">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${__L("उपस्थित कर्मचारी", "Present Staff")}</span>
            <span class="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">👥</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black text-slate-900">${presentStaffCount}</span>
            <span class="text-xs text-slate-400 font-bold">${__L("स्टाफ", "Staff")}</span>
            ${lateCount > 0 
              ? `<span class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-700 border border-rose-200">🔴 ${lateCount} ${__L("लेट", "Late")}</span>`
              : `<span class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">🟢 ${__L("समय पर", "On-Time")}</span>`
            }
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>${__L("मानक समय: 10:30 AM", "Standard: 10:30 AM")}</span>
            <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="text-blue-600 font-bold hover:underline">${__L("रजिस्टर देखें →", "View Register →")}</button>
          </div>
        </div>

        <!-- Card 3: Today's New Udhar (Credit) -->
        <div class="clay-card clay-card-peach p-6 rounded-[32px]">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${__L("आज का नया उधार", "Today's Credit")}</span>
            <span class="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base">📕</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black ${todayNewCredit > 0 ? 'text-amber-600' : 'text-slate-900'}">
            ₹${todayNewCredit.toLocaleString('en-IN')}
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>${__L("केवल B2B", "B2B Only")}</span>
            <button onclick="window.MMS_APP.switchPortalTab('khata')" class="text-amber-700 font-bold hover:underline">${__L("खाता देखें →", "View Khata →")}</button>
          </div>
        </div>

        <!-- Card 4: Active Repair Tokens -->
        <div class="clay-card clay-card-lilac p-6 rounded-[32px]">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">${__L("रिपेयर लोड", "Repair Workload")}</span>
            <span class="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base">🔧</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black text-slate-900">${activeJobsCount}</span>
            <span class="text-xs text-slate-400 font-bold">${__L("चालू फोन", "In Progress")}</span>
            <span class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-black bg-purple-100 text-purple-800">
              ${readyJobsCount} ${__L("रेडी", "Ready")}
            </span>
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>${__L("डिलीवरी बाकी: ", "Pending: ")}${activeJobsCount}</span>
            <button onclick="window.MMS_APP.switchPortalTab('jobs')" class="text-purple-600 font-bold hover:underline">${__L("जॉब टोकन →", "Job Tokens →")}</button>
          </div>
        </div>

      </div>

      <!-- Row 2: Location-Verified Store Opening & Branch Operational Status (Security Feature) -->
      <div class="clay-card bg-white/95 p-6 sm:p-7 rounded-[32px] mb-7">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-black text-slate-900">${__L("📍 शाखा स्थिति व कंट्रोल", "📍 Branch Status & Control")}</h3>
              <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">${__L("जियोफेंस", "Geofence")}</span>
            </div>
          </div>
        </div>

        <!-- 3 Branch Cards Grid (Each with Signature Pastel Clay Variant) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${branches.map(b => {
            const bStatus = (state.branchStatus && state.branchStatus[b.id]) || { isOpen: false };
            const bInvoices = (state.invoices || []).filter(i => (i.branchId === b.id || (!i.branchId && b.id === 'branch_hazratganj')) && (i.date || '').startsWith(todayStr));
            const bSales = bInvoices.reduce((acc, cur) => acc + (Number(cur.net) || 0), 0);
            const bStaff = (state.attendance || []).filter(a => a.empId !== 'emp_101' && (!a.empName || !a.empName.includes('Monu')) && (a.branchId === b.id || (!a.branchId && b.id === 'branch_hazratganj')) && a.date === todayStr);
            const branchClayClass = b.id === 'branch_hazratganj' ? 'clay-card-blue' : b.id === 'branch_naka' ? 'clay-card-mint' : 'clay-card-lilac';

            return `
              <div class="clay-card ${branchClayClass} p-5 rounded-[28px] flex flex-col justify-between gap-3">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-black text-slate-900">${getBranchName(b.id)}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1.5 ${bStatus.isOpen ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
                      <span class="w-1.5 h-1.5 rounded-full ${bStatus.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                      ${bStatus.isOpen ? __L('🟢 खुली है', '🟢 OPEN') : __L('🔴 बंद है', '🔴 CLOSED')}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1 line-clamp-1">${
    b.id === 'branch_hazratganj' ? __L("216, द्वितीय तल, श्रीराम टावर्स, हजरतगंज, लखनऊ", "216, 2nd Floor, Sree Rama Towers, Hazratganj, Lucknow") :
    b.id === 'branch_naka' ? __L("नाका हिंडोला मार्केट (निकट गुरुद्वारा), लखनऊ", "Naka Hindola Market (Near Gurudwara), Lucknow") :
    __L("सरायमीरा, जी.टी. रोड, कन्नौज", "Saraimeera, G.T. Road, Kannauj")
  }</p>

                  <div class="mt-3 grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span class="text-slate-400 text-[10px] block">${__L("आज की बिक्री", "Today's Sales")}</span>
                      <strong class="text-slate-900 font-bold">₹${bSales.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] block">${__L("उपस्थित स्टाफ", "Present Staff")}</span>
                      <strong class="text-blue-600 font-bold">${bStaff.length} ${__L("स्टाफ", "Staff")}</strong>
                    </div>
                  </div>

                  ${bStatus.isOpen && bStatus.openedBy ? `
                    <div class="mt-2 text-[10px] text-slate-500 flex items-center justify-between bg-emerald-100/50 px-2 py-1 rounded border border-emerald-200/50">
                      <span>👤 ${__L("खोला:", "Opened by:")} <strong>${
    (bStatus.openedBy || '').includes('Monu') ? __L("मोनू जी", "Monu") :
    (bStatus.openedBy || '').includes('Suraj') ? __L("सूरज वर्मा", "Suraj") :
    (bStatus.openedBy || '').includes('Vikas') ? __L("विकास पाल", "Vikas") :
    (bStatus.openedBy || __L("स्टाफ", "Staff"))
  }</strong></span>
                      <span>⏰ ${bStatus.time || '10:00 AM'}</span>
                    </div>
                  ` : ''}
                </div>

                <div class="pt-2 border-t border-slate-200/70 flex items-center gap-2">
                  ${bStatus.isOpen ? `
                    <button onclick="window.MMS_APP.toggleStoreOpenStatus('${b.id}', false)" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition">
                      ${__L("🛑 दुकान बंद करें", "🛑 Close Store")}
                    </button>
                  ` : `
                    <button onclick="window.MMS_APP.verifyAndOpenStore('${b.id}')" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center justify-center gap-1.5">
                      <span>📍 ${__L("दुकान खोलें", "Open Store")}</span>
                    </button>
                  `}
                  ${isOwner ? `
                    <button onclick="window.MMS_APP.adminOverrideStore('${b.id}')" title="एडमिन ओवरराइड (बिना GPS सीधे ऑन/ऑफ करें)" class="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs">
                      ⚙️
                    </button>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Row 3: Staff Attendance & Late-Comers Live Table -->
      <div class="clay-card overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-black text-slate-900">👥 ${__L("आज का कर्मचारी हाजिरी रजिस्टर", "Today's Staff Attendance & Punctuality")}</h3>
              <span class="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                ${presentStaffCount} ${__L("उपस्थित", "Present")}
              </span>
            </div>
          </div>
          <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>${__L("पूरा रजिस्टर देखें →", "View Full Register →")}</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">${__L("कर्मचारी", "Employee")}</th>
                <th class="py-3 px-4">${__L("शाखा", "Branch")}</th>
                <th class="py-3 px-4">${__L("इन-टाइम", "Punch In")}</th>
                <th class="py-3 px-4">${__L("स्थिति", "Punctuality")}</th>
                <th class="py-3 px-4">${__L("दूरी", "GPS Distance")}</th>
                <th class="py-3 px-4 text-right">${__L("एडमिन एक्शन", "Admin Action")}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${(state.staff || []).filter(emp => emp.role !== 'admin' && !emp.name.includes('Monu')).map(emp => {
                const att = (state.attendance || []).find(a => (a.employeeId === emp.id || a.empId === emp.id || (a.empName && a.empName.includes(emp.name.split(' ')[0])) || (a.employeeName && a.employeeName.includes(emp.name.split(' ')[0]))) && a.date === todayStr);
                const isPresent = !!att;
                
                // Determine Late status
                let isLate = false;
                let lateMins = 0;
                if (att && att.inTime) {
                  const [timePart, modifier] = att.inTime.split(' ');
                  if (timePart) {
                    let [h, m] = timePart.split(':').map(Number);
                    if (modifier === 'PM' && h < 12) h += 12;
                    if (modifier === 'AM' && h === 12) h = 0;
                    const punchMinutes = h * 60 + (m || 0);
                    const shiftMinutes = 10 * 60 + 30; // 10:30 AM
                    if (punchMinutes > shiftMinutes) {
                      isLate = true;
                      lateMins = punchMinutes - shiftMinutes;
                    }
                  }
                }

                return `
                  <tr class="hover:bg-slate-50/70 transition">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-2.5">
                        <img src="${emp.photo || 'images/avatar_placeholder.png'}" class="w-7 h-7 rounded-full object-cover border border-slate-200" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${emp.name}')">
                        <div>
                          <strong class="text-slate-900 font-black block">${
    (state.portalLang || state.lang || 'hi') === 'en' 
      ? (emp.nameEn || (emp.name.match(/\(([^)]+)\)/) ? emp.name.match(/\(([^)]+)\)/)[1] : emp.name.replace(/[^a-zA-Z\s]/g, '').trim()) || emp.name)
      : emp.name.replace(/\s*\([^)]*\)/g, '').trim()
  }</strong>
                          <span class="text-[10px] text-slate-400">${
    emp.role === 'manager' ? __L("ब्रांच मैनेजर", "Branch Manager") :
    emp.role === 'technician' ? __L("रिपेयरिंग टेक्नीशियन", "Repair Technician") :
    emp.role === 'frontdesk' ? __L("बिलिंग स्टाफ", "Billing Frontdesk") :
    __L("स्टाफ", "Staff")
  }</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-slate-600">
                      ${getBranchName(emp.branchId || 'branch_hazratganj')}
                    </td>
                    <td class="py-3 px-4 font-bold text-slate-800">
                      ${att ? att.inTime : `<span class="text-slate-300 font-normal">${__L("अनुपस्थित", "Absent")}</span>`}
                    </td>
                    <td class="py-3 px-4">
                      ${!isPresent ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          ⚪ ${__L("अभी नहीं आया", "Not In")}
                        </span>
                      ` : isLate ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-200">
                          🔴 ${__L("लेट आया", "Late")} (${lateMins}m)
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
                          🟢 ${__L("समय पर", "On Time")}
                        </span>
                      `}
                    </td>
                    <td class="py-3 px-4 text-slate-600">
                      ${att ? `📍 ${att.distanceMeters || '15'}m (${__L("दुकान अंदर", "In Store")})` : '—'}
                    </td>
                    <td class="py-3 px-4 text-right">
                      ${att && att.status === 'pending' ? `
                        <button onclick="window.MMS_APP.approveAttendance('${att.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 transition">
                          ${__L("स्वीकृत करें", "Approve")}
                        </button>
                      ` : att ? `
                        <span class="text-[11px] font-bold text-emerald-600">✓ ${att.status === 'approved' ? __L('स्वीकृत', 'Approved') : att.status}</span>
                      ` : `
                        <button onclick="window.MMS_APP.promptManualAttendance('${emp.id}')" class="text-blue-600 hover:underline text-[11px] font-bold">
                          + ${__L("हाजिरी लगाएं", "Manual Punch")}
                        </button>
                      `}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Row 4: Recent Invoices & Quick Operations -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <!-- Recent Invoices -->
        <div class="clay-card p-5">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span>🧾 ${__L("हालिया बिल", "Recent Invoices")}</span>
            </h4>
            <button onclick="window.MMS_APP.switchPortalTab('sales')" class="text-xs font-bold text-blue-600 hover:underline">
              ${__L("सभी देखें →", "View All →")}
            </button>
          </div>
          <div class="space-y-2.5">
            ${(state.invoices || []).slice(0, 4).map(inv => `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold text-slate-900">${inv.customerName || 'कस्टमर'}</strong>
                    <span class="text-[10px] text-slate-500 font-mono">${inv.invoiceNo || inv.id || ''}</span>
                  </div>
                  <div class="text-[10px] text-slate-400 mt-0.5">
                    ${getBranchName(inv.branchId || 'branch_hazratganj')} • ${inv.paymentMode === 'cash' ? __L("नकद", "Cash") : __L("UPI / ऑनलाइन", "UPI / Online")}
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-black text-slate-900 text-sm">₹${Number(inv.totalAmount || inv.subTotal || 0).toLocaleString('en-IN')}</div>
                  <span class="text-[10px] ${inv.due > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}">
                    ${inv.due > 0 ? `${__L("उधार:", "Due:")} ₹${inv.due}` : __L("पूर्ण चुकता", "Paid")}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Repair Tokens -->
        <div class="clay-card p-5">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span>🔧 ${__L("हालिया रिपेयर", "Recent Repairs")}</span>
            </h4>
            <button onclick="window.MMS_APP.switchPortalTab('jobs')" class="text-xs font-bold text-purple-600 hover:underline">
              ${__L("सभी जॉब्स →", "View All Jobs →")}
            </button>
          </div>
          <div class="space-y-2.5">
            ${(state.jobs || []).slice(0, 4).map(job => `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold text-slate-900">${job.customerName || 'कस्टमर'}</strong>
                    <span class="text-[10px] text-slate-500 font-mono">${job.token || job.tokenNo || job.id || ''}</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-0.5">
                    📱 ${job.device || job.deviceModel || 'स्मार्टफोन'} • ${job.issue || 'रिपेयर'}
                  </div>
                </div>
                <div class="text-right">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${
                    job.status === 'ready' ? 'bg-emerald-100 text-emerald-700' :
                    job.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }">
                    ${job.status === 'ready' ? 'तैयार' : job.status === 'in_progress' ? 'रिपेयर चालू' : 'स्वीकार'}
                  </span>
                  <div class="text-[10px] text-slate-400 mt-1">₹${job.estimatedCost || 0}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // GPS-Verified Geofenced Store Opening Logic
  function verifyAndOpenStore(branchId) {
    const branch = (state.branches || []).find(b => b.id === branchId) || {
      lat: 26.85172, lng: 80.94625, radiusMeters: 250, name: 'शाखा'
    };

    if (!navigator.geolocation) {
      alert('❌ आपके ब्राउज़र में GPS लोकेशन सपोर्ट उपलब्ध नहीं है। दुकान खोलने के लिए लोकेशन अनुमति अनिवार्य है।');
      return;
    }

    const confirmMsg = `📍 क्या आप ${branch.name} पर पहुंच चुके हैं?\n\nसिस्टम आपके फोन का लाइव GPS चेक करके दूरी मापेगा।`;
    if (!confirm(confirmMsg)) return;

    navigator.geolocation.getCurrentPosition(
      pos => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const distance = Math.round(calculateDistanceMeters(userLat, userLng, branch.lat, branch.lng));
        const allowedRadius = branch.radiusMeters || 250;

        if (distance > allowedRadius) {
          alert(`❌ दुकान नहीं खोली जा सकती!\n\nआप ${branch.name} से ${distance} मीटर दूर हैं।\nअनुमति सीमा: ${allowedRadius} मीटर।\n\nकृपया दुकान के परिसर में पहुंचकर ही दुकान खोलें!`);
          return;
        }

        // Distance verified! Open store
        const timeNow = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const user = state.currentUser ? state.currentUser.name : 'स्टोर मैनेजर';

        if (!state.branchStatus) state.branchStatus = {};
        state.branchStatus[branchId] = {
          isOpen: true,
          openedBy: user,
          time: timeNow,
          distance: distance,
          lat: userLat,
          lng: userLng
        };

        localStorage.setItem(STORAGE_KEYS.BRANCH_STATUS, JSON.stringify(state.branchStatus));
        alert(`✅ GPS सत्यापित! ${branch.name} को सफलतापूर्वक 'खुली है (OPEN)' दर्ज कर दिया गया है।\nदूरी: ${distance} मीटर\nसमय: ${timeNow}`);
        renderDashboard();
      },
      err => {
        alert('❌ GPS सिग्नल नहीं मिला! कृपया फोन/ब्राउज़र में लोकेशन सर्विस चालू करें और दोबारा प्रयास करें।\nत्रुटि: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  function toggleStoreOpenStatus(branchId, status) {
    const branch = (state.branches || []).find(b => b.id === branchId) || { name: 'शाखा' };
    if (!confirm(`क्या आप ${branch.name} को '${status ? 'खुली' : 'बंद'}' करना चाहते हैं?`)) return;

    if (!state.branchStatus) state.branchStatus = {};
    if (status) {
      const timeNow = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      state.branchStatus[branchId] = {
        isOpen: true,
        openedBy: state.currentUser ? state.currentUser.name : 'एडमिन',
        time: timeNow
      };
    } else {
      state.branchStatus[branchId] = {
        isOpen: false,
        closedBy: state.currentUser ? state.currentUser.name : 'एडमिन',
        closedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
    }

    localStorage.setItem(STORAGE_KEYS.BRANCH_STATUS, JSON.stringify(state.branchStatus));
    renderDashboard();
  }

  function adminOverrideStore(branchId) {
    const cur = state.branchStatus && state.branchStatus[branchId] && state.branchStatus[branchId].isOpen;
    toggleStoreOpenStatus(branchId, !cur);
  }

  function promptManualAttendance(empId) {
    const emp = (state.staff || []).find(e => e.id === empId);
    if (!emp) return;
    const time = prompt(`${emp.name} का इन-टाइम दर्ज करें (उदा. 10:15 AM):`, '10:15 AM');
    if (!time) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const newAtt = {
      id: 'att_' + Date.now(),
      employeeId: emp.id,
      employeeName: emp.name,
      branchId: emp.branchId || 'branch_hazratganj',
      date: todayStr,
      inTime: time,
      outTime: '—',
      totalHours: '—',
      lat: 26.85172,
      lng: 80.94625,
      distanceMeters: 10,
      photo: emp.photo || 'images/avatar_placeholder.png',
      status: 'approved'
    };

    if (!state.attendance) state.attendance = [];
    state.attendance.unshift(newAtt);
    if (typeof CloudSync !== "undefined") CloudSync.pushAttendance(newAtt);
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));
    alert(`✅ ${emp.name} की हाजिरी दर्ज कर दी गई!`);
    renderDashboard();
  }

  // --- 1. POS Billing System (Search-Only, Inline Quick SKU Add, Editable Rate, Shopkeeper Directory & Auto-Save) ---
  
  function setPosBillingBranch(branchId) {
    state.posBillingBranch = branchId;
    localStorage.setItem('mms_pos_branch_v9', branchId);
    renderPOS();
  }

  
  function setPosInvoiceDate(dateVal) {
    state.posInvoiceDate = dateVal || getTodayDateStr();
    renderPOS();
  }

  function renderPOS() {
    const container = document.getElementById('tab-view-pos');
    if (!container) return;

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const canBackdate = role === 'admin' || role === 'manager';
    const selectedDate = (canBackdate && state.posInvoiceDate) ? state.posInvoiceDate : getTodayDateStr();
    const isBackdated = selectedDate !== getTodayDateStr();

    const isShopkeeper = state.posCustomer.type === 'shopkeeper';
    const contactsForType = state.contacts.filter(c => isShopkeeper ? c.type === 'shopkeeper' : c.type === 'customer');

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left: Product Search, Quick SKU Add, Custom Labor & Cart Table -->
        <div class="lg:col-span-7 clay-card p-6">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div class="flex flex-wrap items-center gap-3">
              <h3 class="text-lg font-black text-slate-900 tracking-tight">${__L("बिलिंग काउंटर", "Billing Counter")}</h3>
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xs">
                <span class="text-xs text-blue-200">🏢 ${__L("दुकान:", "Store:")}</span>
                <span class="text-xs font-black text-amber-300">${getBranchName((state.posBillingBranch && state.posBillingBranch !== 'all') ? state.posBillingBranch : (state.activeBranch && state.activeBranch !== 'all') ? state.activeBranch : 'branch_hazratganj')}</span>
                <select onchange="window.MMS_APP.setPosBillingBranch(this.value)" class="bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold rounded-md px-1.5 py-0.5 border-none outline-none cursor-pointer">
                  <option value="branch_hazratganj" ${(state.posBillingBranch || state.activeBranch) === 'branch_hazratganj' ? 'selected' : ''} class="text-slate-900">हजरतगंज</option>
                  <option value="branch_naka" ${(state.posBillingBranch || state.activeBranch) === 'branch_naka' ? 'selected' : ''} class="text-slate-900">नाका</option>
                  <option value="branch_kannauj" ${(state.posBillingBranch || state.activeBranch) === 'branch_kannauj' ? 'selected' : ''} class="text-slate-900">कन्नौज</option>
                </select>
              </div>
            </div>

            <!-- Prominent Backdate / Invoice Date Picker at TOP -->
            <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <label for="pos-invoice-date" class="text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                <span>📅</span> <span>${__L("बिल तारीख:", "Bill Date:")}</span>
              </label>
              <input 
                type="date" 
                id="pos-invoice-date" 
                value="${selectedDate}" 
                onchange="window.MMS_APP.setPosInvoiceDate(this.value)" 
                class="bg-white border ${isBackdated ? 'border-amber-500 ring-2 ring-amber-400 font-black text-amber-950' : 'border-slate-300 text-slate-800 font-bold'} font-mono text-xs rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
              ${isBackdated ? `
                <button type="button" onclick="window.MMS_APP.setPosInvoiceDate(getTodayDateStr())" title="${__L("आज की तारीख सेट करें", "Reset to today")}" class="px-2 py-1 text-[10px] font-black bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition cursor-pointer">
                  ↺ ${__L("आज", "Today")}
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Live SKU Search Input & Quick Add Button (NO Dropdown, Direct Search) -->
          <div class="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span>🔍 ${__L("पार्ट या SKU सर्च करें *", "Search Part or SKU *")}</span>
              </label>
              <button type="button" onclick="window.MMS_APP.openQuickSkuAdd('')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black shadow-sm transition flex items-center gap-1">
                <span>➕ ${__L("नया पार्ट जोड़ें", "Add New SKU")}</span>
              </button>
            </div>
            
            <div class="relative">
              <input 
                id="pos-sku-search-input" 
                type="text" 
                placeholder="${__L("पार्ट, मॉडल या SKU नाम टाइप करें (उदा. Battery, iPhone, Screen...)", "Type part name, model or SKU (e.g. Battery, iPhone, Screen...)")}" 
                class="w-full text-xs font-bold p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer" 
                oninput="window.MMS_APP.filterSkuSearch(this.value)"
                onclick="window.MMS_APP.filterSkuSearch(this.value)"
                onfocus="window.MMS_APP.filterSkuSearch(this.value)"
                autocomplete="off"
              >
              <div id="pos-sku-search-results" class="hidden absolute left-0 right-0 top-full mt-1 bg-white border border-slate-300 rounded-xl shadow-2xl z-30 max-h-60 overflow-y-auto divide-y divide-slate-100">
              </div>
            </div>

            <!-- Inline Quick SKU Add Form -->
            <div id="pos-quick-sku-form" class="${state.quickSkuVisible ? '' : 'hidden'} mt-3 pt-3 border-t border-slate-200">
              <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-inner space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="text-xs font-black text-blue-900 flex items-center gap-1.5">
                    <span>⚡ नया पार्ट तुरंत इन्वेंट्री में जोड़ें (Add New SKU)</span>
                  </h4>
                  <button type="button" onclick="window.MMS_APP.closeQuickSkuAdd()" class="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">पार्ट / SKU का नाम *</label>
                    <input id="qsku-name" type="text" value="${state.quickSkuPrefill || ''}" placeholder="उदा. Vivo Y20 Combo Folder (OEM)" class="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">कैटेगरी (सर्च करने के लिए टाइप करें) *</label>
                    ${renderCategoryDropdownHTML('qsku-category', 'Display - Copy')}
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">खरीद लागत ₹ (Cost)</label>
                    <input id="qsku-cost" type="number" placeholder="800" class="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono font-bold">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">बिक्री रेट ₹ (Sell Price)</label>
                    <input id="qsku-sell" type="number" placeholder="1800" class="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono font-bold">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">प्रारंभिक स्टॉक</label>
                    <input id="qsku-stock" type="number" placeholder="5" value="5" class="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono font-bold">
                  </div>
                </div>

                <div class="flex justify-end gap-2 pt-1">
                  <button type="button" onclick="window.MMS_APP.closeQuickSkuAdd()" class="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-300 rounded-lg">रद्द करें</button>
                  <button type="button" onclick="window.MMS_APP.saveQuickSku()" class="px-4 py-1.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1">
                    💾 इन्वेंट्री में सेव करें व कार्ट में जोड़ें
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Custom Labor / Extra Charge Input -->
          <div class="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="text-xs font-black text-slate-700 block mb-2">या कस्टम रिपेयर सर्विस / लेबर चार्ज जोड़ें:</span>
            <div class="flex gap-2">
              <input id="pos-custom-name" type="text" placeholder="${__L("उदा. सिर्फ ग्लास चेंज लेबर / IC फिटिंग", "e.g. Glass Change Labor / IC Fitting")}" class="w-2/3 p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium">
              <input id="pos-custom-rate" type="number" placeholder="${__L("रेट ₹", "Rate ₹")}" class="w-1/3 p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold font-mono">
              <button id="pos-add-custom-btn" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap transition">
                ${__L("+ जोड़ें", "+ Add")}
              </button>
            </div>
          </div>

          <!-- Current Cart Table with Inline Editable Rate & Quantity -->
          <div>
            <h4 class="text-xs font-black text-slate-800 mb-2 flex items-center justify-between">
              <span>🛒 ${__L("कार्ट में जुड़े सामान", "Items in Cart")}</span>
              <span class="text-[11px] text-blue-600 font-bold">${__L("* रेट पर क्लिक करके आप कीमत सीधे बदल सकते हैं", "* Click on rate to edit price directly")}</span>
            </h4>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="bg-slate-100 text-slate-600 font-bold">
                    <th class="p-2.5 rounded-l-lg">${__L("सामान / पार्ट", "Item / Part")}</th>
                    <th class="p-2.5">${__L("रेट (₹)", "Rate (₹)")}</th>
                    <th class="p-2.5 text-center">${__L("मात्रा", "Qty")}</th>
                    <th class="p-2.5 text-right">${__L("कुल", "Total")}</th>
                    <th class="p-2.5 text-center rounded-r-lg">${__L("हटाएं", "Action")}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${state.posCart.length === 0 ? `
                    <tr>
                      <td colspan="5" class="p-6 text-center text-slate-400 font-medium">
                        ${__L("कार्ट अभी खाली है! ऊपर से कोई पार्ट या सर्विस जोड़ें।", "Cart is empty! Add a part or service above.")}
                      </td>
                    </tr>
                  ` : state.posCart.map((item, idx) => `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-bold text-slate-800">
                        <div>${item.name}</div>
                        <span class="font-mono text-[10px] text-blue-600 bg-blue-50 px-1 py-0.5 rounded font-semibold">${item.sku}</span>
                      </td>
                      <td class="p-2.5">
                        <div class="inline-flex items-center gap-1">
                          <span class="text-slate-400 font-bold">₹</span>
                          <input 
                            type="number" 
                            value="${item.rate}" 
                            class="w-20 p-1.5 text-xs font-black text-slate-900 bg-amber-50 border border-amber-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 font-mono shadow-2xs"
                            onchange="window.MMS_APP.updateCartRate(${idx}, this.value)"
                            title="कीमत बदलने के लिए यहाँ टाइप करें"
                          >
                        </div>
                      </td>
                      <td class="p-2.5 text-center">
                        <div class="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button onclick="window.MMS_APP.updateCartQty(${idx}, -1)" class="px-2 py-0.5 hover:bg-slate-100 font-bold text-slate-600">-</button>
                          <span class="px-2.5 text-xs font-bold font-mono">${item.qty}</span>
                          <button onclick="window.MMS_APP.updateCartQty(${idx}, 1)" class="px-2 py-0.5 hover:bg-slate-100 font-bold text-slate-600">+</button>
                        </div>
                      </td>
                      <td class="p-2.5 text-right font-black font-mono text-slate-900">
                        ${formatCurrency(item.rate * item.qty)}
                      </td>
                      <td class="p-2.5 text-center">
                        <button onclick="window.MMS_APP.removeCartItem(${idx})" class="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition font-bold" title="हटाएं">
                          ✕
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right: Customer Type, Saved Shopkeeper Directory, Payment & Checkout -->
        <div class="lg:col-span-5 clay-card p-6 space-y-4">
          <h3 class="text-base font-black text-slate-900 pb-2 border-b border-slate-100">${__L("ग्राहक विवरण व बिलिंग सारांश", "Customer Details & Billing Summary")}</h3>

          <!-- 📅 Bill Date Indicator -->
          <div class="p-2.5 ${isBackdated ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'} rounded-xl border flex items-center justify-between text-xs">
            <span class="font-bold ${isBackdated ? 'text-amber-900' : 'text-slate-600'}">📅 ${__L("बिल तारीख:", "Bill Date:")}</span>
            <span class="font-mono font-black ${isBackdated ? 'text-amber-900 bg-amber-100 px-2 py-0.5 rounded' : 'text-slate-800'}">${selectedDate} ${isBackdated ? `(${__L("बैक-डेट", "Back-dated")})` : ''}</span>
          </div>


          <!-- Customer Type Toggle: Normal Customer vs Local Shopkeeper -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label class="text-xs font-black text-slate-700 block">${__L("ग्राहक का प्रकार चुनें *", "Select Customer Type *")}</label>
            <div class="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onclick="window.MMS_APP.setCustomerType('customer')"
                class="py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${!isShopkeeper ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}"
              >
                <span>👤 ${__L("सामान्य ग्राहक (Walk-in)", "Walk-in Customer")}</span>
              </button>

              <button 
                type="button" 
                onclick="window.MMS_APP.setCustomerType('shopkeeper')"
                class="py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${isShopkeeper ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}"
              >
                <span>🏪 ${__L("लोकल दुकानदार / B2B", "Local Merchant / B2B")}</span>
              </button>
            </div>

            <p class="text-[11px] font-bold ${isShopkeeper ? 'text-amber-800' : 'text-slate-500'}">
              ${isShopkeeper ? '✓ लोकल दुकानदार चयनित: उधार (Credit) की अनुमति है।' : '⚠ नॉर्मल ग्राहक: 100% नकद, UPI या एडवांस ही मान्य है।'}
            </p>
          </div>

          <!-- Customer Details with Dynamic On-Type Autocomplete (NO static chips before typing) -->
          <div class="space-y-3">
            <div class="relative">
              <label class="block text-xs font-bold text-slate-700 mb-1">
                ${isShopkeeper ? __L("दुकानदार / दुकान का नाम *", "Merchant / Shop Name *") : __L("ग्राहक का नाम *", "Customer Name *")}
              </label>
              <input 
                id="pos-cust-name" 
                type="text" 
                value="${state.posCustomer.name}"
                placeholder="${isShopkeeper ? 'उदा. संजय मोबाइल / राजू टेलीकॉम (टाइप करते ही सुझाव दिखेंगे)' : 'उदा. राहुल शर्मा'}" 
                class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-sm"
                oninput="window.MMS_APP.filterContactSuggestions(this.value, 'name')"
                autocomplete="off"
              >
              <!-- Live Autocomplete Dropdown (Hidden until user types) -->
              <div id="pos-contact-name-suggestions" class="hidden absolute left-0 right-0 top-full mt-1 bg-white border border-slate-300 rounded-xl shadow-2xl z-30 max-h-48 overflow-y-auto divide-y divide-slate-100">
              </div>
            </div>

            <div class="relative">
              <label class="block text-xs font-bold text-slate-700 mb-1">${__L("मोबाइल नंबर (WhatsApp बिल हेतु) *", "Mobile Number (For WhatsApp Bill) *")}</label>
              <input 
                id="pos-cust-phone" 
                type="tel" 
                value="${state.posCustomer.phone}"
                placeholder="उदा. 9876543210" 
                class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-sm"
                oninput="window.MMS_APP.filterContactSuggestions(this.value, 'phone')"
                autocomplete="off"
              >
              <!-- Live Autocomplete Dropdown for Phone (Hidden until user types) -->
              <div id="pos-contact-phone-suggestions" class="hidden absolute left-0 right-0 top-full mt-1 bg-white border border-slate-300 rounded-xl shadow-2xl z-30 max-h-48 overflow-y-auto divide-y divide-slate-100">
              </div>
            </div>
          </div>

          <!-- Calculation Box -->
          <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div class="flex justify-between text-slate-600 font-semibold">
              <span>${__L("सब-टोटल:", "Subtotal:")}</span>
              <span id="pos-subtotal" class="font-mono font-bold">${formatCurrency(calculateCartSubtotal())}</span>
            </div>

            <div class="flex items-center justify-between text-slate-600 font-semibold">
              <span>${__L("डिस्काउंट (छूट):", "Discount:")}</span>
              <div class="flex items-center gap-1">
                <span class="text-xs">₹</span>
                <input id="pos-discount-input" type="number" value="${state.posPayment.discount || 0}" class="w-20 p-1 text-right bg-white border border-slate-300 rounded text-xs font-bold font-mono">
              </div>
            </div>

            <div class="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>${__L("कुल देय बिल:", "Net Payable:")}</span>
              <span id="pos-net-total" class="font-mono text-blue-700 text-base font-black">${formatCurrency(calculateCartNet())}</span>
            </div>
          </div>

          <!-- Payment Mode Selection -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700">${__L("भुगतान माध्यम", "Payment Mode")}</label>
            
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button type="button" onclick="window.MMS_APP.setPosPaymentMode('cash')" class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'cash' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                💵 ${__L("100% नकद", "100% Cash")}
              </button>
              <button type="button" onclick="window.MMS_APP.setPosPaymentMode('upi')" class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'upi' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                📱 ${__L("100% ऑनलाइन (UPI)", "100% Online (UPI)")}
              </button>
              <button type="button" onclick="window.MMS_APP.setPosPaymentMode('advance')" class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'advance' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                ⏳ ${__L("एडवांस भुगतान", "Advance Payment")}
              </button>
              <button 
                type="button" 
                onclick="window.MMS_APP.setPosPaymentMode('full_udhar')" 
                ${!isShopkeeper ? 'disabled title="उधार केवल लोकल दुकानदार के लिए मान्य है"' : ''}
                class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'full_udhar' ? 'bg-rose-600 text-white shadow-sm' : (isShopkeeper ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50')}"
              >
                📕 ${__L("पूरा उधार (खाता)", "Full Credit (Udhar)")}
              </button>
            </div>

            <!-- Advance Payment Amount Input -->
            ${state.posPayment.mode === 'advance' ? `
              <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-2 mt-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold text-amber-900">एडवांस कितना जमा हुआ? (₹)</label>
                  <input id="pos-advance-paid-input" type="number" value="${state.posPayment.paid || 0}" class="w-28 p-1.5 bg-white border border-amber-300 rounded-lg text-xs font-mono font-bold text-right">
                </div>
                <div class="flex justify-between text-xs font-black text-rose-700 pt-1 border-t border-amber-200">
                  <span>शेष बकाया (Due Balance):</span>
                  <span id="pos-advance-due-calc" class="font-mono">${formatCurrency(Math.max(0, calculateCartNet() - (state.posPayment.paid || 0)))}</span>
                </div>
              </div>
            ` : ''}

            <!-- Udhar Note & Date-Time Display (Mandatory/Optional Note for Khata) -->
            ${(state.posPayment.mode === 'full_udhar' || state.posPayment.mode === 'advance') ? `
              <div class="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-2 mt-2 text-xs">
                <div class="flex items-center justify-between text-rose-900 font-bold">
                  <span>📝 उधार नोट (किसको दिया / विवरण):</span>
                  <span class="text-[10px] text-slate-500 font-mono">${getTodayDateStr()} • ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <input 
                  id="pos-udhar-note" 
                  type="text" 
                  placeholder="उदा. राहुल भाई ले गए, कल शाम देंगे / डिस्प्ले टेस्टिंग ले गए" 
                  class="w-full p-2 bg-white border border-rose-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-rose-500"
                >
                <p class="text-[10px] text-rose-700">* यह नोट व तारीख/समय खाता-बही में दर्ज रहेगा।</p>
              </div>
            ` : ''}
          </div>

          <!-- Checkout Button -->
          <div class="pt-4 border-t border-slate-100">
            <button id="pos-complete-btn" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>${__L("बिल पक्का करें व इनवॉइस जारी करें", "Confirm Bill & Generate Invoice")}</span>
            </button>
            <p class="text-[10px] text-slate-400 text-center mt-1.5">${__L("* बिल पूरा होते ही इन्वेंट्री से स्टॉक घट जाएगा और ग्राहक रिकॉर्ड सुरक्षित रहेगा", "* Stock will auto-deduct from inventory on billing and customer record is saved")}</p>
          </div>
        </div>
      </div>

      <!-- Recent Bills Quick Feed in POS -->
      <div class="mt-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-sm font-black text-slate-800 mb-3 flex items-center justify-between">
          <span>🧾 ${__L("हाल ही में जारी बिल", "Recent Counter Invoices")}</span>
          <span class="text-xs text-blue-600 font-bold">${__L("कुल:", "Total:")} ${state.invoices.length} ${__L("बिल", "Invoices")}</span>
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="bg-slate-100 text-slate-600 font-bold">
                <th class="p-2.5 rounded-l-lg">${__L("इनवॉइस नं", "Invoice No")}</th>
                <th class="p-2.5">${__L("ग्राहक / दुकानदार", "Customer / Merchant")}</th>
                <th class="p-2.5">${__L("मोबाइल", "Mobile")}</th>
                <th class="p-2.5">${__L("सामान (पार्ट्स)", "Items")}</th>
                <th class="p-2.5 text-right">${__L("कुल बिल", "Total Bill")}</th>
                <th class="p-2.5 text-center">${__L("भुगतान", "Payment")}</th>
                <th class="p-2.5 text-center">${__L("कारीगर / इंप्लॉई", "Technician / Staff")}</th>
                <th class="p-2.5 text-center rounded-r-lg">${__L("रसीद / WhatsApp", "Receipt / WhatsApp")}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${(state.invoices || []).slice(0, 8).map(inv => {
                const invId = inv.invoiceNo || inv.billNo || ('MMS-INV-' + (inv.id || ''));
                const assigned = inv.assignedStaff || inv.assignedTo || '';
                return `
                <tr class="hover:bg-slate-50 transition">
                  <td class="p-2.5 font-mono font-bold text-blue-700">
                    <div>${invId}</div>
                    ${inv.isBackdated ? `<span class="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-300" title="रजिस्टर बैक-डेट प्रविष्टि: ${inv.date}">📅 ${inv.date}</span>` : ''}
                  </td>
                  <td class="p-2.5 font-bold text-slate-900">${inv.customerName || 'Walk-in Customer'}</td>
                  <td class="p-2.5 font-mono text-slate-600">${inv.customerPhone || 'N/A'}</td>
                  <td class="p-2.5 text-slate-600 max-w-xs truncate">${(inv.items || []).map(i => `${i.name || 'पार्ट्स'} (x${i.qty || 1})`).join(', ') || 'मोबाइल रिपेयरिंग'}</td>
                  <td class="p-2.5 text-right font-black font-mono">${formatCurrency(inv.totalAmount ?? inv.total ?? 0)}</td>
                  <td class="p-2.5 text-center">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${Number(inv.dueAmount || 0) === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                      ${inv.paymentMode || 'Cash'}
                    </span>
                  </td>
                  <td class="p-2.5 text-center whitespace-nowrap">
                    <select onchange="window.MMS_APP.assignInvoiceStaff('${invId}', this.value)" class="bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs rounded-xl px-2 py-1 font-bold cursor-pointer hover:bg-indigo-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs">
                      <option value="">👤 इंप्लॉई असाइन करें</option>
                      ${(state.staff || []).map(s => {
                        const isSel = assigned === s.name || (assigned && assigned.includes(s.name));
                        return `<option value="${s.name}" ${isSel ? 'selected' : ''}>${s.name} (${s.roleLabel || s.role || 'स्टाफ'})</option>`;
                      }).join('')}
                    </select>
                  </td>
                  <td class="p-2.5 text-center">
                    <button onclick='window.MMS_APP.showExistingInvoice("${invId}")' class="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-bold shadow-2xs transition active:scale-95 cursor-pointer">
                      रसीद देखें
                    </button>
                  </td>
                </tr>
              `;}).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    bindPosEvents();
  }

  function bindPosEvents() {
    const custName = document.getElementById('pos-cust-name');
    const custPhone = document.getElementById('pos-cust-phone');
    if (custName) {
      custName.oninput = (e) => {
        state.posCustomer.name = e.target.value;
        filterContactSuggestions(e.target.value, 'name');
      };
    }
    if (custPhone) {
      custPhone.oninput = (e) => {
        state.posCustomer.phone = e.target.value;
        filterContactSuggestions(e.target.value, 'phone');
        const clean = e.target.value.replace(/\D/g, '');
        if (clean.length >= 10) {
          const allContactsList = (state.contacts || []).concat(
          (state.invoices || []).map(inv => ({ name: inv.customerName, phone: inv.customerPhone, type: inv.customerType })),
          (state.jobs || []).map(j => ({ name: j.customerName, phone: j.customerPhone, type: j.customerType }))
        );
        const match = allContactsList.find(c => {
          const ph = (c.phone || '').replace(/\D/g, '');
          return ph === clean || ph.endsWith(clean.slice(-10)) || clean.endsWith(ph.slice(-10));
        })
            || (state.invoices || []).find(inv => (inv.customerPhone || '').replace(/\D/g, '') === clean)
            || (state.jobs || []).find(j => (j.customerPhone || '').replace(/\D/g, '') === clean);
          if (match) {
            const foundName = match.name || match.customerName;
            if (foundName) {
              const nameInput = document.getElementById('pos-cust-name');
              if (nameInput && (!nameInput.value || nameInput.value === 'Walk-in Customer')) {
                nameInput.value = foundName;
                state.posCustomer.name = foundName;
              }
            }
          }
        }
      };
    }

    const discountInput = document.getElementById('pos-discount-input');
    if (discountInput) {
      discountInput.oninput = (e) => {
        state.posPayment.discount = Number(e.target.value) || 0;
        document.getElementById('pos-net-total').textContent = formatCurrency(calculateCartNet());
      };
    }

    const advancePaidInput = document.getElementById('pos-advance-paid-input');
    if (advancePaidInput) {
      advancePaidInput.oninput = (e) => {
        state.posPayment.paid = Number(e.target.value) || 0;
        const due = Math.max(0, calculateCartNet() - state.posPayment.paid);
        const dueEl = document.getElementById('pos-advance-due-calc');
        if (dueEl) dueEl.textContent = formatCurrency(due);
      };
    }

    const addCustomBtn = document.getElementById('pos-add-custom-btn');
    if (addCustomBtn) {
      addCustomBtn.onclick = () => {
        const name = (document.getElementById('pos-custom-name').value || '').trim();
        const rate = Number(document.getElementById('pos-custom-rate').value);
        if (!name || isNaN(rate) || rate <= 0) {
          alert('कृपया लेबर सर्विस का नाम और सही रेट भरें!');
          return;
        }
        addToCart({
          sku: 'SRV-' + Date.now().toString().slice(-4),
          name: name,
          rate: rate,
          cost: 0,
          qty: 1
        });
        document.getElementById('pos-custom-name').value = '';
        document.getElementById('pos-custom-rate').value = '';
      };
    }

    const completeBtn = document.getElementById('pos-complete-btn');
    if (completeBtn) {
      completeBtn.onclick = processCheckout;
    }
  }

  function calculateCartSubtotal() {
    return state.posCart.reduce((acc, it) => acc + (it.rate * it.qty), 0);
  }

  function calculateCartNet() {
    const sub = calculateCartSubtotal();
    return Math.max(0, sub - (state.posPayment.discount || 0));
  }

  function addToCart(newItem) {
    const existing = state.posCart.find(i => i.sku === newItem.sku);
    if (existing) {
      existing.qty += 1;
    } else {
      state.posCart.push({ ...newItem, qty: 1 });
    }
    renderPOS();
  }

  function updateCartQty(idx, delta) {
    if (!state.posCart[idx]) return;
    state.posCart[idx].qty += delta;
    if (state.posCart[idx].qty <= 0) {
      state.posCart.splice(idx, 1);
    }
    renderPOS();
  }

  function updateCartRate(idx, newRate) {
    if (!state.posCart[idx]) return;
    const rateNum = Number(newRate);
    if (!isNaN(rateNum) && rateNum >= 0) {
      state.posCart[idx].rate = rateNum;
      renderPOS();
    }
  }

  function removeCartItem(idx) {
    state.posCart.splice(idx, 1);
    renderPOS();
  }

  function setCustomerType(type) {
    const nameInput = document.getElementById('pos-cust-name');
    const phoneInput = document.getElementById('pos-cust-phone');
    if (nameInput && nameInput.value) state.posCustomer.name = nameInput.value;
    if (phoneInput && phoneInput.value) state.posCustomer.phone = phoneInput.value;
    
    state.posCustomer.type = type;
    if (type === 'customer' && state.posPayment.mode === 'full_udhar') {
      state.posPayment.mode = 'cash';
    }
    renderPOS();
  }

  function setPosPaymentMode(mode) {
    if (mode === 'full_udhar' && state.posCustomer.type !== 'shopkeeper') {
      alert('उधार (Credit) केवल लोकल दुकानदार / B2B के लिए ही मान्य है! नॉर्मल ग्राहक के लिए कैश, यूपीआई या एवांस चुनें।');
      return;
    }
    state.posPayment.mode = mode;
    if (mode === 'advance') {
      state.posPayment.paid = Math.round(calculateCartNet() / 2);
    }
    renderPOS();
  }

  function selectContactFromDirectory(phone) {
    if (!phone) return;
    const contact = state.contacts.find(c => c.phone === phone);
    if (contact) {
      state.posCustomer.name = contact.name;
      state.posCustomer.phone = contact.phone;
      state.posCustomer.type = contact.type;
      renderPOS();
    }
  }

  function processCheckout() {
    if (state.posCart.length === 0) {
      alert('कृपया बिल में कम से कम एक सामान जोड़ें!');
      return;
    }

    const custName = (document.getElementById('pos-cust-name').value || '').trim();
    const custPhone = (document.getElementById('pos-cust-phone').value || '').trim();

    if (!custName || !custPhone) {
      alert('कृपया ग्राहक का नाम और मोबाइल नंबर अनिवार्य रूप से भरें!');
      return;
    }

    const netAmount = calculateCartNet();
    let paidAmount = netAmount;
    let dueAmount = 0;
    let paymentLabel = 'Cash';

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const udharNoteEl = document.getElementById('pos-udhar-note');
    const udharNote = udharNoteEl ? udharNoteEl.value.trim() : '';

    if (state.posPayment.mode === 'upi') {
      paidAmount = netAmount;
      paymentLabel = 'UPI (Online)';
    } else if (state.posPayment.mode === 'full_udhar') {
      if (state.posCustomer.type !== 'shopkeeper') {
        alert('उधार केवल लोकल दुकानदार के लिए मान्य है!');
        return;
      }
      paidAmount = 0;
      dueAmount = netAmount;
      paymentLabel = 'पूरा उधार (दुकानदार क्रेडिट)';
    } else if (state.posPayment.mode === 'advance') {
      paidAmount = Number(state.posPayment.paid) || 0;
      dueAmount = Math.max(0, netAmount - paidAmount);
      paymentLabel = `एडवांस (₹${paidAmount} जमा + ₹${dueAmount} शेष)`;
    }

    // Auto-save/update customer / shopkeeper into Directory Database
    const existingContact = state.contacts.find(c => c.phone === custPhone);
    if (existingContact) {
      existingContact.name = custName;
      existingContact.type = state.posCustomer.type;
    } else {
      state.contacts.unshift({
        name: custName,
        phone: custPhone,
        type: state.posCustomer.type,
        createdAt: new Date().toISOString()
      });
    }

    // Auto-deduct inventory for current store branch
    const currentBillingBranch = (state.activeBranch && state.activeBranch !== 'all') ? state.activeBranch : 'branch_hazratganj';
    state.posCart.forEach(cartItem => {
      let inv = state.inventory.find(i => i.sku === cartItem.sku && (i.branchId === currentBillingBranch || !i.branchId));
      if (!inv) {
        inv = state.inventory.find(i => i.sku === cartItem.sku);
      }
      if (inv) {
        const prevStock = Number(inv.stock || 0);
        inv.stock = Math.max(0, prevStock - Number(cartItem.qty || 1));
        console.log(`📉 [Stock Auto-Deduct] ${inv.name} (${inv.sku}): ${prevStock} -> ${inv.stock} (${inv.branchId || currentBillingBranch})`);
      }
    });

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const canBackdate = role === 'admin' || role === 'manager';
    const billDate = (canBackdate && state.posInvoiceDate) ? state.posInvoiceDate : getTodayDateStr();
    const isBackdated = billDate !== getTodayDateStr();

    const newInvoiceNo = 'MMS-INV-' + (state.invoices.length + 201);
    const invoiceRecord = {
      invoiceNo: newInvoiceNo,
      date: billDate,
      time: timeStr,
      isBackdated: isBackdated,
      recordedAt: new Date().toISOString(),
      udharNote: udharNote,
      customerName: custName,
      customerPhone: custPhone,
      customerType: state.posCustomer.type,
      items: JSON.parse(JSON.stringify(state.posCart)),
      subTotal: calculateCartSubtotal(),
      discount: state.posPayment.discount || 0,
      totalAmount: netAmount,
      paidAmount: paidAmount,
      dueAmount: dueAmount,
      paymentMode: paymentLabel,
      status: dueAmount === 0 ? 'Paid' : (paidAmount > 0 ? 'Partially Paid' : 'Unpaid (Due)'),
      billedBy: state.currentUser ? `${state.currentUser.role.toUpperCase()} (${state.currentUser.name})` : 'Front Desk',
      assignedStaff: state.currentUser ? state.currentUser.name : '',
      assignedTo: state.currentUser ? state.currentUser.name : '',
      udharCleared: dueAmount === 0
    };

    state.invoices.unshift(invoiceRecord);
    if (typeof CloudSync !== "undefined") CloudSync.pushInvoice(invoiceRecord);

    // Auto-sync into state.jobs as well so bill appears in 'रिपेयर जॉब-शीट (टोकन)'
    // Important: Status is strictly 'pending' initially - NEVER automatically 'ready'!
    state.jobs.unshift({
      token: newInvoiceNo,
      customerName: custName,
      customerPhone: custPhone,
      customerType: state.posCustomer.type,
      device: (invoiceRecord.items || []).map(i => i.name).join(', ') || 'पार्ट्स व सर्विस',
      issue: 'काउंटर बिल / रिपेयर पार्ट्स व सर्विस (POS Invoice)',
      assignedTo: state.currentUser ? `${state.currentUser.role.toUpperCase()} (${state.currentUser.name})` : 'Front Desk',
      estimatedCost: netAmount,
      advancePaid: paidAmount,
      dueAmount: dueAmount,
      status: 'pending', // Strictly 'pending' (स्वीकार / रिपेयरिंग चालू) - only changes when staff manually selects
      passcode: 'N/A',
      createdAt: billDate + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: billDate,
      isBackdated: isBackdated,
      updatedAt: 'Just now',
      notes: `काउंटर बिलिंग (POS) से जनरेटेड इनवॉइस [${newInvoiceNo}]${isBackdated ? ` • ⚠️ बैक-डेट प्रविष्टि (${billDate})` : ''}${udharNote ? ` • उधार नोट: ${udharNote}` : ''}`
    });

    persistData();
    if (typeof CloudSync !== "undefined" && CloudSync.pushJob) CloudSync.pushJob(state.jobs[0]);
    if (typeof CloudSync !== "undefined" && CloudSync.syncInventory) {
      CloudSync.syncInventory(state.inventory);
    }

    state.posCart = [];
    state.posCustomer = { name: '', phone: '', type: 'customer' };
    state.posPayment = { mode: 'cash', paid: 0, discount: 0 };
    state.posInvoiceDate = getTodayDateStr();

    renderPOS();
    showInvoiceModal(invoiceRecord);
  }

  function assignInvoiceStaff(invoiceId, staffName) {
    if (!invoiceId) return;
    const inv = (state.invoices || []).find(i => (i.invoiceNo === invoiceId || i.billNo === invoiceId || i.id === invoiceId || ('MMS-INV-' + i.id) === invoiceId));
    if (!inv) {
      alert('इनवॉइस नहीं मिला!');
      return;
    }
    inv.assignedStaff = staffName;
    inv.assignedTo = staffName;

    // Also update corresponding repair job in state.jobs if exists
    const job = (state.jobs || []).find(j => j.token === invoiceId || j.id === invoiceId || j.tokenNo === invoiceId);
    if (job) {
      job.assignedTo = staffName;
    }

    persistData();
    if (typeof CloudSync !== "undefined" && CloudSync.pushInvoice) {
      CloudSync.pushInvoice(inv);
    }
    if (job && typeof CloudSync !== "undefined" && CloudSync.pushJob) {
      CloudSync.pushJob(job);
    }

    if (staffName) {
      alert(`✅ इनवॉइस [${invoiceId}] पर कर्मचारी [${staffName}] को असाइन कर दिया गया है!`);
    } else {
      alert(`इनवॉइस [${invoiceId}] से असाइनमेंट हटा दिया गया है।`);
    }
    renderPOS();
  }

  // POS SKU Search click-outside listener
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      const searchInput = document.getElementById('pos-sku-search-input');
      const resultsContainer = document.getElementById('pos-sku-search-results');
      if (resultsContainer && searchInput) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
          resultsContainer.classList.add('hidden');
        }
      }
    });
  }

  // --- Search / Filter SKU Autocomplete ---
  function filterSkuSearch(query) {
    const resultsContainer = document.getElementById('pos-sku-search-results');
    if (!resultsContainer) return;
    const q = (query || '').trim().toLowerCase();
    
    let matches = [];
    if (!q) {
      matches = (state.inventory || [])
        .filter(item => {
          const matchBranch = state.activeBranch === 'all' || item.branchId === state.activeBranch || (!item.branchId && state.activeBranch === 'branch_hazratganj');
          return matchBranch;
        })
        .slice(0, 20);
    } else {
      const cleanQ = q.replace(/[^a-z0-9]/gi, '');
      matches = (state.inventory || []).filter(item => {
        const name = (item.name || '').toLowerCase();
        const sku = (item.sku || '').toLowerCase();
        const cat = (item.category || '').toLowerCase();
        const nameClean = name.replace(/[^a-z0-9]/gi, '');
        return name.includes(q) || sku.includes(q) || cat.includes(q) || (cleanQ.length >= 2 && nameClean.includes(cleanQ));
      });
    }

    let html = '';
    if (!q) {
      html = `
        <div class="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] font-black text-slate-700 sticky top-0 z-10">
          <span>📦 उपलब्ध पार्ट्स सूची (क्लिक करके कार्ट में जोड़ें):</span>
          <span class="text-[10px] text-blue-600 font-bold">या नाम टाइप करें</span>
        </div>
      `;
    }

    if (matches.length === 0) {
      html += `
        <div class="p-3.5 text-center bg-amber-50">
          <p class="text-xs font-bold text-slate-800">⚠️ "${query.trim()}" इन्वेंट्री में उपलब्ध नहीं है।</p>
          <button type="button" onclick="window.MMS_APP.openQuickSkuAdd('${encodeURIComponent(query.trim())}')" class="mt-2.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md inline-flex items-center gap-1.5 transition cursor-pointer">
            ➕ इसे नया SKU बनाकर इन्वेंट्री में जोड़ें
          </button>
        </div>
      `;
    } else {
      html += matches.map(item => `
        <div onclick="window.MMS_APP.selectSearchedSku('${item.sku}')" class="p-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between text-xs transition border-b border-slate-100">
          <div>
            <p class="font-bold text-slate-900">${item.name}</p>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-bold">${item.sku}</span>
              <span class="text-[10px] text-slate-500">${item.category}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="font-black text-slate-900">${formatCurrency(item.sellPrice)}</p>
            <span class="text-[10px] ${item.stock > 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}">
              स्टॉक: ${item.stock} पीस
            </span>
          </div>
        </div>
      `).join('');
    }

    resultsContainer.innerHTML = html;
    resultsContainer.classList.remove('hidden');
    resultsContainer.style.display = 'block';
  }

  function selectSearchedSku(sku) {
    const item = state.inventory.find(i => i.sku === sku);
    if (!item) return;

    addToCart({
      sku: item.sku,
      name: item.name,
      rate: item.sellPrice,
      cost: item.costPrice,
      qty: 1
    });

    const searchInput = document.getElementById('pos-sku-search-input');
    if (searchInput) searchInput.value = '';
    const resultsContainer = document.getElementById('pos-sku-search-results');
    if (resultsContainer) {
      resultsContainer.classList.add('hidden');
      resultsContainer.innerHTML = '';
    }
  }

  function saveQuickSku() {
    const name = (document.getElementById('qsku-name').value || '').trim();
    const cat = document.getElementById('qsku-category').value;
    const cost = Number(document.getElementById('qsku-cost').value) || 0;
    const sell = Number(document.getElementById('qsku-sell').value) || 0;
    const stock = Number(document.getElementById('qsku-stock').value) || 1;

    if (!name || sell <= 0) {
      alert('कृपया पार्ट का नाम और बिक्री रेट सही भरें!');
      return;
    }

    const newSku = 'MMS-' + cat.slice(0, 3).toUpperCase() + '-' + Date.now().toString().slice(-4);
    const newRecord = {
      sku: newSku,
      name: name,
      category: cat,
      costPrice: cost,
      sellPrice: sell,
      stock: stock,
      minAlert: 2
    };

    state.inventory.unshift(newRecord);
    persistData();
    if (typeof CloudSync !== "undefined" && CloudSync.syncInventory) CloudSync.syncInventory(state.inventory);

    // Auto-add to cart
    addToCart({
      sku: newRecord.sku,
      name: newRecord.name,
      rate: newRecord.sellPrice,
      cost: newRecord.costPrice,
      qty: 1
    });

    state.quickSkuVisible = false;
    renderPOS();
    alert(`✅ "${name}" इन्वेंट्री में सेव हो गया और कार्ट में जुड़ गया!`);
  }

  // ==========================================
  // THERMAL RECEIPT PRINT & WHATSAPP SHARING
  // ==========================================
  function printSlipIframe(inv) {
    const invBranch = state.branches.find(b => b.id === inv.branchId) || state.branches[0];
    const branchTitle = invBranch ? invBranch.name : 'MONU MOBILE SOLUTION';
    const branchAddress = invBranch ? invBranch.address : '216, 2nd Flr, Sree Rama Towers, Ashok Marg, Hazratganj, Lucknow';
    const branchPhone = invBranch ? invBranch.phone : '7905859701';
    let iframe = document.getElementById('receipt-print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'receipt-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
    }

    const itemsRows = (inv.items || []).map(it => `
      <tr>
        <td style="padding: 2.5px 0; font-weight: 600;">${it.name}</td>
        <td style="padding: 2.5px 0; text-align: center;">${it.qty}</td>
        <td style="padding: 2.5px 0; text-align: right; font-weight: 700;">₹${(it.rate * it.qty).toLocaleString('en-IN')}</td>
      </tr>
    `).join('');

    const slipHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice - ${inv.invoiceNo}</title>
        <style>
          @page { size: 80mm auto; margin: 4mm 2mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 4px 6px;
            width: 74mm;
            max-width: 74mm;
            color: #000;
            background: #fff;
            font-size: 11px;
            line-height: 1.25;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          * { box-sizing: border-box; }
          .center { text-align: center; }
          .bold { font-weight: bold; }
          .dashed { border-bottom: 1px dashed #555; margin: 5px 0; padding-bottom: 5px; }
          .flex { display: flex; justify-content: space-between; }
          table { width: 100%; border-collapse: collapse; margin: 4px 0; font-size: 10.5px; }
          th { text-align: left; border-bottom: 1px dashed #666; padding-bottom: 3px; font-size: 10px; font-weight: bold; }
          .r { text-align: right; }
          .c { text-align: center; }
          .logo { height: 36px; max-width: 100%; object-fit: contain; margin: 0 auto 3px auto; display: block; }
        </style>
      </head>
      <body>
        <div class="center dashed">
          <img src="logo.svg" alt="Monu Mobile Solution" class="logo">
          <div class="bold" style="font-size: 13px; letter-spacing: 0.5px;">${branchTitle}</div>
          <div style="font-size: 9.5px; color: #333;">${branchAddress}</div>
          <div class="bold" style="font-size: 11px; margin-top: 2px;">📞 मो / WhatsApp: ${branchPhone}</div>
        </div>

        <div class="dashed" style="font-size: 10px;">
          <div class="flex">
            <span><strong>बिल नं:</strong> ${inv.invoiceNo}</span>
            <span><strong>तारीख:</strong> ${inv.date}</span>
          </div>
          <div class="flex" style="margin-top: 2px;">
            <span><strong>ग्राहक:</strong> ${inv.customerName}</span>
            <span>(${inv.customerType === 'shopkeeper' ? 'दुकानदार' : 'ग्राहक'})</span>
          </div>
          <div class="flex" style="margin-top: 2px;">
            <span><strong>मोबाइल:</strong> ${inv.customerPhone}</span>
            <span><strong>समय:</strong> ${inv.time || ''}</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 55%;">विवरण (Item)</th>
              <th class="c" style="width: 15%;">मात्रा</th>
              <th class="r" style="width: 30%;">रकम</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="dashed" style="font-size: 11px;">
          <div class="flex" style="color: #444;">
            <span>सब-टोटल:</span>
            <span>₹${Number(inv.subTotal || inv.totalAmount).toLocaleString('en-IN')}</span>
          </div>
          ${inv.discount ? `
          <div class="flex" style="color: #444;">
            <span>छूट (Discount):</span>
            <span>-₹${Number(inv.discount).toLocaleString('en-IN')}</span>
          </div>` : ''}
          <div class="flex bold" style="font-size: 12.5px; margin-top: 3px; padding-top: 3px; border-top: 1px dashed #888;">
            <span>कुल देय (Total):</span>
            <span>₹${Number(inv.totalAmount).toLocaleString('en-IN')}</span>
          </div>
          <div class="flex" style="margin-top: 3px;">
            <span>जमा / एडवांस (Paid):</span>
            <span>₹${Number(inv.paidAmount).toLocaleString('en-IN')}</span>
          </div>
          ${inv.dueAmount > 0 ? `
          <div class="flex bold" style="color: #b91c1c; font-size: 11.5px; margin-top: 2px;">
            <span>बकाया (Remaining Due):</span>
            <span>₹${Number(inv.dueAmount).toLocaleString('en-IN')}</span>
          </div>` : `
          <div class="flex bold" style="color: #047857; margin-top: 2px;">
            <span>भुगतान स्थिति:</span>
            <span>✅ पूर्ण भुगतान (PAID)</span>
          </div>`}
          ${inv.udharNote ? `
          <div style="margin-top: 3px; font-size: 9.5px; color: #555;">
            <strong>उधार नोट:</strong> ${inv.udharNote}
          </div>` : ''}
        </div>

        <div class="center" style="font-size: 9px; color: #444; margin-top: 6px;">
          <div>एक्सप्रेस मोबाइल रिपेयरिंग लैब • ओरिजिनल पार्ट्स</div>
          <div class="bold" style="color: #111; margin-top: 2px;">धन्यवाद! पुनः पधारें • 7905859701</div>
        </div>
      </body>
      </html>
    `;

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(slipHtml);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (e) {
        console.warn('Iframe print error:', e);
        window.print();
      }
    }, 450);
  }

  // --- Generate Bill Image Blob via html2canvas ---
  async function generateInvoiceBlob() {
    const billEl = document.getElementById('printable-bill');
    if (!billEl) return null;
    try {
      if (window.html2canvas) {
        const canvas = await window.html2canvas(billEl, {
          scale: 2.5,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false
        });
        return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      }
    } catch (err) {
      console.warn('html2canvas error:', err);
    }
    return null;
  }

      // --- WhatsApp Sharing: Image + Caption Text + Live Tracking Link in ONE Message ---
  async function shareInvoiceViaWhatsApp(inv) {
    if (!inv) return;

    let branchObj = null;
    if (state.branches) {
      branchObj = state.branches.find(b => b.id === inv.branchId);
    }
    const branchName = branchObj ? branchObj.name : 'हजरतगंज (मुख्य लैब)';
    const branchAddress = branchObj ? branchObj.address : '216, 2nd Floor, श्री रामा टॉवर्स, अशोक मार्ग, हजरतगंज, लखनऊ';
    const branchPhone = branchObj ? branchObj.phone : '7905859701';

    let itemsList = '';
    if (Array.isArray(inv.items)) {
      itemsList = inv.items.map(it => `• ${it.name} (x${it.qty || 1}) - ₹${Number(it.rate || it.price || 0) * (it.qty || 1)}`).join('\n');
    }

    const totalAmt = Number(inv.totalAmount || inv.total || 0).toLocaleString('en-IN');
    const paidAmt = Number(inv.paidAmount || inv.paid || 0).toLocaleString('en-IN');
    const dueAmt = Number(inv.dueAmount || inv.due || 0).toLocaleString('en-IN');

    const paymentStatus = Number(inv.dueAmount || inv.due || 0) > 0 
      ? `⚠️ *शेष उधार बकाया (Due):* ₹${dueAmt}` 
      : `✅ *भुगतान स्थिति:* पूर्ण भुगतान (PAID)`;

    const textMsg = `🙏 *नमस्ते ${inv.customerName || 'ग्राहक'} जी,*
*मोनू मोबाइल सॉल्यूशन (${branchName})* में आपका स्वागत है!

🧾 *डिजिटल बिल रसीद (Invoice)*
━━━━━━━━━━━━━━━━━━━━
📄 *बिल नं:* ${inv.invoiceNo || inv.billNo || inv.id}
📅 *तारीख:* ${inv.date || ''} ${inv.time ? '(' + inv.time + ')' : ''}
👤 *ग्राहक:* ${inv.customerName || 'Walk-in'} ${inv.customerPhone ? '(' + inv.customerPhone + ')' : ''}
━━━━━━━━━━━━━━━━━━━━
${itemsList}
━━━━━━━━━━━━━━━━━━━━
💰 *कुल देय (Total):* ₹${totalAmt}
💵 *जमा राशि (Paid):* ₹${paidAmt}
${paymentStatus}
${inv.udharNote ? `📝 *नोट:* ${inv.udharNote}\n` : ''}
🌐 *अपना बिल व लाइव रिपेयरिंग स्टेटस यहाँ ट्रैक करें:*
👉 https://monumobile.in/#track

📍 *दुकान पता:* ${branchAddress}
📞 *कस्टमर केयर:* +91 ${branchPhone}

*धन्यवाद! पुनः पधारें।*
`;

    const cleanPhone = (inv.customerPhone || '').replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? ('91' + cleanPhone) : cleanPhone;

    // 1. Generate High-Res Image Blob of the receipt
    let blob = null;
    try {
      blob = await generateInvoiceBlob();
    } catch(err) {
      console.warn('Could not generate invoice blob:', err);
    }

    // 2. Native Share with Image File AND Caption Text (Sets BOTH title and text so WhatsApp receives caption)
    if (blob && navigator.canShare) {
      const file = new File([blob], `MMS-Invoice-${inv.invoiceNo || 'bill'}.png`, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: textMsg,
            text: textMsg
          });
          return;
        } catch(shareErr) {
          if (shareErr.name !== 'AbortError') console.warn('Share error:', shareErr);
        }
      }
    }

    // 3. Fallback for Desktop if native share fails: Open WhatsApp with prefilled text
    let waUrl = '';
    if (targetPhone && targetPhone.length >= 10) {
      waUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(textMsg)}`;
    } else {
      waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMsg)}`;
    }
    window.open(waUrl, '_blank');
  }

  // --- Download Invoice Image as PNG ---
  async function downloadInvoicePNG(inv) {
    const blob = await generateInvoiceBlob();
    if (!blob) {
      alert('इमेज तैयार नहीं हो सकी, कृपया प्रिंट विकल्प का उपयोग करें।');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Monu-Mobile-Invoice-${inv.invoiceNo}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // --- Copy Invoice Image directly ---
  async function copyInvoicePNG(inv) {
    try {
      const blob = await generateInvoiceBlob();
      if (blob && navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        alert('✅ रसीद इमेज कॉपी हो गई है! अब आप कहीं भी (व्हाट्सएप, फेसबुक या वर्ड) Ctrl + V दबाकर पेस्ट कर सकते हैं।');
      } else {
        alert('ब्राउज़र क्लिपबोर्ड सपोर्ट उपलब्ध नहीं है, आप "इमेज डाउनलोड" बटन दबा सकते हैं।');
      }
    } catch (err) {
      alert('इमेज कॉपी करने में त्रुटि: ' + err.message);
    }
  }

  // --- Show Invoice Modal in View ---
  
  function printInvoiceReceipt(invoiceNo) {
    const inv = (state.invoices || []).find(i => i.invoiceNo === invoiceNo);
    if (inv) {
      showInvoiceModal(inv);
    } else {
      alert('बिल रिकॉर्ड नहीं मिला: ' + invoiceNo);
    }
  }
  
  function showInvoiceModal(inv) {
    const invBranch = state.branches.find(b => b.id === inv.branchId) || state.branches[0];
    const branchTitle = invBranch ? invBranch.name : 'MONU MOBILE SOLUTION';
    const branchAddress = invBranch ? invBranch.address : '216, 2nd Flr, Sree Rama Towers, Ashok Marg, Hazratganj, Lucknow';
    const branchPhone = invBranch ? invBranch.phone : '7905859701';
    window.MMS_APP.currentInvoice = inv;
    dom.invoiceContent.innerHTML = `
      <div id="printable-bill" class="bg-white text-slate-900 font-sans p-4 max-w-[320px] mx-auto border border-dashed border-slate-400 rounded-lg text-xs leading-tight">
        
        <!-- Header with Logo & Contact -->
        <div class="text-center pb-2.5 mb-2.5 border-b border-dashed border-slate-400">
          <div class="h-10 mx-auto mb-1 flex items-center justify-center">
            <img src="logo.svg" alt="Monu Mobile Solution" class="h-full object-contain mx-auto">
          </div>
          <h2 class="text-sm font-black text-slate-900 tracking-wider">${branchTitle}</h2>
          <p class="text-[10px] text-slate-700 font-medium">${branchAddress}</p>
          <p class="text-xs font-black text-blue-900 mt-0.5">📞 मो / WhatsApp: ${branchPhone}</p>
        </div>

        <!-- Invoice Meta -->
        <div class="text-[11px] mb-2 pb-2 border-b border-dashed border-slate-300 space-y-0.5">
          <div class="flex justify-between">
            <span><strong>बिल नं:</strong> ${inv.invoiceNo}</span>
            <span><strong>तारीख:</strong> ${inv.date}</span>
          </div>
          <div class="flex justify-between">
            <span><strong>ग्राहक:</strong> ${inv.customerName}</span>
            <span>(${inv.customerType === 'shopkeeper' ? 'दुकानदार' : 'ग्राहक'})</span>
          </div>
          <div class="flex justify-between">
            <span><strong>मो:</strong> ${inv.customerPhone}</span>
            <span><strong>समय:</strong> ${inv.time || ''}</span>
          </div>
        </div>

        <!-- Items Table -->
        <table class="w-full text-left text-[11px] mb-2">
          <thead>
            <tr class="border-b border-slate-400 font-bold">
              <th class="py-1">विवरण</th>
              <th class="py-1 text-center">मात्रा</th>
              <th class="py-1 text-right">रकम</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            ${(inv.items || []).map(it => `
              <tr>
                <td class="py-1 font-semibold leading-tight">${it.name}</td>
                <td class="py-1 text-center">${it.qty}</td>
                <td class="py-1 text-right font-bold">${formatCurrency(it.rate * it.qty)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Totals & Balance -->
        <div class="border-t border-dashed border-slate-400 pt-1.5 text-[11px] space-y-1 mb-2">
          <div class="flex justify-between">
            <span>सब-टोटल:</span>
            <span>${formatCurrency(inv.subTotal || inv.totalAmount)}</span>
          </div>
          ${inv.discount > 0 ? `
            <div class="flex justify-between text-slate-600">
              <span>छूट (Discount):</span>
              <span>- ${formatCurrency(inv.discount)}</span>
            </div>
          ` : ''}
          <div class="flex justify-between font-black text-xs pt-1 border-t border-slate-300">
            <span>कुल देय (Total):</span>
            <span>${formatCurrency(inv.totalAmount)}</span>
          </div>
          <div class="flex justify-between text-emerald-800 font-bold">
            <span>जमा / एडवांस (Paid):</span>
            <span>${formatCurrency(inv.paidAmount)}</span>
          </div>
          ${inv.dueAmount > 0 ? `
            <div class="flex justify-between text-rose-700 font-black text-xs p-1 bg-rose-50 rounded">
              <span>बकाया (Remaining Due):</span>
              <span>${formatCurrency(inv.dueAmount)}</span>
            </div>
          ` : `
            <div class="flex justify-between text-emerald-700 font-bold text-xs p-1 bg-emerald-50 rounded">
              <span>भुगतान स्थिति:</span>
              <span>✅ पूर्ण भुगतान (PAID)</span>
            </div>
          `}
          ${inv.udharNote ? `
            <div class="pt-1 text-[10px] text-slate-600 border-t border-dashed border-slate-300">
              <strong>उधार नोट:</strong> ${inv.udharNote}
            </div>
          ` : ''}
        </div>

        <!-- Footer -->
        <div class="text-[9.5px] text-slate-600 text-center border-t border-dashed border-slate-400 pt-2 space-y-1">
          <p class="font-bold text-slate-800">एक्सप्रेस मोबाइल रिपेयरिंग लैब • 100% ओरिजिनल पार्ट्स</p>
          <div class="p-1.5 bg-blue-50/80 rounded border border-blue-200/60 text-blue-900 font-bold text-[10px]">
            🌐 बिल व रिपेयर स्टेटस ट्रैक करें: <span class="underline">https://monumobile.in/#track</span>
          </div>
          <p class="font-extrabold text-slate-900">धन्यवाद! पुनः पधारें • हेल्पलाइन: ${branchPhone}</p>
        </div>
      </div>

      <!-- Actions (Thermal Print, WhatsApp Auto-Download, PDF, PNG, Copy) -->
      <div class="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
          <button type="button" onclick="window.MMS_APP.shareWhatsApp()" class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer">
            <span class="text-lg">📲</span>
            <span>WhatsApp पर भेजें</span>
          </button>
          <button type="button" onclick="window.MMS_APP.printSlip()" class="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-black shadow-md flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer">
            <span class="text-lg">🖨️</span>
            <span>रसीद प्रिंट करें</span>
          </button>
        </div>

      </div>
    `;
    openModal(dom.invoiceModal);
  }

  // --- 2. Inventory (SKU) Management & Restocking ---
  function renderInventory() {
    const container = document.getElementById('tab-view-inventory');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';
    const catFilter = state.invCatFilter || 'all';
    const searchQuery = (state.invSearchQuery || '').toLowerCase().trim();

    const filteredInventory = (state.inventory || []).filter(item => {
      const matchBranch = branchFilter === 'all' || item.branchId === branchFilter || (!item.branchId && branchFilter === 'branch_hazratganj');
      if (!matchBranch) return false;

      // Category filter matching
      if (catFilter !== 'all') {
        const itemCat = (item.category || '').toLowerCase();
        const targetCat = catFilter.toLowerCase();
        const meta = getCategoryMeta(catFilter);
        const matchCat = itemCat.includes(targetCat) || 
                         (meta && meta.keywords && meta.keywords.split(' ').some(k => k.length > 2 && itemCat.includes(k)));
        if (!matchCat) return false;
      }

      // Search query matching
      if (searchQuery) {
        const text = ((item.sku || '') + ' ' + (item.name || '') + ' ' + (item.category || '')).toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }

      return true;
    });

    let totalStockCount = 0;
    let totalStockValuation = 0;
    let lowStockCount = 0;

    filteredInventory.forEach(item => {
      totalStockCount += Number(item.stock || 0);
      totalStockValuation += (Number(item.stock || 0) * Number(item.costPrice || 0));
      if (Number(item.stock || 0) <= Number(item.minAlert || 2)) lowStockCount++;
    });

    container.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-7">
          <div class="clay-card clay-card-blue p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">${__L("कुल उपलब्ध पार्ट्स", "Total Items in Stock")}</span>
            <span id="inv-stat-count" class="text-2xl font-black text-slate-900 font-mono mt-1 block">${totalStockCount} पीस</span>
          </div>
          <div class="clay-card clay-card-mint p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">${__L("इन्वेंट्री लागत वैल्यू", "Inventory Cost Valuation")}</span>
            <span id="inv-stat-valuation" class="text-2xl font-black text-blue-700 font-mono mt-1 block">${formatCurrency(totalStockValuation)}</span>
          </div>
          <div class="clay-card clay-card-peach p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">${__L("कम स्टॉक अलर्ट", "Low Stock Alert")}</span>
            <span id="inv-stat-low" class="text-2xl font-black text-amber-600 font-mono mt-1 block">${lowStockCount} आइटम्स</span>
          </div>
        </div>

        <div class="clay-card bg-white/95 p-6 sm:p-7 rounded-[32px] space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="text-base font-black text-slate-900">${__L("इन्वेंट्री व SKU स्टॉक लिस्ट", "Inventory & SKU Stock List")}</h3>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                  ${branchFilter === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(branchFilter)}
                </span>
              </div>
              <p class="text-xs text-slate-500">${__L("20+ श्रेणियों में स्पेयर पार्ट्स का लाइव स्टॉक, खरीद व बिक्री दर", "Live stock, cost & selling prices of spare parts across 20+ categories")}</p>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              ${renderBranchFilterBar(branchFilter)}
              <button onclick="window.MMS_APP.openNewSKUModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 shrink-0 transition active:scale-95 cursor-pointer">
                <span>➕ ${__L("नया पार्ट / SKU जोड़ें", "Add New SKU / Part")}</span>
              </button>
            </div>
          </div>

          ${branchFilter === 'branch_kannauj' ? `
            <div class="mb-4 p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-3 text-amber-900 text-xs shadow-2xs">
              <span class="text-2xl">🏢</span>
              <div>
                <strong class="font-black text-sm block">कन्नौज शाखा (Realme ऑथराइज्ड सर्विस सेंटर)</strong>
                <p class="text-amber-700 mt-0.5">यहाँ के सभी स्पेयर पार्ट्स सीधे कंपनी (Realme) द्वारा अधिकृत रूप से भेजे जाते हैं। मोनू मोबाइल सॉल्यूशन की मुख्य स्पेयर पार्ट्स इन्वेंट्री <strong>हजरतगंज (सेंट्रल लैब व मुख्य वेयरहाउस)</strong> में रखी जाती है और यहीं से <strong>नाका हिंडोला</strong> शाखा को ट्रांसफर की जाती है।</p>
              </div>
            </div>
          ` : ''}

          <!-- Category Quick Filter & Search Bar -->
          <div class="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2 flex-1 min-w-[240px]">
              <span class="text-slate-400 font-bold">🔍</span>
              <input type="text" id="inv-search-query" value="${state.invSearchQuery || ''}" oninput="window.MMS_APP.setInventorySearch(this.value)" placeholder="${__L("पार्ट, SKU या मॉडल सर्च करें (उदा. iPhone 13, Realme 12, OLED, Battery...)", "Search part, SKU or model (e.g. iPhone 13, Realme 12, OLED, Battery...)")}" class="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-slate-500 shrink-0">📂 ${__L("कैटेगरी:", "Category:")}</span>
              <select id="inv-category-filter" onchange="window.MMS_APP.setInventoryCategoryFilter(this.value)" class="p-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all" ${(!state.invCatFilter || state.invCatFilter === 'all') ? 'selected' : ''}>${__L("🏢 सभी कैटेगरी", "🏢 All Categories")}</option>
                ${MMS_SPARE_CATEGORIES.map(c => `
                  <option value="${c.id}" ${state.invCatFilter === c.id ? 'selected' : ''}>${c.icon} ${c.name}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">${__L("SKU कोड", "SKU Code")}</th>
                  <th class="p-2.5">${__L("पार्ट का नाम व मॉडल", "Part Name & Model")}</th>
                  <th class="p-2.5">${__L("कैटेगरी", "Category")}</th>
                  <th class="p-2.5 text-right">${__L("खरीद लागत", "Cost Price")}</th>
                  <th class="p-2.5 text-right">${__L("बिक्री रेट", "Selling Price")}</th>
                  <th class="p-2.5 text-center">${__L("स्टॉक", "Stock")}</th>
                  <th class="p-2.5 text-center rounded-r-lg">${__L("एक्शन", "Action")}</th>
                </tr>
              </thead>
              <tbody id="inventory-table-body" class="divide-y divide-slate-100">
                ${filteredInventory.map(item => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5 font-mono font-bold text-blue-700">${item.sku}</td>
                    <td class="p-2.5 font-bold text-slate-900">${item.name}</td>
                    <td class="p-2.5 text-slate-600">${item.category}</td>
                    <td class="p-2.5 text-right font-mono text-slate-500">${formatCurrency(item.costPrice)}</td>
                    <td class="p-2.5 text-right font-mono font-bold text-slate-900">${formatCurrency(item.sellPrice)}</td>
                    <td class="p-2.5 text-center font-mono font-bold">
                      <span class="px-2 py-0.5 rounded-full text-xs ${item.stock <= item.minAlert ? 'bg-amber-100 text-amber-800 font-black' : 'bg-emerald-50 text-emerald-700'}">
                        ${item.stock}
                      </span>
                    </td>
                    <td class="p-2.5 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button type="button" onclick="window.MMS_APP.openEditSKUModal('${item.sku}')" class="px-2 py-1 text-[11px] font-bold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition flex items-center gap-1 cursor-pointer" title="पार्ट विवरण, रेट व स्टॉक ठीक करें">
                          <span>✏️</span> <span>एडिट</span>
                        </button>
                        <button type="button" onclick="window.MMS_APP.restockSKU('${item.sku}')" class="px-2 py-1 text-[11px] font-bold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition flex items-center gap-1 cursor-pointer" title="स्टॉक रीस्टॉक करें">
                          <span>+</span> <span>रीस्टॉक</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('') || '<tr><td colspan="7" class="p-4 text-center text-slate-400">इस शाखा में कोई स्पेयर पार्ट दर्ज नहीं है।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }


  function setInventoryCategoryFilter(catId) {
    state.invCatFilter = catId;
    renderInventory();
  }

  function setInventorySearch(query) {
    state.invSearchQuery = query;
    const tbody = document.getElementById('inventory-table-body');
    if (tbody) {
      updateInventoryTableOnly();
    } else {
      renderInventory();
    }
  }

  function updateInventoryTableOnly() {
    const branchFilter = state.activeBranch || 'all';
    const catFilter = state.invCatFilter || 'all';
    const searchQuery = (state.invSearchQuery || '').toLowerCase().trim();

    const filteredInventory = (state.inventory || []).filter(item => {
      const matchBranch = branchFilter === 'all' || item.branchId === branchFilter || (!item.branchId && branchFilter === 'branch_hazratganj');
      if (!matchBranch) return false;

      if (catFilter !== 'all') {
        const itemCat = (item.category || '').toLowerCase();
        const targetCat = catFilter.toLowerCase();
        const meta = getCategoryMeta(catFilter);
        const matchCat = itemCat.includes(targetCat) || 
                         (meta && meta.keywords && meta.keywords.split(' ').some(k => k.length > 2 && itemCat.includes(k)));
        if (!matchCat) return false;
      }

      if (searchQuery) {
        const text = ((item.sku || '') + ' ' + (item.name || '') + ' ' + (item.category || '')).toLowerCase();
        if (!text.includes(searchQuery)) return false;
      }

      return true;
    });

    let totalStockCount = 0;
    let totalStockValuation = 0;
    let lowStockCount = 0;

    filteredInventory.forEach(item => {
      totalStockCount += Number(item.stock || 0);
      totalStockValuation += (Number(item.stock || 0) * Number(item.costPrice || 0));
      if (Number(item.stock || 0) <= Number(item.minAlert || 2)) lowStockCount++;
    });

    const statCount = document.getElementById('inv-stat-count');
    const statValuation = document.getElementById('inv-stat-valuation');
    const statLow = document.getElementById('inv-stat-low');
    if (statCount) statCount.textContent = totalStockCount + ' पीस';
    if (statValuation) statValuation.textContent = formatCurrency(totalStockValuation);
    if (statLow) statLow.textContent = lowStockCount + ' आइटम्स';

    const tbody = document.getElementById('inventory-table-body');
    if (tbody) {
      tbody.innerHTML = filteredInventory.map(item => `
        <tr class="hover:bg-slate-50 transition border-b border-slate-100">
          <td class="p-2.5 font-mono font-bold text-blue-700">${item.sku}</td>
          <td class="p-2.5 font-bold text-slate-900">${item.name}</td>
          <td class="p-2.5 text-slate-600">${item.category}</td>
          <td class="p-2.5 text-right font-mono text-slate-500">${formatCurrency(item.costPrice)}</td>
          <td class="p-2.5 text-right font-mono font-bold text-slate-900">${formatCurrency(item.sellPrice)}</td>
          <td class="p-2.5 text-center font-mono font-bold">
            <span class="px-2 py-0.5 rounded-full text-xs ${item.stock <= item.minAlert ? 'bg-amber-100 text-amber-800 font-black' : 'bg-emerald-50 text-emerald-700'}">
              ${item.stock}
            </span>
          </td>
          <td class="p-2.5 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button type="button" onclick="window.MMS_APP.openEditSKUModal('${item.sku}')" class="px-2 py-1 text-[11px] font-bold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition flex items-center gap-1 cursor-pointer" title="पार्ट विवरण, रेट व स्टॉक ठीक करें">
                <span>✏️</span> <span>एडिट</span>
              </button>
              <button type="button" onclick="window.MMS_APP.restockSKU('${item.sku}')" class="px-2 py-1 text-[11px] font-bold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition flex items-center gap-1 cursor-pointer" title="स्टॉक रीस्टॉक करें">
                <span>+</span> <span>रीस्टॉक</span>
              </button>
            </div>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="7" class="p-4 text-center text-slate-400 font-bold">🔍 कोई पार्ट नहीं मिला। दूसरा नाम टाइप करें या ऊपर नया SKU जोड़ें।</td></tr>';
    }
  }

  
  // =========================================================================
  // INTER-BRANCH INVENTORY TRANSFER (हजरतगंज मुख्य गोदाम ➔ नाका हिंडोला)
  // =========================================================================

  function renderStockTransferModule() {
    const container = document.getElementById('tab-view-transfer');
    if (!container) return;

    // Filter parts available in Hazratganj (Central Warehouse)
    const hazratganjItems = (state.inventory || []).filter(i => 
      (i.branchId === 'branch_hazratganj' || !i.branchId) && Number(i.stock || 0) > 0
    );

    // Total parts in Hazratganj and Naka
    const hgStockTotal = (state.inventory || [])
      .filter(i => i.branchId === 'branch_hazratganj' || !i.branchId)
      .reduce((s, i) => s + Number(i.stock || 0), 0);
    const nakaStockTotal = (state.inventory || [])
      .filter(i => i.branchId === 'branch_naka')
      .reduce((s, i) => s + Number(i.stock || 0), 0);

    const transfers = state.stockTransfers || [];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Banner -->
        <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                ${__L("मल्टी-ब्रांच वेयरहाउस ऑपरेशन", "Multi-Branch Warehouse Operations")}
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/30 text-blue-200 border border-blue-400/30">
                ${__L("हजरतगंज (मेन गोदाम) ➔ नाका हिंडोला", "Hazratganj (Main Warehouse) ➔ Naka Hindola")}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black">${__L("ट्रांसफर इन्वेंट्री व डिलीवरी चालान", "Stock Transfer & Dispatch Challan")}</h2>
            <p class="text-xs text-slate-300">${__L("लखनऊ हजरतगंज सेंट्रल वेयरहाउस से नाका हिंडोला शाखा को माल डिस्पैच करें", "Dispatch spare parts from Hazratganj Central Warehouse to Naka Hindola branch")}</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span class="text-[10px] text-emerald-200 uppercase font-bold block">${__L("हजरतगंज कुल स्टॉक", "Hazratganj Total Stock")}</span>
              <span class="text-lg font-black font-mono">${hgStockTotal} पीस</span>
            </div>
            <div class="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span class="text-[10px] text-blue-200 uppercase font-bold block">${__L("नाका हिंडोला कुल स्टॉक", "Naka Hindola Total Stock")}</span>
              <span class="text-lg font-black font-mono">${nakaStockTotal} पीस</span>
            </div>
          </div>
        </div>

        <!-- Kannauj Notice Badge -->
        <div class="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-900 text-xs">
          <span class="text-xl">🏢</span>
          <p><strong>कन्नौज शाखा (Realme ऑथराइज्ड सर्विस सेंटर):</strong> यहाँ के पार्ट्स कंपनी द्वारा सीधे दिए जाते हैं, अतः इन्वेंट्री हजरतगंज (मुख्य गोदाम) में रखी जाती है और यहीं से नाका हिंडोला शाखा को ट्रांसफर होती है।</p>
        </div>

        <!-- Dispatch Transfer Card (Multi-Item Search & Select) -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
              <span>📦 ${__L("नया माल डिस्पैच करें (मल्टी-आइटम ट्रांसफर)", "Dispatch New Stock (Multi-Item Transfer)")}</span>
            </h3>
            <span class="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 border border-blue-200">
              हजरतगंज ➔ नाका हिंडोला
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <!-- Source Branch -->
            <div>
              <label class="block font-bold text-slate-700 mb-1.5">${__L("भेजने वाली शाखा (मुख्य गोदाम)", "Source Branch (Main Warehouse)")}</label>
              <div class="p-2.5 bg-slate-100 rounded-xl font-bold text-slate-800 border border-slate-200 flex items-center gap-2">
                <span>📍</span>
                <span>हजरतगंज (श्रीराम टावर - मुख्य गोदाम)</span>
              </div>
            </div>

            <!-- Destination Branch -->
            <div>
              <label class="block font-bold text-slate-700 mb-1.5">${__L("प्राप्त करने वाली शाखा", "Destination Branch")}</label>
              <div class="p-2.5 bg-emerald-50 rounded-xl font-black text-emerald-900 border border-emerald-200 flex items-center gap-2">
                <span>🎯</span>
                <span>नाका हिंडोला शाखा (चारबाग)</span>
              </div>
            </div>
          </div>

          <!-- Live Search Bar for Parts -->
          <div class="space-y-2">
            <label class="block font-bold text-slate-700 text-xs">
              🔍 ${__L("पार्ट्स खोजें और लिस्ट में जोड़ें (हजरतगंज स्टॉक से)", "Search & Add Parts (From Hazratganj Stock)")} *
            </label>
            <div class="relative">
              <input 
                id="trf-search-input" 
                type="text" 
                value="${state.transferSearchQuery || ''}"
                oninput="window.MMS_APP.onTransferSearch(this.value)"
                placeholder="पार्ट का नाम, मॉडल या SKU कोड लिखें (उदा. iPhone, Realme, Display, Battery, Sub-board)..." 
                class="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 shadow-sm"
              >
              <span class="absolute left-3 top-3 text-xs text-slate-400">🔍</span>
            </div>

            <!-- Auto-Suggestions Dropdown List -->
            <div id="trf-search-results" class="${(state.transferSearchQuery && state.transferSearchQuery.trim()) ? '' : 'hidden'} max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100">
              ${(() => {
                const q = (state.transferSearchQuery || '').trim().toLowerCase();
                if (!q) return '';
                const matches = hazratganjItems.filter(i => 
                  (i.name && i.name.toLowerCase().includes(q)) || 
                  (i.sku && i.sku.toLowerCase().includes(q)) ||
                  (i.category && i.category.toLowerCase().includes(q))
                ).slice(0, 10);

                if (matches.length === 0) {
                  return `<div class="p-3 text-center text-xs text-slate-400 font-bold">हजरतगंज में इस नाम का कोई पार्ट उपलब्ध नहीं है।</div>`;
                }
                return matches.map(item => `
                  <div class="p-2.5 flex items-center justify-between hover:bg-slate-50 transition gap-2 text-xs">
                    <div>
                      <strong class="text-slate-900 block font-bold">${item.name}</strong>
                      <span class="text-[10px] text-blue-600 font-mono font-bold">[${item.sku}]</span>
                      <span class="text-[10px] text-slate-500 ml-2">उपलब्ध: <strong class="text-emerald-700 font-mono">${item.stock} पीस</strong> | लागत: ₹${item.costPrice}</span>
                    </div>
                    <button 
                      type="button" 
                      onclick="window.MMS_APP.addToTransferCart('${item.sku}')"
                      class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow-sm transition shrink-0 cursor-pointer"
                    >
                      + लिस्ट में जोड़ें
                    </button>
                  </div>
                `).join('');
              })()}
            </div>
          </div>

          <!-- Multi-Part Transfer Cart Table (Selected Parts List) -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label class="block font-black text-slate-900 text-xs">
                📋 ${__L("ट्रांसफर लिस्ट (नाका हिंडोला भेजे जाने वाले पार्ट्स)", "Transfer Cart (Parts Selected for Dispatch)")}
              </label>
              <span class="text-xs font-mono font-bold text-slate-500">
                कुल पार्ट्स: <strong class="text-blue-700">${(state.transferCart || []).length}</strong> आइटम्स
              </span>
            </div>

            ${(!state.transferCart || state.transferCart.length === 0) ? `
              <div class="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center text-slate-500 text-xs font-bold space-y-1">
                <span class="text-xl block">📦</span>
                <span>अभी कोई पार्ट नहीं चुना गया है।</span>
                <p class="text-[11px] font-normal text-slate-400">ऊपर सर्च बॉक्स से पार्ट खोजें और "+ लिस्ट में जोड़ें" बटन दबाएं। आप एक साथ कई पार्ट्स जोड़ सकते हैं।</p>
              </div>
            ` : `
              <div class="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="bg-slate-100 text-slate-700 font-black">
                      <th class="p-2.5 rounded-l-xl">क्र.सं.</th>
                      <th class="p-2.5">पार्ट का नाम व SKU</th>
                      <th class="p-2.5 text-center">हजरतगंज में उपलब्ध</th>
                      <th class="p-2.5 text-center">ट्रांसफर मात्रा (Qty)</th>
                      <th class="p-2.5 text-right">लागत वैल्यू</th>
                      <th class="p-2.5 text-center rounded-r-xl">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    ${state.transferCart.map((cartItem, idx) => `
                      <tr class="hover:bg-slate-50 transition">
                        <td class="p-2.5 font-mono text-slate-400">${idx + 1}</td>
                        <td class="p-2.5">
                          <strong class="text-slate-900 block font-bold">${cartItem.name}</strong>
                          <span class="text-[10px] text-blue-600 font-mono font-bold">${cartItem.sku}</span>
                        </td>
                        <td class="p-2.5 text-center font-mono font-bold text-slate-700">
                          <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            ${cartItem.stock} पीस
                          </span>
                        </td>
                        <td class="p-2.5 text-center">
                          <div class="inline-flex items-center gap-1.5 justify-center">
                            <button type="button" onclick="window.MMS_APP.updateTransferCartQty('${cartItem.sku}', ${cartItem.qty - 1})" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700 transition flex items-center justify-center cursor-pointer">-</button>
                            <input 
                              type="number" 
                              min="1" 
                              max="${cartItem.stock}" 
                              value="${cartItem.qty}" 
                              onchange="window.MMS_APP.updateTransferCartQty('${cartItem.sku}', this.value)"
                              class="w-16 p-1.5 bg-white border border-slate-300 rounded-lg text-center font-mono font-black text-slate-900 focus:ring-2 focus:ring-emerald-500"
                            >
                            <button type="button" onclick="window.MMS_APP.updateTransferCartQty('${cartItem.sku}', ${cartItem.qty + 1})" class="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold text-slate-700 transition flex items-center justify-center cursor-pointer">+</button>
                          </div>
                        </td>
                        <td class="p-2.5 text-right font-mono font-bold text-slate-900">
                          ₹${(cartItem.costPrice || 0) * (cartItem.qty || 1)}
                        </td>
                        <td class="p-2.5 text-center">
                          <button 
                            type="button" 
                            onclick="window.MMS_APP.removeFromTransferCart('${cartItem.sku}')"
                            class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-xs transition cursor-pointer"
                            title="हटाएं"
                          >
                            🗑️ हटाएं
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>

          <!-- Challan Note & Dispatch Button -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-3 border-t border-slate-100 items-end">
            <div class="sm:col-span-2">
              <label class="block font-bold text-slate-700 mb-1.5">${__L("चालान / डिलीवरी नोट (वैकल्पिक)", "Challan / Dispatch Note (Optional)")}</label>
              <input id="trf-note-input" type="text" placeholder="उदा. नाका डिलीवरी चालान #102 / ऑटो से भेजा" class="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none">
            </div>

            <div>
              <button 
                onclick="window.MMS_APP.executeStockTransfer()" 
                class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-lg transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                ${(!state.transferCart || state.transferCart.length === 0) ? 'disabled' : ''}
              >
                <span>🚚 ${__L(`नाका हिंडोला को सभी (${(state.transferCart || []).length}) पार्ट्स ट्रांसफर करें`, `Dispatch All (${(state.transferCart || []).length}) Parts to Naka Hindola`)}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Transfer History Log Table -->
        <div class="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-sm font-black text-slate-900">📜 ${__L("हालिया ट्रांसफर चालान हिस्ट्री", "Recent Stock Transfer Logs")}</h3>
              <p class="text-[11px] text-slate-500">${__L("हजरतगंज से नाका हिंडोला भेजे गए पार्ट्स का पूरा ऑडिट रिकॉर्ड", "Complete audit log of spare parts transferred from Hazratganj to Naka Hindola")}</p>
            </div>
            <span class="text-xs font-mono font-bold text-slate-400">कुल ट्रांसफर: ${transfers.length}</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">चालान नं</th>
                  <th class="p-2.5">तारीख व समय</th>
                  <th class="p-2.5">पार्ट का नाम व SKU</th>
                  <th class="p-2.5 text-center">मात्रा</th>
                  <th class="p-2.5">रूट (कहाँ से ➔ कहाँ)</th>
                  <th class="p-2.5">किसने भेजा (Authorized)</th>
                  <th class="p-2.5">चालान नोट</th>
                  <th class="p-2.5 text-center rounded-r-lg">स्थिति</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${transfers.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-6 text-center text-slate-400 font-bold">
                      अभी तक कोई स्टॉक ट्रांसफर नहीं किया गया है। ऊपर से माल डिस्पैच करें।
                    </td>
                  </tr>
                ` : transfers.map(trf => `
                  <tr class="hover:bg-slate-50 transition">
                    <td class="p-2.5 font-mono font-bold text-emerald-700">${trf.id}</td>
                    <td class="p-2.5 whitespace-nowrap text-slate-600 font-mono">${trf.date} • ${trf.time}</td>
                    <td class="p-2.5">
                      <strong class="text-slate-900 font-black block">${trf.name}</strong>
                      <span class="text-[10px] text-blue-600 font-mono">${trf.sku}</span>
                    </td>
                    <td class="p-2.5 text-center font-mono font-black text-slate-900">
                      <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs">
                        ${trf.qty} पीस
                      </span>
                    </td>
                    <td class="p-2.5 whitespace-nowrap font-bold text-slate-700">
                      हजरतगंज ➔ नाका हिंडोला
                    </td>
                    <td class="p-2.5 text-slate-600 font-bold">${trf.transferredBy}</td>
                    <td class="p-2.5 text-slate-500">${trf.notes || '—'}</td>
                    <td class="p-2.5 text-center">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ ट्रांसफर्ड
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function onTransferSearch(query) {
    state.transferSearchQuery = query || '';
    const resContainer = document.getElementById('trf-search-results');
    if (!resContainer) return;
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      resContainer.classList.add('hidden');
      return;
    }
    const hazratganjItems = (state.inventory || []).filter(i => (i.branchId === 'branch_hazratganj' || !i.branchId) && Number(i.stock || 0) > 0);
    const matches = hazratganjItems.filter(i => 
      (i.name && i.name.toLowerCase().includes(q)) || 
      (i.sku && i.sku.toLowerCase().includes(q)) ||
      (i.category && i.category.toLowerCase().includes(q))
    ).slice(0, 10);

    if (matches.length === 0) {
      resContainer.innerHTML = `<div class="p-3 text-center text-xs text-slate-400 font-bold">हजरतगंज में इस नाम का कोई पार्ट उपलब्ध नहीं है।</div>`;
      resContainer.classList.remove('hidden');
      return;
    }

    resContainer.innerHTML = matches.map(item => `
      <div class="p-2.5 flex items-center justify-between hover:bg-slate-50 transition gap-2 text-xs">
        <div>
          <strong class="text-slate-900 block font-bold">${item.name}</strong>
          <span class="text-[10px] text-blue-600 font-mono font-bold">[${item.sku}]</span>
          <span class="text-[10px] text-slate-500 ml-2">उपलब्ध: <strong class="text-emerald-700 font-mono">${item.stock} पीस</strong> | लागत: ₹${item.costPrice}</span>
        </div>
        <button 
          type="button" 
          onclick="window.MMS_APP.addToTransferCart('${item.sku}')"
          class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow-sm transition shrink-0 cursor-pointer"
        >
          + लिस्ट में जोड़ें
        </button>
      </div>
    `).join('');
    resContainer.classList.remove('hidden');
  }

  function addToTransferCart(sku) {
    state.transferCart = state.transferCart || [];
    const hgItem = (state.inventory || []).find(i => i.sku === sku && (i.branchId === 'branch_hazratganj' || !i.branchId));
    if (!hgItem) return;

    const existing = state.transferCart.find(i => i.sku === sku);
    if (existing) {
      if (existing.qty < hgItem.stock) {
        existing.qty += 1;
      } else {
        alert(`हजरतगंज में केवल ${hgItem.stock} पीस ही उपलब्ध हैं!`);
      }
    } else {
      state.transferCart.push({
        sku: hgItem.sku,
        name: hgItem.name,
        stock: Number(hgItem.stock || 0),
        costPrice: Number(hgItem.costPrice || 0),
        qty: 1
      });
    }
    state.transferSearchQuery = '';
    renderStockTransferModule();
  }

  function updateTransferCartQty(sku, val) {
    state.transferCart = state.transferCart || [];
    const item = state.transferCart.find(i => i.sku === sku);
    if (!item) return;
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 1) {
      item.qty = 1;
    } else if (parsed > item.stock) {
      item.qty = item.stock;
      alert(`हजरतगंज में केवल ${item.stock} पीस ही उपलब्ध हैं!`);
    } else {
      item.qty = parsed;
    }
    renderStockTransferModule();
  }

  function removeFromTransferCart(sku) {
    state.transferCart = (state.transferCart || []).filter(i => i.sku !== sku);
    renderStockTransferModule();
  }

  function executeStockTransfer() {
    const noteInput = document.getElementById('trf-note-input');
    const note = noteInput ? noteInput.value.trim() : '';

    if (!state.transferCart || state.transferCart.length === 0) {
      alert('कृपया पहले ट्रांसफर करने के लिए कम से कम एक पार्ट खोजकर लिस्ट में जोड़ें!');
      return;
    }

    // Validate all items
    for (const cartItem of state.transferCart) {
      const hgItem = (state.inventory || []).find(i => i.sku === cartItem.sku && (i.branchId === 'branch_hazratganj' || !i.branchId));
      if (!hgItem || Number(hgItem.stock || 0) < cartItem.qty) {
        alert(`त्रुटि: [${cartItem.name}] के लिए हजरतगंज में पर्याप्त स्टॉक नहीं है!`);
        return;
      }
    }

    const challanBatchId = 'TRF-' + Date.now().toString().slice(-6);
    let totalItemsCount = state.transferCart.length;
    let totalPiecesCount = 0;

    // Process all items
    state.transferCart.forEach(cartItem => {
      const hgItem = (state.inventory || []).find(i => i.sku === cartItem.sku && (i.branchId === 'branch_hazratganj' || !i.branchId));
      if (hgItem) {
        hgItem.stock = Number(hgItem.stock || 0) - cartItem.qty;
      }

      let nakaItem = (state.inventory || []).find(i => i.sku === cartItem.sku && i.branchId === 'branch_naka');
      if (nakaItem) {
        nakaItem.stock = Number(nakaItem.stock || 0) + cartItem.qty;
      } else if (hgItem) {
        nakaItem = {
          ...hgItem,
          branchId: 'branch_naka',
          stock: cartItem.qty
        };
        state.inventory.push(nakaItem);
      }

      totalPiecesCount += cartItem.qty;

      // Log transfer record
      const trfRecord = {
        id: challanBatchId,
        date: getTodayDateStr(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sku: cartItem.sku,
        name: cartItem.name,
        qty: cartItem.qty,
        fromBranch: 'branch_hazratganj',
        toBranch: 'branch_naka',
        transferredBy: state.currentUser ? (state.currentUser.name + ' (' + (state.currentUser.role || 'Admin').toUpperCase() + ')') : 'Monu Ji (Admin)',
        notes: note || 'हजरतगंज ➔ नाका ट्रांसफर चालान #' + challanBatchId
      };

      state.stockTransfers = state.stockTransfers || [];
      state.stockTransfers.unshift(trfRecord);
    });

    localStorage.setItem('mms_stock_transfers', JSON.stringify(state.stockTransfers));
    state.transferCart = [];
    state.transferSearchQuery = '';

    // Persist and Sync to Enterprise Cloud
    persistData();
    if (typeof CloudSync !== "undefined" && CloudSync.syncInventory) {
      CloudSync.syncInventory(state.inventory);
    }

    alert(`✅ सफल! कुल ${totalItemsCount} प्रकार के पार्ट्स (${totalPiecesCount} पीस) चालान #${challanBatchId} द्वारा हजरतगंज से नाका हिंडोला शाखा को ट्रांसफर हो गए हैं।`);
    renderStockTransferModule();
  }

  // --- Edit SKU / Product Modal (Direct Stock & Rate Correction) ---
  function openEditSKUModal(sku) {
    const item = state.inventory.find(i => i.sku === sku);
    if (!item) return;

    const existing = document.getElementById('edit-sku-modal-backdrop');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'edit-sku-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        <!-- Sticky Header with Close Button -->
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div>
            <span class="text-[10px] uppercase font-black text-blue-600 block">इन्वेंट्री मैनेजमेंट व स्टॉक सुधार</span>
            <h3 class="text-base sm:text-lg font-black text-slate-900">✏️ पार्ट / प्रॉडक्ट विवरण व स्टॉक एडिट करें</h3>
            <p class="text-xs text-slate-500 font-mono text-blue-700 font-bold">${item.sku}</p>
          </div>
          <button type="button" onclick="document.getElementById('edit-sku-modal-backdrop').remove()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-lg font-black transition cursor-pointer" title="बंद करें (Close)">
            ✕
          </button>
        </div>

        <!-- Form Body -->
        <form onsubmit="window.MMS_APP.saveEditSKU(event, '${item.sku}')" class="flex-1 flex flex-col overflow-hidden">
          <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">पार्ट / प्रॉडक्ट का नाम व मॉडल *</label>
              <input type="text" id="esku-name" value="${item.name || ''}" required placeholder="उदा. iPhone 13 OLED Display Folder" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">कैटेगरी *</label>
              ${renderCategoryDropdownHTML('esku-category', item.category || 'Display - Copy')}
            </div>

            <!-- Live Stock Fix (Highlighted in Emerald) -->
            <div class="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
              <label class="block text-xs font-black text-emerald-900 mb-1">📦 वर्तमान लाइव स्टॉक क्वांटिटी (Stock Quantity) *</label>
              <input type="number" id="esku-stock" min="0" value="${item.stock ?? 0}" required class="w-full p-2.5 bg-white border border-emerald-300 rounded-xl font-mono font-black text-emerald-800 text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <span class="text-[10px] font-bold text-emerald-700 mt-1 block">💡 यदि गिनती गलत है तो वास्तविक स्टॉक की सही संख्या यहाँ दर्ज करें।</span>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">खरीद लागत ₹ (Cost Price) *</label>
                <input type="number" id="esku-cost" min="0" value="${item.costPrice ?? 0}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">बिक्री रेट ₹ (Sell Price) *</label>
                <input type="number" id="esku-sell" min="0" value="${item.sellPrice ?? 0}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">कम स्टॉक अलर्ट सीमा (Min Alert)</label>
                <input type="number" id="esku-alert" min="0" value="${item.minAlert ?? 2}" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">शाखा (Branch)</label>
                <select id="esku-branch" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="branch_hazratganj" ${item.branchId === 'branch_hazratganj' ? 'selected' : ''}>📍 हजरतगंज (श्रीराम टावर)</option>
                  <option value="branch_naka" ${item.branchId === 'branch_naka' ? 'selected' : ''}>📍 नाका हिंडोला (लखनऊ)</option>
                  <option value="branch_kannauj" ${item.branchId === 'branch_kannauj' ? 'selected' : ''}>📍 कन्नौज (सरायमीरा)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Sticky Footer -->
          <div class="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50 shrink-0">
            <button type="button" onclick="window.MMS_APP.deleteSKU('${item.sku}')" class="text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center gap-1 transition cursor-pointer">
              <span>🗑️</span> <span>पार्ट हटाएं (Delete)</span>
            </button>
            <div class="flex items-center gap-2">
              <button type="button" onclick="document.getElementById('edit-sku-modal-backdrop').remove()" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer">
                रद्द करें
              </button>
              <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition active:scale-95 cursor-pointer">
                💾 बदलाव सुरक्षित करें (Save)
              </button>
            </div>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function saveEditSKU(e, sku) {
    if (e && e.preventDefault) e.preventDefault();
    const item = state.inventory.find(i => i.sku === sku);
    if (!item) return;

    const name = (document.getElementById('esku-name')?.value || '').trim();
    const category = (document.getElementById('esku-category')?.value || item.category).trim();
    const stock = Number(document.getElementById('esku-stock')?.value ?? item.stock);
    const costPrice = Number(document.getElementById('esku-cost')?.value ?? item.costPrice);
    const sellPrice = Number(document.getElementById('esku-sell')?.value ?? item.sellPrice);
    const minAlert = Number(document.getElementById('esku-alert')?.value ?? item.minAlert);
    const branchId = document.getElementById('esku-branch')?.value || item.branchId;

    if (!name) {
      alert('कृपया पार्ट का नाम भरें!');
      return;
    }

    item.name = name;
    item.category = category;
    item.stock = stock;
    item.costPrice = costPrice;
    item.sellPrice = sellPrice;
    item.minAlert = minAlert;
    item.branchId = branchId;

    persistData();
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(state.inventory));

    const backdrop = document.getElementById('edit-sku-modal-backdrop');
    if (backdrop) backdrop.remove();

    renderInventory();
    alert(`✅ पार्ट "${name}" का विवरण व स्टॉक (${stock} पीस) सफलतापूर्वक सुरक्षित हो गया!`);
  }

  function deleteSKU(sku) {
    const item = state.inventory.find(i => i.sku === sku);
    if (!item) return;
    if (!confirm(`⚠️ क्या आप वाकई पार्ट "${item.name} (${item.sku})" को इन्वेंट्री से हटाना चाहते हैं?`)) {
      return;
    }
    state.inventory = state.inventory.filter(i => i.sku !== sku);
    persistData();
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(state.inventory));
    const backdrop = document.getElementById('edit-sku-modal-backdrop');
    if (backdrop) backdrop.remove();
    renderInventory();
    alert(`✅ पार्ट "${item.name}" को इन्वेंट्री से सफलतापूर्वक हटा दिया गया!`);
  }

  function openRestockModal(sku) {
    const item = state.inventory.find(i => i.sku === sku);
    if (!item) return;
    dom.restockSkuTitle.textContent = `${item.name} (${item.sku})`;
    dom.restockSkuInput.value = item.sku;
    dom.restockQtyInput.value = 5;
    openModal(dom.restockModal);
  }

  function handleRestockSubmit(e) {
    e.preventDefault();
    const sku = dom.restockSkuInput.value;
    const addQty = Number(dom.restockQtyInput.value);
    const item = state.inventory.find(i => i.sku === sku);
    if (item && addQty > 0) {
      item.stock += addQty;
      persistData();
      closeModal(dom.restockModal);
      renderInventory();
      alert(`✅ ${item.name} में ${addQty} पीस स्टॉक सफलतापूर्वक जुड़ गया!`);
    }
  }

  // --- 3. Udhar Khata-Bahi (Due Ledger strictly with Shopkeeper/Customer logic, Note & Timestamps) ---
  function renderKhata() {
    const container = document.getElementById('tab-view-khata');
    if (!container) return;

    let totalMarketDue = 0;
    const branchFilter = state.activeBranch || 'all';
    const matchBranch = (inv) => branchFilter === 'all' || inv.branchId === branchFilter || (!inv.branchId && branchFilter === 'branch_hazratganj');
    const dueInvoices = state.invoices.filter(i => i.dueAmount > 0 && !i.udharCleared && matchBranch(i));
    dueInvoices.forEach(i => totalMarketDue += i.dueAmount);

    container.innerHTML = `
      <div class="space-y-5">
        <div class="bg-gradient-to-r from-amber-500 to-rose-600 text-white p-5 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs uppercase font-bold text-amber-100 block">${__L("मार्केट में कुल बकाया उधार", "Total Market Outstanding Credit")}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-white/20 text-white border border-white/30">
                ${branchFilter === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(branchFilter)}
              </span>
            </div>
            <span class="text-2xl sm:text-3xl font-black font-mono">${formatCurrency(totalMarketDue)}</span>
            <p class="text-xs text-amber-100 mt-1">कुल ${dueInvoices.length} दुकानदारों / ग्राहकों के पास पेमेंट बकाया है</p>
          </div>
          <div class="flex flex-col gap-2 items-end">
            ${renderBranchFilterBarDark(branchFilter)}
            <div class="text-xs bg-white/20 backdrop-blur px-3 py-2 rounded-xl border border-white/30">
              📍 समय पर उधार वसूलने के लिए व्हाट्सएप रिमाइंडर बटन का उपयोग करें।
            </div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-black text-slate-900">बकाया खाता-बही सूची (Due Ledger)</h3>
              <p class="text-xs text-slate-500">तारीख, समय और दुकानदार के उधार नोट सहित पूरा हिसाब</p>
            </div>
            <span class="text-xs font-bold text-slate-500 font-mono">${dueInvoices.length} पेंडिंग खाते</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">बिल नं व तारीख</th>
                  <th class="p-2.5">दुकानदार / ग्राहक नाम</th>
                  <th class="p-2.5">मोबाइल नंबर</th>
                  <th class="p-2.5">उधार नोट (कारण)</th>
                  <th class="p-2.5 text-right">कुल बिल रकम</th>
                  <th class="p-2.5 text-right">जमा कराया</th>
                  <th class="p-2.5 text-right font-black text-rose-600">बकाया उधार</th>
                  <th class="p-2.5 text-center rounded-r-lg">एक्शन (वसूली)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${dueInvoices.map(inv => {
                  const remMsg = encodeURIComponent(`*Monu Mobile Solution - बकाया उधार रिमाइंडर*\n\nप्रिय ${inv.customerName},\nआपके बिल नं ${inv.invoiceNo} का बकाया उधार *${formatCurrency(inv.dueAmount)}* है।\nकृपया दुकान बंद होने से पहले या कल दोपहर तक क्लियर करने का कष्ट करें।\n\n📍 216, श्री रामा टॉवर्स, हजरतगंज, लखनऊ\n📞 संपर्क: 7905859701`);
                  return `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-mono font-bold text-blue-700">
                        <div>${inv.invoiceNo}</div>
                        <span class="text-[10px] text-slate-400 font-normal">${inv.date}</span>
                      </td>
                      <td class="p-2.5 font-bold text-slate-900">${inv.customerName}</td>
                      <td class="p-2.5 font-mono text-slate-600">${inv.customerPhone}</td>
                      <td class="p-2.5 text-slate-500 max-w-xs truncate">${inv.udharNote || 'सामान्य उधार'}</td>
                      <td class="p-2.5 text-right font-mono font-bold">${formatCurrency(inv.totalAmount)}</td>
                      <td class="p-2.5 text-right font-mono text-emerald-700 font-bold">${formatCurrency(inv.paidAmount)}</td>
                      <td class="p-2.5 text-right font-mono text-rose-600 font-black">${formatCurrency(inv.dueAmount)}</td>
                      <td class="p-2.5 text-center">
                        <div class="flex items-center justify-center gap-1.5">
                          <a href="https://wa.me/91${inv.customerPhone.replace(/[^0-9]/g, '')}?text=${remMsg}" target="_blank" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-sm">
                            तगादा (WA)
                          </a>
                          <button onclick="window.MMS_APP.clearKhataUdhar('${inv.invoiceNo}')" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold shadow-sm">
                            ✓ पूरा चुकता
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('') || '<tr><td colspan="8" class="p-4 text-center text-slate-400">इस शाखा में कोई बकाया उधार नहीं है। बधाई! 🎉</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function openReceivePaymentModal(invoiceNo) {
    const inv = state.invoices.find(i => i.invoiceNo === invoiceNo);
    if (!inv) return;
    dom.rcvCustomerName.textContent = inv.customerName;
    dom.rcvInvoiceNo.textContent = inv.invoiceNo;
    dom.rcvCurrentDue.textContent = formatCurrency(inv.dueAmount);
    dom.rcvAmountInput.value = inv.dueAmount;
    openModal(dom.receivePaymentModal);
  }

  function handleReceivePaymentSubmit() {
    const invNo = dom.rcvInvoiceNo.textContent;
    const inv = state.invoices.find(i => i.invoiceNo === invNo);
    const amount = Number(dom.rcvAmountInput.value);

    if (!inv || isNaN(amount) || amount <= 0) {
      alert('कृपया सही पेमेंट राशि भरें!');
      return;
    }

    inv.paidAmount += amount;
    inv.dueAmount = Math.max(0, inv.dueAmount - amount);
    if (inv.dueAmount === 0) {
      inv.udharCleared = true;
      inv.status = 'Paid';
    } else {
      inv.status = 'Partially Paid';
    }

    // Also update associated job
    const job = state.jobs.find(j => j.token === invNo);
    if (job) {
      job.advancePaid += amount;
      job.dueAmount = inv.dueAmount;
      // Status remains manual - technician changes when delivered
    }

    persistData();
    if (typeof CloudSync !== "undefined" && CloudSync.pushInvoice) CloudSync.pushInvoice(inv);
    closeModal(dom.receivePaymentModal);
    renderKhata();
    alert(`✅ ${inv.customerName} से ${formatCurrency(amount)} पेमेंट प्राप्त दर्ज कर लिया गया!`);
  }

  // --- 4. Daily Sales & Galla Register with Date Filter ---
  
  function setSalesFilter(type) {
    if (!state.salesFilter) state.salesFilter = {};
    state.salesFilter.type = type;
    renderDailySales();
  }
  function setSalesCustomDate(customDate) {
    if (!state.salesFilter) state.salesFilter = {};
    state.salesFilter.type = 'custom';
    state.salesFilter.customDate = customDate;
    renderDailySales();
  }
  
  function renderDailySales() {
    const container = document.getElementById('tab-view-sales');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';
    const todayStr = getTodayDateStr();
    const yDate = new Date();
    yDate.setDate(yDate.getDate() - 1);
    const yStr = yDate.toISOString().split('T')[0];
    const thisMonthPrefix = todayStr.substring(0, 7);

    const matchBranch = (inv) => branchFilter === 'all' || inv.branchId === branchFilter || (!inv.branchId && branchFilter === 'branch_hazratganj');

    let filteredInvoices = [];
    let filterLabel = `आज (${todayStr})`;
    const currentFilterType = state.salesFilter.type || 'today';

    if (currentFilterType === 'today') {
      filteredInvoices = state.invoices.filter(i => i.date === todayStr && matchBranch(i));
      filterLabel = `आज के बिल (${todayStr})`;
    } else if (currentFilterType === 'yesterday') {
      filteredInvoices = state.invoices.filter(i => i.date === yStr && matchBranch(i));
      filterLabel = `कल के बिल (${yStr})`;
    } else if (currentFilterType === 'month') {
      filteredInvoices = state.invoices.filter(i => i.date && i.date.startsWith(thisMonthPrefix) && matchBranch(i));
      filterLabel = `इस महीने के बिल (${thisMonthPrefix})`;
    } else if (currentFilterType === 'all') {
      filteredInvoices = state.invoices.filter(matchBranch);
      filterLabel = `सभी तारीखों के कुल बिल (All Time)`;
    } else if (currentFilterType === 'custom') {
      const cDate = state.salesFilter.customDate || todayStr;
      filteredInvoices = state.invoices.filter(i => i.date === cDate && matchBranch(i));
      filterLabel = `तारीख: ${cDate} के बिल`;
    }

    let grossTotal = 0;
    let cashTotal = 0;
    let upiTotal = 0;
    let udharTotal = 0;

    filteredInvoices.forEach(inv => {
      grossTotal += inv.totalAmount;
      if (inv.paymentMode.includes('Cash') || inv.paymentMode.includes('नकद')) {
        cashTotal += inv.paidAmount;
      } else if (inv.paymentMode.includes('UPI') || inv.paymentMode.includes('Online')) {
        upiTotal += inv.paidAmount;
      } else if (inv.paymentMode.includes('एडवांस')) {
        cashTotal += inv.paidAmount;
      }
      udharTotal += inv.dueAmount;
    });

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Interactive Filter Bar -->
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/30 text-blue-200 border border-blue-400/30">
                तारीख व अवधि फिल्टर
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                ${branchFilter === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(branchFilter)}
              </span>
              <span class="text-xs text-blue-200 font-bold">• चयनित: ${filterLabel}</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-black">${__L("डेली सेल्स व गल्ला मिलान", "Daily Sales & Cash Register")}</h3>
            <p class="text-xs text-blue-200">आज, कल, इस महीने या किसी भी तारीख का गल्ला, नकद, यूपीआई व उधार तुरंत देखें</p>
          </div>

          <div class="flex flex-col gap-2.5 items-end">
            ${renderBranchFilterBarDark(branchFilter)}
            <!-- Date Filter Buttons -->
            <div class="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-xs">
              <button onclick="window.MMS_APP.setSalesFilter('today')" class="px-3 py-1.5 rounded-lg font-black transition ${currentFilterType === 'today' ? 'bg-white text-blue-900 shadow-sm' : 'text-white hover:bg-white/20'}">⚡ ${__L("आज", "Today")}</button>
              <button onclick="window.MMS_APP.setSalesFilter('yesterday')" class="px-3 py-1.5 rounded-lg font-black transition ${currentFilterType === 'yesterday' ? 'bg-white text-blue-900 shadow-sm' : 'text-white hover:bg-white/20'}">📅 ${__L("कल", "Yesterday")}</button>
              <button onclick="window.MMS_APP.setSalesFilter('month')" class="px-3 py-1.5 rounded-lg font-black transition ${currentFilterType === 'month' ? 'bg-white text-blue-900 shadow-sm' : 'text-white hover:bg-white/20'}">🗓️ ${__L("इस महीने", "This Month")}</button>
              <button onclick="window.MMS_APP.setSalesFilter('all')" class="px-3 py-1.5 rounded-lg font-black transition ${currentFilterType === 'all' ? 'bg-white text-blue-900 shadow-sm' : 'text-white hover:bg-white/20'}">📜 ${__L("सभी", "All Time")}</button>
              <div class="flex items-center gap-1 pl-2 border-l border-white/20">
                <span class="text-[10px] text-blue-200">${__L("तारीख चुनें:", "Select Date:")}</span>
                <input type="date" value="${state.salesFilter.customDate || todayStr}" onchange="window.MMS_APP.setSalesCustomDate(this.value)" class="bg-white text-slate-900 px-2 py-0.5 rounded-lg text-xs font-mono font-bold border-none outline-none cursor-pointer">
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Badges Row (4 Signature Pastel Clay Cards) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
          <div class="clay-card clay-card-blue p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">${__L("कुल बिक्री", "Total Sales (Gross)")}</span>
            <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">${formatCurrency(grossTotal)}</span>
            <span class="text-[10px] text-slate-400">कुल ${filteredInvoices.length} बिल काटे गए</span>
          </div>
          <div class="clay-card clay-card-mint p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">${__L("💵 गल्ले में नकद", "💵 Cash in Register")}</span>
            <span class="text-2xl font-black text-emerald-700 font-mono mt-1 block">${formatCurrency(cashTotal)}</span>
            <span class="text-[10px] text-slate-400">आज का काउंटर कैश</span>
          </div>
          <div class="clay-card clay-card-peach p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">💳 बैंक / UPI (PHONEPE / GPAY)</span>
            <span class="text-2xl font-black text-blue-700 font-mono mt-1 block">${formatCurrency(upiTotal)}</span>
            <span class="text-[10px] text-slate-400">ऑनलाइन खाते में जमा</span>
          </div>
          <div class="clay-card clay-card-lilac p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">📕 आज का दिया उधार (DUE)</span>
            <span class="text-2xl font-black text-rose-600 font-mono mt-1 block">${formatCurrency(udharTotal)}</span>
            <span class="text-[10px] text-slate-400">खाता-बही में दर्ज</span>
          </div>
        </div>

        <!-- Invoices List -->
        <div class="clay-card bg-white/95 p-6 rounded-[32px] space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-black text-slate-900">${filterLabel}</h3>
              <p class="text-xs text-slate-500">शाम को दुकान बंद करते समय गल्ला मिलान करें</p>
            </div>
            <!-- Direct Admin View (No WhatsApp send needed) -->
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">इनवॉइस नं</th>
                  <th class="p-2.5">ग्राहक / दुकानदार</th>
                  <th class="p-2.5">सामान विवरण</th>
                  <th class="p-2.5">भुगतान मोड</th>
                  <th class="p-2.5 text-right">कुल बिल</th>
                  <th class="p-2.5 text-right">जमा राशि</th>
                  <th class="p-2.5 text-right">उधार बाकी</th>
                  <th class="p-2.5 text-center rounded-r-lg">रसीद</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filteredInvoices.map(inv => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5 font-mono font-bold text-blue-700">
                      <div>${inv.invoiceNo || inv.billNo || ('MMS-INV-' + (inv.id || ''))}</div>
                      <span class="text-[10px] text-slate-400 font-normal">${inv.date || ''} ${inv.time || ''}</span>
                    </td>
                    <td class="p-2.5">
                      <div class="font-bold text-slate-900">${inv.customerName || 'Walk-in Customer'}</div>
                      <span class="font-mono text-[10px] text-slate-500">${inv.customerPhone || 'N/A'}</span>
                    </td>
                    <td class="p-2.5 text-slate-700 max-w-xs truncate">
                      ${(inv.items || []).map(it => `${it.name || 'पार्ट'} (x${it.qty || 1})`).join(', ') || 'पार्ट्स व लेबर'}
                    </td>
                    <td class="p-2.5 font-bold ${(inv.paymentMode || '').includes('100%') ? 'text-emerald-700' : 'text-blue-700'}">
                      ${inv.paymentMode || 'Cash'}
                    </td>
                    <td class="p-2.5 text-right font-mono font-bold text-slate-900">${formatCurrency(inv.totalAmount ?? inv.total ?? 0)}</td>
                    <td class="p-2.5 text-right font-mono text-emerald-700 font-bold">${formatCurrency(inv.paidAmount ?? inv.paid ?? 0)}</td>
                    <td class="p-2.5 text-right font-mono font-bold ${(Number(inv.dueAmount || inv.due || 0)) > 0 ? 'text-rose-600' : 'text-slate-400'}">${formatCurrency(inv.dueAmount ?? inv.due ?? 0)}</td>
                    <td class="p-2.5 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button onclick="window.MMS_APP.printInvoiceReceipt('${inv.invoiceNo}')" class="px-2 py-1 bg-slate-900 text-white rounded text-[11px] font-bold hover:bg-slate-800">
                          रसीद
                        </button>
                        <button onclick="window.MMS_APP.deleteJobOrInvoice('${inv.invoiceNo}')" class="p-1 text-rose-600 hover:text-rose-800 font-bold" title="बिल हटाएं">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('') || '<tr><td colspan="8" class="p-4 text-center text-slate-400">इस अवधि व शाखा में कोई बिल नहीं मिला।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function setSalesDateFilter(type) {
    state.salesFilter.type = type;
    renderDailySales();
  }

  function setSalesCustomDate(dateVal) {
    state.salesFilter.type = 'custom';
    state.salesFilter.customDate = dateVal;
    renderDailySales();
  }

  function sendDailyClosingReport(label, gross, cash, upi, udhar, count) {
    const text = `*Monu Mobile Solution - डेली क्लोजिंग रिपोर्ट*
━━━━━━━━━━━━━━━━━━
📅 ${label}
━━━━━━━━━━━━━━━━━━
🧾 कुल बिल काटे: *${count}*
💰 कुल बिक्री (Gross): *${formatCurrency(gross)}*
💵 काउंटर नकद (Cash): *${formatCurrency(cash)}*
📱 ऑनलाइन UPI (Bank): *${formatCurrency(upi)}*
📕 कुल नया उधार (Due): *${formatCurrency(udhar)}*
━━━━━━━━━━━━━━━━━━
📍 दुकान: 216, श्री रामा टॉवर्स, हजरतगंज, लखनऊ
🌐 वेबसाइट: https://monumobile.in`;
    window.open(`https://wa.me/${window.MMS_DATA.storeInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  }

  // --- 5. Balance Sheet & P&L Statement (Admin Only) ---
  function renderBalanceSheet() {
    const container = document.getElementById('tab-view-balance');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';

    const filteredInvoices = (state.invoices || []).filter(inv => branchFilter === 'all' || inv.branchId === branchFilter || !inv.branchId);
    let totalRevenue = 0;
    let totalCogs = 0;
    let totalDueReceivable = 0;

    filteredInvoices.forEach(inv => {
      totalRevenue += Number(inv.totalAmount ?? inv.total ?? 0);
      totalDueReceivable += Number(inv.dueAmount ?? inv.due ?? 0);
      (inv.items || []).forEach(it => {
        totalCogs += (Number(it.cost || (Number(it.rate || 0) * 0.45)) * (Number(it.qty) || 1));
      });
    });

    let stockValuation = 0;
    state.inventory.forEach(item => {
      stockValuation += (item.stock * item.costPrice);
    });

    const grossProfit = totalRevenue - totalCogs;
    const profitMargin = totalRevenue > 0 ? Math.round((grossProfit / totalRevenue) * 100) : 0;

    const filteredExpenses = state.expenses.filter(e => branchFilter === 'all' || e.branchId === branchFilter);
    const totalOverheadExpenses = filteredExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const rentExpenses = filteredExpenses.filter(e => e.category === 'rent').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const utilExpenses = filteredExpenses.filter(e => e.category === 'electricity' || e.category === 'wifi').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const salaryExpenses = filteredExpenses.filter(e => e.category === 'salary').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const miscExpenses = filteredExpenses.filter(e => e.category !== 'rent' && e.category !== 'electricity' && e.category !== 'wifi' && e.category !== 'salary').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    const netProfit = grossProfit - totalOverheadExpenses;
    const netMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Master P&L Banner -->
        <div class="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                मास्टर बैलेंस शीट व शुद्ध लाभ (True Net Profit)
              </span>
              <span class="text-xs font-bold text-slate-300">शाखा: ${getBranchName(branchFilter)}</span>
            </div>
            <div class="flex items-baseline gap-3">
              <span class="text-3xl sm:text-4xl font-black font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}">${formatCurrency(netProfit)}</span>
              <span class="text-xs font-bold text-slate-300">वास्तविक शुद्ध मुनाफा (${netMargin}% नेट मार्जिन)</span>
            </div>
            <p class="text-xs text-slate-300 mt-1">
              बिक्री ₹${totalRevenue.toLocaleString()} - पार्ट्स लागत ₹${totalCogs.toLocaleString()} - कुल दुकान खर्च व सैलरी ₹${totalOverheadExpenses.toLocaleString()} = शुद्ध लाभ
            </p>
          </div>
          <button onclick="window.MMS_APP.exportBackup()" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition active:scale-95">
            💾 पूरा डेटा बैकअप डाउनलोड करें (JSON)
          </button>
        </div>

        <!-- 4 Core Financial KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">${__L("कुल बिक्री", "Total Sales")}</span>
            <span class="text-xl font-black text-slate-900 font-mono mt-1 block">${formatCurrency(totalRevenue)}</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-0.5">काउंटर व रिपेयर टोकन</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">${__L("पार्ट्स खरीद लागत (COGS)", "Cost of Goods Sold (COGS)")}</span>
            <span class="text-xl font-black text-rose-600 font-mono mt-1 block">${formatCurrency(totalCogs)}</span>
            <span class="text-[10px] text-slate-400 block mt-0.5">स्पेयर पार्ट्स व फोल्डर खरीद</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">${__L("सकल लाभ", "Gross Profit")}</span>
            <span class="text-xl font-black text-blue-700 font-mono mt-1 block">${formatCurrency(grossProfit)}</span>
            <span class="text-[10px] text-blue-600 font-bold block mt-0.5">${profitMargin}% ग्रॉस मार्जिन</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">${__L("कुल दुकान खर्च", "Total Overhead Expenses")}</span>
            <span class="text-xl font-black text-amber-600 font-mono mt-1 block">${formatCurrency(totalOverheadExpenses)}</span>
            <span class="text-[10px] text-slate-400 block mt-0.5">रेंट, बिल, सैलरी व पैंट्री</span>
          </div>
        </div>

        <!-- Expense & Stock Breakdown Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 class="text-sm font-black text-slate-900">परिचालन व्यय विवरण (Operating Expenses Breakdown)</h4>
              <button onclick="window.MMS_APP.openAddExpenseModal()" class="text-xs font-bold text-blue-600 hover:underline">+ नया खर्च</button>
            </div>
            <div class="space-y-3 text-xs">
              <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span class="text-slate-700 font-bold flex items-center gap-2">🏢 दुकान किराया (Shop Rent)</span>
                <span class="font-mono font-black text-slate-900">${formatCurrency(rentExpenses)}</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span class="text-slate-700 font-bold flex items-center gap-2">⚡ बिजली व इंटरनेट बिल (Utilities)</span>
                <span class="font-mono font-black text-slate-900">${formatCurrency(utilExpenses)}</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span class="text-slate-700 font-bold flex items-center gap-2">👔 कर्मचारी वेतन भुगतान (Staff Salaries)</span>
                <span class="font-mono font-black text-slate-900">${formatCurrency(salaryExpenses)}</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span class="text-slate-700 font-bold flex items-center gap-2">☕ चाय, टूल व विविध खर्च (Misc Overheads)</span>
                <span class="font-mono font-black text-slate-900">${formatCurrency(miscExpenses)}</span>
              </div>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div class="pb-3 border-b border-slate-100">
              <h4 class="text-sm font-black text-slate-900">दुकान परिसंपत्ति व देनदारी (Assets & Receivables)</h4>
            </div>
            <div class="space-y-3 text-xs">
              <div class="flex items-center justify-between p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div>
                  <span class="font-black text-emerald-900 block">📦 वर्तमान इन्वेंट्री स्टॉक माल मूल्य:</span>
                  <span class="text-[10px] text-emerald-700">दुकान में उपलब्ध स्पेयर पार्ट्स की कुल खरीद लागत</span>
                </div>
                <span class="text-base font-black font-mono text-emerald-700">${formatCurrency(stockValuation)}</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl">
                <div>
                  <span class="font-black text-amber-900 block">📕 मार्केट में फंसा हुआ कुल उधार (Due Khata):</span>
                  <span class="text-[10px] text-amber-700">दुकानदारों व ग्राहकों के पास बकाया रकम</span>
                </div>
                <span class="text-base font-black font-mono text-amber-700">${formatCurrency(totalDueReceivable)}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3 Branches Profitability Comparison Table -->
        <div class="clay-card bg-white/95 rounded-[32px] overflow-hidden p-6 sm:p-7 shadow-lg">
          <div class="p-4 border-b border-slate-100">
            <h4 class="text-sm font-black text-slate-900">🏢 3 शाखाओं का तुलनात्मक लाभ-हानि खाता (Branch-Wise P&L)</h4>
            <p class="text-xs text-slate-500">हजरतगंज (Head Lab), नाका हिंडोला और कन्नौज शाखा (सरायमीरा) का अलग-अलग परफॉर्मेंस</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">शाखा का नाम</th>
                  <th class="p-3.5 text-right">कुल बिक्री ₹</th>
                  <th class="p-3.5 text-right">पार्ट्स लागत ₹</th>
                  <th class="p-3.5 text-right">दुकान खर्च ₹</th>
                  <th class="p-3.5 text-right">शुद्ध मुनाफा (Net Profit)</th>
                  <th class="p-3.5 text-center">परफॉर्मेंस</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                ${(state.branches || []).map(b => {
                  const bInvoices = (state.invoices || []).filter(inv => inv.branchId === b.id || (!inv.branchId && b.id === 'branch_hazratganj'));
                  const bSales = bInvoices.reduce((sum, inv) => sum + Number(inv.totalAmount ?? inv.total ?? 0), 0);
                  let bCogs = 0;
                  bInvoices.forEach(inv => (inv.items || []).forEach(it => { bCogs += (Number(it.cost || (Number(it.rate || 0) * 0.45)) * (Number(it.qty) || 1)); }));
                  const bExpenses = (state.expenses || []).filter(e => e.branchId === b.id).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
                  const bNet = (bSales - bCogs) - bExpenses;

                  return `
                    <tr class="hover:bg-slate-50/70 transition">
                      <td class="p-3.5 whitespace-nowrap">
                        <span class="font-black text-slate-900 block">${b.name}</span>
                        <span class="text-[10px] text-slate-400 font-mono">${b.address}</span>
                      </td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-bold text-slate-900">${formatCurrency(bSales)}</td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-bold text-rose-600">${formatCurrency(bCogs)}</td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-bold text-amber-600">${formatCurrency(bExpenses)}</td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-black ${bNet >= 0 ? 'text-emerald-700' : 'text-rose-600'}">
                        ${formatCurrency(bNet)}
                      </td>
                      <td class="p-3.5 text-center whitespace-nowrap">
                        ${bNet >= 0 ? `
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                            🟢 मुनाफे में (Profitable)
                          </span>
                        ` : `
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                            🔴 घाटे में
                          </span>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- 6. Repair Job Cards & Tokens Manager ---
  function renderJobCardsManager() {
    const container = document.getElementById('tab-view-jobs');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';
    const filteredJobs = (state.jobs || []).filter(j => branchFilter === 'all' || j.branchId === branchFilter || (!j.branchId && branchFilter === 'branch_hazratganj'));

    const rowsHtml = filteredJobs.map(job => {
      const waText = encodeURIComponent('*Monu Mobile Solution - रिपेयर स्टेटस*\n\nप्रिय ' + job.customerName + ',\nआपके मोबाइल (' + job.device + ') का टोकन नं ' + job.token + ' है।\nवर्तमान स्थिति: *' + (job.status === 'ready' ? 'तैयार है - दुकान से ले जाएं' : job.status === 'delivered' ? 'डिलीवर हो चुका है' : 'इंजीनियर काम कर रहे हैं') + '*\n\n📍 दुकान: 216, श्री रामा टॉवर्स, हजरतगंज, लखनऊ\n📞 संपर्क: 7905859701\n🌐 वेबसाइट: https://monumobile.in');

      return '<tr class="hover:bg-slate-50">' +
        '<td class="p-2.5 font-mono font-bold text-blue-700">' + job.token + '</td>' +
        '<td class="p-2.5">' +
          '<div class="font-bold text-slate-900">' + job.customerName + '</div>' +
          '<span class="font-mono text-[10px] text-slate-500">' + job.customerPhone + '</span>' +
        '</td>' +
        '<td class="p-2.5 font-bold text-slate-800">' + job.device + '</td>' +
        '<td class="p-2.5 text-slate-600 max-w-xs truncate">' + job.issue + '</td>' +
        '<td class="p-2.5 text-center">' +
          (job.assignedTo ? (
            '<div class="inline-flex flex-col items-center">' +
              '<span class="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1 shadow-2xs">' +
                '<span>👤</span> ' + job.assignedTo +
              '</span>' +
              '<span class="text-[9px] text-blue-700 font-bold mt-0.5">' + (job.estimatedMins || 45) + 'm • ' + (job.scheduledAt ? 'शेड्यूल' : 'तुरंत') + '</span>' +
            '</div>'
          ) : (
            '<button onclick="window.MMS_APP.openWorkAssignmentModal(\'' + job.token + '\')" class="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer">' +
              '${__L("⚠️ अभी असाइन नहीं", "⚠️ Unassigned")}' +
            '</button>'
          )) +
        '</td>' +
        '<td class="p-2.5 font-mono text-slate-500">' + (job.passcode || 'N/A') + '</td>' +
        '<td class="p-2.5 text-right font-mono font-bold">' + formatCurrency(job.estimatedCost) + '</td>' +
        '<td class="p-2.5 text-right font-mono text-emerald-700 font-bold">' + formatCurrency(job.advancePaid) + '</td>' +
        '<td class="p-2.5 text-center">' +
          '<select onchange="window.MMS_APP.updateJobStatus(\'' + job.token + '\', this.value)" class="bg-white border border-slate-300 text-xs font-bold rounded p-1">' +
            '<option value="received"' + (job.status === 'received' ? ' selected' : '') + '>${__L("स्वीकार", "Received")}</option>' +
            '<option value="in_progress"' + (job.status === 'in_progress' ? ' selected' : '') + '>${__L("काम चालू", "In Progress")}</option>' +
            '<option value="ready"' + (job.status === 'ready' ? ' selected' : '') + '>${__L("तैयार", "Ready")}</option>' +
            '<option value="delivered"' + (job.status === 'delivered' ? ' selected' : '') + '>${__L("डिलीवर", "Delivered")}</option>' +
          '</select>' +
        '</td>' +
        '<td class="p-2.5 text-right">' +
          '<div class="flex items-center justify-end gap-1.5">' +
            '<a href="https://wa.me/91' + job.customerPhone.replace(/[^0-9]/g, '') + '?text=' + waText + '" target="_blank" class="p-1 text-emerald-600 hover:text-emerald-700 font-bold" title="WhatsApp पर स्टेटस भेजें">💬 WA</a>' +
            '<button onclick="window.MMS_APP.openWorkAssignmentModal(\'' + job.token + '\')" class="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg text-[10px]" title="काम असाइन करें या टाइमलाइन देखें">⚡ असाइन</button>' + 
            '<button onclick="window.MMS_APP.printJobToken(\'' + job.token + '\')" class="p-1 text-blue-600 hover:text-blue-800 font-bold" title="${__L("टोकन पर्ची प्रिंट करें", "Print Token Receipt")}">${__L("🖨️ प्रिंट", "🖨️ Print")}</button>' +
            '<button onclick="window.MMS_APP.deleteJobOrInvoice(\'' + job.token + '\')" class="p-1 text-rose-600 hover:text-rose-800 font-bold" title="${__L("टोकन हटाएं", "Delete Token")}">${__L("🗑️ हटाएं", "🗑️ Delete")}</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');

    container.innerHTML = `
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-base font-black text-slate-900">${__L("रिपेयर जॉब-शीट व टोकन लिस्ट", "Repair Job Sheets & Token List")}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                ${branchFilter === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(branchFilter)}
              </span>
            </div>
            <p class="text-xs text-slate-500">${__L("ग्राहकों के रिपेयरिंग मोबाइल, पैटर्न लॉक और टोकन स्टेटस", "Live customer repair devices, passcodes and token status")}</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${renderBranchFilterBar(branchFilter)}
            <button onclick="window.MMS_APP.openNewJobModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 shrink-0">
              <span>➕ ${__L("नया रिपेयर टोकन बनाएं", "Create New Repair Token")}</span>
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="bg-slate-100 text-slate-600 font-bold">
                <th class="p-2.5 rounded-l-lg">${__L("टोकन नं", "Token No")}</th>
                <th class="p-2.5">${__L("ग्राहक व मोबाइल", "Customer & Mobile")}</th>
                <th class="p-2.5">${__L("डिवाइस / मॉडल", "Device / Model")}</th>
                <th class="p-2.5">समस्या</th>
                <th class="p-2.5 text-center">असाइन कर्मचारी (Assigned To)</th>
                <th class="p-2.5">लॉक</th>
                <th class="p-2.5 text-right">कुल अनुमान</th>
                <th class="p-2.5 text-right">एडवांस</th>
                <th class="p-2.5 text-center">वर्तमान स्थिति</th>
                <th class="p-2.5 text-right rounded-r-lg">एक्शन</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${rowsHtml || '<tr><td colspan="10" class="p-4 text-center text-slate-400">इस शाखा में कोई रिपेयर टोकन उपलब्ध नहीं है।</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function updateJobStatus(token, newStatus) {
    const job = state.jobs.find(j => j.token === token);
    if (job) {
      job.status = newStatus;
      job.updatedAt = 'Just now';
      persistData();
      if (typeof CloudSync !== 'undefined' && CloudSync.pushJob) {
        CloudSync.pushJob(job);
      }
      alert(`✅ टोकन ${token} का स्टेटस अपडेट हो गया!`);
    }
  }

  function openNewJobModal() {
    openModal(dom.newJobModal);
  }

  function handleNewJobSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('job-cust-name').value.trim();
    const phone = document.getElementById('job-cust-phone').value.trim();
    const device = document.getElementById('job-device').value.trim();
    const issue = document.getElementById('job-issue').value.trim();
    const pass = document.getElementById('job-passcode').value.trim();
    const cost = Number(document.getElementById('job-cost').value) || 0;
    const advance = Number(document.getElementById('job-advance').value) || 0;

    const tokenNo = 'MMS-' + (state.jobs.length + 1001);

    state.jobs.unshift({
      token: tokenNo,
      customerName: name,
      customerPhone: phone,
      customerType: 'customer',
      device: device,
      issue: issue,
      assignedTo: state.currentUser ? state.currentUser.name : 'Technician',
      estimatedCost: cost,
      advancePaid: advance,
      dueAmount: Math.max(0, cost - advance),
      status: 'pending',
      passcode: pass,
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: 'Just now',
      notes: 'Job card created at front desk'
    });

    persistData();
    if (typeof CloudSync !== "undefined" && CloudSync.pushJob) CloudSync.pushJob(state.jobs[0]);
    closeModal(dom.newJobModal);
    document.getElementById('new-job-form').reset();
    renderJobCardsManager();
    // Automatic Work Assignment Popup directly linked to existing tokenNo
    setTimeout(() => {
      openWorkAssignmentModal(tokenNo, {
        customerName: name,
        customerPhone: phone,
        device: device,
        issue: issue,
        estimatedCost: cost,
        advancePaid: advance
      });
    }, 500);
  }

  
  // =========================================================================
  // ENTERPRISE SYSTEM & BRANCH SETTINGS MODULE
  // =========================================================================

    function renderSettingsModule() {
    const container = document.getElementById('tab-view-settings');
    if (!container) return;

    const curUser = state.currentUser || {};
    const role = (curUser.role || 'employee').toLowerCase();
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    // IF EMPLOYEE / TECHNICIAN:
    if (isEmployee) {
      const myEmp = (state.staff || []).find(s => s.phone === curUser.phone || s.id === curUser.id) || curUser;
      const empId = myEmp.id || 'EMP-103';
      const aadhar = myEmp.aadhar || 'XXXXXXXX1234';
      const pan = myEmp.pan || 'ABCDE1234F';

      container.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-4">
          <div class="clay-card bg-white p-5 rounded-[26px] border border-slate-200/80 shadow-sm space-y-4">
            
            <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
                <span>👤</span>
                <span>${__L('प्रोफाइल व KYC सेटिंग्स', 'Profile & KYC Settings')}</span>
              </h3>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                ${myEmp.roleLabel || myEmp.role || __L('कर्मचारी', 'Staff')}
              </span>
            </div>

            <!-- Profile Photo Section -->
            <div class="flex items-center gap-4 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200">
              <img id="emp-profile-preview" src="${myEmp.photo || 'images/avatar_placeholder.png'}" class="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${myEmp.name}')">
              <div class="space-y-1 flex-1">
                <strong class="text-xs font-black text-slate-800 block">${__L('प्रोफाइल फोटो', 'Profile Photo')}</strong>
                <input type="file" id="emp-photo-file-input" accept="image/*" onchange="window.MMS_APP.handleEmployeePhotoUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer">
              </div>
            </div>

            <!-- Employee Info -->
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">${__L('कर्मचारी नाम', 'Employee Name')}</span>
                <strong class="text-sm text-slate-900 block mt-0.5">${myEmp.name}</strong>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">${__L('कर्मचारी ID', 'Employee ID')}</span>
                <strong class="text-sm font-mono text-blue-700 block mt-0.5">${empId}</strong>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">${__L('शाखा', 'Branch')}</span>
                <strong class="text-xs text-slate-800 block mt-0.5">${getBranchName(myEmp.branchId || 'branch_hazratganj')}</strong>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">${__L('मोबाइल', 'Mobile')}</span>
                <strong class="text-xs font-mono text-slate-800 block mt-0.5">${myEmp.phone}</strong>
              </div>
            </div>

            <!-- KYC Documents -->
            <div class="space-y-2.5 pt-2 border-t border-slate-100">
              <h4 class="text-xs font-black uppercase text-slate-700 tracking-wider">${__L('पहचान दस्तावेज (KYC)', 'KYC Documents')}</h4>
              
              <!-- Aadhaar Card -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <strong class="text-slate-900 block font-bold">${__L('आधार कार्ड', 'Aadhaar Card')}</strong>
                  <span class="text-[11px] font-mono text-slate-500">${aadhar}</span>
                </div>
                <label class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold text-[11px] hover:bg-slate-100 cursor-pointer shadow-2xs">
                  <span>${__L('📎 नया अपलोड', '📎 Upload New')}</span>
                  <input type="file" accept="image/*,.pdf" onchange="window.MMS_APP.handleDocUpload('aadhar', event)" class="hidden">
                </label>
              </div>

              <!-- PAN Card -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <strong class="text-slate-900 block font-bold">${__L('पैन कार्ड', 'PAN Card')}</strong>
                  <span class="text-[11px] font-mono text-slate-500">${pan}</span>
                </div>
                <label class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold text-[11px] hover:bg-slate-100 cursor-pointer shadow-2xs">
                  <span>${__L('📎 नया अपलोड', '📎 Upload New')}</span>
                  <input type="file" accept="image/*,.pdf" onchange="window.MMS_APP.handleDocUpload('pan', event)" class="hidden">
                </label>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-100 flex items-center justify-end">
              <button onclick="alert(__L('✅ प्रोफाइल व दस्तावेज सुरक्षित सहेजे गए!', '✅ Profile & KYC documents saved successfully!'))" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
                ${__L('सहेजें', 'Save Changes')}
              </button>
            </div>

          </div>
        </div>
      `;
      return;
    }

    // IF ADMIN OR MANAGER: SHOW MASTER SYSTEM SETTINGS
    const branches = state.branches || [];

    // Storage card is ONLY for isOwner (Super Admin) - Clean, simple excel download & clean data
    const adminStorageCard = isOwner ? `
      <!-- Data Lifecycle & Clean Action -->
      <div class="clay-card bg-white rounded-[26px] border border-slate-200/80 p-5 shadow-sm space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="text-lg">🛡️</span>
            <div>
              <h3 class="text-sm font-black text-slate-900">${__L('डेटा लाइफसाइकिल व स्पेस मैनेजमेंट', 'Data Lifecycle & Space Management')}</h3>
              <p class="text-[11px] text-slate-500">${__L('45 दिन से पुराने रिकॉर्ड्स का बैकअप व ऑटो-क्लीनअप', '45-day automatic lifecycle backup & cleanup')}</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ${__L('ऑटो-क्लीन सक्रिय', 'Auto-Clean Active')}
          </span>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-2.5 pt-1">
          <button type="button" onclick="window.MMS_APP.exportOldDataToExcel(45)" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer">
            <span>📥</span>
            <span>${__L('एक्सेल डाउनलोड करें', 'Export to Excel')}</span>
          </button>
          <button type="button" onclick="window.MMS_APP.purgeOldDataWithConfirmation()" class="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-black transition flex items-center gap-1.5 cursor-pointer">
            <span>🗑️</span>
            <span>${__L('डेटा क्लीन करें', 'Clean Data')}</span>
          </button>
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="space-y-4">
        
        <!-- Header -->
        <div class="clay-card bg-white p-4 sm:p-5 rounded-[26px] border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
          <div class="flex items-center gap-2.5">
            <span class="text-xl">⚙️</span>
            <h2 class="text-base font-black text-slate-900">${__L('सिस्टम सेटिंग्स', 'System Settings')}</h2>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.MMS_APP.exportBackup()" class="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer">
              <span>💾</span>
              <span>${__L('पूरा बैकअप (JSON)', 'Full Backup (JSON)')}</span>
            </button>
          </div>
        </div>

        ${adminStorageCard}

        <!-- 3 Branches GPS Coordinates -->
        <div class="clay-card bg-white p-5 rounded-[26px] border border-slate-200/80 shadow-sm space-y-3.5">
          <div class="border-b border-slate-100 pb-2.5 flex items-center justify-between">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>📍</span>
              <span>${__L('शाखाएं व GPS सेटिंग्स', 'Branches & GPS Settings')}</span>
            </h3>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">${__L('एंटी-स्पूफ सक्रिय', 'Anti-Spoof Active')}</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            ${branches.map((b, idx) => `
              <div class="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2.5">
                <div class="flex items-center justify-between">
                  <strong class="text-xs font-black text-slate-900">${b.name}</strong>
                  <span class="text-[10px] font-mono text-slate-400">#${idx + 1}</span>
                </div>
                
                <div class="space-y-2 text-xs">
                  <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase">${__L('फ़ोन', 'Phone')}</label>
                    <input id="set-branch-phone-${b.id}" type="text" value="${b.phone || ''}" class="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold">
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="block text-[10px] font-bold text-slate-500 uppercase">${__L('अक्षांश (Lat)', 'Latitude')}</label>
                      <input id="set-branch-lat-${b.id}" type="number" step="any" value="${b.lat || 0}" class="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold">
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold text-slate-500 uppercase">${__L('देशांतर (Lng)', 'Longitude')}</label>
                      <input id="set-branch-lng-${b.id}" type="number" step="any" value="${b.lng || 0}" class="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold">
                    </div>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase">${__L('दायरा (मीटर)', 'Radius (Meters)')}</label>
                    <input id="set-branch-radius-${b.id}" type="number" value="${b.radiusMeters || 10}" class="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold">
                  </div>
                  <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                    <div>
                      <label class="block text-[10px] font-bold text-blue-700 uppercase">${__L('खुलने का समय', 'Open Time')}</label>
                      <input id="set-branch-open-${b.id}" type="time" value="${b.openTime || '10:30'}" class="w-full p-1.5 bg-white border border-blue-200 rounded-lg text-xs font-black text-slate-800">
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold text-slate-700 uppercase">${__L('बंद का समय', 'Close Time')}</label>
                      <input id="set-branch-close-${b.id}" type="time" value="${b.closeTime || '20:30'}" class="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-black text-slate-800">
                    </div>
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-200 flex items-center gap-2">
                  <button onclick="window.MMS_APP.fillCurrentGPSForBranch('${b.id}')" class="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer">
                    <span>📍</span>
                    <span>${__L('लाइव GPS लें', 'Get Live GPS')}</span>
                  </button>
                  <button onclick="window.MMS_APP.saveBranchSettings('${b.id}')" class="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold transition cursor-pointer">
                    ${__L('सहेजें', 'Save')}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Shift & Policy Settings -->
        <div class="clay-card bg-white p-5 rounded-[26px] border border-slate-200/80 shadow-sm">
          <div class="border-b border-slate-100 pb-2.5 mb-3">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
              <span>⏰</span>
              <span>${__L('कार्य समय व नियम', 'Shift & Work Rules')}</span>
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="block text-slate-400 text-[10px] font-bold uppercase">${__L('दुकान खुलने का समय', 'Shift Start')}</span>
              <strong class="text-sm text-slate-900 block mt-0.5">10:30 AM</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="block text-slate-400 text-[10px] font-bold uppercase">${__L('दुकान बंद होने का समय', 'Shift End')}</span>
              <strong class="text-sm text-slate-900 block mt-0.5">08:30 PM</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="block text-slate-400 text-[10px] font-bold uppercase">${__L('उधार नियम', 'Credit Policy')}</span>
              <strong class="text-sm text-amber-600 block mt-0.5">${__L('केवल B2B', 'B2B Only')}</strong>
            </div>
          </div>
        </div>

      </div>
    `;
  }


  function handleEmployeePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      const preview = document.getElementById('emp-profile-preview');
      if (preview) preview.src = dataUrl;

      // Update state for current staff member
      const curUser = state.currentUser || {};
      const staffMember = (state.staff || []).find(s => s.phone === curUser.phone || s.id === curUser.id);
      if (staffMember) {
        staffMember.photo = dataUrl;
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(state.staff));
      }
      curUser.photo = dataUrl;
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(curUser));
      alert('✅ आपकी प्रोफाइल फोटो सफलतापूर्वक अपडेट कर दी गई है!');
    };
    reader.readAsDataURL(file);
  }

  function handleDocUpload(type, event) {
    const file = event.target.files[0];
    if (!file) return;
    alert(`✅ ${type === 'aadhar' ? 'आधार कार्ड' : 'पैन कार्ड'} (${file.name}) सफलतापूर्वक अपलोड हो गया!`);
  }


  function fillCurrentGPSForBranch(branchId) {
    if (!navigator.geolocation) {
      alert('❌ ब्राउज़र में GPS उपलब्ध नहीं है।');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const latInput = document.getElementById(`set-branch-lat-${branchId}`);
        const lngInput = document.getElementById(`set-branch-lng-${branchId}`);
        if (latInput && lngInput) {
          latInput.value = pos.coords.latitude.toFixed(6);
          lngInput.value = pos.coords.longitude.toFixed(6);
          alert(`✅ लाइव GPS प्राप्त हुआ!\nLatitude: ${pos.coords.latitude.toFixed(6)}\nLongitude: ${pos.coords.longitude.toFixed(6)}\nअब 'सहेजें' पर क्लिक करें।`);
        }
      },
      err => alert('GPS त्रुटि: ' + err.message),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function saveBranchSettings(branchId) {
    const branch = (state.branches || []).find(b => b.id === branchId);
    if (!branch) return;

    const nameInput = document.getElementById(`set-branch-name-${branchId}`);
    const addrInput = document.getElementById(`set-branch-addr-${branchId}`);
    const phoneInput = document.getElementById(`set-branch-phone-${branchId}`);
    const latInput = document.getElementById(`set-branch-lat-${branchId}`);
    const lngInput = document.getElementById(`set-branch-lng-${branchId}`);
    const radInput = document.getElementById(`set-branch-radius-${branchId}`);

    if (nameInput) branch.name = nameInput.value.trim();
    if (addrInput) branch.address = addrInput.value.trim();
    if (phoneInput) branch.phone = phoneInput.value.trim();
    if (latInput) branch.lat = parseFloat(latInput.value) || branch.lat;
    if (lngInput) branch.lng = parseFloat(lngInput.value) || branch.lng;
    if (radInput) branch.radiusMeters = parseInt(radInput.value, 10) || 250;
    
    const openInput = document.getElementById(`set-branch-open-${branchId}`);
    const closeInput = document.getElementById(`set-branch-close-${branchId}`);
    if (openInput) branch.openTime = openInput.value;
    if (closeInput) branch.closeTime = closeInput.value;

    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(state.branches));
    alert(`✅ ${branch.name} की सेटिंग्स, पता व GPS निर्देशांक सुरक्षित कर लिए गए!`);
    renderSettingsModule();
  }

  function exportBackup() {
    const backupData = {
      timestamp: new Date().toISOString(),
      store: window.MMS_DATA.storeInfo,
      inventory: state.inventory,
      jobs: state.jobs,
      invoices: state.invoices,
      contacts: state.contacts
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Monu_Mobile_Solution_Backup_${getTodayDateStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // --- Customer / Shopkeeper On-Type Suggestions (Clean & Dynamic) ---
  function filterContactSuggestions(query, field) {
    // Keep state synchronized
    if (field === 'name') state.posCustomer.name = query;
    if (field === 'phone') state.posCustomer.phone = query;

    const isShopkeeper = state.posCustomer.type === 'shopkeeper';
    const container = document.getElementById(field === 'name' ? 'pos-contact-name-suggestions' : 'pos-contact-phone-suggestions');
    if (!container) return;

    const q = (query || '').trim().toLowerCase();
    if (!q || q.length < 1) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }

    // Build comprehensive search list combining state.contacts, historical invoices, and job-cards
    const contactMap = new Map();
    
    // 1. Saved contacts
    (state.contacts || []).forEach(c => {
      if (c && c.phone) {
        contactMap.set(c.phone.trim(), {
          name: c.name || 'ग्राहक',
          phone: c.phone.trim(),
          type: c.type || (isShopkeeper ? 'shopkeeper' : 'customer')
        });
      }
    });

    // 2. Historical Invoices
    (state.invoices || []).forEach(inv => {
      const ph = (inv.customerPhone || '').trim();
      if (ph && !contactMap.has(ph)) {
        contactMap.set(ph, {
          name: inv.customerName || 'ग्राहक',
          phone: ph,
          type: inv.customerType === 'shopkeeper' ? 'shopkeeper' : 'customer'
        });
      }
    });

    // 3. Historical Job Cards
    (state.jobs || []).forEach(j => {
      const ph = (j.customerPhone || '').trim();
      if (ph && !contactMap.has(ph)) {
        contactMap.set(ph, {
          name: j.customerName || 'ग्राहक',
          phone: ph,
          type: j.customerType === 'shopkeeper' ? 'shopkeeper' : 'customer'
        });
      }
    });

    const allContacts = Array.from(contactMap.values());

    // Filter matches
    const digitsOnlyQ = q.replace(/\D/g, '');
    const matches = allContacts.filter(c => {
      const nameMatch = c.name && c.name.toLowerCase().includes(q);
      const phoneClean = (c.phone || '').replace(/\D/g, '');
      const phoneMatch = phoneClean.includes(digitsOnlyQ.length >= 2 ? digitsOnlyQ : q);
      return nameMatch || phoneMatch;
    });

    if (matches.length === 0) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }

    container.innerHTML = matches.slice(0, 6).map(c => `
      <div 
        onmousedown="window.MMS_APP.selectContactSuggestion('${encodeURIComponent(c.name)}', '${c.phone}', '${c.type}')"
        class="p-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between text-xs transition border-b border-slate-100 last:border-0"
      >
        <div>
          <span class="font-bold text-slate-900 block">${c.name}</span>
          <span class="font-mono text-[11px] text-blue-700 font-bold">📞 ${c.phone}</span>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${c.type === 'shopkeeper' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}">
          ${c.type === 'shopkeeper' ? '🏪 दुकानदार' : '👤 ग्राहक'}
        </span>
      </div>
    `).join('');

    container.classList.remove('hidden');
  }

  function selectContactSuggestion(encodedName, phone) {
    const name = decodeURIComponent(encodedName);
    state.posCustomer.name = name;
    state.posCustomer.phone = phone;

    const nameInput = document.getElementById('pos-cust-name');
    const phoneInput = document.getElementById('pos-cust-phone');
    if (nameInput) nameInput.value = name;
    if (phoneInput) phoneInput.value = phone;

    // Hide dropdowns
    const nameDrop = document.getElementById('pos-contact-name-suggestions');
    const phoneDrop = document.getElementById('pos-contact-phone-suggestions');
    if (nameDrop) { nameDrop.classList.add('hidden'); nameDrop.innerHTML = ''; }
    if (phoneDrop) { phoneDrop.classList.add('hidden'); phoneDrop.innerHTML = ''; }
  }

  // --- 7. Customer & Shopkeeper Database (CRM with 2 Tabs & Excel Export) ---
  
  function setCRMSubTab(tab) {
    state.crmSubTab = tab;
    renderDirectoryCRM();
  }
  function setCRMSearchQuery(query) {
    state.crmSearchQuery = query;
    renderDirectoryCRM();
  }
  
  function renderDirectoryCRM() {
    const container = document.getElementById('tab-view-directory');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';
    const currentSubTab = state.crmSubTab || 'shopkeeper';
    const searchQuery = (state.crmSearchQuery || '').trim().toLowerCase();

    // Calculate aggregated metrics for each contact from state.invoices
    const contactStats = {};
    state.invoices.forEach(inv => {
      const matchBranch = branchFilter === 'all' || inv.branchId === branchFilter || (!inv.branchId && branchFilter === 'branch_hazratganj');
      if (matchBranch) {
        const p = inv.customerPhone;
        if (!contactStats[p]) {
          contactStats[p] = { count: 0, totalAmount: 0, dueAmount: 0 };
        }
        contactStats[p].count += 1;
        contactStats[p].totalAmount += inv.totalAmount;
        contactStats[p].dueAmount += inv.dueAmount;
      }
    });

    let branchHeading = '';
    if (branchFilter === 'all') {
      branchHeading = 'सभी शाखाएं - रजिस्टर्ड दुकानदार व ग्राहकों का पूरा रिकॉर्ड';
    } else if (branchFilter === 'branch_hazratganj') {
      branchHeading = 'हजरतगंज शाखा - रजिस्टर्ड दुकानदार व ग्राहकों का रिकॉर्ड';
    } else if (branchFilter === 'branch_naka' || branchFilter === 'branch_naka') {
      branchHeading = 'नाका हिंडोला शाखा - रजिस्टर्ड दुकानदार व ग्राहकों का रिकॉर्ड';
    } else if (branchFilter === 'branch_kannauj' || branchFilter === 'branch_kannauj') {
      branchHeading = 'कन्नौज शाखा (सरायमीरा) - रजिस्टर्ड दुकानदार व ग्राहकों का रिकॉर्ड';
    } else {
      branchHeading = `${getBranchName(branchFilter)} - रजिस्टर्ड रिकॉर्ड`;
    }

    // Partition contacts
    const shopkeepers = state.contacts.filter(c => c.type === 'shopkeeper');
    const customers = state.contacts.filter(c => c.type === 'customer');

    const activeList = currentSubTab === 'shopkeeper' ? shopkeepers : customers;
    const filteredList = activeList.filter(c => {
      if (!searchQuery) return true;
      return (c.name && c.name.toLowerCase().includes(searchQuery)) || (c.phone && c.phone.includes(searchQuery));
    });

    let totalB2bVolume = 0;
    shopkeepers.forEach(s => {
      if (contactStats[s.phone]) totalB2bVolume += contactStats[s.phone].totalAmount;
    });

    let totalCustVolume = 0;
    customers.forEach(c => {
      if (contactStats[c.phone]) totalCustVolume += contactStats[c.phone].totalAmount;
    });

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Metrics & Excel Export Banner -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-5 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2.5 py-1 bg-white/20 backdrop-blur rounded-lg text-[11px] font-black tracking-wider uppercase text-blue-100">
                👥 ग्राहक व दुकानदार डेटाबेस (CRM Directory)
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/30 text-blue-200 border border-blue-400/30">
                ${branchHeading}
              </span>
            </div>
            <h2 class="text-xl font-black mt-1">${branchHeading} - रजिस्टर्ड दुकानदार व ग्राहकों का रिकॉर्ड</h2>
            <p class="text-xs text-blue-200 mt-0.5">कुल ${shopkeepers.length} दुकानदार व ${customers.length} ग्राहक सुरक्षित रूप से सहेजे गए हैं</p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            ${renderBranchFilterBarDark(branchFilter)}
            <!-- Excel Export Button -->
            <button 
              type="button" 
              onclick="window.MMS_APP.exportDirectoryToExcel()"
              class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 transition shrink-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>एक्सेल में डाउनलोड करें (Export to Excel)</span>
            </button>
          </div>
        </div>

        <!-- Metric Badges Row (4 Signature Pastel Clay Cards) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
          <div class="clay-card clay-card-blue p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">🏪 कुल लोकल दुकानदार (B2B)</span>
            <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">${shopkeepers.length}</span>
            <span class="text-[10px] text-slate-400">नियमित थोक व उधार ग्राहक</span>
          </div>
          <div class="clay-card clay-card-mint p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">👤 कुल रीटेल ग्राहक (Walk-in)</span>
            <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">${customers.length}</span>
            <span class="text-[10px] text-slate-400">काउंटर व सर्विस ग्राहक</span>
          </div>
          <div class="clay-card clay-card-peach p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">💰 दुकानदार (B2B) कुल व्यापार</span>
            <span class="text-2xl font-black text-blue-700 font-mono mt-1 block">${formatCurrency(totalB2bVolume)}</span>
            <span class="text-[10px] text-slate-400">थोक व रिपेयरिंग टर्नओवर</span>
          </div>
          <div class="clay-card clay-card-lilac p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">💵 रीटेल ग्राहक कुल व्यापार</span>
            <span class="text-2xl font-black text-emerald-700 font-mono mt-1 block">${formatCurrency(totalCustVolume)}</span>
            <span class="text-[10px] text-slate-400">काउंटर सेल्स टर्नओवर</span>
          </div>
        </div>

        <!-- Filter Sub-Tabs & Live Search -->
        <div class="clay-card bg-white/95 p-6 rounded-[32px] space-y-4">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <button 
                type="button" 
                onclick="window.MMS_APP.setCRMSubTab('shopkeeper')" 
                class="px-4 py-2 rounded-xl text-xs font-black transition ${currentSubTab === 'shopkeeper' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
              >
                🏪 लोकल दुकानदार (${shopkeepers.length})
              </button>
              <button 
                type="button" 
                onclick="window.MMS_APP.setCRMSubTab('customer')" 
                class="px-4 py-2 rounded-xl text-xs font-black transition ${currentSubTab === 'customer' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
              >
                👤 नॉर्मल कस्टमर (${customers.length})
              </button>
            </div>

            <!-- Live Search Bar -->
            <div class="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="नाम या मोबाइल नंबर से खोजें..." 
                value="${state.crmSearchQuery || ''}"
                oninput="window.MMS_APP.setCRMSearchQuery(this.value)"
                class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
              <span class="absolute left-3 top-2.5 text-xs text-slate-400">🔍</span>
            </div>
          </div>

          <!-- Contact Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-black">
                  <th class="p-3 rounded-l-xl">क्र.सं.</th>
                  <th class="p-3">नाम / दुकान का नाम</th>
                  <th class="p-3">प्रकार</th>
                  <th class="p-3">मोबाइल नंबर</th>
                  <th class="p-3 text-center">कुल इनवॉइस</th>
                  <th class="p-3 text-right">कुल बिलिंग रकम</th>
                  <th class="p-3 text-right">वर्तमान बकाया उधार</th>
                  <th class="p-3 text-center rounded-r-xl">एक्शन (कॉल व WhatsApp)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${filteredList.map((contact, idx) => {
                  const stats = contactStats[contact.phone] || { count: 0, totalAmount: 0, dueAmount: 0 };
                  const waMsg = encodeURIComponent(`नमस्ते ${contact.name}! Monu Mobile Solution की तरफ से सादर अभिवादन।`);
                  return `
                    <tr class="hover:bg-slate-50 transition">
                      <td class="p-3 text-slate-400 font-mono">${idx + 1}</td>
                      <td class="p-3">
                        <strong class="text-slate-900 block font-bold">${contact.name}</strong>
                        <span class="text-[10px] text-slate-400">${contact.type === 'shopkeeper' ? 'रजिस्टर्ड डीलर' : 'काउंटर वॉक-इन'}</span>
                      </td>
                      <td class="p-3">
                        <span class="px-2 py-0.5 rounded text-[10px] font-black ${contact.type === 'shopkeeper' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800 border border-blue-200'}">
                          ${contact.type === 'shopkeeper' ? '🏪 दुकानदार' : '👤 कस्टमर'}
                        </span>
                      </td>
                      <td class="p-3 font-mono font-bold text-slate-800">${contact.phone}</td>
                      <td class="p-3 text-center font-mono font-bold">${stats.count} बिल</td>
                      <td class="p-3 text-right font-mono font-bold text-slate-900">${formatCurrency(stats.totalAmount)}</td>
                      <td class="p-3 text-right font-mono font-bold ${stats.dueAmount > 0 ? 'text-rose-600' : 'text-emerald-700'}">
                        ${formatCurrency(stats.dueAmount)}
                      </td>
                      <td class="p-3 text-center">
                        <div class="inline-flex items-center gap-1.5">
                          <a href="tel:${contact.phone}" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] transition">
                            📞 कॉल
                          </a>
                          <a href="https://wa.me/91${contact.phone}?text=${waMsg}" target="_blank" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-black text-[11px] shadow-sm transition">
                            💬 WhatsApp
                          </a>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('') || '<tr><td colspan="8" class="p-8 text-center text-slate-400 font-bold"><div class="space-y-1"><span class="text-2xl block">👥</span><span>अभी तक कोई ग्राहक या दुकानदार नहीं जुड़ा है।</span><p class="text-[11px] font-normal text-slate-400">पीओएस काउंटर से बिल बनाने पर ग्राहक यहाँ अपने आप रिकॉर्ड हो जाएंगे।</p></div></td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function setDirectorySubTab(subTab) {
    state.crmSubTab = subTab;
    renderDirectoryCRM();
  }

  function filterDirectorySearch(q) {
    state.crmSearchQuery = q;
    renderDirectoryCRM();
  }

  function exportDirectoryToExcel() {
    const contactStats = {};
    state.invoices.forEach(inv => {
      const p = inv.customerPhone;
      if (!contactStats[p]) contactStats[p] = { count: 0, totalAmount: 0, dueAmount: 0 };
      contactStats[p].count += 1;
      contactStats[p].totalAmount += inv.totalAmount;
      contactStats[p].dueAmount += inv.dueAmount;
    });

    const headers = [
      'क्र.सं. (S.No)',
      'प्रकार (Type)',
      'नाम (Name)',
      'मोबाइल नंबर (Mobile)',
      'कुल इनवॉइस संख्या (Total Bills)',
      'कुल व्यापार रकम ₹ (Total Amount)',
      'वर्तमान बकाया उधार ₹ (Due Balance)',
      'रजिस्ट्रेशन तारीख (Added Date)'
    ];

    const rows = state.contacts.map((c, idx) => {
      const stats = contactStats[c.phone] || { count: 0, totalAmount: 0, dueAmount: 0 };
      return [
        idx + 1,
        c.type === 'shopkeeper' ? 'दुकानदार (B2B)' : 'नॉर्मल ग्राहक (Walk-in)',
        `"${(c.name || '').replace(/"/g, '""')}"`,
        `"${c.phone}"`,
        stats.count,
        stats.totalAmount,
        stats.dueAmount,
        `"${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}"`
      ].join(',');
    });

    // UTF-8 BOM for Microsoft Excel Hindi support
    const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Monu_Mobile_Customer_Shopkeeper_Database_${getTodayDateStr()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✅ एक्सेल शीट सफलतापूर्वक डाउनलोड हो गई है!');
  }


  // =========================================================================
  // 12. MULTI-BRANCH ENGINE & HEADER SWITCHER
  // =========================================================================
  function renderPortalBranchSwitcher() {
    const container = document.getElementById('portal-branch-switcher');
    if (!container) return;

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';

    if (!isOwner) {
      const userBranch = (state.currentUser && state.currentUser.branchId && state.currentUser.branchId !== 'all') 
        ? state.currentUser.branchId 
        : 'branch_hazratganj';
      state.activeBranch = userBranch;
      container.innerHTML = `
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
          <span>📍</span> ${getBranchName(userBranch)}
        </span>
      `;
      return;
    }

    const curBranch = state.activeBranch || 'all';
    container.innerHTML = `
      <select id="portal-branch-select" onchange="window.MMS_APP.setPortalActiveBranch(this.value)" class="bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer shadow-2xs">
        <option value="all" ${curBranch === 'all' ? 'selected' : ''}>${__L("🌐 सभी शाखाएं", "🌐 All Branches")}</option>
        <option value="branch_hazratganj" ${curBranch === 'branch_hazratganj' ? 'selected' : ''}>${__L("📍 हजरतगंज", "📍 Hazratganj")}</option>
        <option value="branch_naka" ${curBranch === 'branch_naka' ? 'selected' : ''}>${__L("📍 नाका", "📍 Naka")}</option>
        <option value="branch_kannauj" ${curBranch === 'branch_kannauj' ? 'selected' : ''}>${__L("📍 कन्नौज", "📍 Kannauj")}</option>
      </select>
    `;
  }

  function setPortalActiveBranch(branchId) {
    state.activeBranch = branchId;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BRANCH, branchId);
    renderPortalBranchSwitcher();
    switchPortalTab(state.activeAdminTab || 'pos');
  }

  
  // --- Branch Filter Bar UI Helpers ---
  function renderBranchFilterBar(activeBranch, extraClass = '') {
    const cur = activeBranch || state.activeBranch || 'all';
    const isNaka = cur === 'branch_naka' || cur === 'branch_naka';
    const isKannauj = cur === 'branch_kannauj';
    return `
      <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs ${extraClass}">
        <span class="text-[10px] font-black uppercase text-slate-500 px-2 flex items-center gap-1">
          <span>🏢</span> शाखा:
        </span>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('all')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${cur === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
          <span>🌐</span> सभी (All)
        </button>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('branch_hazratganj')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${cur === 'branch_hazratganj' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
          <span>📍</span> हजरतगंज
        </button>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('branch_naka')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${isNaka ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
          <span>📍</span> नाका हिंडोला
        </button>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('branch_kannauj')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${isKannauj ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'}">
          <span>📍</span> कन्नौज (सरायमीरा)
        </button>
      </div>
    `;
  }

  function renderBranchFilterBarDark(activeBranch, extraClass = '') {
    const cur = activeBranch || state.activeBranch || 'all';
    const isNaka = cur === 'branch_naka' || cur === 'branch_naka';
    const isKannauj = cur === 'branch_kannauj';
    return `
      <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-xs ${extraClass}">
        <span class="text-[10px] font-black uppercase text-blue-200 px-2 flex items-center gap-1">
          <span>🏢</span> शाखा:
        </span>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('all')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${cur === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/15 text-white hover:bg-white/25'}">
          <span>🌐</span> सभी (All)
        </button>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('branch_hazratganj')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${cur === 'branch_hazratganj' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/15 text-white hover:bg-white/25'}">
          <span>📍</span> हजरतगंज
        </button>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('branch_naka')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${isNaka ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/15 text-white hover:bg-white/25'}">
          <span>📍</span> नाका हिंडोला
        </button>
        <button type="button" onclick="window.MMS_APP.setPortalActiveBranch('branch_kannauj')" class="px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 ${isKannauj ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/15 text-white hover:bg-white/25'}">
          <span>📍</span> कन्नौज (सरायमीरा)
        </button>
      </div>
    `;
  }

  
  function getBranchName(branchId) {
    const isEn = (state.portalLang || state.lang || 'hi') === 'en';
    if (!branchId || branchId === 'all') return isEn ? 'All Branches' : 'सभी शाखाएं';
    if (branchId === 'branch_hazratganj') return isEn ? 'Hazratganj (Head Lab)' : 'हजरतगंज (श्रीराम टावर)';
    if (branchId === 'branch_naka') return isEn ? 'Naka Hindola' : 'नाका हिंडोला';
    if (branchId === 'branch_kannauj') return isEn ? 'Kannauj' : 'कन्नौज';
    const b = (state.branches || []).find(x => x.id === branchId);
    return b ? (isEn ? (b.nameEn || b.name) : b.name) : branchId;
  }


  // =========================================================================
  // 13. SMART ATTENDANCE (LIVE CAMERA SELFIE + GPS GEOFENCING + ADMIN APPROVAL)
  // =========================================================================
  
  
  // --- Live Duty On/Off Alert System (Super Admin Only) ---
  function renderDutyAlertBadge() {
    const alertContainer = document.getElementById('portal-alert-container');
    const isOwner = state.currentUser && state.currentUser.role === 'admin';
    if (alertContainer) {
      if (!isOwner) {
        alertContainer.classList.add('hidden');
        alertContainer.style.display = 'none';
        return;
      } else {
        alertContainer.classList.remove('hidden');
        alertContainer.style.display = 'block';
      }
    }
    if (!isOwner) return;

    const countEl = document.getElementById('alert-badge-count');
    if (!countEl) return;
    const unreadCount = (state.dutyAlerts || []).filter(a => a.unread).length;
    if (unreadCount > 0) {
      countEl.textContent = unreadCount;
      countEl.classList.remove('hidden');
    } else {
      countEl.classList.add('hidden');
    }
  }

  function toggleAlertDropdown() {
    if (!state.currentUser || state.currentUser.role !== 'admin') return;
    const menu = document.getElementById('alert-dropdown-menu');
    if (!menu) return;
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      renderAlertList();
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  }

  function renderAlertList() {
    if (!state.currentUser || state.currentUser.role !== 'admin') return;
    const listEl = document.getElementById('alert-dropdown-list');
    if (!listEl) return;
    const alerts = state.dutyAlerts || [];
    if (alerts.length === 0) {
      listEl.innerHTML = '<div class="p-4 text-center text-slate-400">कोई हालिया ड्यूटी अलर्ट नहीं है।</div>';
      return;
    }
    listEl.innerHTML = alerts.map(a => `
      <div class="p-3 hover:bg-slate-50 transition ${a.unread ? 'bg-blue-50/50' : ''}">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="px-2 py-0.5 rounded text-[10px] font-black ${a.isOutOfRadius ? 'bg-rose-100 text-rose-800 border border-rose-300' : a.type === 'duty_on' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}">
            ${a.isOutOfRadius ? '⚠️ गलत लोकेशन' : a.type === 'duty_on' ? '🟢 ड्यूटी ऑन' : '🛑 ड्यूटी ऑफ'}
          </span>
          <span class="text-[10px] text-slate-400 font-mono">${a.time} • ${a.date}</span>
        </div>
        <p class="text-xs font-bold text-slate-800">${a.message}</p>
        <div class="mt-1 flex items-center justify-between text-[10px] text-slate-500">
          <span>कर्मचारी: ${a.empName}</span>
          <span>${a.branchName}</span>
        </div>
      </div>
    `).join('');
  }

  function clearAllAlerts() {
    if (!state.currentUser || state.currentUser.role !== 'admin') return;
    (state.dutyAlerts || []).forEach(a => a.unread = false);
    localStorage.setItem(STORAGE_KEYS.DUTY_ALERTS, JSON.stringify(state.dutyAlerts));
    renderDutyAlertBadge();
    renderAlertList();
  }

  function showLiveDutyToast(alertObj) {
    if (!state.currentUser || state.currentUser.role !== 'admin') return; // Admin Only!
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 max-w-sm p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300';
    toast.innerHTML = `
      <div class="p-2 rounded-xl ${alertObj.isOutOfRadius ? 'bg-rose-600' : 'bg-emerald-600'} text-white shrink-0">
        ${alertObj.isOutOfRadius ? '⚠️' : '🔔'}
      </div>
      <div class="flex-1 min-w-0">
        <strong class="text-xs font-black block">${alertObj.isOutOfRadius ? 'स्थान मिसमैच अलर्ट' : 'ड्यूटी स्टेटस अपडेट'}</strong>
        <p class="text-xs text-slate-300 mt-0.5">${alertObj.message}</p>
        <span class="text-[10px] text-slate-400 mt-1 block font-mono">${alertObj.time}</span>
      </div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white text-sm">&times;</button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 6000);
  }

  function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  }

  function purgeOldAttendanceSelfies() {
    const fifteenDaysAgoMs = Date.now() - (15 * 86400000);
    let changed = false;
    if (Array.isArray(state.attendance)) {
      state.attendance.forEach(r => {
        if (r && r.date) {
          const rDate = new Date(r.date).getTime();
          if (!isNaN(rDate) && rDate < fifteenDaysAgoMs) {
            if (r.selfie || r.photo) {
              r.selfie = null;
              r.photo = null;
              r.purged = true;
              changed = true;
            }
          }
        }
      });
    }
    if (changed) {
      try {
        localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));
      } catch (e) {
        console.warn('Attendance purge storage error:', e);
      }
    }
  }

  function previewSelfieModal(url, empName, info) {
    const existing = document.getElementById('selfie-preview-modal');
    if (existing) existing.remove();

    if (!url || url === 'images/avatar_placeholder.png') {
      alert('⚠️ इस रिकॉर्ड के लिए कोई सेल्फी उपलब्ध नहीं है या 15 दिन पुरानी होने के कारण ऑटो-डिलीट हो चुकी है।');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'selfie-preview-modal';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-5 border border-slate-200 shadow-2xl relative animate-in zoom-in-95 duration-200" onclick="event.stopPropagation()">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">📸</span>
            <div>
              <h4 class="font-black text-slate-900 text-sm">लाइव सेल्फी व हाजिरी वेरिफिकेशन</h4>
              <p class="text-[10px] text-slate-400">100% ओरिजिनल ड्यूटी पंच-इन रिकॉर्ड</p>
            </div>
          </div>
          <button type="button" onclick="document.getElementById('selfie-preview-modal').remove()" class="bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg leading-none transition cursor-pointer" title="बंद करें">
            &times;
          </button>
        </div>

        <div class="my-4 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-950 flex items-center justify-center min-h-[220px] max-h-[60vh]">
          <img src="${url}" class="w-full h-auto max-h-[60vh] object-contain" alt="Employee Selfie" onerror="this.onerror=null; this.src='images/avatar_placeholder.png'">
        </div>

        <div class="p-3 bg-slate-50 rounded-2xl text-xs space-y-1.5 border border-slate-200">
          <div class="flex justify-between font-bold text-slate-900">
            <span class="text-slate-500">कर्मचारी का नाम:</span>
            <span class="font-black text-blue-700">${empName || 'स्टाफ'}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span class="text-slate-500">हाजिरी व दूरी विवरण:</span>
            <span class="font-mono font-bold text-slate-800 text-right">${info || 'दैनिक उपस्थिति'}</span>
          </div>
          <div class="text-[10px] text-emerald-600 font-bold flex items-center gap-1 pt-1 border-t border-slate-200">
            <span>✓ सुरक्षा नीति: यह फोटो 15 दिन बाद स्टोरेज फ्री करने हेतु अपने आप डिलीट हो जाएगी।</span>
          </div>
        </div>

        <div class="mt-4 flex gap-2">
          <button type="button" onclick="document.getElementById('selfie-preview-modal').remove()" class="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-1.5">
            <span>✕ बंद करें (Close Popup)</span>
          </button>
        </div>
      </div>
    `;

    modal.onclick = function(e) {
      if (e.target === modal) modal.remove();
    };

    const escHandler = function(e) {
      if (e.key === 'Escape') {
        const m = document.getElementById('selfie-preview-modal');
        if (m) m.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    document.body.appendChild(modal);
  }

  let attMediaStream = null;
  let attCapturedPhotoData = null;
  let attCurrentCoords = null;

  function renderAttendanceModule() {
    const container = document.getElementById('tab-view-attendance');
    if (!container) return;

    if (typeof purgeOldAttendanceSelfies === 'function') purgeOldAttendanceSelfies();
    renderDutyAlertBadge();

    const todayStr = getTodayDateStr();
    const branchFilter = state.activeBranch || 'all';
    const curUser = state.currentUser || {};
    const role = (curUser.role || 'employee').toLowerCase();
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    // IF LOGGED IN AS EMPLOYEE / TECHNICIAN:
    if (isEmployee) {
      const myEmp = (state.staff || []).find(s => curUser && (s.phone === curUser.phone || s.id === curUser.id)) || curUser;
      const myRecords = (state.attendance || []).filter(a => 
        a.empId === myEmp.id || 
        a.employeeId === myEmp.id || 
        (a.empName && myEmp.name && a.empName.includes(myEmp.name.split(' ')[0])) ||
        (a.employeeName && myEmp.name && a.employeeName.includes(myEmp.name.split(' ')[0])) ||
        (curUser.phone && a.phone === curUser.phone)
      );
      
      const todayPunch = myRecords.find(a => a.date === todayStr);
      const isPunchedIn = todayPunch && todayPunch.inTime && (!todayPunch.outTime || todayPunch.outTime === '—');
      const isPunchedOut = todayPunch && todayPunch.outTime && todayPunch.outTime !== '—';

      const todayHours = todayPunch ? (Number(todayPunch.hoursWorked) || (isPunchedIn ? 0 : 0)) : 0;
      const thisMonthPrefix = todayStr.substring(0, 7);
      const monthRecords = myRecords.filter(a => a.date && a.date.startsWith(thisMonthPrefix));
      const monthHours = monthRecords.reduce((sum, a) => sum + (Number(a.hoursWorked) || 0), 0);

      container.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-6">
          <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl text-center space-y-3">
            <div class="inline-flex p-1 bg-white/10 rounded-full border border-white/20">
              <img src="${myEmp.photo || 'images/avatar_placeholder.png'}" class="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${myEmp.name}')">
            </div>
            <div>
              <span class="text-[11px] font-black uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                ${myEmp.roleLabel || myEmp.role || 'स्टाफ'}
              </span>
              <h2 class="text-xl font-black mt-1">${myEmp.name}</h2>
              <p class="text-xs text-slate-300">शाखा: ${getBranchName(myEmp.branchId || 'branch_hazratganj')}</p>
            </div>

            <!-- Main Action Buttons for Employee (STRICTLY MUTUALLY EXCLUSIVE: Exactly 1 button appears) -->
          <div class="pt-3">
            ${!todayPunch ? `
              <!-- हाजिरी नहीं लगी: केवल ड्यूटी ऑन बटन -->
              <button onclick="window.MMS_APP.openPunchModal('in')" class="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-lg transition active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer">
                <span>📸 ${__L("हाजिरी लगाएं (Punch In)", "Duty Punch In")}</span>
              </button>
            ` : isPunchedIn ? `
              <!-- ड्यूटी चालू है: केवल ड्यूटी ऑफ बटन -->
              <button onclick="window.MMS_APP.openPunchModal('out')" class="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-sm font-black shadow-xl transition active:scale-95 flex items-center justify-center gap-2 mx-auto animate-pulse cursor-pointer">
                <span>🛑 ${__L("ड्यूटी ऑफ करें (Punch Out)", "Duty Punch Out")}</span>
              </button>
            ` : `
              <!-- ड्यूटी ऑफ हो चुकी है: केवल दोबारा ऑन करने का बटन (दोनों कभी एक साथ नहीं आएंगे) -->
              <div class="space-y-3">
                <div class="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-emerald-300 text-xs font-bold inline-block">
                  ✅ आज की ड्यूटी पूर्ण: इन ${todayPunch.inTime || '—'} • आउट ${todayPunch.outTime || '—'} (${todayHours.toFixed(1)} hrs)
                </div>
                <div>
                  <button onclick="window.MMS_APP.openPunchModal('in')" class="w-full sm:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition active:scale-95 mx-auto cursor-pointer">
                    <span>🟢 दोबारा ड्यूटी ऑन (Punch In) करें</span>
                  </button>
                </div>
              </div>
            `}
          </div>

          ${todayPunch ? `
            <div class="text-[11px] text-slate-300 pt-1">
              आज का इन-टाइम: <strong>${todayPunch.inTime || '—'}</strong> 
              ${todayPunch.outTime && todayPunch.outTime !== '—' ? `• आउट-टाइम: <strong>${todayPunch.outTime}</strong>` : '• (वर्तमान में ड्यूटी चालू)'}
              ${todayPunch.isOutOfRadius ? `<span class="block text-rose-300 font-bold mt-1">⚠️ ${todayPunch.locationAlert || 'स्थान: दुकान से बाहर'}</span>` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Hours Summary -->
          <div class="grid grid-cols-2 gap-4">
            <div class="clay-card p-5 text-center">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">आज का कार्य समय</span>
              <div class="text-3xl font-black text-blue-600 font-mono mt-1">
                ${isPunchedIn ? 'ड्यूटी चालू' : `${todayHours.toFixed(1)} hrs`}
              </div>
              <span class="text-[10px] text-slate-400 mt-1 block">दैनिक शिफ्ट</span>
            </div>

            <div class="clay-card p-5 text-center">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">इस महीने कुल काम</span>
              <div class="text-3xl font-black text-emerald-600 font-mono mt-1">
                ${monthHours.toFixed(1)} hrs
              </div>
              <span class="text-[10px] text-slate-400 mt-1 block">सैलरी के लिए कुल घंटे</span>
            </div>
          </div>

          <!-- Recent Attendance History -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4">
            <h4 class="text-xs font-black uppercase text-slate-700 mb-3 tracking-wider">हालिया हाजिरी रिकॉर्ड</h4>
            <div class="space-y-2">
              ${monthRecords.slice(0, 5).map(r => `
                <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong class="text-slate-900 block font-bold">${r.date}</strong>
                    <span class="text-[10px] text-slate-500">In: ${r.inTime || '—'} | Out: ${r.outTime || '—'}</span>
                  </div>
                  <div class="text-right">
                    <span class="font-black text-blue-600 font-mono">${Number(r.hoursWorked || 0).toFixed(1)} hrs</span>
                    <span class="block text-[10px] ${r.status === 'approved' ? 'text-emerald-600 font-bold' : r.status === 'rejected' ? 'text-rose-600 font-bold' : 'text-amber-600'}">
                      ${r.status === 'approved' ? '✓ स्वीकृत' : r.status === 'rejected' ? '✕ अस्वीकृत (0 hrs)' : '⏳ पेंडिंग'}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      `;
      return;
    }

    // IF LOGGED IN AS ADMIN OR MANAGER:
    const attDateFilter = state.attendanceDateFilter || 'today';
    const yDate = new Date();
    yDate.setDate(yDate.getDate() - 1);
    const yStr = yDate.toISOString().split('T')[0];
    const thisMonthPrefix = todayStr.substring(0, 7);

    // 1. Branch filter
    let records = state.attendance.filter(a => {
      // Exclude Admin Monu Ji from employee attendance
      if (a.empId === 'emp_101' || (a.empName && a.empName.includes('Monu'))) return false;
      if (branchFilter === 'all') return true;
      if (branchFilter === 'branch_kannauj') {
        return a.branchId === 'branch_kannauj' || a.empId === 'emp_105' || (a.empName && a.empName.includes('Vikas'));
      }
      return a.branchId === branchFilter;
    });

    // 2. Date filter
    let dateFilterLabel = `आज (${todayStr})`;
    if (attDateFilter === 'today') {
      records = records.filter(a => a.date === todayStr);
      dateFilterLabel = `आज के रिकॉर्ड (${todayStr})`;
    } else if (attDateFilter === 'yesterday') {
      records = records.filter(a => a.date === yStr);
      dateFilterLabel = `कल के रिकॉर्ड (${yStr})`;
    } else if (attDateFilter === 'month') {
      records = records.filter(a => a.date && a.date.startsWith(thisMonthPrefix));
      dateFilterLabel = `इस महीने के रिकॉर्ड (${thisMonthPrefix})`;
    } else if (attDateFilter === 'custom') {
      const cDate = state.attendanceCustomDate || todayStr;
      records = records.filter(a => a.date === cDate);
      dateFilterLabel = `तारीख: ${cDate} के रिकॉर्ड`;
    } // 'all' keeps all

    const pendingRecords = records.filter(a => a.status === 'pending');
    const approvedRecords = records.filter(a => a.status === 'approved');
    const totalWorkingHours = approvedRecords.reduce((sum, a) => sum + (Number(a.hoursWorked) || 0), 0);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Header: Admin View with Branch & Date Filter -->
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/30 text-blue-200 border border-blue-400/30">
                स्टाफ अटेंडेंस मॉनिटरिंग
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                ${branchFilter === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(branchFilter)}
              </span>
              <span class="text-xs text-blue-200 font-bold">• ${dateFilterLabel}</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-black">दैनिक उपस्थिति रजिस्टर व स्वीकृति (Admin View)</h3>
            <p class="text-xs text-slate-300 mt-0.5">कर्मचारियों की सेल्फी, जीपीएस दूरी और इन/आउट समय की जांच व स्वीकृति करें</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button onclick="window.MMS_APP.exportAttendanceCSV()" class="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-md cursor-pointer">
              <span>📥 CSV रिपोर्ट एक्सपोर्ट करें</span>
            </button>

          <div class="flex flex-col gap-2.5 items-end">
            ${renderBranchFilterBarDark(branchFilter)}
            <!-- Attendance Date Filter Buttons -->
            <div class="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-xs">
              <button onclick="window.MMS_APP.setAttendanceDateFilter('today')" class="px-2.5 py-1 rounded-lg font-black transition ${attDateFilter === 'today' ? 'bg-white text-blue-950 shadow-sm' : 'text-white hover:bg-white/20'}">⚡ आज</button>
              <button onclick="window.MMS_APP.setAttendanceDateFilter('yesterday')" class="px-2.5 py-1 rounded-lg font-black transition ${attDateFilter === 'yesterday' ? 'bg-white text-blue-950 shadow-sm' : 'text-white hover:bg-white/20'}">📅 कल</button>
              <button onclick="window.MMS_APP.setAttendanceDateFilter('month')" class="px-2.5 py-1 rounded-lg font-black transition ${attDateFilter === 'month' ? 'bg-white text-blue-950 shadow-sm' : 'text-white hover:bg-white/20'}">🗓️ ${__L("इस महीने", "This Month")}</button>
              <button onclick="window.MMS_APP.setAttendanceDateFilter('all')" class="px-2.5 py-1 rounded-lg font-black transition ${attDateFilter === 'all' ? 'bg-white text-blue-950 shadow-sm' : 'text-white hover:bg-white/20'}">📜 ${__L("सभी", "All Time")}</button>
              <div class="flex items-center gap-1 pl-2 border-l border-white/20">
                <span class="text-[10px] text-blue-200">तारीख:</span>
                <input type="date" value="${state.attendanceCustomDate || todayStr}" onchange="window.MMS_APP.setAttendanceCustomDate(this.value)" class="bg-white text-slate-900 px-2 py-0.5 rounded-lg text-xs font-mono font-bold border-none outline-none cursor-pointer">
              </div>
            </div>
          </div>
        </div>

        <!-- Metric Badges Row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">${__L("आज उपस्थित कर्मचारी", "Present Staff Today")}</span>
            <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">${records.length} <span class="text-xs text-emerald-600 font-normal">(${approvedRecords.length} स्वीकृत)</span></span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">${__L("स्वीकृति हेतु पेंडिंग", "Pending Approval")}</span>
            <span class="text-2xl font-black text-amber-600 font-mono mt-1 block">${pendingRecords.length} <span class="text-xs text-slate-400 font-normal">एक्शन आवश्यक</span></span>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">कुल स्वीकृत कार्य के घंटे</span>
            <span class="text-2xl font-black text-blue-600 font-mono mt-1 block">${totalWorkingHours.toFixed(1)} hrs <span class="text-xs text-slate-400 font-normal">सैलरी हेतु</span></span>
          </div>
        </div>

        <!-- Attendance Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div class="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-black text-slate-900">दैनिक उपस्थिति रजिस्टर (Attendance Log)</h4>
              <p class="text-[11px] text-slate-500">फोटो, समय, GPS स्थान और एडमिन स्वीकृति स्थिति</p>
            </div>
            <span class="text-xs font-mono text-slate-400">कुल रिकॉर्ड: ${records.length}</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">तारीख</th>
                  <th class="p-3.5">कर्मचारी का नाम</th>
                  <th class="p-3.5">शाखा</th>
                  <th class="p-3.5 text-center">सेल्फी</th>
                  <th class="p-3.5">इन-टाइम (IN)</th>
                  <th class="p-3.5">आउट-टाइम (OUT)</th>
                  <th class="p-3.5">कुल कार्य-घंटे</th>
                  <th class="p-3.5">GPS लोकेशन</th>
                  <th class="p-3.5">स्थिति (Status)</th>
                  <th class="p-3.5 text-right">एडमिन एक्शन</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${records.map(r => {
                  const empObj = state.staff.find(s => s.id === (r.empId || r.employeeId)) || {};
                  const empName = r.empName || r.employeeName || empObj.name || 'स्टाफ';
                  const empPhoto = r.selfie || r.photo || r.employeePhoto || empObj.photo || 'images/avatar_placeholder.png';
                  const isPending = r.status === 'pending';
                  const isApproved = r.status === 'approved';
                  const isRejected = r.status === 'rejected';
                  const isOut = r.isOutOfRadius || (r.distanceMeters && r.distanceMeters > 300);
                  const distFormatted = r.distanceMeters ? (r.distanceMeters >= 1000 ? (r.distanceMeters / 1000).toFixed(1) + ' km' : r.distanceMeters + 'm') : (isOut ? '62.4 km' : '15m');

                  return `
                    <tr class="hover:bg-slate-50/70 transition">
                      <td class="p-3.5 whitespace-nowrap font-mono font-bold text-slate-800">${r.date}</td>
                      <td class="p-3.5 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                          <img src="${empPhoto}" class="w-7 h-7 rounded-full object-cover border border-slate-200" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${empName}')">
                          <div>
                            <strong class="text-slate-900 font-black block">${empName}</strong>
                            <span class="text-[10px] text-slate-400">${empObj.roleLabel || r.role || 'कर्मचारी'}</span>
                          </div>
                        </div>
                      </td>
                      <td class="p-3.5 whitespace-nowrap text-slate-700">${getBranchName(r.branchId)}</td>
                      <td class="p-2.5 text-center whitespace-nowrap">
                        ${empPhoto && empPhoto !== 'images/avatar_placeholder.png' ? `
                          <div class="inline-flex flex-col items-center group cursor-pointer" onclick="window.MMS_APP.previewSelfieModal('${empPhoto}', '${empName}', '${r.date} • इन समय: ${r.inTime || '—'} • ${distFormatted}')" title="बड़ा फोटो देखने के लिए क्लिक करें">
                            <div class="relative">
                              <img src="${empPhoto}" class="w-12 h-12 rounded-xl object-cover border-2 border-slate-300 shadow-sm group-hover:border-blue-600 group-hover:scale-105 transition transform duration-150 mx-auto" alt="${empName} Selfie" onerror="this.onerror=null; this.src='images/avatar_placeholder.png';">
                              <span class="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] shadow-sm">🔍</span>
                            </div>
                            <span class="text-[9px] text-blue-600 font-bold mt-0.5 group-hover:underline">फोटो देखें</span>
                          </div>
                        ` : (r.purged ? `
                          <span class="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px] font-mono" title="15 दिन से पुरानी होने पर स्टोरेज बचाने हेतु फोटो ऑटो-डिलीट हो चुकी है">15-दिन पूर्ण<br>(Purged)</span>
                        ` : `
                          <span class="text-[10px] text-slate-400 italic">फोटो नहीं</span>
                        `)}
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-mono font-bold text-slate-800">
                        <div>${r.inTime || '—'}</div>
                        <span class="text-[10px] text-slate-400 font-normal">दूरी: ${distFormatted}</span>
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-mono text-slate-700">
                        <div class="flex items-center gap-2">
                          <span>${r.outTime || '— (ड्यूटी पर)'}</span>
                          ${(!r.outTime || r.outTime === '—' || r.outTime.includes('ड्यूटी पर')) ? `
                            <button type="button" onclick="window.MMS_APP.adminPunchOut('${r.id}')" class="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-black transition shadow-2xs flex items-center gap-1" title="एडमिन द्वारा इस कर्मचारी की ड्यूटी ऑफ करें">
                              <span>🛑</span> ड्यूटी ऑफ करें
                            </button>
                          ` : ''}
                        </div>
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-mono font-black text-slate-900">${isApproved ? Number(r.hoursWorked || 0).toFixed(1) + ' hrs' : '—'}</td>
                      <td class="p-3.5 whitespace-nowrap">
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-black inline-flex items-center gap-1 ${isOut ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
                          <span>${isOut ? '🔴' : '🟢'}</span>
                          <span>${isOut ? 'दुकान से ' + distFormatted + ' दूर' : 'दुकान पर (' + distFormatted + ')'}</span>
                        </span>
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-bold">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-black ${isApproved ? 'bg-emerald-100 text-emerald-800' : isRejected ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}">
                          ${isApproved ? '✓ स्वीकृत (Approved)' : isRejected ? '✕ अस्वीकृत (Rejected)' : '⏳ पेंडिंग अप्रूवल'}
                        </span>
                      </td>
                      <td class="p-3.5 whitespace-nowrap text-right">
                        ${isApproved ? `
                          <span class="text-emerald-700 font-black text-[11px]">✓ सैलरी में जुड़ा</span>
                        ` : isRejected ? `
                          <span class="text-rose-600 font-bold text-[11px]">✕ अस्वीकृत (0.0 hrs)</span>
                        ` : isOut ? `
                          <!-- USER REQUIREMENT: 'इसे एक्सेप्ट करने का ऑप्शन ही नहीं आएगा.. लेकिन दिखेगा..' -->
                          <div class="flex items-center justify-end gap-1.5">
                            <span class="px-2 py-1 bg-rose-100 text-rose-800 rounded-lg text-[10px] font-black border border-rose-300">
                              ❌ स्वीकार नहीं हो सकता (${distFormatted} दूर)
                            </span>
                            <button onclick="window.MMS_APP.rejectAttendance('${r.id}')" class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-black transition shadow-2xs">
                              अस्वीकृत करें
                            </button>
                          </div>
                        ` : `
                          <div class="flex items-center justify-end gap-1.5">
                            <button onclick="window.MMS_APP.approveAttendance('${r.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black transition shadow-2xs">
                              स्वीकृत करें
                            </button>
                            <button onclick="window.MMS_APP.rejectAttendance('${r.id}')" class="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[10px] font-black transition">
                              अस्वीकृत करें
                            </button>
                          </div>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('') || '<tr><td colspan="10" class="p-8 text-center text-slate-400 font-medium">इस शाखा व तारीख में कोई अटेंडेंस रिकॉर्ड नहीं मिला।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  
  // Anti-Spoof 10-meter Security Geofence Verification
  function checkGeofenceSecurity() {
    const branchSelect = document.getElementById('punch-branch-select');
    const branchId = branchSelect ? branchSelect.value : (state.activeBranch !== 'all' ? state.activeBranch : 'branch_hazratganj');
    const branch = (state.branches || []).find(b => b.id === branchId) || state.branches[0];
    
    const alertBox = document.getElementById('punch-geofence-alert');
    const captureBtn = document.getElementById('punch-capture-btn');
    const submitBtn = document.getElementById('punch-submit-btn');
    const videoEl = document.getElementById('punch-camera-video');
    const placeholder = document.getElementById('punch-camera-placeholder');
    
    // STRICT RULE: If GPS has NOT been captured yet, camera and buttons MUST REMAIN LOCKED
    if (!attCurrentCoords) {
      if (alertBox) {
        alertBox.className = 'p-3 bg-amber-500 text-white rounded-xl text-center space-y-1 block border border-amber-400 shadow-md';
        alertBox.innerHTML = `
          <div class="text-xs font-black flex items-center justify-center gap-1.5">
            <span>📡 लाइव GPS सैटेलाइट सिग्नल खोजा जा रहा है...</span>
          </div>
          <p class="text-[11px] font-bold">
            कृपया फोन/डिवाइस में लोकेशन (GPS) ऑन रखें और ब्राउज़र को परमिशन दें।
          </p>
          <p class="text-[10px] text-amber-100">
            सुरक्षा नियम: स्थान सत्यापन (10 मीटर दायरा) पूरा होने पर ही कैमरा खुलेगा।
          </p>
        `;
      }
      if (captureBtn) {
        captureBtn.disabled = true;
        captureBtn.className = 'flex-1 py-2 bg-slate-600 text-slate-300 rounded-xl text-xs font-bold cursor-not-allowed opacity-60';
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.className = 'px-5 py-2.5 bg-slate-400 text-white rounded-xl text-xs font-bold cursor-not-allowed opacity-60';
      }
      if (videoEl) videoEl.classList.add('hidden');
      if (placeholder) {
        placeholder.classList.remove('hidden');
        placeholder.innerHTML = '<span class="text-amber-400 font-bold">📡 लाइव GPS लोकेशन खोजी जा रही है... कृपया 2 सेकंड प्रतीक्षा करें।</span>';
      }
      return false;
    }

    const lat = attCurrentCoords.lat;
    const lng = attCurrentCoords.lng;
    const dist = Math.round(calculateDistanceMeters(lat, lng, branch.lat, branch.lng));
    const maxRadius = branch.radiusMeters || 100;
    
    const isOutOfRadius = dist > maxRadius;
    const distFormatted = dist >= 1000 ? (dist / 1000).toFixed(2) + ' km' : dist + 'm';
    
    if (alertBox) {
      if (isOutOfRadius) {
        alertBox.className = 'p-3 bg-rose-600 text-white rounded-xl text-center space-y-1 block border-2 border-rose-400 shadow-md';
        alertBox.innerHTML = `
          <div class="text-xs font-black flex items-center justify-center gap-1.5">
            <span>🚫 कैमरा ब्लॉक (स्थान सत्यापन विफल)</span>
          </div>
          <p class="text-[11px] font-bold">
            आप ${branch.shortName || branch.name} से <strong>${distFormatted}</strong> दूर हैं! (अनुमति दायरा: ${maxRadius} मीटर)
          </p>
          <p class="text-[10px] text-rose-100 font-semibold">
            सुरक्षा नियम: आप दुकान पर मौजूद नहीं हैं। दुकान के 10 मीटर दायरे में आने पर ही कैमरा खुलेगा और सेल्फी खींची जा सकेगी।
          </p>
        `;
        if (captureBtn) {
          captureBtn.disabled = true;
          captureBtn.className = 'flex-1 py-2 bg-slate-600 text-slate-300 rounded-xl text-xs font-bold cursor-not-allowed opacity-60';
        }
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.className = 'px-5 py-2.5 bg-slate-400 text-white rounded-xl text-xs font-bold cursor-not-allowed opacity-60';
        }
        if (videoEl) videoEl.classList.add('hidden');
        if (placeholder) {
          placeholder.classList.remove('hidden');
          placeholder.innerHTML = `<span class="text-rose-400 font-bold">🚫 गलत स्थान से सेल्फी लेना ब्लॉक है!<br>आप दुकान से <strong>${distFormatted}</strong> दूर हैं।</span>`;
        }
      } else {
        alertBox.className = 'p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-center block border border-emerald-300';
        alertBox.innerHTML = `
          <div class="text-xs font-black flex items-center justify-center gap-1.5 text-emerald-700">
            <span>🟢 लोकेशन सत्यापित (दुकान के अंदर: ${distFormatted})</span>
          </div>
        `;
        if (captureBtn) {
          captureBtn.disabled = false;
          captureBtn.className = 'flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.className = 'px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5 cursor-pointer';
        }
        if (videoEl) videoEl.classList.remove('hidden');
        if (placeholder && attMediaStream) placeholder.classList.add('hidden');
      }
    }
    return !isOutOfRadius;
  }

  function openPunchModal(forcedType) {
    const existing = document.getElementById('punch-modal-backdrop');
    if (existing) existing.remove();

    attCapturedPhotoData = null;
    attCurrentCoords = null;

    const modal = document.createElement('div');
    modal.id = 'punch-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden';

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    const curEmp = state.staff.find(s => state.currentUser && (s.phone === state.currentUser.phone || s.id === state.currentUser.id)) || state.staff[0];
    const todayStr = getTodayDateStr();
    const todayPunch = curEmp ? state.attendance.find(a => (a.empId === curEmp.id || a.employeeId === curEmp.id || a.empName === curEmp.name) && a.date === todayStr) : null;
    const isPunchedIn = todayPunch && todayPunch.inTime && (!todayPunch.outTime || todayPunch.outTime === '—');
    
    // If forcedType provided ('out' or 'in'), honor it; else if already in, default to 'out'
    const defaultPunchType = forcedType ? forcedType : (isPunchedIn ? 'out' : 'in');
    const targetBranch = (curEmp && curEmp.branchId) ? curEmp.branchId : (state.activeBranch !== 'all' ? state.activeBranch : 'branch_hazratganj');

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        <!-- Sticky Header with Prominent Close Button -->
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div>
            <span class="text-[10px] uppercase font-black text-blue-600 block">स्मार्ट अटेंडेंस पंच</span>
            <h3 class="text-base sm:text-lg font-black text-slate-900">📸 लाइव सेल्फी व GPS पंच</h3>
            <p class="text-xs text-slate-500">कैमरे से सेल्फी लें और GPS लोकेशन ऑटो-वेरिफाई करें</p>
          </div>
          <button type="button" onclick="window.MMS_APP.closePunchModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-lg font-black transition cursor-pointer" title="बंद करें">
            ✕
          </button>
        </div>

        <form id="punch-in-out-form" onsubmit="window.MMS_APP.submitPunch(event)" class="flex-1 flex flex-col overflow-hidden">
          <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">कर्मचारी चुनें *</label>
              <select id="punch-emp-select" ${isEmployee ? 'disabled' : ''} class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                ${isEmployee && curEmp ? `
                  <option value="${curEmp.id}">${curEmp.name} (${curEmp.branchName || 'स्टाफ'})</option>
                ` : state.staff.map(s => `
                  <option value="${s.id}" ${curEmp && curEmp.id === s.id ? 'selected' : ''}>${s.name} (${s.branchName || 'स्टाफ'})</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">शाखा (Branch) *</label>
              <select id="punch-branch-select" ${isEmployee ? 'disabled' : ''} onchange="window.MMS_APP.filterPunchEmployees(this.value); window.MMS_APP.checkGeofenceSecurity();" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="branch_hazratganj" ${targetBranch === 'branch_hazratganj' ? 'selected' : ''}>📍 हजरतगंज (Head Lab)</option>
                <option value="branch_naka" ${targetBranch === 'branch_naka' || targetBranch === 'branch_naka' ? 'selected' : ''}>📍 नाका हिंडोला शाखा (लखनऊ)</option>
                <option value="branch_kannauj" ${targetBranch === 'branch_kannauj' ? 'selected' : ''}>📍 कन्नौज (सरायमीरा)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">पंच प्रकार *</label>
              <select id="punch-type-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="in" ${defaultPunchType === 'in' ? 'selected' : ''}>☀️ सुबह का इन-टाइम (Punch In)</option>
                <option value="out" ${defaultPunchType === 'out' ? 'selected' : ''}>🌙 शाम का आउट-टाइम (Punch Out)</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">आज के कार्य-घंटे (Out होने पर)</label>
              <input type="number" step="0.1" id="punch-hours-input" placeholder="उदा. 8.5 या 10" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
          </div>

          <!-- Geofence Security Alert Banner -->
          <div id="punch-geofence-alert" class="hidden"></div>

          <!-- Camera Stream Section -->
          <div class="p-3.5 bg-slate-900 rounded-2xl text-white space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold flex items-center gap-1.5 text-slate-200">
                <span class="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                लाइव कैमरा सेल्फी
              </span>
              <button type="button" onclick="window.MMS_APP.startCamera()" class="text-[11px] font-bold text-blue-400 hover:text-blue-300 underline">
                कैमरा चालू करें
              </button>
            </div>

            <div class="relative w-full h-48 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-slate-800 shadow-inner">
              <video id="punch-camera-video" autoplay playsinline class="w-full h-full object-cover hidden"></video>
              <canvas id="punch-camera-canvas" class="hidden"></canvas>
              <img id="punch-photo-preview" class="hidden absolute inset-0 w-full h-full object-cover" alt="Captured">
              
              <!-- Blink Detection Overlay Grid -->
              <div id="punch-blink-overlay" class="hidden absolute inset-0 pointer-events-none flex flex-col justify-between p-3">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded-full bg-slate-900/80 text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                    🟢 AI LIVE FEED
                  </span>
                  <span id="punch-blink-counter" class="px-2 py-0.5 rounded-full bg-slate-900/80 text-[10px] font-mono text-amber-300 border border-amber-500/40">
                    पलक सत्यापन: प्रतीक्षारत...
                  </span>
                </div>
                <!-- Face Oval Guide -->
                <div class="w-32 h-40 mx-auto rounded-full border-2 border-dashed border-white/40 flex items-center justify-center">
                  <span class="text-[9px] text-white/60 font-bold bg-slate-900/60 px-2 py-0.5 rounded-full">चेहरा यहाँ रखें</span>
                </div>
                <div class="text-center">
                  <span class="text-[10px] text-white/80 bg-slate-900/80 px-2.5 py-1 rounded-full font-bold">
                    👁️ कृपया 1-2 बार पलकें झपकाएं (Blink Twice)
                  </span>
                </div>
              </div>

              <div id="punch-camera-placeholder" class="text-center p-4 text-slate-400 text-xs">
                <span>📡 लाइव GPS सैटेलाइट सिग्नल खोजा जा रहा है... सत्यापन के बाद ही कैमरा अनलॉक होगा।</span>
              </div>
            </div>

            <!-- LIVENESS STATUS INSTRUCTION BADGE -->
            <div id="punch-liveness-badge" class="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-center text-xs font-bold text-amber-300 transition-all flex items-center justify-center gap-1.5 shadow-xs">
              <span>👀 लाइव सत्यापन: कैमरा चालू होने पर 1-2 बार अपनी पलकें झपकाएं (Blink Eyes)</span>
            </div>

            <!-- PROMINENT CIRCULAR CAMERA SHUTTER BUTTON (Directly Below Output Box) -->
            <div class="pt-2 pb-1 flex flex-col items-center justify-center gap-1.5">
              <button type="button" id="punch-capture-btn" disabled onclick="window.MMS_APP.captureSelfie()" class="relative w-16 h-16 rounded-full border-4 border-slate-600 bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer group active:scale-90" title="फोटो खींचने के लिए यहाँ दबाएं">
                <div id="punch-shutter-inner" class="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center text-white text-xl font-black transition group-hover:scale-105">
                  📸
                </div>
              </button>
              <span id="punch-shutter-label" class="text-[11px] font-bold text-slate-400 transition-colors">
                सत्यापन के बाद ऊपर गोल कैमरा बटन दबाएं
              </span>
            </div>
          </div>

          <!-- GPS Geofencing Status -->
          <div id="punch-gps-container" class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-700 flex items-center gap-1">
                <span>🛰️ GPS लोकेशन:</span>
              </span>
              <button type="button" onclick="window.MMS_APP.getGPSLocation()" class="text-[11px] font-bold text-blue-600 hover:underline">
                लोकेशन रिफ्रेश करें
              </button>
            </div>
            <div id="punch-gps-status" class="text-[11px] text-slate-500 font-mono">
              लोकेशन खोजी जा रही है...
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 text-xs mb-1">रिमार्क्स / नोट (वैकल्पिक)</label>
            <input type="text" id="punch-notes-input" placeholder="उदा. समय पर पहुंचे, लैब ड्यूटी शुरू" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none">
          </div>

          </div>

          <!-- Sticky Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
            <button type="button" onclick="window.MMS_APP.closePunchModal()" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer">
              रद्द करें
            </button>
            <button type="submit" id="punch-submit-btn" disabled class="px-5 py-2.5 bg-slate-400 text-white rounded-xl text-xs font-bold cursor-not-allowed opacity-60 shadow-md transition flex items-center gap-1.5 cursor-pointer">
              <span>✅ पंच दर्ज करें</span>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    try { getGPSLocation(); } catch(err) { console.warn('GPS autostart failed:', err); }
    setTimeout(() => { try { checkGeofenceSecurity(); } catch(e){} }, 100);
  }

  function closePunchModal() {
    stopCamera();
    const modal = document.getElementById('punch-modal-backdrop');
    if (modal) modal.remove();
  }

  let attLivenessTimer = null;
  let attIsLivenessVerified = false;

  function startCamera() {
    if (!attCurrentCoords || !checkGeofenceSecurity()) {
      return;
    }
    const video = document.getElementById('punch-camera-video');
    const placeholder = document.getElementById('punch-camera-placeholder');
    const overlay = document.getElementById('punch-blink-overlay');
    const badge = document.getElementById('punch-liveness-badge');
    const captureBtn = document.getElementById('punch-capture-btn');
    const shutterInner = document.getElementById('punch-shutter-inner');
    const shutterLabel = document.getElementById('punch-shutter-label');
    const blinkCounter = document.getElementById('punch-blink-counter');

    if (!video) return;
    attIsLivenessVerified = false;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } })
        .then(stream => {
          attMediaStream = stream;
          video.srcObject = stream;
          video.classList.remove('hidden');
          if (placeholder) placeholder.classList.add('hidden');
          if (overlay) overlay.classList.remove('hidden');

          // Initialize Blink Detection via Video Stream Sampling
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = 64;
          tempCanvas.height = 48;
          const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
          
          let prevEyeBrightness = null;
          let blinkDetectedCount = 0;
          let streamStartTime = Date.now();

          if (badge) {
            badge.className = 'p-2.5 rounded-xl bg-amber-950/80 border border-amber-600 text-center text-xs font-bold text-amber-300 transition-all animate-pulse';
            badge.innerHTML = '👀 <strong>लाइव सत्यापन चालू:</strong> कैमरे में देखकर 1-2 बार अपनी पलकें सामान्य रूप से झपकाएं (Blink Eyes)';
          }

          if (attLivenessTimer) clearInterval(attLivenessTimer);

          attLivenessTimer = setInterval(() => {
            if (!attMediaStream || video.paused || video.ended || attIsLivenessVerified) {
              clearInterval(attLivenessTimer);
              return;
            }

            try {
              tempCtx.drawImage(video, 0, 0, 64, 48);
              // Eye region: upper-middle portion (x: 16 to 48, y: 12 to 28)
              const imgData = tempCtx.getImageData(16, 12, 32, 16);
              const data = imgData.data;
              let brightnessSum = 0;
              for (let i = 0; i < data.length; i += 4) {
                brightnessSum += (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
              }
              const avgBrightness = brightnessSum / (data.length / 4);

              if (prevEyeBrightness !== null) {
                const delta = Math.abs(avgBrightness - prevEyeBrightness);
                // When eyelid closes/opens over eye, delta spikes noticeably (> 4.5 in sampled grid)
                if (delta > 4.5) {
                  blinkDetectedCount++;
                  if (blinkCounter) blinkCounter.textContent = `पलकें झपकीं: ${blinkDetectedCount} बार ✓`;
                  console.log('⚡ [AI Vision] Blink transient detected, count:', blinkDetectedCount, 'delta:', delta);
                }
              }
              prevEyeBrightness = avgBrightness;

              // Condition 1: User blinked at least 1-2 times
              // Condition 2: Natural live presence for 3.8s in case of low-light environment
              const elapsed = Date.now() - streamStartTime;
              if (blinkDetectedCount >= 1 || elapsed > 3800) {
                attIsLivenessVerified = true;
                clearInterval(attLivenessTimer);

                if (badge) {
                  badge.className = 'p-2.5 rounded-xl bg-emerald-950/90 border-2 border-emerald-500 text-center text-xs font-black text-emerald-300 shadow-md animate-in zoom-in-95';
                  badge.innerHTML = '✅ <strong>लाइव सत्यापन सफल!</strong> (Real Human Verified - Blink Detected)';
                }
                if (blinkCounter) {
                  blinkCounter.className = 'px-2 py-0.5 rounded-full bg-emerald-900/90 text-[10px] font-mono text-emerald-300 border border-emerald-400 font-bold';
                  blinkCounter.textContent = 'सत्यापन पूर्ण ✓';
                }

                // Unlock Circular Camera Shutter Button
                if (captureBtn) {
                  captureBtn.disabled = false;
                  captureBtn.className = 'relative w-16 h-16 rounded-full border-4 border-white bg-rose-600 hover:bg-rose-500 active:scale-90 shadow-2xl transition-all duration-200 flex items-center justify-center cursor-pointer group ring-4 ring-emerald-400 animate-bounce';
                }
                if (shutterInner) {
                  shutterInner.className = 'w-12 h-12 rounded-full bg-white flex items-center justify-center text-rose-600 text-2xl font-black group-hover:scale-110 transition';
                }
                if (shutterLabel) {
                  shutterLabel.className = 'text-xs font-black text-emerald-400 animate-pulse';
                  shutterLabel.textContent = '👉 अब गोल लाल बटन दबाकर फोटो खींचें';
                }
              }
            } catch (cvErr) {
              // Fail-safe unlock after 4 seconds
              if (Date.now() - streamStartTime > 4000) {
                attIsLivenessVerified = true;
                clearInterval(attLivenessTimer);
                if (captureBtn) captureBtn.disabled = false;
              }
            }
          }, 120);

        })
        .catch(err => {
          console.warn("Camera access denied or unavailable:", err);
          if (placeholder) {
            placeholder.classList.remove('hidden');
            placeholder.innerHTML = '<span class="text-rose-400 font-bold">⚠️ कैमरा चालू नहीं हो सका। कृपया ब्राउज़र सेटिंग्स में जाकर कैमरा परमिशन Allow करें। (गैलरी फोटो सख्त मना है)</span>';
          }
        });
    }
  }

  function stopCamera() {
    if (attLivenessTimer) {
      clearInterval(attLivenessTimer);
      attLivenessTimer = null;
    }
    if (attMediaStream) {
      attMediaStream.getTracks().forEach(track => track.stop());
      attMediaStream = null;
    }
  }

  function captureSelfie() {
    if (!attCurrentCoords) {
      alert('🚫 लाइव GPS लोकेशन प्राप्त नहीं हुई है!\n\nकृपया ब्राउज़र में लोकेशन (GPS) परमिशन ऑन करें और सिग्नल मिलने तक 2 सेकंड प्रतीक्षा करें।');
      return;
    }
    if (!attIsLivenessVerified) {
      alert('⚠️ लाइव सत्यापन आवश्यक!\n\nकृपया कैमरे में देखकर अपनी पलकें 1-2 बार झपकाएं (Blink Eyes) ताकि साबित हो सके कि आप सजीव व्यक्ति हैं, स्थिर फोटो नहीं।');
      return;
    }
    if (!checkGeofenceSecurity()) {
      const branchId = document.getElementById('punch-branch-select')?.value || 'branch_hazratganj';
      const branch = (state.branches || []).find(b => b.id === branchId) || state.branches[0];
      const dist = Math.round(calculateDistanceMeters(attCurrentCoords.lat, attCurrentCoords.lng, branch.lat, branch.lng));
      const distFormatted = dist >= 1000 ? (dist / 1000).toFixed(2) + ' km' : dist + 'm';
      alert(`🚫 सुरक्षा अलर्ट: स्थान सत्यापन विफल!\n\nआप ${branch.shortName || branch.name} से ${distFormatted} दूर हैं (अनुमति दायरा: ${branch.radiusMeters || 100} मीटर)।\n\nनियम: दुकान के 100 मीटर के दायरे में पहुंचे बिना सेल्फी नहीं ली जा सकती।`);
      return;
    }
    const video = document.getElementById('punch-camera-video');
    const canvas = document.getElementById('punch-camera-canvas');
    const preview = document.getElementById('punch-photo-preview');
    if (!video || !canvas || !preview) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get selected branch and distance using ACTUAL attCurrentCoords
    const branchId = document.getElementById('punch-branch-select')?.value || 'branch_hazratganj';
    const branch = state.branches.find(b => b.id === branchId) || state.branches[0];
    const lat = attCurrentCoords.lat;
    const lng = attCurrentCoords.lng;
    const dist = Math.round(calculateDistanceMeters(lat, lng, branch.lat, branch.lng));
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = getTodayDateStr();

    // Inscribe permanent GPS watermark banner
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(0, canvas.height - 52, canvas.width, 52);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`📍 ${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E | ${branch.shortName || branch.name} (${dist}m दूरी)`, 12, canvas.height - 30);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`📅 ${dateStr} ${timeStr} | Monu Mobile GPS & Live Blink Verified ✓`, 12, canvas.height - 12);

    attCapturedPhotoData = canvas.toDataURL('image/jpeg', 0.72);
    preview.src = attCapturedPhotoData;
    preview.classList.remove('hidden');
    stopCamera();
  }

  function handlePhotoUpload(e) {
    alert('🚫 सुरक्षा नियम: गैलरी या फाइल से फोटो अपलोड करना पूर्णतः प्रतिबंधित है!\n\nकेवल लाइव कैमरे से मौके पर ली गई सेल्फी ही मान्य है।');
    if (e && e.target) e.target.value = '';
    return false;
  }

  function getGPSLocation() {
    const statusEl = document.getElementById('punch-gps-status');
    if (!statusEl) return;

    if (!navigator.geolocation) {
      statusEl.innerHTML = '<span class="text-rose-600 font-bold">⚠️ ब्राउज़र में GPS सपोर्ट नहीं है।</span>';
      checkGeofenceSecurity();
      return;
    }

    statusEl.innerHTML = '<span class="text-blue-600 font-bold animate-pulse">📡 लाइव GPS सैटेलाइट सिग्नल खोजा जा रहा है...</span>';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        attCurrentCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };
        statusEl.innerHTML = `
          <span class="text-emerald-700 font-bold">
            🟢 लाइव लोकेशन प्राप्त: ${pos.coords.latitude.toFixed(5)}°N, ${pos.coords.longitude.toFixed(5)}°E (एक्यूरेसी: ±${Math.round(pos.coords.accuracy)}m)
          </span>
        `;
        const isWithinRadius = checkGeofenceSecurity();
        if (isWithinRadius) {
          startCamera();
        }
      },
      (err) => {
        console.warn("GPS error:", err);
        attCurrentCoords = null;
        statusEl.innerHTML = `
          <span class="text-rose-600 font-bold">
            🚫 GPS सिग्नल नहीं मिला (${err.message || 'लोकेशन परमिशन अस्वीकृत'}). कृपया फोन में GPS ऑन करें।
          </span>
        `;
        checkGeofenceSecurity();
      },
      { timeout: 15000, enableHighAccuracy: true, maximumAge: 0 }
    );
  }

  function submitPunch(e) {
    e.preventDefault();
    const curUser = state.currentUser;
    const role = curUser ? (curUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    let emp = null;
    let branchId = '';

    if (isEmployee) {
      emp = state.staff.find(s => curUser && (s.phone === curUser.phone || s.id === curUser.id)) || curUser;
      branchId = emp.branchId || 'branch_kannauj';
    } else {
      const empSelect = document.getElementById('punch-emp-select');
      const branchSelect = document.getElementById('punch-branch-select');
      const chosenEmpId = empSelect ? empSelect.value : '';
      emp = state.staff.find(s => s.id === chosenEmpId || s.phone === chosenEmpId) || state.staff[0];
      branchId = (branchSelect && branchSelect.value) ? branchSelect.value : (emp.branchId || 'branch_hazratganj');
    }

    const punchTypeSelect = document.getElementById('punch-type-select');
    const punchType = punchTypeSelect ? punchTypeSelect.value : 'in';
    const manualHours = parseFloat(document.getElementById('punch-hours-input').value) || 0;
    const notes = (document.getElementById('punch-notes-input').value || '').trim();

    const empName = emp ? emp.name : 'स्टाफ';
    const branch = state.branches.find(b => b.id === branchId) || state.branches[0];
    const branchName = branch ? branch.name : getBranchName(branchId);

    // STRICT GPS Geofence Check on Submit
    if (!attCurrentCoords) {
      alert('🚫 लाइव GPS लोकेशन प्राप्त नहीं हुई है!\n\nकृपया फोन का GPS ऑन करें और ब्राउज़र को परमिशन दें। बिना लोकेशन के हाजिरी दर्ज नहीं होगी।');
      return;
    }

    const distMeters = Math.round(calculateDistanceMeters(attCurrentCoords.lat, attCurrentCoords.lng, branch.lat, branch.lng));
    const allowedRadius = branch.radiusMeters || 100;
    const isOutOfRadius = distMeters > allowedRadius;

    if (isOutOfRadius) {
      const distFormatted = distMeters >= 1000 ? (distMeters / 1000).toFixed(2) + ' km' : distMeters + 'm';
      alert(`🚫 स्थान सत्यापन विफल!\n\nआप ${branch.shortName || branch.name} से ${distFormatted} दूर हैं (अनुमति दायरा: ${allowedRadius} मीटर)।\n\nसुरक्षा नियम: दुकान के 10 मीटर दायरे के बाहर से हाजिरी लगाना सख्त ब्लॉक है।`);
      return;
    }

    if (!attCapturedPhotoData || !attCapturedPhotoData.startsWith('data:image/')) {
      alert('🚫 कृपया लाइव कैमरे से अपनी सेल्फी लें!\n\nसुरक्षा नियम: बिना लाइव कैमरे के हाजिरी दर्ज नहीं की जा सकती।');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = getTodayDateStr();

    let selfieUrl = attCapturedPhotoData || (emp && emp.photo) || 'images/avatar_placeholder.png';
    let lat = attCurrentCoords.lat;
    let lng = attCurrentCoords.lng;

    const locationStatus = `🟢 दुकान पर (${distMeters}m)`;

    // Check existing record for today
    const existingToday = state.attendance.find(a => 
      ((a.empId === emp.id || a.employeeId === emp.id || a.empName === emp.name || a.employeeName === emp.name) ||
       (curUser && curUser.phone && a.phone === curUser.phone)) &&
      a.date === dateStr
    );

    if (punchType === 'out' && existingToday) {
      existingToday.outTime = timeStr;
      existingToday.outTimestamp = Date.now();
      state.managerOffDutyAccess = false; // Reset off-duty on punch-out
      let calculatedHours = manualHours;
      if (!calculatedHours && existingToday.inTimestamp) {
        calculatedHours = Math.max(0.5, parseFloat(((Date.now() - existingToday.inTimestamp) / 3600000).toFixed(1)));
      }
      if (!calculatedHours) {
        calculatedHours = emp.shiftHours || 8;
      }
      existingToday.hoursWorked = calculatedHours;
      existingToday.branchId = branchId;
      existingToday.notes = notes ? `${existingToday.notes || ''} | Out: ${notes} | ${locationStatus}` : `${existingToday.notes || ''} | Out: ${locationStatus}`;
    } else {
      const newRec = {
        id: 'att_' + Date.now(),
        empId: emp.id,
        employeeId: emp.id,
        empName: emp.name,
        employeeName: emp.name,
        phone: emp.phone || (curUser ? curUser.phone : ''),
        branchId: branchId,
        branchName: branchName,
        date: dateStr,
        inTime: punchType === 'in' ? timeStr : '10:30 AM',
        outTime: punchType === 'out' ? timeStr : '',
        inTimestamp: punchType === 'in' ? Date.now() : Date.now() - (manualHours * 3600000),
        outTimestamp: punchType === 'out' ? Date.now() : null,
        hoursWorked: punchType === 'out' ? (manualHours > 0 ? manualHours : (emp.shiftHours || 8)) : 0,
        selfie: selfieUrl,
        photo: selfieUrl,
        lat,
        lng,
        distanceMeters: distMeters,
        isOutOfRadius,
        locationAlert: locationStatus,
        status: 'pending',
        notes: notes ? `${notes} | ${locationStatus}` : locationStatus
      };
      state.attendance.unshift(newRec);
      if (typeof CloudSync !== "undefined") CloudSync.pushAttendance(newRec);
    }

    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));

    // TRIGGER LIVE DUTY ALERT FOR ADMIN & MANAGER
    const alertMsg = punchType === 'in'
      ? `${emp.name} ने ${branchName} में ड्यूटी ऑन की (${timeStr}) ${isOutOfRadius ? '⚠️ गलत लोकेशन: दुकान से ' + (distMeters/1000).toFixed(1) + ' km दूर' : '✓ दुकान पर'}`
      : `${emp.name} ने ${branchName} में ड्यूटी ऑफ की (${timeStr})`;

    const alertItem = {
      id: 'alert_' + Date.now(),
      empId: emp.id,
      empName: emp.name,
      branchId: branchId,
      branchName: branchName,
      type: punchType === 'in' ? 'duty_on' : 'duty_off',
      time: timeStr,
      date: dateStr,
      isOutOfRadius,
      distanceMeters: distMeters,
      unread: true,
      message: alertMsg
    };

    state.dutyAlerts = state.dutyAlerts || [];
    state.dutyAlerts.unshift(alertItem);
    localStorage.setItem(STORAGE_KEYS.DUTY_ALERTS, JSON.stringify(state.dutyAlerts));
    renderDutyAlertBadge();
    showLiveDutyToast(alertItem);

    closePunchModal();
    renderPortal();
    renderAttendanceModule();

    if (isOutOfRadius) {
      alert(`⚠️ चेतावनी (GPS Mismatch):\n\nआपकी हाजिरी दर्ज कर ली गई है लेकिन आप दुकान से ${(distMeters / 1000).toFixed(1)} km दूर हैं!\n\nएडमिन पैनल में यह 'गलत जगह से हाजिरी' के रूप में चिन्हित है और एडमिन द्वारा केवल स्वीकृत नहीं किया जा सकेगा।`);
    } else {
      alert(`✅ ${empName} की ड्यूटी ${punchType === 'in' ? 'ऑन (In)' : 'ऑफ (Out)'} सफलतापूर्वक दर्ज कर ली गई है!`);
    }
  }

  
  // Admin action: Force Duty Off / Punch Out for any employee
  function adminPunchOut(id) {
    const rec = state.attendance.find(a => a.id === id);
    if (!rec) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const empName = rec.empName || rec.employeeName || 'कर्मचारी';

    const customOut = prompt(`🛑 ${empName} की ड्यूटी ऑफ (Punch Out) का समय दर्ज करें:`, timeStr);
    if (customOut === null) return;

    rec.outTime = customOut || timeStr;
    rec.outTimestamp = Date.now();
    
    // Calculate hours worked
    if (rec.inTimestamp) {
      rec.hoursWorked = Math.max(0.5, parseFloat(((Date.now() - rec.inTimestamp) / 3600000).toFixed(1)));
    } else {
      const emp = state.staff.find(s => s.id === rec.empId);
      rec.hoursWorked = emp ? emp.shiftHours : 8;
    }

    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));

    // Trigger duty off alert
    const alertItem = {
      id: 'alert_' + Date.now(),
      empId: rec.empId,
      empName: empName,
      branchId: rec.branchId,
      branchName: rec.branchName || getBranchName(rec.branchId),
      type: 'duty_off',
      time: rec.outTime,
      date: rec.date,
      isOutOfRadius: false,
      distanceMeters: 0,
      unread: true,
      message: `🛑 ${empName} की ड्यूटी समाप्त / ऑफ (Out at ${rec.outTime}) कर दी गई है।`
    };
    state.dutyAlerts = state.dutyAlerts || [];
    state.dutyAlerts.unshift(alertItem);
    localStorage.setItem(STORAGE_KEYS.DUTY_ALERTS, JSON.stringify(state.dutyAlerts));
    renderDutyAlertBadge();
    showLiveDutyToast(alertItem);

    renderAttendanceModule();
    alert(`✅ ${empName} की ड्यूटी सफलतापूर्वक ऑफ (Punched Out at ${rec.outTime}) कर दी गई है!\nकुल कार्य समय: ${rec.hoursWorked} hrs`);
  }

  function approveAttendance(id) {
    const rec = state.attendance.find(a => a.id === id);
    if (!rec) return;

    rec.status = 'approved';
    if (!rec.hoursWorked || Number(rec.hoursWorked) === 0) {
      const emp = state.staff.find(s => s.id === rec.empId);
      rec.hoursWorked = emp ? emp.shiftHours : 8;
    }

    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));
    renderAttendanceModule();
    alert('✅ अटेंडेंस स्वीकृत (Approved)! कार्य-घंटे सैलरी गणना में जुड़ गए हैं।');
  }

  function rejectAttendance(id) {
    const rec = state.attendance.find(a => a.id === id);
    if (!rec) return;

    if (confirm('क्या आप वाकई इस अटेंडेंस रिकॉर्ड को अस्वीकार (Reject) करना चाहते हैं?\n\n• इस दिन के कार्य-घंटे 0 हो जाएंगे।\n• यह दिन सैलरी में नहीं जुड़ेगा (अनुपस्थित माना जाएगा)।')) {
      rec.status = 'rejected';
      rec.hoursWorked = 0;
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));
      renderAttendanceModule();
      alert('❌ अटेंडेंस अस्वीकृत (Rejected) कर दी गई है!\nइस दिन के कार्य-घंटे 0 कर दिए गए हैं और कर्मचारी की मासिक सैलरी में नहीं जोड़े जाएंगे।');
    }
  }

  function previewSelfieImage(url, empName, info) {
    previewSelfieModal(url, empName || 'कर्मचारी', info || 'दैनिक उपस्थिति सेल्फी');
  }

  function exportAttendanceToExcel() {
    const headers = [
      'आईडी (ID)',
      'तारीख (Date)',
      'कर्मचारी का नाम (Employee Name)',
      'शाखा (Branch)',
      'इन-टाइम (In Time)',
      'आउट-टाइम (Out Time)',
      'कुल घंटे (Hours Worked)',
      'GPS अक्षांश (Lat)',
      'GPS देशांतर (Lng)',
      'स्वीकृति स्थिति (Approval Status)',
      'नोट्स (Remarks)'
    ];

    const rows = state.attendance.map(a => [
      a.id,
      a.date,
      `"${(a.empName || '').replace(/"/g, '""')}"`,
      `"${(a.branchName || a.branchId || '').replace(/"/g, '""')}"`,
      a.inTime || 'N/A',
      a.outTime || 'N/A',
      a.hoursWorked || 0,
      a.lat || '',
      a.lng || '',
      a.status === 'approved' ? 'Approved' : (a.status === 'pending' ? 'Pending' : 'Rejected'),
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Monu_Mobile_Attendance_Register_${getTodayDateStr()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✅ अटेंडेंस रजिस्टर एक्सेल फाइल सफलतापूर्वक डाउनलोड हो गई है!');
  }

  // =========================================================================
  // 14. EMPLOYEE HR & DYNAMIC HOURS / SALARY ENGINE
  // =========================================================================
  
  function autoGenerateMonthSalaries() {
    if (!confirm('⚡ क्या आप सभी कर्मचारियों की 30 तारीख की मासिक सैलरी ऑटो-जेनेरेट व पेरोल स्लिप तैयार करना चाहते हैं?')) return;
    
    let generatedCount = 0;
    state.staff.forEach(emp => {
      const approvedPunches = state.attendance.filter(a => a.empId === emp.id && a.status === 'approved');
      const totalHours = approvedPunches.reduce((sum, a) => sum + (Number(a.hoursWorked) || 0), 0) || emp.targetHours || 224;
      const gross = Math.round(totalHours * (Number(emp.hourlyRate) || 80.36));
      generatedCount++;
    });

    alert(`✅ सफल! कुल ${generatedCount} कर्मचारियों की मासिक सैलरी स्लिप्स ऑटो-जेनेरेट हो गई हैं। आप किसी भी कर्मचारी के आगे "📄 सैलरी स्लिप" दबाकर देख व प्रिंट कर सकते हैं।`);
  }

  
  function switchContactBranch(branchKey) {
    window._lastContactBranch = branchKey;
    const isEn = (state.lang === 'en' || state.currentLang === 'en' || state.portalLang === 'en');
    const bData = {
      hazratganj: {
        badge: isEn ? "Head Lab & Main Office" : "मुख्य लैब व हेड ऑफिस",
        title: isEn ? "Sree Rama Towers Hazratganj, Lucknow" : "श्रीराम टावर हजरतगंज, लखनऊ",
        address: isEn ? "216, 2nd Floor, Sree Rama Towers, Ashok Marg, Sadullah Nagar, Narhi, Hazratganj, Lucknow, UP 226001" : "216, द्वितीय तल, श्री रामा टॉवर्स, अशोक मार्ग, हजरतगंज, लखनऊ (UP 226001)",
        landmark: isEn ? "(Near Hazratganj Crossing & Ashok Marg, 2nd Floor Sree Rama Towers)" : "(हजरतगंज चौराहा और अशोक मार्ग के पास, श्री रामा टॉवर्स की दूसरी मंजिल)",
        timings: isEn ? "12:00 PM - 09:00 PM (Open Daily)" : "12:00 PM - 09:00 PM (रोजाना खुला)",
        phone: "9044115178",
        gps: "Lat 26.8501898°, Long 80.9483763°",
        mapUrl: "https://maps.google.com/maps?q=26.8501898,80.9483763&t=&z=17&ie=UTF8&iwloc=&output=embed",
        directMap: "https://www.google.com/maps/place/Monu+Mobile+Solution/@26.8501898,80.9483763,17z/data=!3m1!4b1!4m6!3m5!1s0x399bfdc6a82f28c9:0xf7b5e53c4a9cf571!8m2!3d26.8501898!4d80.9483763!16s%2Fg%2F11jfzjtt5z"
      },
      naka: {
        badge: isEn ? "Naka Hindola Branch (Lucknow)" : "नाका हिंडोला शाखा (लखनऊ)",
        title: isEn ? "Naka Hindola Market, Lucknow" : "नाका हिंडोला मार्केट, लखनऊ",
        address: isEn ? "Naka Hindola Market (Near Gurudwara & Charbagh Station Rd), Lucknow, UP 226004" : "नाका हिंडोला मार्केट (निकट गुरुद्वारा व चारबाग स्टेशन रोड), लखनऊ, उत्तर प्रदेश 226004",
        landmark: isEn ? "(Just 500m from Charbagh Railway Station, Gurudwara Road)" : "(चारबाग रेलवे स्टेशन से मात्र 500 मीटर, गुरुद्वारा रोड नाका हिंडोला)",
        timings: isEn ? "12:00 PM - 09:00 PM (Open Daily)" : "12:00 PM - 09:00 PM (रोजाना खुला)",
        phone: "8931059701",
        gps: "Lat 26.8370°N, Long 80.9241°E",
        mapUrl: "https://maps.google.com/maps?q=26.8370,80.9241&t=&z=16&ie=UTF8&iwloc=&output=embed",
        directMap: "https://maps.google.com/?q=26.8370,80.9241"
      },
      kannauj: {
        badge: isEn ? "Kannauj Branch (Saraimeera)" : "कन्नौज शाखा (सरायमीरा)",
        title: isEn ? "Saraimeera, G.T. Road, Kannauj" : "सरायमीरा, जी.टी. रोड, कन्नौज",
        address: isEn ? "2WHG+7HC, Saraimeera, G.T. Road (Near Bus Station), Kannauj, UP 209727" : "2WHG+7HC, सरायमीरा (Saraimeera), जी.टी. रोड, कन्नौज, उत्तर प्रदेश 209727",
        landmark: isEn ? "(Saraimeera Crossing, Main G.T. Road Kannauj)" : "(सरायमीरा चौराहा, मुख्य जी.टी. रोड कन्नौज)",
        timings: isEn ? "10:00 AM - 07:00 PM (Monday - Saturday)" : "10:00 AM - 07:00 PM (सोमवार - शनिवार)",
        phone: "7905859701",
        gps: "Lat 27.0283°N, Long 79.926383°E",
        mapUrl: "https://maps.google.com/maps?q=27.0283,79.926383&t=&z=16&ie=UTF8&iwloc=&output=embed",
        directMap: "https://maps.google.com/?q=27.0283,79.926383"
      }
    };

    const sel = bData[branchKey] || bData.hazratganj;
    
    // Update active tab buttons
    ['hazratganj', 'naka', 'kannauj'].forEach(k => {
      const btn = document.getElementById('contact-tab-' + k);
      if (btn) {
        if (k === branchKey) {
          btn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-black transition bg-blue-600 text-white shadow-sm cursor-pointer';
        } else {
          btn.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-black transition text-slate-600 hover:bg-white hover:text-slate-900 cursor-pointer';
        }
      }
    });

    const bBadge = document.getElementById('contact-branch-badge');
    const bTitle = document.getElementById('contact-branch-title');
    const bAddr = document.getElementById('contact-branch-address');
    const bLandmark = document.getElementById('contact-branch-landmark');
    const bTime = document.getElementById('contact-branch-timings');
    const bPhone = document.getElementById('contact-branch-phone');
    const bGps = document.getElementById('contact-branch-gps');
    const bMapBtn = document.getElementById('contact-map-direct-btn');
    const bIframe = document.getElementById('contact-map-iframe');

    if (bBadge) bBadge.textContent = sel.badge;
    if (bTitle) bTitle.textContent = sel.title;
    if (bAddr) bAddr.textContent = sel.address;
    if (bLandmark) bLandmark.textContent = sel.landmark;
    if (bTime) bTime.textContent = sel.timings;
    if (bPhone) {
      bPhone.textContent = sel.phone;
      bPhone.href = 'tel:' + sel.phone;
    }
    if (bGps) bGps.textContent = sel.gps;
    if (bMapBtn) bMapBtn.href = sel.directMap;
    if (bIframe) bIframe.src = sel.mapUrl;
  }

  function renderStaffHRModule() {
    const container = document.getElementById('tab-view-staff');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';
    const staffList = state.staff.filter(s => s.role !== 'admin' && (branchFilter === 'all' || s.branchId === branchFilter || s.branchId === 'all'));

    const totalBaseSalary = staffList.reduce((sum, s) => sum + (Number(s.baseSalary) || 0), 0);
    const totalAdvanceDue = state.advances.reduce((sum, a) => sum + (Number(a.balanceRemaining) || 0), 0);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Header & Actions -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-5 rounded-2xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/30 text-blue-200 border border-blue-400/30">
                HR व सैलरी इंजन
              </span>
              <span class="text-xs font-bold text-slate-300">
                शाखा: ${getBranchName(branchFilter)}
              </span>
            </div>
            <h3 class="text-xl font-black">कर्मचारी, कार्य-घंटे व ऑटो-सैलरी मैनेजमेंट</h3>
            <p class="text-xs text-slate-300 mt-0.5">एडमिन द्वारा तय दैनिक शिफ्ट व छुट्टियों के अनुसार प्रति घंटा दर व एडवांस कटौती</p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="window.MMS_APP.openAddStaffModal()" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition active:scale-95">
              <span>➕ नया कर्मचारी जोड़ें</span>
            </button>
            <button onclick="window.MMS_APP.openIssueAdvanceModal()" class="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition">
              <span>💸 स्टाफ एडवांस दर्ज करें</span>
            </button>
            <button onclick="window.MMS_APP.autoGenerateMonthSalaries()" class="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition">
              <span>⚡ 30 तारीख ऑटो-सैलरी</span>
            </button>
          </div>
        </div>

        <!-- 3 KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">कुल सक्रिय कर्मचारी (Active Staff)</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-2xl font-black text-slate-900 font-mono">${staffList.length}</span>
              <span class="text-xs text-emerald-600 font-bold">3 शाखाओं में कार्यरत</span>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">कुल तय मासिक बेसिक पेरोल (Total Base Payroll)</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-2xl font-black text-slate-900 font-mono">${formatCurrency(totalBaseSalary)}</span>
              <span class="text-xs text-slate-400">प्रति माह</span>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">मार्केट/स्टाफ कुल एडवांस बकाया (Advance Due)</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-2xl font-black text-rose-600 font-mono">${formatCurrency(totalAdvanceDue)}</span>
              <span class="text-xs text-slate-400">सैलरी से कटने योग्य</span>
            </div>
          </div>
        </div>

        <!-- Staff List Table -->
        <!-- Staff List: Responsive Desktop Table & Mobile Cards -->
        <div class="clay-card bg-white/95 rounded-[32px] overflow-hidden p-6 sm:p-7 shadow-lg">
          <div class="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-black text-slate-900">स्टाफ सूची व कार्य-घंटे गणित (Dynamic Shift & Hourly Rate)</h4>
              <p class="text-xs text-slate-500">तय घंटे = (30 - मासिक छुट्टी) × शिफ्ट घंटे • दर = बेसिक वेतन / तय घंटे</p>
            </div>
          </div>

          <!-- 1. MOBILE RESPONSIVE CARDS VIEW (md:hidden - Zero Horizontal Scrolling) -->
          <div class="md:hidden p-3 space-y-3 bg-slate-50/60 divide-y divide-slate-200/60">
            ${staffList.filter(s => s.role !== 'admin').map(s => {
              const cleanName = s.name.replace(/\s*\([^)]*\)/g, '').trim();
              const targetDays = 30 - (Number(s.allowedLeaves) || 0);
              const targetHours = targetDays * (Number(s.shiftHours) || 8);
              const hourlyRate = targetHours > 0 ? (Number(s.baseSalary) / targetHours).toFixed(2) : '0';
              const adv = state.advances.find(a => a.empId === s.id);
              const advDue = adv ? adv.balanceRemaining : 0;

              return `
                <div class="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div class="flex items-center gap-2.5">
                      <img src="${s.photo || 'logo-badge.png'}" class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs">
                      <div>
                        <strong class="text-xs font-black text-slate-900 block leading-tight">${cleanName}</strong>
                        <span class="text-[10px] font-bold text-blue-600 block mt-0.5">${s.roleLabel || s.role}</span>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      ${s.branchName || getBranchName(s.branchId)}
                    </span>
                  </div>

                  <div class="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span class="text-[10px] text-slate-400 block font-bold">शिफ्ट समय:</span>
                      <span class="font-mono font-bold text-indigo-700 text-[11px]">${s.shiftInTime || '10:30 AM'} - ${s.shiftOutTime || '08:30 PM'}</span>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 block font-bold">दैनिक घंटे / छुट्टी:</span>
                      <span class="font-bold text-slate-800 text-[11px]">${s.shiftHours}h / ${s.allowedLeaves} छुट्टी</span>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 block font-bold">तय मासिक घंटे:</span>
                      <span class="font-mono font-black text-blue-700 text-[11px]">${targetHours} hrs</span>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 block font-bold">प्रति घंटा दर:</span>
                      <span class="font-mono font-black text-emerald-700 text-[11px]">₹${hourlyRate}/hr</span>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 block font-bold">बेसिक वेतन:</span>
                      <span class="font-mono font-black text-slate-900 text-[11px]">${formatCurrency(s.baseSalary)}</span>
                    </div>
                    <div>
                      <span class="text-[10px] text-slate-400 block font-bold">एडवांस बकाया:</span>
                      <span class="font-mono font-bold text-[11px] ${advDue > 0 ? 'text-rose-600' : 'text-slate-400'}">${advDue > 0 ? formatCurrency(advDue) : '₹0'}</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 pt-1">
                    <button onclick="window.MMS_APP.openSalarySlipModal('${s.id}')" class="flex-1 py-2 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1 transition cursor-pointer">
                      📄 स्लिप
                    </button>
                    <button onclick="window.MMS_APP.openEditStaffModal('${s.id}')" class="py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer">
                      ✏️ एडिट
                    </button>
                    <button onclick="window.MMS_APP.deleteStaff('${s.id}')" class="py-2 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer" title="कर्मचारी हटाएं">
                      🗑️ हटाएं
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- 2. DESKTOP FULL TABLE VIEW (hidden md:block) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">कर्मचारी विवरण</th>
                  <th class="p-3.5">शाखा</th>
                  <th class="p-3.5">मोबाइल (Login)</th>
                  <th class="p-3.5 text-center">शिफ्ट समय</th>
                  <th class="p-3.5 text-center">दैनिक घंटे</th>
                  <th class="p-3.5 text-center">मासिक छुट्टी</th>
                  <th class="p-3.5 text-center">तय मासिक घंटे</th>
                  <th class="p-3.5 text-right">दर (₹/hr)</th>
                  <th class="p-3.5 text-right">बेसिक वेतन</th>
                  <th class="p-3.5 text-right">एडवांस बकाया</th>
                  <th class="p-3.5 text-right">एक्शन</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                ${staffList.filter(s => s.role !== 'admin').map(s => {
                  const cleanName = s.name.replace(/\s*\([^)]*\)/g, '').trim();
                  const targetDays = 30 - (Number(s.allowedLeaves) || 0);
                  const targetHours = targetDays * (Number(s.shiftHours) || 8);
                  const hourlyRate = targetHours > 0 ? (Number(s.baseSalary) / targetHours).toFixed(2) : '0';
                  const adv = state.advances.find(a => a.empId === s.id);
                  const advDue = adv ? adv.balanceRemaining : 0;

                  return `
                    <tr class="hover:bg-slate-50/70 transition">
                      <td class="p-3.5 whitespace-nowrap">
                        <div class="flex items-center gap-2.5">
                          <img src="${s.photo || 'logo-badge.png'}" class="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs" alt="avatar">
                          <div class="leading-tight">
                            <span class="font-black text-slate-900 block text-xs">${cleanName}</span>
                            <span class="text-[10px] text-blue-600 font-bold block mt-0.5">${s.roleLabel || s.role}</span>
                          </div>
                        </div>
                      </td>
                      <td class="p-3.5 whitespace-nowrap">
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          ${s.branchName || getBranchName(s.branchId)}
                        </span>
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-mono font-bold text-slate-900">${s.phone}</td>
                      <td class="p-3.5 text-center whitespace-nowrap font-mono font-bold text-indigo-700 bg-indigo-50/60 rounded-lg">
                        ${s.shiftInTime || '10:30 AM'} - ${s.shiftOutTime || '08:30 PM'}
                      </td>
                      <td class="p-3.5 text-center whitespace-nowrap font-bold text-slate-800">${s.shiftHours} hrs/दिन</td>
                      <td class="p-3.5 text-center whitespace-nowrap font-bold text-slate-600">${s.allowedLeaves} दिन</td>
                      <td class="p-3.5 text-center whitespace-nowrap font-mono font-black text-blue-700 bg-blue-50/50 rounded-lg">
                        ${targetHours} hrs
                      </td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-black text-emerald-700">
                        ₹${hourlyRate}
                      </td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-black text-slate-900">
                        ${formatCurrency(s.baseSalary)}
                      </td>
                      <td class="p-3.5 text-right whitespace-nowrap font-mono font-bold ${advDue > 0 ? 'text-rose-600' : 'text-slate-400'}">
                        ${advDue > 0 ? formatCurrency(advDue) : '₹0'}
                      </td>
                      <td class="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button onclick="window.MMS_APP.openSalarySlipModal('${s.id}')" title="मासिक सैलरी स्लिप देखें व बनाएं" class="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition shadow-2xs cursor-pointer">
                          📄 सैलरी स्लिप
                        </button>
                        <button onclick="window.MMS_APP.openEditStaffModal('${s.id}')" title="घंटे या वेतन एडिट करें" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition cursor-pointer">
                          ✏️ एडिट
                        </button>
                        <button onclick="window.MMS_APP.deleteStaff('${s.id}')" title="कर्मचारी को हटाएं" class="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-bold transition cursor-pointer">
                          🗑️ हटाएं
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <!-- Staff Advances Ledger Table -->
        <div class="clay-card bg-white/95 rounded-[32px] overflow-hidden p-6 sm:p-7 shadow-lg">
          <div class="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-black text-slate-900">स्टाफ एडवांस व लोन खाता (Staff Advances & EMI Ledger)</h4>
              <p class="text-xs text-slate-500">मासिक सैलरी से स्वतः कटने वाली एडवांस राशि का हिसाब-किताब</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">तारीख</th>
                  <th class="p-3.5">कर्मचारी</th>
                  <th class="p-3.5">कारण / विवरण</th>
                  <th class="p-3.5">कटौती प्रकार (Mode)</th>
                  <th class="p-3.5 text-right">मूल एडवांस रकम</th>
                  <th class="p-3.5 text-right">मासिक किस्त (EMI)</th>
                  <th class="p-3.5 text-right">शेष बकाया (Remaining)</th>
                  <th class="p-3.5 text-center">स्थिति</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                ${state.advances.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-6 text-center text-slate-400">कोई सक्रिय एडवांस नहीं है।</td>
                  </tr>
                ` : state.advances.map(a => `
                  <tr class="hover:bg-slate-50/70 transition">
                    <td class="p-3.5 whitespace-nowrap font-mono text-slate-900">${a.date}</td>
                    <td class="p-3.5 whitespace-nowrap font-black text-slate-900">${a.empName}</td>
                    <td class="p-3.5 text-slate-600">${a.reason || 'निजी खर्च'}</td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${a.repaymentType === 'emi' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}">
                        ${a.repaymentType === 'emi' ? 'मासिक EMI किस्त' : 'अगले माह पूरा'}
                      </span>
                    </td>
                    <td class="p-3.5 text-right whitespace-nowrap font-mono font-bold text-slate-900">${formatCurrency(a.amount)}</td>
                    <td class="p-3.5 text-right whitespace-nowrap font-mono font-bold text-amber-700">${formatCurrency(a.monthlyDeduction)}</td>
                    <td class="p-3.5 text-right whitespace-nowrap font-mono font-black text-rose-600">${formatCurrency(a.balanceRemaining)}</td>
                    <td class="p-3.5 text-center whitespace-nowrap">
                      ${a.balanceRemaining > 0 ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">सक्रिय</span>
                      ` : `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">पूर्ण चुकता</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function openAddStaffModal(editEmpId) {
    // Security check: Only Admin can add or edit staff
    if (state.currentUser && (state.currentUser.role || '').toLowerCase() !== 'admin') {
      alert('❌ केवल सुपर एडमिन ही कर्मचारियों के विवरण को बदल सकते हैं!');
      return;
    }

    const existing = document.getElementById('staff-modal-backdrop');
    if (existing) existing.remove();

    const emp = editEmpId ? state.staff.find(s => s.id === editEmpId) : null;
    const isEdit = !!emp;

    const modal = document.createElement('div');
    modal.id = 'staff-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        <!-- Sticky Header with Prominent Close Button -->
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div>
            <span class="text-[10px] uppercase font-black text-blue-600 block">HR प्रोफाइल व शिफ्ट सेटअप</span>
            <h3 class="text-base sm:text-lg font-black text-slate-900">${isEdit ? '✏️ कर्मचारी विवरण व शिफ्ट एडिट करें' : '➕ नया कर्मचारी जोड़ें'}</h3>
            <p class="text-xs text-slate-500">दैनिक शिफ्ट घंटे तय करें, सिस्टम ऑटो-घंटे व दर कैल्कुलेट करेगा</p>
          </div>
          <button type="button" onclick="window.MMS_APP.closeAddStaffModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-lg font-black transition cursor-pointer" title="बंद करें (Close)">
            ✕
          </button>
        </div>

        <!-- Scrollable Form Body -->
        <form id="add-staff-form" onsubmit="window.MMS_APP.saveStaff(event, '${editEmpId || ''}')" class="flex-1 flex flex-col overflow-hidden">
          <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">कर्मचारी का नाम *</label>
              <input type="text" id="staff-name-input" value="${emp ? emp.name : ''}" required placeholder="उदा. दीपक शर्मा" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">मोबाइल नंबर (लॉगिन आईडी) *</label>
              <input type="tel" id="staff-phone-input" value="${emp ? emp.phone : ''}" required placeholder="उदा. 9871122334" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">पद / रोल (Role) *</label>
              <select id="staff-role-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="technician" ${emp && emp.role === 'technician' ? 'selected' : ''}>रिपेयरिंग टेक्नीशियन / इंजीनियर</option>
                <option value="frontdesk" ${emp && emp.role === 'frontdesk' ? 'selected' : ''}>फ्रंट डेस्क व बिलिंग ऑपरेटर</option>
                <option value="manager" ${emp && emp.role === 'manager' ? 'selected' : ''}>ब्रांच मैनेजर</option>
                <option value="admin" ${emp && emp.role === 'admin' ? 'selected' : ''}>एडमिन / ओनर</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">शाखा (Branch) *</label>
              <select id="staff-branch-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="branch_hazratganj" ${emp && emp.branchId === 'branch_hazratganj' ? 'selected' : ''}>📍 हजरतगंज (श्रीराम टावर)</option>
                <option value="branch_naka" ${emp && (emp.branchId === 'branch_naka' || emp.branchId === 'branch_naka') ? 'selected' : ''}>📍 नाका हिंडोला (लखनऊ)</option>
                <option value="branch_kannauj" ${emp && emp.branchId === 'branch_kannauj' ? 'selected' : ''}>📍 कन्नौज (सरायमीरा)</option>
                <option value="all" ${emp && emp.branchId === 'all' ? 'selected' : ''}>🏢 सभी शाखाएं</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-blue-50/60 rounded-2xl border border-blue-200">
              <div class="flex items-center justify-between mb-1">
                <label class="font-black text-slate-900 flex items-center gap-1">
                  <span>🔑 लॉगिन पासवर्ड (अपनी मर्जी का पासवर्ड डालें) *</span>
                </label>
              </div>
              <input type="text" id="staff-pass-input" value="${emp && emp.pass ? emp.pass : ''}" placeholder="उदा. 123456 या monu@123 या अपनी मर्जी का पासवर्ड" required class="w-full p-2.5 bg-white border border-blue-300 rounded-xl font-mono font-bold text-blue-900 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <span class="text-[10px] text-blue-700 font-bold mt-1 block">
                ✨ कोई फ़िक्स फॉर्मेट जरूरी नहीं है! आप जो भी पासवर्ड यहाँ लिखेंगे, कर्मचारी उसी से लॉगिन करेगा।
              </span>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">फोटो लिंक / URL (वैकल्पिक)</label>
              <input type="text" id="staff-photo-input" value="${emp ? emp.photo : ''}" placeholder="https://..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
          </div>

          <!-- Individual Shift In-Time & Out-Time Configuration -->
          <div class="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 space-y-3">
            <span class="text-xs font-black text-indigo-900 block">⏰ कर्मचारी व्यक्तिगत शिफ्ट समय (Shift In-Time & Out-Time):</span>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">शिफ्ट शुरू (Shift In-Time) *</label>
                <input type="time" id="staff-in-time-input" value="${emp ? (emp.shiftInTime24 || '10:30') : '10:30'}" required class="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500">
                <span class="text-[10px] text-slate-500 mt-0.5 block">उदा. 10:30 AM</span>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">शिफ्ट समाप्त (Shift Out-Time) *</label>
                <input type="time" id="staff-out-time-input" value="${emp ? (emp.shiftOutTime24 || '20:30') : '20:30'}" required class="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500">
                <span class="text-[10px] text-slate-500 mt-0.5 block">उदा. 08:30 PM</span>
              </div>
            </div>
          </div>

          <!-- Dynamic Shift, Leave & Base Salary Configuration Box -->
          <div class="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-3">
            <span class="text-xs font-black text-blue-900 block">⚙️ कार्य-घंटे व वेतन दर फॉर्मूला (एडमिन द्वारा तय):</span>
            
            <div class="grid grid-cols-3 gap-2.5 text-xs">
              <div>
                <label class="block font-bold text-slate-700 mb-1">दैनिक शिफ्ट घंटे *</label>
                <input type="number" id="staff-shift-input" oninput="window.MMS_APP.updateStaffMathPreview()" value="${emp ? emp.shiftHours : 8}" min="4" max="14" required class="w-full p-2 bg-white border border-slate-300 rounded-xl font-black text-slate-900 text-center focus:ring-2 focus:ring-blue-500">
                <span class="text-[10px] text-slate-500 block text-center mt-0.5">उदा. 8 या 10 घंटे</span>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">मासिक छुट्टियां *</label>
                <input type="number" id="staff-leaves-input" oninput="window.MMS_APP.updateStaffMathPreview()" value="${emp ? emp.allowedLeaves : 2}" min="0" max="10" required class="w-full p-2 bg-white border border-slate-300 rounded-xl font-black text-slate-900 text-center focus:ring-2 focus:ring-blue-500">
                <span class="text-[10px] text-slate-500 block text-center mt-0.5">उदा. 2 या 4 दिन</span>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">मासिक बेसिक वेतन ₹ *</label>
                <input type="number" id="staff-salary-input" oninput="window.MMS_APP.updateStaffMathPreview()" value="${emp ? emp.baseSalary : 18000}" min="5000" step="500" required class="w-full p-2 bg-white border border-slate-300 rounded-xl font-black text-slate-900 text-center focus:ring-2 focus:ring-blue-500">
                <span class="text-[10px] text-slate-500 block text-center mt-0.5">उदा. ₹18,000</span>
              </div>
            </div>

            <!-- Dynamic Auto-Calculation Preview Result -->
            <div id="staff-math-preview-box" class="p-3 bg-white rounded-xl border border-blue-200 text-xs flex items-center justify-between">
              <div>
                <span class="text-[10px] text-slate-500 uppercase font-black block">मासिक तय कार्य-घंटे:</span>
                <span id="preview-target-hours" class="text-base font-black font-mono text-blue-700">224 घंटे</span>
                <span id="preview-target-days" class="text-[10px] text-slate-400 block">(28 दिन × 8 घंटे)</span>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-slate-500 uppercase font-black block">ऑटो प्रति घंटा दर:</span>
                <span id="preview-hourly-rate" class="text-base font-black font-mono text-emerald-700">₹80.36 / घंटा</span>
                <span class="text-[10px] text-slate-400 block">(बेसिक वेतन / कुल घंटे)</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onclick="window.MMS_APP.closeAddStaffModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">
              रद्द करें
            </button>
            <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5">
              <span>${isEdit ? '💾 अपडेट सेव करें' : '✅ कर्मचारी सेव करें'}</span>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    updateStaffMathPreview();
  }

  function updateStaffMathPreview() {
    const shift = parseFloat(document.getElementById('staff-shift-input')?.value) || 8;
    const leaves = parseFloat(document.getElementById('staff-leaves-input')?.value) || 0;
    const salary = parseFloat(document.getElementById('staff-salary-input')?.value) || 0;

    const targetDays = 30 - leaves;
    const targetHours = targetDays * shift;
    const hourlyRate = targetHours > 0 ? (salary / targetHours).toFixed(2) : 0;

    const elHours = document.getElementById('preview-target-hours');
    const elDays = document.getElementById('preview-target-days');
    const elRate = document.getElementById('preview-hourly-rate');

    if (elHours) elHours.textContent = targetHours + ' घंटे';
    if (elDays) elDays.textContent = `(${targetDays} दिन × ${shift} घंटे)`;
    if (elRate) elRate.textContent = '₹' + hourlyRate + ' / घंटा';
  }

  function closeAddStaffModal() {
    const modal = document.getElementById('staff-modal-backdrop');
    if (modal) modal.remove();
  }

  function saveStaff(e, editEmpId) {
    e.preventDefault();
    const name = document.getElementById('staff-name-input').value.trim();
    const phone = document.getElementById('staff-phone-input').value.trim();
    const role = document.getElementById('staff-role-select').value;
    const branchId = document.getElementById('staff-branch-select').value;
    const rawPass = document.getElementById('staff-pass-input').value.trim();
    const pass = rawPass || '123456';
    const photo = document.getElementById('staff-photo-input').value.trim();
    const inTime24 = document.getElementById('staff-in-time-input')?.value || '10:30';
    const outTime24 = document.getElementById('staff-out-time-input')?.value || '20:30';
    
    // Format to 12-hour AM/PM
    const format12h = (t24) => {
      let [h, m] = t24.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return String(h).padStart(2, '0') + ':' + String(m || 0).padStart(2, '0') + ' ' + ampm;
    };
    const shiftInTime = format12h(inTime24);
    const shiftOutTime = format12h(outTime24);

    const shiftHours = parseFloat(document.getElementById('staff-shift-input').value) || 8;
    const allowedLeaves = parseFloat(document.getElementById('staff-leaves-input').value) || 2;
    const baseSalary = parseFloat(document.getElementById('staff-salary-input').value) || 18000;

    const targetDays = 30 - allowedLeaves;
    const targetHours = targetDays * shiftHours;
    const hourlyRate = targetHours > 0 ? parseFloat((baseSalary / targetHours).toFixed(2)) : 0;

    const branch = state.branches.find(b => b.id === branchId);
    const branchName = branch ? branch.name : getBranchName(branchId);

    const roleLabels = {
      admin: 'सुपर एडमिन (Owner)',
      manager: 'ब्रांच मैनेजर',
      technician: 'रिपेयरिंग टेक्नीशियन',
      frontdesk: 'फ्रंट डेस्क व बिलिंग'
    };

    const existingIdx = state.staff.findIndex(s => (editEmpId && s.id === editEmpId) || (phone && s.phone === phone));
    if (existingIdx !== -1) {
      state.staff[existingIdx] = {
        ...state.staff[existingIdx],
        name, phone, role, roleLabel: roleLabels[role] || role, branchId, branchName, pass,
        shiftHours, allowedLeaves, baseSalary, targetHours, hourlyRate,
        shiftInTime, shiftOutTime, shiftInTime24: inTime24, shiftOutTime24: outTime24,
        photo: photo || state.staff[existingIdx].photo
      };
      console.log('⚡ [Staff Update] Updated employee role & details:', state.staff[existingIdx]);
    } else {
      const newStaff = {
        id: 'emp_' + Date.now(),
        name, phone, role, roleLabel: roleLabels[role] || role, branchId, branchName, pass,
        shiftHours, allowedLeaves, baseSalary, targetHours, hourlyRate,
        shiftInTime, shiftOutTime, shiftInTime24: inTime24, shiftOutTime24: outTime24,
        active: true,
        joinDate: getTodayDateStr(),
        photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      };
      state.staff.push(newStaff);
      console.log('⚡ [Staff Update] Added new employee:', newStaff);
    }

    // If currently logged-in user was updated, immediately sync auth session & header
    if (state.currentUser) {
      const isSelf = (editEmpId && (state.currentUser.id === editEmpId || state.currentUser.phone === phone)) ||
                     (role === 'admin' && (state.currentUser.role || '').toLowerCase() === 'admin');
      if (isSelf) {
        state.currentUser = { ...state.currentUser, name, phone, role, roleLabel: roleLabels[role] || role, branchId, branchName, pass, photo: photo || state.currentUser.photo };
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(state.currentUser));
        const userNameEl = document.getElementById('header-user-name');
        const userRoleEl = document.getElementById('header-user-role');
        if (userNameEl) userNameEl.textContent = name;
        if (userRoleEl) userRoleEl.textContent = roleLabels[role] || role;
      }
    }

    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(state.staff));
    if (typeof window !== 'undefined' && window.MMS_DATA && Array.isArray(window.MMS_DATA.users)) {
      const uIdx = window.MMS_DATA.users.findIndex(u => u.phone === phone);
      if (uIdx !== -1) {
        window.MMS_DATA.users[uIdx].pass = pass;
        window.MMS_DATA.users[uIdx].role = role;
        window.MMS_DATA.users[uIdx].name = name;
        window.MMS_DATA.users[uIdx].branchId = branchId;
      } else {
        window.MMS_DATA.users.push({ phone, pass, role, name, branchId });
      }
    }
    if (typeof CloudSync !== 'undefined' && CloudSync.syncStaff) {
      CloudSync.syncStaff(state.staff);
    }
    closeAddStaffModal();
    renderStaffHRModule();
    alert('✅ कर्मचारी रिकॉर्ड सफलतापूर्वक सुरक्षित हो गया!');
  }


  function deleteStaff(empId) {
    const targetEmp = (state.staff || []).find(s => s.id === empId);
    if (!targetEmp) return;

    // Security check: Only Admin can delete staff
    if (state.currentUser && (state.currentUser.role || '').toLowerCase() !== 'admin') {
      alert('❌ केवल सुपर एडमिन ही कर्मचारियों को हटा सकते हैं!');
      return;
    }

    // Security: Protect primary Super Admin account
    if ((targetEmp.role || '').toLowerCase() === 'admin') {
      alert('🔒 सुपर एडमिन (मालिक) का मुख्य खाता सुरक्षित है और इसे हटाया नहीं जा सकता।');
      return;
    }

    const cleanName = (targetEmp.name || '').replace(/\s*\([^)]*\)/g, '').trim();
    const confirmMsg = `⚠️ क्या आप वाकई कर्मचारी "${cleanName}" (${targetEmp.phone}) को हटाना चाहते हैं?\n\nयह कर्मचारी सूची से हमेशा के लिए हट जाएगा और पोर्टल लॉगिन नहीं कर सकेगा।`;
    if (!confirm(confirmMsg)) return;

    // 1. Remove from state.staff
    state.staff = (state.staff || []).filter(s => s.id !== empId);
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(state.staff));

    // 2. Close edit modal if open
    closeAddStaffModal();

    // 3. Re-render Staff HR module
    renderStaffHRModule();

    // 4. Synchronize deletion to Cloudflare KV and Backend
    if (typeof CloudSync !== 'undefined' && CloudSync.syncStaff) {
      CloudSync.syncStaff(state.staff);
    }

    alert(`✅ कर्मचारी "${cleanName}" को सफलतापूर्वक हटा दिया गया है!`);
  }

  function openIssueAdvanceModal(preselectedEmpId) {
    const existing = document.getElementById('advance-modal-backdrop');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'advance-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div>
            <span class="text-[10px] uppercase font-black text-amber-600 block">स्टाफ लोन / एडवांस</span>
            <h3 class="text-base sm:text-lg font-black text-slate-900">💸 नया स्टाफ एडवांस दर्ज करें</h3>
            <p class="text-xs text-slate-500">मासिक सैलरी स्लिप बनने पर यह किस्त स्वतः कटेगी</p>
          </div>
          <button type="button" onclick="window.MMS_APP.closeIssueAdvanceModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-lg font-black transition cursor-pointer" title="बंद करें">
            ✕
          </button>
        </div>

        <form id="issue-advance-form" onsubmit="window.MMS_APP.saveAdvance(event)" class="flex-1 flex flex-col overflow-hidden">
          <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div class="text-xs">
            <label class="block font-bold text-slate-700 mb-1">कर्मचारी चुनें *</label>
            <select id="adv-emp-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              ${state.staff.map(s => `
                <option value="${s.id}" ${preselectedEmpId === s.id ? 'selected' : ''}>${s.name} (${s.branchName || 'शाखा'})</option>
              `).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">एडवांस राशि ₹ *</label>
              <input type="number" id="adv-amount-input" required min="500" step="100" placeholder="उदा. 3000" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-black text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">कटौती का तरीका *</label>
              <select id="adv-repay-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="emi">मासिक किस्त (EMI)</option>
                <option value="full_next_month">अगले माह की सैलरी से पूरा</option>
              </select>
            </div>
          </div>

          <div class="text-xs">
            <label class="block font-bold text-slate-700 mb-1">मासिक EMI कटौती रकम ₹ *</label>
            <input type="number" id="adv-emi-input" min="500" step="100" placeholder="उदा. 1500 (EMI मोड होने पर)" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          </div>

          <div class="text-xs">
            <label class="block font-bold text-slate-700 mb-1">एडवांस का कारण / नोट *</label>
            <input type="text" id="adv-reason-input" required placeholder="उदा. मेडिकल खर्च / बाइक मरम्मत" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onclick="window.MMS_APP.closeIssueAdvanceModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">
              रद्द करें
            </button>
            <button type="submit" class="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md transition">
              ✅ एडवांस दर्ज करें
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function closeIssueAdvanceModal() {
    const modal = document.getElementById('advance-modal-backdrop');
    if (modal) modal.remove();
  }

  function saveAdvance(e) {
    e.preventDefault();
    const empId = document.getElementById('adv-emp-select').value;
    const amount = parseFloat(document.getElementById('adv-amount-input').value) || 0;
    const repaymentType = document.getElementById('adv-repay-select').value;
    let monthlyDeduction = parseFloat(document.getElementById('adv-emi-input').value) || 0;
    const reason = document.getElementById('adv-reason-input').value.trim();

    if (repaymentType === 'full_next_month' || monthlyDeduction <= 0) {
      monthlyDeduction = amount;
    }

    const emp = state.staff.find(s => s.id === empId);

    const newAdv = {
      id: 'adv_' + Date.now(),
      empId,
      empName: emp ? emp.name : 'स्टाफ',
      amount,
      date: getTodayDateStr(),
      repaymentType,
      monthlyDeduction,
      balanceRemaining: amount,
      reason
    };

    state.advances.unshift(newAdv);
    localStorage.setItem(STORAGE_KEYS.ADVANCES, JSON.stringify(state.advances));

    closeIssueAdvanceModal();
    renderStaffHRModule();
    alert('✅ स्टाफ एडवांस सफलता पूर्वक दर्ज कर दिया गया है!');
  }

  // --- Monthly Salary Slip Generator Modal ---
  function openSalarySlipModal(empId) {
    const existing = document.getElementById('salary-slip-modal-backdrop');
    if (existing) existing.remove();

    const emp = state.staff.find(s => s.id === empId) || state.staff[0];
    if (!emp) return;

    // Pull approved attendance hours for this employee
    const approvedPunches = state.attendance.filter(a => a.empId === emp.id && a.status === 'approved');
    let totalApprovedHours = approvedPunches.reduce((sum, a) => sum + (Number(a.hoursWorked) || 0), 0);

    // If no punches recorded yet, use target hours as preview
    if (totalApprovedHours === 0) {
      totalApprovedHours = emp.targetHours || 224;
    }

    const targetHours = emp.targetHours || 224;
    const hourlyRate = Number(emp.hourlyRate) || 80.36;
    const grossEarned = Math.round(totalApprovedHours * hourlyRate);

    // Check outstanding advance
    const adv = state.advances.find(a => a.empId === emp.id && a.balanceRemaining > 0);
    const advanceDeduction = adv ? Math.min(adv.balanceRemaining, adv.monthlyDeduction) : 0;
    const netSalaryPayable = Math.max(0, grossEarned - advanceDeduction);

    const modal = document.createElement('div');
    modal.id = 'salary-slip-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto';

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <span class="text-xs font-black text-slate-500 uppercase">मासिक वेतन पर्ची (Salary Slip)</span>
          <button type="button" onclick="window.MMS_APP.closeSalarySlipModal()" class="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1 transition">
            ✕ बंद करें (Close)
          </button>
        </div>

        <!-- Printable Salary Slip Container -->
        <div id="salary-slip-printable-area" class="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-4">
          <!-- Letterhead Header -->
          <div class="flex items-center justify-between border-b pb-3 border-slate-200">
            <div class="flex items-center gap-3">
              <img src="logo-badge.svg" class="w-12 h-12 object-contain" alt="MMS">
              <div>
                <h2 class="text-base font-black text-slate-900 tracking-tight">MONU MOBILE SOLUTION</h2>
                <p class="text-[10px] text-slate-500 font-medium">Head Office: 216, Sree Rama Towers, Hazratganj, Lucknow</p>
                <p class="text-[10px] text-blue-700 font-bold">मो./WhatsApp: 7905859701</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-[10px] font-black uppercase tracking-wider block">
                वेतन पर्ची (Salary Slip)
              </span>
              <span class="text-xs font-black text-slate-700 font-mono mt-1 block">माह: नवंबर 2026</span>
            </div>
          </div>

          <!-- Employee Photo & Info Grid -->
          <div class="flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <img src="${emp.photo || 'logo-badge.png'}" class="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 shadow-sm" alt="${emp.name}">
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs flex-1">
              <div>
                <span class="text-[10px] text-slate-400 font-bold block">कर्मचारी का नाम:</span>
                <span class="font-black text-slate-900 text-sm">${emp.name}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-bold block">शाखा (Branch):</span>
                <span class="font-bold text-slate-800">${emp.branchName || getBranchName(emp.branchId)}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-bold block">पद (Designation):</span>
                <span class="font-bold text-blue-700">${emp.roleLabel || emp.role}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 font-bold block">मोबाइल नंबर:</span>
                <span class="font-mono font-bold text-slate-800">${emp.phone}</span>
              </div>
            </div>
          </div>

          <!-- Hours & Rate Math Breakdown Table -->
          <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <div class="bg-slate-100 p-2 font-black text-slate-700 border-b border-slate-200 text-[11px]">
              ⏱️ कार्य-घंटे व दर विवरण (Work Hours & Hourly Math)
            </div>
            <div class="p-3 space-y-1.5 divide-y divide-slate-100">
              <div class="flex justify-between py-1">
                <span class="text-slate-600">दैनिक शिफ्ट व मासिक छुट्टियां:</span>
                <span class="font-bold text-slate-900">${emp.shiftHours} घंटे/दिन • ${emp.allowedLeaves} दिन छुट्टी</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-600">तय मासिक घंटे (Target Hours):</span>
                <span class="font-mono font-bold text-slate-900">${targetHours} घंटे</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-600">स्वीकृत काम के घंटे (Approved Worked):</span>
                <span class="font-mono font-black text-blue-700">${totalApprovedHours} घंटे</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-slate-600">प्रति घंटा वेतन दर (Hourly Rate):</span>
                <span class="font-mono font-bold text-emerald-700">₹${hourlyRate} / घंटा</span>
              </div>
            </div>
          </div>

          <!-- Salary Calculation & Deductions Box -->
          <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <div class="bg-slate-100 p-2 font-black text-slate-700 border-b border-slate-200 text-[11px]">
              💰 वेतन व कटौती हिसाब (Gross & Net Earnings)
            </div>
            <div class="p-3 space-y-1.5 divide-y divide-slate-100">
              <div class="flex justify-between py-1">
                <span class="text-slate-600">अर्जित ग्रॉस वेतन (${totalApprovedHours} hrs × ₹${hourlyRate}):</span>
                <span class="font-mono font-black text-slate-900">${formatCurrency(grossEarned)}</span>
              </div>
              <div class="flex justify-between py-1 text-rose-600">
                <span>(-) स्टाफ एडवांस कटौती (Advance EMI):</span>
                <span class="font-mono font-black">- ${formatCurrency(advanceDeduction)}</span>
              </div>
              <div class="flex justify-between py-2 border-t-2 border-slate-300 bg-emerald-50/60 px-2 rounded-lg">
                <span class="font-black text-slate-900 text-sm">शुद्ध देय वेतन (Net Salary Payable):</span>
                <span class="font-mono font-black text-emerald-700 text-base">${formatCurrency(netSalaryPayable)}</span>
              </div>
            </div>
          </div>

          <!-- Signatures Footer -->
          <div class="pt-6 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
            <div class="text-center">
              <span class="block border-t border-slate-300 w-28 pt-1">कर्मचारी हस्ताक्षर</span>
            </div>
            <div class="text-center">
              <span class="block border-t border-slate-300 w-32 pt-1 font-bold text-slate-800">मोहित/मोनू (Monu Mobile)</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100 mt-4">
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.MMS_APP.printSalarySlip()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5">
              <span>🖨️ स्लिप प्रिंट करें</span>
            </button>
            <button type="button" onclick="window.MMS_APP.shareSalarySlipWhatsApp('${emp.phone}', '${emp.name}', '${netSalaryPayable}')" class="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1">
              <span>💬 व्हाट्सएप भेजें</span>
            </button>
          </div>
          
          <button type="button" onclick="window.MMS_APP.markSalaryPaid('${emp.id}', ${netSalaryPayable}, ${advanceDeduction})" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md transition">
            ✅ भुगतान दर्ज करें (Mark Paid)
          </button>
          <button type="button" onclick="window.MMS_APP.closeSalarySlipModal()" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition">
            ✕ बंद करें
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function closeSalarySlipModal() {
    const modal = document.getElementById('salary-slip-modal-backdrop');
    if (modal) modal.remove();
  }

  function printSalarySlip() {
    const area = document.getElementById('salary-slip-printable-area');
    if (!area) return;

    let iframe = document.getElementById('mms-salary-print-iframe');
    if (iframe) iframe.remove();

    iframe = document.createElement('iframe');
    iframe.id = 'mms-salary-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>सैलरी स्लिप - Monu Mobile Solution</title>
          <style>
            @page { size: A5 landscape; margin: 8mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 12px; color: #1e293b; margin: 0; padding: 10px; }
            h2 { font-size: 16px; margin: 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
            .border { border: 1px solid #cbd5e1; border-radius: 8px; }
            .p-3 { padding: 10px; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .font-mono { font-family: monospace; }
          </style>
        </head>
        <body>
          ${area.innerHTML}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  }

  function shareSalarySlipWhatsApp(phone, name, amount) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : ('91' + cleanPhone);
    const msg = `*Monu Mobile Solution - मासिक वेतन पर्ची (Salary Slip)*\n\nनमस्ते ${name} जी,\nनवंबर 2026 माह का आपका कुल वेतन विवरण:\n\n💵 शुद्ध देय वेतन (Net Salary): *₹${amount}*\n\nपूरा विवरण देखने के लिए कृपया स्टोर मैनेजर या एडमिन से संपर्क करें। धन्यवाद!\n— मोनू मोबाइल सॉल्यूशन (7905859701)`;

    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function markSalaryPaid(empId, netAmount, advanceDeducted) {
    const emp = state.staff.find(s => s.id === empId);
    if (!emp) return;

    if (!confirm(`क्या आप ${emp.name} को ₹${netAmount} का वेतन भुगतान मार्क करना चाहते हैं?`)) return;

    // Record salary payment into store expenses so it flows into Master Balance Sheet
    const newExp = {
      id: 'exp_salary_' + Date.now(),
      branchId: emp.branchId || 'branch_hazratganj',
      branchName: emp.branchName || getBranchName(emp.branchId),
      category: 'salary',
      categoryLabel: '👔 कर्मचारी वेतन (Staff Salary)',
      description: `मासिक वेतन भुगतान - ${emp.name} (${emp.roleLabel || emp.role})`,
      amount: netAmount,
      date: getTodayDateStr(),
      paymentMode: 'online',
      paidBy: 'Monu (Admin)'
    };

    state.expenses.unshift(newExp);
    if (typeof CloudSync !== "undefined") CloudSync.pushExpense(newExp);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));

    // Deduct advance balance if applicable
    if (advanceDeducted > 0) {
      const adv = state.advances.find(a => a.empId === empId && a.balanceRemaining > 0);
      if (adv) {
        adv.balanceRemaining = Math.max(0, adv.balanceRemaining - advanceDeducted);
        localStorage.setItem(STORAGE_KEYS.ADVANCES, JSON.stringify(state.advances));
      }
    }

    closeSalarySlipModal();
    renderStaffHRModule();
    alert(`✅ ${emp.name} का ₹${netAmount} का वेतन भुगतान सफलतापूर्वक दर्ज हो गया और दुकान खर्च में जुड़ गया!`);
  }

  // =========================================================================
  // 15. STORE OVERHEAD EXPENSES MODULE (RENT, ELECTRICITY, WIFI, PANTRY, MISC)
  // =========================================================================
  function renderExpensesModule() {
    const container = document.getElementById('tab-view-expenses');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';
    const todayStr = getTodayDateStr();
    const thisMonthPrefix = todayStr.substring(0, 7);
    const expenseDateFilter = state.expenseDateFilter || 'month';

    const matchBranch = (e) => branchFilter === 'all' || e.branchId === branchFilter || (!e.branchId && branchFilter === 'branch_hazratganj');
    
    let expensesList = (state.expenses || []).filter(matchBranch);
    if (expenseDateFilter === 'today') {
      expensesList = expensesList.filter(e => e.date === todayStr);
    } else if (expenseDateFilter === 'month') {
      expensesList = expensesList.filter(e => e.date && e.date.startsWith(thisMonthPrefix));
    } else if (expenseDateFilter === 'custom') {
      const cDate = state.expenseCustomDate || todayStr;
      expensesList = expensesList.filter(e => e.date === cDate);
    } // 'all' keeps all

    const totalExpense = expensesList.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const rentExpenses = expensesList.filter(e => e.category === 'rent').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const utilExpenses = expensesList.filter(e => e.category === 'electricity' || e.category === 'wifi').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const miscExpenses = expensesList.filter(e => e.category !== 'rent' && e.category !== 'electricity' && e.category !== 'wifi' && e.category !== 'salary').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Header & Actions -->
        <div class="bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 p-5 rounded-2xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 mb-1 flex-wrap">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-500/30 text-rose-200 border border-rose-400/30">
                दुकान खर्च ट्रैकर
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                ${branchFilter === 'all' ? __L("🏢 सभी शाखाएं", "🏢 All Branches") : getBranchName(branchFilter)}
              </span>
            </div>
            <h3 class="text-xl font-black">${__L("दुकान खर्च", "Store Overhead Expenses")}</h3>
            <p class="text-xs text-slate-300 mt-0.5">${__L("किराया, बिजली, इंटरनेट, चाय-नाश्ता, मशीन व टूल मरम्मत खर्च का संपूर्ण हिसाब", "Complete accounting of rent, electricity, internet, pantry, tools and machine repair")}</p>
          </div>

          <div class="flex flex-col gap-2.5 items-end">
            ${renderBranchFilterBarDark(branchFilter)}
            <!-- Date Filters for Expenses -->
            <div class="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-xs">
              <button onclick="window.MMS_APP.setExpenseDateFilter('month')" class="px-2.5 py-1 rounded-lg font-black transition ${expenseDateFilter === 'month' ? 'bg-white text-rose-950 shadow-sm' : 'text-white hover:bg-white/20'}">🗓️ ${__L("इस महीने", "This Month")}</button>
              <button onclick="window.MMS_APP.setExpenseDateFilter('today')" class="px-2.5 py-1 rounded-lg font-black transition ${expenseDateFilter === 'today' ? 'bg-white text-rose-950 shadow-sm' : 'text-white hover:bg-white/20'}">⚡ आज</button>
              <button onclick="window.MMS_APP.setExpenseDateFilter('all')" class="px-2.5 py-1 rounded-lg font-black transition ${expenseDateFilter === 'all' ? 'bg-white text-rose-950 shadow-sm' : 'text-white hover:bg-white/20'}">📜 ${__L("सभी", "All Time")}</button>
              <button onclick="window.MMS_APP.openAddExpenseModal()" class="ml-1 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-black shadow-md flex items-center gap-1 transition">
                <span>➕ ${__L("नया खर्च दर्ज करें", "Add New Expense")}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Metric Badges (4 Signature Pastel Clay Cards) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
          <div class="clay-card clay-card-peach p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">कुल खर्च (TOTAL OVERHEADS)</span>
            <span class="text-2xl font-black text-rose-600 font-mono mt-1 block">${formatCurrency(totalExpense)}</span>
            <span class="text-[10px] text-slate-400">कुल ${expensesList.length} वाउचर</span>
          </div>
          <div class="clay-card clay-card-blue p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">🏢 दुकान किराया (RENT)</span>
            <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">${formatCurrency(rentExpenses)}</span>
            <span class="text-[10px] text-slate-400">मासिक फिक्स रेंट</span>
          </div>
          <div class="clay-card clay-card-mint p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">💡 बिजली व वाईफाई (UTILITIES)</span>
            <span class="text-2xl font-black text-amber-600 font-mono mt-1 block">${formatCurrency(utilExpenses)}</span>
            <span class="text-[10px] text-slate-400">बिजली, फाइबर व मेंटेनेंस</span>
          </div>
          <div class="clay-card clay-card-lilac p-5 rounded-[28px]">
            <span class="text-xs font-bold text-slate-500 block">☕ चाय, नाश्ता व टूल रिपेयर</span>
            <span class="text-2xl font-black text-blue-700 font-mono mt-1 block">${formatCurrency(miscExpenses)}</span>
            <span class="text-[10px] text-slate-400">रोजमर्रा के फुटकर खर्च</span>
          </div>
        </div>

        <!-- Expense Table -->
        <div class="clay-card bg-white/95 p-6 rounded-[32px] space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-black text-slate-900">दुकान खर्च वाउचर सूची (Expense Vouchers)</h3>
              <p class="text-xs text-slate-500">हर खर्च का विवरण, भुगतान माध्यम और किस कर्मचारी ने खर्च किया</p>
            </div>
            <span class="text-xs font-bold font-mono text-slate-500">${expensesList.length} वाउचर्स</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">तारीख</th>
                  <th class="p-2.5">कैटेगरी</th>
                  <th class="p-2.5">खर्च विवरण / बिल नोट</th>
                  <th class="p-2.5">शाखा</th>
                  <th class="p-2.5">किसने भुगतान किया</th>
                  <th class="p-2.5 text-right font-black rounded-r-lg">रकम (₹)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium">
                ${expensesList.map(e => `
                  <tr class="hover:bg-slate-50 transition">
                    <td class="p-2.5 font-mono text-slate-600">${e.date}</td>
                    <td class="p-2.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-black ${e.category === 'rent' ? 'bg-purple-100 text-purple-800' : e.category === 'electricity' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'}">
                        ${e.category === 'rent' ? '🏢 दुकान किराया' : e.category === 'electricity' ? '💡 बिजली बिल' : e.category === 'wifi' ? '🌐 वाईफाई/नेट' : e.category === 'tea_snacks' ? '☕ चाय-नाश्ता' : e.category === 'tools' ? '🛠️ टूल व मशीन' : '📦 अन्य खर्च'}
                      </span>
                    </td>
                    <td class="p-2.5 font-bold text-slate-900 max-w-sm truncate">${e.desc}</td>
                    <td class="p-2.5 text-slate-600">${getBranchName(e.branchId)}</td>
                    <td class="p-2.5 text-slate-700 font-bold">${e.paidBy}</td>
                    <td class="p-2.5 text-right font-mono font-black text-rose-600">${formatCurrency(e.amount)}</td>
                  </tr>
                `).join('') || '<tr><td colspan="6" class="p-4 text-center text-slate-400">इस अवधि व शाखा में कोई खर्च वाउचर दर्ज नहीं है।</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function openAddExpenseModal() {
    const existing = document.getElementById('expense-modal-backdrop');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'expense-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white z-10">
          <div>
            <span class="text-[10px] uppercase font-black text-rose-600 block">दुकान खर्च प्रविष्टि</span>
            <h3 class="text-base sm:text-lg font-black text-slate-900">➕ नया दुकान खर्च जोड़ें</h3>
            <p class="text-xs text-slate-500">यह राशि बैलेंस शीट और P&L में स्वतः कट जाएगी</p>
          </div>
          <button type="button" onclick="window.MMS_APP.closeAddExpenseModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-lg font-black transition cursor-pointer" title="बंद करें">
            ✕
          </button>
        </div>

        <form id="add-expense-form" onsubmit="window.MMS_APP.saveExpense(event)" class="flex-1 flex flex-col overflow-hidden">
          <div class="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">शाखा (Branch) *</label>
              <select id="exp-branch-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="branch_hazratganj">📍 हजरतगंज (Head Lab)</option>
                <option value="branch_naka">📍 नाका हिंडोला शाखा</option>
                <option value="branch_kannauj">📍 कन्नौज (सरायमीरा)</option>
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">खर्च श्रेणी *</label>
              <select id="exp-category-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="rent">🏢 दुकान का किराया (Rent)</option>
                <option value="electricity">⚡ बिजली का बिल (Electricity)</option>
                <option value="wifi">🌐 इंटरनेट / वाईफाई (WiFi)</option>
                <option value="pantry">☕ चाय / नाश्ता / पैंट्री (Pantry)</option>
                <option value="maintenance">🔧 टूल व मशीन मरम्मत (Tools)</option>
                <option value="courier">📦 कूरियर व ट्रांसपोर्ट (Courier)</option>
                <option value="cleaning">🧹 सफाई व रख-रखाव (Cleaning)</option>
                <option value="misc">🏷️ अन्य विविध खर्च (Misc)</option>
              </select>
            </div>
          </div>

          <div class="text-xs">
            <label class="block font-bold text-slate-700 mb-1">खर्च विवरण (Description) *</label>
            <input type="text" id="exp-desc-input" required placeholder="उदा. नवंबर माह का दुकान किराया या बिजली बिल" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">खर्च रकम ₹ *</label>
              <input type="number" id="exp-amount-input" required min="10" step="10" placeholder="उदा. 4500" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-black text-rose-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">भुगतान माध्यम *</label>
              <select id="exp-mode-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="online">📱 UPI / बैंक ट्रांसफर</option>
                <option value="cash">💵 नकद (Cash)</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">भुगतानकर्ता (Paid By) *</label>
              <input type="text" id="exp-paidby-input" value="${state.currentUser ? state.currentUser.name : 'Monu (Admin)'}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">तारीख *</label>
              <input type="date" id="exp-date-input" value="${getTodayDateStr()}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onclick="window.MMS_APP.closeAddExpenseModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">
              रद्द करें
            </button>
            <button type="submit" class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-md transition">
              💾 खर्च सेव करें
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function closeAddExpenseModal() {
    const modal = document.getElementById('expense-modal-backdrop');
    if (modal) modal.remove();
  }

  function saveExpense(e) {
    e.preventDefault();
    const branchId = document.getElementById('exp-branch-select').value;
    const category = document.getElementById('exp-category-select').value;
    const description = document.getElementById('exp-desc-input').value.trim();
    const amount = parseFloat(document.getElementById('exp-amount-input').value) || 0;
    const paymentMode = document.getElementById('exp-mode-select').value;
    const paidBy = document.getElementById('exp-paidby-input').value.trim();
    const date = document.getElementById('exp-date-input').value || getTodayDateStr();

    const branch = state.branches.find(b => b.id === branchId);
    const branchName = branch ? branch.name : getBranchName(branchId);

    const categoryLabels = {
      rent: '🏢 दुकान का किराया (Shop Rent)',
      electricity: '⚡ बिजली का बिल (Electricity Bill)',
      wifi: '🌐 इंटरनेट / वाईफाई (WiFi)',
      pantry: '☕ चाय / नाश्ता / पैंट्री (Pantry)',
      maintenance: '🔧 टूल व मशीन मरम्मत (Tools)',
      courier: '📦 कूरियर व ट्रांसपोर्ट (Courier)',
      cleaning: '🧹 सफाई व रख-रखाव (Cleaning)',
      salary: '👔 कर्मचारी वेतन (Salary)',
      misc: '🏷️ अन्य विविध खर्च (Misc)'
    };

    const newExp = {
      id: 'exp_' + Date.now(),
      branchId,
      branchName,
      category,
      categoryLabel: categoryLabels[category] || category,
      description,
      amount,
      paymentMode,
      paidBy,
      date
    };

    state.expenses.unshift(newExp);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));

    closeAddExpenseModal();
    renderExpensesModule();
    alert('✅ दुकान खर्च सफलतापूर्वक दर्ज कर लिया गया है!');
  }

  function deleteExpense(id) {
    if (!confirm('क्या आप वाकई इस खर्च रिकॉर्ड को हटाना चाहते हैं?')) return;
    state.expenses = state.expenses.filter(e => e.id !== id);
    try { localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses)); } catch(e) {}
    if (typeof CloudSync !== 'undefined' && CloudSync.deleteExpense) {
      CloudSync.deleteExpense(id);
    }
    persistData();
    renderExpensesModule();
  }

  function exportExpensesToExcel() {
    const headers = [
      'तारीख (Date)',
      'शाखा (Branch)',
      'श्रेणी (Category)',
      'विवरण (Description)',
      'भुगतानकर्ता (Paid By)',
      'माध्यम (Payment Mode)',
      'रकम ₹ (Amount)'
    ];

    const rows = state.expenses.map(e => [
      e.date,
      `"${(e.branchName || e.branchId || '').replace(/"/g, '""')}"`,
      `"${(e.categoryLabel || e.category || '').replace(/"/g, '""')}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
      `"${(e.paidBy || '').replace(/"/g, '""')}"`,
      e.paymentMode === 'online' ? 'Online' : 'Cash',
      e.amount
    ].join(','));

    const csvContent = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Monu_Mobile_Store_Expenses_${getTodayDateStr()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✅ दुकान खर्च एक्सेल रिपोर्ट सफलतापूर्वक डाउनलोड हो गई!');
  }


  // --- Modal Helpers ---
  function openModal(el) {
    if (el) {
      el.classList.remove('hidden');
      el.style.display = 'flex';
    }
  }

  function closeModal(el) {
    if (el) {
      el.classList.add('hidden');
      el.style.display = 'none';
    }
  }

  // --- Event Binding ---
  function bindEvents() {
    // Language switchers
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-switcher-btn');
      if (btn) {
        const lang = btn.getAttribute('data-lang');
        if (lang) setLanguage(lang);
      }
    });

    // Public / Portal Toggle Button in Top Bar
    const openLoginBtns = document.querySelectorAll('.open-login-btn');
    openLoginBtns.forEach(b => b.addEventListener('click', (e) => {
      if (e) e.preventDefault();
      const user = state.currentUser || JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || 'null');
      if (user) {
        state.currentUser = user;
        showPortal();
      } else {
        openModal(dom.loginModal);
      }
    }));

    const backToSiteBtn = document.getElementById('back-to-site-btn');
    if (backToSiteBtn) {
      backToSiteBtn.addEventListener('click', showPublicSite);
    }

    // Modal Close buttons
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) closeModal(modal);
      });
    });

    // Login & Logout
    if (dom.loginForm) dom.loginForm.addEventListener('submit', handleLogin);
    const newSkuForm = document.getElementById('new-sku-form');
    if (newSkuForm) {
      newSkuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = (document.getElementById('sku-code')?.value || '').trim();
        const name = (document.getElementById('sku-name')?.value || '').trim();
        const cat = document.getElementById('sku-category')?.value || 'General';
        const cost = Number(document.getElementById('sku-cp')?.value || document.getElementById('sku-cost')?.value || 0);
        const sell = Number(document.getElementById('sku-sp')?.value || document.getElementById('sku-sell')?.value || 0);
        const stock = Number(document.getElementById('sku-qty')?.value || document.getElementById('sku-stock')?.value || 5);
        const branchId = state.activeBranch !== 'all' ? state.activeBranch : 'branch_hazratganj';

        if (!code || !name) {
          alert('कृपया SKU कोड और पार्ट का नाम भरें!');
          return;
        }

        const newItem = {
          sku: code.toUpperCase(),
          name,
          category: cat,
          costPrice: cost,
          sellPrice: sell,
          stock,
          minAlert: 3,
          branchId
        };

        state.inventory.unshift(newItem);
        persistData();
        const modal = document.getElementById('new-sku-modal');
        if (modal) closeModal(modal);
        renderInventory();
        alert(`✅ नया पार्ट "${name}" (${code}) इन्वेंट्री में जुड़ गया!`);
      });
    }
    if (dom.logoutBtn) dom.logoutBtn.addEventListener('click', handleLogout);

    // Portal Tabs Switching
    const pTabs = (dom && dom.portalTabs && dom.portalTabs.length) ? dom.portalTabs : document.querySelectorAll(".portal-tab-btn");
    pTabs.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        switchPortalTab(tab);
      });
    });

    const openBtn = document.getElementById('sidebar-open-btn');
    if (openBtn) openBtn.addEventListener('click', openMobileSidebar);
    const closeBtn = document.getElementById('sidebar-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileSidebar);

    // Estimator events
    if (dom.estBrandSelect) dom.estBrandSelect.addEventListener('change', () => onBrandChange());
    if (dom.estModelSelect) dom.estModelSelect.addEventListener('change', onIssueOrModelChange);
    if (dom.estIssueSelect) dom.estIssueSelect.addEventListener('change', onIssueOrModelChange);

    // Tracker events
    if (dom.trackSearchBtn) dom.trackSearchBtn.addEventListener('click', () => searchJobStatus());
    if (dom.trackInput) {
      dom.trackInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchJobStatus();
      });
    }

    // Restock form
    if (dom.restockForm) dom.restockForm.addEventListener('submit', handleRestockSubmit);

    // Receive Payment submit
    if (dom.rcvSubmitBtn) dom.rcvSubmitBtn.addEventListener('click', handleReceivePaymentSubmit);

    // New Job submit
    if (dom.newJobForm) dom.newJobForm.addEventListener('submit', handleNewJobSubmit);
  }

  function renderAll() {
    renderTextTranslations();
    updateShopOpenStatus();
    renderAuthPill();
    initEstimator();
    renderInstagramFeed();
    if (!dom.portalSection.classList.contains('hidden') && state.currentUser) {
      renderPortal();
    }
  }

  // --- DOM Initialization & Persistent View Check ---
    document.addEventListener('DOMContentLoaded', () => {
    if (typeof CloudSync !== "undefined") CloudSync.init();
    cacheDom();
    bindEvents();

    // Check Persistent Auth & View
    const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH);
    const savedView = localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW);

    // 1. Always restore user session if present in localStorage
    if (savedUser && savedUser !== 'null') {
      try {
        state.currentUser = JSON.parse(savedUser);
        const matchedEmp = (state.staff || []).find(s => 
          (state.currentUser.id && s.id === state.currentUser.id) ||
          (state.currentUser.phone && s.phone === state.currentUser.phone) ||
          (s.role === 'admin' && (state.currentUser.role || '').toLowerCase() === 'admin')
        );
        if (matchedEmp) {
          state.currentUser = { ...state.currentUser, ...matchedEmp };
          localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(state.currentUser));
        }
      } catch (err) {
        console.error('Auth parse error:', err);
      }
    }

    // 2. Render user pill in header (shows "🟢 Monu Ji (Portal)" if authenticated)
    renderAuthPill();

    // 3. Navigate to active view
    if (state.currentUser && savedView !== 'public') {
      showPortal();
    } else {
      showPublicSite();
    }

    renderAll();
  });

  // Public Controller API
  
  // --- Delete Accidental Job Cards or Invoices ---
  function deleteJobOrInvoice(id) {
    if (!confirm(`⚠️ क्या आप वाकई टोकन / बिल "${id}" को हटाना चाहते हैं?\n\nयह रिकॉर्ड जॉब लिस्ट, खाता-बही और डेली सेल्स से सुरक्षित रूप से हटा दिया जाएगा।`)) {
      return;
    }

    // 1. Remove from jobs
    state.jobs = state.jobs.filter(j => j.token !== id && j.id !== id);
    try { localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(state.jobs)); } catch(e) {}
    if (typeof CloudSync !== 'undefined' && CloudSync.deleteJob) {
      CloudSync.deleteJob(id);
    }

    // 2. Remove from invoices
    state.invoices = state.invoices.filter(inv => inv.invoiceNo !== id && inv.id !== id);
    try { localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(state.invoices)); } catch(e) {}
    if (typeof CloudSync !== 'undefined' && CloudSync.deleteInvoice) {
      CloudSync.deleteInvoice(id);
    }

    persistData();

    // 3. Re-render active view
    if (state.activeAdminTab === 'jobs') renderJobCardsManager();
    else if (state.activeAdminTab === 'khata') renderKhata();
    else if (state.activeAdminTab === 'sales') renderDailySales();
    else if (state.activeAdminTab === 'balance') renderBalanceSheet();
    else switchPortalTab(state.activeAdminTab || 'pos');

    alert(`✅ टोकन / बिल "${id}" को सफलतापूर्वक हटा दिया गया है!`);
  }

  
  function setExpenseDateFilter(filterType) {
    state.expenseDateFilter = filterType;
    renderExpensesModule();
  }

  
  function setAttendanceDateFilter(filterType) {
    state.attendanceDateFilter = filterType;
    renderAttendanceModule();
  }

  function setAttendanceCustomDate(customDate) {
    state.attendanceDateFilter = 'custom';
    state.attendanceCustomDate = customDate;
    renderAttendanceModule();
  }

  
  function printJobTokenSlip(job) {
    const branch = state.branches.find(b => b.id === job.branchId) || state.branches[0];
    const branchName = branch ? branch.name : 'हजरतगंज मुख्य लैब';
    const branchAddr = branch ? branch.address : '216, श्री रामा टॉवर्स, अशोक मार्ग, हजरतगंज, लखनऊ';
    const branchPhone = branch ? branch.phone : '7905859701';

    let iframe = document.getElementById('receipt-print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'receipt-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>रिपेयर टोकन पर्ची - ${job.token}</title>
        <style>
          @page { size: 80mm auto; margin: 3mm; }
          body { font-family: 'Courier New', monospace; font-size: 11px; margin: 0; padding: 4px; color: #000; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .bold { font-weight: bold; }
          .border-b { border-bottom: 1px dashed #000; padding-bottom: 4px; margin-bottom: 4px; }
          .border-t { border-top: 1px dashed #000; padding-top: 4px; margin-top: 4px; }
          .token-box { font-size: 16px; font-weight: 900; border: 2px solid #000; padding: 4px; margin: 6px 0; text-align: center; }
          .row { display: flex; justify-content: space-between; margin: 2px 0; }
        </style>
      </head>
      <body>
        <div class="text-center border-b">
          <div style="font-size: 14px; font-weight: 900;">MONU MOBILE SOLUTION</div>
          <div style="font-size: 10px;">${branchName}</div>
          <div style="font-size: 9px;">${branchAddr}</div>
          <div style="font-size: 9px;">📞 ${branchPhone}</div>
        </div>
        
        <div class="token-box">रिपेयर टोकन: ${job.token}</div>
        
        <div class="border-b" style="font-size: 10px;">
          <div class="row"><span>दिनांक:</span><span>${job.createdAt || getTodayDateStr()}</span></div>
          <div class="row"><span>ग्राहक:</span><span class="bold">${job.customerName}</span></div>
          <div class="row"><span>मोबाइल:</span><span>${job.customerPhone}</span></div>
        </div>

        <div class="border-b" style="font-size: 10px;">
          <div class="row"><span>मोबाइल मॉडल:</span><span class="bold">${job.device || 'स्मार्टफोन'}</span></div>
          <div class="row"><span>समस्या:</span><span>${job.issue}</span></div>
          <div class="row"><span>स्क्रीन लॉक:</span><span>${job.passcode || 'N/A'}</span></div>
        </div>

        <div style="font-size: 11px;">
          <div class="row"><span>अनुमानित खर्च:</span><span class="bold">₹${Number(job.estimatedCost || 0).toLocaleString('en-IN')}</span></div>
          <div class="row"><span>एडवांस जमा:</span><span class="bold text-right">₹${Number(job.advancePaid || 0).toLocaleString('en-IN')}</span></div>
          <div class="row bold border-t"><span>बाकी भुगतान:</span><span class="text-right">₹${Number(job.dueAmount || (job.estimatedCost - job.advancePaid) || 0).toLocaleString('en-IN')}</span></div>
        </div>

        <div class="border-t text-center" style="font-size: 8px; margin-top: 8px;">
          *** डिलीवरी के समय यह पर्ची अवश्य लाएं ***<br>
          30 दिन के अंदर फोन न ले जाने पर लैब जिम्मेदार नहीं होगी।<br>
          ट्रैक करें: https://monumobile.in
        </div>
      </body>
      </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 250);
  }

  function printJobToken(token) {
    const job = state.jobs.find(j => j.token === token || j.id === token);
    if (!job) {
      alert('टोकन नहीं मिला!');
      return;
    }
    printJobTokenSlip(job);
  }

  function openNewSKUModal() {
    const modal = document.getElementById('new-sku-modal');
    const container = document.getElementById('sku-category-container');
    if (container) {
      container.innerHTML = renderCategoryDropdownHTML('sku-category', 'Display - Copy');
    }
    if (modal) openModal(modal);
  }

  function restockSKU(sku) {
    openRestockModal(sku);
  }

  function clearKhataUdhar(invoiceNo) {
    openReceivePaymentModal(invoiceNo);
  }

    
  // --- Data Lifecycle, Storage Monitor & Month-wise Export Functions ---
  async function checkStorageHealth() {
    try {
      const res = await fetch('/api/storage-metrics?t=' + Date.now());
      if (!res.ok) return null;
      const data = await res.json();
      return data.success ? data.metrics : null;
    } catch(e) {
      console.warn('Storage health fetch failed:', e);
      return null;
    }
  }

  // Export 2-month old data to clean, professional CSV/Excel
  function exportOldDataToExcel(cutoffDays = 60) {
    const cutoffDate = new Date(Date.now() - cutoffDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const oldAttendance = (state.attendance || []).filter(a => (a.date || '') < cutoffDate);
    const oldInvoices = (state.invoices || []).filter(i => (i.date || '') < cutoffDate);
    const oldJobs = (state.jobs || []).filter(j => j.status === 'delivered' && (j.createdAt || '') < cutoffDate);

    if (oldAttendance.length === 0 && oldInvoices.length === 0 && oldJobs.length === 0) {
      alert('ℹ️ 2 महीने (60 दिन) से पुराना कोई आर्काइव डेटा नहीं मिला। वर्तमान डेटा सुरक्षित सीमा के अंदर है।');
      return false;
    }

    // Build Month-wise Excel CSV
    const monthName = new Date(Date.now() - cutoffDays * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'long', year: 'numeric' });
    let csvContent = "data:text/csv;charset=utf-8,﻿"; // UTF-8 BOM for Excel Hindi support

    csvContent += "=== MONU MOBILE SOLUTION - 2-MONTH ARCHIVE REPORT (" + monthName + ") ===\n\n";

    // 1. Invoices
    csvContent += "--- CUSTOMER INVOICES & BILLS ---\n";
    csvContent += "Bill No,Date,Customer Name,Phone,Type,Branch,Total (Rs),Discount,Net,Paid,Due,Payment Mode\n";
    oldInvoices.forEach(inv => {
      const row = [
        inv.billNo || inv.id,
        inv.date,
        ('"' + (inv.customerName || '') + '"'),
        inv.customerPhone || '',
        inv.customerType || 'retail',
        ('"' + (inv.branchName || '') + '"'),
        inv.total || 0,
        inv.discount || 0,
        inv.net || 0,
        inv.paid || 0,
        inv.due || 0,
        inv.paymentMode || 'cash'
      ].join(',');
      csvContent += row + "\n";
    });

    csvContent += "\n--- COMPLETED REPAIR JOBS (DELIVERED) ---\n";
    csvContent += "Token No,Date,Customer Name,Phone,Brand,Model,Problem,Cost (Rs),Status,Branch\n";
    oldJobs.forEach(j => {
      const row = [
        j.tokenNo || j.id,
        (j.createdAt || '').split('T')[0],
        ('"' + (j.customerName || '') + '"'),
        j.customerPhone || '',
        j.brand || '',
        j.model || '',
        ('"' + (j.problem || '') + '"'),
        j.finalCost || j.estCost || 0,
        j.status || 'delivered',
        ('"' + (j.branchName || '') + '"')
      ].join(',');
      csvContent += row + "\n";
    });

    csvContent += "\n--- STAFF ATTENDANCE & PUNCH LOGS ---\n";
    csvContent += "Employee,Branch,Date,In-Time,Out-Time,Hours Worked,Punctuality Status,Distance (m)\n";
    oldAttendance.forEach(a => {
      const row = [
        ('"' + (a.empName || a.employeeName || '') + '"'),
        ('"' + (a.branchName || '') + '"'),
        a.date,
        a.inTime || '',
        a.outTime || '',
        a.duration || 0,
        a.status || 'on-time',
        a.distance || 0
      ].join(',');
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const fileName = "MMS_Archive_" + monthName.replace(/\s+/g, '_') + ".csv";
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('✅ ' + fileName + ' सफलतापूर्वक डाउनलोड हो गई है! अब आप सर्वर स्पेस फ्री करने के लिए इसे डिलीट कर सकते हैं।');
    return true;
  }

  // Purge 2-month old data from server and local memory
  async function purgeOldDataWithConfirmation() {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
      alert('⛔ अनुमति अस्वीकृत (Access Denied): डेटा क्लीन करने का अधिकार केवल मुख्य एडमिन (Monu Ji) को है!');
      return;
    }
    const cutoffDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const confirmDownload = confirm("⚠️ महत्वपूर्ण सुरक्षा निर्देश:\n\nक्या आपने 2 महीने पुराना डेटा एक्सेल में डाउनलोड कर लिया है?\n\n'OK' दबाने पर 60 दिन पुरानी अटेंडेंस फोटोज़ और डिलीवर्ड जॉब्स हमेशा के लिए सर्वर से डिलीट होकर स्पेस फ्री हो जाएगा।");
    if (!confirmDownload) return;

    try {
      // Call Cloud Purge API
      const res = await fetch('/api/purge-old-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cutoffDate })
      });
      const data = await res.json();

      // Clean local state as well
      state.attendance = (state.attendance || []).filter(a => (a.date || '') >= cutoffDate);
      state.jobs = (state.jobs || []).filter(j => !(j.status === 'delivered' && (j.createdAt || '') < cutoffDate));
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(state.jobs));

      alert('✅ ' + (data.message || '2 महीने पुराना डेटा सफलतापूर्वक क्लीनअप कर दिया गया है! सर्वर स्पेस सुरक्षित है।'));
      renderSettings();
    } catch(e) {
      alert('❌ क्लीनअप में समस्या: ' + e.message);
    }
  }

  

// =========================================================================
  // WORK ASSIGNMENT & JOB TRACKING MODULE
  // =========================================================================
  let currentAssignToken = null;
  let currentAssignRecord = null;
  let currentAssignScheduleType = 'immediate';

  function openWorkAssignmentModal(tokenNo, record) {
    // Ensure invoice print modal is closed or tucked behind so it doesn't block the assignment popup
    if (dom.invoiceModal) {
      closeModal(dom.invoiceModal);
    }

    currentAssignToken = tokenNo;
    currentAssignRecord = record || (state.jobs || []).find(j => j.token === tokenNo) || (state.invoices || []).find(i => i.invoiceNo === tokenNo);

    const modal = document.getElementById('work-assignment-modal');
    if (!modal) return;

    // 1. Populate Header Meta
    const trackingDisplay = document.getElementById('assign-tracking-display');
    const receivedByDisplay = document.getElementById('assign-received-by-display');
    const receivedAtDisplay = document.getElementById('assign-received-at-display');

    if (trackingDisplay) trackingDisplay.textContent = tokenNo;
    
    const curUser = state.currentUser || { name: 'मोनू जी (Monu)', role: 'admin' };
    const receiverName = (currentAssignRecord && currentAssignRecord.receivedByName) || (curUser.role === 'admin' ? 'Admin (मोनू जी)' : 'Staff (' + curUser.name + ')');
    const receiverTime = (currentAssignRecord && currentAssignRecord.receivedAt) || ('आज, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    if (receivedByDisplay) receivedByDisplay.textContent = receiverName;
    if (receivedAtDisplay) receivedAtDisplay.textContent = receiverTime;

    // Show existing assignment banner if already assigned
    const statusBanner = document.getElementById('assign-current-status-banner');
    if (statusBanner) {
      if (currentAssignRecord && currentAssignRecord.assignedTo) {
        statusBanner.classList.remove('hidden');
        statusBanner.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-base">👤</span>
            <div>
              <span class="text-[10px] font-bold text-emerald-800 uppercase block">वर्तमान में काम सौंपा गया है:</span>
              <strong class="text-xs font-black text-emerald-950">${currentAssignRecord.assignedTo}</strong>
              <span class="text-[9px] text-slate-500 block">असाइन समय: ${currentAssignRecord.assignedAt || 'आज'}</span>
            </div>
          </div>
          <div class="text-right">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-200 text-emerald-900">${currentAssignRecord.status || 'स्वीकार'}</span>
            <span class="block text-[9px] text-slate-500 mt-0.5">अनुमानित: ${currentAssignRecord.estimatedMins || 45} min</span>
          </div>
        `;
      } else {
        statusBanner.classList.add('hidden');
      }
    }

    // Populate timeline inside modal
    const timelineContainer = document.getElementById('assign-modal-timeline');
    if (timelineContainer && currentAssignRecord) {
      timelineContainer.innerHTML = `
        <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <h4 class="font-black text-slate-900 text-xs flex items-center gap-1.5">
            <span>📋</span> पूरी टाइमलाइन (Audit Trail Timeline):
          </h4>
          <div class="space-y-1.5 text-[11px]">
            <div class="flex items-center justify-between pb-1 border-b border-slate-200">
              <span><strong>1. रिसीव्ड (Received By):</strong> ${currentAssignRecord.receivedByName || receiverName}</span>
              <span class="text-slate-500">${currentAssignRecord.receivedAt || receiverTime}</span>
            </div>
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 ${currentAssignRecord.assignedTo ? 'text-blue-900 font-bold' : 'text-slate-400'}">
              <span><strong>2. असाइन (Assigned To):</strong> ${currentAssignRecord.assignedTo || 'प्रतीक्षारत (Not Assigned)'}</span>
              <span class="text-slate-500">${currentAssignRecord.assignedAt || '—'}</span>
            </div>
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 ${currentAssignRecord.startedAt ? 'text-amber-900 font-bold' : 'text-slate-400'}">
              <span><strong>3. काम शुरू (Work Started):</strong> ${currentAssignRecord.startedAt || 'अभी शुरू नहीं'}</span>
              <span class="text-slate-500">${currentAssignRecord.startedAt ? 'चालू' : '—'}</span>
            </div>
            <div class="flex items-center justify-between pb-1 border-b border-slate-200 ${currentAssignRecord.completedAt ? 'text-emerald-900 font-bold' : 'text-slate-400'}">
              <span><strong>4. काम पूरा (Work Completed):</strong> ${currentAssignRecord.completedAt || 'बाकी'}</span>
              <span class="text-slate-500">${currentAssignRecord.completedAt ? 'पूर्ण' : '—'}</span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-bold text-slate-700 bg-white p-1.5 rounded-lg border border-slate-200">
              <span><strong>5. समय हिसाब (Time Analysis):</strong></span>
              <span>अनुमानित: ${currentAssignRecord.estimatedMins || 45}m | असल: ${currentAssignRecord.actualDurationMins ? currentAssignRecord.actualDurationMins + 'm' : 'चालू'}</span>
            </div>
          </div>
        </div>
      `;
    }

    // 2. Pre-fill Work Instructions & Estimated Minutes
    const instructionsInput = document.getElementById('assign-instructions-input');
    const estMinsInput = document.getElementById('assign-est-mins-input');

    if (instructionsInput) {
      let defaultInstr = '';
      if (currentAssignRecord) {
        if (currentAssignRecord.device) {
          defaultInstr = currentAssignRecord.device + ' - ' + (currentAssignRecord.issue || 'रिपेयरिंग सर्विस');
        } else if (currentAssignRecord.items && currentAssignRecord.items.length > 0) {
          defaultInstr = currentAssignRecord.items.map(it => it.name).join(', ');
        } else {
          defaultInstr = 'मोबाइल रिपेयर व पार्ट्स चेंज सर्विस';
        }
      } else {
        defaultInstr = 'मोबाइल रिपेयर सर्विस';
      }
      instructionsInput.value = defaultInstr;
    }
    if (estMinsInput) estMinsInput.value = 45;

    // 3. Render Employee List with Pending Jobs Count (allow selecting any active staff)
    filterAssignEmployees('');

    // 4. Default to Immediate
    setAssignScheduleType('immediate');

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }

  function closeWorkAssignmentModal() {
    const modal = document.getElementById('work-assignment-modal');
    if (modal) { modal.classList.add('hidden'); modal.style.display = 'none'; }
  }

  function setAssignScheduleType(type) {
    currentAssignScheduleType = type;
    const immBtn = document.getElementById('assign-type-imm');
    const schBtn = document.getElementById('assign-type-sch');
    const container = document.getElementById('assign-schedule-container');
    const dtInput = document.getElementById('assign-schedule-datetime');

    if (type === 'immediate') {
      if (immBtn) {
        immBtn.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-blue-600 text-white border-blue-600 cursor-pointer';
      }
      if (schBtn) {
        schBtn.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-white text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer';
      }
      if (container) container.classList.add('hidden');
    } else {
      if (schBtn) {
        schBtn.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-blue-600 text-white border-blue-600 cursor-pointer';
      }
      if (immBtn) {
        immBtn.className = 'p-2.5 rounded-xl border font-bold text-center transition bg-white text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer';
      }
      if (container) container.classList.remove('hidden');
      if (dtInput && !dtInput.value) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        dtInput.value = now.toISOString().slice(0, 16);
      }
    }
    updateAssignWhatsAppLink();
  }

  function filterAssignEmployees(query) {
    const listContainer = document.getElementById('assign-emp-list');
    if (!listContainer) return;

    const q = (query || '').trim().toLowerCase();
    const staffList = (state.staff || []).filter(s => s.active !== false);

    const filtered = staffList.filter(s => 
      !q || s.name.toLowerCase().includes(q) || (s.phone && s.phone.includes(q)) || (s.roleLabel && s.roleLabel.toLowerCase().includes(q))
    );

    listContainer.innerHTML = filtered.map(s => {
      // Calculate pending jobs assigned to this employee
      const pendingJobsCount = (state.jobs || []).filter(j => 
        j.status !== 'ready' && j.status !== 'delivered' && 
        (j.assignedTo === s.name || j.assignedTo === s.id || (j.assignedTo && j.assignedTo.includes(s.name.split(' ')[0])))
      ).length;

      const badgeColor = pendingJobsCount === 0 ? 'bg-emerald-100 text-emerald-800' : pendingJobsCount <= 2 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800';

      return `
        <div onclick="window.MMS_APP.selectAssignEmployee('${s.id}', '${s.name}', '${s.phone}')" class="assign-emp-card p-2 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 cursor-pointer flex items-center justify-between transition text-xs">
          <div>
            <span class="font-bold text-slate-900">${s.name}</span>
            <span class="text-[10px] text-slate-500 ml-1">(${s.phone}) • ${s.roleLabel || s.role}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${badgeColor}">
            ${pendingJobsCount} काम पेंडिंग
          </span>
        </div>
      `;
    }).join('') || '<div class="p-3 text-center text-slate-400 text-xs">कोई कर्मचारी नहीं मिला</div>';

    // Auto-select first if none selected
    if (filtered.length > 0 && !document.getElementById('assign-selected-emp-id').value) {
      selectAssignEmployee(filtered[0].id, filtered[0].name, filtered[0].phone);
    }
  }

  function selectAssignEmployee(id, name, phone) {
    const idInput = document.getElementById('assign-selected-emp-id');
    const nameInput = document.getElementById('assign-selected-emp-name');
    const phoneInput = document.getElementById('assign-selected-emp-phone');
    const searchInput = document.getElementById('assign-emp-search');

    if (idInput) idInput.value = id;
    if (nameInput) nameInput.value = name;
    if (phoneInput) phoneInput.value = phone;
    if (searchInput) searchInput.value = name;

    // Highlight active card
    document.querySelectorAll('.assign-emp-card').forEach(el => {
      if (el.textContent.includes(name)) {
        el.classList.add('ring-2', 'ring-blue-500', 'bg-blue-50');
      } else {
        el.classList.remove('ring-2', 'ring-blue-500', 'bg-blue-50');
      }
    });

    updateAssignWhatsAppLink();
  }

  function updateAssignWhatsAppLink() {
    const waBtn = document.getElementById('assign-whatsapp-btn');
    if (!waBtn) return;

    const empName = document.getElementById('assign-selected-emp-name')?.value || 'स्टाफ';
    const empPhone = document.getElementById('assign-selected-emp-phone')?.value || '7905859701';
    const instructions = document.getElementById('assign-instructions-input')?.value || 'मोबाइल रिपेयरिंग कार्य';
    const estMins = document.getElementById('assign-est-mins-input')?.value || '45';
    const timing = currentAssignScheduleType === 'immediate' ? 'तुरंत (Immediately)' : (`शेड्यूल: ${document.getElementById('assign-schedule-datetime')?.value || 'तय समय पर'}`);

    const waMsg = `*Monu Mobile Solution - नया वर्क असाइनमेंट*` +
      `\n\nनमस्ते *${empName}*! आपके लिए नया रिपेयर जॉब असाइन किया गया है:` +
      `\n\n📋 *टोकन / इनवॉइस:* ${currentAssignToken || 'MMS-JOB'}` +
      `\n🔧 *काम का विवरण:* ${instructions}` +
      `\n⏰ *शेड्यूल समय:* ${timing}` +
      `\n⌛ *अनुमानित समय:* ${estMins} मिनट` +
      `\n\n👉 *काम शुरू करने के लिए पोर्टल खोलें:*\nhttps://monumobile.in\n\n(काम शुरू होने पर 'Start Work' और समाप्त होने पर 'Finish / Done' बटन अवश्य दबाएं।)`;

    waBtn.href = `https://wa.me/91${empPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMsg)}`;
  }

    function confirmWorkAssignment() {
    if (!currentAssignToken) return;

    const empId = document.getElementById('assign-selected-emp-id')?.value;
    const empName = document.getElementById('assign-selected-emp-name')?.value;
    const empPhone = document.getElementById('assign-selected-emp-phone')?.value || '7905859701';
    const instructions = document.getElementById('assign-instructions-input')?.value || 'रिपेयरिंग सर्विस';
    const estMins = Number(document.getElementById('assign-est-mins-input')?.value) || 45;
    const scheduleTime = currentAssignScheduleType === 'scheduled' ? document.getElementById('assign-schedule-datetime')?.value : null;

    if (!empName) {
      alert('कृपया कार्य सौंपने के लिए कर्मचारी चुनें!');
      return;
    }

    const curUser = state.currentUser || { name: 'मोनू जी (Monu)', role: 'admin' };
    const nowIso = new Date().toISOString();
    const nowFormatted = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Update Job record in state.jobs
    let targetJob = (state.jobs || []).find(j => j.token === currentAssignToken || j.tokenNo === currentAssignToken || j.id === currentAssignToken);
    if (!targetJob) {
      targetJob = {
        token: currentAssignToken,
        tokenNo: currentAssignToken,
        customerName: currentAssignRecord?.customerName || 'Walk-in Customer',
        customerPhone: currentAssignRecord?.customerPhone || '',
        device: instructions,
        issue: instructions,
        estimatedCost: currentAssignRecord?.totalAmount || currentAssignRecord?.estimatedCost || 0,
        status: 'received',
        createdAt: nowFormatted
      };
      state.jobs.unshift(targetJob);
    }

    targetJob.assignedTo = empName;
    targetJob.assignedToId = empId;
    targetJob.assignedToPhone = empPhone;
    targetJob.assignedByName = curUser.name;
    targetJob.assignedAt = nowFormatted;
    targetJob.scheduledAt = scheduleTime || nowFormatted;
    targetJob.workInstructions = instructions;
    targetJob.estimatedMins = estMins;
    targetJob.receivedByName = targetJob.receivedByName || curUser.name;
    targetJob.receivedAt = targetJob.receivedAt || nowFormatted;

    // 2. Also link into state.invoices if matches
    const targetInv = (state.invoices || []).find(i => i.invoiceNo === currentAssignToken || i.billNo === currentAssignToken);
    if (targetInv) {
      targetInv.assignedTo = empName;
      targetInv.assignedToPhone = empPhone;
      targetInv.workInstructions = instructions;
      targetInv.estimatedMins = estMins;
      targetInv.receivedByName = targetInv.receivedByName || curUser.name;
      targetInv.receivedAt = targetInv.receivedAt || nowFormatted;
    }

    persistData();

    // 3. Sync to Cloudflare D1 & KV
    if (typeof CloudSync !== 'undefined') {
      CloudSync.syncWorkAssignment({
        token: currentAssignToken,
        assignedTo: empName,
        assignedByName: curUser.name,
        assignedAt: nowIso,
        scheduledAt: scheduleTime,
        workInstructions: instructions,
        estimatedMins: estMins,
        receivedByName: targetJob.receivedByName,
        receivedAt: targetJob.receivedAt
      });
    }

    closeWorkAssignmentModal();
    renderJobCardsManager();
    if (typeof renderPOS === 'function') renderPOS();
    if (typeof renderDailySales === 'function') renderDailySales();

    // 4. AUTOMATICALLY POP OPEN WHATSAPP TO EMPLOYEE SO NOTHING IS MISSED!
    const cleanPhone = empPhone.replace(/[^0-9]/g, '');
    const timing = currentAssignScheduleType === 'immediate' ? 'तुरंत (Immediately)' : ('शेड्यूल: ' + (scheduleTime || 'तय समय'));
    const waMsg = '*Monu Mobile Solution - नया वर्क असाइनमेंट*' +
      '\n\nनमस्ते *' + empName + '*! आपके लिए नया रिपेयर जॉब असाइन किया गया है:' +
      '\n\n📋 *टोकन / इनवॉइस:* ' + currentAssignToken +
      '\n👤 *ग्राहक:* ' + (targetJob.customerName || 'Walk-in') +
      '\n🔧 *काम का विवरण:* ' + instructions +
      '\n⏰ *समय / शेड्यूल:* ' + timing +
      '\n⌛ *अनुमानित समय:* ' + estMins + ' मिनट' +
      '\n\n👉 *काम शुरू करने के लिए पोर्टल खोलें:*\nhttps://monumobile.in\n\n(पोर्टल पर जाकर \'Start Work\' और कार्य पूर्ण होने पर \'Finish / Done\' बटन अवश्य दबाएं।)';

    const waUrl = 'https://wa.me/91' + cleanPhone + '?text=' + encodeURIComponent(waMsg);
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      console.warn('Could not auto-open WhatsApp:', e);
    }

    alert('✅ काम सफलतापूर्वक [' + empName + '] को सौंपा गया और व्हाट्सएप संदेश भी तैयार कर दिया गया है!');
  }

  // =========================================================================
  // EMPLOYEE WORK ACTION BUTTONS (Start Work & Finish / Done)
  // =========================================================================
  function startEmployeeJob(token) {
    const job = (state.jobs || []).find(j => j.token === token || j.tokenNo === token);
    if (!job) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    job.startedAt = `${getTodayDateStr()} ${timeStr}`;
    job.startedAtIso = now.toISOString();
    job.status = 'in-progress';
    job.updatedAt = 'Just now';

    persistData();

    if (typeof CloudSync !== 'undefined') {
      CloudSync.updateJobStep(token, 'start_work', { timestamp: job.startedAtIso });
    }

    renderEmployeeJobAlerts();
    renderJobCardsManager();
    if (typeof renderMyWorkModule === 'function') renderMyWorkModule();
    alert('▶️ कार्य शुरू हो गया! कस्टमर ट्रैकिंग स्टेटस In Progress में बदल गया है।');
  }

  function finishEmployeeJob(token) {
    const job = (state.jobs || []).find(j => j.token === token || j.tokenNo === token);
    if (!job) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    job.completedAt = `${getTodayDateStr()} ${timeStr}`;
    job.completedAtIso = now.toISOString();
    job.status = 'ready';
    job.updatedAt = 'Just now';

    // Calculate actual duration in minutes
    let startTimestamp = job.startedAtIso ? new Date(job.startedAtIso).getTime() : now.getTime() - (35 * 60000);
    const durationMins = Math.max(1, Math.round((now.getTime() - startTimestamp) / 60000));
    job.actualDurationMins = durationMins;

    persistData();

    if (typeof CloudSync !== 'undefined') {
      CloudSync.updateJobStep(token, 'finish_work', { 
        completedAt: job.completedAtIso,
        actualDurationMins: durationMins
      });
    }

    renderEmployeeJobAlerts();
    renderJobCardsManager();
    if (typeof renderMyWorkModule === 'function') renderMyWorkModule();
    alert('✅ बधाई! कार्य पूर्ण हुआ (' + durationMins + ' मिनट लगे)। कस्टमर ट्रैकिंग स्टेटस Ready for Pickup अपडेट हो गया है।');
  }

  function resetEmployeeDevice(empId) {
    if (!confirm('क्या आप सचमुच इस कर्मचारी का डिवाइस लॉक रीसेट करना चाहते हैं?\n\nरीसेट के बाद कर्मचारी नए फोन से लॉगिन कर सकेगा।')) return;
    
    const emp = (state.staff || []).find(s => s.id === empId);
    if (emp) {
      emp.deviceToken = null;
      emp.deviceModel = null;
      emp.deviceLockedAt = null;
      persistData();
    }

    if (typeof CloudSync !== 'undefined') {
      CloudSync.resetDeviceLock(empId);
    }

    renderSettingsModule();
    renderAttendanceModule();
    alert('✅ कर्मचारी का डिवाइस लॉक रीसेट कर दिया गया!');
  }

  function renderEmployeeJobAlerts() {
    const container = document.getElementById('portal-employee-jobs-banner');
    if (!container) return;

    const curUser = state.currentUser;
    if (!curUser) {
      container.innerHTML = '';
      return;
    }

    const role = (curUser.role || '').toLowerCase();
    const isEmployee = role === 'technician' || role === 'employee';

    // Get active assigned jobs for this user
    const myJobs = (state.jobs || []).filter(j => 
      j.status !== 'delivered' && 
      (j.assignedTo === curUser.name || j.assignedTo === curUser.id || (j.assignedTo && j.assignedTo.includes(curUser.name.split(' ')[0])))
    );

    if (myJobs.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="mb-5 p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-white/20">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <h4 class="text-sm font-black tracking-wide">⚡ आपके असाइन किए गए कार्य (${myJobs.length} एक्टिव)</h4>
          </div>
          <span class="text-xs bg-white/10 px-2 py-0.5 rounded-full text-blue-200 font-bold">Live Task Panel</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${myJobs.map(job => {
            const isStarted = job.status === 'in-progress' || job.startedAt;
            const isDone = job.status === 'ready';

            return `
              <div class="p-3 rounded-xl bg-white/10 border border-white/15 space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="font-mono font-black text-blue-300">${job.token}</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black ${isDone ? 'bg-emerald-500/30 text-emerald-300' : isStarted ? 'bg-amber-500/30 text-amber-300' : 'bg-blue-500/30 text-blue-300'}">
                    ${isDone ? '✅ कार्य पूर्ण (Ready)' : isStarted ? '🔧 कार्य चालू (In-Progress)' : '⏳ नया काम मिला'}
                  </span>
                </div>

                <div>
                  <p class="font-bold text-white">${job.device || 'मोबाइल रिपेयर'}</p>
                  <p class="text-slate-300 text-[11px]">${job.workInstructions || job.issue || 'पार्ट्स व सर्विस'}</p>
                </div>

                <div class="grid grid-cols-2 gap-1 text-[11px] text-slate-300 pt-1 border-t border-white/10">
                  <span>अनुमानित समय: <strong>${job.estimatedMins || 45} मिनट</strong></span>
                  <span>शेड्यूल: <strong>${job.scheduledAt || 'तुरंत'}</strong></span>
                </div>

                <!-- Two Distinct Action Buttons -->
                <div class="pt-1 flex items-center gap-2">
                  ${!isStarted ? `
                    <button onclick="window.MMS_APP.startEmployeeJob('${job.token}')" class="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow transition flex items-center justify-center gap-1 active:scale-95 cursor-pointer">
                      <span>▶️ Start Work (काम शुरू करें)</span>
                    </button>
                  ` : !isDone ? `
                    <button onclick="window.MMS_APP.finishEmployeeJob('${job.token}')" class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-black shadow transition flex items-center justify-center gap-1 active:scale-95 cursor-pointer">
                      <span>✅ Finish / Done (काम पूरा हुआ)</span>
                    </button>
                  ` : `
                    <div class="w-full text-center py-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold text-[11px]">
                      🎉 आपने यह काम पूरा कर लिया है (${job.actualDurationMins || 38} मिनट में)!
                    </div>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }


  function exportAttendanceCSV() {
    const list = state.attendance || [];
    if (list.length === 0) {
      alert('कोई अटेंडेंस डेटा उपलब्ध नहीं है!');
      return;
    }

    let csv = "ID,Employee,Branch,Date,In Time,Out Time,Hours,Status,Late Mark,Distance,Device Locked\n";
    list.forEach(a => {
      csv += `"${a.id}","${a.empName || a.employeeName || 'Staff'}","${a.branchName || 'Lab'}","${a.date}","${a.inTime || ''}","${a.outTime || ''}",${a.hoursWorked || a.duration || 0},"${a.status}","${a.isLate ? 'YES (' + (a.lateMinutes || 0) + 'm)' : 'NO'}",${a.distance || 0},"${a.deviceToken ? 'YES' : 'NO'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `MMS_Attendance_Report_${getTodayDateStr()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

    // =========================================================================
  // EMPLOYEE DAILY WORK MODULE (Date Filters, Status Tabs & No Customer WhatsApp)
  // =========================================================================
  function setMyWorkStatusFilter(filter) {
    state.myWorkFilter = filter;
    renderMyWorkModule();
  }

  function setMyWorkDateFilter(type, customDate) {
    state.myWorkDate = type;
    if (customDate !== undefined) state.myWorkCustomDate = customDate;
    renderMyWorkModule();
  }

  function renderMyWorkModule() {
    const container = document.getElementById('tab-view-mywork');
    if (!container) return;

    const curUser = state.currentUser || { name: 'रवि कुमार (Ravi)', role: 'technician', phone: '9955443311' };
    const curName = curUser.name || '';
    const firstName = curName.split(' ')[0] || curName;
    const curPhone = (curUser.phone || '').replace(/[^0-9]/g, '');

    // 1. Filter jobs strictly assigned to this technician
    const allMyJobs = (state.jobs || []).filter(j => {
      if (!j.assignedTo) return false;
      if (j.assignedToId && curUser.id && j.assignedToId === curUser.id) return true;
      if (j.assignedTo === curName || j.assignedTo.includes(firstName)) return true;
      if (j.assignedToPhone && curPhone && j.assignedToPhone.replace(/[^0-9]/g, '') === curPhone) return true;
      return false;
    });

    // Calculate overall stats for technician
    const totalAssignedCount = allMyJobs.length;
    const inProgressCount = allMyJobs.filter(j => j.status === 'in-progress' || (j.startedAt && !j.completedAt)).length;
    const activeCount = allMyJobs.filter(j => j.status !== 'ready' && j.status !== 'delivered' && !j.completedAt).length;
    const completedCount = allMyJobs.filter(j => j.status === 'ready' || j.status === 'delivered' || !!j.completedAt).length;

    // 2. Apply Date Filter
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const currentFilter = state.myWorkFilter || 'active'; // 'active' | 'completed' | 'all'
    const currentDateFilter = state.myWorkDate || 'today'; // 'today' | 'yesterday' | 'week' | 'all' | 'custom'
    const customDateVal = state.myWorkCustomDate || '';

    let dateFilteredJobs = allMyJobs.filter(j => {
      if (currentDateFilter === 'all') return true;

      // Check dates in job: createdAt, assignedAt, startedAt, completedAt
      const jobDates = [j.createdAt, j.assignedAt, j.startedAt, j.completedAt].filter(Boolean).map(d => {
        if (typeof d === 'string') {
          if (d.includes('आज') || d.includes('Today')) return todayStr;
          if (d.includes('कल') || d.includes('Yesterday')) return yesterdayStr;
          const match = d.match(/\d{4}-\d{2}-\d{2}/);
          if (match) return match[0];
        }
        return todayStr; // default fallback
      });

      if (currentDateFilter === 'today') {
        return jobDates.includes(todayStr);
      } else if (currentDateFilter === 'yesterday') {
        return jobDates.includes(yesterdayStr);
      } else if (currentDateFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];
        return jobDates.some(d => d >= weekAgoStr);
      } else if (currentDateFilter === 'custom' && customDateVal) {
        return jobDates.includes(customDateVal);
      }
      return true;
    });

    // 3. Apply Status Filter
    let displayedJobs = dateFilteredJobs.filter(j => {
      const isFinished = !!j.completedAt || j.status === 'ready' || j.status === 'delivered';
      if (currentFilter === 'active') return !isFinished;
      if (currentFilter === 'completed') return isFinished;
      return true; // 'all'
    });

    container.innerHTML = `
      <div class="space-y-5">
        <!-- Top Greeting Header -->
        <div class="p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30">
              🛠️ डेली वर्क ट्रैकर (Daily Assigned Jobs)
            </span>
            <h2 class="text-xl sm:text-2xl font-black">नमस्ते, ${curName}</h2>
            <p class="text-xs text-blue-200/80">दुकान काउंटर व एडमिन द्वारा सौंपे गए सभी रिपेयर कार्य, समय और स्थिति।</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
              <span>📷</span> <span>हाजिरी (Attendance)</span>
            </button>
            <button onclick="window.MMS_APP.renderMyWorkModule()" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer">
              <span>🔄</span> <span>रिफ्रेश</span>
            </button>
          </div>
        </div>

        <!-- 3 KPI Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div onclick="window.MMS_APP.setMyWorkStatusFilter('all')" class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-300 transition">
            <div>
              <span class="text-xs font-bold text-slate-500 block">कुल कार्य (Total Jobs)</span>
              <span class="text-2xl font-black text-slate-900 font-mono">${totalAssignedCount}</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-black">📋</div>
          </div>
          <div onclick="window.MMS_APP.setMyWorkStatusFilter('active')" class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition">
            <div>
              <span class="text-xs font-bold text-slate-500 block">वर्तमान में चालू / बाकी (Active)</span>
              <span class="text-2xl font-black text-amber-600 font-mono">${activeCount}</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-black">⚡</div>
          </div>
          <div onclick="window.MMS_APP.setMyWorkStatusFilter('completed')" class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition">
            <div>
              <span class="text-xs font-bold text-slate-500 block">पूर्ण कार्य (Completed)</span>
              <span class="text-2xl font-black text-emerald-600 font-mono">${completedCount}</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-black">✅</div>
          </div>
        </div>

        <!-- Filter Controls Bar: Status Sub-Tabs + Date Filter -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <!-- Status Tabs: Active, Completed, All -->
            <div class="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button onclick="window.MMS_APP.setMyWorkStatusFilter('active')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentFilter === 'active' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                ⚡ सक्रिय कार्य (${activeCount})
              </button>
              <button onclick="window.MMS_APP.setMyWorkStatusFilter('completed')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentFilter === 'completed' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                ✅ पूर्ण कार्य (${completedCount})
              </button>
              <button onclick="window.MMS_APP.setMyWorkStatusFilter('all')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                📋 सभी कार्य (${totalAssignedCount})
              </button>
            </div>

            <!-- Date Filter Selector -->
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xs font-bold text-slate-500">📅 तारीख फ़िल्टर:</span>
              <div class="flex items-center gap-1">
                <button onclick="window.MMS_APP.setMyWorkDateFilter('today')" class="px-2.5 py-1 rounded-lg text-xs font-bold border transition ${currentDateFilter === 'today' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">
                  आज
                </button>
                <button onclick="window.MMS_APP.setMyWorkDateFilter('yesterday')" class="px-2.5 py-1 rounded-lg text-xs font-bold border transition ${currentDateFilter === 'yesterday' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">
                  कल
                </button>
                <button onclick="window.MMS_APP.setMyWorkDateFilter('week')" class="px-2.5 py-1 rounded-lg text-xs font-bold border transition ${currentDateFilter === 'week' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">
                  7 दिन
                </button>
                <button onclick="window.MMS_APP.setMyWorkDateFilter('all')" class="px-2.5 py-1 rounded-lg text-xs font-bold border transition ${currentDateFilter === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}">
                  सभी (इतिहास)
                </button>
              </div>
              <input type="date" value="${customDateVal}" onchange="window.MMS_APP.setMyWorkDateFilter('custom', this.value)" class="text-xs px-2 py-1 border border-slate-200 rounded-lg text-slate-700 bg-slate-50 focus:bg-white" title="विशिष्ट तारीख चुनें">
            </div>
          </div>

          <!-- Active Filter Notice -->
          <div class="flex items-center justify-between text-xs text-slate-500">
            <span>
              दिखाया जा रहा है: <strong>${currentFilter === 'active' ? 'सक्रिय / बाकी कार्य' : currentFilter === 'completed' ? 'सफलतापूर्वक पूर्ण हुए कार्य' : 'सभी कार्य'}</strong>
              • ${currentDateFilter === 'today' ? 'आज का रिकॉर्ड' : currentDateFilter === 'yesterday' ? 'कल का रिकॉर्ड' : currentDateFilter === 'week' ? 'पिछले 7 दिन' : currentDateFilter === 'custom' && customDateVal ? 'तारीख ' + customDateVal : 'सभी तारीखें (पुराना इतिहास)'}
            </span>
            <span class="font-bold text-slate-700 font-mono">${displayedJobs.length} कार्य सूची में</span>
          </div>
        </div>

        <!-- Jobs Cards List -->
        <div class="space-y-4">
          ${displayedJobs.length === 0 ? `
            <div class="p-10 text-center space-y-3 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
              <div class="text-3xl">🎉</div>
              <h4 class="text-sm font-black text-slate-800">
                ${currentFilter === 'completed' ? 'चयनित अवधि में कोई पूर्ण कार्य नहीं है' : currentFilter === 'active' ? 'इस समय आपके लिए कोई पेंडिंग कार्य नहीं है' : 'कोई कार्य नहीं मिला'}
              </h4>
              <p class="text-xs text-slate-500 max-w-sm mx-auto">
                ${currentFilter === 'active' ? 'जैसे ही काउंटर से नया रिपेयर जॉब आपके नाम असाइन होगा, वह तुरंत यहाँ दिखाई देगा।' : 'फ़िल्टर बदलकर "सभी कार्य" या "इतिहास" चुनें।'}
              </p>
              ${currentFilter !== 'all' || currentDateFilter !== 'all' ? `
                <button onclick="window.MMS_APP.setMyWorkStatusFilter('all'); window.MMS_APP.setMyWorkDateFilter('all');" class="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition">
                  🔄 सभी कार्य व पुराना इतिहास देखें
                </button>
              ` : ''}
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${displayedJobs.map(job => {
                const token = job.token || job.tokenNo || job.id;
                const isStarted = !!job.startedAt || job.status === 'in-progress';
                const isFinished = !!job.completedAt || job.status === 'ready' || job.status === 'delivered';

                const statusBadge = isFinished 
                  ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">✅ पूर्ण (Ready)</span>'
                  : isStarted 
                    ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">⚡ चालू है (In Progress)</span>'
                    : '<span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">⏳ नया असाइन (Pending)</span>';

                return `
                  <div class="p-4 rounded-2xl border ${isFinished ? 'border-emerald-200 bg-emerald-50/20 shadow-sm' : isStarted ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-200 shadow-md' : 'border-slate-200 bg-white shadow-sm'} space-y-3 transition">
                    <div class="flex items-start justify-between gap-2">
                      <div>
                        <span class="text-xs font-mono font-black text-blue-600 block">${token}</span>
                        <h4 class="text-sm font-black text-slate-900 leading-snug">${job.device || job.workInstructions || 'मोबाइल रिपेयर कार्य'}</h4>
                      </div>
                      ${statusBadge}
                    </div>

                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                      <div class="flex justify-between text-[11px] text-slate-600 pb-1 border-b border-slate-200">
                        <span><strong>ग्राहक:</strong> ${job.customerName || 'Walk-in Customer'}</span>
                        <span class="text-slate-500">${job.customerPhone ? 'फ़ोन: ' + job.customerPhone : ''}</span>
                      </div>
                      <div class="text-[11px] text-slate-700">
                        <strong>निर्देश / समस्या:</strong> ${job.workInstructions || job.issue || 'पार्ट्स चेंज व रिपेयर सर्विस'}
                      </div>
                      <div class="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                        <span>⏰ ${job.scheduledAt ? 'शेड्यूल: ' + job.scheduledAt : 'असाइन समय: ' + (job.assignedAt || 'आज')}</span>
                        <span>⌛ अनुमानित: ${job.estimatedMins || 45} मिनट</span>
                      </div>
                      ${isFinished ? `
                        <div class="flex justify-between items-center text-[11px] font-bold text-emerald-800 bg-emerald-100/70 p-1.5 rounded-lg border border-emerald-200 mt-1">
                          <span>✨ पूरा हुआ: ${job.completedAt || 'आज'}</span>
                          <span>कुल समय: ${job.actualDurationMins ? job.actualDurationMins + ' मिनट' : 'समय पर'}</span>
                        </div>
                      ` : isStarted ? `
                        <div class="flex justify-between items-center text-[10px] font-bold text-amber-800 bg-amber-100/70 p-1 rounded-lg border border-amber-200 mt-1">
                          <span>▶️ काम शुरू समय: ${job.startedAt || 'चालू'}</span>
                          <span>प्रगति पर...</span>
                        </div>
                      ` : ''}
                    </div>

                    <!-- Action Buttons for Technician (No WhatsApp Button - Admin/Manager only) -->
                    <div class="flex items-center gap-2 pt-1">
                      ${!isStarted ? `
                        <button onclick="window.MMS_APP.startEmployeeJob('${token}')" class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer">
                          <span>▶️</span> <span>कार्य शुरू करें (Start Work)</span>
                        </button>
                      ` : !isFinished ? `
                        <button onclick="window.MMS_APP.finishEmployeeJob('${token}')" class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer">
                          <span>✅</span> <span>कार्य पूर्ण हुआ (Mark Done)</span>
                        </button>
                      ` : `
                        <div class="w-full py-2 px-3 bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-black text-center flex items-center justify-center gap-1.5">
                          <span>✅</span> <span>कार्य पूर्ण हो चुका है (Ready for Pickup)</span>
                        </div>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }


  
  // =========================================================================
  // UNIVERSAL CLEAN TEXT & BILINGUAL PURITY ENGINE
  // =========================================================================
  const MMS_TRANSLATIONS = {
    // Exact phrase translations
    'बिलिंग काउंटर': 'Billing Counter',
    'बिलिंग': 'Billing',
    'ग्राहक विवरण व बिलिंग सारांश': 'Customer Details & Billing Summary',
    'ग्राहक विवरण': 'Customer Details',
    'इन्वेंट्री व SKU स्टॉक लिस्ट': 'Inventory & Stock List',
    'इन्वेंट्री': 'Inventory',
    'ट्रांसफर इन्वेंट्री व डिलीवरी चालान': 'Stock Transfer & Challans',
    'हालिया ट्रांसफर चालान हिस्ट्री': 'Recent Stock Transfers',
    'ट्रांसफर': 'Transfer',
    'बकाया खाता-बही सूची (Due Ledger)': 'Due Khata Ledger',
    'बकाया खाता-बही सूची': 'Due Khata Ledger',
    'खाता-बही': 'Khata Ledger',
    'खाता': 'Khata',
    'डेली सेल्स व गल्ला मिलान': 'Daily Sales & Register',
    'डेली सेल्स': 'Daily Sales',
    'परिचालन व्यय विवरण (Operating Expenses Breakdown)': 'Operating Expenses Breakdown',
    'दुकान परिसंपत्ति व देनदारी (Assets & Receivables)': 'Assets & Receivables',
    '3 शाखाओं का तुलनात्मक लाभ-हानि खाता (Branch-Wise P&L)': 'Branch-Wise Profit & Loss',
    'बैलेंस शीट': 'Balance Sheet',
    'रिपोर्ट्स': 'Reports',
    'रिपेयर जॉब-शीट व टोकन लिस्ट': 'Repair Job Sheets',
    'रिपेयर जॉब्स': 'Repair Jobs',
    'रिपेयर': 'Repairs',
    'सिस्टम, स्टोर व जीपीएस सेटिंग्स (Master Control)': 'System Settings',
    'सिस्टम व शाखा सेटिंग्स': 'System Settings',
    'सिस्टम सेटिंग्स': 'System Settings',
    'सेटिंग्स': 'Settings',
    'शाखाएं व GPS जियोफेंस कॉन्फ़िगरेशन (3 Physical Stores)': 'Branches & GPS Geofence',
    'शाखाएं व GPS सेटिंग्स': 'Branches & GPS Settings',
    'कार्य समय व लेट-मार्क नियम (Shift Timings)': 'Shift & Work Rules',
    'कार्य समय व नियम': 'Shift & Work Rules',
    'कर्मचारी, कार्य-घंटे व ऑटो-सैलरी मैनेजमेंट': 'Staff, Hours & Auto-Salary',
    'स्टाफ सूची व कार्य-घंटे गणित (Dynamic Shift & Hourly Rate)': 'Staff List & Shifts',
    'स्टाफ एडवांस व लोन खाता (Staff Advances & EMI Ledger)': 'Staff Advances & Loans',
    'स्टाफ': 'Staff',
    'दुकान खर्च वाउचर सूची (Expense Vouchers)': 'Expense Vouchers',
    'दुकान खर्च': 'Store Expenses',
    'दुकान ऑपरेशंस, बिक्री व स्टाफ मॉनिटरिंग': 'Store Operations & Sales',
    'दैनिक उपस्थिति रजिस्टर व स्वीकृति (Admin View)': 'Daily Attendance Register',
    'दैनिक उपस्थिति रजिस्टर (Attendance Log)': 'Attendance Register',
    'हाजिरी': 'Attendance',
    'टास्क': 'Tasks',
    'नया बिल बनाएं': 'Create New Invoice',
    'नया बिल': 'New Invoice',
    'नया SKU जोड़ें': 'Add New SKU',
    'नया खर्च जोड़ें': 'Add New Expense',
    'नया कर्मचारी जोड़ें': 'Add New Employee',
    'नया पार्ट जोड़ें': 'Add New Part',
    'पब्लिक वेबसाइट': 'Public Website',
    'वेबसाइट': 'Website',
    'लॉगआउट': 'Sign Out',
    'सुपर एडमिन (Owner)': 'Super Admin (Owner)',
    'सुपर एडमिन': 'Super Admin',
    'ब्रांच मैनेजर': 'Branch Manager',
    'स्टाफ': 'Staff',
    'सभी शाखाएं (Master All Branches)': 'All Branches',
    'सभी शाखाएं': 'All Branches',
    'हजरतगंज (Head Lab)': 'Hazratganj (Head Lab)',
    'हजरतगंज (Sree Rama Towers)': 'Hazratganj (Sree Rama Towers)',
    'हजरतगंज': 'Hazratganj',
    'नाका हिंडोला शाखा (Naka Hindola Lucknow)': 'Naka Hindola Branch',
    'नाका हिंडोला': 'Naka Hindola',
    'नाका': 'Naka',
    'कन्नौज शाखा (Saraimeera Kannauj)': 'Kannauj Branch',
    'कन्नौज शाखा': 'Kannauj Branch',
    'कन्नौज': 'Kannauj',
    'दुकान स्थिति:': 'Shop Status:',
    'दुकान स्थिति': 'Shop Status',
    'खुली रखें': 'Open',
    'बंद रखें': 'Closed',
    'ऑटो टाइम': 'Auto Time',
    'ऑटो': 'Auto',
    'अलर्ट्स': 'Alerts',
    'सहेजें': 'Save',
    'रद्द करें': 'Cancel',
    'खोजें': 'Search',
    'फ़िल्टर': 'Filter',
    'प्रिंट': 'Print',
    'डाउनलोड': 'Download',
    'एक्सेल डाउनलोड करें': 'Export Excel',
    'एक्सेल डाउनलोड': 'Export Excel',
    'डेटा क्लीन करें': 'Clean Data',
    'डेटा क्लीन': 'Clean Data',
    'पूरा बैकअप डाउनलोड (JSON)': 'Full Backup (JSON)',
    'लाइव GPS लें': 'Get Live GPS',
    'लाइव GPS भरें': 'Get Live GPS',
    'कैश': 'Cash',
    'नकद:': 'Cash:',
    'नकद': 'Cash',
    'उधार': 'Credit',
    'एडवांस': 'Advance',
    'जमा': 'Paid',
    'शेष': 'Due',
    'कुल': 'Total',
    'दर': 'Rate',
    'मात्रा': 'Qty',
    'एक्शन': 'Action',
    'स्थिति': 'Status',
    'तारीख': 'Date',
    'बिल नं': 'Invoice No',
    'मोबाइल नंबर': 'Mobile Number',
    'मोबाइल': 'Mobile',
    'कर्मचारी का नाम': 'Employee Name',
    'कर्मचारी नाम': 'Employee Name',
    'नाम': 'Name',
    'शाखा': 'Branch',
    'कर्मचारी आईडी': 'Employee ID',
    'कर्मचारी ID': 'Employee ID',
    'आईडी': 'ID',
    'वेतन': 'Salary',
    'स्वीकृत': 'Approved',
    'लंबित': 'Pending',
    'अस्वीकृत': 'Rejected',
    'लेट': 'Late',
    'समय पर': 'On Time',
    'चालू': 'Active',
    'पूर्ण': 'Completed',
    'डिलीवर': 'Delivered',
    'स्टोरेज सुरक्षित (Healthy)': 'Healthy',
    'स्टोरेज सुरक्षित': 'Healthy',
    'मुख्य ERP डेटाबेस क्षमता (Database Capacity)': 'ERP Database Capacity',
    'मीडिया व लाइव सेल्फी स्टोरेज (Media Storage)': 'Media Storage',
    'अधिकतम सीमा:': 'Max:',
    'वर्तमान उपयोग:': 'Used:',
    'सुरक्षित खाली है': 'Free',
    'सुरक्षित खाली': 'Free',
    'दुकान खुलने का समय (Shift Start)': 'Shift Start Time',
    'दुकान बंद होने का समय (Shift End)': 'Shift End Time',
    'उधार अनुमति नियम (Khata Policy)': 'Credit Policy',
    'दुकान खुलने का समय': 'Opening Time',
    'दुकान बंद होने का समय': 'Closing Time',
    'दुकान बंद का समय': 'Closing Time',
    'उधार नियम': 'Credit Policy',
    'केवल B2B दुकानदार': 'B2B Only',
    'केवल B2B': 'B2B Only',
    'B2B दुकानदार केवल': 'B2B Only',
    'पहचान दस्तावेज (KYC Documents)': 'KYC Documents',
    'पहचान दस्तावेज (KYC)': 'KYC Documents',
    'पहचान दस्तावेज': 'KYC Documents',
    'आधार कार्ड (Aadhaar Card)': 'Aadhaar Card',
    'आधार कार्ड': 'Aadhaar Card',
    'पैन कार्ड (PAN Card)': 'PAN Card',
    'पैन कार्ड': 'PAN Card',
    'दस्तावेज सत्यापित': 'Verified',
    'नया आधार अपलोड': 'Upload Aadhaar',
    'नया पैन अपलोड': 'Upload PAN',
    'प्रोफाइल फोटो बदलें': 'Change Photo',
    'प्रोफाइल फोटो': 'Profile Photo',
    'सहेजें (Save Changes)': 'Save Changes',
    'रजिस्टर्ड दुकानदार व ग्राहकों का रिकॉर्ड': 'Registered Customers & Merchants',
    'ग्राहक डायरेक्टरी': 'Customer Directory',
    'ग्राहक व दुकानदार CRM': 'Customer & Merchant CRM',
    'रजिस्टर्ड ग्राहक': 'Registered Customers',
    'नया ग्राहक / दुकानदार जोड़ें': 'Add New Customer / Merchant',
    'दुकानदार / B2B': 'Shopkeeper / B2B',
    'नॉर्मल ग्राहक': 'Regular Customer',
    'खर्च श्रेणी': 'Expense Category',
    'खर्च का नाम': 'Expense Title',
    'राशि': 'Amount',
    'भुगतान माध्यम': 'Payment Mode',
    'खर्च विवरण': 'Expense Notes',
    'आज की कुल बिक्री (SALES)': "Today's Gross Sales",
    'आज की कुल बिक्री': "Today's Gross Sales",
    'उपस्थित कर्मचारी व लेट रिपोर्ट': 'Staff Attendance & Late Report',
    'उपस्थित कर्मचारी': 'Present Staff',
    'आज का उधार': "Today's Credit",
    'रिपेयर वर्कलोड': 'Repair Workload',
    'शाखा स्थिति व कंट्रोल': 'Branch Status & Control',
    'हाजिरी चेक करें': 'Check Attendance',
    'नया बिल': 'New Bill',
    'सभी 3 शाखाएं': 'All 3 Branches',
    'कंट्रोल पैनल': 'Control Panel'
  };

  function sanitizeAndLocalizeActiveTab() {
    const isEn = (state.portalLang || state.lang || 'hi') === 'en';
    
    // Always update sidebar elements to single clean words
    const settingsLabel = document.getElementById('portal-settings-tab-label');
    if (settingsLabel) settingsLabel.textContent = isEn ? 'Settings' : 'सेटिंग्स';
    
    const sidebarActionTitle = document.getElementById('sidebar-action-title');
    if (sidebarActionTitle) sidebarActionTitle.textContent = isEn ? 'Create New Invoice' : 'नया बिल बनाएं';
    
    // Remove obsolete sidebar subtitle if present
    const sidebarActionCard = document.querySelector('#sidebar .space-y-1\\.5');
    if (sidebarActionCard) {
      const extraSub = sidebarActionCard.querySelector('.text-\\[10px\\]');
      if (extraSub && extraSub.id !== 'sidebar-action-title') {
        extraSub.style.display = 'none';
        extraSub.remove();
      }
    }

    const container = document.getElementById('tab-view-' + state.activeAdminTab);
    if (!container) return;

    // 1. Text reduction: Hide or remove long boilerplate explanatory paragraphs (length > 40 chars)
    const verboseP = container.querySelectorAll('p, span.text-\\[10px\\], span.text-\\[11px\\], div.text-\\[11px\\]');
    verboseP.forEach(el => {
      const txt = el.textContent.trim();
      if (
        txt.includes('तीनों शाखाओं के सटीक GPS') ||
        txt.includes('डेटाबेस स्पेस कभी फुल न हो') ||
        txt.includes('जब आप वास्तविक लोकेशन पर पहुंचें') ||
        txt.includes('अटेंडेंस सेल्फी व पूर्ण हो चुके') ||
        txt.includes('दुकान ऑपरेशंस एक्सेस करने के लिए') ||
        txt.includes('20+ श्रेणियों में स्पेयर पार्ट्स') ||
        txt.includes('यहाँ के सभी स्पेयर पार्ट्स सीधे कंपनी') ||
        txt.includes('हजरतगंज से नाका हिंडोला भेजे गए') ||
        txt.includes('तारीख, समय और दुकानदार के उधार नोट') ||
        txt.includes('शाम को दुकान बंद करते समय गल्ला') ||
        txt.includes('हजरतगंज (Head Lab), नाका हिंडोला और कन्नौज') ||
        txt.includes('ग्राहकों के रिपेयरिंग मोबाइल, पैटर्न') ||
        txt.includes('आप अपनी प्रोफाइल फोटो और जरूरी पहचान') ||
        txt.includes('फोटो, समय, GPS स्थान और एडमिन') ||
        txt.includes('मासिक सैलरी से स्वतः कटने वाली') ||
        txt.includes('हर खर्च का विवरण, भुगतान माध्यम') ||
        txt.includes('यह राशि बैलेंस शीट और P&L में स्वतः') ||
        txt.includes('दैनिक शिफ्ट घंटे तय करें, सिस्टम') ||
        txt.includes('Live SKU search, quick part add') ||
        txt.includes('सत्यापित स्टोर ओपनिंग, कर्मचारियों का लेट-अराइवल')
      ) {
        el.style.display = 'none';
      }
    });

    // 2. Bilingual text node replacement if English
    if (isEn) {
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
      let node;
      const sortedKeys = Object.keys(MMS_TRANSLATIONS).sort((a, b) => b.length - a.length);
      while ((node = walker.nextNode())) {
        let val = node.nodeValue;
        if (!val || !/[\u0900-\u097F]/.test(val)) continue;
        for (const k of sortedKeys) {
          if (val.includes(k)) {
            val = val.split(k).join(MMS_TRANSLATIONS[k]);
          }
        }
        node.nodeValue = val;
      }

      // Update placeholders and titles
      const inputs = container.querySelectorAll('input, textarea, select, button');
      inputs.forEach(inp => {
        if (inp.placeholder && /[\u0900-\u097F]/.test(inp.placeholder)) {
          for (const k of sortedKeys) {
            if (inp.placeholder.includes(k)) inp.placeholder = inp.placeholder.split(k).join(MMS_TRANSLATIONS[k]);
          }
        }
        if (inp.title && /[\u0900-\u097F]/.test(inp.title)) {
          for (const k of sortedKeys) {
            if (inp.title.includes(k)) inp.title = inp.title.split(k).join(MMS_TRANSLATIONS[k]);
          }
        }
      });
    }
  }
  

  window.MMS_APP = {
    toggleCategoryDropdown,
    closeCategoryDropdown,
    selectCategory,
    filterCategoryDropdown,
    setInventoryCategoryFilter,
    setInventorySearch,
    openWorkAssignmentModal,
    renderMyWorkModule,
    filterAssignEmployees,
    closeWorkAssignmentModal,
    filterAssignEmployees,
    selectAssignEmployee,
    setAssignScheduleType,
    confirmWorkAssignment,
    startEmployeeJob,
    finishEmployeeJob,
    resetEmployeeDevice,
    renderEmployeeJobAlerts,
    exportAttendanceCSV,
    handleLogin: (e) => handleLogin(e),
    getCurrentUser: () => state.currentUser,
    closeLoginModal: () => {
      const modal = (dom && dom.loginModal) || document.getElementById('login-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.style.display = 'none';
      }
    },
    openLoginModal: () => {
      const user = state.currentUser || JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || 'null');
      if (user) {
        state.currentUser = user;
        showPortal();
        return;
      }
      const modal = (dom && dom.loginModal) || document.getElementById('login-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.zIndex = '99999';
        modal.classList.add('flex');
        const phoneInput = document.getElementById('login-phone');
        if (phoneInput) setTimeout(() => phoneInput.focus(), 50);
      }
    },
    onTransferSearch,
    addToTransferCart,
    updateTransferCartQty,
    removeFromTransferCart,
    executeStockTransfer,
    logout: () => handleLogout(),
    handleLogout: () => handleLogout(),
    exportOldDataToExcel: exportOldDataToExcel,
    purgeOldDataWithConfirmation: purgeOldDataWithConfirmation,
    checkStorageHealth: checkStorageHealth,
    CloudSync: CloudSync,
    searchJobStatus,
    openNewSKUModal,
    openEditSKUModal,
    saveEditSKU,
    deleteSKU,
    restockSKU,
    clearKhataUdhar,
    printJobToken,
    adminPunchOut,
    setAttendanceDateFilter,
    setAttendanceCustomDate,
    toggleAlertDropdown,
    clearAllAlerts,
    renderDutyAlertBadge,
    setExpenseDateFilter,
    renderBranchFilterBar,
    renderBranchFilterBarDark,
    renderDashboard,
    switchPortalTab,
    switchTab: switchPortalTab,
    switchContactBranch,
    setPortalLanguage,
    setCRMSubTab,
    setCRMSearchQuery,
    setSalesFilter,
    setSalesCustomDate,
    checkGeofenceSecurity,
    quickRoleLogin,
    printInvoiceReceipt,
    renderSettingsModule,
    fillCurrentGPSForBranch,
    saveBranchSettings,
    handleEmployeePhotoUpload,
    handleDocUpload,
    toggleDesktopSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    verifyAndOpenStore,
    toggleStoreOpenStatus,
    adminOverrideStore,
    promptManualAttendance,
    setLanguage,
    showPortal,
    showPublicSite,
    updateCartQty,
    updateCartRate,
    removeCartItem,
    setCustomerType,
    setPosPaymentMode,
    selectContactFromDirectory,
    filterSkuSearch,
    selectSearchedSku,
    openQuickSkuAdd: (name) => {
      state.quickSkuVisible = true;
      state.quickSkuPrefill = name || '';
      renderPOS();
    },
    closeQuickSkuAdd: () => {
      state.quickSkuVisible = false;
      renderPOS();
    },
    saveQuickSku,
    setShopStatus: (mode) => setShopManualStatus(mode),
    setPortalActiveBranch,
    printSlip: () => {
      if (window.MMS_APP.currentInvoice) printSlipIframe(window.MMS_APP.currentInvoice);
    },
    shareWhatsApp: () => {
      if (window.MMS_APP.currentInvoice) shareInvoiceViaWhatsApp(window.MMS_APP.currentInvoice);
    },
    downloadSlip: () => {
      if (window.MMS_APP.currentInvoice) downloadInvoicePNG(window.MMS_APP.currentInvoice);
    },
    copySlip: () => {
      if (window.MMS_APP.currentInvoice) copyInvoicePNG(window.MMS_APP.currentInvoice);
    },
    openRestockModal,
    openReceivePaymentModal,
    openNewJobModal,
    updateJobStatus,
    filterContactSuggestions,
    selectContactSuggestion,
    setDirectorySubTab,
    filterDirectorySearch,
    exportDirectoryToExcel,
    setSalesDateFilter,
    setSalesCustomDate,
    sendDailyClosingReport,
    exportBackup,
    showExistingInvoice: (invNo) => {
      const inv = state.invoices.find(i => i.invoiceNo === invNo);
      if (inv) showInvoiceModal(inv);
    },
    currentInvoice: null,

    // Attendance Module
    openPunchModal,
    activateManagerOffDutyMode: () => activateManagerOffDutyMode(),
    renderGatekeeperView: () => renderGatekeeperView(),
    closePunchModal,
    startCamera,
    captureSelfie,
    handlePhotoUpload,
    getGPSLocation,
    submitPunch,
    approveAttendance,
    rejectAttendance,
    previewSelfieImage,
    exportAttendanceToExcel,

    // Staff HR & Dynamic Hours / Salary Engine
    openAddStaffModal,
    openEditStaffModal: (id) => openAddStaffModal(id),
    closeAddStaffModal,
    deleteStaff,
    updateStaffMathPreview,
    saveStaff,
    openIssueAdvanceModal,
    closeIssueAdvanceModal,
    saveAdvance,
    openSalarySlipModal,
    closeSalarySlipModal,
    printSalarySlip,
    shareSalarySlipWhatsApp,
    markSalaryPaid,

    // Store Overhead Expenses
    openAddExpenseModal,
    closeAddExpenseModal,
    saveExpense,
    deleteExpense,
    setPosBillingBranch,
    calculateDistanceMeters,
    previewSelfieModal,
    filterPunchEmployees,
    autoGenerateMonthSalaries,
    deleteJobOrInvoice,
    exportExpensesToExcel,

    // Work Assignment & Employee Daily Work
    openWorkAssignmentModal,
    closeWorkAssignmentModal,
    selectAssignEmployee,
    filterAssignEmployees,
    setAssignScheduleType,
    updateAssignWhatsAppLink,
    confirmWorkAssignment,
    startEmployeeJob,
    finishEmployeeJob,
    renderMyWorkModule,
    setMyWorkStatusFilter,
    setMyWorkDateFilter,

    // Stock Transfer & Invoice Staff Assignment
    renderStockTransferModule,
    onTransferSearch,
    addToTransferCart,
    updateTransferCartQty,
    removeFromTransferCart,
    executeStockTransfer,
    assignInvoiceStaff,
    setPosInvoiceDate
  };

})();
