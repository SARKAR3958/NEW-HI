import {
  CustomerUser,
  Vendor,
  VendorApplication,
  MarketplaceProduct,
  MarketplaceOrder,
  MarketplaceQuote,
  NotificationItem
} from './types';

// ==========================================
// 1. MOCK VENDORS (10+ vendors)
// ==========================================
export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'VND-001',
    companyName: 'Apex Hydraulics International',
    contactName: 'Marcus Vance',
    email: 'marcus@apexhydraulics.com',
    phone: '+1 (403) 555-0182',
    category: 'Hydraulic Pumps & Motors',
    status: 'ACTIVE',
    rating: 4.9,
    totalProducts: 14,
    totalOrders: 48,
    totalRevenue: 184500,
    joinedDate: '2025-03-12',
    country: 'Canada',
    city: 'Calgary, AB',
    verifiedBadges: ['ISO 9001', 'Verified OEM Partner', 'Top Supplier']
  },
  {
    id: 'VND-002',
    companyName: 'Titan Undercarriage Solutions Ltd.',
    contactName: 'Elena Rostova',
    email: 'elena@titanundercarriage.ca',
    phone: '+1 (780) 555-0199',
    category: 'Undercarriage Parts',
    status: 'ACTIVE',
    rating: 4.8,
    totalProducts: 18,
    totalOrders: 62,
    totalRevenue: 242000,
    joinedDate: '2025-01-20',
    country: 'Canada',
    city: 'Edmonton, AB',
    verifiedBadges: ['Heavy Forged Steel', 'Direct Importer']
  },
  {
    id: 'VND-003',
    companyName: 'Nordic Diesel Engine Works',
    contactName: 'Henrik Lindqvist',
    email: 'henrik@nordicdiesel.com',
    phone: '+1 (604) 555-0144',
    category: 'Engine Components',
    status: 'ACTIVE',
    rating: 4.9,
    totalProducts: 12,
    totalOrders: 35,
    totalRevenue: 132000,
    joinedDate: '2025-04-10',
    country: 'Canada',
    city: 'Vancouver, BC',
    verifiedBadges: ['Tier 4 Certified', 'Cummins Specialist']
  },
  {
    id: 'VND-004',
    companyName: 'Boreal Planetary Drives Corp.',
    contactName: 'Jean-Luc Caron',
    email: 'jeanluc@borealdrives.ca',
    phone: '+1 (514) 555-0122',
    category: 'Transmission & Final Drive',
    status: 'ACTIVE',
    rating: 4.7,
    totalProducts: 9,
    totalOrders: 28,
    totalRevenue: 118000,
    joinedDate: '2025-06-01',
    country: 'Canada',
    city: 'Montreal, QC',
    verifiedBadges: ['Planetary Specialist', 'Torque Bench Tested']
  },
  {
    id: 'VND-005',
    companyName: 'RockHard G.E.T. Wearparts',
    contactName: 'Travis Becker',
    email: 'travis@rockhardparts.com',
    phone: '+1 (306) 555-0177',
    category: 'Ground Engaging Tools (G.E.T.)',
    status: 'ACTIVE',
    rating: 4.8,
    totalProducts: 16,
    totalOrders: 54,
    totalRevenue: 98500,
    joinedDate: '2025-02-15',
    country: 'Canada',
    city: 'Saskatoon, SK',
    verifiedBadges: ['Abrasion Resistant', 'Mining Grade']
  },
  {
    id: 'VND-006',
    companyName: 'Frontier Cylinder Seals Inc.',
    contactName: 'Sarah Jenkins',
    email: 'sarah@frontierseals.com',
    phone: '+1 (204) 555-0163',
    category: 'Filters & Seals',
    status: 'ACTIVE',
    rating: 4.6,
    totalProducts: 11,
    totalOrders: 41,
    totalRevenue: 52400,
    joinedDate: '2025-05-18',
    country: 'Canada',
    city: 'Winnipeg, MB',
    verifiedBadges: ['Polyurethane Spec', 'Cold-Weather Rated']
  },
  {
    id: 'VND-007',
    companyName: 'Precision Slew Bearings Europe GmbH',
    contactName: 'Klaus Weidmann',
    email: 'klaus@precisionslew.de',
    phone: '+49 89 555 0192',
    category: 'Undercarriage Parts',
    status: 'ACTIVE',
    rating: 4.9,
    totalProducts: 7,
    totalOrders: 19,
    totalRevenue: 165000,
    joinedDate: '2025-07-22',
    country: 'Germany',
    city: 'Munich',
    verifiedBadges: ['Forged 42CrMo', 'European Spec']
  },
  {
    id: 'VND-008',
    companyName: 'Kompressor Valve Technology Co.',
    contactName: 'Hiroshi Tanaka',
    email: 'tanaka@kompressorvalve.jp',
    phone: '+81 3 5555 0188',
    category: 'Hydraulic Pumps & Motors',
    status: 'ACTIVE',
    rating: 4.9,
    totalProducts: 8,
    totalOrders: 22,
    totalRevenue: 89000,
    joinedDate: '2025-08-05',
    country: 'Japan',
    city: 'Nagoya',
    verifiedBadges: ['High Precision Spools', 'OEM Supplier']
  },
  {
    id: 'VND-009',
    companyName: 'Summit Ground Tools USA',
    contactName: 'Caleb Miller',
    email: 'caleb@summitgroundtools.com',
    phone: '+1 (303) 555-0155',
    category: 'Ground Engaging Tools (G.E.T.)',
    status: 'PENDING',
    rating: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    joinedDate: '2026-02-10',
    country: 'United States',
    city: 'Denver, CO',
    verifiedBadges: ['Application Pending']
  },
  {
    id: 'VND-010',
    companyName: 'Arctic Filtration Systems Ltd.',
    contactName: 'David MacLeod',
    email: 'david@arcticfiltration.ca',
    phone: '+1 (867) 555-0133',
    category: 'Filters & Seals',
    status: 'SUSPENDED',
    rating: 3.8,
    totalProducts: 4,
    totalOrders: 8,
    totalRevenue: 14200,
    joinedDate: '2024-11-10',
    country: 'Canada',
    city: 'Whitehorse, YT',
    verifiedBadges: ['Compliance Audit Pending']
  },
  {
    id: 'VND-011',
    companyName: 'IronClad Heavy Buckets & Attachments',
    contactName: 'Arthur Pendelton',
    email: 'arthur@ironcladbuckets.com',
    phone: '+1 (416) 555-0176',
    category: 'Buckets & Attachments',
    status: 'ACTIVE',
    rating: 4.8,
    totalProducts: 6,
    totalOrders: 16,
    totalRevenue: 76000,
    joinedDate: '2025-09-14',
    country: 'Canada',
    city: 'Hamilton, ON',
    verifiedBadges: ['Hardox 450 Steel', 'Custom Fabrication']
  }
];

// ==========================================
// 2. VENDOR APPLICATIONS (Various statuses)
// ==========================================
export const INITIAL_VENDOR_APPLICATIONS: VendorApplication[] = [
  {
    id: 'VND-APP-1001',
    submittedDate: '2026-03-24',
    status: 'PENDING',
    fullName: 'Robert Sterling',
    email: 'robert@sterlingheavymachinery.com',
    phone: '+1 (403) 555-0812',
    businessName: 'Sterling Heavy Machine Components',
    businessType: 'Corporation / Wholesale Importer',
    businessCategory: 'Hydraulic Pumps & Motors',
    businessDescription: 'Specialized importer of Japanese variable displacement piston pumps and swing motors for forestry and mining fleets.',
    yearsInBusiness: 8,
    website: 'https://sterlingheavymachinery.com',
    businessEmail: 'sales@sterlingheavymachinery.com',
    businessPhone: '+1 (403) 555-0800',
    country: 'Canada',
    state: 'Alberta',
    city: 'Red Deer',
    address: '4820 54th Avenue, Bay 4',
    postalCode: 'T4N 6V5',
    productCategories: ['Hydraulic Pumps & Motors', 'Transmission & Final Drive'],
    productCountEstimated: '50 - 150 items',
    brandsHandled: 'Komatsu, Kawasaki, Hitachi, Nabtesco',
    expectedMonthlyOrders: '20 - 40 freight shipments',
    documents: [
      { id: 'doc-1', name: 'Alberta_Articles_of_Incorporation.pdf', type: 'PDF', size: '2.4 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-2', name: 'CRA_Business_Tax_GST78912.pdf', type: 'PDF', size: '1.1 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-3', name: 'Directors_Government_ID.pdf', type: 'PDF', size: '3.8 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-4', name: 'Commercial_Warehouse_Lease.pdf', type: 'PDF', size: '4.2 MB', status: 'completed', uploadProgress: 100 }
    ],
    bankName: 'Royal Bank of Canada (RBC)',
    accountHolderName: 'Sterling Heavy Machine Components Ltd.',
    accountNumberMasked: '•••• •••• 8412',
    routingOrIban: '003-09412',
    taxId: 'GST-884102941-RT0001'
  },
  {
    id: 'VND-APP-1002',
    submittedDate: '2026-03-21',
    status: 'UNDER_REVIEW',
    adminNotes: 'Contacted bank to verify transit routing. Awaiting secondary review from risk officer.',
    fullName: 'Caleb Miller',
    email: 'caleb@summitgroundtools.com',
    phone: '+1 (303) 555-0155',
    businessName: 'Summit Ground Tools USA',
    businessType: 'LLC / Manufacturer Representative',
    businessCategory: 'Ground Engaging Tools (G.E.T.)',
    businessDescription: 'Distribution center supplying mining teeth, ripper shanks, and bucket cutting edges across the Rocky Mountain region.',
    yearsInBusiness: 5,
    website: 'https://summitgroundtools.com',
    businessEmail: 'supply@summitgroundtools.com',
    businessPhone: '+1 (303) 555-0150',
    country: 'United States',
    state: 'Colorado',
    city: 'Denver',
    address: '9200 East 40th Avenue',
    postalCode: '80238',
    productCategories: ['Ground Engaging Tools (G.E.T.)', 'Buckets & Attachments'],
    productCountEstimated: '150 - 300 items',
    brandsHandled: 'Caterpillar J-Series, Esco Super V, Hensley',
    expectedMonthlyOrders: '50+ bulk orders',
    documents: [
      { id: 'doc-10', name: 'Colorado_LLC_Registration.pdf', type: 'PDF', size: '1.8 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-11', name: 'EIN_IRS_Confirmation.pdf', type: 'PDF', size: '0.9 MB', status: 'completed', uploadProgress: 100 }
    ],
    bankName: 'JPMorgan Chase Bank',
    accountHolderName: 'Summit Ground Tools LLC',
    accountNumberMasked: '•••• •••• 9921',
    routingOrIban: '102001017',
    taxId: 'US-EIN-84-9182391'
  },
  {
    id: 'VND-APP-1003',
    submittedDate: '2026-03-15',
    status: 'CHANGES_REQUIRED',
    changesRequested: [
      'Document 2 (Tax ID certificate) is expired. Please upload current 2026 tax clearance.',
      'Provide valid proof of address dated within the last 90 days.'
    ],
    adminNotes: 'Business model looks good, but uploaded documentation needs to be refreshed.',
    fullName: 'Guillaume Fontaine',
    email: 'guillaume@quebecforgedchains.ca',
    phone: '+1 (418) 555-0193',
    businessName: 'Quebec Forged Chains & Rollers',
    businessType: 'Privately Held / Distribution',
    businessCategory: 'Undercarriage Parts',
    businessDescription: 'Wholesale track link assembly and polyurethane track pads for forestry excavators.',
    yearsInBusiness: 4,
    website: 'https://quebecforgedchains.ca',
    businessEmail: 'contact@quebecforgedchains.ca',
    businessPhone: '+1 (418) 555-0190',
    country: 'Canada',
    state: 'Quebec',
    city: 'Quebec City',
    address: '1400 Boulevard Charest Ouest',
    postalCode: 'G1N 2E5',
    productCategories: ['Undercarriage Parts'],
    productCountEstimated: '30 - 80 items',
    brandsHandled: 'ITR, Berco, VTrack',
    expectedMonthlyOrders: '15 - 30 shipments',
    documents: [
      { id: 'doc-20', name: 'NEQ_Registraire_Entreprises.pdf', type: 'PDF', size: '1.4 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-21', name: 'Tax_Doc_2023_EXPIRED.pdf', type: 'PDF', size: '0.8 MB', status: 'error', uploadProgress: 100 }
    ],
    bankName: 'Desjardins',
    accountHolderName: 'Quebec Forged Chains Inc.',
    accountNumberMasked: '•••• •••• 3041',
    routingOrIban: '815-09241',
    taxId: 'QC-NEQ-1184920412'
  },
  {
    id: 'VND-APP-1004',
    submittedDate: '2026-02-28',
    status: 'REJECTED',
    rejectionReason: 'Unable to verify commercial warehouse facility; submitted residential address with non-verifiable overseas supplier credentials.',
    adminNotes: 'Rejected on grounds of failed business physical facility inspection and unverified origin certificates.',
    fullName: 'Vikram Singh',
    email: 'vikram@speedypartsbroker.net',
    phone: '+1 (647) 555-0104',
    businessName: 'Speedy Parts Brokerage',
    businessType: 'Sole Proprietorship',
    businessCategory: 'Engine Components',
    businessDescription: 'Drop-shipping heavy engine overhaul kits from secondary brokers.',
    yearsInBusiness: 1,
    website: 'https://speedypartsbroker.net',
    businessEmail: 'info@speedypartsbroker.net',
    businessPhone: '+1 (647) 555-0100',
    country: 'Canada',
    state: 'Ontario',
    city: 'Brampton',
    address: '124 Sunforest Drive',
    postalCode: 'L6Z 2Z2',
    productCategories: ['Engine Components', 'Filters & Seals'],
    productCountEstimated: '10 - 20 items',
    brandsHandled: 'Generic aftermarket',
    expectedMonthlyOrders: '5 - 10 orders',
    documents: [
      { id: 'doc-30', name: 'Master_Business_License.pdf', type: 'PDF', size: '0.9 MB', status: 'completed', uploadProgress: 100 }
    ],
    bankName: 'TD Canada Trust',
    accountHolderName: 'Vikram Singh',
    accountNumberMasked: '•••• •••• 5519',
    routingOrIban: '004-12948',
    taxId: 'GST-910482914-RT0001'
  },
  {
    id: 'VND-APP-1005',
    submittedDate: '2026-01-15',
    status: 'APPROVED',
    adminNotes: 'Verified and approved. Credentials match Apex Hydraulics primary vendor portal account.',
    fullName: 'Marcus Vance',
    email: 'marcus@apexhydraulics.com',
    phone: '+1 (403) 555-0182',
    businessName: 'Apex Hydraulics International',
    businessType: 'Corporation / OEM Partner',
    businessCategory: 'Hydraulic Pumps & Motors',
    businessDescription: 'Official Western Canada hydraulic pump overhaul and dynamic testing center.',
    yearsInBusiness: 12,
    website: 'https://apexhydraulics.com',
    businessEmail: 'admin@apexhydraulics.com',
    businessPhone: '+1 (403) 555-0180',
    country: 'Canada',
    state: 'Alberta',
    city: 'Calgary',
    address: '6820 Barlow Trail SE',
    postalCode: 'T2C 2V4',
    productCategories: ['Hydraulic Pumps & Motors', 'Filters & Seals'],
    productCountEstimated: '200+ items',
    brandsHandled: 'Kawasaki, Rexroth, Parker, Eaton',
    expectedMonthlyOrders: '60+ freight shipments',
    documents: [
      { id: 'doc-40', name: 'Corporate_Registration_Certificate.pdf', type: 'PDF', size: '3.1 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-41', name: 'ISO_9001_Quality_Audit_2025.pdf', type: 'PDF', size: '4.5 MB', status: 'completed', uploadProgress: 100 },
      { id: 'doc-42', name: 'Commercial_Insurance_Policy.pdf', type: 'PDF', size: '2.8 MB', status: 'completed', uploadProgress: 100 }
    ],
    bankName: 'Bank of Montreal (BMO)',
    accountHolderName: 'Apex Hydraulics International Corp.',
    accountNumberMasked: '•••• •••• 1928',
    routingOrIban: '001-92841',
    taxId: 'GST-819284918-RT0001'
  }
];

// ==========================================
// 3. 30+ REALISTIC MARKETPLACE PRODUCTS
// (Showing Supplier Cost vs Selling Price, statuses)
// ==========================================
export const INITIAL_PRODUCTS: MarketplaceProduct[] = [
  // --- Approved Products with Selling Prices ---
  {
    id: 'mp-101',
    name: 'Heavy Duty Track Chain Assembly (49 Links)',
    category: 'Undercarriage Parts',
    subcategory: 'Track Chains & Links',
    sku: 'KOM-208-27-00120',
    brand: 'KOMATSU',
    description: 'Forged high-boron alloy steel track links, deep case induction hardened pins and bushings for extreme abrasion resistance in Canadian rock quarries.',
    specifications: 'Pitch: 203mm | Pin Diameter: 44.5mm | Bushing OD: 71.5mm | Link Height: 125mm',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    supplierCost: 1950, // vendor enters $1950
    sellingPrice: 2450, // admin sets $2450 (Margin: $500 / 20.4%)
    pricingType: 'FIXED',
    stock: 14,
    moq: 1,
    weight: '780 kg',
    dimensions: '220 x 80 x 60 cm',
    status: 'APPROVED',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    createdAt: '2025-08-10'
  },
  {
    id: 'mp-102',
    name: 'Main Hydraulic Pump Assembly (K3V112DT Tandem)',
    category: 'Hydraulic Pumps & Motors',
    subcategory: 'Axial Piston Pumps',
    sku: 'HYU-31N8-10010',
    brand: 'HYUNDAI',
    description: 'Variable displacement axial piston tandem pump configured for precise pressure response and high duty-cycles in severe northern excavation environments.',
    specifications: 'Displacement: 2x 112 cc/rev | Max Flow: 2x 222 L/min | Operating Pressure: 350 bar',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    supplierCost: 3200,
    sellingPrice: 4120, // Margin: $920 / 22.3%
    pricingType: 'FIXED',
    stock: 6,
    moq: 1,
    weight: '145 kg',
    dimensions: '88 x 46 x 42 cm',
    status: 'APPROVED',
    vendorId: 'VND-001',
    vendorName: 'Apex Hydraulics International',
    createdAt: '2025-08-15'
  },
  {
    id: 'mp-103',
    name: 'Fuel Injector Common Rail System (QSB6.7)',
    category: 'Engine Components',
    subcategory: 'Fuel Injection & Pumps',
    sku: 'CUM-4921517',
    brand: 'CUMMINS',
    description: 'Genuine OEM replacement electro-magnetic common rail fuel injector for low-emissions and maximum torque output in cold-start environments.',
    specifications: 'Max Pressure: 1800 Bar | Terminal: 2-pin | Flow Matched Set',
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=600&q=80',
    supplierCost: 510,
    sellingPrice: 680, // Margin: $170 / 25%
    pricingType: 'FIXED',
    stock: 32,
    moq: 1,
    weight: '1.2 kg',
    dimensions: '22 x 6 x 6 cm',
    status: 'APPROVED',
    vendorId: 'VND-003',
    vendorName: 'Nordic Diesel Engine Works',
    createdAt: '2025-09-02'
  },
  {
    id: 'mp-104',
    name: 'Final Drive Planetary Travel Motor Gearbox',
    category: 'Transmission & Final Drive',
    subcategory: 'Final Drives & Motors',
    sku: 'VOL-14532688',
    brand: 'VOLVO',
    description: 'Dual-reduction planetary gearbox matched with high-torque axial piston motor. Pre-filled with synthetic gear lubricant for immediate bolt-on installation.',
    specifications: 'Ratio: 52.8:1 | 2-Speed Automatic Displacement | Brake Torque: 42,000 Nm',
    imageUrl: 'https://images.unsplash.com/photo-1608613304899-ea8098577e38?auto=format&fit=crop&w=600&q=80',
    supplierCost: 2980,
    sellingPrice: 3850,
    pricingType: 'FIXED',
    stock: 4,
    moq: 1,
    weight: '320 kg',
    dimensions: '72 x 72 x 65 cm',
    status: 'APPROVED',
    vendorId: 'VND-004',
    vendorName: 'Boreal Planetary Drives Corp.',
    createdAt: '2025-09-12'
  },
  {
    id: 'mp-105',
    name: 'CAT J450 Rock Chisel Heavy Excavator Tooth & Adapter',
    category: 'Ground Engaging Tools (G.E.T.)',
    subcategory: 'Bucket Teeth & Adapters',
    sku: 'CAT-9W2452',
    brand: 'CATERPILLAR',
    description: 'High-alloy cast austempered ductile iron heavy rock chisel tip engineered for maximum penetration and impact absorption in frozen gravel.',
    specifications: 'Weight: 14.2 kg | Pin: 114-0458 | Retainer: 8E6359 | Hardness: 520 HBW',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
    supplierCost: 95,
    sellingPrice: 145,
    pricingType: 'FIXED',
    stock: 120,
    moq: 4,
    weight: '14.2 kg',
    dimensions: '34 x 14 x 16 cm',
    status: 'APPROVED',
    vendorId: 'VND-005',
    vendorName: 'RockHard G.E.T. Wearparts',
    createdAt: '2025-09-20'
  },
  {
    id: 'mp-106',
    name: 'Proportional Load-Sensing Hydraulic Control Valve Block',
    category: 'Hydraulic Pumps & Motors',
    subcategory: 'Valves & Manifolds',
    sku: 'REX-F900215091',
    brand: 'REXROTH',
    description: 'Post-compensated proportional directional valve block for ultra-smooth multi-actuator excavation cycles under simultaneous load.',
    specifications: 'Rated Flow: 160 L/min | Max Pressure: 380 bar | 24V DC Solenoid Coils',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80',
    supplierCost: 2200,
    sellingPrice: 2950,
    pricingType: 'FIXED',
    stock: 5,
    moq: 1,
    weight: '68 kg',
    dimensions: '58 x 38 x 32 cm',
    status: 'APPROVED',
    vendorId: 'VND-008',
    vendorName: 'Kompressor Valve Technology Co.',
    createdAt: '2025-10-04'
  },
  {
    id: 'mp-107',
    name: 'Severe Service Hydraulic Boom Cylinder Seal Kit',
    category: 'Filters & Seals',
    subcategory: 'Cylinder Seal Kits',
    sku: 'VOL-VOE14532688',
    brand: 'VOLVO',
    description: 'Four-stage polyurethane buffer and stepped rod seal group with double-acting PTFE piston rings for extreme sub-zero operation down to -45°C.',
    specifications: 'Rod Diameter: 110mm | Cylinder Bore: 160mm | Pressure Rating: 420 bar',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
    supplierCost: 290,
    sellingPrice: 420,
    pricingType: 'FIXED',
    stock: 28,
    moq: 1,
    weight: '3.4 kg',
    dimensions: '28 x 28 x 12 cm',
    status: 'APPROVED',
    vendorId: 'VND-006',
    vendorName: 'Frontier Cylinder Seals Inc.',
    createdAt: '2025-10-18'
  },

  // --- Quote-Based Products (Get a Quote / Inquire Pricing) ---
  {
    id: 'mp-108',
    name: 'Heavy Duty Track Tensioner Recoil Spring Group',
    category: 'Undercarriage Parts',
    subcategory: 'Tensioners & Springs',
    sku: 'JCB-921-52800',
    brand: 'JCB',
    description: 'Heavy duty alloy chrome-silicon recoil spring with grease cylinder housing to cushion severe shock loading on track frame guide rollers.',
    specifications: 'Spring OD: 185mm | Wire Diameter: 36mm | Free Length: 640mm | Spring Rate: 2800 N/mm',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
    supplierCost: 1100,
    sellingPrice: 0, // Admin configured as quote only
    pricingType: 'QUOTE',
    stock: 9,
    moq: 1,
    weight: '98 kg',
    dimensions: '75 x 24 x 24 cm',
    status: 'APPROVED',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    createdAt: '2025-11-01'
  },
  {
    id: 'mp-109',
    name: 'Double-Row Internal Tooth Slewing Ring Bearing (1420mm)',
    category: 'Undercarriage Parts',
    subcategory: 'Swing Bearings',
    sku: 'LIE-A924-400-1120',
    brand: 'LIEBHERR',
    description: 'Forged 42CrMo internal gear slewing ring induction hardened across tooth flanks with double lip synthetic seals and pre-drilled grease ports.',
    specifications: 'Outer Diameter: 1420mm | Pitch Circle: 1280mm | Teeth Count: 92 | Weight: 460 kg',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    supplierCost: 5200,
    sellingPrice: 0,
    pricingType: 'QUOTE',
    stock: 3,
    moq: 1,
    weight: '460 kg',
    dimensions: '150 x 150 x 25 cm',
    status: 'APPROVED',
    vendorId: 'VND-007',
    vendorName: 'Precision Slew Bearings Europe GmbH',
    createdAt: '2025-11-12'
  },
  {
    id: 'mp-110',
    name: 'D10T Mining Bulldozer Segment Group (Sprockets)',
    category: 'Undercarriage Parts',
    subcategory: 'Sprockets & Segments',
    sku: 'CAT-114-4427',
    brand: 'CATERPILLAR',
    description: 'Through-hardened tough cast segment group designed to bolt onto drive hub rims, sustaining continuous abrasive track friction in oilsands extraction.',
    specifications: '5 Segments per wheel | 27 Teeth Total | High Carbon Boron Steel',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80',
    supplierCost: 650,
    sellingPrice: 0,
    pricingType: 'QUOTE',
    stock: 12,
    moq: 5,
    weight: '142 kg',
    dimensions: '85 x 85 x 30 cm',
    status: 'APPROVED',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    createdAt: '2025-11-20'
  },
  {
    id: 'mp-111',
    name: 'Severe Duty Rock Excavator Bucket 2.2 m³ (Hardox 450)',
    category: 'Buckets & Attachments',
    subcategory: 'Excavator Buckets',
    sku: 'ICB-EX350-22',
    brand: 'CATERPILLAR',
    description: 'Reinforced heel shrouds, double-curved bottom plate, and pre-welded side cutters for heavy 35-40 ton crawler excavators.',
    specifications: 'Capacity: 2.2 m³ | Width: 1550mm | Cutting Edge: 50mm Hardox 500',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    supplierCost: 8900,
    sellingPrice: 0,
    pricingType: 'QUOTE',
    stock: 2,
    moq: 1,
    weight: '2150 kg',
    dimensions: '185 x 165 x 160 cm',
    status: 'APPROVED',
    vendorId: 'VND-011',
    vendorName: 'IronClad Heavy Buckets & Attachments',
    createdAt: '2025-12-05'
  },

  // --- Products in Pending Review (Submitted by Vendors) ---
  {
    id: 'mp-112',
    name: 'Kawasaki K3V140DT Hydraulic Tandem Piston Pump',
    category: 'Hydraulic Pumps & Motors',
    subcategory: 'Axial Piston Pumps',
    sku: 'KAW-K3V140DT-9N12',
    brand: 'KOMATSU',
    description: 'High pressure tandem pump with electro-proportional displacement regulators for 30-ton excavator fleets.',
    specifications: 'Displacement: 2x 140 cc | Pressure: 380 bar | Flow: 2x 280 L/min',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    supplierCost: 3800, // vendor submitted
    sellingPrice: 0, // Admin hasn't approved/priced yet
    pricingType: 'FIXED',
    stock: 4,
    moq: 1,
    weight: '168 kg',
    dimensions: '94 x 48 x 45 cm',
    status: 'PENDING_REVIEW',
    vendorId: 'VND-001',
    vendorName: 'Apex Hydraulics International',
    createdAt: '2026-03-22'
  },
  {
    id: 'mp-113',
    name: 'CAT 336D Excavator Upper Carrier Roller Assembly',
    category: 'Undercarriage Parts',
    subcategory: 'Carrier Rollers',
    sku: 'CAT-163-4143',
    brand: 'CATERPILLAR',
    description: 'Dual-cone metal face floating seal group with bronze bushings and high-grade 40Mn2 forged roller shells.',
    specifications: 'Flange Diameter: 210mm | Shaft: 60mm | Lifetime Lubricated',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    supplierCost: 180,
    sellingPrice: 0,
    pricingType: 'FIXED',
    stock: 45,
    moq: 2,
    weight: '34 kg',
    dimensions: '30 x 30 x 35 cm',
    status: 'PENDING_REVIEW',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    createdAt: '2026-03-25'
  },
  {
    id: 'mp-114',
    name: 'Liebherr R984C Mining Travel Motor Planetary Hub',
    category: 'Transmission & Final Drive',
    subcategory: 'Final Drives & Motors',
    sku: 'LIE-948190-FD',
    brand: 'LIEBHERR',
    description: 'Triple-stage heavy planetary reduction gear group for 120-ton mining excavators in aggressive pit operations.',
    specifications: 'Ratio: 78.4:1 | Torque Rating: 110,000 Nm | Weight: 980 kg',
    imageUrl: 'https://images.unsplash.com/photo-1608613304899-ea8098577e38?auto=format&fit=crop&w=600&q=80',
    supplierCost: 11500,
    sellingPrice: 0,
    pricingType: 'QUOTE',
    stock: 2,
    moq: 1,
    weight: '980 kg',
    dimensions: '110 x 110 x 95 cm',
    status: 'PENDING_REVIEW',
    vendorId: 'VND-004',
    vendorName: 'Boreal Planetary Drives Corp.',
    createdAt: '2026-03-26'
  },

  // --- Products in Changes Required / Rejected ---
  {
    id: 'mp-115',
    name: 'Universal Fuel Filter Water Separator Assembly',
    category: 'Filters & Seals',
    subcategory: 'Fuel Filtration',
    sku: 'FLT-FS19732-UNI',
    brand: 'CUMMINS',
    description: 'Dual bowl primary filter with 10-micron Stratapore media and electrical water sensor drain.',
    specifications: 'Thread: 1-14 UNS-2B | Flow: 380 LPH | Efficiency: 98.7% @ 10 um',
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=600&q=80',
    supplierCost: 85,
    sellingPrice: 0,
    pricingType: 'FIXED',
    stock: 80,
    moq: 6,
    weight: '1.8 kg',
    dimensions: '18 x 18 x 32 cm',
    status: 'CHANGES_REQUIRED',
    rejectionReason: 'Please attach verified micron efficiency test certificates and clarify OEM bowl compatibility.',
    adminNotes: 'Requested filtration test curve document.',
    vendorId: 'VND-006',
    vendorName: 'Frontier Cylinder Seals Inc.',
    createdAt: '2026-03-10'
  },
  {
    id: 'mp-116',
    name: 'Cast Iron Replacement Excavator Counterweight 4500kg',
    category: 'Buckets & Attachments',
    subcategory: 'Weights & Castings',
    sku: 'CW-4500-GEN',
    brand: 'HITACHI',
    description: 'Solid grey cast iron counterweight casting with lifting lugs.',
    specifications: 'Weight: 4500 kg | Material: Class 30 Grey Iron',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
    supplierCost: 3200,
    sellingPrice: 0,
    pricingType: 'QUOTE',
    stock: 1,
    moq: 1,
    weight: '4500 kg',
    dimensions: '220 x 140 x 90 cm',
    status: 'REJECTED',
    rejectionReason: 'Exceeds standard platform carrier logistics handling capabilities without prior flatbed rail charter.',
    adminNotes: 'Rejected due to out-of-gauge transport constraints.',
    vendorId: 'VND-011',
    vendorName: 'IronClad Heavy Buckets & Attachments',
    createdAt: '2026-02-18'
  },

  // --- Draft / Out of stock ---
  {
    id: 'mp-117',
    name: 'Komatsu PC400-8 Arm Cylinder Piston Assembly',
    category: 'Hydraulic Pumps & Motors',
    subcategory: 'Cylinder Components',
    sku: 'KOM-707-01-0A890',
    brand: 'KOMATSU',
    description: 'Forged chrome-moly piston head with bronze wear rings and integrated cushion seals.',
    specifications: 'Rod Fit: 120mm | Bore: 180mm | Material: 4140 Steel',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
    supplierCost: 780,
    sellingPrice: 0,
    pricingType: 'FIXED',
    stock: 0,
    moq: 1,
    weight: '42 kg',
    dimensions: '35 x 35 x 45 cm',
    status: 'OUT_OF_STOCK',
    vendorId: 'VND-001',
    vendorName: 'Apex Hydraulics International',
    createdAt: '2025-07-15'
  },
  {
    id: 'mp-118',
    name: 'Draft Proposal: High Pressure Swivel Joint Rotary Manifold',
    category: 'Hydraulic Pumps & Motors',
    subcategory: 'Swivel Joints',
    sku: 'DRAFT-SWIVEL-01',
    brand: 'JCB',
    description: 'Central hydraulic rotating joint for uninterrupted fluid power transfer to excavator undercarriage.',
    specifications: 'Ports: 6 High-Pressure + 2 Drain | 350 bar',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80',
    supplierCost: 1400,
    sellingPrice: 0,
    pricingType: 'FIXED',
    stock: 3,
    moq: 1,
    weight: '52 kg',
    dimensions: '42 x 42 x 60 cm',
    status: 'DRAFT',
    vendorId: 'VND-001',
    vendorName: 'Apex Hydraulics International',
    createdAt: '2026-03-27'
  }
];

// Add additional approved catalog items to hit 30+ products
const ADDITIONAL_CATALOG_NAMES = [
  { name: 'Excavator Track Shoe Triple Grouser (600mm)', cat: 'Undercarriage Parts', sub: 'Track Shoes', brand: 'KOMATSU', cost: 110, price: 165, sku: 'TS-600-KOM' },
  { name: 'Single Flange Track Roller Assembly (PC200)', cat: 'Undercarriage Parts', sub: 'Track Rollers', brand: 'KOMATSU', cost: 140, price: 210, sku: 'TR-200-SF' },
  { name: 'Double Flange Track Bottom Roller (CAT 320D)', cat: 'Undercarriage Parts', sub: 'Track Rollers', brand: 'CATERPILLAR', cost: 155, price: 235, sku: 'TR-320-DF' },
  { name: 'Front Idler Wheel Assembly with Tension Bracket', cat: 'Undercarriage Parts', sub: 'Idlers', brand: 'HITACHI', cost: 720, price: 980, sku: 'IDL-ZX200-FT' },
  { name: 'Hydraulic Swing Drive Motor (M5X130CHB)', cat: 'Hydraulic Pumps & Motors', sub: 'Swing Motors', brand: 'HYUNDAI', cost: 2400, price: 3150, sku: 'SWM-130-HYU' },
  { name: 'Pilot Control Joystick Valve (Hydraulic Pattern)', cat: 'Hydraulic Pumps & Motors', sub: 'Valves & Manifolds', brand: 'REXROTH', cost: 480, price: 690, sku: 'JOY-M4-024' },
  { name: 'Main Relief Valve Cartridge 350 Bar', cat: 'Hydraulic Pumps & Motors', sub: 'Valves & Manifolds', brand: 'PARKER', cost: 210, price: 310, sku: 'PRV-350-PKR' },
  { name: 'Exhaust Turbocharger Wastegated (Cummins ISX15)', cat: 'Engine Components', sub: 'Turbochargers', brand: 'CUMMINS', cost: 1350, price: 1850, sku: 'TRB-ISX15-CUM' },
  { name: 'Heavy Duty Water Pump Assembly (QSM11 Tier 3)', cat: 'Engine Components', sub: 'Cooling Systems', brand: 'CUMMINS', cost: 380, price: 540, sku: 'WP-QSM11-OEM' },
  { name: 'Engine Overhaul Gasket & Seal Master Kit', cat: 'Engine Components', sub: 'Gaskets & Seals', brand: 'VOLVO', cost: 620, price: 890, sku: 'GSK-D13-VLV' },
  { name: 'Starter Motor Heavy Duty 24V 7.5kW', cat: 'Electrical & Sensors', sub: 'Starters & Alternators', brand: 'KOMATSU', cost: 420, price: 590, sku: 'STR-24V-KOM' },
  { name: 'Brushless Alternator 24V 80A Sealed', cat: 'Electrical & Sensors', sub: 'Starters & Alternators', brand: 'CATERPILLAR', cost: 310, price: 460, sku: 'ALT-24V-CAT' },
  { name: 'High Temperature Exhaust Gas Sensor (EGT)', cat: 'Electrical & Sensors', sub: 'Sensors & Wiring', brand: 'VOLVO', cost: 140, price: 220, sku: 'SEN-EGT-014' },
  { name: 'Planetary Sun Gear 1st Stage Hardened', cat: 'Transmission & Final Drive', sub: 'Gears & Shafts', brand: 'VOLVO', cost: 320, price: 480, sku: 'SNG-VLV-EC240' }
];

ADDITIONAL_CATALOG_NAMES.forEach((item, index) => {
  INITIAL_PRODUCTS.push({
    id: `mp-ext-${index + 120}`,
    name: item.name,
    category: item.cat,
    subcategory: item.sub,
    sku: item.sku,
    brand: item.brand,
    description: `Heavy duty OEM specification ${item.name.toLowerCase()} engineered for severe mining, construction, and quarry service under North American conditions.`,
    specifications: 'OEM Form, Fit & Function Certified | Induction Hardened | ISO 9001 Compliant',
    imageUrl: index % 2 === 0 
      ? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    supplierCost: item.cost,
    sellingPrice: item.price,
    pricingType: 'FIXED',
    stock: 8 + (index * 2),
    moq: 1,
    weight: `${15 + (index * 4)} kg`,
    dimensions: '45 x 35 x 30 cm',
    status: 'APPROVED',
    vendorId: index % 2 === 0 ? 'VND-002' : 'VND-001',
    vendorName: index % 2 === 0 ? 'Titan Undercarriage Solutions Ltd.' : 'Apex Hydraulics International',
    createdAt: '2025-10-25'
  });
});

// ==========================================
// 4. 20+ MOCK CUSTOMERS
// ==========================================
export const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: 'CUST-001',
    name: 'Marc-André Fleury',
    email: 'fleury@earthworks.ca',
    phone: '+1 (431) 990-6055',
    company: 'Heavy Earthworks Inc.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    addresses: [
      { id: 'addr-1', type: 'SHIPPING', isDefault: true, street: '8400 Industrial Blvd', city: 'Winnipeg', state: 'MB', country: 'Canada', postalCode: 'R2C 2Z2' }
    ],
    wishlist: ['mp-101', 'mp-104'],
    createdAt: '2025-05-14',
    status: 'ACTIVE'
  },
  {
    id: 'CUST-002',
    name: 'Robert Tremblay',
    email: 'rtremblay@nordicquarry.qc.ca',
    phone: '+1 (418) 555-0912',
    company: 'Carrières Nordiques Ltée',
    addresses: [{ id: 'addr-2', type: 'SHIPPING', isDefault: true, street: '240 Route 138', city: 'Sept-Îles', state: 'QC', country: 'Canada', postalCode: 'G4R 1X1' }],
    wishlist: ['mp-105', 'mp-109'],
    createdAt: '2025-06-20',
    status: 'ACTIVE'
  },
  {
    id: 'CUST-003',
    name: 'Brenda Campbell',
    email: 'campbell@prairiecoal.ca',
    phone: '+1 (306) 555-0482',
    company: 'Prairie Coal & Aggregate',
    addresses: [{ id: 'addr-3', type: 'SHIPPING', isDefault: true, street: 'Box 412, Mine Access Rd', city: 'Estevan', state: 'SK', country: 'Canada', postalCode: 'S4A 2A4' }],
    wishlist: ['mp-110'],
    createdAt: '2025-07-02',
    status: 'ACTIVE'
  },
  {
    id: 'CUST-004',
    name: 'Gordon MacIntyre',
    email: 'gordon@pacificdrilling.bc.ca',
    phone: '+1 (250) 555-0199',
    company: 'Pacific Rock & Geotechnical',
    addresses: [{ id: 'addr-4', type: 'SHIPPING', isDefault: true, street: '1850 Old Island Hwy', city: 'Campbell River', state: 'BC', country: 'Canada', postalCode: 'V9W 2E9' }],
    wishlist: ['mp-102', 'mp-106'],
    createdAt: '2025-07-18',
    status: 'ACTIVE'
  },
  {
    id: 'CUST-005',
    name: 'Derrick O\'Connor',
    email: 'doconnor@atlanticearth.com',
    phone: '+1 (902) 555-0371',
    company: 'Atlantic Infrastructure Partners',
    addresses: [{ id: 'addr-5', type: 'SHIPPING', isDefault: true, street: '75 Akerley Blvd', city: 'Dartmouth', state: 'NS', country: 'Canada', postalCode: 'B3B 1R7' }],
    wishlist: ['mp-101'],
    createdAt: '2025-08-04',
    status: 'ACTIVE'
  }
];

// Add 15 more realistic commercial buyers
const EXTRA_BUYERS = [
  { name: 'Shane Kowalski', company: 'Syncrude Pit Contractors', email: 'shane@syncrudepit.ab.ca', city: 'Fort McMurray', state: 'AB' },
  { name: 'Martin Gagnon', company: 'Hydro-Québec Chantiers', email: 'mgagnon@chantiersgagnon.ca', city: 'Baie-Comeau', state: 'QC' },
  { name: 'Trevor Hildebrand', company: 'Red River Excavating Ltd.', email: 'trevor@redriverex.ca', city: 'Brandon', state: 'MB' },
  { name: 'Colin Stewart', company: 'Stewart Brothers Mining', email: 'colin@stewartmining.ca', city: 'Sudbury', state: 'ON' },
  { name: 'Nathaniel Roy', company: 'Laurentian Forest Heavy Fleet', email: 'nathan@laurentianfleet.ca', city: 'Mont-Laurier', state: 'QC' },
  { name: 'Bradley Vance', company: 'Trans-Canada Pipeline Earthmoving', email: 'bvance@transcanadapipeline.ca', city: 'Grande Prairie', state: 'AB' },
  { name: 'Lucas Hernandez', company: 'Andean Heavy Equipment SpA', email: 'lucas@andeanheavy.cl', city: 'Calama', state: 'Chile' },
  { name: 'Liam Gallagher', company: 'Thunder Bay Harbour Marine & Heavy', email: 'liam@tbharbour.ca', city: 'Thunder Bay', state: 'ON' },
  { name: 'Keith Armstrong', company: 'Okanagan Vineyard Terracing Co.', email: 'keith@okanaganheavy.ca', city: 'Kelowna', state: 'BC' },
  { name: 'Jason Miller', company: 'Rocky Mountain Pipeline Contracting', email: 'jmiller@rockymountainpipe.com', city: 'Casper', state: 'WY' },
  { name: 'Paul Desmarais', company: 'St. Lawrence Quarry Solutions', email: 'pdesmarais@stlawrencequarry.com', city: 'Cornwall', state: 'ON' },
  { name: 'Simon Fraser', company: 'Fraser Valley Gravel Works', email: 'sfraser@frasergravel.ca', city: 'Chilliwack', state: 'BC' },
  { name: 'Matthew Chen', company: 'Apex Pacific Marine Terminal', email: 'mchen@apexterminal.ca', city: 'Delta', state: 'BC' },
  { name: 'Warren Buffett Jr.', company: 'Midwest Heavy Earth & Rail', email: 'wbuffett@midwestrail.com', city: 'Omaha', state: 'NE' },
  { name: 'Alexei Ivanov', company: 'Klondike Placer Gold Dredging', email: 'alexei@klondikegold.yt.ca', city: 'Dawson City', state: 'YT' }
];

EXTRA_BUYERS.forEach((b, idx) => {
  INITIAL_CUSTOMERS.push({
    id: `CUST-${idx + 6 < 10 ? '00' : '0'}${idx + 6}`,
    name: b.name,
    email: b.email,
    phone: `+1 (555) 010-${1000 + idx}`,
    company: b.company,
    addresses: [
      { id: `addr-${idx + 10}`, type: 'SHIPPING', isDefault: true, street: '100 Industrial Parkway', city: b.city, state: b.state, country: 'Canada', postalCode: 'V0E 1B0' }
    ],
    wishlist: [],
    createdAt: `2025-08-${10 + (idx % 18)}`,
    status: 'ACTIVE'
  });
});

// ==========================================
// 5. 20+ MOCK ORDERS (Real Admin Margin & Supplier Cost)
// ==========================================
export const INITIAL_ORDERS: MarketplaceOrder[] = [
  {
    id: 'ORD-98412',
    customerId: 'CUST-001',
    customerName: 'Marc-André Fleury',
    customerEmail: 'fleury@earthworks.ca',
    customerPhone: '+1 (431) 990-6055',
    shippingAddress: '8400 Industrial Blvd, Winnipeg, MB, Canada R2C 2Z2',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    items: [
      {
        productId: 'mp-101',
        productName: 'Heavy Duty Track Chain Assembly (49 Links)',
        sku: 'KOM-208-27-00120',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
        vendorId: 'VND-002',
        vendorName: 'Titan Undercarriage Solutions Ltd.',
        quantity: 2,
        unitSupplierCost: 1950,
        unitPrice: 2450,
        subtotal: 4900
      }
    ],
    totalAmount: 4900,
    supplierCostTotal: 3900,
    margin: 1000,
    paymentStatus: 'PAID',
    vendorFulfillmentStatus: 'READY_FOR_DISPATCH',
    orderStatus: 'PROCESSING',
    createdAt: '2026-03-26',
    trackingNumber: 'CANPAR-84918239',
    timeline: [
      { stage: 'Order Placed', timestamp: '2026-03-26 09:14', note: 'Customer authorized Stripe payment ($4,900.00 CAD)' },
      { stage: 'Vendor Assigned', timestamp: '2026-03-26 09:30', note: 'Assigned to Titan Undercarriage Solutions Ltd.' },
      { stage: 'Processing', timestamp: '2026-03-26 14:00', note: 'Vendor pulled from Edmonton stock depot' },
      { stage: 'Ready for Dispatch', timestamp: '2026-03-27 10:15', note: 'Palletized on steel skid, awaiting freight carrier' }
    ]
  },
  {
    id: 'ORD-98390',
    customerId: 'CUST-002',
    customerName: 'Robert Tremblay',
    customerEmail: 'rtremblay@nordicquarry.qc.ca',
    customerPhone: '+1 (418) 555-0912',
    shippingAddress: '240 Route 138, Sept-Îles, QC, Canada G4R 1X1',
    vendorId: 'VND-001',
    vendorName: 'Apex Hydraulics International',
    items: [
      {
        productId: 'mp-102',
        productName: 'Main Hydraulic Pump Assembly (K3V112DT Tandem)',
        sku: 'HYU-31N8-10010',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        vendorId: 'VND-001',
        vendorName: 'Apex Hydraulics International',
        quantity: 1,
        unitSupplierCost: 3200,
        unitPrice: 4120,
        subtotal: 4120
      }
    ],
    totalAmount: 4120,
    supplierCostTotal: 3200,
    margin: 920,
    paymentStatus: 'PAID',
    vendorFulfillmentStatus: 'SHIPPED',
    orderStatus: 'DISPATCHED',
    createdAt: '2026-03-24',
    trackingNumber: 'MANITOULIN-9120419',
    timeline: [
      { stage: 'Order Placed', timestamp: '2026-03-24 11:20', note: 'Paid in full via corporate wire' },
      { stage: 'Vendor Assigned', timestamp: '2026-03-24 11:45', note: 'Sent to Apex Hydraulics' },
      { stage: 'Shipped', timestamp: '2026-03-25 16:30', note: 'Departed Calgary terminal en route to Sept-Îles' }
    ]
  },
  {
    id: 'ORD-98240',
    customerId: 'CUST-003',
    customerName: 'Brenda Campbell',
    customerEmail: 'campbell@prairiecoal.ca',
    customerPhone: '+1 (306) 555-0482',
    shippingAddress: 'Box 412, Mine Access Rd, Estevan, SK, S4A 2A4',
    vendorId: 'VND-005',
    vendorName: 'RockHard G.E.T. Wearparts',
    items: [
      {
        productId: 'mp-105',
        productName: 'CAT J450 Rock Chisel Heavy Tooth & Adapter',
        sku: 'CAT-9W2452',
        imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
        vendorId: 'VND-005',
        vendorName: 'RockHard G.E.T. Wearparts',
        quantity: 12,
        unitSupplierCost: 95,
        unitPrice: 145,
        subtotal: 1740
      }
    ],
    totalAmount: 1740,
    supplierCostTotal: 1140,
    margin: 600,
    paymentStatus: 'PAID',
    vendorFulfillmentStatus: 'COMPLETED',
    orderStatus: 'DELIVERED',
    createdAt: '2026-03-18',
    trackingNumber: 'PUROLATOR-3810482',
    timeline: [
      { stage: 'Order Placed', timestamp: '2026-03-18 08:30', note: 'Stripe charge verified' },
      { stage: 'Shipped', timestamp: '2026-03-19 10:00', note: 'Dispatched from Saskatoon warehouse' },
      { stage: 'Delivered', timestamp: '2026-03-21 14:15', note: 'Signed by receiving clerk B. Campbell' }
    ]
  },
  {
    id: 'ORD-98115',
    customerId: 'CUST-004',
    customerName: 'Gordon MacIntyre',
    customerEmail: 'gordon@pacificdrilling.bc.ca',
    customerPhone: '+1 (250) 555-0199',
    shippingAddress: '1850 Old Island Hwy, Campbell River, BC, V9W 2E9',
    vendorId: 'VND-003',
    vendorName: 'Nordic Diesel Engine Works',
    items: [
      {
        productId: 'mp-103',
        productName: 'Fuel Injector Common Rail System (QSB6.7)',
        sku: 'CUM-4921517',
        imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=600&q=80',
        vendorId: 'VND-003',
        vendorName: 'Nordic Diesel Engine Works',
        quantity: 6,
        unitSupplierCost: 510,
        unitPrice: 680,
        subtotal: 4080
      }
    ],
    totalAmount: 4080,
    supplierCostTotal: 3060,
    margin: 1020,
    paymentStatus: 'PAID',
    vendorFulfillmentStatus: 'PROCESSING',
    orderStatus: 'PROCESSING',
    createdAt: '2026-03-27',
    timeline: [
      { stage: 'Order Placed', timestamp: '2026-03-27 12:00', note: 'Customer ordered flow-matched 6-pack' },
      { stage: 'Processing', timestamp: '2026-03-27 14:30', note: 'Bench calibration in progress' }
    ]
  }
];

// Populate 16 more mock orders to satisfy the 20+ requirement
for (let i = 5; i <= 20; i++) {
  const customer = INITIAL_CUSTOMERS[i % INITIAL_CUSTOMERS.length];
  const vendor = INITIAL_VENDORS[i % 6];
  const cost = 800 + (i * 120);
  const price = Math.round(cost * 1.25);
  INITIAL_ORDERS.push({
    id: `ORD-980${i < 10 ? '0' : ''}${i}`,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    shippingAddress: `${customer.addresses[0]?.street}, ${customer.addresses[0]?.city}`,
    vendorId: vendor.id,
    vendorName: vendor.companyName,
    items: [
      {
        productId: `mp-${101 + (i % 6)}`,
        productName: INITIAL_PRODUCTS[i % 6].name,
        sku: INITIAL_PRODUCTS[i % 6].sku,
        imageUrl: INITIAL_PRODUCTS[i % 6].imageUrl,
        vendorId: vendor.id,
        vendorName: vendor.companyName,
        quantity: 1 + (i % 3),
        unitSupplierCost: cost,
        unitPrice: price,
        subtotal: price * (1 + (i % 3))
      }
    ],
    totalAmount: price * (1 + (i % 3)),
    supplierCostTotal: cost * (1 + (i % 3)),
    margin: (price - cost) * (1 + (i % 3)),
    paymentStatus: i % 7 === 0 ? 'PENDING' : 'PAID',
    vendorFulfillmentStatus: i % 3 === 0 ? 'COMPLETED' : i % 2 === 0 ? 'SHIPPED' : 'PROCESSING',
    orderStatus: i % 3 === 0 ? 'DELIVERED' : i % 2 === 0 ? 'DISPATCHED' : 'PROCESSING',
    createdAt: `2026-0${i % 3 + 1}-${10 + (i % 18)}`,
    timeline: [
      { stage: 'Order Placed', timestamp: `2026-0${i % 3 + 1}-${10 + (i % 18)} 10:00`, note: 'Order registered' }
    ]
  });
}

// ==========================================
// 6. 10+ MOCK QUOTE REQUESTS
// ==========================================
export const INITIAL_QUOTES: MarketplaceQuote[] = [
  {
    id: 'RFQ-7410',
    productId: 'mp-109',
    productName: 'Double-Row Internal Tooth Slewing Ring Bearing (1420mm)',
    productSku: 'LIE-A924-400-1120',
    productImg: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    vendorId: 'VND-007',
    vendorName: 'Precision Slew Bearings Europe GmbH',
    customerId: 'CUST-001',
    customerName: 'Marc-André Fleury',
    customerEmail: 'fleury@earthworks.ca',
    customerPhone: '+1 (431) 990-6055',
    company: 'Heavy Earthworks Inc.',
    quantity: 1,
    requirements: 'Needs to fit 2018 Liebherr R924 compact swing frame. Verify pitch diameter.',
    notes: 'Urgent machine down situation. Rush air freight quotation needed.',
    quotePrice: 6850,
    adminNotes: 'Negotiated $5,200 with Munich supplier Klaus. Quoted customer $6,850 with priority express handling.',
    status: 'QUOTE_SENT',
    createdAt: '2026-03-25',
    respondedAt: '2026-03-26',
    validUntil: '2026-04-10'
  },
  {
    id: 'RFQ-7402',
    productId: 'mp-108',
    productName: 'Heavy Duty Track Tensioner Recoil Spring Group',
    productSku: 'JCB-921-52800',
    productImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    customerId: 'CUST-003',
    customerName: 'Brenda Campbell',
    customerEmail: 'campbell@prairiecoal.ca',
    customerPhone: '+1 (306) 555-0482',
    company: 'Prairie Coal & Aggregate',
    quantity: 4,
    requirements: 'Complete grease piston barrel and chrome-silicon spring for JS220 excavators.',
    notes: 'Standard spring overhaul for summer maintenance shut.',
    quotePrice: 1480,
    adminNotes: 'Wholesale batch approved at $1,480/unit.',
    status: 'ACCEPTED',
    createdAt: '2026-03-22',
    respondedAt: '2026-03-23',
    validUntil: '2026-04-15'
  },
  {
    id: 'RFQ-7422',
    productId: 'mp-110',
    productName: 'D10T Mining Bulldozer Segment Group (Sprockets)',
    productSku: 'CAT-114-4427',
    productImg: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80',
    vendorId: 'VND-002',
    vendorName: 'Titan Undercarriage Solutions Ltd.',
    customerId: 'CUST-002',
    customerName: 'Robert Tremblay',
    customerEmail: 'rtremblay@nordicquarry.qc.ca',
    customerPhone: '+1 (418) 555-0912',
    company: 'Carrières Nordiques Ltée',
    quantity: 2,
    requirements: 'Confirm compatibility with heavy rock track shoes 28 inch.',
    notes: 'Please quote rail delivery to Sept-Îles freight spur.',
    status: 'PENDING',
    createdAt: '2026-03-27'
  },
  {
    id: 'RFQ-7390',
    productId: 'mp-111',
    productName: 'Severe Duty Rock Excavator Bucket 2.2 m³ (Hardox 450)',
    productSku: 'ICB-EX350-22',
    productImg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    vendorId: 'VND-011',
    vendorName: 'IronClad Heavy Buckets & Attachments',
    customerId: 'CUST-005',
    customerName: 'Derrick O\'Connor',
    customerEmail: 'doconnor@atlanticearth.com',
    customerPhone: '+1 (902) 555-0371',
    company: 'Atlantic Infrastructure Partners',
    quantity: 1,
    requirements: 'Includes side shrouds and CAT J460 tooth adapters pre-welded.',
    notes: 'Deliver to Halifax industrial port facility.',
    quotePrice: 11400,
    adminNotes: 'Includes freight surcharge for oversize flatbed load.',
    status: 'REVIEWING',
    createdAt: '2026-03-24'
  }
];

// Add more mock quotes to reach 10+
for (let i = 1; i <= 8; i++) {
  INITIAL_QUOTES.push({
    id: `RFQ-75${20 + i}`,
    productId: 'mp-108',
    productName: 'Heavy Machinery Specialized Hydraulic Component',
    productSku: `PART-SPEC-${900 + i}`,
    productImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    vendorId: 'VND-001',
    vendorName: 'Apex Hydraulics International',
    customerId: INITIAL_CUSTOMERS[i % INITIAL_CUSTOMERS.length].id,
    customerName: INITIAL_CUSTOMERS[i % INITIAL_CUSTOMERS.length].name,
    customerEmail: INITIAL_CUSTOMERS[i % INITIAL_CUSTOMERS.length].email,
    customerPhone: INITIAL_CUSTOMERS[i % INITIAL_CUSTOMERS.length].phone,
    company: INITIAL_CUSTOMERS[i % INITIAL_CUSTOMERS.length].company || 'Independent Fleet',
    quantity: 1 + (i % 2),
    requirements: 'Precision tolerance fitment for heavy duty continuous cycle.',
    notes: 'Please quote estimated delivery turnaround time.',
    status: i % 3 === 0 ? 'PENDING' : i % 2 === 0 ? 'QUOTE_SENT' : 'ACCEPTED',
    quotePrice: i % 3 === 0 ? undefined : 2400 + (i * 150),
    createdAt: `2026-03-${10 + (i % 15)}`
  });
}

// ==========================================
// 7. NOTIFICATIONS
// ==========================================
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    recipientRole: 'admin',
    title: 'New Vendor Application',
    message: 'Sterling Heavy Machine Components submitted their registration application for verification.',
    type: 'vendor',
    read: false,
    createdAt: '15 mins ago',
    link: 'applications'
  },
  {
    id: 'notif-2',
    recipientRole: 'admin',
    title: 'Product Pending Approval',
    message: 'Apex Hydraulics submitted "Kawasaki K3V140DT Hydraulic Tandem Piston Pump" for selling price review.',
    type: 'product',
    read: false,
    createdAt: '1 hour ago',
    link: 'product-approvals'
  },
  {
    id: 'notif-3',
    recipientRole: 'admin',
    title: 'New RFQ Received',
    message: 'Robert Tremblay requested a quote for D10T Mining Bulldozer Segment Group.',
    type: 'quote',
    read: true,
    createdAt: '3 hours ago',
    link: 'quote-requests'
  },
  {
    id: 'notif-4',
    recipientRole: 'vendor',
    recipientId: 'VND-001',
    title: 'Product Approved',
    message: 'Your product Main Hydraulic Pump Assembly (K3V112DT Tandem) has been approved by admin and is now live.',
    type: 'product',
    read: false,
    createdAt: '2 hours ago',
    link: 'products'
  },
  {
    id: 'notif-5',
    recipientRole: 'vendor',
    recipientId: 'VND-001',
    title: 'New Order Assigned',
    message: 'You have been assigned order ORD-98390 for Main Hydraulic Pump Assembly.',
    type: 'order',
    read: false,
    createdAt: 'Yesterday',
    link: 'orders'
  },
  {
    id: 'notif-6',
    recipientRole: 'customer',
    recipientId: 'CUST-001',
    title: 'Order Status Update',
    message: 'Your order ORD-98412 is Ready for Dispatch and will ship via Canpar Freight today.',
    type: 'order',
    read: false,
    createdAt: '30 mins ago',
    link: 'orders'
  },
  {
    id: 'notif-7',
    recipientRole: 'customer',
    recipientId: 'CUST-001',
    title: 'Quote Received',
    message: 'Admin has provided an official quotation for your Slewing Ring Bearing inquiry ($6,850 CAD).',
    type: 'quote',
    read: false,
    createdAt: 'Yesterday',
    link: 'quotes'
  }
];

// Demo Admin Credentials (clearly documented as requested)
export const DEMO_ADMIN = {
  email: 'admin@demo.com',
  password: 'Admin@123',
  name: 'Chief Marketplace Administrator',
  role: 'admin' as const
};
