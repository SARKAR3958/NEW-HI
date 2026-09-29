import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Building2, ArrowRight, ShieldCheck, X, Sparkles } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const RoleSelectionModal: React.FC = () => {
  const {
    showRoleModal,
    setShowRoleModal,
    setActiveRole,
    setShowCustomerAuthModal,
    setCustomerAuthMode,
    setShowVendorAuthModal,
    setVendorAuthMode
  } = useMarketplace();

  if (!showRoleModal) return null;

  const handleSelectCustomer = () => {
    setShowRoleModal(false);
    setActiveRole('guest');
    setCustomerAuthMode('login');
    setShowCustomerAuthModal(true);
  };

  const handleSelectVendor = () => {
    setShowRoleModal(false);
    setVendorAuthMode('register');
    setShowVendorAuthModal(true);
  };

  const handleContinueAsGuest = () => {
    setShowRoleModal(false);
    setActiveRole('guest');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleContinueAsGuest}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative z-10 w-full max-w-2xl bg-[#0B1120] border border-white/15 rounded-[36px] overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white"
        >
          {/* Subtle Top Accent Hairline */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-amber-200 to-[#FFB800]"></div>

          {/* Close button */}
          <button
            onClick={handleContinueAsGuest}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 sm:p-12 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2.5 max-w-lg mx-auto">
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 px-3.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hammer B2B Marketplace</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                Welcome to the Marketplace
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                How would you like to continue today? Select your role to personalize your industrial machinery procurement experience.
              </p>
            </div>

            {/* Selection Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Option 1: Customer Card */}
              <button
                onClick={handleSelectCustomer}
                className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#FFB800]/40 rounded-3xl p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex flex-col justify-between space-y-6 cursor-pointer shadow-lg hover:shadow-[#FFB800]/5"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
                      Customer
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1.5">
                      Shop products, place orders, and request wholesale quotes for your fleet.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#FFB800] group-hover:text-white transition-colors">
                  <span>Enter Storefront</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Option 2: Vendor Card */}
              <button
                onClick={handleSelectVendor}
                className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#FFB800]/40 rounded-3xl p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex flex-col justify-between space-y-6 cursor-pointer shadow-lg hover:shadow-[#FFB800]/5"
              >
                <div className="space-y-4">
                  <div className="w-13 h-13 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#FFB800] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors">
                      Vendor
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1.5">
                      Sell heavy parts, manage products, and fulfill commercial equipment orders.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#FFB800] group-hover:text-white transition-colors">
                  <span>Become a Vendor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Bottom Guest Action */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified B2B Heavy Machinery Network</span>
              </div>

              <button
                onClick={handleContinueAsGuest}
                className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-full hover:bg-white/5 cursor-pointer"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
