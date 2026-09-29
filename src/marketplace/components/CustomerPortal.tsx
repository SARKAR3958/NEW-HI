import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Heart,
  ShoppingCart,
  User,
  MapPin,
  Bell,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Edit3,
  Plus,
  Trash2,
  ShieldCheck,
  Package,
  Building,
  Mail,
  Phone,
  Truck,
  CreditCard
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CustomerAddress, MarketplaceOrder, MarketplaceQuote } from '../types';

interface CustomerPortalProps {
  onOpenCart?: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ onOpenCart }) => {
  const {
    showCustomerPortal,
    setShowCustomerPortal,
    customerPortalTab,
    setCustomerPortalTab,
    currentCustomer,
    updateCustomerProfile,
    logoutCustomer,
    orders,
    quotes,
    products,
    notifications,
    markNotificationAsRead,
    toggleWishlist
  } = useMarketplace();

  // Profile Edit Local State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(currentCustomer?.name || '');
  const [profileEmail, setProfileEmail] = useState(currentCustomer?.email || '');
  const [profilePhone, setProfilePhone] = useState(currentCustomer?.phone || '');
  const [profileCompany, setProfileCompany] = useState(currentCustomer?.company || '');
  const [profileStreet, setProfileStreet] = useState(currentCustomer?.addresses?.[0]?.street || '7400 Barlow Trail SE');
  const [profileCity, setProfileCity] = useState(currentCustomer?.addresses?.[0]?.city || 'Calgary');
  const [profileState, setProfileState] = useState(currentCustomer?.addresses?.[0]?.state || 'AB');
  const [profileCountry, setProfileCountry] = useState(currentCustomer?.addresses?.[0]?.country || 'Canada');
  const [profilePostal, setProfilePostal] = useState(currentCustomer?.addresses?.[0]?.postalCode || 'T2C 2V4');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Address Add/Edit State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPostal, setNewPostal] = useState('');
  const [newType, setNewType] = useState<'SHIPPING' | 'BILLING'>('SHIPPING');

  // Selected Order / Quote Detail view
  const [selectedOrder, setSelectedOrder] = useState<MarketplaceOrder | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<MarketplaceQuote | null>(null);

  if (!showCustomerPortal || !currentCustomer) return null;

  // Filter orders for this customer
  const customerOrders = orders.filter(
    o => o.customerId === currentCustomer.id || o.customerEmail.toLowerCase() === currentCustomer.email.toLowerCase()
  );

  // Filter quotes for this customer
  const customerQuotes = quotes.filter(
    q => q.customerId === currentCustomer.id || q.customerEmail.toLowerCase() === currentCustomer.email.toLowerCase()
  );

  // Filter wishlist products
  const wishlistProducts = products.filter(p => currentCustomer.wishlist?.includes(p.id));

  // Counts
  const pendingOrdersCount = customerOrders.filter(o => o.orderStatus === 'NEW' || o.orderStatus === 'PROCESSING').length;
  const quoteRequestsCount = customerQuotes.length;
  const wishlistCount = wishlistProducts.length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      company: profileCompany,
      addresses: [
        {
          id: currentCustomer.addresses?.[0]?.id || 'addr-1',
          type: 'SHIPPING',
          isDefault: true,
          street: profileStreet,
          city: profileCity,
          state: profileState,
          country: profileCountry,
          postalCode: profilePostal
        },
        ...(currentCustomer.addresses?.slice(1) || [])
      ]
    });
    setIsEditingProfile(false);
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity) return;
    const newAddr: CustomerAddress = {
      id: `addr-${Date.now()}`,
      type: newType,
      isDefault: false,
      street: newStreet,
      city: newCity,
      state: newState || 'AB',
      country: 'Canada',
      postalCode: newPostal || 'T2C 2A1'
    };
    updateCustomerProfile({
      addresses: [...(currentCustomer.addresses || []), newAddr]
    });
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPostal('');
    setShowAddAddress(false);
  };

  const handleRemoveAddress = (addrId: string) => {
    updateCustomerProfile({
      addresses: (currentCustomer.addresses || []).filter(a => a.id !== addrId)
    });
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, badge: customerOrders.length },
    { id: 'quotes', label: 'My Quotes', icon: FileText, badge: customerQuotes.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.read && n.recipientRole === 'customer').length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4300] flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCustomerPortal(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative z-10 w-full max-w-6xl h-[92vh] max-h-[860px] bg-[#080E1A] border border-white/15 rounded-[32px] overflow-hidden shadow-2xl flex flex-col text-white"
        >
          {/* Top Brand Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-amber-300 to-[#FFB800] shrink-0"></div>

          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center font-black">
                {currentCustomer.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                    Customer Account
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/20">
                    B2B Buyer
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {currentCustomer.email} {currentCustomer.company ? `• ${currentCustomer.company}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowCustomerPortal(false);
                  logoutCustomer();
                }}
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
              <button
                onClick={() => setShowCustomerPortal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Portal Body (Sidebar + Content) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 p-4 shrink-0 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto">
              <div className="flex md:flex-col gap-1.5 w-full">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = customerPortalTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'cart') {
                          setShowCustomerPortal(false);
                          if (onOpenCart) onOpenCart();
                        } else {
                          setCustomerPortalTab(item.id);
                        }
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                            isActive ? 'bg-black text-white' : 'bg-white/10 text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Logout on Mobile / Desktop */}
              <div className="hidden md:block pt-4 border-t border-white/10 mt-auto">
                <button
                  onClick={() => {
                    setShowCustomerPortal(false);
                    logoutCustomer();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-5 sm:p-8 overflow-y-auto bg-gradient-to-b from-[#080E1A] to-[#040811]">
              {/* TAB: DASHBOARD */}
              {customerPortalTab === 'dashboard' && (
                <div className="space-y-7 max-w-4xl">
                  {/* Welcome Message */}
                  <div className="bg-gradient-to-r from-white/[0.04] to-transparent p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB800]">
                        Buyer Portal Overview
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                        Welcome back, {currentCustomer.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Track commercial equipment shipments, review wholesale quotes, and manage project procurement.
                      </p>
                    </div>

                    <button
                      onClick={() => setCustomerPortalTab('orders')}
                      className="bg-[#FFB800] hover:bg-white text-black font-black px-5 py-2.5 rounded-xl uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <span>Track Orders</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Total Orders</span>
                      <div className="text-2xl font-black text-white">{customerOrders.length}</div>
                      <span className="text-[10px] text-slate-500">Fleet purchases</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">Pending Orders</span>
                      <div className="text-2xl font-black text-[#FFB800]">{pendingOrdersCount}</div>
                      <span className="text-[10px] text-slate-500">In fulfillment</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 block">Quote Requests</span>
                      <div className="text-2xl font-black text-sky-400">{quoteRequestsCount}</div>
                      <span className="text-[10px] text-slate-500">B2B RFQ proposals</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">Wishlist Items</span>
                      <div className="text-2xl font-black text-rose-400">{wishlistCount}</div>
                      <span className="text-[10px] text-slate-500">Saved machinery parts</span>
                    </div>
                  </div>

                  {/* Recent Orders Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">Recent Orders</h4>
                      <button
                        onClick={() => setCustomerPortalTab('orders')}
                        className="text-[11px] text-[#FFB800] hover:underline cursor-pointer"
                      >
                        View all ({customerOrders.length})
                      </button>
                    </div>

                    {customerOrders.length === 0 ? (
                      <div className="p-8 text-center bg-white/[0.02] border border-white/5 rounded-2xl text-slate-400 text-xs">
                        No orders placed yet. Add products to cart and checkout to track them here.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {customerOrders.slice(0, 3).map(order => (
                          <div
                            key={order.id}
                            className="bg-white/[0.02] border border-white/10 hover:border-white/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] shrink-0">
                                <Package className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-xs text-white">{order.id}</span>
                                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    {order.orderStatus}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400">
                                  {order.items.length} item(s) • Total: ${(order.totalAmount || 0).toLocaleString()} CAD
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setCustomerPortalTab('orders');
                              }}
                              className="text-xs text-[#FFB800] hover:text-white font-bold flex items-center gap-1 cursor-pointer self-end sm:self-auto"
                            >
                              <span>Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => {
                          setShowCustomerPortal(false);
                          if (onOpenCart) onOpenCart();
                        }}
                        className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-left transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4 text-[#FFB800] mb-2" />
                        <span className="text-xs font-bold text-white block">Open Cart</span>
                        <span className="text-[10px] text-slate-400">Review pending checkout</span>
                      </button>

                      <button
                        onClick={() => setCustomerPortalTab('quotes')}
                        className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-left transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-sky-400 mb-2" />
                        <span className="text-xs font-bold text-white block">Quote Proposals</span>
                        <span className="text-[10px] text-slate-400">Check supplier RFQ responses</span>
                      </button>

                      <button
                        onClick={() => setCustomerPortalTab('profile')}
                        className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-left transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-emerald-400 mb-2" />
                        <span className="text-xs font-bold text-white block">Update Profile</span>
                        <span className="text-[10px] text-slate-400">Edit business details</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MY ORDERS */}
              {customerPortalTab === 'orders' && (
                <div className="space-y-5 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">My Orders</h3>
                      <p className="text-xs text-slate-400">Commercial equipment and machinery parts order records.</p>
                    </div>
                  </div>

                  {customerOrders.length === 0 ? (
                    <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 text-xs">
                      No commercial orders found on record.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {customerOrders.map(order => (
                        <div key={order.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono font-bold text-white">{order.id}</span>
                                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  {order.orderStatus}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">Placed on {order.createdAt}</span>
                            </div>

                            <div className="text-right">
                              <span className="text-xs text-slate-400 block">Total Amount</span>
                              <span className="text-base font-black text-[#FFB800]">
                                ${(order.totalAmount || 0).toLocaleString()} CAD
                              </span>
                            </div>
                          </div>

                          {/* Items List */}
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-10 h-10 object-cover rounded-lg border border-white/10"
                                  />
                                  <div>
                                    <span className="font-bold text-white block">{item.productName}</span>
                                    <span className="text-[10px] text-slate-400">
                                      SKU: {item.sku} • Qty: {item.quantity} • Vendor: {item.vendorName}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right font-mono text-white font-bold">
                                  ${((item.unitPrice || 0) * (item.quantity || 1)).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Fulfillment Timeline & Tracking */}
                          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-[#FFB800]" />
                              <span className="text-slate-300">
                                Vendor Fulfillment:{' '}
                                <strong className="text-white uppercase">{order.vendorFulfillmentStatus}</strong>
                              </span>
                            </div>
                            {order.trackingNumber && (
                              <div className="flex items-center gap-2 text-slate-400">
                                <span>Tracking:</span>
                                <span className="font-mono text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                  {order.trackingNumber}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: MY QUOTES */}
              {customerPortalTab === 'quotes' && (
                <div className="space-y-5 max-w-4xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Quote Requests (RFQ)</h3>
                    <p className="text-xs text-slate-400">Your requested wholesale machine parts quotations and admin replies.</p>
                  </div>

                  {customerQuotes.length === 0 ? (
                    <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 text-xs">
                      No active quote requests. Add quote items from the catalog or request custom quotes.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {customerQuotes.map(quote => (
                        <div key={quote.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-mono font-bold text-white">{quote.id}</span>
                                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                                  quote.status === 'QUOTE_SENT' || quote.status === 'ACCEPTED'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : quote.status === 'REJECTED'
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    : 'bg-amber-500/10 text-[#FFB800] border-amber-500/20'
                                }`}>
                                  {quote.status}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">Requested: {quote.createdAt}</span>
                            </div>

                            {quote.quotePrice ? (
                              <div className="text-right">
                                <span className="text-xs text-slate-400 block">Wholesale Quote</span>
                                <span className="text-base font-black text-emerald-400">
                                  ${quote.quotePrice.toLocaleString()} CAD
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                                Pricing in Calculation
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <img
                              src={quote.productImg}
                              alt={quote.productName}
                              className="w-12 h-12 object-cover rounded-xl border border-white/10"
                            />
                            <div>
                              <h5 className="text-sm font-bold text-white">{quote.productName}</h5>
                              <p className="text-xs text-slate-400">
                                SKU: {quote.productSku} • Qty: {quote.quantity} • Company: {quote.company}
                              </p>
                            </div>
                          </div>

                          {quote.adminNotes && (
                            <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl text-xs space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB800] block">
                                Desk Technical Reply
                              </span>
                              <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                                {quote.adminNotes}
                              </p>
                            </div>
                          )}

                          {quote.status === 'QUOTE_SENT' && (
                            <div className="pt-2 flex justify-end">
                              <button
                                onClick={() => alert(`Simulated Stripe payment initiated for approved quotation ${quote.id}.`)}
                                className="bg-[#FFB800] hover:bg-white text-black font-black px-5 py-2.5 rounded-xl uppercase tracking-widest text-[10px] flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FFB800]/20"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Accept & Pay via Stripe</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: WISHLIST */}
              {customerPortalTab === 'wishlist' && (
                <div className="space-y-5 max-w-4xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Wishlist</h3>
                    <p className="text-xs text-slate-400">Saved machinery and components for future procurement.</p>
                  </div>

                  {wishlistProducts.length === 0 ? (
                    <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 text-xs">
                      Your wishlist is empty. Tap the heart icon on any product to save it here.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistProducts.map(p => (
                        <div key={p.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-4 flex gap-3 items-center">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-16 h-16 object-cover rounded-xl border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{p.name}</h5>
                            <span className="text-[10px] text-slate-400 block">SKU: {p.sku}</span>
                            <span className="text-xs font-black text-[#FFB800] block mt-1">
                              ${p.sellingPrice.toLocaleString()} CAD
                            </span>
                          </div>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors cursor-pointer"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PROFILE */}
              {customerPortalTab === 'profile' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">Profile Details</h3>
                      <p className="text-xs text-slate-400">Manage your business contact credentials and shipping records.</p>
                    </div>

                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {profileSaveSuccess && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Profile updated successfully in mock system state!</span>
                    </div>
                  )}

                  {isEditingProfile ? (
                    <form onSubmit={handleSaveProfile} className="space-y-4 bg-white/[0.02] border border-white/10 p-6 rounded-3xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={profileName}
                            onChange={e => setProfileName(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={profileEmail}
                            onChange={e => setProfileEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={profilePhone}
                            onChange={e => setProfilePhone(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                            Company Name (Optional)
                          </label>
                          <input
                            type="text"
                            value={profileCompany}
                            onChange={e => setProfileCompany(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                          Default Primary Shipping Address
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={profileStreet}
                            onChange={e => setProfileStreet(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                          <input
                            type="text"
                            placeholder="City"
                            value={profileCity}
                            onChange={e => setProfileCity(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                          <input
                            type="text"
                            placeholder="Province / State"
                            value={profileState}
                            onChange={e => setProfileState(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                          <input
                            type="text"
                            placeholder="Postal / ZIP Code"
                            value={profilePostal}
                            onChange={e => setProfilePostal(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                          />
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#FFB800] hover:bg-white text-black font-black px-6 py-2 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Name</span>
                          <span className="text-white font-bold">{currentCustomer.name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Email</span>
                          <span className="text-white font-mono">{currentCustomer.email}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Phone</span>
                          <span className="text-white font-mono">{currentCustomer.phone}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Company</span>
                          <span className="text-white">{currentCustomer.company || 'Heavy Earthworks Inc.'}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                          Primary Delivery Address
                        </span>
                        <p className="text-xs text-slate-300">
                          {currentCustomer.addresses?.[0]
                            ? `${currentCustomer.addresses[0].street}, ${currentCustomer.addresses[0].city}, ${currentCustomer.addresses[0].state} ${currentCustomer.addresses[0].postalCode}`
                            : '7400 Barlow Trail SE, Calgary, AB T2C 2V4, Canada'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: ADDRESSES */}
              {customerPortalTab === 'addresses' && (
                <div className="space-y-5 max-w-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">Saved Addresses</h3>
                      <p className="text-xs text-slate-400">Shipping terminals and billing addresses on file.</p>
                    </div>

                    <button
                      onClick={() => setShowAddAddress(!showAddAddress)}
                      className="bg-[#FFB800] hover:bg-white text-black font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Address</span>
                    </button>
                  </div>

                  {showAddAddress && (
                    <form onSubmit={handleAddNewAddress} className="bg-white/[0.02] border border-[#FFB800]/30 p-5 rounded-3xl space-y-3">
                      <h4 className="text-xs font-black uppercase text-[#FFB800]">Add New Terminal / Facility Address</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={newStreet}
                          onChange={e => setNewStreet(e.target.value)}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                        <input
                          type="text"
                          placeholder="City"
                          value={newCity}
                          onChange={e => setNewCity(e.target.value)}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                        <input
                          type="text"
                          placeholder="Province / State"
                          value={newState}
                          onChange={e => setNewState(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                        <input
                          type="text"
                          placeholder="Postal / ZIP"
                          value={newPostal}
                          onChange={e => setNewPostal(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#FFB800] text-black font-bold px-4 py-1.5 rounded-lg text-xs cursor-pointer"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(currentCustomer.addresses || []).map(addr => (
                      <div key={addr.id} className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl relative space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/20">
                            {addr.type} {addr.isDefault ? '• DEFAULT' : ''}
                          </span>
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleRemoveAddress(addr.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs font-bold text-white leading-relaxed">{addr.street}</p>
                        <p className="text-xs text-slate-400">
                          {addr.city}, {addr.state} {addr.postalCode} • {addr.country}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: NOTIFICATIONS */}
              {customerPortalTab === 'notifications' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Notifications</h3>
                    <p className="text-xs text-slate-400">Real-time alerts regarding order dispatches and quotes.</p>
                  </div>

                  <div className="space-y-2.5">
                    {notifications.filter(n => n.recipientRole === 'customer').map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
                          notif.read
                            ? 'bg-white/[0.01] border-white/5 opacity-60'
                            : 'bg-white/[0.03] border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{notif.title}</span>
                          <span className="text-[10px] text-slate-500">{notif.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {customerPortalTab === 'settings' && (
                <div className="space-y-6 max-w-xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Account Settings</h3>
                    <p className="text-xs text-slate-400">Notification preferences and security.</p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div>
                        <span className="font-bold text-white block">Email Order Notifications</span>
                        <span className="text-slate-400 text-[11px]">Receive bill of lading and dispatch notices</span>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-[#FFB800] w-4 h-4 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div>
                        <span className="font-bold text-white block">Instant RFQ Responses</span>
                        <span className="text-slate-400 text-[11px]">Push alert when engineering desk prices quotes</span>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-[#FFB800] w-4 h-4 cursor-pointer" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">Currency Preference</span>
                        <span className="text-slate-400 text-[11px]">Default pricing display currency</span>
                      </div>
                      <span className="font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded border border-white/10">
                        CAD ($)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
