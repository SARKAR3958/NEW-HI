import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, FileText, CheckCircle2, AlertCircle, Clock, Send, CreditCard, Download, Trash2, Landmark } from 'lucide-react';
import { PreloadedImage } from '../components/PreloadedImage';

export interface ProfileRequestItem {
  id: string;
  date: string;
  urgency: string;
  notes: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  adminReply: string;
  items: {
    id: string;
    name: string;
    partNumber: string;
    brand: string;
    quantity: number;
    priceEstimate: string;
    imageUrl: string;
  }[];
}

interface ProfilePageProps {
  user: { name: string; email: string; phone: string; company: string } | null;
  userRequests: ProfileRequestItem[];
  onLogout: () => void;
  onPayRequest: (amount: number, reference: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  userRequests,
  onLogout,
  onPayRequest
}) => {
  const [selectedRequest, setSelectedRequest] = useState<ProfileRequestItem | null>(null);

  // Helper to check if any of the items do not have standard numerical prices (i.e. is an inquiry item)
  const hasInquiryItems = (req: ProfileRequestItem) => {
    return req.items.some(
      (item) => !/[\d]/.test(item.priceEstimate) || /Inquire|Contact/i.test(item.priceEstimate)
    );
  };

  if (!user) {
    return (
      <div className="bg-[#02060D] min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-[#FFB800] animate-pulse" />
        <h2 className="text-2xl font-black text-white uppercase tracking-tight mt-4">Partner Portal Locked</h2>
        <p className="text-slate-400 mt-2 max-w-sm text-xs font-bold uppercase tracking-widest leading-relaxed">
          Please log in or sign up via the top-right button to view your corporate profile and pending quote approvals.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#02060D] min-h-screen pt-28 pb-24 text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-20 space-y-12 animate-in fade-in duration-800">
        
        {/* Profile Header Block */}
        <div className="relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-[40px] p-8 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#FFB800] to-[#FFE082] text-[#02060D] rounded-3xl flex items-center justify-center font-black text-3xl shadow-xl">
              {user.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg sm:text-2xl font-black uppercase tracking-tight">{user.name}</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFB800]" /> Verified Enterprise Buyer
                </span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-black flex flex-wrap gap-x-4 gap-y-1">
                <span>Company: <strong className="text-white">{user.company}</strong></span>
                <span>Email: <strong className="text-white">{user.email}</strong></span>
                <span>Phone: <strong className="text-white">{user.phone}</strong></span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full md:w-auto bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-slate-300 font-black px-6 py-3.5 rounded-2xl text-[10px] uppercase tracking-widest transition-all cursor-pointer"
          >
            Sign Out Portal
          </button>
        </div>

        {/* Requests Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Columns: Request list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter">
                Official RFQ & <span className="text-[#FFB800]">Orders Ledger</span>
              </h2>
              <span className="bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                {userRequests.length} Requests Filed
              </span>
            </div>

            {userRequests.length === 0 ? (
              <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-12 text-center text-slate-500 space-y-4">
                <FileText className="w-16 h-16 text-slate-700 mx-auto animate-pulse" />
                <h4 className="font-extrabold text-lg text-slate-300 uppercase">No active requests found</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Add non-priced machinery parts to your cart and click continue to submit official RFQ sheets directly to our procurement office!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.map((request) => {
                  const isPending = request.status === 'PENDING';
                  const isApproved = request.status === 'APPROVED';
                  const isRejected = request.status === 'REJECTED';

                  return (
                    <div
                      key={request.id}
                      onClick={() => setSelectedRequest(request)}
                      className={`group relative bg-white/[0.01] border rounded-[30px] p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
                        selectedRequest?.id === request.id
                          ? 'border-[#FFB800] bg-white/[0.03]'
                          : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="space-y-3 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="bg-white/5 text-slate-300 text-[10px] font-mono px-3 py-1 rounded-full border border-white/5">
                            ID: {request.id}
                          </span>
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> {request.date}
                          </span>
                          <span className="text-[10px] bg-amber-500/10 text-amber-500 px-3 py-0.5 rounded-full font-black uppercase tracking-widest">
                            {request.urgency}
                          </span>
                        </div>

                        {/* Summary of items in request */}
                        <div className="text-sm font-extrabold text-white truncate uppercase">
                          {request.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                        </div>

                        {/* Brief admin reply sneak peek */}
                        <p className="text-xs text-slate-400 italic font-medium line-clamp-1">
                          {request.adminReply || 'Awaiting heavy parts desk review.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start shrink-0">
                        {/* Status Badge */}
                        {isPending && (
                          <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 animate-spin" /> Pending Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Quotation Approved
                          </span>
                        )}
                        {isRejected && (
                          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-red-400" /> Request Rejected
                          </span>
                        )}

                        <div className="text-slate-400 group-hover:text-white transition-colors hidden sm:block">
                          <Send className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Quote Review Drawer Panel */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter">
              Selected Request <span className="text-[#FFB800]">Overview</span>
            </h3>

            {selectedRequest ? (
              <div className="bg-white/[0.02] border border-white/15 rounded-[36px] p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#FFB800]/5 blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] text-slate-500 font-mono">REQUEST REFERENCE</div>
                    <div className="text-base font-black text-white">{selectedRequest.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-mono">Urgency Category</div>
                    <div className="text-xs font-black text-amber-500 uppercase">{selectedRequest.urgency}</div>
                  </div>
                </div>

                {/* Items in detailed view */}
                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Requested Components List</div>
                  
                  <div className="space-y-2.5">
                    {selectedRequest.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-black/40 border border-white/5 rounded-2xl p-3 flex gap-3"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                          <PreloadedImage
                            src={item.imageUrl}
                            alt={item.name}
                            partId={item.id}
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-extrabold text-white uppercase truncate">{item.name}</h5>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">PN: {item.partNumber}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mt-1 uppercase">
                            <span>{item.brand}</span>
                            <span className="text-[#FFB800] font-mono">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes box */}
                {selectedRequest.notes && (
                  <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-1.5">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Client Filed Notes</div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                      &quot;{selectedRequest.notes}&quot;
                    </p>
                  </div>
                )}

                {/* Admin Official Reply metal box */}
                <div className="bg-black/60 border border-white/10 rounded-2xl p-5 space-y-2">
                  <div className="text-[10px] text-[#FFB800] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Hammer Official Response Desk</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                    {selectedRequest.adminReply || 'Your specifications sheet is currently in review. Logistics rates and shipping quotes will be updated shortly.'}
                  </p>
                </div>

                {/* Direct payment or PDF download CTAs */}
                {selectedRequest.status === 'APPROVED' && (
                  <div className="space-y-3 pt-2 animate-in fade-in">
                    {/* Only show Stripe payment button if NO inquiry items are present */}
                    {!hasInquiryItems(selectedRequest) ? (
                      <button
                        onClick={() => onPayRequest(3900.0, selectedRequest.id)}
                        className="w-full bg-[#FFB800] hover:bg-white text-[#02060D] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-[#FFB800]/15 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Process Stripe Approved Charge</span>
                      </button>
                    ) : (
                      <div className="bg-white/[0.02] border border-amber-500/25 p-4 rounded-2xl flex flex-col items-center text-center space-y-2">
                        <Landmark className="w-6 h-6 text-amber-500" />
                        <div className="text-[10px] text-amber-500 font-black uppercase tracking-wider">
                          Direct Bank Wire Required
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold leading-relaxed uppercase">
                          Custom freight or non-priced OEM components present. Online card checkout disabled. Please reference your PDF quotation invoice for bank transfer wire routing.
                        </p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => window.open('https://pdf.org', '_blank')}
                      className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF Quotation</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/[0.01] border border-white/5 border-dashed rounded-[36px] p-12 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                Select a quote request from the ledger to view details, statuses, and official admin pricing sheets.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
