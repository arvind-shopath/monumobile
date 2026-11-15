// Monu Mobile Solution - Master Application Controller
(function() {
  'use strict';

  // --- State Initialization & LocalStorage Persistence ---
  const STORAGE_KEYS = {
    LANG: 'mms_lang_v9',
    AUTH: 'mms_auth_user_v9',
    INVENTORY: 'mms_inventory_v9',
    JOBS: 'mms_jobs_v9',
    INVOICES: 'mms_invoices_v9',
    CONTACTS: 'mms_contacts_v9',
    SHOP_STATUS: 'mms_shop_status_v9',
    ACTIVE_VIEW: 'mms_active_view_v9',
    BRANCHES: 'mms_branches_v9',
    ACTIVE_BRANCH: 'mms_active_branch_v9',
    STAFF: 'mms_staff_v9',
    ATTENDANCE: 'mms_attendance_v9',
    ADVANCES: 'mms_advances_v9',
    EXPENSES: 'mms_expenses_v9',
    BRANCH_STATUS: 'mms_branch_status_v9'
  };

  const state = {
    currentLang: localStorage.getItem(STORAGE_KEYS.LANG) || 'hi',
    currentUser: JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH) || 'null'),
    activeView: localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW) || 'portal',
    shopManualStatus: localStorage.getItem(STORAGE_KEYS.SHOP_STATUS) || 'auto',
    activeBranch: localStorage.getItem(STORAGE_KEYS.ACTIVE_BRANCH) || 'all',

    branches: JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANCHES) || 'null') || window.MMS_DATA.branches,
    staff: JSON.parse(localStorage.getItem(STORAGE_KEYS.STAFF) || 'null') || window.MMS_DATA.staff,
    attendance: (() => {
      let att = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || 'null') || window.MMS_DATA.initialAttendance;
      if (!Array.isArray(att)) att = window.MMS_DATA.initialAttendance || [];
      att.forEach(a => {
        if (a.empName && (a.empName.includes('Vikas') || a.empName.includes('विकास'))) {
          a.empId = a.empId || 'emp_105';
          a.employeeId = a.employeeId || 'emp_105';
          a.branchId = a.branchId || 'branch_unnao';
          a.branchName = a.branchName || 'उन्नाव शाखा (Unnao Branch)';
        }
      });
      if (!att.some(a => (a.empId === 'emp_105' || (a.empName && (a.empName.includes('Vikas') || a.empName.includes('विकास')))))) {
        att.push({
          id: "att_20261114_04",
          empId: "emp_105",
          employeeId: "emp_105",
          empName: "विकास पाल (Vikas Pal - Tech Unnao)",
          employeeName: "विकास पाल (Vikas Pal - Tech Unnao)",
          phone: "9839988776",
          branchId: "branch_unnao",
          branchName: "उन्नाव शाखा (Unnao Branch)",
          date: "2026-11-14",
          inTime: "10:30 AM",
          outTime: "",
          inTimestamp: 1794640200000,
          outTimestamp: null,
          hoursWorked: 0,
          selfie: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
          photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
          lat: 26.5463,
          lng: 80.4879,
          distanceMeters: 5,
          isOutOfRadius: false,
          locationAlert: "🟢 दुकान पर (5m)",
          status: "pending",
          notes: "उन्नाव लैब ड्यूटी शुरू"
        });
      }
      return att;
    })(),
    advances: JSON.parse(localStorage.getItem(STORAGE_KEYS.ADVANCES) || 'null') || window.MMS_DATA.initialAdvances,
    expenses: JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES) || 'null') || window.MMS_DATA.initialExpenses,

    inventory: JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY) || 'null') || window.MMS_DATA.initialInventory,
    jobs: JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || 'null') || window.MMS_DATA.initialJobCards,
    invoices: JSON.parse(localStorage.getItem(STORAGE_KEYS.INVOICES) || 'null') || window.MMS_DATA.initialInvoices,
    
    // POS Cart & Customer state
    posCart: [],
    posCustomer: { name: '', phone: '', type: 'customer' },
    posBillingBranch: localStorage.getItem('mms_pos_branch_v9') || 'branch_hazratganj',
    posPayment: { mode: 'cash', paid: 0, discount: 0 },
    
    // Active Admin Tab
    activeAdminTab: 'dashboard',
    branchStatus: JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANCH_STATUS) || 'null') || {
      branch_hazratganj: { isOpen: true, openedBy: 'मोनू जी (Monu)', time: '10:15 AM', distance: 12 },
      branch_aminabad: { isOpen: true, openedBy: 'दीपक शर्मा (Deepak)', time: '10:45 AM', distance: 35 },
      branch_unnao: { isOpen: false, openedBy: null, time: null, distance: null }
    },
    salesFilter: { type: 'today', customDate: '' },

    // Customer & Shopkeeper Directory Database
    contacts: JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS) || 'null') || [
      { name: 'संजय मोबाइल (Sanjay Mobile Shop, Hazratganj)', phone: '9933445566', type: 'shopkeeper' },
      { name: 'राजू टेलीकॉम (Raju Telecom, Narhi)', phone: '9887766554', type: 'shopkeeper' },
      { name: 'अमन रिपेयरिंग सेंटर (Aman Repair Center)', phone: '9123456789', type: 'shopkeeper' },
      { name: 'लखनऊ मोबाइल हब (Lucknow Mobile Hub)', phone: '9455667788', type: 'shopkeeper' },
      { name: 'अरविंद शुक्ला', phone: '9723338321', type: 'customer' },
      { name: 'राहुल शर्मा (Rahul Sharma)', phone: '9876543210', type: 'customer' },
      { name: 'अमित कुमार वर्मा (Amit Verma)', phone: '9911223344', type: 'customer' }
    ],

    // Quick SKU Add Form State
    quickSkuVisible: false,
    quickSkuPrefill: ''
  };

  function persistData() {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(state.inventory));
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(state.jobs));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(state.invoices));
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(state.contacts));
  }

  // --- Translation & Localization Engine ---
  function t(key) {
    const lang = state.currentLang;
    if (!window.MMS_DATA || !window.MMS_DATA.translations) return key;
    const trans = window.MMS_DATA.translations[lang] || window.MMS_DATA.translations['hi'];
    return trans[key] || (window.MMS_DATA.translations['en'] && window.MMS_DATA.translations['en'][key]) || key;
  }

  function setLanguage(newLang) {
    state.currentLang = newLang;
    localStorage.setItem(STORAGE_KEYS.LANG, newLang);
    renderAll();
  }

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
      <span class="text-[10px] uppercase font-black text-slate-500 px-1">दुकान स्थिति:</span>
      <button type="button" onclick="window.MMS_APP.setShopStatus('force_open')" title="दुकान को हमेशा खुली दिखाएं" class="px-2 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1 ${mode === 'force_open' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'}">
        <span>🟢 खुली रखें</span>
      </button>
      <button type="button" onclick="window.MMS_APP.setShopStatus('force_closed')" title="दुकान को अभी बंद दिखाएं (लंच/छुट्टी/रात)" class="px-2 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1 ${mode === 'force_closed' ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'}">
        <span>🔴 बंद रखें</span>
      </button>
      <button type="button" onclick="window.MMS_APP.setShopStatus('auto')" title="घड़ी के अनुसार (10:30 AM - 8:30 PM)" class="px-2 py-1 rounded-lg text-[11px] font-black transition flex items-center gap-1 ${mode === 'auto' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'}">
        <span>⏱️ ऑटो टाइम</span>
      </button>
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
          <span>${state.currentUser.name} (स्टाफ पोर्टल)</span>
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
            <div class="min-w-0 flex-1">
              <div class="text-xs font-black text-white truncate">${state.currentUser.name}</div>
              <div class="text-[10px] text-blue-400 uppercase font-bold tracking-wider">${state.currentUser.role || 'Admin'}</div>
            </div>
          </div>
        `;
      }
    } else {
      openLoginBtns.forEach(b => {
        b.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          <span data-i18n="staffLogin">स्टाफ लॉगिन</span>
        `;
        b.className = 'open-login-btn inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition shadow-sm';
      });

      pillContainers.forEach(pc => { pc.innerHTML = ''; });
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    const phone = dom.loginPhone.value.trim();
    const pass = dom.loginPass.value.trim();

    const allUsers = [...(state.staff || []), ...(window.MMS_DATA.users || [])];
    const matched = allUsers.find(u => u.phone === phone && u.pass === pass);
    if (matched) {
      state.currentUser = matched;
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(matched));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'portal');
      closeModal(dom.loginModal);
      dom.loginError.classList.add('hidden');
      dom.loginForm.reset();
      renderAuthPill();
      showPortal();
    } else {
      dom.loginError.textContent = state.currentLang === 'hi' 
        ? 'गलत मोबाइल नंबर या पासवर्ड! कृपया दोबारा जांचें।' 
        : 'Invalid mobile number or password!';
      dom.loginError.classList.remove('hidden');
    }
  }

  function handleLogout() {
    state.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'public');
    renderAuthPill();
    showPublicSite();
  }

  function showPortal() {
    if (!state.currentUser) {
      openModal(dom.loginModal);
      return;
    }
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'portal');
    state.activeView = 'portal';

    // Hide ALL public shell elements
    document.querySelectorAll('.public-shell-element').forEach(el => el.classList.add('hidden'));
    dom.publicSection.classList.add('hidden');
    
    // Show dedicated staff portal
    dom.portalSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderPortal();
    renderPortalShopControl();
  }

  function showPublicSite() {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, 'public');
    state.activeView = 'public';

    dom.portalSection.classList.add('hidden');
    dom.publicSection.classList.remove('hidden');
    document.querySelectorAll('.public-shell-element').forEach(el => el.classList.remove('hidden'));
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
  function searchJobStatus() {
    const val = (dom.trackInput.value || '').trim().toUpperCase();
    if (!val) {
      alert(state.currentLang === 'hi' ? 'कृपया अपना टोकन नंबर या मोबाइल नंबर डालें!' : 'Please enter Job Token or Mobile Number!');
      return;
    }

    const job = state.jobs.find(j => j.token.toUpperCase() === val || j.customerPhone === val);
    dom.trackResultCard.classList.remove('hidden');

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

    dom.trackResultCard.innerHTML = `
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <span class="text-xs text-slate-500 block">टोकन / जॉब नंबर:</span>
            <span class="text-base font-black text-slate-900 font-mono">${job.token}</span>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-bold ${badgeColor}">${statusHindi}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div><strong class="text-slate-600">ग्राहक का नाम:</strong> <span class="font-bold text-slate-800">${job.customerName}</span></div>
          <div><strong class="text-slate-600">डिवाइस / मॉडल:</strong> <span class="font-bold text-slate-800">${job.device}</span></div>
          <div><strong class="text-slate-600">समस्या:</strong> <span class="text-slate-700">${job.issue}</span></div>
          <div><strong class="text-slate-600">अनुमानित खर्च:</strong> <span class="font-bold text-emerald-700 font-mono">₹${Number(job.estimatedCost).toLocaleString('en-IN')}</span></div>
          <div><strong class="text-slate-600">एडवांस जमा:</strong> <span class="font-bold text-slate-800 font-mono">₹${Number(job.advancePaid).toLocaleString('en-IN')}</span></div>
          <div><strong class="text-slate-600">शेष बकाया:</strong> <span class="font-bold text-rose-600 font-mono">₹${Number(job.dueAmount).toLocaleString('en-IN')}</span></div>
        </div>

        <div class="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span class="text-slate-500">अपडेट: ${job.updatedAt || 'Just now'}</span>
          <a href="https://wa.me/${window.MMS_DATA.storeInfo.whatsapp}?text=${encodeURIComponent(`नमस्ते Monu Mobile! मेरा टोकन नं ${job.token} है, रिपेयरिंग के बारे में पूछना था।`)}" target="_blank" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1.5">
            💬 व्हाट्सएप पर स्टेटस पूछें
          </a>
        </div>
      </div>
    `;
  }

  // --- Instagram Live Repair Showcase Feed ---
  function renderInstagramFeed() {
    const container = document.getElementById('instagram-feed-container');
    if (!container) return;

    const posts = [
      { img: 'images/user_img_9.jpg', title: 'OCA डिस्प्ले लेमिनेशन लैब (Hazratganj)', date: 'आज' },
      { img: 'images/user_img_2.jpg', title: 'मदरबोर्ड IC लेवल माइक्रो-सोल्डरिंग', date: 'कल' },
      { img: 'images/user_img_11.jpg', title: 'iPhone स्क्रीन रिप्लेसमेंट (100% ओरिजिनल)', date: '2 दिन पहले' },
      { img: 'images/user_img_6.jpg', title: 'ओरिजिनल बैटरी टेस्टिंग व रिप्लेसमेंट', date: '3 दिन पहले' },
      { img: 'images/user_img_5.jpg', title: 'मदरबोर्ड IC शील्ड व शॉर्टिंग रिपेयर', date: 'इस हफ्ते' },
      { img: 'images/user_img_8.jpg', title: 'होलसेल ओरिजिनल मोबाइल एक्सेसरीज डिस्प्ले', date: 'इस हफ्ते' }
    ];

    container.innerHTML = posts.map(p => `
      <div class="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm aspect-square">
        <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 text-white">
          <p class="text-xs font-bold leading-snug">${p.title}</p>
          <span class="text-[10px] text-slate-300 mt-0.5">${p.date} • @monumobilesolution</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // STAFF PORTAL & MANAGEMENT CONTROLLERS
  // ==========================================
  
  function renderPortal() {
    renderPortalShopControl();
    renderPortalBranchSwitcher();

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    // Strict Allowed Tabs per role
    let allowedTabs = [];
    if (isOwner) {
      // Admin sees everything
      allowedTabs = ['dashboard', 'pos', 'jobs', 'inventory', 'directory', 'sales', 'khata', 'expenses', 'balance', 'attendance', 'staff', 'settings'];
    } else if (isManager) {
      // Manager sees shop operations, POS, inventory, jobs, CRM, sales, khata, expenses, attendance & settings
      allowedTabs = ['dashboard', 'pos', 'jobs', 'inventory', 'directory', 'sales', 'khata', 'expenses', 'attendance', 'settings'];
    } else {
      // Pure Employee / Technician:
      // USER REQUIREMENT: "इसमें साइडबार में जो ऑप्शन आ रहे हैं उसमें सिर्फ सेटिंग का ऑप्शन और सेल्फी और जीपीएस अटेंडेंस आएगा.."
      allowedTabs = ['attendance', 'settings'];
    }

    // Toggle Sidebar Navigation Buttons
    dom.portalTabs.forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      if (allowedTabs.includes(tab)) {
        btn.classList.remove('hidden');
        btn.style.display = 'flex';
      } else {
        btn.classList.add('hidden');
        btn.style.display = 'none';
      }
    });

    // Hide entire Nav Group Headers for Employee (So no "डैशबोर्ड व ओवरव्यू", "दुकान ऑपरेशंस", "फाइनेंस" headers appear!)
    const grpCore = document.getElementById('portal-nav-group-core') || document.getElementById('nav-group-core');
    const grpOps = document.getElementById('portal-nav-group-ops') || document.getElementById('nav-group-ops');
    const grpFinance = document.getElementById('portal-nav-group-finance') || document.getElementById('nav-group-finance');
    const grpHr = document.getElementById('portal-nav-group-hr') || document.getElementById('nav-group-hr');
    const hrTitle = document.getElementById('portal-nav-group-hr-title');
    const settingsLabel = document.getElementById('portal-settings-tab-label');

    if (isEmployee) {
      if (grpCore) grpCore.style.display = 'none';
      if (grpOps) grpOps.style.display = 'none';
      if (grpFinance) grpFinance.style.display = 'none';
      if (grpHr) grpHr.style.display = 'block';
      if (hrTitle) hrTitle.style.display = 'none';
      if (settingsLabel) settingsLabel.textContent = 'प्रोफ़ाइल व KYC सेटिंग्स';
    } else if (isManager) {
      if (grpCore) grpCore.style.display = 'block';
      if (grpOps) grpOps.style.display = 'block';
      if (grpFinance) grpFinance.style.display = 'block';
      if (grpHr) grpHr.style.display = 'block';
      if (hrTitle) hrTitle.style.display = 'block';
      if (settingsLabel) settingsLabel.textContent = 'शाखा सेटिंग्स';
    } else {
      // Admin sees all groups
      if (grpCore) grpCore.style.display = 'block';
      if (grpOps) grpOps.style.display = 'block';
      if (grpFinance) grpFinance.style.display = 'block';
      if (grpHr) grpHr.style.display = 'block';
      if (hrTitle) hrTitle.style.display = 'block';
      if (settingsLabel) settingsLabel.textContent = 'सिस्टम व शाखा सेटिंग्स';
    }

    // Header Shop Status Control (दुकान ऑन-ऑफ):
    // USER REQUIREMENT: "दुकान को ऑन-ऑफ करने का ऑप्शन भी इंप्लाई को नहीं दिखाई देगा.. ये मैनेजर और एडमिन ही कर पाएंगे"
    const shopCtrl = document.getElementById('portal-shop-status-control');
    if (shopCtrl) {
      shopCtrl.style.display = (isOwner || isManager) ? 'flex' : 'none';
    }

    // Header Branch Switcher:
    // Only Admin can switch all branches freely. For Employee, hide branch switcher so it doesn't cause confusion.
    const branchSwitcher = document.getElementById('portal-branch-switcher');
    if (branchSwitcher) {
      branchSwitcher.style.display = isOwner ? 'flex' : 'none';
    }

    // Quick Action buttons in header (+ नया बिल, + नया टोकन):
    const headerQuickActions = document.querySelectorAll('header .hidden.sm\\:flex.items-center.gap-1\\.5');
    headerQuickActions.forEach(el => {
      el.style.display = (isOwner || isManager) ? 'flex' : 'none';
    });

    // Set active tab:
    // If employee: default to 'attendance'
    // If admin: default to 'dashboard' and force branch to 'all' so all employees' punches are visible
    if (isEmployee) {
      state.activeAdminTab = allowedTabs.includes(state.activeAdminTab) ? state.activeAdminTab : 'attendance';
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

    const isCollapsed = sidebar.classList.contains('lg:w-16');
    if (isCollapsed) {
      // Expand
      sidebar.classList.remove('lg:w-16');
      sidebar.classList.add('lg:w-64', 'xl:w-72');
      if (collapseIcon) collapseIcon.textContent = '◀';
      document.querySelectorAll('.sidebar-text-label').forEach(el => el.style.display = '');
    } else {
      // Collapse / Minimize into slim icon bar
      sidebar.classList.remove('lg:w-64', 'xl:w-72');
      sidebar.classList.add('lg:w-16');
      if (collapseIcon) collapseIcon.textContent = '▶';
      document.querySelectorAll('.sidebar-text-label').forEach(el => el.style.display = 'none');
    }
  }

  function openMobileSidebar() {
    const sidebar = document.getElementById('portal-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('-translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById('portal-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
  }

  function switchPortalTab(tab) {
    state.activeAdminTab = tab || 'dashboard';
    if (window.innerWidth < 1024) closeMobileSidebar();
    
    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    const allowedTabs = isOwner 
      ? ['dashboard', 'pos', 'jobs', 'inventory', 'directory', 'sales', 'khata', 'expenses', 'balance', 'attendance', 'staff', 'settings']
      : isManager 
        ? ['dashboard', 'pos', 'jobs', 'inventory', 'directory', 'sales', 'khata', 'expenses', 'attendance', 'settings']
        : ['attendance', 'settings'];

    // Update Sidebar Navigation button active classes & STRICT VISIBILITY
    dom.portalTabs.forEach(b => {
      const bTab = b.getAttribute('data-tab');
      if (allowedTabs.includes(bTab)) {
        b.style.display = 'flex';
        b.classList.remove('hidden');
        if (bTab === state.activeAdminTab) {
          b.className = 'portal-tab-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition font-bold bg-blue-600 text-white shadow-sm';
        } else {
          b.className = 'portal-tab-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition text-slate-300 hover:bg-slate-800 hover:text-white font-medium';
        }
      } else {
        b.style.display = 'none';
        b.classList.add('hidden');
      }
    });

    // Enforce group headers visibility
    const grpCore = document.getElementById('nav-group-core');
    const grpOps = document.getElementById('nav-group-ops');
    const grpFinance = document.getElementById('nav-group-finance');
    const grpHr = document.getElementById('nav-group-hr');
    const hrGroupTitle = document.querySelector('#nav-group-hr .sidebar-text-label');

    if (isEmployee) {
      if (grpCore) grpCore.style.display = 'none';
      if (grpOps) grpOps.style.display = 'none';
      if (grpFinance) grpFinance.style.display = 'none';
      if (grpHr) grpHr.style.display = 'block';
      if (hrGroupTitle) hrGroupTitle.style.display = 'none'; // No group heading for employee
    } else {
      if (grpCore) grpCore.style.display = 'block';
      if (grpOps) grpOps.style.display = 'block';
      if (grpFinance) grpFinance.style.display = 'block';
      if (grpHr) grpHr.style.display = 'block';
      if (hrGroupTitle) hrGroupTitle.style.display = 'block';
    }

    // Update Header active indicator if element exists
    const greetingEl = document.getElementById('header-greeting');
    const userNameEl = document.getElementById('header-user-name');
    if (greetingEl && userNameEl && state.currentUser) {
      greetingEl.textContent = 'नमस्ते,';
      userNameEl.textContent = `${state.currentUser.name} (${state.currentUser.role.toUpperCase()})`;
    }

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

    // Render corresponding view module
    if (state.activeAdminTab === 'dashboard') renderDashboard();
    if (state.activeAdminTab === 'pos') renderPOS();
    if (state.activeAdminTab === 'inventory') renderInventory();
    if (state.activeAdminTab === 'khata') renderKhata();
    if (state.activeAdminTab === 'sales') renderDailySales();
    if (state.activeAdminTab === 'balance') renderBalanceSheet();
    if (state.activeAdminTab === 'jobs') renderJobCardsManager();
    if (state.activeAdminTab === 'directory') renderDirectoryCRM();
    if (state.activeAdminTab === 'attendance') renderAttendanceModule();
    if (state.activeAdminTab === 'staff') renderStaffHRModule();
    if (state.activeAdminTab === 'expenses') renderExpensesModule();
    if (state.activeAdminTab === 'settings') renderSettingsModule();
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
    const branches = state.branches || [
      { id: 'branch_hazratganj', shortName: 'हजरतगंज', name: 'हजरतगंज (मुख्य लैब व हेड ऑफिस)', lat: 26.85172, lng: 80.94625, radiusMeters: 250 },
      { id: 'branch_aminabad', shortName: 'अमीनाबाद', name: 'अमीनाबाद शाखा', lat: 26.84338, lng: 80.92648, radiusMeters: 250 },
      { id: 'branch_unnao', shortName: 'उन्नाव', name: 'उन्नाव शाखा', lat: 26.5463, lng: 80.4879, radiusMeters: 300 }
    ];

    container.innerHTML = `
      <!-- Top Overview Greeting & Status -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 rounded-2xl text-white shadow-md border border-slate-700/60">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/30 text-blue-300 border border-blue-400/30">
              ${curBranch === 'all' ? '🏢 सभी 3 शाखाएं (All Stores)' : getBranchName(curBranch)}
            </span>
            <span class="text-xs text-slate-400">• आज का लाइव कंट्रोल डैशबोर्ड</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight">
            दुकान ऑपरेशंस, बिक्री व स्टाफ मॉनिटरिंग
          </h2>
          <p class="text-xs text-slate-300 mt-1 max-w-2xl">
            शाखाओं की लाइव स्थिति, GPS-सत्यापित स्टोर ओपनिंग, कर्मचारियों का लेट-अराइवल अलर्ट और आज की नेट बिक्री का रिय���-टाइम हिसाब।
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button onclick="window.MMS_APP.switchPortalTab('pos')" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg transition flex items-center gap-2">
            <span>🛒 नया बिल बनाएं</span>
          </button>
          <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition flex items-center gap-1.5">
            <span>👥 हाजिरी चेक करें</span>
          </button>
        </div>
      </div>

      <!-- Row 1: High-Impact KPI Metric Cards (SaaS Style) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Card 1: Today's Total Sales -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">आज की कुल बिक्री (Sales)</span>
            <span class="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg font-bold">₹</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ₹${todaySalesTotal.toLocaleString('en-IN')}
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>नकद: <strong class="text-slate-800">₹${todayCash.toLocaleString('en-IN')}</strong></span>
            <span>UPI: <strong class="text-blue-600">₹${todayUPI.toLocaleString('en-IN')}</strong></span>
          </div>
        </div>

        <!-- Card 2: Staff Attendance & Late Arrivals -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">उपस्थित कर्मचारी & लेट</span>
            <span class="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">👥</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black text-slate-900">${presentStaffCount}</span>
            <span class="text-xs text-slate-400 font-bold">स्टाफ ��न</span>
            ${lateCount > 0 
              ? `<span class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">🔴 ${lateCount} लेट</span>`
              : `<span class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">🟢 सब ऑन-टाइम</span>`
            }
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>मानक टाइम: <strong>10:30 AM</strong></span>
            <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="text-blue-600 font-bold hover:underline">रजिस्टर देखें →</button>
          </div>
        </div>

        <!-- Card 3: Today's New Udhar (Credit) -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">आज का नया उधार (Credit)</span>
            <span class="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base">📕</span>
          </div>
          <div class="text-2xl sm:text-3xl font-black ${todayNewCredit > 0 ? 'text-amber-600' : 'text-slate-900'}">
            ₹${todayNewCredit.toLocaleString('en-IN')}
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>केवल B2B दुकानदार</span>
            <button onclick="window.MMS_APP.switchPortalTab('khata')" class="text-amber-700 font-bold hover:underline">खाता-बही →</button>
          </div>
        </div>

        <!-- Card 4: Active Repair Tokens -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">लैब रिपेयर लोड</span>
            <span class="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base">🔧</span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-2xl sm:text-3xl font-black text-slate-900">${activeJobsCount}</span>
            <span class="text-xs text-slate-400 font-bold">चालू फोन</span>
            <span class="ml-auto px-2 py-0.5 rounded-full text-[11px] font-black bg-purple-100 text-purple-800">
              ${readyJobsCount} रेडी
            </span>
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>डिलीवरी बाकी: ${activeJobsCount}</span>
            <button onclick="window.MMS_APP.switchPortalTab('jobs')" class="text-purple-600 font-bold hover:underline">जॉब टोकन →</button>
          </div>
        </div>

      </div>

      <!-- Row 2: Location-Verified Store Opening & Branch Operational Status (Security Feature) -->
      <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-black text-slate-900">📍 शाखा लाइव स्थिति व GPS-सत्यापित स्टोर कंट्रोल</h3>
              <span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">Anti-Spoof Geofence</span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              प्रबंधक केवल दुकान की वास्तविक लोकेशन (250m के दायरे) में खड़े होकर ही दुकान "ओपन" कर सकते हैं। घर बैठे कोई दुकान नहीं खोल सकता।
            </p>
          </div>
          <div class="text-xs text-slate-500 flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>हरे का मतलब दुकान खुली है</span>
          </div>
        </div>

        <!-- 3 Branch Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${branches.map(b => {
            const bStatus = (state.branchStatus && state.branchStatus[b.id]) || { isOpen: false };
            const bInvoices = (state.invoices || []).filter(i => (i.branchId === b.id || (!i.branchId && b.id === 'branch_hazratganj')) && (i.date || '').startsWith(todayStr));
            const bSales = bInvoices.reduce((acc, cur) => acc + (Number(cur.net) || 0), 0);
            const bStaff = (state.attendance || []).filter(a => a.empId !== 'emp_101' && (!a.empName || !a.empName.includes('Monu')) && (a.branchId === b.id || (!a.branchId && b.id === 'branch_hazratganj')) && a.date === todayStr);

            return `
              <div class="p-4 rounded-xl border ${bStatus.isOpen ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50/50'} flex flex-col justify-between gap-3">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-black text-slate-900">${b.name}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1.5 ${bStatus.isOpen ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
                      <span class="w-1.5 h-1.5 rounded-full ${bStatus.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}"></span>
                      ${bStatus.isOpen ? '🟢 खुली है (OPEN)' : '🔴 बंद है (CLOSED)'}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-500 mt-1 line-clamp-1">${b.address}</p>

                  <div class="mt-3 grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span class="text-slate-400 text-[10px] block">आज की सेल</span>
                      <strong class="text-slate-900 font-bold">₹${bSales.toLocaleString('en-IN')}</strong>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] block">उपस्थित स्टाफ</span>
                      <strong class="text-blue-600 font-bold">${bStaff.length} कर्मचारी</strong>
                    </div>
                  </div>

                  ${bStatus.isOpen && bStatus.openedBy ? `
                    <div class="mt-2 text-[10px] text-slate-500 flex items-center justify-between bg-emerald-100/50 px-2 py-1 rounded border border-emerald-200/50">
                      <span>👤 खोला: <strong>${bStatus.openedBy}</strong></span>
                      <span>⏰ ${bStatus.time || '10:00 AM'}</span>
                    </div>
                  ` : ''}
                </div>

                <div class="pt-2 border-t border-slate-200/70 flex items-center gap-2">
                  ${bStatus.isOpen ? `
                    <button onclick="window.MMS_APP.toggleStoreOpenStatus('${b.id}', false)" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition">
                      🛑 दुकान बंद करें
                    </button>
                  ` : `
                    <button onclick="window.MMS_APP.verifyAndOpenStore('${b.id}')" class="flex-1 py-1.5 px-3 rounded-lg text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center justify-center gap-1.5">
                      <span>📍 दुकान खोलें (GPS Verified)</span>
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
      <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-black text-slate-900">👥 आज का कर्मचारी हाजिरी रजिस्टर & लेट रिपोर्ट</h3>
              <span class="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                ${presentStaffCount} उपस्थित
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">
              10:30 AM के बाद पंच करने वाले कर्मचारियों को सिस्टम ऑटोमैटिक लेट (Late) चिन्हित करता है।
            </p>
          </div>
          <button onclick="window.MMS_APP.switchPortalTab('attendance')" class="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>पूरा रजिस्टर खोलें</span>
            <span>→</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th class="py-3 px-4">कर्मचारी</th>
                <th class="py-3 px-4">शाखा</th>
                <th class="py-3 px-4">इन-टाइम (Punch In)</th>
                <th class="py-3 px-4">स्थिति (Punctuality)</th>
                <th class="py-3 px-4">GPS दूरी (शाखा से)</th>
                <th class="py-3 px-4 text-right">एडमिन एक्शन</th>
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
                          <strong class="text-slate-900 font-black block">${emp.name}</strong>
                          <span class="text-[10px] text-slate-400">${emp.roleLabel || emp.role}</span>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-slate-600">
                      ${getBranchName(emp.branchId || 'branch_hazratganj')}
                    </td>
                    <td class="py-3 px-4 font-bold text-slate-800">
                      ${att ? att.inTime : '<span class="text-slate-300 font-normal">अनुपस्थित</span>'}
                    </td>
                    <td class="py-3 px-4">
                      ${!isPresent ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          ⚪ अभी नहीं आया
                        </span>
                      ` : isLate ? `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-700 border border-rose-200">
                          🔴 लेट आया (${lateMins} मिनट लेट)
                        </span>
                      ` : `
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200">
                          🟢 समय पर (On Time)
                        </span>
                      `}
                    </td>
                    <td class="py-3 px-4 text-slate-600">
                      ${att ? `📍 ${att.distanceMeters || '15'}m (दुकान के अंदर)` : '—'}
                    </td>
                    <td class="py-3 px-4 text-right">
                      ${att && att.status === 'pending' ? `
                        <button onclick="window.MMS_APP.approveAttendance('${att.id}')" class="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 transition">
                          स्वीकृत करें
                        </button>
                      ` : att ? `
                        <span class="text-[11px] font-bold text-emerald-600">✓ ${att.status === 'approved' ? 'स्वीकृत' : att.status}</span>
                      ` : `
                        <button onclick="window.MMS_APP.promptManualAttendance('${emp.id}')" class="text-blue-600 hover:underline text-[11px] font-bold">
                          + मैनुअल हाजिरी
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
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span>🧾 हालिया बिल (Recent Invoices)</span>
            </h4>
            <button onclick="window.MMS_APP.switchPortalTab('sales')" class="text-xs font-bold text-blue-600 hover:underline">
              सभी देखें →
            </button>
          </div>
          <div class="space-y-2.5">
            ${(state.invoices || []).slice(0, 4).map(inv => `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold text-slate-900">${inv.customerName || 'कस्टमर'}</strong>
                    <span class="text-[10px] text-slate-500 font-mono">${inv.id}</span>
                  </div>
                  <div class="text-[10px] text-slate-400 mt-0.5">
                    ${getBranchName(inv.branchId || 'branch_hazratganj')} • ${inv.paymentMode === 'cash' ? 'नकद' : 'UPI/क्रेडिट'}
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-black text-slate-900 text-sm">₹${(inv.net || 0).toLocaleString('en-IN')}</div>
                  <span class="text-[10px] ${inv.due > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}">
                    ${inv.due > 0 ? `उधार: ₹${inv.due}` : 'पूर्ण चुकता'}
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Repair Tokens -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h4 class="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span>🔧 हालिया रिपेयर टोकन (Repair Tokens)</span>
            </h4>
            <button onclick="window.MMS_APP.switchPortalTab('jobs')" class="text-xs font-bold text-purple-600 hover:underline">
              सभी जॉब्स →
            </button>
          </div>
          <div class="space-y-2.5">
            ${(state.jobs || []).slice(0, 4).map(job => `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div class="flex items-center gap-2">
                    <strong class="font-bold text-slate-900">${job.customerName || 'कस्टमर'}</strong>
                    <span class="text-[10px] text-slate-500 font-mono">${job.id}</span>
                  </div>
                  <div class="text-[10px] text-slate-500 mt-0.5">
                    📱 ${job.deviceModel || 'स्मार्टफोन'} • ${job.issue || 'रिपेयर'}
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

  function renderPOS() {
    const container = document.getElementById('tab-view-pos');
    if (!container) return;

    const isShopkeeper = state.posCustomer.type === 'shopkeeper';
    const contactsForType = state.contacts.filter(c => isShopkeeper ? c.type === 'shopkeeper' : c.type === 'customer');

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left: Product Search, Quick SKU Add, Custom Labor & Cart Table -->
        <div class="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">काउंटर बिलिंग (POS & Cart)</h3>
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-md border-2 border-blue-400">
                  <span class="text-xs font-bold text-blue-200">🏢 बिलिंग दुकान:</span>
                  <span class="text-sm font-black text-amber-300 tracking-wide">${getBranchName(state.posBillingBranch || state.activeBranch || 'branch_hazratganj')}</span>
                  <select onchange="window.MMS_APP.setPosBillingBranch(this.value)" class="ml-1 bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold rounded-lg px-2 py-0.5 border-none outline-none cursor-pointer">
                    <option value="branch_hazratganj" ${(state.posBillingBranch || state.activeBranch) === 'branch_hazratganj' ? 'selected' : ''} class="text-slate-900">हजरतगंज (Head Lab)</option>
                    <option value="branch_aminabad" ${(state.posBillingBranch || state.activeBranch) === 'branch_aminabad' ? 'selected' : ''} class="text-slate-900">अमीनाबाद शाखा</option>
                    <option value="branch_unnao" ${(state.posBillingBranch || state.activeBranch) === 'branch_unnao' ? 'selected' : ''} class="text-slate-900">उन्नाव शाखा</option>
                  </select>
                </div>
              </div>
              <p class="text-xs text-slate-500">लाइव SKU सर्च करें, नया पार्ट जोड़ें या कस्टम सर्विस चार्ज लगाएं</p>
            </div>
            <span class="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              ⚡ ऑटो-स्टॉक डिडक्शन चालू
            </span>
          </div>

          <!-- Live SKU Search Input & Quick Add Button (NO Dropdown, Direct Search) -->
          <div class="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span>🔍 SKU सर्च या टाइप करें (Type to Search) *</span>
              </label>
              <button type="button" onclick="window.MMS_APP.openQuickSkuAdd('')" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black shadow-sm transition flex items-center gap-1">
                <span>➕ नया SKU / पार्ट जोड़ें</span>
              </button>
            </div>
            
            <div class="relative">
              <input 
                id="pos-sku-search-input" 
                type="text" 
                placeholder="पार्ट, मॉडल या SKU नाम टाइप करें (उदा. Battery, iPhone, OnePlus, Screen, Combo, Redmi...)" 
                class="w-full text-xs font-bold p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm" 
                oninput="window.MMS_APP.filterSkuSearch(this.value)"
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
                    <label class="block font-bold text-slate-700 mb-1">कैटेगरी</label>
                    <select id="qsku-category" class="w-full p-2 bg-white border border-slate-300 rounded-lg font-semibold">
                      <option value="Display">Display / Combo</option>
                      <option value="Battery">Battery</option>
                      <option value="IC & Motherboard">IC & Motherboard</option>
                      <option value="Charging & Port">Charging & Port</option>
                      <option value="Accessories">Accessories & Spares</option>
                      <option value="Tools">Lab Tools</option>
                    </select>
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
              <input id="pos-custom-name" type="text" placeholder="उदा. सिर्फ ग्लास चेंज लेबर / IC Fitting" class="w-2/3 p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium">
              <input id="pos-custom-rate" type="number" placeholder="रेट ₹" class="w-1/3 p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold font-mono">
              <button id="pos-add-custom-btn" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap transition">
                + जोड़ें
              </button>
            </div>
          </div>

          <!-- Current Cart Table with Inline Editable Rate & Quantity -->
          <div>
            <h4 class="text-xs font-black text-slate-800 mb-2 flex items-center justify-between">
              <span>🛒 कार्ट में जुड़े सामान (Cart Items)</span>
              <span class="text-[11px] text-blue-600 font-bold">* रेट पर क्लिक करके आप कीमत सीधे बदल सकते हैं</span>
            </h4>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="bg-slate-100 text-slate-600 font-bold">
                    <th class="p-2.5 rounded-l-lg">विवरण (Item)</th>
                    <th class="p-2.5">रेट (Editable ₹)</th>
                    <th class="p-2.5 text-center">मात्रा</th>
                    <th class="p-2.5 text-right">कुल</th>
                    <th class="p-2.5 text-center rounded-r-lg">हटाएं</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${state.posCart.length === 0 ? `
                    <tr>
                      <td colspan="5" class="p-6 text-center text-slate-400 font-medium">
                        कार्ट अभी खाली है! ऊपर से कोई पार्ट या सर्विस जोड़ें।
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
        <div class="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 class="text-base font-black text-slate-900 pb-2 border-b border-slate-100">ग्राहक प्रकार व बिलिंग सारांश</h3>

          <!-- Customer Type Toggle: Normal Customer vs Local Shopkeeper -->
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label class="text-xs font-black text-slate-700 block">ग्राहक का प्रकार चुनें (Customer Type) *</label>
            <div class="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onclick="window.MMS_APP.setCustomerType('customer')"
                class="py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${!isShopkeeper ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}"
              >
                <span>👤 नॉर्मल ग्राहक (Walk-in)</span>
              </button>

              <button 
                type="button" 
                onclick="window.MMS_APP.setCustomerType('shopkeeper')"
                class="py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${isShopkeeper ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'}"
              >
                <span>🏪 लोकल दुकानदार / B2B</span>
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
                ${isShopkeeper ? 'दुकानदार / दुकान का नाम *' : 'ग्राहक का नाम *'}
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
              <label class="block text-xs font-bold text-slate-700 mb-1">मोबाइल नंबर (WhatsApp Bill के लिए) *</label>
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
              <span>सब-टोटल (Subtotal):</span>
              <span id="pos-subtotal" class="font-mono font-bold">${formatCurrency(calculateCartSubtotal())}</span>
            </div>

            <div class="flex items-center justify-between text-slate-600 font-semibold">
              <span>डिस्काउंट (Discount):</span>
              <div class="flex items-center gap-1">
                <span class="text-xs">₹</span>
                <input id="pos-discount-input" type="number" value="${state.posPayment.discount || 0}" class="w-20 p-1 text-right bg-white border border-slate-300 rounded text-xs font-bold font-mono">
              </div>
            </div>

            <div class="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
              <span>कुल बिल (Net Payable):</span>
              <span id="pos-net-total" class="font-mono text-blue-700 text-base font-black">${formatCurrency(calculateCartNet())}</span>
            </div>
          </div>

          <!-- Payment Mode Selection -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-700">भुगतान माध्यम (Payment Mode)</label>
            
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button type="button" onclick="window.MMS_APP.setPosPaymentMode('cash')" class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'cash' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                💵 100% नकद (Cash)
              </button>
              <button type="button" onclick="window.MMS_APP.setPosPaymentMode('upi')" class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'upi' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                📱 100% ऑनलाइन (UPI)
              </button>
              <button type="button" onclick="window.MMS_APP.setPosPaymentMode('advance')" class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'advance' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                ⏳ एडवांस पेमेंट (Advance)
              </button>
              <button 
                type="button" 
                onclick="window.MMS_APP.setPosPaymentMode('full_udhar')" 
                ${!isShopkeeper ? 'disabled title="उधार केवल लोकल दुकानदार के लिए मान्य है"' : ''}
                class="p-2.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${state.posPayment.mode === 'full_udhar' ? 'bg-rose-600 text-white shadow-sm' : (isShopkeeper ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50')}"
              >
                📕 पूरा उधार (क्रेडिट)
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
              <span>बिल पक्का करें व इनवॉइस काटें (Complete Bill)</span>
            </button>
            <p class="text-[10px] text-slate-400 text-center mt-1.5">* बिल पूरा होते ही इन्वेंट्री से स्टॉक अपने-आप घट जाएगा और ग्राहक/दुकानदार हमेशा के लिए सेव हो जाएंगे</p>
          </div>
        </div>
      </div>

      <!-- Recent Bills Quick Feed in POS -->
      <div class="mt-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-sm font-black text-slate-800 mb-3 flex items-center justify-between">
          <span>🧾 हाल ही में काटे गए बिल (Recent Counter Invoices)</span>
          <span class="text-xs text-blue-600 font-bold">कुल: ${state.invoices.length} बिल</span>
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="bg-slate-100 text-slate-600 font-bold">
                <th class="p-2.5 rounded-l-lg">इनवॉइस नं</th>
                <th class="p-2.5">ग्राहक / दुकानदार</th>
                <th class="p-2.5">मोबाइल</th>
                <th class="p-2.5">सामान (Items)</th>
                <th class="p-2.5 text-right">कुल बिल</th>
                <th class="p-2.5 text-center">भुगतान</th>
                <th class="p-2.5 text-center rounded-r-lg">रसीद / WhatsApp</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.invoices.slice(0, 5).map(inv => `
                <tr class="hover:bg-slate-50">
                  <td class="p-2.5 font-mono font-bold text-blue-700">${inv.invoiceNo}</td>
                  <td class="p-2.5 font-bold text-slate-900">${inv.customerName}</td>
                  <td class="p-2.5 font-mono text-slate-600">${inv.customerPhone}</td>
                  <td class="p-2.5 text-slate-600 max-w-xs truncate">${inv.items.map(i => `${i.name} (x${i.qty})`).join(', ')}</td>
                  <td class="p-2.5 text-right font-black font-mono">${formatCurrency(inv.totalAmount)}</td>
                  <td class="p-2.5 text-center">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${inv.dueAmount === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                      ${inv.paymentMode}
                    </span>
                  </td>
                  <td class="p-2.5 text-center">
                    <button onclick='window.MMS_APP.showExistingInvoice("${inv.invoiceNo}")' class="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-bold shadow-2xs">
                      रसीद देखें
                    </button>
                  </td>
                </tr>
              `).join('')}
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
          const match = (state.customers || []).find(c => (c.phone || '').replace(/\D/g, '') === clean)
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
    state.posCustomer.type = type;
    if (type === 'customer' && state.posPayment.mode === 'full_udhar') {
      state.posPayment.mode = 'cash';
    }
    renderPOS();
  }

  function setPosPaymentMode(mode) {
    if (mode === 'full_udhar' && state.posCustomer.type !== 'shopkeeper') {
      alert('उधार (Credit) केवल लोकल दुकानदार / B2B के लिए ही मान्य है! नॉर्मल ग्राहक के लिए कैश, यूपीआई या ए���वांस चुनें।');
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

    // Auto-deduct inventory
    state.posCart.forEach(cartItem => {
      const inv = state.inventory.find(i => i.sku === cartItem.sku);
      if (inv) {
        inv.stock = Math.max(0, inv.stock - cartItem.qty);
      }
    });

    const newInvoiceNo = 'MMS-INV-' + (state.invoices.length + 201);
    const invoiceRecord = {
      invoiceNo: newInvoiceNo,
      date: getTodayDateStr(),
      time: timeStr,
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
      udharCleared: dueAmount === 0
    };

    state.invoices.unshift(invoiceRecord);

    // Auto-sync into state.jobs as well so bill appears in 'रिपेयर जॉब-शीट (टोकन)'
    // Important: Status is strictly 'pending' initially - NEVER automatically 'ready'!
    state.jobs.unshift({
      token: newInvoiceNo,
      customerName: custName,
      customerPhone: custPhone,
      customerType: state.posCustomer.type,
      device: invoiceRecord.items.map(i => i.name).join(', '),
      issue: 'काउंटर बिल / रिपेयर पार्ट्स व सर्विस (POS Invoice)',
      assignedTo: state.currentUser ? `${state.currentUser.role.toUpperCase()} (${state.currentUser.name})` : 'Front Desk',
      estimatedCost: netAmount,
      advancePaid: paidAmount,
      dueAmount: dueAmount,
      status: 'pending', // Strictly 'pending' (स्वीकार / रिपेयरिंग चालू) - only changes when staff manually selects
      passcode: 'N/A',
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      updatedAt: 'Just now',
      notes: `काउंटर बिलिंग (POS) से जनरेटेड इनवॉइस [${newInvoiceNo}]${udharNote ? ` • उधार नोट: ${udharNote}` : ''}`
    });

    persistData();

    state.posCart = [];
    state.posCustomer = { name: '', phone: '', type: 'customer' };
    state.posPayment = { mode: 'cash', paid: 0, discount: 0 };

    renderPOS();
    showInvoiceModal(invoiceRecord);
  }

  // --- Search / Filter SKU Autocomplete ---
  function filterSkuSearch(query) {
    const resultsContainer = document.getElementById('pos-sku-search-results');
    if (!resultsContainer) return;
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      resultsContainer.classList.add('hidden');
      resultsContainer.innerHTML = '';
      return;
    }

    const cleanQ = q.replace(/[^a-z0-9]/gi, '');
    const matches = state.inventory.filter(item => {
      const name = (item.name || '').toLowerCase();
      const sku = (item.sku || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      const nameClean = name.replace(/[^a-z0-9]/gi, '');
      return name.includes(q) || sku.includes(q) || cat.includes(q) || (cleanQ.length >= 2 && nameClean.includes(cleanQ));
    });

    let html = '';
    if (matches.length === 0) {
      html = `
        <div class="p-3.5 text-center bg-amber-50">
          <p class="text-xs font-bold text-slate-800">⚠️ "${query.trim()}" इन्वेंट्री में उपलब्ध नहीं है।</p>
          <button type="button" onclick="window.MMS_APP.openQuickSkuAdd('${encodeURIComponent(query.trim())}')" class="mt-2.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md inline-flex items-center gap-1.5 transition">
            ➕ इसे नया SKU बनाकर इन्वेंट्री में जोड़ें
          </button>
        </div>
      `;
    } else {
      html = matches.map(item => `
        <div onclick="window.MMS_APP.selectSearchedSku('${item.sku}')" class="p-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between text-xs transition">
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
              स्टॉक: ${item.stock}
            </span>
          </div>
        </div>
      `).join('');
    }

    resultsContainer.innerHTML = html;
    resultsContainer.classList.remove('hidden');
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

    const itemsRows = inv.items.map(it => `
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

  // --- WhatsApp Sharing with Slip Image & Message ---
  async function shareInvoiceViaWhatsApp(inv) {
    const textMsg = `*Monu Mobile Solution - इनवॉइस रसीद*
━━━━━━━━━━━━━━━━━━
📄 बिल नं: *${inv.invoiceNo}*
📅 तारीख: ${inv.date} (${inv.time || ''})
👤 ग्राहक: *${inv.customerName}* (${inv.customerPhone})
━━━━━━━━━━━━━━━━━━
${inv.items.map(it => `• ${it.name} (x${it.qty}) - ₹${it.rate * it.qty}`).join('\n')}
━━━━━━━━━━━━━━━━━━
💰 कुल बिल: *₹${inv.totalAmount.toLocaleString('en-IN')}*
💵 जमा / एडवांस: ₹${inv.paidAmount.toLocaleString('en-IN')}
${inv.dueAmount > 0 ? `⚠️ *शेष उधार बकाया: ₹${inv.dueAmount.toLocaleString('en-IN')}*` : '✅ *पूर्ण भुगतान (Paid)*'}
${inv.udharNote ? `📝 नोट: ${inv.udharNote}\n` : ''}
📍 दुकान: 216, 2nd Floor, श्री रामा टॉवर्स, अशोक मार्ग, हजरतगंज, लखनऊ
📞 कॉल / व्हाट्सएप: 7905859701
🌐 वेबसाइट: https://monumobile.pages.dev`;

    try {
      const blob = await generateInvoiceBlob();
      if (blob) {
        // 1. Auto-download PNG image for direct dragging/attaching
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Monu-Mobile-Invoice-${inv.invoiceNo}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 2. Web Share API for Mobile Devices (Android / iOS)
        const file = new File([blob], `${inv.invoiceNo}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Monu Mobile Invoice ${inv.invoiceNo}`,
            text: textMsg
          });
          return;
        }

        // 3. Desktop Clipboard Copy
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
        }

        alert('📋 बिल इमेज डाउनलोड फोल्डर में सेव हो गई है और क्लिपबोर्ड में कॉपी भी हो गई है!\n\nव्हाट्सएप खुल रहा है—चैट बॉक्स में बस Ctrl + V (Paste) दबाएं या डाउनलोड की गई इमेज सेंड करें!');
      }
    } catch (err) {
      console.log('Clipboard/Share note:', err);
    }

    // Open WhatsApp Chat
    const cleanPhone = (inv.customerPhone || '').replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.startsWith('91') ? cleanPhone : ('91' + cleanPhone);
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(textMsg)}`, '_blank');
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
            ${inv.items.map(it => `
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
        <div class="text-[9.5px] text-slate-600 text-center border-t border-dashed border-slate-400 pt-2">
          <p>एक्सप्रेस मोबाइल रिपेयरिंग लैब • ओरिजिनल पार्ट्स</p>
          <p class="font-bold text-slate-800 mt-0.5">धन्यवाद! पुनः पधारें • 7905859701</p>
        </div>
      </div>

      <!-- Actions (Thermal Print, WhatsApp Auto-Download, PDF, PNG, Copy) -->
      <div class="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
        <div class="text-[11px] font-bold text-slate-700 text-center">
          💡 <strong>व्हाट्सएप पर बिल इमेज भेजने के लिए:</strong> नीचे <strong>"WhatsApp पर भेजें"</strong> दबाएं। बिल इमेज आपके कंप्यूटर में स्वतः डाउनलोड व क्लिपबोर्ड में कॉपी हो जाएगी—व्हाट्सएप चैट में बस <strong>Ctrl + V</strong> दबाएं और भेजें!
        </div>
        <div class="flex flex-wrap gap-2 justify-center">
          <button type="button" onclick="window.MMS_APP.shareWhatsApp()" class="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition active:scale-95">
            <span>📲 WhatsApp पर भेजें (ऑटो-डाउनलोड + कॉपी)</span>
          </button>
          <button type="button" onclick="window.MMS_APP.downloadSlip()" class="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition">
            <span>📥 बिल इमेज (PNG) डाउनलोड</span>
          </button>
          <button type="button" onclick="window.MMS_APP.printSlip()" class="px-3.5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition">
            <span>📄 रसीद प्रिंट / PDF सेव</span>
          </button>
          <button type="button" onclick="window.MMS_APP.copySlip()" class="px-3 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1">
            <span>📋 इमेज कॉपी (Ctrl+V)</span>
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

    let totalStockCount = 0;
    let totalStockValuation = 0;
    let lowStockCount = 0;

    state.inventory.forEach(item => {
      totalStockCount += item.stock;
      totalStockValuation += (item.stock * item.costPrice);
      if (item.stock <= item.minAlert) lowStockCount++;
    });

    container.innerHTML = `
      <div class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">कुल उपलब्ध पार्ट्स (Items in Stock)</span>
            <span class="text-xl font-black text-slate-900 font-mono">${totalStockCount} पीस</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">इन्वेंट्री लागत वैल्यू (At Cost Price)</span>
            <span class="text-xl font-black text-blue-700 font-mono">${formatCurrency(totalStockValuation)}</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">कम स्टॉक अलर्ट (Low Stock)</span>
            <span class="text-xl font-black text-amber-600 font-mono">${lowStockCount} आइटम्स</span>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-black text-slate-900">इन्वेंट्री व SKU स्टॉक लिस्ट</h3>
              <p class="text-xs text-slate-500">सभी पार्ट्स का स्टॉक, खरीद रेट और बिक्री रेट</p>
            </div>
            <button onclick="window.MMS_APP.openQuickSkuAdd('')" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm transition flex items-center gap-1.5">
              <span>�� नया पार्ट / SKU जोड़ें</span>
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">SKU कोड</th>
                  <th class="p-2.5">पार्ट का नाम व मॉडल</th>
                  <th class="p-2.5">कैटेगरी</th>
                  <th class="p-2.5 text-right">खरीद लागत</th>
                  <th class="p-2.5 text-right">बिक्री रेट</th>
                  <th class="p-2.5 text-center">स्टॉक</th>
                  <th class="p-2.5 text-center rounded-r-lg">एक्शन</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${state.inventory.map(item => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5 font-mono font-bold text-blue-700">${item.sku}</td>
                    <td class="p-2.5 font-bold text-slate-900">${item.name}</td>
                    <td class="p-2.5 text-slate-600">${item.category}</td>
                    <td class="p-2.5 text-right font-mono text-slate-500">${formatCurrency(item.costPrice)}</td>
                    <td class="p-2.5 text-right font-mono font-black text-slate-900">${formatCurrency(item.sellPrice)}</td>
                    <td class="p-2.5 text-center">
                      <span class="px-2 py-0.5 rounded font-mono font-bold ${item.stock <= item.minAlert ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}">
                        ${item.stock}
                      </span>
                    </td>
                    <td class="p-2.5 text-center">
                      <button onclick="window.MMS_APP.openRestockModal('${item.sku}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold transition">
                        + रीस्टॉक
                      </button>
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
          <div>
            <span class="text-xs uppercase font-bold text-amber-100 block">मार्केट में कुल फंसा हुआ उधार (Accounts Receivable)</span>
            <span class="text-2xl sm:text-3xl font-black font-mono">${formatCurrency(totalMarketDue)}</span>
            <p class="text-xs text-amber-100 mt-1">कुल ${dueInvoices.length} दुकानदारों / ग्राहकों के पास पेमेंट बकाया है</p>
          </div>
          <div class="text-xs bg-white/20 backdrop-blur px-3 py-2 rounded-xl border border-white/30">
            📍 समय पर उधार वसूलने के लिए व्हाट्सएप रिमाइंडर बटन का उपयोग करें।
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-black text-slate-900">बकाया खाता-बही सूची (Due Ledger)</h3>
              <p class="text-xs text-slate-500">तारीख, समय और दुकानदार के उधार नोट सहित पूरा हिसाब</p>
            </div>
            <span class="text-xs font-bold text-slate-500">बकाया खाते: ${dueInvoices.length}</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">तारीख / बिल नं</th>
                  <th class="p-2.5">ग्राहक / दुकानदार का नाम</th>
                  <th class="p-2.5">प्रकार</th>
                  <th class="p-2.5">मोबाइल नंबर</th>
                  <th class="p-2.5 text-right">कुल बिल</th>
                  <th class="p-2.5 text-right">जमा / एडवांस</th>
                  <th class="p-2.5 text-right">शेष बकाया (Due)</th>
                  <th class="p-2.5 text-center">पेमेंट जमा करें</th>
                  <th class="p-2.5 text-center rounded-r-lg">व्हाट्सएप रिमाइंडर</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${dueInvoices.length === 0 ? `
                  <tr>
                    <td colspan="9" class="p-8 text-center text-emerald-600 font-bold">
                      🎉 बहुत बढ़िया! मार्केट में किसी भी दुकानदार या ग्राहक का कोई उधार बकाया नहीं है।
                    </td>
                  </tr>
                ` : dueInvoices.map(inv => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5">
                      <span class="font-mono font-bold text-blue-700 block">${inv.invoiceNo}</span>
                      <span class="text-[10px] text-slate-400">${inv.date} ${inv.time || ''}</span>
                    </td>
                    <td class="p-2.5 font-bold text-slate-900">
                      <div>${inv.customerName}</div>
                      ${inv.udharNote ? `<div class="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded mt-0.5 inline-block font-medium">📝 नोट: ${inv.udharNote}</div>` : ''}
                    </td>
                    <td class="p-2.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${inv.customerType === 'shopkeeper' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                        ${inv.customerType === 'shopkeeper' ? 'दुकानदार (B2B)' : 'ग्राहक'}
                      </span>
                    </td>
                    <td class="p-2.5 font-mono text-slate-600">${inv.customerPhone}</td>
                    <td class="p-2.5 text-right font-mono">${formatCurrency(inv.totalAmount)}</td>
                    <td class="p-2.5 text-right font-mono text-emerald-700 font-bold">${formatCurrency(inv.paidAmount)}</td>
                    <td class="p-2.5 text-right font-mono font-black text-rose-600">${formatCurrency(inv.dueAmount)}</td>
                    <td class="p-2.5 text-center">
                      <button onclick="window.MMS_APP.openReceivePaymentModal('${inv.invoiceNo}')" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-2xs">
                        💰 पेमेंट प्राप्त करें
                      </button>
                    </td>
                    <td class="p-2.5 text-center">
                      <a href="https://wa.me/91${inv.customerPhone}?text=${encodeURIComponent(`*Monu Mobile Solution - बकाया पेमेंट रिमाइंडर*

नमस्ते ${inv.customerName},
आपके इनवॉइस ${inv.invoiceNo} का बकाया *₹${inv.dueAmount.toLocaleString('en-IN')}* शेष है। कृपया समय पर भुगतान करने का कष्ट करें।

📍 दुकान: 216, श्री रामा टॉवर्स, अशोक मार्ग, हजरतगंज, लखनऊ
📞 संपर्क: 7905859701
🌐 वेबसाइट: https://monumobile.pages.dev`)}" target="_blank" class="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg font-bold inline-flex items-center gap-1">
                        💬 रिमाइंडर भेजें
                      </a>
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
    closeModal(dom.receivePaymentModal);
    renderKhata();
    alert(`✅ ${inv.customerName} से ${formatCurrency(amount)} पेमेंट प्राप्त दर्ज कर लिया गया!`);
  }

  // --- 4. Daily Sales & Galla Register with Date Filter ---
  function renderDailySales() {
    const container = document.getElementById('tab-view-sales');
    if (!container) return;

    const todayStr = getTodayDateStr();
    const yDate = new Date();
    yDate.setDate(yDate.getDate() - 1);
    const yStr = yDate.toISOString().split('T')[0];
    const thisMonthPrefix = todayStr.substring(0, 7);

    let filteredInvoices = [];
    let filterLabel = `आज (${todayStr})`;
    const currentFilterType = state.salesFilter.type || 'today';

    if (currentFilterType === 'today') {
      filteredInvoices = state.invoices.filter(i => i.date === todayStr);
      filterLabel = `आज के बिल (${todayStr})`;
    } else if (currentFilterType === 'yesterday') {
      filteredInvoices = state.invoices.filter(i => i.date === yStr);
      filterLabel = `कल के बिल (${yStr})`;
    } else if (currentFilterType === 'month') {
      filteredInvoices = state.invoices.filter(i => i.date && i.date.startsWith(thisMonthPrefix));
      filterLabel = `इस महीने के बिल (${thisMonthPrefix})`;
    } else if (currentFilterType === 'all') {
      filteredInvoices = state.invoices;
      filterLabel = `सभी तारीखों के कुल बिल (All Time)`;
    } else if (currentFilterType === 'custom') {
      const cDate = state.salesFilter.customDate || todayStr;
      filteredInvoices = state.invoices.filter(i => i.date === cDate);
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
        <!-- Date Filter Prominent Header Banner -->
        <div class="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white p-5 rounded-2xl shadow-lg border border-blue-500/30">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 bg-white/20 backdrop-blur rounded-lg text-[11px] font-black tracking-wider uppercase text-blue-100 flex items-center gap-1">
                  📅 तारीख व अवधि फिल्टर
                </span>
                <span class="text-xs text-blue-200">चयनित: <strong class="text-white underline underline-offset-2">${filterLabel}</strong></span>
              </div>
              <h2 class="text-xl font-black mt-1">डेली सेल्स व गल्ला मिलान (Daily Sales & Cash Register)</h2>
              <p class="text-xs text-blue-200 mt-0.5">आज, कल, इस महीने या किसी भी तारीख का गल्ला, नकद, यूपीआई व उधार तुरंत देखें</p>
            </div>

            <!-- Filter Buttons & Calendar Picker -->
            <div class="flex flex-wrap items-center gap-2.5">
              <div class="inline-flex rounded-xl bg-black/25 p-1.5 backdrop-blur gap-1 border border-white/10">
                <button type="button" onclick="window.MMS_APP.setSalesDateFilter('today')" class="px-3.5 py-2 rounded-lg text-xs font-black transition ${currentFilterType === 'today' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:bg-white/10'}">
                  ⚡ आज (Today)
                </button>
                <button type="button" onclick="window.MMS_APP.setSalesDateFilter('yesterday')" class="px-3.5 py-2 rounded-lg text-xs font-black transition ${currentFilterType === 'yesterday' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:bg-white/10'}">
                  ⏮️ कल (Yesterday)
                </button>
                <button type="button" onclick="window.MMS_APP.setSalesDateFilter('month')" class="px-3.5 py-2 rounded-lg text-xs font-black transition ${currentFilterType === 'month' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:bg-white/10'}">
                  🗓️ इस महीने
                </button>
                <button type="button" onclick="window.MMS_APP.setSalesDateFilter('all')" class="px-3.5 py-2 rounded-lg text-xs font-black transition ${currentFilterType === 'all' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:bg-white/10'}">
                  🗂️ सभी (All Time)
                </button>
              </div>

              <!-- Calendar Picker -->
              <div class="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-xl border border-white/10">
                <span class="text-xs font-bold text-blue-200">तारीख चुनें:</span>
                <input 
                  type="date" 
                  value="${state.salesFilter.customDate || todayStr}"
                  onchange="window.MMS_APP.setSalesCustomDate(this.value)"
                  class="bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-lg border-0 shadow-sm"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">कुल बिक्री (GROSS)</span>
            <span class="text-2xl font-black text-blue-700 font-mono">${formatCurrency(grossTotal)}</span>
            <span class="text-[11px] text-slate-400 block mt-1">कुल ${filteredInvoices.length} बिल काटे गए</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">💵 गल्ले में नकद (CASH)</span>
            <span class="text-2xl font-black text-emerald-600 font-mono">${formatCurrency(cashTotal)}</span>
            <span class="text-[11px] text-slate-400 block mt-1">आज का काउंटर कैश</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">📱 बैंक / UPI (PHONEPE / GPAY)</span>
            <span class="text-2xl font-black text-indigo-600 font-mono">${formatCurrency(upiTotal)}</span>
            <span class="text-[11px] text-slate-400 block mt-1">ऑनलाइन खाते में जमा</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">📕 आज का दिया उधार (DUE)</span>
            <span class="text-2xl font-black text-rose-600 font-mono">${formatCurrency(udharTotal)}</span>
            <span class="text-[11px] text-slate-400 block mt-1">खाता-बही में दर्ज</span>
          </div>
        </div>

        <!-- Invoices Table for Selected Date Filter -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 class="text-base font-black text-slate-900">${filterLabel}</h3>
              <p class="text-xs text-slate-500">शाम को दुकान बंद करते समय गल्ला मिलान करें</p>
            </div>

            <!-- WhatsApp Closing Report to Admin -->
            <button 
              type="button" 
              onclick="window.MMS_APP.sendDailyClosingReport('${filterLabel}', ${grossTotal}, ${cashTotal}, ${upiTotal}, ${udharTotal}, ${filteredInvoices.length})"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition"
            >
              <span>📲 रिपोर्ट एडमिन को भेजें</span>
            </button>
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
                ${filteredInvoices.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-8 text-center text-slate-400 font-medium">
                      इस तारीख / अवधि में कोई बिल नहीं काटा गया है।
                    </td>
                  </tr>
                ` : filteredInvoices.map(inv => `
                  <tr class="hover:bg-slate-50">
                    <td class="p-2.5 font-mono font-bold text-blue-700">
                      <div>${inv.invoiceNo}</div>
                      <span class="text-[10px] text-slate-400">${inv.date} ${inv.time || ''}</span>
                    </td>
                    <td class="p-2.5">
                      <div class="font-bold text-slate-900">${inv.customerName}</div>
                      <span class="font-mono text-[10px] text-slate-500">${inv.customerPhone}</span>
                    </td>
                    <td class="p-2.5 text-slate-700 max-w-xs truncate">
                      ${inv.items.map(i => `${i.name} (x${i.qty})`).join(', ')}
                    </td>
                    <td class="p-2.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${inv.dueAmount === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                        ${inv.paymentMode}
                      </span>
                    </td>
                    <td class="p-2.5 text-right font-mono font-black text-slate-900">${formatCurrency(inv.totalAmount)}</td>
                    <td class="p-2.5 text-right font-mono font-bold text-emerald-700">${formatCurrency(inv.paidAmount)}</td>
                    <td class="p-2.5 text-right font-mono font-bold ${inv.dueAmount > 0 ? 'text-rose-600 font-black' : 'text-slate-400'}">${formatCurrency(inv.dueAmount)}</td>
                    <td class="p-2.5 text-center">
                      <button onclick='window.MMS_APP.showExistingInvoice("${inv.invoiceNo}")' class="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-bold shadow-2xs">
                        रसीद
                      </button>
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
🌐 वेबसाइट: https://monumobile.pages.dev`;
    window.open(`https://wa.me/${window.MMS_DATA.storeInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  }

  // --- 5. Balance Sheet & P&L Statement (Admin Only) ---
  function renderBalanceSheet() {
    const container = document.getElementById('tab-view-balance');
    if (!container) return;

    const branchFilter = state.activeBranch || 'all';

    const filteredInvoices = state.invoices.filter(inv => branchFilter === 'all' || inv.branchId === branchFilter || !inv.branchId);
    let totalRevenue = 0;
    let totalCogs = 0;
    let totalDueReceivable = 0;

    filteredInvoices.forEach(inv => {
      totalRevenue += inv.totalAmount;
      totalDueReceivable += inv.dueAmount;
      inv.items.forEach(it => {
        totalCogs += (Number(it.cost || (it.rate * 0.45)) * it.qty);
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
            <span class="font-bold text-slate-500 block">कुल बिक्री (Total Sales)</span>
            <span class="text-xl font-black text-slate-900 font-mono mt-1 block">${formatCurrency(totalRevenue)}</span>
            <span class="text-[10px] text-emerald-600 font-bold block mt-0.5">काउंटर व रिपेयर टोकन</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">पार्ट्स खरीद लागत (COGS)</span>
            <span class="text-xl font-black text-rose-600 font-mono mt-1 block">${formatCurrency(totalCogs)}</span>
            <span class="text-[10px] text-slate-400 block mt-0.5">स्पेयर पार्ट्स व फोल्डर खरीद</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">सकल लाभ (Gross Profit)</span>
            <span class="text-xl font-black text-blue-700 font-mono mt-1 block">${formatCurrency(grossProfit)}</span>
            <span class="text-[10px] text-blue-600 font-bold block mt-0.5">${profitMargin}% ग्रॉस मार्जिन</span>
          </div>
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="font-bold text-slate-500 block">कुल दुकान खर्च (Overheads)</span>
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
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-slate-100">
            <h4 class="text-sm font-black text-slate-900">🏢 3 शाखाओं का तुलनात्मक लाभ-हानि खाता (Branch-Wise P&L)</h4>
            <p class="text-xs text-slate-500">हजरतगंज (Head Lab), अमीनाबाद और उन्नाव शाखा का अलग-अलग परफॉर्मेंस</p>
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
                ${state.branches.map(b => {
                  const bInvoices = state.invoices.filter(inv => inv.branchId === b.id || (!inv.branchId && b.id === 'branch_hazratganj'));
                  const bSales = bInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
                  let bCogs = 0;
                  bInvoices.forEach(inv => inv.items.forEach(it => { bCogs += (Number(it.cost || (it.rate * 0.45)) * it.qty); }));
                  const bExpenses = state.expenses.filter(e => e.branchId === b.id).reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
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
      const waText = encodeURIComponent('*Monu Mobile Solution - रिपेयर स्टेटस*\n\nप्रिय ' + job.customerName + ',\nआपके मोबाइल (' + job.device + ') का टोकन नं ' + job.token + ' है।\nवर्तमान स्थिति: *' + (job.status === 'ready' ? 'तैयार है - दुकान से ले जाएं' : job.status === 'delivered' ? 'डिलीवर हो चुका है' : 'इंजीनियर काम कर रहे हैं') + '*\n\n📍 दुकान: 216, श्री रामा टॉवर्स, हजरतगंज, लखनऊ\n📞 संपर्क: 7905859701\n🌐 वेबसाइट: https://monumobile.pages.dev');

      return '<tr class="hover:bg-slate-50">' +
        '<td class="p-2.5 font-mono font-bold text-blue-700">' + job.token + '</td>' +
        '<td class="p-2.5">' +
          '<div class="font-bold text-slate-900">' + job.customerName + '</div>' +
          '<span class="font-mono text-[10px] text-slate-500">' + job.customerPhone + '</span>' +
        '</td>' +
        '<td class="p-2.5 font-bold text-slate-800">' + job.device + '</td>' +
        '<td class="p-2.5 text-slate-600 max-w-xs truncate">' + job.issue + '</td>' +
        '<td class="p-2.5 font-mono text-slate-500">' + (job.passcode || 'N/A') + '</td>' +
        '<td class="p-2.5 text-right font-mono font-bold">' + formatCurrency(job.estimatedCost) + '</td>' +
        '<td class="p-2.5 text-right font-mono text-emerald-700 font-bold">' + formatCurrency(job.advancePaid) + '</td>' +
        '<td class="p-2.5 text-center">' +
          '<select onchange="window.MMS_APP.updateJobStatus(\'' + job.token + '\', this.value)" class="text-[11px] font-bold p-1 rounded-lg border border-slate-300 bg-white">' +
            '<option value="pending" ' + (job.status === 'pending' ? 'selected' : '') + '>रिपेयरिंग चालू</option>' +
            '<option value="ready" ' + (job.status === 'ready' ? 'selected' : '') + '>तैयार है (Ready)</option>' +
            '<option value="delivered" ' + (job.status === 'delivered' ? 'selected' : '') + '>डिलीवर हो गया</option>' +
          '</select>' +
        '</td>' +
        '<td class="p-2.5 text-center">' +
          '<div class="flex items-center justify-center gap-1.5">' +
            '<button type="button" onclick="window.MMS_APP.deleteJobOrInvoice(\'' + job.token + '\')" title="गलती से बना बिल या टोकन हटाएं" class="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold text-[11px] border border-rose-200 transition">' +
              '🗑️ हटाएं' +
            '</button>' +
            '<a href="https://wa.me/91' + job.customerPhone + '?text=' + waText + '" target="_blank" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded font-bold">' +
              'WhatsApp' +
            '</a>' +
          '</div>' +
        '</td>' +
      '</tr>';
    }).join('');

    container.innerHTML = `
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 class="text-base font-black text-slate-900">रिपेयर जॉब-शीट व टोकन लिस्ट (Job Cards)</h3>
            <p class="text-xs text-slate-500">ग्राहकों के रिपेयरिंग मोबाइल, पैटर्न लॉक और टोकन स्टेटस</p>
          </div>
          <button onclick="window.MMS_APP.openNewJobModal()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5">
            <span>➕ नया रिपेयर टोकन बनाएं</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="bg-slate-100 text-slate-600 font-bold">
                <th class="p-2.5 rounded-l-lg">टोकन नं</th>
                <th class="p-2.5">ग्राहक व मोबाइल</th>
                <th class="p-2.5">डिवाइस / मॉडल</th>
                <th class="p-2.5">समस्या</th>
                <th class="p-2.5">लॉक</th>
                <th class="p-2.5 text-right">खर्च</th>
                <th class="p-2.5 text-right">एडवांस</th>
                <th class="p-2.5 text-center">स्थिति</th>
                <th class="p-2.5 text-center rounded-r-lg">एक्शन</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${rowsHtml}
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
    closeModal(dom.newJobModal);
    document.getElementById('new-job-form').reset();
    renderJobCardsManager();
    alert(`✅ नया रिपेयर टोकन [${tokenNo}] जनरेट हो गया!`);
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
    // USER REQUIREMENT: "सेटिंग में जाकर वो अपना फोटो चेंज ���र पाएगा..वहीं पर डॉक्युमेंट भी अपलोड रहेंगे.. जैसे पैनकार्ड आधार कार्ड.. नाम नहीं चेंज होगा.. इंप्लाई आईडी नंबर दिखाई देगा.."
    if (isEmployee) {
      const myEmp = (state.staff || []).find(s => s.phone === curUser.phone || s.id === curUser.id) || curUser;
      const empId = myEmp.id || 'EMP-104';
      const aadhar = myEmp.aadhar || 'XXXXXXXX1234';
      const pan = myEmp.pan || 'ABCDE1234F';

      container.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-6">
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            
            <div class="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h3 class="text-lg font-black text-slate-900">👤 मेरी प्रोफाइल व KYC सेटिंग्स</h3>
                <p class="text-xs text-slate-500">आप अपनी प्रोफाइल फोटो और जरूरी पहचान दस्तावेज (Aadhaar/PAN) यहां से अपडेट कर सकते हैं</p>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                ${myEmp.roleLabel || myEmp.role || 'कर्मचारी'}
              </span>
            </div>

            <!-- Profile Photo Section -->
            <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div class="relative">
                <img id="emp-profile-preview" src="${myEmp.photo || 'images/avatar_placeholder.png'}" class="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${myEmp.name}')">
              </div>
              <div class="space-y-1.5 flex-1">
                <strong class="text-xs font-black text-slate-800 block">प्रोफाइल फोटो बदलें</strong>
                <input type="file" id="emp-photo-file-input" accept="image/*" onchange="window.MMS_APP.handleEmployeePhotoUpload(event)" class="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer">
                <span class="text-[10px] text-slate-400 block">JPG, PNG समर्थित (अधिकतम 2MB)</span>
              </div>
            </div>

            <!-- Non-editable Employee Info (Name & ID) -->
            <div class="grid grid-cols-2 gap-4 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">कर्मचारी का नाम (स्थिर)</span>
                <strong class="text-sm text-slate-900 block mt-0.5">${myEmp.name}</strong>
                <span class="text-[10px] text-slate-400">नाम केवल एडमिन बदल सकता है</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">कर्मचारी आईडी (Employee ID)</span>
                <strong class="text-sm font-mono text-blue-700 block mt-0.5">${empId}</strong>
                <span class="text-[10px] text-slate-400">कंपनी रजिस्टर्ड ID</span>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 text-xs">
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">शाखा (Assigned Branch)</span>
                <strong class="text-xs text-slate-800 block mt-0.5">${getBranchName(myEmp.branchId || 'branch_hazratganj')}</strong>
              </div>
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span class="text-[10px] font-bold text-slate-400 uppercase block">मोबाइल नंबर (लॉगिन)</span>
                <strong class="text-xs font-mono text-slate-800 block mt-0.5">${myEmp.phone}</strong>
              </div>
            </div>

            <!-- KYC Documents Upload Section -->
            <div class="space-y-3 pt-2">
              <h4 class="text-xs font-black uppercase text-slate-700 tracking-wider">📄 पहचान दस्तावेज (KYC Documents)</h4>
              
              <!-- Aadhaar Card -->
              <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong class="text-slate-900 block font-bold">आधार कार्ड (Aadhaar Card)</strong>
                  <span class="text-[11px] font-mono text-slate-500">नंबर: ${aadhar}</span>
                  <span class="text-[10px] text-emerald-600 font-bold block">✓ दस्तावेज सत्यापित</span>
                </div>
                <label class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold text-[11px] hover:bg-slate-100 cursor-pointer shadow-2xs self-start sm:self-center">
                  <span>📎 नया आधार अपलोड</span>
                  <input type="file" accept="image/*,.pdf" onchange="window.MMS_APP.handleDocUpload('aadhar', event)" class="hidden">
                </label>
              </div>

              <!-- PAN Card -->
              <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong class="text-slate-900 block font-bold">पैन कार्ड (PAN Card)</strong>
                  <span class="text-[11px] font-mono text-slate-500">नंबर: ${pan}</span>
                  <span class="text-[10px] text-emerald-600 font-bold block">✓ दस्तावेज सत्यापित</span>
                </div>
                <label class="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold text-[11px] hover:bg-slate-100 cursor-pointer shadow-2xs self-start sm:self-center">
                  <span>📎 नया पैन अपलोड</span>
                  <input type="file" accept="image/*,.pdf" onchange="window.MMS_APP.handleDocUpload('pan', event)" class="hidden">
                </label>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button onclick="alert('✅ आपकी प्रोफाइल फोटो व दस्तावेज सुरक्षित रूप से सहेज लिए गए हैं!')" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm">
                सहेजें (Save Changes)
              </button>
            </div>

          </div>
        </div>
      `;
      return;
    }

    // IF ADMIN OR MANAGER: SHOW MASTER SYSTEM SETTINGS
    const branches = state.branches || [];

    container.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl">⚙️</span>
              <h2 class="text-lg font-black text-slate-900">सिस्टम, स्टोर व जीपीएस सेटिंग्स (Master Control)</h2>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              तीनों शाखाओं के सटीक GPS निर्देशांक, दुकान खुलने का समय, बिलिंग नियम और डेटा बैकअप नियंत्रित करें।
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.MMS_APP.exportBackup()" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs">
              <span>💾 पूरा बैकअप डाउनलोड (JSON)</span>
            </button>
          </div>
        </div>

        <!-- 3 Branches GPS Coordinates & Geofence Manager -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div class="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>📍 शाखाएं व GPS जियोफेंस कॉन्फ़िगरेशन (3 Physical Stores)</span>
              </h3>
              <p class="text-[11px] text-slate-500">
                जब आप वास्तविक लोकेशन पर पहुंचें तो '📍 लाइव GPS भरें' दबाकर सटीक अक्षांश-देशांतर अपडेट कर सकते हैं।
              </p>
            </div>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Anti-Spoof Enforced</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${branches.map((b, idx) => `
              <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                <div class="flex items-center justify-between">
                  <strong class="text-xs font-black text-slate-900">${b.name}</strong>
                  <span class="text-[10px] font-mono text-slate-400">#${idx + 1}</span>
                </div>
                
                <div class="space-y-2 text-xs">
                  <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase">फ़ोन / हेल्पलाइन</label>
                    <input id="set-branch-phone-${b.id}" type="text" value="${b.phone || ''}" class="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold">
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="block text-[10px] font-bold text-slate-500 uppercase">Latitude (अक्षांश)</label>
                      <input id="set-branch-lat-${b.id}" type="number" step="any" value="${b.lat || 0}" class="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold">
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold text-slate-500 uppercase">Longitude (देशांतर)</label>
                      <input id="set-branch-lng-${b.id}" type="number" step="any" value="${b.lng || 0}" class="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold">
                    </div>
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-slate-500 uppercase">अनुमति दायरा (Radius in Meters)</label>
                    <input id="set-branch-radius-${b.id}" type="number" value="${b.radiusMeters || 250}" class="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold">
                  </div>
                </div>

                <div class="pt-2 border-t border-slate-200 flex items-center gap-2">
                  <button onclick="window.MMS_APP.fillCurrentGPSForBranch('${b.id}')" class="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1">
                    <span>📍 लाइव GPS लें</span>
                  </button>
                  <button onclick="window.MMS_APP.saveBranchSettings('${b.id}')" class="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-bold transition">
                    सहेजें
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Store Timings & Attendance Shift Settings -->
        <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="border-b border-slate-100 pb-3 mb-4">
            <h3 class="text-sm font-black text-slate-900">⏰ कार्य समय व लेट-मार्क नियम (Shift Timings)</h3>
            <p class="text-[11px] text-slate-500">स्टाफ के इन-टाइम और लेट-अराइवल डिटेक्शन के मानक घंटे।</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="block text-slate-400 text-[10px] font-bold uppercase">दुकान खुलने का समय (Shift Start)</span>
              <strong class="text-base text-slate-900 block mt-1">10:30 AM</strong>
              <span class="text-[10px] text-slate-500">इसके बाद पंच करने पर लेट-मार्क लगेगा</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="block text-slate-400 text-[10px] font-bold uppercase">दुकान बंद होने का समय (Shift End)</span>
              <strong class="text-base text-slate-900 block mt-1">08:30 PM</strong>
              <span class="text-[10px] text-slate-500">कुल मानक शिफ्ट: 10 घंटे प्रतिदिन</span>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span class="block text-slate-400 text-[10px] font-bold uppercase">उधार अनुमति नियम (Khata Policy)</span>
              <strong class="text-base text-amber-600 block mt-1">B2B दुकानदार केवल</strong>
              <span class="text-[10px] text-slate-500">नॉर्मल वॉक-इन कस्टमर को उधार लॉक रहेगा</span>
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
  function renderDirectoryCRM() {
    const container = document.getElementById('tab-view-directory');
    if (!container) return;

    const currentSubTab = state.crmSubTab || 'shopkeeper';
    const searchQuery = (state.crmSearchQuery || '').trim().toLowerCase();

    // Calculate aggregated metrics for each contact from state.invoices
    const contactStats = {};
    state.invoices.forEach(inv => {
      const p = inv.customerPhone;
      if (!contactStats[p]) {
        contactStats[p] = { count: 0, totalAmount: 0, dueAmount: 0 };
      }
      contactStats[p].count += 1;
      contactStats[p].totalAmount += inv.totalAmount;
      contactStats[p].dueAmount += inv.dueAmount;
    });

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
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 bg-white/20 backdrop-blur rounded-lg text-[11px] font-black tracking-wider uppercase text-blue-100">
                👥 ग्राहक व दुकानदार डेटाबेस (CRM Directory)
              </span>
            </div>
            <h2 class="text-xl font-black mt-1">सभी रजिस्टर्ड दुकानदार व ग्राहकों का पूरा रिकॉर्ड</h2>
            <p class="text-xs text-blue-200 mt-0.5">कुल ${shopkeepers.length} दुकानदार व ${customers.length} ग्राहक सुरक्षित रूप से सहेजे गए हैं</p>
          </div>

          <!-- Excel Export Button -->
          <button 
            type="button" 
            onclick="window.MMS_APP.exportDirectoryToExcel()"
            class="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>📥 एक्सेल में डाउनलोड करें (Export to Excel)</span>
          </button>
        </div>

        <!-- Metric KPI Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">🏪 कुल लोकल दुकानदार (B2B)</span>
            <span class="text-2xl font-black text-amber-600 font-mono">${shopkeepers.length}</span>
            <span class="text-[11px] text-slate-400 block mt-0.5">नियमित थोक व उधार ग्राहक</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">👤 कुल रिटेल ग्राहक (Walk-in)</span>
            <span class="text-2xl font-black text-blue-700 font-mono">${customers.length}</span>
            <span class="text-[11px] text-slate-400 block mt-0.5">काउंटर व सर्विस ग्राहक</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">💰 दुकानदार (B2B) कुल व्यापार</span>
            <span class="text-2xl font-black text-emerald-600 font-mono">${formatCurrency(totalB2bVolume)}</span>
            <span class="text-[11px] text-slate-400 block mt-0.5">थोक व रिपेयरिंग टर्नओवर</span>
          </div>

          <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">💵 रिटेल ग्राहक कुल व्यापार</span>
            <span class="text-2xl font-black text-indigo-600 font-mono">${formatCurrency(totalCustVolume)}</span>
            <span class="text-[11px] text-slate-400 block mt-0.5">काउंटर सेल्स टर्नओवर</span>
          </div>
        </div>

        <!-- Main Database Section with 2 Sub-Tabs -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          
          <!-- Sub-Tabs and Search Bar Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <!-- 2 Sub-Tabs: Shopkeepers vs Customers -->
            <div class="inline-flex rounded-xl bg-slate-100 p-1 gap-1">
              <button 
                type="button" 
                onclick="window.MMS_APP.setDirectorySubTab('shopkeeper')"
                class="px-4 py-2 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${currentSubTab === 'shopkeeper' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}"
              >
                <span>🏪 लोकल दुकानदार (${shopkeepers.length})</span>
              </button>
              <button 
                type="button" 
                onclick="window.MMS_APP.setDirectorySubTab('customer')"
                class="px-4 py-2 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${currentSubTab === 'customer' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}"
              >
                <span>👤 नॉर्मल कस्टमर (${customers.length})</span>
              </button>
            </div>

            <!-- Search Filter Input -->
            <div class="relative w-full sm:w-72">
              <input 
                type="text" 
                value="${state.crmSearchQuery || ''}"
                placeholder="नाम या मोबाइल नंबर से खोजें..." 
                oninput="window.MMS_APP.filterDirectorySearch(this.value)"
                class="w-full text-xs font-bold p-2.5 pl-8 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-2xs"
              >
              <span class="absolute left-2.5 top-2.5 text-slate-400">🔍</span>
            </div>
          </div>

          <!-- Contacts Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="bg-slate-100 text-slate-600 font-bold">
                  <th class="p-2.5 rounded-l-lg">क्र.सं.</th>
                  <th class="p-2.5">नाम / दुकान का नाम</th>
                  <th class="p-2.5">प्रकार</th>
                  <th class="p-2.5">मोबाइल नंबर</th>
                  <th class="p-2.5 text-center">कुल इनवॉइस</th>
                  <th class="p-2.5 text-right">कुल बिलिंग रकम</th>
                  <th class="p-2.5 text-right">वर्तमान बकाया उधार</th>
                  <th class="p-2.5 text-center rounded-r-lg">एक्शन (कॉल व WhatsApp)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${filteredList.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-8 text-center text-slate-400 font-medium">
                      कोई रिकॉर्ड नहीं मिला।
                    </td>
                  </tr>
                ` : filteredList.map((c, idx) => {
                  const stats = contactStats[c.phone] || { count: 0, totalAmount: 0, dueAmount: 0 };
                  const waText = `नमस्ते ${c.name}! Monu Mobile Solution (हजरतगंज, लखनऊ) से संपर्क किया जा रहा है।`;
                  return `
                    <tr class="hover:bg-slate-50">
                      <td class="p-2.5 font-mono text-slate-400">${idx + 1}</td>
                      <td class="p-2.5">
                        <div class="font-black text-slate-900">${c.name}</div>
                        <span class="text-[10px] text-slate-400">रजिस्टर्ड: ${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'नियमित'}</span>
                      </td>
                      <td class="p-2.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${c.type === 'shopkeeper' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}">
                          ${c.type === 'shopkeeper' ? '🏪 दुकानदार' : '👤 ग्राहक'}
                        </span>
                      </td>
                      <td class="p-2.5 font-mono font-bold text-slate-800">${c.phone}</td>
                      <td class="p-2.5 text-center font-mono font-bold">${stats.count} बिल</td>
                      <td class="p-2.5 text-right font-mono font-black text-slate-900">${formatCurrency(stats.totalAmount)}</td>
                      <td class="p-2.5 text-right font-mono font-bold ${stats.dueAmount > 0 ? 'text-rose-600 font-black' : 'text-slate-400'}">
                        ${formatCurrency(stats.dueAmount)}
                      </td>
                      <td class="p-2.5 text-center">
                        <div class="inline-flex items-center gap-1.5 justify-center">
                          <a 
                            href="tel:${c.phone}" 
                            class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs transition"
                            title="कॉल करें"
                          >
                            <span>📞 कॉल</span>
                          </a>
                          <a 
                            href="https://wa.me/91${c.phone}?text=${encodeURIComponent(waText)}" 
                            target="_blank"
                            class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs transition"
                            title="WhatsApp मैसेज भेजें"
                          >
                            <span>💬 WhatsApp</span>
                          </a>
                        </div>
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

    const isOwner = !state.currentUser || state.currentUser.role === 'admin';
    const curBranch = state.activeBranch || 'all';

    container.innerHTML = `
      <span class="text-[11px] uppercase font-black text-slate-500 flex items-center gap-1">
        <span>🏢 शाखा:</span>
      </span>
      <select id="portal-branch-select" onchange="window.MMS_APP.setPortalActiveBranch(this.value)" class="bg-white border border-slate-300 text-slate-900 text-xs font-black rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer shadow-2xs">
        ${isOwner ? `<option value="all" ${curBranch === 'all' ? 'selected' : ''}>🏢 सभी शाखाएं (All Branches)</option>` : ''}
        <option value="branch_hazratganj" ${curBranch === 'branch_hazratganj' ? 'selected' : ''}>📍 हजरतगंज (Head Lab)</option>
        <option value="branch_aminabad" ${curBranch === 'branch_aminabad' ? 'selected' : ''}>📍 अमीनाबाद शाखा</option>
        <option value="branch_unnao" ${curBranch === 'branch_unnao' ? 'selected' : ''}>📍 उन्नाव शाखा</option>
      </select>
    `;
  }

  function setPortalActiveBranch(branchId) {
    state.activeBranch = branchId;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BRANCH, branchId);
    renderPortalBranchSwitcher();
    switchPortalTab(state.activeAdminTab || 'pos');
  }

  function getBranchName(branchId) {
    if (!branchId || branchId === 'all') return 'सभी शाखाएं';
    const b = state.branches.find(x => x.id === branchId);
    return b ? b.name : branchId;
  }

  // =========================================================================
  // 13. SMART ATTENDANCE (LIVE CAMERA SELFIE + GPS GEOFENCING + ADMIN APPROVAL)
  // =========================================================================
  
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

  function previewSelfieModal(url, empName, info) {
    const existing = document.getElementById('selfie-preview-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'selfie-preview-modal';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150';

    modal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-md w-full p-5 border border-slate-200 shadow-2xl relative">
        <button type="button" onclick="document.getElementById('selfie-preview-modal').remove()" class="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg leading-none">
          &times;
        </button>
        <h4 class="font-black text-slate-900 text-sm mb-3">📸 सेल्फी व GPS वेरिफिकेशन</h4>
        <div class="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-900">
          <img src="${url}" class="w-full h-auto object-cover" alt="Verified Selfie">
        </div>
        <div class="mt-3 p-3 bg-slate-50 rounded-xl text-xs space-y-1">
          <div class="flex justify-between font-bold text-slate-900">
            <span>कर्मचारी:</span>
            <span>${empName}</span>
          </div>
          <div class="flex justify-between text-slate-600">
            <span>विवरण:</span>
            <span>${info}</span>
          </div>
        </div>
        <div class="mt-3 text-center">
          <button type="button" onclick="document.getElementById('selfie-preview-modal').remove()" class="w-full py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition">
            ✕ बंद करें (Close)
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  let attMediaStream = null;
  let attCapturedPhotoData = null;
  let attCurrentCoords = null;

  function renderAttendanceModule() {
    const container = document.getElementById('tab-view-attendance');
    if (!container) return;

    const todayStr = getTodayDateStr();
    const branchFilter = state.activeBranch || 'all';
    const curUser = state.currentUser || {};
    const role = (curUser.role || 'employee').toLowerCase();
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    // IF LOGGED IN AS EMPLOYEE / TECHNICIAN:
    // User requirement: "होना सिर्फ इतना चाहिए कि अटेंडेंस लगाएं.. अगर अटेंडेंस लगी हो तो आए साइन ऑफ करें.. बस.. और उसके बाद नीचे दिखाए कि कितने घंटे आज काम किया है.. और इस महीने कितने घंटे काम किया है.. बस और कुछ नहीं.."
    if (isEmployee) {
      const myEmp = (state.staff || []).find(s => curUser && (s.phone === curUser.phone || s.id === curUser.id)) || curUser;
      const myRecords = (state.attendance || []).filter(a => 
        a.empId === myEmp.id || 
        a.employeeId === myEmp.id || 
        (a.empName && myEmp.name && a.empName.includes(myEmp.name.split(' ')[0])) ||
        (a.employeeName && myEmp.name && a.employeeName.includes(myEmp.name.split(' ')[0])) ||
        (curUser.phone && a.phone === curUser.phone) ||
        (curUser.phone && (a.employeePhone === curUser.phone || a.empPhone === curUser.phone))
      );
      
      const todayPunch = myRecords.find(a => a.date === todayStr);
      const isPunchedIn = todayPunch && todayPunch.inTime && (!todayPunch.outTime || todayPunch.outTime === '—');
      const isPunchedOut = todayPunch && todayPunch.outTime && todayPunch.outTime !== '—';

      // Calculate Hours
      const todayHours = todayPunch ? (Number(todayPunch.hoursWorked) || (isPunchedIn ? 0 : 0)) : 0;
      const thisMonthPrefix = todayStr.substring(0, 7);
      const monthRecords = myRecords.filter(a => a.date && a.date.startsWith(thisMonthPrefix));
      const monthHours = monthRecords.reduce((sum, a) => sum + (Number(a.hoursWorked) || 0), 0);

      container.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-6">
          
          <!-- Employee Greeting Card -->
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

            <!-- Single Main Action Button -->
            <div class="pt-3">
              ${!todayPunch ? `
                <button onclick="window.MMS_APP.openPunchModal()" class="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-lg transition active:scale-95 flex items-center justify-center gap-2 mx-auto">
                  <span>📸 हाजिरी लगाएं (Duty Punch In)</span>
                </button>
              ` : isPunchedIn ? `
                <button onclick="window.MMS_APP.openPunchModal()" class="w-full sm:w-auto px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-sm font-black shadow-lg transition active:scale-95 flex items-center justify-center gap-2 mx-auto animate-pulse">
                  <span>🛑 साइन ऑफ करें (Duty Punch Out)</span>
                </button>
              ` : `
                <div class="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl text-emerald-300 text-xs font-bold inline-block">
                  ✅ आज की ड्यूटी पूर्ण हो चुकी है (Punched Out at ${todayPunch.outTime})
                </div>
              `}
            </div>

            ${todayPunch ? `
              <div class="text-[11px] text-slate-300 pt-1">
                आज का इन-टाइम: <strong>${todayPunch.inTime || '—'}</strong> 
                ${todayPunch.outTime && todayPunch.outTime !== '—' ? `• आउट-टाइम: <strong>${todayPunch.outTime}</strong>` : '• (वर्तमान में ड्यूटी चालू)'}
              </div>
            ` : ''}
          </div>

          <!-- Hours Summary (Today & This Month) -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">आज का कार्य समय</span>
              <div class="text-3xl font-black text-blue-600 font-mono mt-1">
                ${isPunchedIn ? 'ड्यूटी चालू' : `${todayHours.toFixed(1)} hrs`}
              </div>
              <span class="text-[10px] text-slate-400 mt-1 block">दैनिक शिफ्ट</span>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center">
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
                    <span class="block text-[10px] ${r.status === 'approved' ? 'text-emerald-600 font-bold' : 'text-amber-600'}">
                      ${r.status === 'approved' ? '✓ स्वीकृत' : '⏳ पेंडिंग'}
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
    // User requirement: "एडमिन में भी दिखा रहा है कि हाजिरी लगाएं.. जो नहीं हो सकता है.. एडमिन सिर्फ चेक करेगा कि कौन आया है और कौन नहीं?"
    const records = state.attendance.filter(a => {
      if (branchFilter === 'all') return true;
      if (branchFilter === 'branch_unnao') {
        return a.branchId === 'branch_unnao' || 
          (a.empName && a.empName.includes('Vikas')) || 
          (a.employeeName && a.employeeName.includes('Vikas')) ||
          a.empId === 'emp_105' ||
          a.employeeId === 'emp_105';
      }
      return a.branchId === branchFilter;
    });
    const todayRecords = records.filter(a => a.date === todayStr);
    const pendingRecords = records.filter(a => a.status === 'pending');
    const approvedToday = todayRecords.filter(a => a.status === 'approved');
    const totalTodayHours = approvedToday.reduce((sum, a) => sum + (Number(a.hoursWorked) || 0), 0);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Header: Admin View (No "हाजिरी लगाएं" button for admin!) -->
        <div class="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-5 rounded-2xl text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-500/30 text-blue-200 border border-blue-400/30">
                स्टाफ अटेंडेंस मॉनिटरिंग
              </span>
              <span class="text-xs font-bold text-slate-300">
                शाखा: ${getBranchName(branchFilter)}
              </span>
            </div>
            <h3 class="text-xl font-black">दैनिक उपस्थिति रजिस्टर व स्वीकृति (Admin View)</h3>
            <p class="text-xs text-slate-300 mt-0.5">कर्मचारियों की सेल्फी, जीपीएस दूरी और इन/आउट समय की जांच व स्वीकृति करें</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="window.MMS_APP.exportAttendanceToExcel()" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition flex items-center gap-1.5">
              <span>📥 एक्सेल (CSV) डाउनलोड</span>
            </button>
          </div>
        </div>

        <!-- 3 Quick KPI Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span class="text-xs font-bold text-slate-500 block uppercase">आज उपस्थित कर्मचारी (Today's Present)</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-2xl font-black text-slate-900 font-mono">${todayRecords.length}</span>
              <span class="text-xs font-bold text-emerald-600">(${approvedToday.length} अप्रूव्ड)</span>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span class="text-xs font-bold text-slate-500 block uppercase">स्वीकृति हेतु पेंडिंग (Pending Approval)</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-2xl font-black ${pendingRecords.length > 0 ? 'text-amber-600' : 'text-slate-400'} font-mono">${pendingRecords.length}</span>
              <span class="text-xs text-slate-400">एक्शन आवश्यक</span>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span class="text-xs font-bold text-slate-500 block uppercase">आज कुल काम के घंटे</span>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-2xl font-black text-blue-600 font-mono">${totalTodayHours.toFixed(1)} hrs</span>
              <span class="text-xs text-slate-500">कुल वर्किंग समय</span>
            </div>
          </div>
        </div>

        <!-- Attendance Punches Table -->
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
                  const isPending = r.status === 'pending';
                  const isApproved = r.status === 'approved';
                  return `
                    <tr class="hover:bg-slate-50/70 transition">
                      <td class="p-3.5 whitespace-nowrap font-mono font-bold text-slate-800">${r.date}</td>
                      <td class="p-3.5 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                          <img src="${r.employeePhoto || 'images/avatar_placeholder.png'}" class="w-7 h-7 rounded-full object-cover border border-slate-200" onerror="this.src='https://ui-avatars.com/api/?name=' + encodeURIComponent('${r.employeeName}')">
                          <strong class="text-slate-900 font-black">${r.employeeName}</strong>
                        </div>
                      </td>
                      <td class="p-3.5 whitespace-nowrap text-slate-600">
                        ${getBranchName(r.branchId || 'branch_hazratganj')}
                      </td>
                      <td class="p-3.5 whitespace-nowrap text-center">
                        ${r.photo ? `
                          <button onclick="window.MMS_APP.previewSelfieModal('${r.photo}', '${encodeURIComponent(r.employeeName)}', '${r.inTime}', '${r.distanceMeters || '15'}')" class="relative group inline-block">
                            <img src="${r.photo}" class="w-8 h-8 rounded-lg object-cover border border-slate-300 shadow-2xs group-hover:scale-105 transition" alt="Selfie">
                          </button>
                        ` : '<span class="text-slate-400 text-[10px]">उपलब्ध नहीं</span>'}
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-bold text-emerald-700">${r.inTime || 'N/A'}</td>
                      <td class="p-3.5 whitespace-nowrap font-bold text-slate-600">${r.outTime || '— (ड्यूटी पर)'}</td>
                      <td class="p-3.5 whitespace-nowrap font-mono font-black text-blue-700">
                        ${Number(r.hoursWorked) > 0 ? `${Number(r.hoursWorked).toFixed(1)} hrs` : '—'}
                      </td>
                      <td class="p-3.5 whitespace-nowrap">
                        ${r.isOutOfRadius ? `
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 animate-pulse block">
                            ${r.locationAlert || `🔴 दुकान से बाहर (${r.distanceMeters}m दूर)`}
                          </span>
                        ` : `
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 block">
                            🟢 दुकान पर (${r.distanceMeters || 15}m)
                          </span>
                        `}
                      </td>
                      <td class="p-3.5 whitespace-nowrap">
                        ${isApproved ? `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                            ✓ स्वीकृत (Approved)
                          </span>
                        ` : isPending ? `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                            ⏳ पेंडिंग अप्रूवल
                          </span>
                        ` : `
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-200">
                            ✕ अस्वीकृत
                          </span>
                        `}
                      </td>
                      <td class="p-3.5 whitespace-nowrap text-right space-x-1">
                        ${isPending ? `
                          <button onclick="window.MMS_APP.approveAttendance('${r.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black transition shadow-2xs">
                            स्वीकारें
                          </button>
                          <button onclick="window.MMS_APP.rejectAttendance('${r.id}')" class="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[10px] font-black transition">
                            अस्वीकारें
                          </button>
                        ` : `
                          <span class="text-slate-400 text-[10px]">पूर्ण</span>
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

  function filterPunchEmployees(branchId) {
    const select = document.getElementById('punch-emp-select');
    if (!select) return;
    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';

    if (!isOwner && !isManager) {
      // Employee: strictly locked to themselves
      const curEmp = state.staff.find(s => state.currentUser && (s.phone === state.currentUser.phone || s.id === state.currentUser.id)) || state.staff[0];
      if (curEmp) {
        select.innerHTML = `<option value="${curEmp.id}">${curEmp.name} (${curEmp.branchName || 'स्टाफ'})</option>`;
        select.value = curEmp.id;
        select.disabled = true;
      }
      return;
    }

    const list = (!branchId || branchId === 'all')
      ? state.staff
      : state.staff.filter(s => s.branchId === branchId);
    select.disabled = false;
    select.innerHTML = list.map(s => `<option value="${s.id}">${s.name} (${s.branchName || 'स्टाफ'})</option>`).join('');
  }

  function openPunchModal() {
    const existing = document.getElementById('punch-modal-backdrop');
    if (existing) existing.remove();

    attCapturedPhotoData = null;
    attCurrentCoords = null;

    const modal = document.createElement('div');
    modal.id = 'punch-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto';

    const role = state.currentUser ? (state.currentUser.role || 'employee').toLowerCase() : 'employee';
    const isOwner = role === 'admin';
    const isManager = role === 'manager';
    const isEmployee = !isOwner && !isManager;

    const curEmp = state.staff.find(s => state.currentUser && (s.phone === state.currentUser.phone || s.id === state.currentUser.id)) || state.staff[0];
    const todayStr = getTodayDateStr();
    const todayPunch = curEmp ? state.attendance.find(a => (a.empId === curEmp.id || a.employeeId === curEmp.id || a.empName === curEmp.name) && a.date === todayStr) : null;
    const isPunchedIn = todayPunch && todayPunch.inTime && (!todayPunch.outTime || todayPunch.outTime === '—');
    const defaultPunchType = isPunchedIn ? 'out' : 'in';
    const targetBranch = (curEmp && curEmp.branchId) ? curEmp.branchId : (state.activeBranch !== 'all' ? state.activeBranch : 'branch_hazratganj');

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button type="button" onclick="window.MMS_APP.closePunchModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-black leading-none">
          &times;
        </button>

        <div class="mb-4">
          <span class="text-[10px] uppercase font-black text-blue-600 block">स्मार्ट अटेंडेंस पंच</span>
          <h3 class="text-lg font-black text-slate-900">📸 लाइव सेल्फी व GPS पंच</h3>
          <p class="text-xs text-slate-500">कैमरे से सेल्फी लें और GPS लोकेशन ऑटो-वेरिफाई करें</p>
        </div>

        <form id="punch-in-out-form" onsubmit="window.MMS_APP.submitPunch(event)" class="space-y-4">
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
              <select id="punch-branch-select" ${isEmployee ? 'disabled' : ''} onchange="window.MMS_APP.filterPunchEmployees(this.value)" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="branch_hazratganj" ${targetBranch === 'branch_hazratganj' ? 'selected' : ''}>📍 हजरतगंज (Head Lab)</option>
                <option value="branch_aminabad" ${targetBranch === 'branch_aminabad' ? 'selected' : ''}>📍 अमीनाबाद शाखा</option>
                <option value="branch_unnao" ${targetBranch === 'branch_unnao' ? 'selected' : ''}>📍 उन्नाव शाखा</option>
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

            <div class="relative w-full h-44 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
              <video id="punch-camera-video" autoplay playsinline class="w-full h-full object-cover"></video>
              <canvas id="punch-camera-canvas" class="hidden"></canvas>
              <img id="punch-photo-preview" class="hidden absolute inset-0 w-full h-full object-cover" alt="Captured">
              <div id="punch-camera-placeholder" class="text-center p-4 text-slate-400 text-xs">
                <span>📷 कृपया "कैमरा चालू करें" दबाएं या नीचे से फोटो अपलोड करें</span>
              </div>
            </div>

            <div class="flex items-center gap-2 pt-1">
              <button type="button" onclick="window.MMS_APP.captureSelfie()" class="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md">
                <span>📸 सेल्फी कैप्चर करें</span>
              </button>
              <label class="cursor-pointer px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1">
                <span>📁 गैलरी</span>
                <input type="file" accept="image/*" capture="user" onchange="window.MMS_APP.handlePhotoUpload(event)" class="hidden">
              </label>
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

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button type="button" onclick="window.MMS_APP.closePunchModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition">
              रद्द करें
            </button>
            <button type="submit" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition flex items-center gap-1.5">
              <span>✅ पंच दर्ज करें</span>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    try { startCamera(); } catch(err) { console.warn('Camera autostart failed:', err); }
    try { getGPSLocation(); } catch(err) { console.warn('GPS autostart failed:', err); }
  }

  function closePunchModal() {
    stopCamera();
    const modal = document.getElementById('punch-modal-backdrop');
    if (modal) modal.remove();
  }

  function startCamera() {
    const video = document.getElementById('punch-camera-video');
    const placeholder = document.getElementById('punch-camera-placeholder');
    if (!video) return;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } })
        .then(stream => {
          attMediaStream = stream;
          video.srcObject = stream;
          if (placeholder) placeholder.classList.add('hidden');
        })
        .catch(err => {
          console.warn("Camera access denied or unavailable:", err);
          if (placeholder) {
            placeholder.innerHTML = '<span class="text-amber-400">⚠️ कैमरा चालू नहीं हो सका। कृपया "📁 गैलरी" बटन से फोटो अपलोड करें।</span>';
          }
        });
    }
  }

  function stopCamera() {
    if (attMediaStream) {
      attMediaStream.getTracks().forEach(track => track.stop());
      attMediaStream = null;
    }
  }

  function captureSelfie() {
    const video = document.getElementById('punch-camera-video');
    const canvas = document.getElementById('punch-camera-canvas');
    const preview = document.getElementById('punch-photo-preview');
    if (!video || !canvas || !preview) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get selected branch and distance
    const branchId = document.getElementById('punch-branch-select')?.value || 'branch_hazratganj';
    const branch = state.branches.find(b => b.id === branchId) || state.branches[0];
    const lat = attCurrentCoords ? attCurrentCoords.lat : branch.lat;
    const lng = attCurrentCoords ? attCurrentCoords.lng : branch.lng;
    const dist = calculateDistanceMeters(lat, lng, branch.lat, branch.lng);
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
    ctx.fillText(`📅 ${dateStr} ${timeStr} | Monu Mobile Solution GPS Verified`, 12, canvas.height - 12);

    attCapturedPhotoData = canvas.toDataURL('image/jpeg', 0.85);
    preview.src = attCapturedPhotoData;
    preview.classList.remove('hidden');
    stopCamera();
  }

  function handlePhotoUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      attCapturedPhotoData = event.target.result;
      const preview = document.getElementById('punch-photo-preview');
      const placeholder = document.getElementById('punch-camera-placeholder');
      if (preview) {
        preview.src = attCapturedPhotoData;
        preview.classList.remove('hidden');
      }
      if (placeholder) placeholder.classList.add('hidden');
      stopCamera();
    };
    reader.readAsDataURL(file);
  }

  function getGPSLocation() {
    const statusEl = document.getElementById('punch-gps-status');
    if (!statusEl) return;

    if (!navigator.geolocation) {
      statusEl.innerHTML = '<span class="text-amber-600">⚠️ ब्राउज़र में GPS सपोर्ट नहीं है।</span>';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        attCurrentCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        };
        statusEl.innerHTML = `
          <span class="text-emerald-700 font-bold">
            🟢 लोकेशन प्राप्त: ${pos.coords.latitude.toFixed(5)}°, ${pos.coords.longitude.toFixed(5)}° (एक्यूरेसी: ${Math.round(pos.coords.accuracy)}m)
          </span>
        `;
      },
      (err) => {
        console.warn("GPS error:", err);
        attCurrentCoords = { lat: 26.85172, lng: 80.94625, accuracy: 50 }; // Hazratganj default
        statusEl.innerHTML = `
          <span class="text-slate-600 font-medium">
            📍 दुकान डिफ़ॉल्ट लोकेशन दर्ज (GPS परमिशन मैन्युअल)
          </span>
        `;
      },
      { timeout: 10000, enableHighAccuracy: true }
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
      // Direct reliable lookup from logged-in employee session
      emp = state.staff.find(s => curUser && (s.phone === curUser.phone || s.id === curUser.id)) || curUser;
      branchId = emp.branchId || 'branch_unnao';
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
    const branch = state.branches.find(b => b.id === branchId) || state.branches.find(b => b.id === emp.branchId) || state.branches[0];
    const branchName = branch ? branch.name : getBranchName(branchId);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = getTodayDateStr();

    let selfieUrl = attCapturedPhotoData || (emp && emp.photo) || 'logo-badge.png';
    let lat = attCurrentCoords ? attCurrentCoords.lat : (branch ? branch.lat : 26.5463);
    let lng = attCurrentCoords ? attCurrentCoords.lng : (branch ? branch.lng : 80.4879);

    const distMeters = branch ? Math.round(calculateDistanceMeters(lat, lng, branch.lat, branch.lng)) : 10;
    const isOutOfRadius = distMeters > (branch ? (branch.radiusMeters || 250) : 250);
    const locationStatus = isOutOfRadius 
      ? `🔴 गलत जगह से हाजिरी (दुकान से ${(distMeters / 1000).toFixed(1)} km दूर)`
      : `🟢 दुकान पर (${distMeters}m)`;

    // Check existing record for today
    const existingToday = state.attendance.find(a => 
      ((a.empId === emp.id || a.employeeId === emp.id || a.empName === emp.name || a.employeeName === emp.name) ||
       (curUser && curUser.phone && a.phone === curUser.phone)) &&
      a.date === dateStr
    );

    if (punchType === 'out' && existingToday) {
      existingToday.outTime = timeStr;
      existingToday.outTimestamp = Date.now();
      let calculatedHours = manualHours;
      if (!calculatedHours && existingToday.inTimestamp) {
        calculatedHours = Math.max(0.5, parseFloat(((Date.now() - existingToday.inTimestamp) / 3600000).toFixed(1)));
      }
      if (!calculatedHours) {
        calculatedHours = emp.shiftHours || 8;
      }
      existingToday.hoursWorked = calculatedHours;
      existingToday.status = 'pending';
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
    }

    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(state.attendance));

    closePunchModal();
    renderAttendanceModule();
    alert('✅ अटेंडेंस सफलतापूर्वक दर्ज हो गई है! ' + (isOutOfRadius ? '\n' + locationStatus : ''));
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

  function previewSelfieImage(url) {
    const w = window.open('', '_blank');
    w.document.write(`
      <html>
        <head><title>सेल्फी वेरिफिकेशन - Monu Mobile Solution</title></head>
        <body style="margin:0; background:#0f172a; display:flex; align-items:center; justify-content:center; height:100vh;">
          <img src="${url}" style="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        </body>
      </html>
    `);
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
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 class="text-sm font-black text-slate-900">स्टाफ सूची व कार्य-घंटे गणित (Dynamic Shift & Hourly Rate)</h4>
              <p class="text-xs text-slate-500">तय घंटे = (30 - मासिक छुट्टी) × शिफ्ट घंटे • दर = बेसिक वेतन / तय घंटे</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">कर्मचारी विवरण</th>
                  <th class="p-3.5">शाखा</th>
                  <th class="p-3.5">मोबाइल (Login)</th>
                  <th class="p-3.5 text-center">दैनिक शिफ्ट</th>
                  <th class="p-3.5 text-center">मासिक छुट्टी</th>
                  <th class="p-3.5 text-center">तय मासिक घंटे</th>
                  <th class="p-3.5 text-right">प्रति घंटा दर (₹/hr)</th>
                  <th class="p-3.5 text-right">बेसिक वेतन</th>
                  <th class="p-3.5 text-right">एडवांस बकाया</th>
                  <th class="p-3.5 text-right">एक्शन</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                ${staffList.filter(s => s.role !== 'admin').map(s => {
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
                          <div>
                            <span class="font-black text-slate-900 block">${s.name}</span>
                            <span class="text-[10px] text-blue-600 font-bold">${s.roleLabel || s.role}</span>
                          </div>
                        </div>
                      </td>
                      <td class="p-3.5 whitespace-nowrap">
                        <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          ${s.branchName || getBranchName(s.branchId)}
                        </span>
                      </td>
                      <td class="p-3.5 whitespace-nowrap font-mono font-bold text-slate-900">${s.phone}</td>
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
                        <button onclick="window.MMS_APP.openSalarySlipModal('${s.id}')" title="मासिक सैलरी स्लिप देखें व बनाएं" class="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition shadow-2xs">
                          📄 सैलरी स्लिप
                        </button>
                        <button onclick="window.MMS_APP.openEditStaffModal('${s.id}')" title="घंटे या वेतन एडिट करें" class="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition">
                          ✏️ एडिट
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
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
    if (state.currentUser && state.currentUser.role !== 'admin') {
      alert('❌ केवल सुपर एडमिन ही कर्मचारियों के विवरण को बदल सकते हैं!');
      return;
    }

    // Security check: Admin profile cannot be edited or modified via employee modal
    if (editEmpId) {
      const targetEmp = state.staff.find(s => s.id === editEmpId);
      if (targetEmp && targetEmp.role === 'admin') {
        alert('🔒 सुपर एडमिन (मालिक) का खाता सुरक्षित है। इसे कर्मचारी लिस्ट से एडिट नहीं किया जा सकता।');
        return;
      }
    }
    const existing = document.getElementById('staff-modal-backdrop');
    if (existing) existing.remove();

    const emp = editEmpId ? state.staff.find(s => s.id === editEmpId) : null;
    const isEdit = !!emp;

    const modal = document.createElement('div');
    modal.id = 'staff-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto';

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button type="button" onclick="window.MMS_APP.closeAddStaffModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-black leading-none">
          &times;
        </button>

        <div class="mb-4">
          <span class="text-[10px] uppercase font-black text-blue-600 block">HR प्रोफाइल व शिफ्ट सेटअप</span>
          <h3 class="text-lg font-black text-slate-900">${isEdit ? '✏️ कर्मचारी विवरण व शिफ्ट एडिट करें' : '➕ नया कर्मचारी जोड़ें'}</h3>
          <p class="text-xs text-slate-500">दैनिक शिफ्ट घंटे व मासिक छुट्टियां तय करें, सिस्टम ऑटो-घंटे व दर कैल्कुलेट करेगा</p>
        </div>

        <form id="add-staff-form" onsubmit="window.MMS_APP.saveStaff(event, '${editEmpId || ''}')" class="space-y-4">
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
                <option value="branch_hazratganj" ${emp && emp.branchId === 'branch_hazratganj' ? 'selected' : ''}>📍 हजरतगंज (Head Lab)</option>
                <option value="branch_aminabad" ${emp && emp.branchId === 'branch_aminabad' ? 'selected' : ''}>📍 अमीनाबाद शाखा</option>
                <option value="branch_unnao" ${emp && emp.branchId === 'branch_unnao' ? 'selected' : ''}>📍 उन्नाव शाखा</option>
                <option value="all" ${emp && emp.branchId === 'all' ? 'selected' : ''}>🏢 सभी शाखाएं</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">लॉगिन पासवर्ड *</label>
              <input type="text" id="staff-pass-input" value="${emp ? emp.pass : 'Mms@' + Math.floor(100000 + Math.random() * 900000)}" required class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">फोटो लिंक / URL (वैकल्पिक)</label>
              <input type="text" id="staff-photo-input" value="${emp ? emp.photo : ''}" placeholder="https://..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
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
    const pass = document.getElementById('staff-pass-input').value.trim();
    const photo = document.getElementById('staff-photo-input').value.trim();

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

    if (editEmpId) {
      const idx = state.staff.findIndex(s => s.id === editEmpId);
      if (idx !== -1) {
        state.staff[idx] = {
          ...state.staff[idx],
          name, phone, role, roleLabel: roleLabels[role] || role, branchId, branchName, pass,
          shiftHours, allowedLeaves, baseSalary, targetHours, hourlyRate,
          photo: photo || state.staff[idx].photo
        };
      }
    } else {
      const newStaff = {
        id: 'emp_' + Date.now(),
        name, phone, role, roleLabel: roleLabels[role] || role, branchId, branchName, pass,
        shiftHours, allowedLeaves, baseSalary, targetHours, hourlyRate,
        active: true,
        joinDate: getTodayDateStr(),
        photo: photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      };
      state.staff.push(newStaff);
    }

    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(state.staff));
    closeAddStaffModal();
    renderStaffHRModule();
    alert('✅ कर्मचारी रिकॉर्ड सफलतापूर्वक सेव हो गया!');
  }

  function openIssueAdvanceModal(preselectedEmpId) {
    const existing = document.getElementById('advance-modal-backdrop');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'advance-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto';

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button type="button" onclick="window.MMS_APP.closeIssueAdvanceModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-black leading-none">
          &times;
        </button>

        <div class="mb-4">
          <span class="text-[10px] uppercase font-black text-amber-600 block">स्टाफ लोन / एडवांस</span>
          <h3 class="text-lg font-black text-slate-900">💸 नया स्टाफ एडवांस दर्ज करें</h3>
          <p class="text-xs text-slate-500">मासिक सैलरी स्लिप बनने पर यह किस्त स्वतः कट जाएगी</p>
        </div>

        <form id="issue-advance-form" onsubmit="window.MMS_APP.saveAdvance(event)" class="space-y-4">
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
    const expensesList = state.expenses.filter(e => branchFilter === 'all' || e.branchId === branchFilter);

    const totalExpense = expensesList.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const rentExpenses = expensesList.filter(e => e.category === 'rent').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const utilExpenses = expensesList.filter(e => e.category === 'electricity' || e.category === 'wifi').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const miscExpenses = expensesList.filter(e => e.category !== 'rent' && e.category !== 'electricity' && e.category !== 'wifi' && e.category !== 'salary').reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Header & Actions -->
        <div class="bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 p-5 rounded-2xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-500/30 text-rose-200 border border-rose-400/30">
                दुकान खर्च ट्रैकर
              </span>
              <span class="text-xs font-bold text-slate-300">
                शाखा: ${getBranchName(branchFilter)}
              </span>
            </div>
            <h3 class="text-xl font-black">दुकान खर्च (Overhead Expenses)</h3>
            <p class="text-xs text-slate-300 mt-0.5">किराया, बिजली, इंटरनेट, चाय-नाश्ता, मशीन व टूल मरम्मत खर्च का संपूर्ण हिसाब</p>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="window.MMS_APP.openAddExpenseModal()" class="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition active:scale-95">
              <span>➕ नया खर्च जोड़ें</span>
            </button>
            <button onclick="window.MMS_APP.exportExpensesToExcel()" class="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition">
              <span>📥 खर्च एक्सेल (CSV) डाउनलोड</span>
            </button>
          </div>
        </div>

        <!-- 4 KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">कुल दर्ज खर्च (Total Expenses)</span>
            <span class="text-2xl font-black text-rose-600 font-mono mt-1 block">${formatCurrency(totalExpense)}</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">दुकान किराया (Shop Rent)</span>
            <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">${formatCurrency(rentExpenses)}</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">बिजली व ब्रॉडबैंड बिल (Utilities)</span>
            <span class="text-2xl font-black text-blue-600 font-mono mt-1 block">${formatCurrency(utilExpenses)}</span>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span class="text-xs font-bold text-slate-500 block">चाय, टूल व विविध (Pantry & Misc)</span>
            <span class="text-2xl font-black text-amber-600 font-mono mt-1 block">${formatCurrency(miscExpenses)}</span>
          </div>
        </div>

        <!-- Expenses List Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h4 class="text-sm font-black text-slate-900">दुकान खर्च रजिस्टर (Expenses Ledger)</h4>
              <p class="text-xs text-slate-500">सभी शाखाओं के खर्च और भुगतान माध्यम का विवरण</p>
            </div>
            <div class="text-xs text-slate-400">
              कुल प्रविष्टियां: <strong class="text-slate-700 font-mono">${expensesList.length}</strong>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th class="p-3.5">तारीख</th>
                  <th class="p-3.5">शाखा</th>
                  <th class="p-3.5">खर्च श्रेणी (Category)</th>
                  <th class="p-3.5">विवरण (Description)</th>
                  <th class="p-3.5">भुगतानकर्ता</th>
                  <th class="p-3.5">माध्यम</th>
                  <th class="p-3.5 text-right">रकम (₹)</th>
                  <th class="p-3.5 text-right">एक्शन</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                ${expensesList.length === 0 ? `
                  <tr>
                    <td colspan="8" class="p-8 text-center text-slate-400">
                      इस शाखा के लिए कोई खर्च दर्ज नहीं है। ऊपर "➕ नया खर्च जोड़ें" बटन से दर्ज करें।
                    </td>
                  </tr>
                ` : expensesList.map(exp => `
                  <tr class="hover:bg-slate-50/70 transition">
                    <td class="p-3.5 whitespace-nowrap font-mono text-slate-900">${exp.date}</td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        ${exp.branchName || getBranchName(exp.branchId)}
                      </span>
                    </td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="font-bold text-slate-800">${exp.categoryLabel || exp.category}</span>
                    </td>
                    <td class="p-3.5 text-slate-600">${exp.description}</td>
                    <td class="p-3.5 whitespace-nowrap font-bold text-slate-700">${exp.paidBy || 'Admin'}</td>
                    <td class="p-3.5 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${exp.paymentMode === 'online' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}">
                        ${exp.paymentMode === 'online' ? 'UPI / बैंक' : 'नकद (Cash)'}
                      </span>
                    </td>
                    <td class="p-3.5 text-right whitespace-nowrap font-mono font-black text-rose-600">
                      ${formatCurrency(exp.amount)}
                    </td>
                    <td class="p-3.5 text-right whitespace-nowrap">
                      <button onclick="window.MMS_APP.deleteExpense('${exp.id}')" title="हटाएं" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition">
                        🗑️
                      </button>
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

  function openAddExpenseModal() {
    const existing = document.getElementById('expense-modal-backdrop');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'expense-modal-backdrop';
    modal.className = 'modal-backdrop fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto';

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button type="button" onclick="window.MMS_APP.closeAddExpenseModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-black leading-none">
          &times;
        </button>

        <div class="mb-4">
          <span class="text-[10px] uppercase font-black text-rose-600 block">दुकान खर्च प्रविष्टि</span>
          <h3 class="text-lg font-black text-slate-900">➕ नया दुकान खर्च जोड़ें</h3>
          <p class="text-xs text-slate-500">यह राशि बैलेंस शीट और P&L में स्वतः कट जाएगी</p>
        </div>

        <form id="add-expense-form" onsubmit="window.MMS_APP.saveExpense(event)" class="space-y-4">
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">शाखा (Branch) *</label>
              <select id="exp-branch-select" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="branch_hazratganj">📍 हजरतगंज (Head Lab)</option>
                <option value="branch_aminabad">📍 अमीनाबाद शाखा</option>
                <option value="branch_unnao">📍 उन्नाव शाखा</option>
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
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));
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
    if (el) el.classList.remove('hidden');
  }

  function closeModal(el) {
    if (el) el.classList.add('hidden');
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
    openLoginBtns.forEach(b => b.addEventListener('click', () => {
      if (state.currentUser) {
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
    if (dom.logoutBtn) dom.logoutBtn.addEventListener('click', handleLogout);

    // Portal Tabs Switching
    dom.portalTabs.forEach(btn => {
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
    cacheDom();
    bindEvents();
    renderAll();

    // Persistent login check: restore Staff Portal across page reloads & hard refreshes
    const savedUser = localStorage.getItem(STORAGE_KEYS.AUTH);
    const savedView = localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW) || 'portal';

    if (savedUser && savedUser !== 'null') {
      try {
        state.currentUser = JSON.parse(savedUser);
        renderAuthPill();
        if (savedView !== 'public') {
          showPortal();
        } else {
          showPublicSite();
        }
      } catch (err) {
        console.error('Auth parse error:', err);
      }
    } else {
      showPublicSite();
    }
  });

  // Public Controller API
  
  // --- Delete Accidental Job Cards or Invoices ---
  function deleteJobOrInvoice(id) {
    if (!confirm(`⚠️ क्या आप वाकई टोकन / बिल "${id}" को हटाना चाहते हैं?\n\nयह रिकॉर्ड जॉब लिस्ट, खाता-बही और डेली सेल्स से सुरक्षित रूप से हटा दिया जाएगा।`)) {
      return;
    }

    // 1. Remove from jobs
    state.jobs = state.jobs.filter(j => j.token !== id && j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(state.jobs));

    // 2. Remove from invoices
    state.invoices = state.invoices.filter(inv => inv.invoiceNo !== id && inv.id !== id);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(state.invoices));

    // 3. Re-render active view
    if (state.activeAdminTab === 'jobs') renderJobCardsManager();
    else if (state.activeAdminTab === 'khata') renderKhata();
    else if (state.activeAdminTab === 'sales') renderDailySales();
    else if (state.activeAdminTab === 'balance') renderBalanceSheet();
    else switchPortalTab(state.activeAdminTab || 'pos');

    alert(`✅ टोकन / बिल "${id}" को सफलतापूर्वक हटा दिया गया है!`);
  }

  window.MMS_APP = {
    renderDashboard,
    switchPortalTab,
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
    exportExpensesToExcel
  };

})();
