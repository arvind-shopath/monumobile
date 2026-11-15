export type Role = 'admin' | 'manager' | 'technician' | 'employee';
export type Lang = 'hi' | 'en';
export type ShopStatusMode = 'auto' | 'force_open' | 'force_closed';
export type JobStatus = 'received' | 'in-progress' | 'ready' | 'delivered';

export interface Branch {
  id: string;
  name: string;
  shortName: string;
  address: string;
  landmark: string;
  timings: string;
  openTime: string; // "12:00" or "10:00"
  closeTime: string; // "21:00" or "18:00"
  phone: string;
  lat: number;
  lng: number;
  radiusMeters: number; // 10
  bannerUrl: string;
  mapsUrl: string;
}

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  pass: string;
  role: Role;
  roleLabel: string;
  branchId: string;
  branchName: string;
  shiftHours: number;
  shiftInTime: string;
  shiftOutTime: string;
  shiftInTime24: string;
  shiftOutTime24: string;
  allowedLeaves: number;
  baseSalary: number;
  targetHours: number;
  hourlyRate: number;
  active: boolean;
  joinDate: string;
  photo?: string;
}

export interface AttendanceRecord {
  id: string;
  empId: string;
  empName: string;
  branchId: string;
  branchName: string;
  date: string; // YYYY-MM-DD
  inTime: string;
  outTime: string;
  hours: number;
  photo: string;
  coords: {
    lat: number;
    lng: number;
    accuracy?: number;
  };
  distanceMeters: number;
  verified: boolean;
  notes?: string;
  late?: boolean;
}

export interface JobCard {
  id: string;
  token: string;
  tokenNo: string;
  customerName: string;
  customerPhone: string;
  brand: string;
  model: string;
  problem: string;
  estCost: number;
  finalCost: number;
  paid: number;
  due: number;
  status: JobStatus;
  branchId: string;
  branchName: string;
  assignedTo?: string;
  date: string;
  deliveryDate?: string;
  warranty?: string;
  deviceCondition?: string[];
  patternPin?: string;
}

export interface InvoiceItem {
  id: string;
  name: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  billNo: string;
  invoiceNo?: string;
  customerName: string;
  customerPhone: string;
  branchId: string;
  branchName: string;
  date: string;
  time: string;
  items: InvoiceItem[];
  subtotal: number;
  gstRate: number; // 18 or 0
  gstAmount: number;
  discount: number;
  total: number;
  net?: number;
  paid: number;
  due: number;
  paymentMode: 'cash' | 'upi' | 'card' | 'khata';
  billedBy: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'screen' | 'battery' | 'charging' | 'motherboard' | 'glass' | 'accessories' | 'tools';
  brand: string;
  model: string;
  qty: number;
  minQty: number;
  costPrice: number;
  sellingPrice: number;
  branchId: string;
  branchName: string;
  locationRack?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  branchId?: string;
  totalVisits: number;
  totalSpend: number;
  pendingDue: number;
  lastVisit: string;
  type: 'retail' | 'dealer' | 'corporate';
}

export interface Expense {
  id: string;
  title: string;
  category: 'tea_snack' | 'electricity' | 'rent' | 'courier' | 'tools' | 'salary_advance' | 'misc';
  amount: number;
  date: string;
  branchId: string;
  branchName: string;
  paidBy: string;
  paymentMode: 'cash' | 'upi';
  notes?: string;
}

export interface DutyAlert {
  id: string;
  empId: string;
  empName: string;
  branchId: string;
  branchName: string;
  type: 'in' | 'out';
  time: string;
  date: string;
  distanceMeters: number;
  isViolation: boolean;
  read: boolean;
}
