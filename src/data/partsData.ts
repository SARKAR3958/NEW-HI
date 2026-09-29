export interface PartItem {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  brand: string;
  machineModel: string;
  inStock: boolean;
  priceEstimate: string;
  description: string;
  specifications: string;
  imageUrl: string;
}

export const BRANDS_LIST = [
  { name: 'HYUNDAI', logoText: 'HYUNDAI', subtitle: 'ENGINEERING & CONSTRUCTION' },
  { name: 'LIEBHERR', logoText: 'LIEBHERR', subtitle: 'EARTHMOVING & MINING' },
  { name: 'PARKER', logoText: 'Parker', subtitle: 'HYDRAULIC SYSTEMS' },
  { name: 'JCB', logoText: 'JCB', subtitle: 'CONSTRUCTION EQUIPMENT' },
  { name: 'KOMATSU', logoText: 'KOMATSU', subtitle: 'HEAVY MACHINERY' },
  { name: 'SANDVIK', logoText: 'SANDVIK', subtitle: 'MINING & ROCK' },
  { name: 'REXROTH', logoText: 'Rexroth', subtitle: 'Bosch Group' },
  { name: 'CUMMINS', logoText: 'Cummins', subtitle: 'DIESEL ENGINES' },
  { name: 'CATERPILLAR', logoText: 'CAT', subtitle: 'BUILDING & INDUSTRIAL' },
  { name: 'VOLVO', logoText: 'VOLVO', subtitle: 'CONSTRUCTION EQUIPMENT' },
  { name: 'HITACHI', logoText: 'HITACHI', subtitle: 'EXCAVATOR PARTS' },
  { name: 'DOOSAN', logoText: 'DOOSAN', subtitle: 'INFRASTRUCTURE POWER' }
];

export const CATEGORIES_LIST = [
  'Undercarriage Parts',
  'Hydraulic Pumps & Motors',
  'Engine Components',
  'Transmission & Final Drive',
  'Buckets & Attachments',
  'Ground Engaging Tools (G.E.T.)',
  'Filters & Seals',
  'Electrical & Sensors'
];

export const MACHINERY_TYPES = [
  { name: 'Bulldozers', icon: 'bulldozer', desc: 'Crawler tractors, blades, tracks, and rippers' },
  { name: 'Excavators', icon: 'excavator', desc: 'Mini, medium, and heavy crawler excavators' },
  { name: 'Forklifts', icon: 'forklift', desc: 'Rough terrain and industrial heavy lift trucks' },
  { name: 'Crawler Cranes', icon: 'crane', desc: 'Lattice and telescopic boom crawler cranes' },
  { name: 'Dump Trucks', icon: 'dumptruck', desc: 'Rigid and articulated haulers' },
  { name: 'Wheel Loaders', icon: 'loader', desc: 'Compact and large quarry wheel loaders' }
];

export const SAMPLE_PARTS: PartItem[] = [
  {
    id: 'p-101',
    partNumber: '208-27-00120',
    name: 'Heavy Duty Track Chain Assembly (49 Links)',
    category: 'Undercarriage Parts',
    brand: 'KOMATSU',
    machineModel: 'Komatsu PC300-7 / PC350-8',
    inStock: true,
    priceEstimate: '$2,450.00 CAD',
    description: 'Forged alloy steel track links, induction hardened pins and bushings for extreme abrasion resistance in Canadian rock and quarry applications.',
    specifications: 'Pitch: 203mm, Pin Diameter: 44.5mm, Link Height: 125mm',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-102',
    partNumber: '31N8-10010',
    name: 'Main Hydraulic Pump Assembly (K3V112DT)',
    category: 'Hydraulic Pumps & Motors',
    brand: 'HYUNDAI',
    machineModel: 'Hyundai R210LC-7 / R220LC-9',
    inStock: true,
    priceEstimate: '$4,120.00 CAD',
    description: 'Variable displacement axial piston tandem pump configured for precise pressure response in harsh northern climates.',
    specifications: 'Flow rate: 2x 222 L/min, Max Pressure: 350 bar',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-103',
    partNumber: '4921517',
    name: 'Fuel Injector Common Rail (QSB6.7 / QSC8.3)',
    category: 'Engine Components',
    brand: 'CUMMINS',
    machineModel: 'Cummins QSB6.7 Tier 3 / Tier 4',
    inStock: true,
    priceEstimate: '$680.00 CAD',
    description: 'Genuine OEM replacement electro-magnetic fuel injector for clean combustion and optimal horsepower retention in cold start environments.',
    specifications: 'System Pressure: 1800 Bar, Terminal Pins: 2-pin',
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-104',
    partNumber: '921/52800',
    name: 'Track Tensioner Recoil Spring Group',
    category: 'Undercarriage Parts',
    brand: 'JCB',
    machineModel: 'JCB JS220 / JS240',
    inStock: true,
    priceEstimate: 'Inquire for Quote', // Removed numerical price to test QUOTA tab
    description: 'Heavy duty chrome-silicon spring with grease cylinder assembly to absorb shock loads and safeguard track frames.',
    specifications: 'Spring OD: 185mm, Overall Length: 640mm',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-105',
    partNumber: '14532688',
    name: 'Final Drive Travel Motor Gearbox',
    category: 'Transmission & Final Drive',
    brand: 'VOLVO',
    machineModel: 'Volvo EC210B / EC240B',
    inStock: true,
    priceEstimate: '$3,850.00 CAD',
    description: 'Complete planetary gear drive with high-torque hydraulic travel motor pre-filled with oil for turn-key bolt-on installation.',
    specifications: '2-Speed Automatic Shift, Ratio: 52.8:1',
    imageUrl: 'https://images.unsplash.com/photo-1608613304899-ea8098577e38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-106',
    partNumber: '9W2452',
    name: 'CAT J450 Rock Chisel Bucket Tooth & Adapter',
    category: 'Ground Engaging Tools (G.E.T.)',
    brand: 'CATERPILLAR',
    machineModel: 'CAT 330D / 336D Excavator',
    inStock: true,
    priceEstimate: '$145.00 CAD',
    description: 'Cast high-spec austempered ductile iron GET tooth engineered for heavy rock penetration and long wear life.',
    specifications: 'Weight: 14.2 kg, Pin: 114-0458, Retainer: 8E6359',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-107',
    partNumber: 'A924-400-1120',
    name: 'Swing Bearing Slewing Ring Gear',
    category: 'Undercarriage Parts',
    brand: 'LIEBHERR',
    machineModel: 'Liebherr R924 / R934',
    inStock: true,
    priceEstimate: 'Contact for Pricing', // Removed numerical price to test QUOTA tab
    description: 'Internal tooth slewing bearing forged from 42CrMo steel, induction hardened tooth flanks with dual rubber seals.',
    specifications: 'Outer Diameter: 1420mm, Teeth Count: 92',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-108',
    partNumber: 'F900215091',
    name: 'Proportional Hydraulic Control Valve Block',
    category: 'Hydraulic Pumps & Motors',
    brand: 'REXROTH',
    machineModel: 'Rexroth M4-12 Series',
    inStock: true,
    priceEstimate: '$2,950.00 CAD',
    description: 'Load-sensing directional valve manifold block for precise excavator boom, arm, and bucket control under load.',
    specifications: 'Max Flow: 160 L/min, 24V Solenoid Spools',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-109',
    partNumber: '114-4427',
    name: 'D10T Bulldozer Segment Group (Sprocket)',
    category: 'Undercarriage Parts',
    brand: 'CATERPILLAR',
    machineModel: 'CAT D10T / D10R Dozer',
    inStock: true,
    priceEstimate: 'Inquire for Quote', // Removed numerical price to test QUOTA tab
    description: 'Induction hardened sprocket segments for heavy mining dozers. Designed for long life in high-abrasion Canadian oil sands.',
    specifications: '5 Segments per pack, 27 Teeth',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p-110',
    partNumber: 'VOE14532688',
    name: 'Hydraulic Cylinder Seal Kit - Boom',
    category: 'Filters & Seals',
    brand: 'VOLVO',
    machineModel: 'Volvo EC300D / EC380E',
    inStock: true,
    priceEstimate: '$420.00 CAD',
    description: 'Premium polyurethane and nitrile seal group for severe service boom cylinders. High temperature and low friction performance.',
    specifications: 'Rod: 110mm, Bore: 160mm',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80'
  }
];

export const ALL_PRELOAD_IMAGES: string[] = [
  '/RCB.jfif',
  '/JCB.jfif',
  '/HAMMER/Cat_logo_PNG1.png',
  '/HAMMER/Komatsu_logo_PNG1.png',
  '/HAMMER/Liebherr_logo_PNG4.png',
  '/HAMMER/Epiroc-Blue.png',
  '/HAMMER/pngwing.com-1.png',
  '/HAMMER/pngwing.com-3.png',
  '/HAMMER/pngwing.com-4.png',
  '/HAMMER/pngwing.com-5.png',
  '/HAMMER/pngwing.com-6.png',
  '/HAMMER/banner-background.png',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=300&q=80',
  ...SAMPLE_PARTS.map(p => p.imageUrl)
];
