import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, User, Phone, Landmark, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; phone: string; company: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onLoginSuccess({
          name: formData.name || 'MARC-ANDRÉ FLEURY',
          email: formData.email,
          phone: formData.phone || '+1 (431) 990-6055',
          company: formData.company || 'HEAVY EARTHWORKS INC.'
        });
        onClose();
      }, 1500);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative z-10 w-full max-w-md bg-[#0E1524] border border-white/15 rounded-[40px] overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white flex flex-col"
          >
            {/* Top gold line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#FFB800] via-white to-[#FFB800]"></div>

            <div className="p-6 sm:p-8 flex items-center justify-between border-b border-white/10 bg-black/25">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl flex items-center justify-center text-[#FFB800]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight">
                    {isSignUp ? 'Create Corporate Account' : 'Partner Portal Sign In'}
                  </h3>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                    Hammer Procurement Gateway
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex-1">
              {success ? (
                <div className="py-8 text-center space-y-4 flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 stroke-[2]" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-white">Security Cleared</h4>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Corporate identity verified successfully. Unlocking RFQ desks and historical quote profile ledger...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isSignUp && (
                    <>
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. MARC-ANDRÉ FLEURY"
                            className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      {/* Company */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Company / fleet name</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. HEAVY EARTHWORKS INC."
                            className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                          />
                          <Landmark className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Phone Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +1 (431) 990-6055"
                            className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[9px]">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="FLEURY@EARTHWORKS.CA"
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[9px]">Portal Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Stripe PCI compliance label info */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 py-1">
                    <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                    <span>Authorized Corporate Procurement SSL</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FFB800] hover:bg-white text-[#02060D] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-[#FFB800]/10 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Verifying Credentials...</span>
                    ) : (
                      <span>{isSignUp ? 'Create Corporate Account' : 'Authenticate Credentials'}</span>
                    )}
                  </button>

                  {/* Swap toggle */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-[#FFB800] hover:text-white transition-colors cursor-pointer text-[10px] uppercase tracking-widest font-black"
                    >
                      {isSignUp ? 'Already a partner? Log In' : 'New Client? Register Corporate Account'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
