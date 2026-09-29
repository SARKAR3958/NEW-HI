export interface TradeCommodity {
  id: string;
  code: string;
  name: string;
  category: 'Agricultural' | 'Industrial Metals' | 'Energy & Lubricants' | 'Heavy Machinery Parts' | 'Raw Minerals';
  origin: string;
  grade: string;
  pricePerTon: number;
  priceUnit: string;
  minOrderQuantity: string;
  incotermsAvailable: string[];
  inStockQuantity: string;
  image: string;
  specs: { [key: string]: string };
  description: string;
  certifications: string[];
}

export interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  category: string;
}

export const TICKER_DATA: TickerItem[] = [
  { symbol: 'CAN-WHEAT-NO1', name: 'CWRS Hard Red Wheat', price: '$318.50 / MT', change: '+1.85%', isPositive: true, category: 'AGRI' },
  { symbol: 'CAN-CANOLA-PREM', name: 'Premium Canola Seed', price: '$642.10 / MT', change: '-0.42%', isPositive: false, category: 'AGRI' },
  { symbol: 'IND-STEEL-COIL', name: 'Hot Rolled Steel Coils', price: '$785.00 / MT', change: '+2.14%', isPositive: true, category: 'METALS' },
  { symbol: 'COPPER-CATHODE-A', name: 'LME Grade A Copper Cathode', price: '$9,240.00 / MT', change: '+0.95%', isPositive: true, category: 'METALS' },
  { symbol: 'HEAVY-UNDERCUT-PC300', name: 'Track Chain Assy (Komatsu)', price: '$2,450.00 / Set', change: 'STABLE', isPositive: true, category: 'PARTS' },
  { symbol: 'CRUDE-D2-DIESEL', name: 'Ultra Low Sulfur Diesel 10ppm', price: '$720.00 / MT', change: '+1.12%', isPositive: true, category: 'ENERGY' },
  { symbol: 'HYD-PUMP-K3V112', name: 'Hyundai Main Hydraulic Pump', price: '$4,120.00 / Unit', change: 'IN STOCK', isPositive: true, category: 'PARTS' },
  { symbol: 'POTASH-MOP-60', name: 'Muriate of Potash (60% K2O)', price: '$345.00 / MT', change: '-0.15%', isPositive: false, category: 'MINERALS' }
];

export const TRADE_COMMODITIES: TradeCommodity[] = [
  {
    id: 'cmd-101',
    code: 'CWRS-WHEAT-A1',
    name: 'Canadian Western Red Spring Wheat (CWRS)',
    category: 'Agricultural',
    origin: 'Saskatchewan & Alberta, Canada',
    grade: 'Grade No. 1 (13.5% Protein Min)',
    pricePerTon: 318.50,
    priceUnit: 'USD / Metric Ton',
    minOrderQuantity: '500 Metric Tons (Bulk Vessel / 20ft Containers)',
    incotermsAvailable: ['FOB Vancouver', 'CIF Rotterdam', 'CIF Dubai', 'CFR Qingdao'],
    inStockQuantity: '125,000 MT Ready for Loading',
    image: '/src/assets/images/commodity_agricultural_wheat_1790451802110.jpg',
    specs: {
      'Protein Content': '13.5% - 14.5%',
      'Moisture': '13.5% Max',
      'Falling Number': '350 seconds Min',
      'Test Weight': '79.0 kg/hl Min',
      'Foreign Matter': '0.5% Max'
    },
    description: 'Premium Canadian hard spring wheat renowned globally for superior milling quality, high loaf volume potential, and exceptional gluten strength.',
    certifications: ['Canadian Grain Commission (CGC)', 'SGS Weight & Quality', 'Phytosanitary Certificate', 'Non-GMO Verified']
  },
  {
    id: 'cmd-102',
    code: 'STEEL-HRC-355',
    name: 'Structural Hot Rolled Steel Coils (S355JR)',
    category: 'Industrial Metals',
    origin: 'Ontario Steel Mills & Global Exchange Warehouse',
    grade: 'EN 10025-2 / ASTM A1011',
    pricePerTon: 785.00,
    priceUnit: 'USD / Metric Ton',
    minOrderQuantity: '100 Metric Tons',
    incotermsAvailable: ['FOB Montreal', 'CIF Antwerp', 'FOB Hamilton'],
    inStockQuantity: '42,000 MT Available',
    image: '/src/assets/images/commodity_industrial_metals_1790451817168.jpg',
    specs: {
      'Coil Thickness': '2.0mm - 16.0mm',
      'Coil Width': '1250mm / 1500mm',
      'Tensile Strength': '470 - 630 MPa',
      'Yield Strength': '355 MPa Min',
      'Coil Weight': '18 - 28 MT per coil'
    },
    description: 'Heavy duty hot rolled steel coils engineered for construction, machinery manufacturing, heavy equipment frames, and pipe manufacturing.',
    certifications: ['Mill Test Certificate 3.1 (EN 10204)', 'ISO 9001:2015', 'CE Certified']
  },
  {
    id: 'cmd-103',
    code: 'PARTS-TC-KM300',
    name: 'Heavy Duty Track Chain Group (Komatsu PC300/350)',
    category: 'Heavy Machinery Parts',
    origin: 'Hammer Industrial OEM Logistics Depot, Manitoba',
    grade: 'Induction Hardened Forged Alloy Steel',
    pricePerTon: 2450.00,
    priceUnit: 'USD / Complete Track Link Set',
    minOrderQuantity: '2 Sets (L&R)',
    incotermsAvailable: ['EXW Winnipeg', 'FOB Montreal', 'DDP Global Depot'],
    inStockQuantity: '180 Sets in Canadian Hub',
    image: '/src/assets/images/commodity_industrial_metals_1790451817168.jpg',
    specs: {
      'Links per Side': '49 Links',
      'Pitch Size': '203.2 mm',
      'Pin Hardness': 'HRC 55-60',
      'Bush Hardness': 'HRC 52-58',
      'Warranty': '3,000 Operating Hours'
    },
    description: 'Forged alloy steel track link assembly with deep induction hardening for extreme abrasion resistance in quarrying, mining, and civil earthmoving.',
    certifications: ['Hammer OEM Quality Standard', 'ISO 9001:2018 Manufacturing Integrity']
  },
  {
    id: 'cmd-104',
    code: 'FUEL-ULSD-10PPM',
    name: 'Ultra Low Sulfur Diesel Fuel (EN590 10PPM)',
    category: 'Energy & Lubricants',
    origin: 'Canadian Refinery Depot & Storage Terminal',
    grade: 'Euro 5 / EN590 10 PPM',
    pricePerTon: 720.00,
    priceUnit: 'USD / Metric Ton',
    minOrderQuantity: '10,000 Metric Tons',
    incotermsAvailable: ['FOB Halifax', 'CIF Rotterdam', 'FCA Alberta Terminal'],
    inStockQuantity: '250,000 MT Allocation',
    image: '/src/assets/images/commodity_energy_oil_1790451834992.jpg',
    specs: {
      'Sulfur Content': '8.2 mg/kg (10 PPM Max)',
      'Density @ 15°C': '0.832 g/ml',
      'Flash Point': '66°C Min',
      'Cetane Index': '52.4 Min',
      'Viscosity @ 40°C': '2.8 mm²/s'
    },
    description: 'Refined ultra-clean diesel fuel designed for heavy duty off-highway mining fleets, locomotive haulage, and marine power engines.',
    certifications: ['SGS Quality Inspection Certificate', 'Certificate of Origin', 'Refinery Lab COA']
  },
  {
    id: 'cmd-105',
    code: 'COPPER-CATHODE-LME',
    name: 'Grade A Electrolytic Copper Cathodes (99.99%)',
    category: 'Industrial Metals',
    origin: 'Canadian Smelter & Bonded Exchange Depots',
    grade: 'LME Grade A / BS EN 1978:1998',
    pricePerTon: 9240.00,
    priceUnit: 'USD / Metric Ton',
    minOrderQuantity: '25 Metric Tons (1 Container Load)',
    incotermsAvailable: ['FOB Vancouver', 'CIF Shanghai', 'CIF Hamburg'],
    inStockQuantity: '1,200 MT Bonded Stock',
    image: '/src/assets/images/commodity_industrial_metals_1790451817168.jpg',
    specs: {
      'Purity': '99.99% Cu Min',
      'Dimensions': '914mm x 914mm x 12mm',
      'Weight per Sheet': '125 kg ± 5%',
      'Impurities': '< 0.0015% Total'
    },
    description: 'High purity copper cathodes manufactured through electrolytic refining. Essential raw input for power transmission cabling, electric vehicles, and transformer windings.',
    certifications: ['LME Registered Producer COA', 'SGS Assay Report', 'Tamper-Evident Container Seal']
  },
  {
    id: 'cmd-106',
    code: 'PARTS-HYD-PUMP-K3V',
    name: 'K3V112DT Main Hydraulic Tandem Pump Assembly',
    category: 'Heavy Machinery Parts',
    origin: 'Hyundai / Kawasaki Authorized Distribution Depot',
    grade: 'Genuine OEM Replacement Grade',
    pricePerTon: 4120.00,
    priceUnit: 'USD / Unit',
    minOrderQuantity: '1 Unit',
    incotermsAvailable: ['EXW Winnipeg', 'DDP Worldwide Courier', 'FOB Vancouver'],
    inStockQuantity: '45 Units Ready to Ship',
    image: '/src/assets/images/commodity_industrial_metals_1790451817168.jpg',
    specs: {
      'Max Displacement': '112 cc/rev x 2',
      'Operating Pressure': '350 Bar Max',
      'Compatible Machines': 'Hyundai R210LC-7, R220LC-9, Doosan DX225',
      'Weight': '135 kg'
    },
    description: 'High pressure dual axial piston pump for heavy excavator main hydraulics, providing fast multi-function control and high fuel efficiency under heavy breakout force.',
    certifications: ['OEM Factory Test Bench Sheet', '1-Year Unlimited Hour Warranty']
  }
];

export const LOGISTICS_DESTINATIONS = [
  { city: 'Rotterdam', country: 'Netherlands', port: 'Port of Rotterdam', transitDays: '12-14 Days', estCostPerTon: '$38 - $48 USD' },
  { city: 'Dubai (Jebel Ali)', country: 'United Arab Emirates', port: 'Jebel Ali Port', transitDays: '18-22 Days', estCostPerTon: '$52 - $65 USD' },
  { city: 'Hamburg', country: 'Germany', port: 'Port of Hamburg', transitDays: '14-16 Days', estCostPerTon: '$42 - $52 USD' },
  { city: 'Qingdao', country: 'China', port: 'Port of Qingdao', transitDays: '16-19 Days', estCostPerTon: '$35 - $45 USD' },
  { city: 'Singapore', country: 'Singapore', port: 'Port of Singapore', transitDays: '18-21 Days', estCostPerTon: '$40 - $50 USD' },
  { city: 'Antwerp', country: 'Belgium', port: 'Port of Antwerp', transitDays: '13-15 Days', estCostPerTon: '$40 - $50 USD' }
];
