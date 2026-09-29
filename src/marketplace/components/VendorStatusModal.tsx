import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  FileText,
  ArrowRight,
  ExternalLink,
  Ban
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { VendorApplicationStatus } from '../types';

export const VendorStatusModal: React.FC = () => {
  const {
    showVendorStatusModal,
    setShowVendorStatusModal,
    currentVendorApplication,
    vendorApplications,
    currentVendor,
    setActiveRole
  } = useMarketplace();

  if (!showVendorStatusModal) return null;

  // Use current application or fallback to latest application in state
  const app = currentVendorApplication || vendorApplications[0];

  const getStatusBadge = (status: VendorApplicationStatus) => {
    switch (status) {
      case 'APPROVED':
        return {
          label: 'APPROVED & ACTIVATED',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: CheckCircle2,
          desc: 'Your vendor application has been approved by our procurement board. Your account is active.'
        };
      case 'UNDER_REVIEW':
        return {
          label: 'UNDER ADMIN REVIEW',
          color: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          icon: Clock,
          desc: 'Senior procurement engineers are verifying your corporate filings and warehouse documentation.'
        };
      case 'CHANGES_REQUIRED':
        return {
          label: 'CHANGES REQUIRED',
          color: 'bg-amber-500/10 text-[#FFB800] border-amber-500/30',
          icon: AlertTriangle,
          desc: 'Our compliance desk requires additional documents or updated banking details before activation.'
        };
      case 'REJECTED':
        return {
          label: 'APPLICATION REJECTED',
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: XCircle,
          desc: 'Your application did not meet our heavy machinery vendor qualification standards at this time.'
        };
      case 'SUSPENDED':
        return {
          label: 'ACCOUNT SUSPENDED',
          color: 'bg-red-500/10 text-red-400 border-red-500/30',
          icon: Ban,
          desc: 'This vendor portal access has been temporarily suspended by system administrators.'
        };
      case 'PENDING':
      default:
        return {
          label: 'PENDING VERIFICATION',
          color: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          icon: Clock,
          desc: 'Your vendor application has been submitted and queued for administrator compliance inspection.'
        };
    }
  };

  const statusConfig = app ? getStatusBadge(app.status) : getStatusBadge('PENDING');
  const StatusIcon = statusConfig.icon;

  const timelineSteps = [
    { title: 'Application Submitted', desc: 'Credentials & filings received', done: true, current: false },
    {
      title: 'Under Admin Review',
      desc: 'Compliance & document verification',
      done: app ? ['UNDER_REVIEW', 'APPROVED'].includes(app.status) : false,
      current: app?.status === 'UNDER_REVIEW' || app?.status === 'PENDING'
    },
    {
      title: 'Admin Decision',
      desc: app?.status === 'APPROVED' ? 'Application Approved' : app?.status === 'REJECTED' ? 'Application Rejected' : app?.status === 'CHANGES_REQUIRED' ? 'Changes Requested' : 'Awaiting compliance evaluation',
      done: app ? ['APPROVED', 'REJECTED', 'CHANGES_REQUIRED'].includes(app.status) : false,
      current: app ? ['REJECTED', 'CHANGES_REQUIRED'].includes(app.status) : false
    },
    {
      title: 'Vendor Account Activated',
      desc: 'Full catalog & portal access unlocked',
      done: app?.status === 'APPROVED',
      current: app?.status === 'APPROVED'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[4100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowVendorStatusModal(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#0B1120] border border-white/15 rounded-[36px] overflow-hidden shadow-2xl shadow-[#FFB800]/5 text-white"
        >
          {/* Top Bar Indicator */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FFB800] via-amber-300 to-[#FFB800]"></div>

          {/* Close button */}
          <button
            onClick={() => setShowVendorStatusModal(false)}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 sm:p-10 space-y-7">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                    Vendor Application Status
                  </h3>
                  <p className="text-xs text-slate-400">
                    B2B Marketplace Supplier Verification Network
                  </p>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${statusConfig.color}`}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                      Current Status
                    </span>
                    <span className="text-sm font-black uppercase tracking-wider text-white">
                      {statusConfig.label}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 block">APPLICATION ID</span>
                  <span className="text-xs font-mono font-bold text-[#FFB800]">
                    {app?.id || 'VND-APP-8492'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-2xl border border-white/5">
                {statusConfig.desc}
              </p>

              {/* Summary Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-[11px] border-t border-white/5">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Business Name</span>
                  <span className="text-white font-medium truncate block">{app?.businessName || 'Industrial Parts Corp.'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Contact Email</span>
                  <span className="text-white font-medium truncate block">{app?.email || 'vendor@corp.com'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Submitted Date</span>
                  <span className="text-white font-medium block">{app?.submittedDate || '2026-09-28'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">Review Target</span>
                  <span className="text-[#FFB800] font-medium block">24 - 48 Hours</span>
                </div>
              </div>
            </div>

            {/* Rejection / Changes Required Details */}
            {app?.status === 'REJECTED' && app.rejectionReason && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-5 space-y-2 text-rose-200">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-400">
                  <XCircle className="w-4 h-4" />
                  <span>Admin Rejection Notice</span>
                </div>
                <p className="text-xs leading-relaxed text-rose-200/90 font-mono">
                  {app.rejectionReason}
                </p>
              </div>
            )}

            {app?.status === 'CHANGES_REQUIRED' && app.changesRequested && app.changesRequested.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#FFB800]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Action Required: Required Updates</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {app.changesRequested.map((change, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#FFB800] font-bold">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verification Timeline */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Verification Journey
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {timelineSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      step.done
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                        : step.current
                        ? 'bg-[#FFB800]/10 border-[#FFB800]/40 text-white'
                        : 'bg-white/[0.02] border-white/5 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.done
                            ? 'bg-emerald-500 text-black'
                            : step.current
                            ? 'bg-[#FFB800] text-black animate-pulse'
                            : 'bg-white/10 text-slate-400'
                        }`}
                      >
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-tight truncate">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
                <span>Encrypted compliance pipeline</span>
              </div>

              <div className="flex items-center gap-2">
                {app?.status === 'APPROVED' ? (
                  <button
                    onClick={() => {
                      setShowVendorStatusModal(false);
                      setActiveRole('vendor');
                    }}
                    className="bg-[#FFB800] hover:bg-white text-black font-black px-6 py-2.5 rounded-2xl uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#FFB800]/20"
                  >
                    <span>Launch Vendor Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowVendorStatusModal(false)}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-2.5 rounded-2xl text-xs transition-colors cursor-pointer"
                  >
                    Close Status Panel
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
