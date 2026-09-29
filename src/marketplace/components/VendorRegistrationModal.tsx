import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  Lock,
  ShieldCheck,
  Trash2,
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { VendorDocument } from '../types';

export const VendorRegistrationModal: React.FC = () => {
  const {
    showVendorAuthModal,
    setShowVendorAuthModal,
    vendorAuthMode,
    setVendorAuthMode,
    submitVendorApplication,
    loginVendor
  } = useMarketplace();

  // Multi-step progress: 1 to 7
  const [currentStep, setCurrentStep] = useState(1);

  // Vendor Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // STEP 1 — ACCOUNT
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // STEP 2 — BUSINESS INFORMATION
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Corporation / Wholesale Importer');
  const [businessCategory, setBusinessCategory] = useState('Undercarriage Parts');
  const [businessDescription, setBusinessDescription] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState(6);
  const [website, setWebsite] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');

  // STEP 3 — BUSINESS ADDRESS
  const [country, setCountry] = useState('Canada');
  const [state, setState] = useState('Alberta');
  const [city, setCity] = useState('Calgary');
  const [address, setAddress] = useState('7400 Barlow Trail SE');
  const [postalCode, setPostalCode] = useState('T2C 2V4');

  // STEP 4 — BUSINESS DETAILS
  const [productCategories, setProductCategories] = useState<string[]>(['Undercarriage Parts', 'Hydraulic Pumps & Motors']);
  const [productCountEstimated, setProductCountEstimated] = useState('50 - 150 items');
  const [brandsHandled, setBrandsHandled] = useState('Komatsu, Caterpillar, Volvo, Hitachi');
  const [expectedMonthlyOrders, setExpectedMonthlyOrders] = useState('20 - 50 freight shipments');

  // STEP 5 — DOCUMENTS / VERIFICATION UI
  const [documents, setDocuments] = useState<VendorDocument[]>([
    { id: 'doc-1', name: 'Articles_of_Incorporation_Official.pdf', type: 'Business Registration', size: '2.4 MB', status: 'completed', uploadProgress: 100 },
    { id: 'doc-2', name: 'CRA_GST_HST_Certificate.pdf', type: 'Tax / Business ID', size: '1.2 MB', status: 'completed', uploadProgress: 100 },
    { id: 'doc-3', name: 'Director_Passport_Government_ID.pdf', type: 'Government ID', size: '3.6 MB', status: 'completed', uploadProgress: 100 },
    { id: 'doc-4', name: 'Commercial_Warehouse_Lease_2026.pdf', type: 'Address Proof', size: '4.1 MB', status: 'completed', uploadProgress: 100 },
    { id: 'doc-5', name: 'ISO_9001_Quality_Cert.pdf', type: 'Additional Document', size: '1.8 MB', status: 'completed', uploadProgress: 100 }
  ]);

  // STEP 6 — BANK / PAYMENT INFORMATION
  const [bankName, setBankName] = useState('Royal Bank of Canada (RBC)');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('•••• •••• 9412');
  const [routingOrIban, setRoutingOrIban] = useState('003-09412');
  const [taxId, setTaxId] = useState('GST-884102941-RT0001');

  // STEP 7 — CONFIRMATION
  const [accurateConfirmed, setAccurateConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  if (!showVendorAuthModal) return null;

  // Handle Vendor Login
  const handleVendorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    setTimeout(() => {
      setLoginLoading(false);
      const res = loginVendor(loginEmail, loginPassword);
      if (!res.success) {
        setLoginError(res.error || 'Authentication rejected.');
      }
    }, 700);
  };

  // Step Validation & Forward
  const handleNextStep = () => {
    setStepError(null);

    if (currentStep === 1) {
      if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        setStepError('Please complete all account fields before continuing.');
        return;
      }
      if (password !== confirmPassword) {
        setStepError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setStepError('Password must be at least 6 characters.');
        return;
      }
    } else if (currentStep === 2) {
      if (!businessName.trim() || !businessDescription.trim()) {
        setStepError('Please provide your business name and commercial description.');
        return;
      }
    } else if (currentStep === 3) {
      if (!city.trim() || !address.trim() || !postalCode.trim()) {
        setStepError('Please enter your complete physical dispatch facility address.');
        return;
      }
    } else if (currentStep === 4) {
      if (productCategories.length === 0 || !brandsHandled.trim()) {
        setStepError('Please select at least one product category and list brands handled.');
        return;
      }
    } else if (currentStep === 5) {
      if (documents.length < 2) {
        setStepError('Please maintain at least your Business Registration and Government ID documents.');
        return;
      }
    } else if (currentStep === 6) {
      if (!bankName.trim() || !accountNumber.trim()) {
        setStepError('Please provide primary banking settlement parameters.');
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStepError(null);
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  // Document actions simulation
  const handleRemoveDoc = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const handleSimulateUpload = (type: string) => {
    const newDoc: VendorDocument = {
      id: `doc-${Date.now()}`,
      name: `${type.replace(/[^a-zA-Z]/g, '_')}_Verified_${new Date().getFullYear()}.pdf`,
      type,
      size: `${(1.2 + Math.random() * 2).toFixed(1)} MB`,
      status: 'completed',
      uploadProgress: 100
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  // Final Submit
  const handleFinalSubmit = () => {
    if (!accurateConfirmed) {
      setStepError('You must confirm that all information provided is accurate and genuine.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      submitVendorApplication({
        fullName,
        email,
        phone,
        businessName,
        businessType,
        businessCategory,
        businessDescription,
        yearsInBusiness,
        website: website || 'https://heavyparts.example.com',
        businessEmail: businessEmail || email,
        businessPhone: businessPhone || phone,
        country,
        state,
        city,
        address,
        postalCode,
        productCategories,
        productCountEstimated,
        brandsHandled,
        expectedMonthlyOrders,
        documents,
        bankName,
        accountHolderName: accountHolderName || businessName,
        accountNumberMasked: accountNumber.includes('•') ? accountNumber : `•••• •••• ${accountNumber.slice(-4)}`,
        routingOrIban,
        taxId: taxId || 'GST-884102941-RT0001'
      });
    }, 1200);
  };

  const stepTitles = [
    'Account Credentials',
    'Business Information',
    'Commercial Address',
    'Product Capabilities',
    'Verification Documents',
    'Banking Settlement',
    'Review & Submit'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVendorAuthModal(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative z-10 w-full max-w-3xl bg-[#0B1120] border border-white/15 rounded-[36px] overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white max-h-[92vh] flex flex-col"
        >
          {/* Header Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#FFB800] to-amber-600"></div>

          {/* Top Bar with Mode Toggle & Close */}
          <div className="p-6 border-b border-white/10 bg-black/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center">
                <Building2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                  Vendor Partner Gateway
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {vendorAuthMode === 'register' ? `Step ${currentStep} of 7: ${stepTitles[currentStep - 1]}` : 'Vendor Portal Login'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {vendorAuthMode === 'register' ? (
                <button
                  onClick={() => setVendorAuthMode('login')}
                  className="text-xs font-bold uppercase tracking-wider text-[#FFB800] hover:text-white transition-colors cursor-pointer"
                >
                  Already Registered? Sign In
                </button>
              ) : (
                <button
                  onClick={() => setVendorAuthMode('register')}
                  className="text-xs font-bold uppercase tracking-wider text-[#FFB800] hover:text-white transition-colors cursor-pointer"
                >
                  New Supplier? Register Here
                </button>
              )}
              <button
                onClick={() => setShowVendorAuthModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* VENDOR LOGIN VIEW */}
          {vendorAuthMode === 'login' ? (
            <div className="p-8 sm:p-12 space-y-6 max-w-md mx-auto w-full">
              <div className="text-center space-y-1.5">
                <h4 className="text-2xl font-black uppercase tracking-tight text-white">Vendor Portal Sign In</h4>
                <p className="text-xs text-slate-400 font-medium">
                  Enter your verified business credentials to access your vendor dashboard, fulfill orders, and manage inventory.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-red-400 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleVendorLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vendor Business Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="marcus@apexhydraulics.com"
                    className="w-full bg-black/60 border border-white/10 rounded-2xl py-3.5 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/60 border border-white/10 rounded-2xl py-3.5 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                  />
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-2xl text-[11px] text-slate-400 space-y-1">
                  <div className="font-bold text-[#FFB800] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Demo Accounts Available</span>
                  </div>
                  <p>
                    Approved: <strong className="text-white">marcus@apexhydraulics.com</strong><br />
                    Pending Verification: <strong className="text-white">robert@sterlingheavymachinery.com</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-[#FFB800] hover:bg-white text-[#0B1120] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-[#FFB800]/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loginLoading ? 'Verifying Vendor Clearance...' : 'Access Vendor Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            /* 7-STEP MULTI-STEP VENDOR REGISTRATION */
            <div className="flex-1 overflow-y-auto flex flex-col justify-between">
              {/* Step Progress Dots */}
              <div className="px-8 pt-6 pb-2">
                <div className="flex items-center justify-between max-w-xl mx-auto">
                  {stepTitles.map((title, idx) => {
                    const stepNum = idx + 1;
                    const isActive = stepNum === currentStep;
                    const isCompleted = stepNum < currentStep;

                    return (
                      <div key={title} className="flex items-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                            isCompleted
                              ? 'bg-emerald-500 text-[#0B1120]'
                              : isActive
                              ? 'bg-[#FFB800] text-[#0B1120] ring-4 ring-[#FFB800]/20'
                              : 'bg-white/10 text-slate-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : stepNum}
                        </div>
                        {idx < stepTitles.length - 1 && (
                          <div className={`w-6 sm:w-12 h-0.5 mx-1 transition-colors ${stepNum < currentStep ? 'bg-emerald-500' : 'bg-white/10'}`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step Content */}
              <div className="p-8 sm:p-10 flex-1">
                {stepError && (
                  <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-red-400 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{stepError}</span>
                  </div>
                )}

                {/* STEP 1: ACCOUNT */}
                {currentStep === 1 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 1 — Vendor Representative Account</h4>
                      <p className="text-xs text-slate-400">Account holder credentials for your official business manager.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Marcus Vance"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Representative Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="marcus@apexhydraulics.com"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (403) 555-0182"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confirm Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Verify password"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: BUSINESS INFORMATION */}
                {currentStep === 2 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 2 — Business Information</h4>
                      <p className="text-xs text-slate-400">Corporate identity and legal business structure details.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business / Company Name</label>
                        <input
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Apex Hydraulics International Corp."
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Type</label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#FFB800]/50"
                        >
                          <option>Corporation / Wholesale Importer</option>
                          <option>OEM Certified Manufacturer</option>
                          <option>Distributor &amp; Remanufacturer</option>
                          <option>Authorized Dealer / Stockist</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Primary Category</label>
                        <select
                          value={businessCategory}
                          onChange={(e) => setBusinessCategory(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#FFB800]/50"
                        >
                          <option>Hydraulic Pumps &amp; Motors</option>
                          <option>Undercarriage Parts</option>
                          <option>Engine Components</option>
                          <option>Transmission &amp; Final Drive</option>
                          <option>Ground Engaging Tools (G.E.T.)</option>
                          <option>Buckets &amp; Attachments</option>
                          <option>Filters &amp; Seals</option>
                        </select>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Description</label>
                        <textarea
                          rows={2}
                          value={businessDescription}
                          onChange={(e) => setBusinessDescription(e.target.value)}
                          placeholder="Describe your manufacturing, remanufacturing or stock distribution capabilities..."
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Years in Business</label>
                        <input
                          type="number"
                          value={yearsInBusiness}
                          onChange={(e) => setYearsInBusiness(Number(e.target.value))}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Website URL</label>
                        <input
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://apexhydraulics.com"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: BUSINESS ADDRESS */}
                {currentStep === 3 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 3 — Commercial Dispatch Address</h4>
                      <p className="text-xs text-slate-400">Primary warehouse or facility location where freight pickups occur.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">State / Province</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Postal / ZIP Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Facility Street Address (Dock / Bay)</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="6820 Barlow Trail SE, Bay 12"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: BUSINESS DETAILS */}
                {currentStep === 4 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 4 — Products &amp; Fleet Operations</h4>
                      <p className="text-xs text-slate-400">Scope of heavy machinery inventory and order volume capacity.</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Categories Supplied</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Hydraulic Pumps & Motors',
                            'Undercarriage Parts',
                            'Engine Components',
                            'Transmission & Final Drive',
                            'Ground Engaging Tools (G.E.T.)',
                            'Buckets & Attachments',
                            'Filters & Seals'
                          ].map(cat => {
                            const isSelected = productCategories.includes(cat);
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  if (isSelected) {
                                    setProductCategories(prev => prev.filter(c => c !== cat));
                                  } else {
                                    setProductCategories(prev => [...prev, cat]);
                                  }
                                }}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FFB800] text-[#0B1120]'
                                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estimated Active SKUs</label>
                          <select
                            value={productCountEstimated}
                            onChange={(e) => setProductCountEstimated(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                          >
                            <option>10 - 50 items</option>
                            <option>50 - 150 items</option>
                            <option>150 - 500 items</option>
                            <option>500+ items</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expected Monthly Freight Orders</label>
                          <select
                            value={expectedMonthlyOrders}
                            onChange={(e) => setExpectedMonthlyOrders(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                          >
                            <option>5 - 20 orders</option>
                            <option>20 - 50 orders</option>
                            <option>50 - 150 orders</option>
                            <option>150+ orders</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OEM Brands Handled</label>
                        <input
                          type="text"
                          value={brandsHandled}
                          onChange={(e) => setBrandsHandled(e.target.value)}
                          placeholder="Komatsu, Caterpillar, Volvo, Liebherr, JCB"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: DOCUMENTS / VERIFICATION UI */}
                {currentStep === 5 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 5 — Verification Documents</h4>
                      <p className="text-xs text-slate-400">Upload official business registration, tax certificates, and facility proof.</p>
                    </div>

                    {/* Upload drop cards */}
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          'Business Registration',
                          'Tax / Business ID',
                          'Government ID',
                          'Address Proof',
                          'Additional Document'
                        ].map(docType => (
                          <button
                            key={docType}
                            type="button"
                            onClick={() => handleSimulateUpload(docType)}
                            className="p-3 bg-white/[0.02] hover:bg-[#FFB800]/10 border border-dashed border-white/20 hover:border-[#FFB800]/50 rounded-2xl text-center space-y-1 transition-all cursor-pointer"
                          >
                            <Upload className="w-4 h-4 text-[#FFB800] mx-auto" />
                            <div className="text-[10px] font-black uppercase tracking-wider text-slate-300">{docType}</div>
                            <div className="text-[9px] text-slate-500 font-mono">+ Upload PDF</div>
                          </button>
                        ))}
                      </div>

                      {/* Uploaded File Cards */}
                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attached Documents ({documents.length})</div>
                        {documents.map(doc => (
                          <div
                            key={doc.id}
                            className="bg-black/60 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-white truncate">{doc.name}</div>
                                <div className="text-[10px] text-slate-400 font-medium">
                                  {doc.type} · {doc.size} · <span className="text-emerald-400">100% Uploaded</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleRemoveDoc(doc.id)}
                                className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                title="Remove Document"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: BANK / PAYMENT INFORMATION */}
                {currentStep === 6 && (
                  <div className="space-y-4 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>Private &amp; Bank-Grade Encrypted</span>
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 6 — Settlement &amp; Payout Account</h4>
                      <p className="text-xs text-slate-400">Bank credentials for marketplace supplier cost disbursements.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Financial Institution</label>
                        <input
                          type="text"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Holder Name</label>
                        <input
                          type="text"
                          value={accountHolderName}
                          onChange={(e) => setAccountHolderName(e.target.value)}
                          placeholder="Apex Hydraulics International Corp."
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Account Number / IBAN</label>
                        <input
                          type="text"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder="•••• •••• 9412"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white font-mono focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Routing / Transit Transit</label>
                        <input
                          type="text"
                          value={routingOrIban}
                          onChange={(e) => setRoutingOrIban(e.target.value)}
                          placeholder="003-09412"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white font-mono focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tax Identification / GST Registration</label>
                        <input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          placeholder="GST-884102941-RT0001"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 px-4 text-sm font-semibold text-white font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 7: REVIEW & SUBMIT */}
                {currentStep === 7 && (
                  <div className="space-y-5 max-w-xl mx-auto">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black uppercase tracking-tight text-white">Step 7 — Review Application Summary</h4>
                      <p className="text-xs text-slate-400">Review all business particulars before submitting for administrative verification.</p>
                    </div>

                    <div className="bg-black/60 border border-white/10 rounded-3xl p-5 space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-slate-500">Business Name</div>
                          <div className="text-sm font-black text-white">{businessName || 'Apex Hydraulics International Corp.'}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase font-bold text-slate-500">Representative</div>
                          <div className="font-bold text-white">{fullName || 'Marcus Vance'}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-slate-400 text-[11px]">
                        <div>Email: <strong className="text-white">{email}</strong></div>
                        <div>Phone: <strong className="text-white">{phone}</strong></div>
                        <div>City: <strong className="text-white">{city}, {state}</strong></div>
                        <div>Categories: <strong className="text-white">{productCategories.join(', ')}</strong></div>
                        <div>Documents Attached: <strong className="text-emerald-400">{documents.length} Files Ready</strong></div>
                        <div>Payout Bank: <strong className="text-white">{bankName} ({accountNumber})</strong></div>
                      </div>
                    </div>

                    {/* Accurate Checkbox */}
                    <label className="flex items-start gap-3 text-xs text-slate-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={accurateConfirmed}
                        onChange={(e) => setAccurateConfirmed(e.target.checked)}
                        className="mt-0.5 rounded border-white/20 text-[#FFB800] focus:ring-[#FFB800] bg-black/50"
                      />
                      <span>
                        I confirm that the information provided is accurate and represents an authorized commercial heavy machinery supply enterprise.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Bottom Multi-Step Navigation Buttons */}
              <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#FFB800] hover:bg-white text-[#0B1120] font-black px-7 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-[#FFB800]/10 flex items-center gap-2"
                  >
                    <span>Next: {stepTitles[currentStep]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting}
                    className="bg-[#FFB800] hover:bg-white text-[#0B1120] font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl shadow-[#FFB800]/15 flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting to Marketplace Audit...' : 'Submit Vendor Application'}
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
