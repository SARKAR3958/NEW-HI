import React, { useState } from 'react';
import { X, Send, ShieldCheck, Truck, Clock, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from './ShoppingCartDrawer';
import { PreloadedImage } from './PreloadedImage';

interface CartQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotaItems: CartItem[];
  onSubmitSuccess: (quoteDetails: {
    company: string;
    phone: string;
    urgency: string;
    notes: string;
    items: CartItem[];
  }) => void;
}

export const CartQuoteModal: React.FC<CartQuoteModalProps> = ({
  isOpen,
  onClose,
  quotaItems,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    urgency: 'Standard (1-3 Days Delivery)',
    notes: ''
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
        onSubmitSuccess({
          company: formData.company || 'HEAVY EARTHWORKS INC.',
          phone: formData.phone || '+1 (431) 990-6055',
          urgency: formData.urgency,
          notes: formData.notes,
          items: quotaItems
        });
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative z-10 w-full max-w-2xl bg-[#0E1524] border border-white/15 rounded-[40px] overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white flex flex-col max-h-[92vh]"
          >
            {/* Top gold-gradient accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-white to-[#FFB800]"></div>

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-black/25">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl flex items-center justify-center text-[#FFB800]">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Generate Bulk RFQ Request</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Official Quotation Desk • OEM Spec Checked
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Scroll */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {success ? (
                <div className="py-12 text-center space-y-4 flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-white">Bulk RFQ Dispatched</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    Heavy parts desk has queued your quote. A verified procurement specialist will draft official invoice sheets. Navigating to My Profile status tracker...
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Items to be Quoted list */}
                  <div className="space-y-3">
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-[#FFB800] flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Items Included in Quote ({quotaItems.length})</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                      {quotaItems.map((item) => (
                        <div
                          key={item.part.id}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-3 flex gap-3 hover:border-white/10 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                            <PreloadedImage
                              src={item.part.imageUrl}
                              alt={item.part.name}
                              partId={item.part.id}
                              className="w-full h-full object-cover"
                              containerClassName="w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-[11px] font-extrabold text-white uppercase truncate">
                              {item.part.name}
                            </h5>
                            <p className="text-[9px] text-slate-500 font-mono mt-0.5">PN: {item.part.partNumber}</p>
                            <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold mt-1 uppercase">
                              <span>Brand: {item.part.brand}</span>
                              <span className="text-[#FFB800]">QTY: {item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="border-white/10" />

                  {/* Corporate Quote Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Full Name <span className="text-[#FFB800]">*</span></label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. MARC-ANDRÉ FLEURY"
                          className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 px-4 focus:outline-none"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Email Address <span className="text-[#FFB800]">*</span></label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. FLEURY@EARTHWORKS.CA"
                          className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 px-4 focus:outline-none"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Phone Number <span className="text-[#FFB800]">*</span></label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +1 (431) 990-6055"
                          className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 px-4 focus:outline-none"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-1.5">
                        <label className="text-[9px]">Company / Fleet Name <span className="text-[#FFB800]">*</span></label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. HEAVY EARTHWORKS INC."
                          className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 px-4 focus:outline-none"
                        />
                      </div>

                      {/* Urgency */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[9px]">Delivery Urgency</label>
                        <select
                          value={formData.urgency}
                          onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                          className="w-full bg-white text-black font-bold text-sm rounded-xl py-3 px-4 focus:outline-none appearance-none"
                        >
                          <option>Immediate / Machine Down (Dispatch Today)</option>
                          <option>Standard (1-3 Days Delivery)</option>
                          <option>Stocking Order (Next Week)</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-[9px]">Additional Specifications or Machine Serial Numbers</label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Please specify excavator, dozer or wheel loader models, dimensions or special instructions..."
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 px-4 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 py-1">
                      <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                      <span>Authorized Heavy Industries OEM Quotations • Security Encryption Active</span>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto bg-[#FFB800] hover:bg-white text-[#02060D] font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl shadow-[#FFB800]/10 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <span>Dispatching Quotation Request...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Official Quote Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
