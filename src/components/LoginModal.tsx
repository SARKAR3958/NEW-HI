import React, { useState } from 'react';
import { X, LogIn, Lock, Mail, ShieldCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOpenRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D1826] text-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="bg-[#0A2033] p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FFB800] text-slate-950 rounded-xl flex items-center justify-center font-black">
              <LogIn className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-tight text-white">Trade Desk Portal Login</h3>
              <p className="text-xs text-[#00E5FF]">Canadian Trading Est. Secure Exchange</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {loggedIn ? (
            <div className="py-8 text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-[#00E5FF] mx-auto animate-bounce" />
              <h4 className="text-xl font-black text-white">Authentication Verified!</h4>
              <p className="text-xs text-slate-300">Welcome back to the Enterprise Trade Exchange Portal.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-300 mb-1">Corporate Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@company.com"
                    className="w-full bg-[#02060D] border border-slate-700 rounded-lg py-3 pl-10 pr-3 text-white focus:border-[#00E5FF] focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#02060D] border border-slate-700 rounded-lg py-3 pl-10 pr-3 text-white focus:border-[#00E5FF] focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input type="checkbox" className="rounded bg-slate-800 border-slate-700 text-[#00E5FF]" />
                  <span>Remember Device</span>
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[#00E5FF] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFB800] hover:bg-[#e0a200] text-slate-950 font-black py-3 rounded-xl uppercase tracking-wider shadow-lg transition-all cursor-pointer glow-gold"
              >
                Sign In to Exchange Portal
              </button>

              <div className="text-center pt-2 text-slate-400 text-xs">
                Don&apos;t have a verified account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="text-[#00E5FF] font-bold hover:underline"
                >
                  Register Buyer / Supplier
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
