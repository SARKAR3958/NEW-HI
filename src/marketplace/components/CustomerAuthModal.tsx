import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const CustomerAuthModal: React.FC = () => {
  const {
    showCustomerAuthModal,
    setShowCustomerAuthModal,
    customerAuthMode,
    setCustomerAuthMode,
    loginCustomer,
    signupCustomer
  } = useMarketplace();

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status & Validation States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  if (!showCustomerAuthModal) return null;

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = loginCustomer(email, password);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid credentials.');
      } else {
        setSuccessMsg('Authentication successful. Loading marketplace...');
      }
    }, 700);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setErrorMsg('All fields are required to register a customer account.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password is too weak. Must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = signupCustomer({ name, email, phone, password });
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to create customer account.');
      } else {
        setSuccessMsg('Account created successfully! Welcome to Hammer Industrial.');
      }
    }, 800);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 700);
  };

  const handleGoogleMock = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginCustomer('google.buyer@heavyfleet.ca', 'google_mock_pass');
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCustomerAuthModal(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative z-10 w-full max-w-md bg-[#0B1120] border border-white/15 rounded-[36px] overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white"
        >
          {/* Top Gold Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-amber-200 to-[#FFB800]"></div>

          {/* Close button */}
          <button
            onClick={() => setShowCustomerAuthModal(false)}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-7 sm:p-9 space-y-6">
            {/* Header info banner */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#FFB800]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Customer Access Portal</span>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                {customerAuthMode === 'login' && 'Customer Sign In'}
                {customerAuthMode === 'signup' && 'Create Customer Account'}
                {customerAuthMode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                {customerAuthMode === 'login' && 'Please login to manage your machinery parts, cart, orders, and quotes.'}
                {customerAuthMode === 'signup' && 'Join thousands of heavy equipment fleets and contractors.'}
                {customerAuthMode === 'forgot' && 'Enter your verified business email to receive reset instructions.'}
              </p>
            </div>

            {/* Error & Success Messages */}
            {errorMsg && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-red-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-2.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* FORGOT PASSWORD FORM */}
            {customerAuthMode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                {resetSent ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight text-white">Reset Link Dispatched</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                      A password recovery link has been sent to <strong className="text-white">{email}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setResetSent(false);
                        setCustomerAuthMode('login');
                      }}
                      className="mt-4 text-xs font-black uppercase tracking-widest text-[#FFB800] hover:underline"
                    >
                      Back to Sign In
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Business Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="buyer@contracting.ca"
                          className="w-full bg-black/60 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                        />
                        <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FFB800] hover:bg-white text-[#0B1120] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-[#FFB800]/10 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? 'Sending Instructions...' : 'Send Password Reset Link'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCustomerAuthMode('login')}
                      className="w-full text-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors pt-2"
                    >
                      Back to Sign In
                    </button>
                  </>
                )}
              </form>
            )}

            {/* LOGIN FORM */}
            {customerAuthMode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="fleury@earthworks.ca"
                      className="w-full bg-black/60 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
                    <button
                      type="button"
                      onClick={() => setCustomerAuthMode('forgot')}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#FFB800] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/60 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FFB800] hover:bg-white text-[#0B1120] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-[#FFB800]/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In as Customer'}
                </button>

                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <span className="relative bg-[#0B1120] px-3 text-[10px] font-bold uppercase text-slate-500 tracking-widest">or</span>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleMock}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Switch to Signup */}
                <div className="pt-2 text-center text-xs text-slate-400">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg(null);
                      setCustomerAuthMode('signup');
                    }}
                    className="font-bold text-[#FFB800] hover:underline cursor-pointer"
                  >
                    Create Customer Account
                  </button>
                </div>
              </form>
            )}

            {/* SIGNUP FORM */}
            {customerAuthMode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Marc-André Fleury"
                      className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="buyer@earthworks.ca"
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 pl-10 pr-3 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                      />
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (431) 990-6055"
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 pl-10 pr-3 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                      />
                      <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 pl-10 pr-3 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                      />
                      <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="w-full bg-black/60 border border-white/10 rounded-2xl py-3 pl-10 pr-3 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50"
                      />
                      <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 text-[#FFB800] focus:ring-[#FFB800] bg-black/50"
                  />
                  <span>
                    I agree to the <span className="text-white underline">Terms &amp; Conditions</span> and{' '}
                    <span className="text-white underline">Privacy Policy</span>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FFB800] hover:bg-white text-[#0B1120] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg shadow-[#FFB800]/10 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleMock}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-3 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg(null);
                      setCustomerAuthMode('login');
                    }}
                    className="font-bold text-[#FFB800] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Footer Trust Info */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>PCI-DSS Compliant • 256-Bit SSL Encrypted Customer Gateway</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
