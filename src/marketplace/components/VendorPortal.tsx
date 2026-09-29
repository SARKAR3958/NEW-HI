import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  FileText,
  Warehouse,
  TrendingUp,
  DollarSign,
  Bell,
  MessageSquare,
  Building2,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  MoreVertical,
  Edit2,
  Copy,
  Trash2,
  Eye,
  Truck,
  ShieldAlert,
  Info,
  ChevronRight,
  Check,
  Search
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  MarketplaceProduct,
  MarketplaceOrder,
  VendorFulfillmentStatus,
  ProductApprovalStatus
} from '../types';

export const VendorPortal: React.FC = () => {
  const {
    showVendorPortal,
    setShowVendorPortal,
    currentVendor,
    logoutVendor,
    products,
    orders,
    quotes,
    notifications,
    addVendorProduct,
    updateVendorOrderStatus,
    markNotificationAsRead
  } = useMarketplace();

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Product Filter State
  const [productFilter, setProductFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState<string>('');

  // Add Product Form State
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState('Undercarriage Parts');
  const [pSubcategory, setPSubcategory] = useState('Track Chains & Rollers');
  const [pDescription, setPDescription] = useState('');
  const [pSku, setPSku] = useState('');
  const [pBrand, setPBrand] = useState('KOMATSU');
  const [pSpecs, setPSpecs] = useState('');
  const [pSupplierCost, setPSupplierCost] = useState<number>(800);
  const [pStock, setPStock] = useState<number>(15);
  const [pMoq, setPMoq] = useState<number>(1);
  const [pWeight, setPWeight] = useState('340 kg');
  const [pDimensions, setPDimensions] = useState('140 x 80 x 60 cm');
  const [pImageUrl, setPImageUrl] = useState(
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  );
  const [addProductSuccess, setAddProductSuccess] = useState<string | null>(null);

  // Selected Order for Details Drawer
  const [selectedOrder, setSelectedOrder] = useState<MarketplaceOrder | null>(null);

  if (!showVendorPortal || !currentVendor) return null;

  // Products belonging to this vendor
  const vendorProducts = products.filter(p => p.vendorId === currentVendor.id);

  // Orders belonging to this vendor
  const vendorOrders = orders.filter(
    o => o.vendorId === currentVendor.id || o.items.some(i => i.vendorId === currentVendor.id)
  );

  // Quotes belonging to this vendor
  const vendorQuotes = quotes.filter(q => q.vendorId === currentVendor.id);

  // Notifications for vendor
  const vendorNotifs = notifications.filter(n => n.recipientRole === 'vendor');

  // Stats calculation
  const totalProducts = vendorProducts.length;
  const pendingApprovalProducts = vendorProducts.filter(p => p.status === 'PENDING_REVIEW').length;
  const approvedProducts = vendorProducts.filter(p => p.status === 'APPROVED').length;
  const totalOrders = vendorOrders.length;
  const pendingOrders = vendorOrders.filter(
    o => o.vendorFulfillmentStatus === 'RECEIVED' || o.vendorFulfillmentStatus === 'PROCESSING'
  ).length;
  const completedOrders = vendorOrders.filter(
    o => o.vendorFulfillmentStatus === 'COMPLETED' || o.orderStatus === 'DELIVERED'
  ).length;
  const quoteRequests = vendorQuotes.length;
  const totalRevenue = vendorOrders.reduce((acc, o) => acc + (o.supplierCostTotal || o.totalAmount * 0.8), 0);

  // Filtered products list
  const filteredProducts = vendorProducts.filter(p => {
    const matchesFilter =
      productFilter === 'all' ||
      (productFilter === 'approved' && p.status === 'APPROVED') ||
      (productFilter === 'pending' && p.status === 'PENDING_REVIEW') ||
      (productFilter === 'draft' && p.status === 'DRAFT') ||
      (productFilter === 'rejected' && (p.status === 'REJECTED' || p.status === 'CHANGES_REQUIRED'));
    const matchesSearch =
      !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateProduct = (asDraft: boolean) => {
    if (!pName || !pSku || !pSupplierCost) {
      alert('Please fill in Product Name, SKU, and Supplier Cost.');
      return;
    }

    const created = addVendorProduct({
      name: pName,
      category: pCategory,
      subcategory: pSubcategory,
      sku: pSku,
      brand: pBrand,
      description: pDescription || 'High quality heavy equipment replacement component manufactured to OEM specifications.',
      specifications: pSpecs || 'Material: Forged Manganese Steel. Warranty: 12 Months / 2,000 Operating Hours.',
      imageUrl: pImageUrl,
      supplierCost: Number(pSupplierCost),
      pricingType: 'FIXED',
      stock: Number(pStock),
      moq: Number(pMoq),
      weight: pWeight,
      dimensions: pDimensions,
      vendorId: currentVendor.id,
      vendorName: currentVendor.companyName
    });

    setAddProductSuccess(`Product "${created.name}" submitted! Status: PENDING REVIEW by Marketplace Administrator.`);
    setTimeout(() => {
      setAddProductSuccess(null);
      setActiveTab('products');
    }, 2200);

    // Reset form
    setPName('');
    setPSku('');
    setPDescription('');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'My Products', icon: Package, badge: vendorProducts.length },
    { id: 'add-product', label: 'Add Product', icon: PlusCircle },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrders > 0 ? pendingOrders : undefined },
    { id: 'quotes', label: 'Quote Requests', icon: FileText, badge: quoteRequests > 0 ? quoteRequests : undefined },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: vendorNotifs.filter(n => !n.read).length },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Business Profile', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4400] flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVendorPortal(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative z-10 w-full max-w-7xl h-[92vh] max-h-[900px] bg-[#070C16] border border-white/15 rounded-[32px] overflow-hidden shadow-2xl flex flex-col text-white"
        >
          {/* Top Brand Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#FFB800] to-yellow-400 shrink-0"></div>

          {/* Portal Top Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#FFB800] flex items-center justify-center font-black">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                    {currentVendor.companyName}
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Vendor</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Vendor ID: {currentVendor.id} • {currentVendor.category} • {currentVendor.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowVendorPortal(false);
                  logoutVendor();
                }}
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
              <button
                onClick={() => setShowVendorPortal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Portal Body: Desktop Left Sidebar + Mobile Bottom Nav */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/25 p-3 sm:p-4 shrink-0 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto">
              <div className="flex md:flex-col gap-1 w-full">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20 font-black'
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
                            isActive ? 'bg-black text-white' : 'bg-amber-500/20 text-[#FFB800]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Action */}
              <div className="hidden md:block pt-3 border-t border-white/10 mt-auto">
                <button
                  onClick={() => setActiveTab('add-product')}
                  className="w-full bg-white/5 hover:bg-[#FFB800] text-slate-300 hover:text-black font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>New Product Listing</span>
                </button>
              </div>
            </aside>

            {/* Main Content Viewport */}
            <main className="flex-1 p-4 sm:p-7 overflow-y-auto bg-gradient-to-b from-[#070C16] to-[#03060C]">
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 max-w-6xl">
                  {/* Notice Banner */}
                  <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 p-4 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-[#FFB800] shrink-0" />
                      <p className="text-xs text-slate-200">
                        <strong className="text-[#FFB800] font-bold">Marketplace Pricing Rule:</strong> Your entered Supplier Cost is protected and visible only to your portal and the marketplace administrator. The customer selling price is maintained by the admin desk.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('add-product')}
                      className="bg-[#FFB800] hover:bg-white text-black font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider shrink-0 cursor-pointer"
                    >
                      Add Product
                    </button>
                  </div>

                  {/* 8 Metric Cards specified in prompt */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Total Products</span>
                      <div className="text-2xl font-black text-white mt-1">{totalProducts}</div>
                      <span className="text-[10px] text-slate-500">In catalog</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-amber-400 block">Pending Approval</span>
                      <div className="text-2xl font-black text-[#FFB800] mt-1">{pendingApprovalProducts}</div>
                      <span className="text-[10px] text-slate-500">Awaiting admin review</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-emerald-400 block">Approved Products</span>
                      <div className="text-2xl font-black text-emerald-400 mt-1">{approvedProducts}</div>
                      <span className="text-[10px] text-slate-500">Live on storefront</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-sky-400 block">Total Orders</span>
                      <div className="text-2xl font-black text-sky-400 mt-1">{totalOrders}</div>
                      <span className="text-[10px] text-slate-500">Dispatches</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-amber-300 block">Pending Orders</span>
                      <div className="text-2xl font-black text-amber-300 mt-1">{pendingOrders}</div>
                      <span className="text-[10px] text-slate-500">Require fulfillment</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-teal-400 block">Completed Orders</span>
                      <div className="text-2xl font-black text-teal-400 mt-1">{completedOrders}</div>
                      <span className="text-[10px] text-slate-500">Delivered</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-purple-400 block">Quote Requests</span>
                      <div className="text-2xl font-black text-purple-400 mt-1">{quoteRequests}</div>
                      <span className="text-[10px] text-slate-500">Custom RFQs</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-emerald-400 block">Total Revenue</span>
                      <div className="text-2xl font-black text-white mt-1">
                        ${Math.round(totalRevenue).toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-500">Supplier payout basis</span>
                    </div>
                  </div>

                  {/* Interactive Mock Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Revenue Trend Chart */}
                    <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-white">
                            Quarterly Revenue Payout Performance
                          </h4>
                          <span className="text-[10px] text-slate-400">Supplier net settlement (CAD)</span>
                        </div>
                        <span className="text-xs font-mono font-black text-[#FFB800]">+24.8% QoQ</span>
                      </div>

                      {/* Realistic Bar Chart Visualizer */}
                      <div className="h-44 flex items-end justify-between gap-3 pt-4 border-b border-white/10 px-2">
                        {[
                          { month: 'Oct', val: 28, amt: '$28k' },
                          { month: 'Nov', val: 42, amt: '$42k' },
                          { month: 'Dec', val: 35, amt: '$35k' },
                          { month: 'Jan', val: 58, amt: '$58k' },
                          { month: 'Feb', val: 72, amt: '$72k' },
                          { month: 'Mar', val: 86, amt: '$86k' }
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                            <span className="text-[9px] font-mono text-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity">
                              {bar.amt}
                            </span>
                            <div
                              style={{ height: `${bar.val}%` }}
                              className="w-full bg-gradient-to-t from-amber-500/20 to-[#FFB800] rounded-t-lg group-hover:brightness-125 transition-all"
                            ></div>
                            <span className="text-[10px] text-slate-400 font-bold">{bar.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Fulfillment Breakdown */}
                    <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        Fulfillment Distribution
                      </h4>
                      <div className="space-y-3 pt-2">
                        {[
                          { label: 'Completed & Delivered', count: completedOrders, pct: 65, color: 'bg-emerald-400' },
                          { label: 'Processing & In Transit', count: pendingOrders, pct: 25, color: 'bg-[#FFB800]' },
                          { label: 'Pending Dispatch Inspection', count: 1, pct: 10, color: 'bg-sky-400' }
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-300">{item.label}</span>
                              <span className="font-bold text-white">{item.count} orders ({item.pct}%)</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                              <div style={{ width: `${item.pct}%` }} className={`h-full ${item.color} rounded-full`}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders Table */}
                  <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        Assigned Orders for Your Inventory
                      </h4>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-[#FFB800] hover:underline cursor-pointer"
                      >
                        View all orders ({vendorOrders.length})
                      </button>
                    </div>

                    {vendorOrders.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-xs">
                        No orders assigned to your supplier catalog yet.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="text-[10px] uppercase text-slate-500 border-b border-white/5">
                            <tr>
                              <th className="pb-2">Order ID</th>
                              <th className="pb-2">Customer</th>
                              <th className="pb-2">Fulfillment</th>
                              <th className="pb-2">Items</th>
                              <th className="pb-2">Date</th>
                              <th className="pb-2 text-right">Supplier Payout</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {vendorOrders.slice(0, 4).map(o => (
                              <tr key={o.id} className="hover:bg-white/[0.02]">
                                <td className="py-3 font-mono font-bold text-white">{o.id}</td>
                                <td className="py-3 text-slate-300">{o.customerName}</td>
                                <td className="py-3">
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-[#FFB800] border border-amber-500/20">
                                    {o.vendorFulfillmentStatus}
                                  </span>
                                </td>
                                <td className="py-3 text-slate-400">{o.items.length} units</td>
                                <td className="py-3 text-slate-500">{o.createdAt}</td>
                                <td className="py-3 text-right font-mono font-bold text-emerald-400">
                                  ${((o.supplierCostTotal || o.totalAmount * 0.8) || 0).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MY PRODUCTS (Requirement 9) */}
              {activeTab === 'products' && (
                <div className="space-y-5 max-w-6xl">
                  {/* Top Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-white">
                        My Products
                      </h3>
                      <p className="text-xs text-slate-400">
                        Manage catalog listings, monitor approval status, and update supplier costs.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('add-product')}
                      className="bg-[#FFB800] hover:bg-white text-black font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Filters & Search */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search product name or SKU..."
                        value={productSearch}
                        onChange={e => setProductSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'approved', label: 'Approved' },
                        { id: 'pending', label: 'Pending Review' },
                        { id: 'draft', label: 'Draft' },
                        { id: 'rejected', label: 'Rejected/Changes' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setProductFilter(f.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                            productFilter === f.id
                              ? 'bg-[#FFB800] text-black'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Products Table (Desktop) / Cards (Mobile) */}
                  {filteredProducts.length === 0 ? (
                    <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 text-xs">
                      No products match your criteria. Click "Add New Product" to submit a listing.
                    </div>
                  ) : (
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="text-[10px] uppercase text-slate-400 bg-white/[0.02] border-b border-white/10">
                            <tr>
                              <th className="py-3 px-4">Image</th>
                              <th className="py-3 px-4">Product</th>
                              <th className="py-3 px-4">SKU</th>
                              <th className="py-3 px-4">Supplier Cost</th>
                              <th className="py-3 px-4">Stock</th>
                              <th className="py-3 px-4">Status</th>
                              <th className="py-3 px-4">Submitted</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {filteredProducts.map(p => (
                              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4">
                                  <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-12 h-12 object-cover rounded-xl border border-white/10"
                                  />
                                </td>
                                <td className="py-3 px-4">
                                  <span className="font-bold text-white block">{p.name}</span>
                                  <span className="text-[10px] text-slate-400">
                                    {p.brand} • {p.category}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-mono text-slate-300">{p.sku}</td>
                                <td className="py-3 px-4">
                                  <span className="font-mono font-bold text-[#FFB800]">
                                    ${p.supplierCost.toLocaleString()} CAD
                                  </span>
                                  <span className="text-[9px] text-slate-500 block">Confidential</span>
                                </td>
                                <td className="py-3 px-4 font-mono">{p.stock} units</td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                                      p.status === 'APPROVED'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : p.status === 'PENDING_REVIEW'
                                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                                        : p.status === 'REJECTED'
                                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                    }`}
                                  >
                                    {p.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-slate-500">{p.createdAt}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => alert(`Viewing product: ${p.name}`)}
                                      className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/5 cursor-pointer"
                                      title="View"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => alert(`Edit product: ${p.sku}`)}
                                      className="p-1.5 text-slate-400 hover:text-[#FFB800] rounded hover:bg-white/5 cursor-pointer"
                                      title="Edit"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ADD PRODUCT (Requirement 9 & 10) */}
              {activeTab === 'add-product' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Add New Product</h3>
                    <p className="text-xs text-slate-400">
                      Submit machine component specifications and wholesale supplier cost for administrator verification.
                    </p>
                  </div>

                  {/* CRITICAL NOTICE PER SPEC */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-black uppercase tracking-wider text-[#FFB800] block">
                        Confidential Pricing Notice
                      </span>
                      <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                        "Supplier Cost is visible only to you and the marketplace administrator. The final customer selling price is controlled by the administrator."
                      </p>
                    </div>
                  </div>

                  {addProductSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{addProductSuccess}</span>
                    </div>
                  )}

                  <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Variable Displacement Piston Pump A10VSO"
                          value={pName}
                          onChange={e => setPName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Category *
                        </label>
                        <select
                          value={pCategory}
                          onChange={e => setPCategory(e.target.value)}
                          className="w-full bg-[#0B1120] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        >
                          <option value="Undercarriage Parts">Undercarriage Parts</option>
                          <option value="Hydraulic Pumps & Motors">Hydraulic Pumps & Motors</option>
                          <option value="Engine Components">Engine Components</option>
                          <option value="Transmission & Final Drive">Transmission & Final Drive</option>
                          <option value="Ground Engaging Tools (G.E.T.)">Ground Engaging Tools (G.E.T.)</option>
                          <option value="Buckets & Attachments">Buckets & Attachments</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Subcategory
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Main Hydraulic Pumps"
                          value={pSubcategory}
                          onChange={e => setPSubcategory(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          SKU / Part Number *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 708-2L-00300"
                          value={pSku}
                          onChange={e => setPSku(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Brand Compatibility
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., KOMATSU / CAT"
                          value={pBrand}
                          onChange={e => setPBrand(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="pt-3 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-[#FFB800] block mb-1">
                          Supplier Cost (CAD $) *
                        </label>
                        <input
                          type="number"
                          value={pSupplierCost}
                          onChange={e => setPSupplierCost(Number(e.target.value))}
                          className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#FFB800] focus:outline-none"
                        />
                        <span className="text-[9px] text-slate-500 mt-1 block">Your confidential payout price</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Stock Quantity *
                        </label>
                        <input
                          type="number"
                          value={pStock}
                          onChange={e => setPStock(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Minimum Order Qty (MOQ)
                        </label>
                        <input
                          type="number"
                          value={pMoq}
                          onChange={e => setPMoq(Number(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>
                    </div>

                    {/* Weight & Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Product Weight
                        </label>
                        <input
                          type="text"
                          value={pWeight}
                          onChange={e => setPWeight(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                          Dimensions (L x W x H)
                        </label>
                        <input
                          type="text"
                          value={pDimensions}
                          onChange={e => setPDimensions(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={pImageUrl}
                        onChange={e => setPImageUrl(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Technical Specifications
                      </label>
                      <textarea
                        rows={2}
                        value={pSpecs}
                        onChange={e => setPSpecs(e.target.value)}
                        placeholder="e.g., Displacement: 140cc, Max Pressure: 350 bar, Shaft Type: Splined"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FFB800]"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
                        Flow: DRAFT → PENDING REVIEW → ADMIN APPROVAL
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleCreateProduct(true)}
                          className="px-4 py-2.5 rounded-xl text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                        >
                          Save Draft
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCreateProduct(false)}
                          className="bg-[#FFB800] hover:bg-white text-black font-black px-6 py-2.5 rounded-xl uppercase tracking-wider text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#FFB800]/20"
                        >
                          <span>Submit for Review</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: ORDERS (Requirement 11) */}
              {activeTab === 'orders' && (
                <div className="space-y-5 max-w-6xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Vendor Orders</h3>
                    <p className="text-xs text-slate-400">
                      Orders matching your warehouse supplier listings. Update fulfillment milestones.
                    </p>
                  </div>

                  {vendorOrders.length === 0 ? (
                    <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 text-xs">
                      No commercial dispatches currently queued for your company.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {vendorOrders.map(order => (
                        <div
                          key={order.id}
                          className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-4"
                        >
                          {/* Top Info */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-sm text-white">{order.id}</span>
                                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  Payment: {order.paymentStatus}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400">
                                Customer: {order.customerName} ({order.customerEmail}) • Placed: {order.createdAt}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-xs text-slate-400 block">Your Payout</span>
                              <span className="text-base font-black text-emerald-400 font-mono">
                                ${((order.supplierCostTotal || order.totalAmount * 0.8) || 0).toLocaleString()} CAD
                              </span>
                            </div>
                          </div>

                          {/* Customer Delivery Information */}
                          <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 text-xs space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB800] block">
                              Shipping & Terminal Delivery Information
                            </span>
                            <p className="text-slate-300 font-medium">
                              {order.shippingAddress || '7400 Barlow Trail SE, Calgary, AB T2C 2V4, Canada'}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Recipient Phone: {order.customerPhone || '+1 (403) 555-0199'}
                            </p>
                          </div>

                          {/* Products in this order */}
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    className="w-10 h-10 object-cover rounded-lg border border-white/10"
                                  />
                                  <div>
                                    <span className="font-bold text-white block">{item.productName}</span>
                                    <span className="text-[10px] text-slate-400">
                                      SKU: {item.sku} • Qty: {item.quantity}
                                    </span>
                                  </div>
                                </div>
                                <span className="font-mono text-white font-bold">
                                  ${((item.unitSupplierCost || item.unitPrice * 0.8) * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Fulfillment Status Updater (Requirement 11) */}
                          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-[#FFB800]" />
                              <span className="text-xs text-slate-300">
                                Fulfillment Status:{' '}
                                <strong className="text-white uppercase font-black">
                                  {order.vendorFulfillmentStatus}
                                </strong>
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] uppercase text-slate-400 font-bold">Update Stage:</span>
                              {(
                                [
                                  'RECEIVED',
                                  'PROCESSING',
                                  'READY_FOR_DISPATCH',
                                  'SHIPPED',
                                  'COMPLETED'
                                ] as VendorFulfillmentStatus[]
                              ).map(st => (
                                <button
                                  key={st}
                                  onClick={() => updateVendorOrderStatus(order.id, st)}
                                  className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                                    order.vendorFulfillmentStatus === st
                                      ? 'bg-[#FFB800] text-black font-black'
                                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                  }`}
                                >
                                  {st.replace(/_/g, ' ')}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: QUOTE REQUESTS */}
              {activeTab === 'quotes' && (
                <div className="space-y-5 max-w-5xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Quote Requests</h3>
                    <p className="text-xs text-slate-400">Commercial buyer RFQ inquiries on your components.</p>
                  </div>

                  {vendorQuotes.length === 0 ? (
                    <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl text-slate-400 text-xs">
                      No customer RFQs currently pending for your listed components.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {vendorQuotes.map(q => (
                        <div key={q.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-mono font-bold text-sm text-white">{q.id}</span>
                              <span className="text-xs text-slate-400 block">Requested by: {q.customerName} ({q.company})</span>
                            </div>
                            <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
                              {q.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300">
                            <strong>Part:</strong> {q.productName} (SKU: {q.productSku}) • <strong>Qty:</strong> {q.quantity}
                          </div>
                          {q.requirements && (
                            <p className="text-xs text-slate-400 italic">Requirements: "{q.requirements}"</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: INVENTORY */}
              {activeTab === 'inventory' && (
                <div className="space-y-5 max-w-5xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Warehouse Inventory</h3>
                    <p className="text-xs text-slate-400">Live stock counts and reorder thresholds.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {vendorProducts.map(p => (
                      <div key={p.id} className="bg-white/[0.02] border border-white/10 p-4 rounded-3xl space-y-3">
                        <div className="flex items-center gap-3">
                          <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-white/10" />
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-bold text-white block truncate">{p.name}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">{p.sku}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                          <span className="text-slate-400">Current Stock:</span>
                          <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                            {p.stock} units
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: ANALYTICS & EARNINGS */}
              {(activeTab === 'analytics' || activeTab === 'earnings') && (
                <div className="space-y-6 max-w-4xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">
                      Financial Settlements & Earnings
                    </h3>
                    <p className="text-xs text-slate-400">
                      Wholesale disbursement statements and verified banking profile.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Gross Dispatched</span>
                      <div className="text-2xl font-black text-white mt-1">
                        ${Math.round(totalRevenue).toLocaleString()} CAD
                      </div>
                      <span className="text-[10px] text-emerald-400">Settled automatically</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Next Payout Batch</span>
                      <div className="text-2xl font-black text-[#FFB800] mt-1">$18,400 CAD</div>
                      <span className="text-[10px] text-slate-400">Friday, Weekly Wire</span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Fulfillment Score</span>
                      <div className="text-2xl font-black text-emerald-400 mt-1">99.4%</div>
                      <span className="text-[10px] text-slate-400">Top Tier Supplier</span>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl space-y-3">
                    <h4 className="text-xs font-black uppercase text-white">Registered Banking Destination</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Institution</span>
                        <span className="text-white font-bold">Royal Bank of Canada</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Account</span>
                        <span className="font-mono text-white">•••• •••• 9412</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Transit</span>
                        <span className="font-mono text-white">003-09412</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Status</span>
                        <span className="text-emerald-400 font-bold">Verified Direct Deposit</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Vendor Notifications</h3>
                    <p className="text-xs text-slate-400">System alerts and order dispatches.</p>
                  </div>

                  <div className="space-y-2">
                    {vendorNotifs.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
                          n.read ? 'bg-white/[0.01] border-white/5 opacity-60' : 'bg-white/[0.03] border-white/15'
                        }`}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-bold text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-300">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 9: BUSINESS PROFILE & SETTINGS */}
              {(activeTab === 'profile' || activeTab === 'settings' || activeTab === 'messages') && (
                <div className="space-y-5 max-w-2xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Business Profile</h3>
                    <p className="text-xs text-slate-400">Verified corporate entity information.</p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Company Legal Name</span>
                        <span className="text-white font-bold">{currentVendor.companyName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Lead Contact</span>
                        <span className="text-white">{currentVendor.contactName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Email</span>
                        <span className="text-white font-mono">{currentVendor.email}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Phone</span>
                        <span className="text-white font-mono">{currentVendor.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Warehouse Terminal</span>
                        <span className="text-white">{currentVendor.city}, {currentVendor.country}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Compliance Badges</span>
                        <span className="text-[#FFB800] font-bold">
                          {currentVendor.verifiedBadges?.join(' • ') || 'ISO 9001'}
                        </span>
                      </div>
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
