import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  ShieldCheck,
  Building2,
  User,
  Crown,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const RoleQuickSwitcher: React.FC = () => {
  const {
    activeRole,
    setActiveRole,
    currentCustomer,
    currentVendor,
    setShowRoleModal,
    setShowCustomerPortal,
    setShowVendorPortal,
    setShowAdminPortal,
    setShowVendorStatusModal,
    setShowVendorAuthModal,
    setVendorAuthMode,
    customers,
    vendors,
    vendorApplications
  } = useMarketplace();

  const [isExpanded, setIsExpanded] = useState(false);

  // Helper quick log in
  const switchToCustomerDemo = () => {
    setActiveRole('customer');
    setShowCustomerPortal(true);
  };

  const switchToVendorDemo = () => {
    setActiveRole('vendor');
    setShowVendorPortal(true);
  };

  const switchToPendingVendorDemo = () => {
    setShowVendorStatusModal(true);
  };

  const switchToAdminDemo = () => {
    setActiveRole('admin');
    setShowAdminPortal(true);
  };

  const switchToGuest = () => {
    setActiveRole('guest');
  };

  return (
    <div className="fixed bottom-6 left-6 z-[3900]">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mb-3 w-72 bg-[#0B1120] border border-white/20 rounded-3xl p-4 shadow-2xl text-white space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FFB800]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Marketplace Simulator</span>
              </div>
              <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                Active: {activeRole.toUpperCase()}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              Instant 1-click test switcher to preview all customer, vendor, and admin roles.
            </p>

            <div className="space-y-1.5">
              {/* Role 1: Customer */}
              <button
                onClick={switchToCustomerDemo}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 transition-colors text-left text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#FFB800]" />
                  <div>
                    <span className="font-bold text-white block">Customer Portal</span>
                    <span className="text-[10px] text-slate-400">Marc-André (Orders & Quotes)</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </button>

              {/* Role 2: Active Vendor */}
              <button
                onClick={switchToVendorDemo}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 transition-colors text-left text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-white block">Vendor Portal</span>
                    <span className="text-[10px] text-slate-400">Apex Hydraulics (Approved)</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </button>

              {/* Role 3: Pending Vendor Application */}
              <button
                onClick={switchToPendingVendorDemo}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 transition-colors text-left text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <div>
                    <span className="font-bold text-white block">Vendor Verification Status</span>
                    <span className="text-[10px] text-slate-400">Pending Review Screen</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </button>

              {/* Role 4: Admin Portal */}
              <button
                onClick={switchToAdminDemo}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/10 transition-colors text-left text-xs cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-rose-400" />
                  <div>
                    <span className="font-bold text-white block">Admin Console</span>
                    <span className="text-[10px] text-slate-400">Pricing Margins & Vetting</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setShowRoleModal(true);
                  setIsExpanded(false);
                }}
                className="text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Reset Role Popup
              </button>

              <button
                onClick={() => {
                  setVendorAuthMode('register');
                  setShowVendorAuthModal(true);
                  setIsExpanded(false);
                }}
                className="text-[10px] text-[#FFB800] hover:underline cursor-pointer"
              >
                7-Step Vendor Signup
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#0B1120] hover:bg-[#121B2F] border border-white/20 text-white px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold shadow-2xl shadow-black/80 cursor-pointer transition-all hover:scale-105 active:scale-95"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB800]">
          Role: {activeRole.toUpperCase()}
        </span>
        {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
      </button>
    </div>
  );
};
