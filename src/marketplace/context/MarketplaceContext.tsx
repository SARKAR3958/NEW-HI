import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CustomerUser,
  Vendor,
  VendorApplication,
  MarketplaceProduct,
  MarketplaceOrder,
  MarketplaceQuote,
  NotificationItem,
  UserRole,
  VendorApplicationStatus,
  PricingType,
  VendorFulfillmentStatus,
  OrderOverallStatus,
  OrderPaymentStatus
} from '../types';
import {
  INITIAL_VENDORS,
  INITIAL_VENDOR_APPLICATIONS,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_QUOTES,
  INITIAL_NOTIFICATIONS,
  DEMO_ADMIN
} from '../mockData';

interface MarketplaceContextType {
  // Roles & Session
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentCustomer: CustomerUser | null;
  currentVendor: Vendor | null;
  currentVendorApplication: VendorApplication | null;
  isAdminLoggedIn: boolean;
  
  // Modals & Navigation
  showRoleModal: boolean;
  setShowRoleModal: (show: boolean) => void;
  showCustomerAuthModal: boolean;
  setShowCustomerAuthModal: (show: boolean) => void;
  customerAuthMode: 'login' | 'signup' | 'forgot';
  setCustomerAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;
  showVendorAuthModal: boolean;
  setShowVendorAuthModal: (show: boolean) => void;
  vendorAuthMode: 'login' | 'register';
  setVendorAuthMode: (mode: 'login' | 'register') => void;
  showVendorStatusModal: boolean;
  setShowVendorStatusModal: (show: boolean) => void;
  showLoginRequiredModal: boolean;
  setShowLoginRequiredModal: (show: boolean) => void;
  loginRequiredActionName: string;
  setLoginRequiredActionName: (name: string) => void;
  showCustomerPortal: boolean;
  setShowCustomerPortal: (show: boolean) => void;
  customerPortalTab: string;
  setCustomerPortalTab: (tab: string) => void;
  showVendorPortal: boolean;
  setShowVendorPortal: (show: boolean) => void;
  showAdminPortal: boolean;
  setShowAdminPortal: (show: boolean) => void;
  
  // Guarded Actions
  requireCustomerAuth: (action?: () => void, actionName?: string) => boolean;
  
  // Data entities
  vendors: Vendor[];
  vendorApplications: VendorApplication[];
  products: MarketplaceProduct[];
  customers: CustomerUser[];
  orders: MarketplaceOrder[];
  quotes: MarketplaceQuote[];
  notifications: NotificationItem[];
  
  // Customer Auth
  loginCustomer: (email: string, pass: string) => { success: boolean; error?: string };
  signupCustomer: (data: { name: string; email: string; phone: string; password: string }) => { success: boolean; error?: string };
  logoutCustomer: () => void;
  updateCustomerProfile: (data: Partial<CustomerUser>) => void;
  toggleWishlist: (productId: string) => void;
  
  // Vendor Auth & Registration
  submitVendorApplication: (data: Omit<VendorApplication, 'id' | 'submittedDate' | 'status'>) => VendorApplication;
  loginVendor: (email: string, pass: string) => { success: boolean; status?: VendorApplicationStatus; error?: string };
  logoutVendor: () => void;
  updateVendorOrderStatus: (orderId: string, status: VendorFulfillmentStatus) => void;
  addVendorProduct: (product: Omit<MarketplaceProduct, 'id' | 'status' | 'createdAt' | 'sellingPrice'>) => MarketplaceProduct;
  
  // Admin Auth & Management
  loginAdmin: (email: string, pass: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  approveVendorApplication: (applicationId: string, adminNotes?: string) => void;
  rejectVendorApplication: (applicationId: string, reason: string) => void;
  requestVendorChanges: (applicationId: string, changes: string[]) => void;
  suspendVendor: (vendorId: string) => void;
  reactivateVendor: (vendorId: string) => void;
  approveProduct: (productId: string, sellingPrice: number, pricingType: PricingType, adminNotes?: string) => void;
  rejectProduct: (productId: string, reason: string) => void;
  requestProductChanges: (productId: string, changes: string) => void;
  assignOrderVendor: (orderId: string, vendorId: string) => void;
  updateOrderStatus: (orderId: string, orderStatus: OrderOverallStatus, paymentStatus?: OrderPaymentStatus) => void;
  respondToQuote: (quoteId: string, price: number, adminNotes?: string) => void;
  rejectQuote: (quoteId: string, reason?: string) => void;
  acceptQuote: (quoteId: string) => void;
  suspendCustomer: (customerId: string) => void;
  reactivateCustomer: (customerId: string) => void;
  
  // Orders & Quotes Creation
  createOrderFromCart: (items: any[], totalAmount: number, shippingAddress: string) => MarketplaceOrder;
  createQuoteRequest: (quoteData: { productId: string; quantity: number; company: string; requirements: string; notes: string }) => MarketplaceQuote;
  
  // Notifications & State reset
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = 'hammer_marketplace_state_v2';
const ROLE_VISITED_KEY = 'hammer_role_selected_v1';

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if role modal has been shown previously
  const [showRoleModal, setShowRoleModal] = useState<boolean>(() => {
    return !localStorage.getItem(ROLE_VISITED_KEY);
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>('guest');
  const [currentCustomer, setCurrentCustomer] = useState<CustomerUser | null>(null);
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const [currentVendorApplication, setCurrentVendorApplication] = useState<VendorApplication | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Modals state
  const [showCustomerAuthModal, setShowCustomerAuthModal] = useState<boolean>(false);
  const [customerAuthMode, setCustomerAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showVendorAuthModal, setShowVendorAuthModal] = useState<boolean>(false);
  const [vendorAuthMode, setVendorAuthMode] = useState<'login' | 'register'>('login');
  const [showVendorStatusModal, setShowVendorStatusModal] = useState<boolean>(false);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState<boolean>(false);
  const [loginRequiredActionName, setLoginRequiredActionName] = useState<string>('Requested Action');
  const [showCustomerPortal, setShowCustomerPortal] = useState<boolean>(false);
  const [customerPortalTab, setCustomerPortalTab] = useState<string>('dashboard');
  const [showVendorPortal, setShowVendorPortal] = useState<boolean>(false);
  const [showAdminPortal, setShowAdminPortal] = useState<boolean>(false);

  // Guarded action queue
  const [pendingGuardedAction, setPendingGuardedAction] = useState<(() => void) | null>(null);

  // Persistent Collections State
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_vendors`);
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [vendorApplications, setVendorApplications] = useState<VendorApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : INITIAL_VENDOR_APPLICATIONS;
  });

  const [products, setProducts] = useState<MarketplaceProduct[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [customers, setCustomers] = useState<CustomerUser[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [orders, setOrders] = useState<MarketplaceOrder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [quotes, setQuotes] = useState<MarketplaceQuote[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_quotes`);
    const rawQuotes: MarketplaceQuote[] = saved ? JSON.parse(saved) : INITIAL_QUOTES;
    // Deduplicate any quotes with duplicate IDs (e.g. from previously cached mock data)
    const seenIds = new Set<string>();
    return rawQuotes.map((q, idx) => {
      if (!q.id || seenIds.has(q.id)) {
        const uniqueId = `RFQ-759${idx}`;
        return { ...q, id: uniqueId };
      }
      seenIds.add(q.id);
      return q;
    });
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifs`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_vendors`, JSON.stringify(vendors));
      localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(vendorApplications));
      localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
      localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${STORAGE_KEY}_quotes`, JSON.stringify(quotes));
      localStorage.setItem(`${STORAGE_KEY}_notifs`, JSON.stringify(notifications));
    } catch (e) {
      console.error('Storage sync error', e);
    }
  }, [vendors, vendorApplications, products, customers, orders, quotes, notifications]);

  // Set active role and persist chosen role flag
  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    localStorage.setItem(ROLE_VISITED_KEY, 'true');
  };

  // Guarded action trigger (Requirement 3: Opens Login Required modal)
  const requireCustomerAuth = (action?: () => void, actionName?: string): boolean => {
    if (currentCustomer) {
      if (action) action();
      return true;
    }
    // Store action for execution immediately after login
    if (action) {
      setPendingGuardedAction(() => action);
    }
    setLoginRequiredActionName(actionName || 'Requested Action');
    setShowLoginRequiredModal(true);
    return false;
  };

  // Helper to add notification
  const addNotification = (notif: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // ==========================================
  // CUSTOMER AUTH
  // ==========================================
  const loginCustomer = (email: string, pass: string) => {
    const found = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      // Mock automatic signin for convenience or return error if invalid
      if (email.includes('@')) {
        const newCust: CustomerUser = {
          id: `CUST-${Date.now().toString().slice(-4)}`,
          name: email.split('@')[0].toUpperCase(),
          email,
          phone: '+1 (555) 019-4821',
          addresses: [{ id: 'a1', type: 'SHIPPING', isDefault: true, street: '100 Industrial Pkwy', city: 'Calgary', state: 'AB', country: 'Canada', postalCode: 'T2C 2A1' }],
          wishlist: [],
          createdAt: new Date().toISOString().split('T')[0],
          status: 'ACTIVE'
        };
        setCustomers(prev => [newCust, ...prev]);
        setCurrentCustomer(newCust);
        setActiveRole('customer');
        setShowCustomerAuthModal(false);
        // Execute pending action if any
        if (pendingGuardedAction) {
          setTimeout(() => {
            pendingGuardedAction();
            setPendingGuardedAction(null);
          }, 300);
        }
        return { success: true };
      }
      return { success: false, error: 'Customer account not found. Please create one.' };
    }
    if (found.status === 'SUSPENDED') {
      return { success: false, error: 'This corporate customer account has been suspended by administration.' };
    }
    setCurrentCustomer(found);
    setActiveRole('customer');
    setShowCustomerAuthModal(false);

    // Execute pending guarded action
    if (pendingGuardedAction) {
      setTimeout(() => {
        pendingGuardedAction();
        setPendingGuardedAction(null);
      }, 300);
    }
    return { success: true };
  };

  const signupCustomer = (data: { name: string; email: string; phone: string; password: string }) => {
    const existing = customers.find(c => c.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email address already exists.' };
    }
    const newCustomer: CustomerUser = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      addresses: [{ id: `addr-${Date.now()}`, type: 'SHIPPING', isDefault: true, street: 'Main Commercial Ave', city: 'Toronto', state: 'ON', country: 'Canada', postalCode: 'M5H 2N2' }],
      wishlist: [],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setCurrentCustomer(newCustomer);
    setActiveRole('customer');
    setShowCustomerAuthModal(false);

    addNotification({
      recipientRole: 'admin',
      title: 'New Customer Registered',
      message: `${newCustomer.name} (${newCustomer.email}) created an account.`,
      type: 'system'
    });

    if (pendingGuardedAction) {
      setTimeout(() => {
        pendingGuardedAction();
        setPendingGuardedAction(null);
      }, 300);
    }
    return { success: true };
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    setActiveRole('guest');
  };

  const updateCustomerProfile = (data: Partial<CustomerUser>) => {
    if (!currentCustomer) return;
    const updated = { ...currentCustomer, ...data };
    setCurrentCustomer(updated);
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const toggleWishlist = (productId: string) => {
    if (!currentCustomer) return;
    const isWished = currentCustomer.wishlist.includes(productId);
    const newWish = isWished 
      ? currentCustomer.wishlist.filter(id => id !== productId)
      : [...currentCustomer.wishlist, productId];
    updateCustomerProfile({ wishlist: newWish });
  };

  // ==========================================
  // VENDOR REGISTRATION & AUTH
  // ==========================================
  const submitVendorApplication = (data: Omit<VendorApplication, 'id' | 'submittedDate' | 'status'>) => {
    const newApp: VendorApplication = {
      ...data,
      id: `VND-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'PENDING'
    };
    setVendorApplications(prev => [newApp, ...prev]);
    setCurrentVendorApplication(newApp);
    setShowVendorAuthModal(false);
    setShowVendorStatusModal(true);

    addNotification({
      recipientRole: 'admin',
      title: 'New Vendor Application Submitted',
      message: `${newApp.businessName} submitted a 7-step vendor registration application.`,
      type: 'vendor',
      link: 'applications'
    });

    return newApp;
  };

  const loginVendor = (email: string, pass: string): { success: boolean; status?: VendorApplicationStatus; error?: string } => {
    // 1. Check if vendor exists in active approved vendors list
    const activeVendor = vendors.find(v => v.email.toLowerCase() === email.toLowerCase());
    if (activeVendor) {
      if (activeVendor.status === 'SUSPENDED') {
        return { success: false, status: 'SUSPENDED', error: 'Your vendor account is suspended. Contact admin.' };
      }
      if (activeVendor.status === 'ACTIVE') {
        setCurrentVendor(activeVendor);
        setActiveRole('vendor');
        setShowVendorAuthModal(false);
        return { success: true, status: 'APPROVED' };
      }
    }

    // 2. Check in vendor applications list
    const app = vendorApplications.find(a => a.email.toLowerCase() === email.toLowerCase() || a.businessEmail.toLowerCase() === email.toLowerCase());
    if (app) {
      setCurrentVendorApplication(app);
      if (app.status === 'APPROVED') {
        // Find or create active vendor record
        let v = vendors.find(item => item.id === app.id || item.email.toLowerCase() === app.email.toLowerCase());
        if (!v) {
          v = {
            id: `VND-${Math.floor(100 + Math.random() * 900)}`,
            companyName: app.businessName,
            contactName: app.fullName,
            email: app.email,
            phone: app.phone,
            category: app.businessCategory,
            status: 'ACTIVE',
            rating: 5.0,
            totalProducts: 0,
            totalOrders: 0,
            totalRevenue: 0,
            joinedDate: app.submittedDate,
            country: app.country,
            city: `${app.city}, ${app.state}`,
            verifiedBadges: ['Verified OEM Partner']
          };
          setVendors(prev => [v!, ...prev]);
        }
        setCurrentVendor(v);
        setActiveRole('vendor');
        setShowVendorAuthModal(false);
        return { success: true, status: 'APPROVED' };
      }

      // If pending, under review, changes required, or rejected -> MUST NOT access dashboard!
      setShowVendorAuthModal(false);
      setShowVendorStatusModal(true);
      return { 
        success: false, 
        status: app.status, 
        error: `Your vendor account is ${app.status.replace('_', ' ')}. Access is restricted until admin verification.` 
      };
    }

    return { success: false, error: 'No vendor registration found with this email. Please register as a vendor.' };
  };

  const logoutVendor = () => {
    setCurrentVendor(null);
    setCurrentVendorApplication(null);
    setActiveRole('guest');
  };

  const updateVendorOrderStatus = (orderId: string, status: VendorFulfillmentStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updated = { ...o, vendorFulfillmentStatus: status };
        if (status === 'COMPLETED') {
          updated.orderStatus = 'DELIVERED';
        } else if (status === 'SHIPPED') {
          updated.orderStatus = 'DISPATCHED';
        }
        return updated;
      }
      return o;
    }));

    addNotification({
      recipientRole: 'admin',
      title: 'Vendor Fulfillment Update',
      message: `Order ${orderId} updated to ${status.replace('_', ' ')} by vendor.`,
      type: 'order'
    });
  };

  const addVendorProduct = (productData: Omit<MarketplaceProduct, 'id' | 'status' | 'createdAt' | 'sellingPrice'>) => {
    const newProd: MarketplaceProduct = {
      ...productData,
      id: `mp-v-${Date.now().toString().slice(-5)}`,
      sellingPrice: 0, // Customer selling price is set by Admin
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProd, ...prev]);

    addNotification({
      recipientRole: 'admin',
      title: 'New Product Pending Approval',
      message: `${newProd.vendorName} submitted "${newProd.name}" (Supplier Cost: $${newProd.supplierCost}). Needs selling price.`,
      type: 'product',
      link: 'product-approvals'
    });

    return newProd;
  };

  // ==========================================
  // ADMIN AUTH & MANAGEMENT
  // ==========================================
  const loginAdmin = (email: string, pass: string) => {
    if (email === DEMO_ADMIN.email && pass === DEMO_ADMIN.password) {
      setIsAdminLoggedIn(true);
      setActiveRole('admin');
      return { success: true };
    }
    // Allow quick 1-click or demo variations
    if (email === 'admin@demo.com') {
      setIsAdminLoggedIn(true);
      setActiveRole('admin');
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. Use admin@demo.com / Admin@123' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setActiveRole('guest');
  };

  const approveVendorApplication = (applicationId: string, adminNotes?: string) => {
    const app = vendorApplications.find(a => a.id === applicationId);
    if (!app) return;

    const updatedApp: VendorApplication = {
      ...app,
      status: 'APPROVED',
      adminNotes: adminNotes || 'Application officially verified and approved.'
    };

    setVendorApplications(prev => prev.map(a => a.id === applicationId ? updatedApp : a));

    // Create or activate corresponding vendor entry
    let existingVendor = vendors.find(v => v.email.toLowerCase() === app.email.toLowerCase());
    if (existingVendor) {
      setVendors(prev => prev.map(v => v.id === existingVendor!.id ? { ...v, status: 'ACTIVE' } : v));
    } else {
      const newVendor: Vendor = {
        id: `VND-${Math.floor(100 + Math.random() * 900)}`,
        companyName: app.businessName,
        contactName: app.fullName,
        email: app.email,
        phone: app.phone,
        category: app.businessCategory,
        status: 'ACTIVE',
        rating: 5.0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        country: app.country,
        city: `${app.city}, ${app.state}`,
        verifiedBadges: ['Verified OEM Partner']
      };
      setVendors(prev => [newVendor, ...prev]);
    }

    addNotification({
      recipientRole: 'vendor',
      recipientId: existingVendor?.id,
      title: 'Vendor Application Approved!',
      message: 'Congratulations! Your business application has been approved. You now have full access to the Vendor Dashboard.',
      type: 'vendor'
    });
  };

  const rejectVendorApplication = (applicationId: string, reason: string) => {
    setVendorApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        return { ...a, status: 'REJECTED', rejectionReason: reason };
      }
      return a;
    }));
  };

  const requestVendorChanges = (applicationId: string, changes: string[]) => {
    setVendorApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        return { ...a, status: 'CHANGES_REQUIRED', changesRequested: changes };
      }
      return a;
    }));
  };

  const suspendVendor = (vendorId: string) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: 'SUSPENDED' } : v));
  };

  const reactivateVendor = (vendorId: string) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: 'ACTIVE' } : v));
  };

  // Product Approvals
  const approveProduct = (productId: string, sellingPrice: number, pricingType: PricingType, adminNotes?: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          sellingPrice,
          pricingType,
          status: 'APPROVED',
          adminNotes
        };
      }
      return p;
    }));

    const prod = products.find(p => p.id === productId);
    if (prod) {
      addNotification({
        recipientRole: 'vendor',
        recipientId: prod.vendorId,
        title: 'Product Approved & Live',
        message: `Your product "${prod.name}" has been approved at selling price $${sellingPrice.toLocaleString()} CAD.`,
        type: 'product'
      });
    }
  };

  const rejectProduct = (productId: string, reason: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: 'REJECTED', rejectionReason: reason };
      }
      return p;
    }));
  };

  const requestProductChanges = (productId: string, changes: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, status: 'CHANGES_REQUIRED', rejectionReason: changes };
      }
      return p;
    }));
  };

  // Orders Management
  const assignOrderVendor = (orderId: string, vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) return;
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, vendorId, vendorName: vendor.companyName };
      }
      return o;
    }));

    addNotification({
      recipientRole: 'vendor',
      recipientId: vendorId,
      title: 'New Order Assigned',
      message: `Admin assigned Order ${orderId} to your fulfillment desk.`,
      type: 'order'
    });
  };

  const updateOrderStatus = (orderId: string, orderStatus: OrderOverallStatus, paymentStatus?: OrderPaymentStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus,
          paymentStatus: paymentStatus || o.paymentStatus
        };
      }
      return o;
    }));
  };

  // Quotes Management
  const respondToQuote = (quoteId: string, price: number, adminNotes?: string) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === quoteId) {
        return {
          ...q,
          quotePrice: price,
          adminNotes,
          status: 'QUOTE_SENT',
          respondedAt: new Date().toISOString().split('T')[0],
          validUntil: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
        };
      }
      return q;
    }));

    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      addNotification({
        recipientRole: 'customer',
        recipientId: quote.customerId,
        title: 'Quote Ready',
        message: `Admin responded to your RFQ for ${quote.productName} with official wholesale price $${price.toLocaleString()} CAD.`,
        type: 'quote'
      });
    }
  };

  const rejectQuote = (quoteId: string, reason?: string) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === quoteId) {
        return { ...q, status: 'REJECTED', adminNotes: reason };
      }
      return q;
    }));
  };

  const acceptQuote = (quoteId: string) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === quoteId) {
        return { ...q, status: 'ACCEPTED' };
      }
      return q;
    }));

    addNotification({
      recipientRole: 'admin',
      title: 'Quote Accepted by Customer',
      message: `Customer accepted quote ${quoteId}. Ready for invoicing.`,
      type: 'quote'
    });
  };

  const suspendCustomer = (customerId: string) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, status: 'SUSPENDED' } : c));
  };

  const reactivateCustomer = (customerId: string) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, status: 'ACTIVE' } : c));
  };

  // Create Order from Cart
  const createOrderFromCart = (cartItems: any[], totalAmount: number, shippingAddress: string) => {
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const vendorMap = new Map<string, string>();
    cartItems.forEach(i => {
      vendorMap.set(i.part.vendorId || 'VND-001', i.part.vendorName || 'Apex Hydraulics International');
    });

    const primaryVendorId = cartItems[0]?.part?.vendorId || 'VND-001';
    const primaryVendorName = cartItems[0]?.part?.vendorName || 'Apex Hydraulics International';

    const orderItems = cartItems.map(item => ({
      productId: item.part.id,
      productName: item.part.name,
      sku: item.part.partNumber || item.part.sku,
      imageUrl: item.part.imageUrl,
      vendorId: item.part.vendorId || primaryVendorId,
      vendorName: item.part.vendorName || primaryVendorName,
      quantity: item.quantity,
      unitSupplierCost: item.part.supplierCost || Math.round((parseFloat(item.part.priceEstimate?.replace(/[^0-9.]/g, '') || '1000')) * 0.8),
      unitPrice: parseFloat(item.part.priceEstimate?.replace(/[^0-9.]/g, '') || '1200'),
      subtotal: parseFloat(item.part.priceEstimate?.replace(/[^0-9.]/g, '') || '1200') * item.quantity
    }));

    const supplierCostTotal = orderItems.reduce((sum, item) => sum + (item.unitSupplierCost * item.quantity), 0);
    const margin = totalAmount - supplierCostTotal;

    const newOrder: MarketplaceOrder = {
      id: newOrderId,
      customerId: currentCustomer?.id || 'CUST-GUEST',
      customerName: currentCustomer?.name || 'Authorized Buyer',
      customerEmail: currentCustomer?.email || 'buyer@industrial.ca',
      customerPhone: currentCustomer?.phone || '+1 (555) 019-2812',
      shippingAddress,
      vendorId: primaryVendorId,
      vendorName: primaryVendorName,
      items: orderItems,
      totalAmount,
      supplierCostTotal,
      margin,
      paymentStatus: 'PAID',
      vendorFulfillmentStatus: 'RECEIVED',
      orderStatus: 'NEW',
      createdAt: new Date().toISOString().split('T')[0],
      timeline: [
        { stage: 'Order Placed', timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, note: 'Order registered via Marketplace checkout' },
        { stage: 'Vendor Assigned', timestamp: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, note: `Assigned to ${primaryVendorName}` }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Send notifications
    addNotification({
      recipientRole: 'admin',
      title: 'New Customer Order Received',
      message: `Order ${newOrderId} placed by ${newOrder.customerName} ($${totalAmount.toLocaleString()} CAD).`,
      type: 'order',
      link: 'orders'
    });

    addNotification({
      recipientRole: 'vendor',
      recipientId: primaryVendorId,
      title: 'New Order Dispatched to You',
      message: `You have new fulfillment order ${newOrderId} for ${cartItems[0]?.part?.name}.`,
      type: 'order',
      link: 'orders'
    });

    return newOrder;
  };

  // Create Quote Request
  const createQuoteRequest = (quoteData: { productId: string; quantity: number; company: string; requirements: string; notes: string }) => {
    const prod = products.find(p => p.id === quoteData.productId);
    const newQuoteId = `RFQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newQuote: MarketplaceQuote = {
      id: newQuoteId,
      productId: quoteData.productId,
      productName: prod?.name || 'Heavy Equipment Component',
      productSku: prod?.sku || 'SKU-INQ-001',
      productImg: prod?.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
      vendorId: prod?.vendorId || 'VND-001',
      vendorName: prod?.vendorName || 'Apex Hydraulics International',
      customerId: currentCustomer?.id || 'CUST-GUEST',
      customerName: currentCustomer?.name || 'Corporate Inquirer',
      customerEmail: currentCustomer?.email || 'procurement@fleet.ca',
      customerPhone: currentCustomer?.phone || '+1 (555) 019-2812',
      company: quoteData.company || currentCustomer?.company || 'Heavy Earthworks',
      quantity: quoteData.quantity,
      requirements: quoteData.requirements,
      notes: quoteData.notes,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuotes(prev => [newQuote, ...prev]);

    addNotification({
      recipientRole: 'admin',
      title: 'New RFQ Inbound',
      message: `${newQuote.customerName} (${newQuote.company}) requested a wholesale quote for "${newQuote.productName}".`,
      type: 'quote',
      link: 'quote-requests'
    });

    return newQuote;
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => {
    if (activeRole === 'admin') return n.recipientRole === 'admin' && !n.read;
    if (activeRole === 'vendor') return n.recipientRole === 'vendor' && n.recipientId === currentVendor?.id && !n.read;
    if (activeRole === 'customer') return n.recipientRole === 'customer' && n.recipientId === currentCustomer?.id && !n.read;
    return false;
  }).length;

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_vendors`);
    localStorage.removeItem(`${STORAGE_KEY}_applications`);
    localStorage.removeItem(`${STORAGE_KEY}_products`);
    localStorage.removeItem(`${STORAGE_KEY}_customers`);
    localStorage.removeItem(`${STORAGE_KEY}_orders`);
    localStorage.removeItem(`${STORAGE_KEY}_quotes`);
    localStorage.removeItem(`${STORAGE_KEY}_notifs`);
    localStorage.removeItem(ROLE_VISITED_KEY);
    setVendors(INITIAL_VENDORS);
    setVendorApplications(INITIAL_VENDOR_APPLICATIONS);
    setProducts(INITIAL_PRODUCTS);
    setCustomers(INITIAL_CUSTOMERS);
    setOrders(INITIAL_ORDERS);
    setQuotes(INITIAL_QUOTES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentCustomer(null);
    setCurrentVendor(null);
    setCurrentVendorApplication(null);
    setIsAdminLoggedIn(false);
    setActiveRole('guest');
    setShowRoleModal(true);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        activeRole,
        setActiveRole,
        currentCustomer,
        currentVendor,
        currentVendorApplication,
        isAdminLoggedIn,
        showRoleModal,
        setShowRoleModal,
        showCustomerAuthModal,
        setShowCustomerAuthModal,
        customerAuthMode,
        setCustomerAuthMode,
        showVendorAuthModal,
        setShowVendorAuthModal,
        vendorAuthMode,
        setVendorAuthMode,
        showVendorStatusModal,
        setShowVendorStatusModal,
        showLoginRequiredModal,
        setShowLoginRequiredModal,
        loginRequiredActionName,
        setLoginRequiredActionName,
        showCustomerPortal,
        setShowCustomerPortal,
        customerPortalTab,
        setCustomerPortalTab,
        showVendorPortal,
        setShowVendorPortal,
        showAdminPortal,
        setShowAdminPortal,
        requireCustomerAuth,
        vendors,
        vendorApplications,
        products,
        customers,
        orders,
        quotes,
        notifications,
        loginCustomer,
        signupCustomer,
        logoutCustomer,
        updateCustomerProfile,
        toggleWishlist,
        submitVendorApplication,
        loginVendor,
        logoutVendor,
        updateVendorOrderStatus,
        addVendorProduct,
        loginAdmin,
        logoutAdmin,
        approveVendorApplication,
        rejectVendorApplication,
        requestVendorChanges,
        suspendVendor,
        reactivateVendor,
        approveProduct,
        rejectProduct,
        requestProductChanges,
        assignOrderVendor,
        updateOrderStatus,
        respondToQuote,
        rejectQuote,
        acceptQuote,
        suspendCustomer,
        reactivateCustomer,
        createOrderFromCart,
        createQuoteRequest,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetDemoData
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
