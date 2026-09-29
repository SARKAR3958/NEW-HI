export type UserRole = 'guest' | 'customer' | 'vendor' | 'admin';

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  avatar?: string;
  addresses: CustomerAddress[];
  wishlist: string[]; // product IDs
  createdAt: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export interface CustomerAddress {
  id: string;
  type: 'BILLING' | 'SHIPPING';
  isDefault: boolean;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export type VendorApplicationStatus = 
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'CHANGES_REQUIRED'
  | 'SUSPENDED';

export interface VendorDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploading' | 'completed' | 'error';
  uploadProgress: number;
  url?: string;
}

export interface VendorApplication {
  id: string; // e.g. "VND-APP-8492"
  submittedDate: string;
  status: VendorApplicationStatus;
  rejectionReason?: string;
  changesRequested?: string[];
  adminNotes?: string;
  
  // Step 1: Account
  fullName: string;
  email: string;
  phone: string;
  
  // Step 2: Business Information
  businessName: string;
  businessType: string;
  businessCategory: string;
  businessDescription: string;
  yearsInBusiness: number;
  website: string;
  businessEmail: string;
  businessPhone: string;
  
  // Step 3: Address
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  
  // Step 4: Business Details
  productCategories: string[];
  productCountEstimated: string;
  brandsHandled: string;
  expectedMonthlyOrders: string;
  
  // Step 5: Documents
  documents: VendorDocument[];
  
  // Step 6: Bank & Payment
  bankName: string;
  accountHolderName: string;
  accountNumberMasked: string;
  routingOrIban: string;
  taxId: string;
}

export interface Vendor {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  rating: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  joinedDate: string;
  avatar?: string;
  logo?: string;
  country: string;
  city: string;
  verifiedBadges: string[];
}

export type ProductApprovalStatus = 
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'CHANGES_REQUIRED'
  | 'OUT_OF_STOCK';

export type PricingType = 'FIXED' | 'QUOTE' | 'FIXED_QUOTE';

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  sku: string;
  brand: string;
  description: string;
  specifications: string;
  imageUrl: string;
  galleryImages?: string[];
  supplierCost: number; // visible ONLY to Vendor & Admin
  sellingPrice: number; // set by Admin, visible to Customer
  pricingType: PricingType;
  stock: number;
  moq: number;
  weight: string;
  dimensions: string;
  status: ProductApprovalStatus;
  vendorId: string;
  vendorName: string;
  createdAt: string;
  rejectionReason?: string;
  adminNotes?: string;
}

export type OrderPaymentStatus = 'PAID' | 'PENDING' | 'REFUNDED';

export type VendorFulfillmentStatus = 
  | 'RECEIVED'
  | 'PROCESSING'
  | 'READY_FOR_DISPATCH'
  | 'SHIPPED'
  | 'COMPLETED';

export type OrderOverallStatus = 
  | 'NEW'
  | 'PROCESSING'
  | 'DISPATCHED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  imageUrl: string;
  vendorId: string;
  vendorName: string;
  quantity: number;
  unitSupplierCost: number;
  unitPrice: number;
  subtotal: number;
}

export interface MarketplaceOrder {
  id: string; // e.g. "ORD-94812"
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  vendorId: string; // assigned vendor
  vendorName: string;
  items: OrderItem[];
  totalAmount: number; // customer paid
  supplierCostTotal: number; // vendor payout baseline
  margin: number; // marketplace margin
  paymentStatus: OrderPaymentStatus;
  vendorFulfillmentStatus: VendorFulfillmentStatus;
  orderStatus: OrderOverallStatus;
  createdAt: string;
  trackingNumber?: string;
  timeline: {
    stage: string;
    timestamp: string;
    note: string;
  }[];
}

export type QuoteStatus = 
  | 'PENDING'
  | 'REVIEWING'
  | 'QUOTE_SENT'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED';

export interface MarketplaceQuote {
  id: string; // e.g. "RFQ-7319"
  productId: string;
  productName: string;
  productSku: string;
  productImg: string;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company: string;
  quantity: number;
  requirements: string;
  notes: string;
  quotePrice?: number;
  adminNotes?: string;
  status: QuoteStatus;
  createdAt: string;
  respondedAt?: string;
  validUntil?: string;
}

export interface NotificationItem {
  id: string;
  recipientRole: 'customer' | 'vendor' | 'admin';
  recipientId?: string; // customerId or vendorId
  title: string;
  message: string;
  type: 'order' | 'quote' | 'vendor' | 'product' | 'system';
  read: boolean;
  createdAt: string;
  link?: string;
}
