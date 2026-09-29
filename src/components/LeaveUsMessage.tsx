import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export const LeaveUsMessage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <section id="leave-message" className="pt-32 pb-24 px-6 bg-[#02060D]">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/5 rounded-[40px] p-12 text-center space-y-6 shadow-2xl shadow-black/50 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Message Received.</h3>
            <p className="text-slate-400 font-medium">Our technical specialists will review your inquiry and respond within 24 hours.</p>
          </div>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFB800] border-b-2 border-[#FFB800] pb-1 hover:text-white transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="leave-message" className="pt-32 pb-24 px-6 lg:px-16 xl:px-20 bg-[#02060D]">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-16">
        
        {/* Left: Info (5 columns) */}
        <div className="lg:col-span-5 space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
              <span className="w-6 h-px bg-[#FFB800]"></span>
              Direct Inquiry
            </div>
            <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-tight text-white">
              Initiate Your <br />
              <span className="text-slate-400">Project Inquiry.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-md">
              Connect with our Canadian headquarters for specialized component sourcing, bulk wholesale inquiries, or custom manufacturing strategies.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#FFB800] shadow-sm shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">General Support</div>
                <div className="text-xl font-black text-white tabular-nums tracking-tighter">+1 (431) 990-6055</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#FFB800] shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Sales</div>
                <div className="text-xl font-black text-white tracking-tighter">sales@hammerindustrial.ca</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[#FFB800] shadow-sm shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Headquarters</div>
                <div className="text-lg font-black text-white tracking-tighter">Toronto, Ontario, Canada</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form (7 columns) */}
        <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/5 rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-black/50 space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alexander Sterling"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] outline-none transition-all placeholder:text-slate-500"
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Company</label>
                <input
                  type="text"
                  placeholder="e.g. Northstar Mining"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] outline-none transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Email Address</label>
              <input
                type="email"
                placeholder="alexander@company.com"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] outline-none transition-all placeholder:text-slate-500"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-white uppercase tracking-[0.2em] ml-1">Requirement Overview</label>
              <textarea
                placeholder="Briefly describe your industrial requirement..."
                rows={4}
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:border-[#FFB800] focus:ring-1 focus:ring-[#FFB800] outline-none transition-all placeholder:text-slate-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFB800] text-[#02060D] hover:bg-white font-black py-5 rounded-2xl uppercase text-[11px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-lg shadow-[#FFB800]/10"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#02060D]/20 border-t-[#02060D] rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Transmit Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
