import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const LoginRequiredModal: React.FC = () => {
  const {
    showLoginRequiredModal,
    setShowLoginRequiredModal,
    loginRequiredActionName,
    setShowCustomerAuthModal,
    setCustomerAuthMode
  } = useMarketplace();

  if (!showLoginRequiredModal) return null;

  const handleOpenLogin = () => {
    setShowLoginRequiredModal(false);
    setCustomerAuthMode('login');
    setShowCustomerAuthModal(true);
  };

  const handleOpenSignup = () => {
    setShowLoginRequiredModal(false);
    setCustomerAuthMode('signup');
    setShowCustomerAuthModal(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowLoginRequiredModal(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative z-10 w-full max-w-md bg-[#0B1120] border border-white/15 rounded-[32px] overflow-hidden shadow-2xl shadow-[#FFB800]/10 text-white"
        >
          {/* Subtle Top Accent Hairline */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-amber-300 to-[#FFB800]"></div>

          {/* Close button */}
          <button
            onClick={() => setShowLoginRequiredModal(false)}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 sm:p-9 space-y-6 text-center">
            {/* Lock Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shadow-lg shadow-[#FFB800]/5">
              <Lock className="w-8 h-8 stroke-[2.2]" />
            </div>

            {/* Title & Body per User Specification */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 px-3 py-1 rounded-full inline-block">
                Authentication Required
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Login Required
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                Please login or create an account to continue.
              </p>
              {loginRequiredActionName && (
                <div className="pt-1">
                  <span className="text-xs text-slate-400">
                    Attempted action:{' '}
                    <strong className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {loginRequiredActionName}
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              Your intended action will automatically execute immediately once your login is confirmed.
            </p>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleOpenLogin}
                className="w-full bg-[#FFB800] hover:bg-white text-black font-black py-4 px-6 rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-[#FFB800]/20 transition-all cursor-pointer active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleOpenSignup}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 px-6 rounded-2xl uppercase tracking-wider text-xs border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-slate-400" />
                <span>Create Account</span>
              </button>
            </div>

            {/* Footer Trust Marker */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Heavy Equipment Procurement System</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
