import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  TrendingUp,
  Package,
  Building2,
  FileText,
  ShoppingBag,
  Users,
  Search,
  ArrowRight,
  Eye,
  Sliders,
  Percent,
  Check,
  Ban,
  FileCheck
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  PricingType,
  MarketplaceProduct,
  VendorApplication,
  MarketplaceOrder,
  MarketplaceQuote
} from '../types';

export const AdminPortal: React.FC = () => {
  const {
    showAdminPortal,
    setShowAdminPortal,
    logoutAdmin,
    vendorApplications,
    approveVendorApplication,
    rejectVendorApplication,
    requestVendorChanges,
    products,
    approveProduct,
    rejectProduct,
    requestProductChanges,
    orders,
    updateOrderStatus,
    assignOrderVendor,
    quotes,
    respondToQuote,
    rejectQuote,
    vendors,
    suspendVendor,
    reactivateVendor
  } = useMarketplace();

  const [adminTab, setAdminTab] = useState<'products' | 'applications' | 'orders' | 'quotes' | 'vendors'>('products');

  // Application Review State
  const [selectedApp, setSelectedApp] = useState<VendorApplication | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectAppModal, setShowRejectAppModal] = useState(false);
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [changesText, setChangesText] = useState('Please re-upload a higher resolution copy of CRA GST certificate and verify your bank transit number.');

  // Product Pricing Editor Modal State (Requirement 10)
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [editSellingPrice, setEditSellingPrice] = useState<number>(950);
  const [editPricingType, setEditPricingType] = useState<PricingType>('FIXED');
  const [adminProductNotes, setAdminProductNotes] = useState('');
  const [productRejectReason, setProductRejectReason] = useState('');
  const [showRejectProductModal, setShowRejectProductModal] = useState(false);

  // Quote Pricing State
  const [selectedQuote, setSelectedQuote] = useState<MarketplaceQuote | null>(null);
  const [quoteOfferPrice, setQuoteOfferPrice] = useState<number>(4500);
  const [quoteNotes, setQuoteNotes] = useState('Special volume discount applied for fleet maintenance account.');

  if (!showAdminPortal) return null;

  // Real-time Margin Calculations for Selected Product (Requirement 10)
  const supplierCost = selectedProduct?.supplierCost || 800;
  const sellingPrice = editSellingPrice || 950;
  const marginDollar = sellingPrice - supplierCost;
  const marginPercent = supplierCost > 0 ? ((marginDollar / supplierCost) * 100).toFixed(1) : '0';

  const handleOpenProductPricing = (p: MarketplaceProduct) => {
    setSelectedProduct(p);
    // If not set yet, default to supplierCost + 20%
    setEditSellingPrice(p.sellingPrice || Math.round(p.supplierCost * 1.2));
    setEditPricingType(p.pricingType || 'FIXED');
    setAdminProductNotes(p.adminNotes || '');
  };

  const handleSaveAndApproveProduct = () => {
    if (!selectedProduct) return;
    approveProduct(selectedProduct.id, editSellingPrice, editPricingType, adminProductNotes);
    setSelectedProduct(null);
  };

  const handleRejectProductSubmit = () => {
    if (!selectedProduct) return;
    rejectProduct(selectedProduct.id, productRejectReason || 'Price structure outside market viability.');
    setShowRejectProductModal(false);
    setSelectedProduct(null);
    setProductRejectReason('');
  };

  const handleApproveAppSubmit = (appId: string) => {
    approveVendorApplication(appId, 'Approved by Senior Procurement Officer. Vendor active.');
    if (selectedApp?.id === appId) setSelectedApp(null);
  };

  const handleRejectAppSubmit = () => {
    if (!selectedApp) return;
    rejectVendorApplication(selectedApp.id, rejectReason || 'Insufficient operating history or missing verification records.');
    setShowRejectAppModal(false);
    setSelectedApp(null);
    setRejectReason('');
  };

  const handleChangesAppSubmit = () => {
    if (!selectedApp) return;
    const items = changesText.split('\n').filter(s => s.trim().length > 0);
    requestVendorChanges(selectedApp.id, items);
    setShowChangesModal(false);
    setSelectedApp(null);
  };

  const handleSendQuoteResponse = () => {
    if (!selectedQuote) return;
    respondToQuote(selectedQuote.id, quoteOfferPrice, quoteNotes);
    setSelectedQuote(null);
  };

  const pendingApplicationsCount = vendorApplications.filter(a => a.status === 'PENDING' || a.status === 'UNDER_REVIEW').length;
  const pendingProductsCount = products.filter(p => p.status === 'PENDING_REVIEW').length;
  const pendingQuotesCount = quotes.filter(q => q.status === 'PENDING' || q.status === 'REVIEWING').length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4500] flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAdminPortal(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative z-10 w-full max-w-7xl h-[92vh] max-h-[920px] bg-[#070B14] border border-white/15 rounded-[32px] overflow-hidden shadow-2xl flex flex-col text-white"
        >
          {/* Top Brand Accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-[#FFB800] to-emerald-400 shrink-0"></div>

          {/* Top Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 text-rose-400 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                    Marketplace Administrator Console
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/20">
                    SUPERADMIN
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Global catalog curation, pricing margins control, and vendor vetting desk.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowAdminPortal(false);
                  logoutAdmin();
                }}
                className="text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                Exit Console
              </button>
              <button
                onClick={() => setShowAdminPortal(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="px-6 py-2.5 border-b border-white/10 bg-black/20 flex items-center gap-2 overflow-x-auto shrink-0">
            {[
              { id: 'products', label: 'Product Approvals & Pricing', icon: Package, badge: pendingProductsCount },
              { id: 'applications', label: 'Vendor Applications', icon: FileCheck, badge: pendingApplicationsCount },
              { id: 'orders', label: 'Orders & Dispatch', icon: ShoppingBag, badge: orders.length },
              { id: 'quotes', label: 'RFQ Quotes Desk', icon: FileText, badge: pendingQuotesCount },
              { id: 'vendors', label: 'Suppliers Directory', icon: Building2, badge: vendors.length }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FFB800] text-black shadow-lg shadow-[#FFB800]/20 font-black'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                        isActive ? 'bg-black text-white' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-5 sm:p-7 overflow-y-auto bg-gradient-to-b from-[#070B14] to-[#03060C]">
            {/* ============================================================ */}
            {/* TAB 1: PRODUCT APPROVALS & PRICING CONTROL (Requirement 10)  */}
            {/* ============================================================ */}
            {adminTab === 'products' && (
              <div className="space-y-6 max-w-6xl">
                {/* Explanatory Rule Header */}
                <div className="bg-white/[0.02] border border-white/10 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB800]">
                      Requirement 10 Enforcement
                    </span>
                    <h3 className="text-xl font-black uppercase text-white">
                      Admin Control Over Vendor Pricing
                    </h3>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      Vendors input their <strong className="text-white">Supplier Cost</strong>. As Admin, you review their cost, define the public <strong className="text-[#FFB800]">Customer Selling Price</strong> and <strong className="text-[#FFB800]">Pricing Type</strong>, and monitor your profit margin. Customers never see the supplier cost or margin!
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/20 text-[11px] text-right font-mono">
                    <span className="text-slate-400 block">Pending Review:</span>
                    <span className="text-lg font-black text-[#FFB800]">{pendingProductsCount} items</span>
                  </div>
                </div>

                {/* Products Table */}
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-[10px] uppercase text-slate-400 bg-white/[0.02] border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">Product</th>
                          <th className="py-3 px-4">Vendor</th>
                          <th className="py-3 px-4">Supplier Cost</th>
                          <th className="py-3 px-4">Selling Price (Customer)</th>
                          <th className="py-3 px-4">Margin ($ / %)</th>
                          <th className="py-3 px-4">Pricing Type</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Pricing Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {products.map(p => {
                          const margin = p.sellingPrice - p.supplierCost;
                          const marginPct = p.supplierCost > 0 ? ((margin / p.supplierCost) * 100).toFixed(1) : '0';
                          return (
                            <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-10 h-10 object-cover rounded-xl border border-white/10"
                                  />
                                  <div>
                                    <span className="font-bold text-white block">{p.name}</span>
                                    <span className="text-[10px] font-mono text-slate-400">SKU: {p.sku}</span>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="font-medium text-slate-300 block">{p.vendorName}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{p.vendorId}</span>
                              </td>

                              {/* Supplier Cost (Admin sees this, customer NEVER sees this) */}
                              <td className="py-3.5 px-4 font-mono">
                                <span className="text-slate-300 font-bold">
                                  ${p.supplierCost.toLocaleString()} CAD
                                </span>
                                <span className="text-[9px] text-rose-400 block font-semibold">Vendor baseline</span>
                              </td>

                              {/* Customer Selling Price */}
                              <td className="py-3.5 px-4 font-mono">
                                <span className="text-[#FFB800] font-black text-sm">
                                  ${p.sellingPrice.toLocaleString()} CAD
                                </span>
                                <span className="text-[9px] text-emerald-400 block">Public price</span>
                              </td>

                              {/* Margin */}
                              <td className="py-3.5 px-4 font-mono">
                                <span className={margin >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                  +${margin.toLocaleString()} CAD
                                </span>
                                <span className="text-[10px] text-slate-400 block">
                                  ({marginPct}% margin)
                                </span>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="text-[10px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-300">
                                  {p.pricingType || 'FIXED'}
                                </span>
                              </td>

                              <td className="py-3.5 px-4">
                                <span
                                  className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                    p.status === 'APPROVED'
                                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                      : p.status === 'PENDING_REVIEW'
                                      ? 'bg-amber-500/10 text-[#FFB800] border-amber-500/20'
                                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <button
                                  onClick={() => handleOpenProductPricing(p)}
                                  className="bg-[#FFB800] hover:bg-white text-black font-black px-3.5 py-1.5 rounded-xl uppercase text-[10px] tracking-wider transition-colors cursor-pointer shadow-sm"
                                >
                                  Control Pricing
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 2: VENDOR APPLICATIONS REVIEW (Requirement 6 & 7)        */}
            {/* ============================================================ */}
            {adminTab === 'applications' && (
              <div className="space-y-6 max-w-6xl">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Vendor Vetting & Registration Verification
                  </h3>
                  <p className="text-xs text-slate-400">
                    Review incoming multi-step supplier submissions, verify uploaded tax/corporate documents, and approve vendor dashboard activation.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {vendorApplications.map(app => (
                    <div
                      key={app.id}
                      className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4 hover:border-white/20 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#FFB800]">{app.id}</span>
                            <span
                              className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                                app.status === 'APPROVED'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : app.status === 'PENDING'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                                  : app.status === 'REJECTED'
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                  : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">Submitted on {app.submittedDate}</span>
                        </div>

                        {/* Admin Action Buttons */}
                        <div className="flex items-center gap-2">
                          {app.status !== 'APPROVED' && (
                            <button
                              onClick={() => handleApproveAppSubmit(app.id)}
                              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Approve Application</span>
                            </button>
                          )}

                          {app.status !== 'REJECTED' && (
                            <button
                              onClick={() => {
                                setSelectedApp(app);
                                setShowRejectAppModal(true);
                              }}
                              className="bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                            >
                              Reject
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setShowChangesModal(true);
                            }}
                            className="bg-white/5 hover:bg-white/10 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-white/10 transition-colors cursor-pointer"
                          >
                            Request Changes
                          </button>
                        </div>
                      </div>

                      {/* Business & Account Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block">Company Name</span>
                          <span className="font-bold text-white">{app.businessName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block">Lead Contact</span>
                          <span className="text-slate-300">{app.fullName} ({app.email})</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block">Warehouse Terminal</span>
                          <span className="text-slate-300">{app.city}, {app.state} • {app.country}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block">Est. Products & Orders</span>
                          <span className="text-slate-300">{app.productCountEstimated} • {app.expectedMonthlyOrders}</span>
                        </div>
                      </div>

                      {/* Verification Documents Uploaded */}
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                          Submitted Compliance Filings ({app.documents?.length || 0} Files)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(app.documents || []).map(doc => (
                            <div
                              key={doc.id}
                              className="bg-black/30 border border-white/10 rounded-xl px-3 py-1.5 text-[11px] flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#FFB800]" />
                              <span className="text-white font-mono">{doc.name}</span>
                              <span className="text-[9px] text-emerald-400 font-bold">✓ Verified</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Banking & Payout Destination */}
                      <div className="bg-black/25 p-3 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between text-xs gap-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#FFB800]" />
                          <span className="text-slate-400">Bank Destination:</span>
                          <span className="text-white font-bold">{app.bankName}</span>
                          <span className="text-slate-500 font-mono">({app.accountNumberMasked})</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">Routing: {app.routingOrIban}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 3: ORDERS & ASSIGNMENTS                                  */}
            {/* ============================================================ */}
            {adminTab === 'orders' && (
              <div className="space-y-6 max-w-6xl">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">Global Marketplace Orders</h3>
                  <p className="text-xs text-slate-400">Monitor all customer transactions and vendor warehouse dispatches.</p>
                </div>

                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-white">{order.id}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {order.orderStatus}
                          </span>
                          <span className="text-xs text-slate-400">Buyer: {order.customerName}</span>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">Customer Paid</span>
                            <span className="text-white font-bold">${(order.totalAmount || 0).toLocaleString()} CAD</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">Supplier Payout</span>
                            <span className="text-[#FFB800] font-bold">
                              ${((order.supplierCostTotal || order.totalAmount * 0.8) || 0).toLocaleString()} CAD
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] uppercase">Admin Margin</span>
                            <span className="text-emerald-400 font-bold">
                              ${((order.totalAmount - (order.supplierCostTotal || order.totalAmount * 0.8)) || 0).toLocaleString()} CAD
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 flex items-center justify-between">
                        <span>Assigned Vendor: <strong className="text-white">{order.vendorName}</strong></span>
                        <span>Fulfillment: <strong className="text-amber-400 uppercase">{order.vendorFulfillmentStatus}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 4: RFQ QUOTES DESK                                       */}
            {/* ============================================================ */}
            {adminTab === 'quotes' && (
              <div className="space-y-6 max-w-6xl">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">Wholesale RFQ Desk</h3>
                  <p className="text-xs text-slate-400">Price pending customer quote inquiries and send official proposals.</p>
                </div>

                <div className="space-y-4">
                  {quotes.map(q => (
                    <div key={q.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-white">{q.id}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFB800]/10 text-[#FFB800]">
                              {q.status}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">
                            Customer: {q.customerName} ({q.company}) • Vendor: {q.vendorName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedQuote(q);
                              setQuoteOfferPrice(q.quotePrice || 3900);
                            }}
                            className="bg-[#FFB800] hover:bg-white text-black font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                          >
                            Set Quote Offer
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300">
                        <strong>Requested Part:</strong> {q.productName} (SKU: {q.productSku}) • <strong>Qty:</strong> {q.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* TAB 5: SUPPLIERS DIRECTORY                                   */}
            {/* ============================================================ */}
            {adminTab === 'vendors' && (
              <div className="space-y-6 max-w-6xl">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">Verified Marketplace Suppliers</h3>
                  <p className="text-xs text-slate-400">Directory of approved equipment and parts manufacturers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendors.map(v => (
                    <div key={v.id} className="bg-white/[0.02] border border-white/10 rounded-3xl p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#FFB800]">{v.id}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          v.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm">{v.companyName}</h4>
                      <p className="text-xs text-slate-400">{v.category} • {v.city}</p>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                        <span>{v.totalProducts} Products</span>
                        <span>${v.totalRevenue.toLocaleString()} Revenue</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </motion.div>

        {/* PRICING CONTROL MODAL (Requirement 10) */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[4600] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            />
            <div className="relative z-10 w-full max-w-lg bg-[#0C1220] border border-white/20 rounded-[32px] p-6 sm:p-8 space-y-6 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FFB800] block">
                    Admin Pricing & Margin Engine
                  </span>
                  <h4 className="text-lg font-black uppercase text-white">{selectedProduct.name}</h4>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Requirement 10 Real-time Calculator Card */}
              <div className="bg-black/40 border border-white/10 p-5 rounded-2xl space-y-3 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Vendor Supplier Cost:</span>
                  <span className="text-white font-bold text-sm">
                    ${selectedProduct.supplierCost.toLocaleString()} CAD
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Public Customer Price:</span>
                  <span className="text-[#FFB800] font-black text-sm">
                    ${editSellingPrice.toLocaleString()} CAD
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Gross Marketplace Margin:</span>
                  <span className={marginDollar >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    +${marginDollar.toLocaleString()} CAD ({marginPercent}%)
                  </span>
                </div>
              </div>

              {/* Form Controls */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Set Customer Selling Price (CAD $)
                  </label>
                  <input
                    type="number"
                    value={editSellingPrice}
                    onChange={e => setEditSellingPrice(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm font-bold focus:outline-none focus:border-[#FFB800]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Pricing Type
                  </label>
                  <select
                    value={editPricingType}
                    onChange={e => setEditPricingType(e.target.value as PricingType)}
                    className="w-full bg-[#070B14] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FFB800]"
                  >
                    <option value="FIXED">FIXED PRICE (Immediate Cart & Buy)</option>
                    <option value="QUOTE">GET A QUOTE (RFQ Inquire Only)</option>
                    <option value="FIXED_QUOTE">FIXED + GET A QUOTE (Both Options Available)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                    Admin Review Notes (Internal)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Target margin confirmed with logistics broker"
                    value={adminProductNotes}
                    onChange={e => setAdminProductNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowRejectProductModal(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                >
                  Reject Product
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAndApproveProduct}
                    className="bg-[#FFB800] hover:bg-white text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-[#FFB800]/20"
                  >
                    Approve & Publish Price
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QUOTE RESPONSE MODAL */}
        {selectedQuote && (
          <div className="fixed inset-0 z-[4600] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedQuote(null)}
            />
            <div className="relative z-10 w-full max-w-md bg-[#0C1220] border border-white/20 rounded-[32px] p-6 space-y-4 text-white">
              <h4 className="text-base font-black uppercase text-white">Price Quote: {selectedQuote.id}</h4>
              <p className="text-xs text-slate-400">
                Set approved wholesale price for {selectedQuote.customerName} ({selectedQuote.productName}).
              </p>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Wholesale Proposal Price (CAD $)
                </label>
                <input
                  type="number"
                  value={quoteOfferPrice}
                  onChange={e => setQuoteOfferPrice(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Admin Response Technical Message
                </label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={e => setQuoteNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendQuoteResponse}
                  className="bg-[#FFB800] text-black font-black px-5 py-2 rounded-xl text-xs uppercase cursor-pointer"
                >
                  Transmit Quote to Customer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
