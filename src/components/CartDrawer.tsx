import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { TradeCommodity } from '../data/tradeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: TradeCommodity[];
  onRemoveFromCart: (id: string) => void;
  onOpenRFQ: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onOpenRFQ
}) => {
  if (!isOpen) return null;

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.pricePerTon, 0).toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-end">
      <div className="bg-[#0D1826] text-white w-full max-w-md h-full shadow-2xl border-l border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-[#0A2033] flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00E5FF]" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">
              RFQ Cart Items ({cartItems.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="font-bold text-sm">Your RFQ Cart is empty.</p>
              <p className="text-xs text-slate-500">
                Browse our commodities & heavy equipment directory and click &quot;RFQ&quot; to add target items.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#02060D] border border-slate-800 rounded-xl flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] bg-[#0A2033] text-[#00E5FF] px-2 py-0.5 rounded font-mono">
                    {item.code}
                  </span>
                  <h4 className="font-extrabold text-xs text-white leading-tight">{item.name}</h4>
                  <p className="text-[11px] font-mono text-[#FFB800]">${item.pricePerTon} {item.priceUnit}</p>
                </div>

                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 cursor-pointer"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#0A2033] border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Estimated Benchmark Total:</span>
              <span className="text-lg font-black text-[#00E5FF]">${calculateTotal()} USD</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenRFQ();
              }}
              className="w-full bg-[#00E5FF] hover:bg-[#00cbe3] text-slate-950 font-black py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer glow-cyan-sm"
            >
              <span>Proceed to Batch RFQ</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
