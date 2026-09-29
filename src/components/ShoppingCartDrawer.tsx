import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, CheckCircle, ShieldCheck, FileText, Landmark, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PartItem } from '../data/partsData';
import { PreloadedImage } from './PreloadedImage';
import { useMarketplace } from '../marketplace/context/MarketplaceContext';

export interface CartItem {
  part: PartItem;
  quantity: number;
}

interface ShoppingCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (partId: string) => void;
  onUpdateQuantity: (partId: string, quantity: number) => void;
  onClearCart: () => void;
  onOpenCartQuote?: () => void;
}

export const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  onOpenCartQuote
}) => {
  const { requireCustomerAuth } = useMarketplace();

  // Tabs: 'BUY' (with price amount) or 'QUOTA' (with contact for pricing or inquire for quote)
  const [activeCartTab, setActiveCartTab] = useState<'BUY' | 'QUOTA'>('BUY');
  
  // Stripe modal triggers
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Stripe Sandbox input form states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12 / 29');
  const [cardCVC, setCardCVC] = useState('•••');

  // Check if price estimate is numeric
  const isBuyItem = (priceEstimate: string) => {
    return /[\d]/.test(priceEstimate) && !/Inquire|Contact/i.test(priceEstimate);
  };

  // Split cart into Buy items and Quota items
  const buyItems = cart.filter((item) => isBuyItem(item.part.priceEstimate));
  const quotaItems = cart.filter((item) => !isBuyItem(item.part.priceEstimate));

  // Convert estimate to float number: e.g. "$2,450.00 CAD" -> 2450.0
  const parsePrice = (priceStr: string) => {
    const cleanStr = priceStr.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
  };

  const calculateSubtotal = () => {
    return buyItems.reduce((total, item) => total + parsePrice(item.part.priceEstimate) * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();

  const handleCheckout = () => {
    requireCustomerAuth(() => setShowStripeModal(true), 'Checkout / Place Order');
  };

  const handleStripePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowStripeModal(false);
        onClearCart();
        onClose();
      }, 3500);
    }, 2500); // Spinner duration
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] overflow-hidden">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/75 backdrop-blur-xs"
            />

            {/* Cart Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute inset-y-0 right-0 max-w-md w-full bg-[#02060D] border-l border-white/10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/25">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#FFB800]" />
                  <h3 className="text-lg font-black uppercase tracking-wider text-white">Your Cart</h3>
                  {cart.length > 0 && (
                    <span className="bg-[#FFB800] text-[#02060D] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* BUY vs QUOTA Tabs */}
              <div className="grid grid-cols-2 border-b border-white/10 text-center bg-black/10">
                <button
                  onClick={() => setActiveCartTab('BUY')}
                  className={`py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    activeCartTab === 'BUY'
                      ? 'border-[#FFB800] text-[#FFB800] bg-white/[0.02]'
                      : 'border-transparent text-slate-500 hover:text-white'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Buy Now ({buyItems.length})</span>
                </button>

                <button
                  onClick={() => setActiveCartTab('QUOTA')}
                  className={`py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    activeCartTab === 'QUOTA'
                      ? 'border-[#FFB800] text-[#FFB800] bg-white/[0.02]'
                      : 'border-transparent text-slate-500 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Quota ({quotaItems.length})</span>
                </button>
              </div>

              {/* Items List container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeCartTab === 'BUY' ? (
                  /* --- BUY NOW TAB CONTENT --- */
                  buyItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 text-slate-500">
                      <Landmark className="w-16 h-16 text-slate-600 animate-pulse" />
                      <p className="font-bold text-lg text-slate-300">No parts in BUY tab.</p>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Parts with transparent list pricing are categorized here for secure international Stripe checkout.
                      </p>
                    </div>
                  ) : (
                    buyItems.map((item) => (
                      <div
                        key={item.part.id}
                        className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-4 hover:border-white/10 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                          <PreloadedImage
                            src={item.part.imageUrl}
                            alt={item.part.name}
                            partId={item.part.id}
                            className="w-full h-full object-cover"
                            containerClassName="w-full h-full"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[9px] font-black uppercase text-[#FFB800] tracking-wider">
                                {item.part.brand}
                              </span>
                              <button
                                onClick={() => onRemoveFromCart(item.part.id)}
                                className="text-slate-500 hover:text-red-500 transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <h4 className="text-sm font-extrabold text-white line-clamp-1 leading-tight uppercase">
                              {item.part.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-mono">PN: {item.part.partNumber}</p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            {/* Quantity control */}
                            <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                              <button
                                onClick={() => onUpdateQuantity(item.part.id, item.quantity - 1)}
                                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold text-white font-mono">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.part.id, item.quantity + 1)}
                                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-xs text-slate-500">Unit: {item.part.priceEstimate}</div>
                              <div className="text-sm font-black text-[#FFB800]">
                                ${(parsePrice(item.part.priceEstimate) * item.quantity).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })}{' '}
                                CAD
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  /* --- REQUEST QUOTA TAB CONTENT --- */
                  quotaItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 text-slate-500">
                      <FileText className="w-16 h-16 text-slate-600 animate-pulse" />
                      <p className="font-bold text-lg text-slate-300">No parts in QUOTA tab.</p>
                      <p className="text-xs max-w-xs leading-relaxed">
                        High-value or specialized machinery components requiring custom logistics dimensions are listed here to generate official wholesale quotes.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quotaItems.map((item) => (
                        <div
                          key={item.part.id}
                          className="bg-white/[0.02] border border-[#FFB800]/20 rounded-2xl p-4 flex gap-4 hover:border-white/10 transition-colors"
                        >
                          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black">
                            <PreloadedImage
                              src={item.part.imageUrl}
                              alt={item.part.name}
                              partId={item.part.id}
                              className="w-full h-full object-cover"
                              containerClassName="w-full h-full"
                            />
                          </div>

                          <div className="flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[9px] font-black bg-[#FFB800]/10 text-[#FFB800] px-2 py-0.5 rounded uppercase tracking-wider">
                                  {item.part.brand}
                                </span>
                                <button
                                  onClick={() => onRemoveFromCart(item.part.id)}
                                  className="text-slate-500 hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <h4 className="text-sm font-extrabold text-white line-clamp-1 leading-tight uppercase">
                                {item.part.name}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-mono">PN: {item.part.partNumber}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              {/* Quantity control */}
                              <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                                <button
                                  onClick={() => onUpdateQuantity(item.part.id, item.quantity - 1)}
                                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-2.5 text-xs font-bold text-white font-mono">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.part.id, item.quantity + 1)}
                                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="text-right">
                                <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                                  QUOTE ONLY
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* CONTINUOUS DIRECT FORM REDIRECTION CTA */}
                      <div className="pt-6">
                        <button
                          onClick={() => {
                            requireCustomerAuth(() => {
                              onClose();
                              if (onOpenCartQuote) {
                                onOpenCartQuote();
                              }
                            }, 'Submit Quote Request');
                          }}
                          className="w-full bg-[#FFB800] hover:bg-white text-[#02060D] font-black py-4.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-[#FFB800]/15 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                        >
                          <span>Continue to Quote Details</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Footer Summary for Buy tab */}
              {activeCartTab === 'BUY' && buyItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-sm">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">
                        ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span>Logistics & Express Handling</span>
                      <span className="text-emerald-400 font-bold">FREE SHIPPING</span>
                    </div>
                    <div className="h-[1px] bg-white/10 my-2"></div>
                    <div className="flex items-center justify-between text-white font-extrabold text-base">
                      <span>Grand Total</span>
                      <span className="text-[#FFB800] font-mono">
                        ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#FFB800] hover:bg-white text-[#02060D] font-black py-4 rounded-2xl text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 shadow-xl shadow-[#FFB800]/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Stripe Checkout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* STRIPE SECURE CHECKOUT PORTAL MODAL */}
      <AnimatePresence>
        {showStripeModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => {
                if (!isProcessingPayment && !paymentSuccess) {
                  setShowStripeModal(false);
                }
              }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative z-10 w-full max-w-lg bg-[#0E1524] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-[#FFB800]/5 flex flex-col text-white"
            >
              {/* Stripe Branding Header */}
              <div className="bg-gradient-to-r from-[#635BFF] to-[#8075FF] p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black tracking-tighter uppercase">Stripe</span>
                      <span className="bg-white/20 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Secure Sandbox
                      </span>
                    </div>
                    <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold">International Payments Engine</p>
                  </div>
                </div>
                {!isProcessingPayment && !paymentSuccess && (
                  <button
                    onClick={() => setShowStripeModal(false)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Payment content */}
              <div className="p-6 sm:p-8 flex-1">
                {paymentSuccess ? (
                  <div className="py-8 flex flex-col items-center text-center space-y-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-12 h-12 stroke-[2.5]" />
                    </motion.div>
                    <h4 className="text-xl font-black text-white uppercase tracking-wider">Payment Received</h4>
                    <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                      Stripe successfully authorized charge on card ending with <span className="font-mono text-white">4242</span>.
                    </p>
                    <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs font-mono text-left space-y-1.5">
                      <div className="text-slate-500 uppercase tracking-wider">Transaction Invoice Receipt</div>
                      <div className="text-white">Amount Charged: <span className="text-[#FFB800] font-bold">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD</span></div>
                      <div className="text-white">Processor: Stripe Canada Inc.</div>
                      <div className="text-white">Transaction Reference: <span className="text-slate-400">ch_stripe_{Math.random().toString(36).substring(7)}</span></div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleStripePaymentSubmit} className="space-y-6">
                    {/* Amount Block */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total Amount Due</div>
                        <div className="text-2xl font-black text-[#FFB800] mt-1 font-mono">
                          ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1 text-slate-500 text-[10px] font-bold">
                        <span>🛡️ Stripe 256-Bit SSL Encryption</span>
                        <span>📦 Free Canadian Distribution</span>
                      </div>
                    </div>

                    {/* Stripe Card Fields */}
                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="e.g. MARC-ANDRÉ FLEURY"
                          disabled={isProcessingPayment}
                          className="w-full bg-white text-black font-semibold text-sm rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                        />
                      </div>

                      {/* Card details box */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Credit Card Details
                        </label>
                        <div className="bg-white rounded-xl divide-y divide-gray-200 overflow-hidden border border-white/10 shadow-sm text-black">
                          {/* Card number */}
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              disabled={isProcessingPayment}
                              className="w-full bg-white py-3.5 pl-4 pr-12 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#635BFF]/50"
                              placeholder="4242 4242 4242 4242"
                            />
                            <div className="absolute right-4 top-3.5 flex gap-1">
                              {/* Visa & Mastercard small cards logo info */}
                              <span className="text-[9px] font-black bg-slate-100 text-[#635BFF] px-1.5 py-0.5 rounded border border-slate-200">
                                VISA
                              </span>
                              <span className="text-[9px] font-black bg-slate-100 text-amber-600 px-1.5 py-0.5 rounded border border-slate-200">
                                MC
                              </span>
                            </div>
                          </div>

                          {/* Expiry & CVC in 2 columns */}
                          <div className="grid grid-cols-2 divide-x divide-gray-200">
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              disabled={isProcessingPayment}
                              className="w-full bg-white py-3.5 px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#635BFF]/50"
                              placeholder="MM / YY"
                            />
                            <input
                              type="text"
                              required
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value)}
                              disabled={isProcessingPayment}
                              className="w-full bg-white py-3.5 px-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#635BFF]/50"
                              placeholder="CVC"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stripe Secure Info Footer */}
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#635BFF]" />
                      <span>Certified PCI-DSS Compliant • Secure Tokenization Active</span>
                    </div>

                    {/* Checkout Button */}
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full bg-[#635BFF] hover:bg-[#5346E0] text-white font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#635BFF]/20 active:scale-95 transition-all duration-300 disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Processing Sandbox Payment...</span>
                        </>
                      ) : (
                        <span>Authorize Payment of ${(subtotal).toLocaleString('en-US', { minimumFractionDigits: 2 })} CAD</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
