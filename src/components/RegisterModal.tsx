import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck, Layers, CheckCircle2 } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'buyer' | 'supplier';
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'buyer'
}) => {
  const [role, setRole] = useState<'buyer' | 'supplier'>(defaultRole);
  const [formData, setFormData] = useState({
    companyName: '',
    country: 'Canada',
    fullName: '',
    email: '',
    phone: '',
    commodityType: 'Agricultural Grains'
  });
  const [registered, setRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D1826] text-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="bg-[#0A2033] p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#00E5FF] text-slate-950 rounded-xl flex items-center justify-center font-black">
              <UserPlus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase tracking-tight text-white">
                Register Verified Exchange Account
              </h3>
              <p className="text-xs text-[#00E5FF]">Canadian Trading Est. Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {registered ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-[#00E5FF] mx-auto animate-bounce" />
              <h4 className="text-xl font-black text-white">Application Submitted!</h4>
              <p className="text-xs text-slate-300">
                Your {role === 'buyer' ? 'Buyer' : 'Supplier'} registration is undergoing CTE compliance check. A trade desk representative will activate your account shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              {/* Role Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#02060D] rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`py-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    role === 'buyer'
                      ? 'bg-[#00E5FF] text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Register as Buyer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('supplier')}
                  className={`py-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    role === 'supplier'
                      ? 'bg-[#FFB800] text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Register as Supplier</span>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 mb-1">Company / Entity Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Pacific Grain Exporters Ltd"
                    className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Country of Origin *</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Commodity Sector</label>
                    <select
                      value={formData.commodityType}
                      onChange={(e) => setFormData({ ...formData, commodityType: e.target.value })}
                      className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                    >
                      <option>Agricultural Grains</option>
                      <option>Industrial Metals & Steel</option>
                      <option>Heavy Equipment Parts</option>
                      <option>Energy & Diesel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Contact Officer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Robert Miller"
                    className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. r.miller@company.com"
                      className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full font-black py-3 rounded-xl uppercase tracking-wider shadow-lg transition-all cursor-pointer ${
                  role === 'buyer'
                    ? 'bg-[#00E5FF] hover:bg-[#00cbe3] text-slate-950 glow-cyan-sm'
                    : 'bg-[#FFB800] hover:bg-[#e0a200] text-slate-950 glow-gold'
                }`}
              >
                Submit {role === 'buyer' ? 'Buyer' : 'Supplier'} Verification
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
