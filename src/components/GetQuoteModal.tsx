import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Truck, BadgeAlert, Layers, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PartItem, BRANDS_LIST } from '../data/partsData';
import { PreloadedImage } from './PreloadedImage';

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPart?: PartItem | null;
}

export const GetQuoteModal: React.FC<GetQuoteModalProps> = ({
  isOpen,
  onClose,
  selectedPart
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    brand: selectedPart ? selectedPart.brand : 'KOMATSU',
    partNumber: selectedPart ? selectedPart.partNumber : '',
    partName: selectedPart ? selectedPart.name : '',
    quantity: '1',
    urgency: 'Standard (1-3 Days Delivery)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPart) {
      setFormData((prev) => ({
        ...prev,
        brand: selectedPart.brand,
        partNumber: selectedPart.partNumber,
        partName: selectedPart.name
      }));
    }
  }, [selectedPart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Dark Glass Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card with Premium Metallic Glassmorphism and Neon Golden Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="relative z-10 bg-[#0E1524] border border-white/15 rounded-[40px] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white"
          >
            {/* Deluxe Golden Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-white to-[#FFB800]"></div>

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-black/25">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFB800]/10 border border-[#FFB800]/30 rounded-2xl flex items-center justify-center text-[#FFB800] shadow-inner">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                    Request Instant Quote
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">
                    Guaranteed Fast OEM Spec Verification
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white hover:bg-white/5 p-2 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {/* Selected Part Card Summary if applicable */}
              {selectedPart && (
                <div className="relative overflow-hidden bg-white/[0.02] border border-[#FFB800]/30 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-inner">
                  {/* Glowing background hint */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFB800]/5 blur-2xl rounded-full pointer-events-none"></div>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-black shadow-lg">
                      <PreloadedImage
                        src={selectedPart.imageUrl}
                        alt={selectedPart.name}
                        partId={selectedPart.id}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFB800] text-[#02060D] font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {selectedPart.brand}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          PN: {selectedPart.partNumber}
                        </span>
                      </div>
                      <h4 className="font-black text-base text-white leading-tight uppercase">
                        {selectedPart.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-semibold">
                        {selectedPart.machineModel} • <span className="text-emerald-400 font-bold">Available in Logistics Stock</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/[0.02] border border-white/5 rounded-2xl p-4 shrink-0 w-full sm:w-auto space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                      <span>OEM Certified Spec</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Truck className="w-4 h-4 text-[#FFB800]" />
                      <span>Canada Dispatch</span>
                    </div>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="py-12 text-center space-y-6 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                  </motion.div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight">RFQ Submitted Successfully</h4>
                    <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                      Thank you! Our heavy machinery part specialist is verifying live inventory dimensions. A wholesale quotation sheet will be sent to your inbox in less than 30 minutes.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                    setTimeout(() => {
                      setSubmitted(false);
                      onClose();
                    }, 3500);
                  }}
                  className="space-y-6 text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Your Full Name <span className="text-[#FFB800]">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                        placeholder="e.g. MARC-ANDRÉ FLEURY"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Email Address <span className="text-[#FFB800]">*</span></label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                        placeholder="e.g. FLEURY@EARTHWORKS.CA"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Phone Number <span className="text-[#FFB800]">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                        placeholder="e.g. +1 (431) 990-6055"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Company / Fleet Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                        placeholder="e.g. HEAVY EARTHWORKS INC."
                      />
                    </div>

                    {/* Brand select */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Brand / OEM Manufacturer</label>
                      <select
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full bg-white text-black font-bold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800] appearance-none"
                      >
                        {BRANDS_LIST.map((b) => (
                          <option key={b.name} value={b.name}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Part Number */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Part Number</label>
                      <input
                        type="text"
                        value={formData.partNumber}
                        onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                        className="w-full bg-white text-black font-mono text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                        placeholder="e.g. 208-27-00120"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Quantity Needed</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                      />
                    </div>

                    {/* Urgency */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] tracking-widest">Delivery Urgency</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full bg-white text-black font-bold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800] appearance-none"
                      >
                        <option>Immediate / Machine Down (Dispatch Today)</option>
                        <option>Standard (1-3 Days Delivery)</option>
                        <option>Stocking Order (Next Week)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-widest">Additional Part Details or Machine Serial #</label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Excavator Model PC300LC-8, Track pitch requirement, or special freight instructions..."
                      className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
                    ></textarea>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:w-auto px-6 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                    >
                      Cancel Request
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#FFB800] hover:bg-white text-[#02060D] font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl shadow-[#FFB800]/10 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Official RFQ</span>
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
