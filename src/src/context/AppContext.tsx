import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StaffMember, Branch, JobCard, Invoice, InventoryItem, 
  Customer, Expense, AttendanceRecord, DutyAlert, Lang, ShopStatusMode, Role 
} from '../types';
import { 
  BRANCHES, INITIAL_STAFF, INITIAL_JOBS, INITIAL_INVOICES, 
  INITIAL_INVENTORY, INITIAL_CUSTOMERS, INITIAL_EXPENSES 
} from '../data/initialData';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof TRANSLATIONS.hi;
  currentUser: StaffMember | null;
  currentView: 'public' | 'portal';
  setCurrentView: (v: 'public' | 'portal') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeBranch: string;
  setActiveBranch: (b: string) => void;
  shopStatusMode: ShopStatusMode;
  setShopStatusMode: (m: ShopStatusMode) => void;
  isShopOpen: boolean;
  branches: Branch[];
  staff: StaffMember[];
  jobs: JobCard[];
  invoices: Invoice[];
  inventory: InventoryItem[];
  customers: Customer[];
  expenses: Expense[];
  attendance: AttendanceRecord[];
  dutyAlerts: DutyAlert[];
  isOwner: boolean;
  isManager: boolean;
  isEmployee: boolean;
  login: (phone: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  addJob: (job: Omit<JobCard, 'id'>) => JobCard;
  updateJobStatus: (jobId: string, status: JobCard['status']) => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Invoice;
  addAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryStock: (skuId: string, deltaQty: number) => void;
  markAlertsAsRead: () => void;
  purgeOldData: (months: number) => { deletedAttendance: number; deletedJobs: number };
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_PREFIX = 'mms_v62_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('hi');
  const [currentView, setCurrentView] = useState<'public' | 'portal'>('public');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeBranch, setActiveBranch] = useState<string>('all');
  const [shopStatusMode, setShopStatusMode] = useState<ShopStatusMode>('auto');

  const [currentUser, setCurrentUser] = useState<StaffMember | null>(null);
  const [branches] = useState<Branch[]>(BRANCHES);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [jobs, setJobs] = useState<JobCard[]>(INITIAL_JOBS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [dutyAlerts, setDutyAlerts] = useState<DutyAlert[]>([]);

  // Load initial state from LocalStorage safely on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedLang = localStorage.getItem(STORAGE_PREFIX + 'lang') as Lang;
      if (savedLang) setLangState(savedLang);

      const savedUser = localStorage.getItem(STORAGE_PREFIX + 'user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        setCurrentUser(u);
      }

      const savedJobs = localStorage.getItem(STORAGE_PREFIX + 'jobs');
      if (savedJobs) setJobs(JSON.parse(savedJobs));

      const savedInvoices = localStorage.getItem(STORAGE_PREFIX + 'invoices');
      if (savedInvoices) setInvoices(JSON.parse(savedInvoices));

      const savedInventory = localStorage.getItem(STORAGE_PREFIX + 'inventory');
      if (savedInventory) setInventory(JSON.parse(savedInventory));

      const savedAttendance = localStorage.getItem(STORAGE_PREFIX + 'attendance');
      if (savedAttendance) setAttendance(JSON.parse(savedAttendance));

      const savedExpenses = localStorage.getItem(STORAGE_PREFIX + 'expenses');
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'lang', l);
  };

  const role: Role = currentUser ? (currentUser.role || 'employee').toLowerCase() as Role : 'employee';
  const isOwner = role === 'admin';
  const isManager = role === 'manager';
  const isEmployee = !isOwner && !isManager;

  // Shop Open / Closed logic
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const autoOpen = currentMinutes >= (10 * 60) && currentMinutes <= (21 * 60); // 10:00 AM to 09:00 PM
  const isShopOpen = shopStatusMode === 'force_open' ? true : shopStatusMode === 'force_closed' ? false : autoOpen;

  const login = (phone: string, pass: string) => {
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    const cleanPass = pass.trim();

    const matched = staff.find(s => s.phone.replace(/[^0-9]/g, '') === cleanPhone && s.pass === cleanPass && s.active);
    if (matched) {
      setCurrentUser(matched);
      setCurrentView('portal');
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_PREFIX + 'user', JSON.stringify(matched));
      }
      return { success: true, message: 'लॉगइन सफल!' };
    }
    return { success: false, message: 'गलत मोबाइल नंबर या पासवर्ड! (उदा. 7905859701 / Mms@859701)' };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('public');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_PREFIX + 'user');
    }
  };

  const addJob = (jobData: Omit<JobCard, 'id'>) => {
    const newJob: JobCard = {
      ...jobData,
      id: 'job_' + Date.now()
    };
    const updated = [newJob, ...jobs];
    setJobs(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'jobs', JSON.stringify(updated));
    return newJob;
  };

  const updateJobStatus = (jobId: string, status: JobCard['status']) => {
    const updated = jobs.map(j => j.id === jobId ? { ...j, status } : j);
    setJobs(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'jobs', JSON.stringify(updated));
  };

  const addInvoice = (invData: Omit<Invoice, 'id'>) => {
    const newInv: Invoice = {
      ...invData,
      id: 'inv_' + Date.now()
    };
    const updated = [newInv, ...invoices];
    setInvoices(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'invoices', JSON.stringify(updated));
    return newInv;
  };

  const addAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRec: AttendanceRecord = {
      ...recordData,
      id: 'att_' + Date.now()
    };
    const updated = [newRec, ...attendance];
    setAttendance(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'attendance', JSON.stringify(updated));

    // Create Duty Alert for Admin
    if (newRec.distanceMeters > 10 || !newRec.verified) {
      const alert: DutyAlert = {
        id: 'alt_' + Date.now(),
        empId: newRec.empId,
        empName: newRec.empName,
        branchId: newRec.branchId,
        branchName: newRec.branchName,
        type: newRec.outTime && newRec.outTime !== '—' ? 'out' : 'in',
        time: newRec.inTime,
        date: newRec.date,
        distanceMeters: newRec.distanceMeters,
        isViolation: true,
        read: false
      };
      setDutyAlerts(prev => [alert, ...prev]);
    }
  };

  const addExpense = (expData: Omit<Expense, 'id'>) => {
    const newExp: Expense = {
      ...expData,
      id: 'exp_' + Date.now()
    };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'expenses', JSON.stringify(updated));
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: 'sku_' + Date.now()
    };
    const updated = [newItem, ...inventory];
    setInventory(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'inventory', JSON.stringify(updated));
  };

  const updateInventoryStock = (skuId: string, deltaQty: number) => {
    const updated = inventory.map(item => item.id === skuId ? { ...item, qty: Math.max(0, item.qty + deltaQty) } : item);
    setInventory(updated);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'inventory', JSON.stringify(updated));
  };

  const markAlertsAsRead = () => {
    setDutyAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const purgeOldData = (months: number) => {
    if (!isOwner) throw new Error('Unauthorized');
    const cutoffDate = new Date(Date.now() - months * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const keptAttendance = attendance.filter(a => a.date >= cutoffDate);
    const deletedAttendance = attendance.length - keptAttendance.length;
    setAttendance(keptAttendance);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'attendance', JSON.stringify(keptAttendance));

    const keptJobs = jobs.filter(j => j.date >= cutoffDate || j.status !== 'delivered');
    const deletedJobs = jobs.length - keptJobs.length;
    setJobs(keptJobs);
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_PREFIX + 'jobs', JSON.stringify(keptJobs));

    return { deletedAttendance, deletedJobs };
  };

  return (
    <AppContext.Provider value={{
      lang,
      setLang,
      t: TRANSLATIONS[lang],
      currentUser,
      currentView,
      setCurrentView,
      activeTab,
      setActiveTab,
      activeBranch,
      setActiveBranch,
      shopStatusMode,
      setShopStatusMode,
      isShopOpen,
      branches,
      staff,
      jobs,
      invoices,
      inventory,
      customers,
      expenses,
      attendance,
      dutyAlerts,
      isOwner,
      isManager,
      isEmployee,
      login,
      logout,
      addJob,
      updateJobStatus,
      addInvoice,
      addAttendance,
      addExpense,
      addInventoryItem,
      updateInventoryStock,
      markAlertsAsRead,
      purgeOldData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
