import { Branch, StaffMember, JobCard, Invoice, InventoryItem, Customer, Expense } from '../types';

export const BRANCHES: Branch[] = [
  {
    id: "branch_hazratganj",
    name: "हजरतगंज (मुख्य लैब, श्रीराम टॉवर)",
    shortName: "हजरतगंज लैब (श्रीराम टॉवर)",
    address: "216, 2nd Floor, Sree Rama Towers, Ashok Marg, Sadullah Nagar, Narhi, Hazratganj, Lucknow, UP 226001",
    landmark: "निकट हजरतगंज चौराहा, श्रीराम टावर सेकंड फ्लोर",
    timings: "12:00 PM - 09:00 PM (रोजाना खुला)",
    openTime: "12:00",
    closeTime: "21:00",
    phone: "7905859701",
    lat: 26.850138,
    lng: 80.948449,
    radiusMeters: 10,
    bannerUrl: "/images/branch_hazratganj_banner.jpg",
    mapsUrl: "https://maps.google.com/?q=26.850138,80.948449"
  },
  {
    id: "branch_naka",
    name: "नाका हिंडोला शाखा (लखनऊ)",
    shortName: "नाका हिंडोला (चारबाग)",
    address: "नाका हिंडोला मार्केट (निकट गुरुद्वारा व चारबाग स्टेशन रोड), लखनऊ, उत्तर प्रदेश 226004",
    landmark: "चारबाग रेलवे स्टेशन से मात्र 500 मीटर, गुरुद्वारा रोड",
    timings: "12:00 PM - 09:00 PM (रोजाना खुला)",
    openTime: "12:00",
    closeTime: "21:00",
    phone: "9988772211",
    lat: 26.8370,
    lng: 80.9241,
    radiusMeters: 10,
    bannerUrl: "/images/branch_naka_banner.jpg",
    mapsUrl: "https://maps.google.com/?q=26.8370,80.9241"
  },
  {
    id: "branch_kannauj",
    name: "कन्नौज शाखा (सरायमीरा)",
    shortName: "सरायमीरा शाखा (कन्नौज)",
    address: "2WHG+7HC, सरायमीरा (Saraimeera), जी.टी. रोड, कन्नौज, उत्तर प्रदेश 209727",
    landmark: "सरायमीरा चौराहा, मुख्य जी.टी. रोड कन्नौज",
    timings: "10:00 AM - 06:00 PM (सोमवार - शनिवार)",
    openTime: "10:00",
    closeTime: "18:00",
    phone: "9839988776",
    lat: 27.0283,
    lng: 79.926383,
    radiusMeters: 10,
    bannerUrl: "/images/branch_kannauj_banner.jpg",
    mapsUrl: "https://maps.google.com/?q=27.0283,79.926383"
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: "emp_101",
    name: "मोनू जी (Monu)",
    phone: "7905859701",
    pass: "Mms@859701",
    role: "admin",
    roleLabel: "सुपर एडमिन (Owner)",
    branchId: "all",
    branchName: "सभी शाखाएं (All Branches)",
    shiftHours: 10,
    shiftInTime: "12:00 PM",
    shiftOutTime: "09:00 PM",
    shiftInTime24: "12:00",
    shiftOutTime24: "21:00",
    allowedLeaves: 4,
    baseSalary: 45000,
    targetHours: 260,
    hourlyRate: 173.08,
    active: true,
    joinDate: "2024-01-01"
  },
  {
    id: "emp_102",
    name: "सूरज वर्मा (Suraj)",
    phone: "9988772211",
    pass: "Mms@772211",
    role: "manager",
    roleLabel: "ब्रांच मैनेजर (हजरतगंज)",
    branchId: "branch_hazratganj",
    branchName: "हजरतगंज लैब",
    shiftHours: 9,
    shiftInTime: "12:00 PM",
    shiftOutTime: "09:00 PM",
    shiftInTime24: "12:00",
    shiftOutTime24: "21:00",
    allowedLeaves: 4,
    baseSalary: 26000,
    targetHours: 234,
    hourlyRate: 111.11,
    active: true,
    joinDate: "2024-03-15"
  },
  {
    id: "emp_103",
    name: "रवि कुमार (Ravi)",
    phone: "9955443311",
    pass: "Mms@443311",
    role: "technician",
    roleLabel: "हजरतगंज स्टाफ (इंजीनियर)",
    branchId: "branch_hazratganj",
    branchName: "हजरतगंज लैब",
    shiftHours: 9,
    shiftInTime: "12:00 PM",
    shiftOutTime: "09:00 PM",
    shiftInTime24: "12:00",
    shiftOutTime24: "21:00",
    allowedLeaves: 2,
    baseSalary: 18000,
    targetHours: 252,
    hourlyRate: 71.43,
    active: true,
    joinDate: "2024-05-10"
  }
];

export const INITIAL_JOBS: JobCard[] = [
  {
    id: "job_1001",
    token: "MMS-1001",
    tokenNo: "MMS-1001",
    customerName: "राजेश वर्मा",
    customerPhone: "9876543210",
    brand: "Apple",
    model: "iPhone 13 OLED Display (OEM Premium)",
    problem: "डिस्प्ले क्रैक / टच काम नहीं कर रहा (Original Screen Replacement)",
    estCost: 4500,
    finalCost: 4500,
    paid: 2000,
    due: 2500,
    status: "in-progress",
    branchId: "branch_hazratganj",
    branchName: "हजरतगंज (मुख्य लैब, श्रीराम टॉवर)",
    assignedTo: "रवि कुमार (Hazratganj Lab Tech)",
    date: "2026-11-15",
    deliveryDate: "2026-11-15 05:00 PM",
    warranty: "90 दिन स्क्रीन वारंटी"
  },
  {
    id: "job_1002",
    token: "MMS-1002",
    tokenNo: "MMS-1002",
    customerName: "अमित कुमार",
    customerPhone: "9839012345",
    brand: "Samsung",
    model: "Galaxy S22 Ultra",
    problem: "चार्जिंग पोर्ट व मदरबोर्ड IC रिपेयर (Type-C Sub-board)",
    estCost: 2800,
    finalCost: 2800,
    paid: 2800,
    due: 0,
    status: "ready",
    branchId: "branch_naka",
    branchName: "नाका हिंडोला शाखा (लखनऊ)",
    assignedTo: "सूरज वर्मा (Store Manager)",
    date: "2026-11-15",
    deliveryDate: "2026-11-15 02:30 PM",
    warranty: "30 दिन टेस्टिंग वारंटी"
  },
  {
    id: "job_1003",
    token: "MMS-1003",
    tokenNo: "MMS-1003",
    customerName: "दिलीप कुमार",
    customerPhone: "9450987654",
    brand: "OnePlus",
    model: "OnePlus 11R 5G",
    problem: "ओरिजिनल बैटरी रिप्लेसमेंट & बैक ग्लास OCA लेमिनेशन",
    estCost: 2200,
    finalCost: 2200,
    paid: 2200,
    due: 0,
    status: "delivered",
    branchId: "branch_kannauj",
    branchName: "कन्नौज शाखा (सरायमीरा)",
    assignedTo: "सरायमीरा केयर टीम",
    date: "2026-11-14",
    deliveryDate: "2026-11-14 06:00 PM",
    warranty: "90 दिन एक्टिव वारंटी"
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "inv_205",
    billNo: "MMS-INV-205",
    invoiceNo: "MMS-INV-205",
    customerName: "अरविंद शुक्ला",
    customerPhone: "9723338321",
    branchId: "branch_hazratganj",
    branchName: "हजरतगंज (मुख्य लैब, श्रीराम टॉवर)",
    date: "2026-11-15",
    time: "12:15 PM",
    items: [
      { id: "i1", name: "iPhone 13 OLED Display Folder (OEM Premium)", qty: 1, rate: 4800, amount: 4800 }
    ],
    subtotal: 4800,
    gstRate: 0,
    gstAmount: 0,
    discount: 0,
    total: 4800,
    net: 4800,
    paid: 4800,
    due: 0,
    paymentMode: "upi",
    billedBy: "मोनू जी (Owner)"
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: "sku_101", sku: "DISP-IP13-OEM", name: "iPhone 13 OLED Display Folder (OEM Super Retina)", category: "screen", brand: "Apple", model: "iPhone 13", qty: 14, minQty: 4, costPrice: 3200, sellingPrice: 4800, branchId: "branch_hazratganj", branchName: "हजरतगंज लैब", locationRack: "Rack A-1" },
  { id: "sku_102", sku: "DISP-SAM-S22U", name: "Samsung Galaxy S22 Ultra AMOLED Display Assembly", category: "screen", brand: "Samsung", model: "Galaxy S22 Ultra", qty: 6, minQty: 2, costPrice: 6500, sellingPrice: 9500, branchId: "branch_hazratganj", branchName: "हजरतगंज लैब", locationRack: "Rack A-2" },
  { id: "sku_103", sku: "BATT-IP13-OEM", name: "iPhone 13 Original Battery Pack (3227 mAh with IC Tag)", category: "battery", brand: "Apple", model: "iPhone 13", qty: 22, minQty: 5, costPrice: 1100, sellingPrice: 2200, branchId: "branch_hazratganj", branchName: "हजरतगंज लैब", locationRack: "Rack B-1" },
  { id: "sku_104", sku: "PORT-SAM-S21", name: "Samsung S21/S22 Type-C Charging Sub-Board Flex", category: "charging", brand: "Samsung", model: "Galaxy S21/S22", qty: 18, minQty: 5, costPrice: 350, sellingPrice: 950, branchId: "branch_naka", branchName: "नाका हिंडोला", locationRack: "Rack C-1" },
  { id: "sku_105", sku: "IC-PMIC-QC888", name: "Snapdragon 888 Power Management IC (PM8350)", category: "motherboard", brand: "Universal", model: "Snapdragon 888 Devices", qty: 8, minQty: 3, costPrice: 850, sellingPrice: 2400, branchId: "branch_hazratganj", branchName: "हजरतगंज लैब", locationRack: "Micro IC Box 1" },
  { id: "sku_106", sku: "GLAS-OP11R-OCA", name: "OnePlus 11R Curved Front Glass with OCA Sheet", category: "glass", brand: "OnePlus", model: "OnePlus 11R", qty: 15, minQty: 4, costPrice: 280, sellingPrice: 1200, branchId: "branch_kannauj", branchName: "कन्नौज शाखा", locationRack: "Rack D-1" }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: "c_1", name: "अरविंद शुक्ला", phone: "9723338321", totalVisits: 3, totalSpend: 11200, pendingDue: 0, lastVisit: "2026-11-15", type: "retail" },
  { id: "c_2", name: "राजेश वर्मा", phone: "9876543210", totalVisits: 2, totalSpend: 6500, pendingDue: 2500, lastVisit: "2026-11-15", type: "retail" },
  { id: "c_3", name: "अमित कुमार", phone: "9839012345", totalVisits: 1, totalSpend: 2800, pendingDue: 0, lastVisit: "2026-11-15", type: "retail" },
  { id: "c_4", name: "दिलीप कुमार", phone: "9450987654", totalVisits: 4, totalSpend: 9800, pendingDue: 0, lastVisit: "2026-11-14", type: "retail" }
];

export const INITIAL_EXPENSES: Expense[] = [
  { id: "exp_1", title: "लैब चाय व नाश्ता", category: "tea_snack", amount: 160, date: "2026-11-15", branchId: "branch_hazratganj", branchName: "हजरतगंज लैब", paidBy: "सूरज वर्मा", paymentMode: "cash" },
  { id: "exp_2", title: "कूरियर डिलीवरी चार्ज (स्पेयर पार्सल)", category: "courier", amount: 240, date: "2026-11-15", branchId: "branch_naka", branchName: "नाका हिंडोला", paidBy: "सूरज वर्मा", paymentMode: "cash" }
];
