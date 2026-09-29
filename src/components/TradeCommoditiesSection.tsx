import React, { useState } from 'react';
import { TRADE_COMMODITIES, TradeCommodity } from '../data/tradeData';
import { ShieldCheck, ArrowRight, Eye, Layers, Filter, CheckCircle2 } from 'lucide-react';

interface TradeCommoditiesSectionProps {
  onSelectCommodity: (commodity: TradeCommodity) => void;
  onAddToCart: (commodity: TradeCommodity) => void;
  onOpenRFQ: (commodity?: TradeCommodity) => void;
}

export const TradeCommoditiesSection: React.FC<TradeCommoditiesSectionProps> = ({
  onSelectCommodity,
  onAddToCart,
  onOpenRFQ
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Categories');

  const categories = [
    'All Categories',
    'Agricultural',
    'Industrial Metals',
    'Heavy Machinery Parts',
    'Energy & Lubricants'
  ];

  const filteredItems = activeCategory === 'All Categories'
    ? TRADE_COMMODITIES
    : TRADE_COMMODITIES.filter(item => item.category === activeCategory);

  return (
    <section id="trade-commodities" className="py-20 px-4 sm:px-8 bg-[#02060D] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#0A2033] border border-[#00E5FF]/30 text-[#00E5FF] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Verified Global Exchange Directory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Enterprise Commodities & <span className="text-[#00E5FF]">Industrial Parts</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Direct procurement access to Grade-A certified commodities, steel coils, fuel allocations, and precision heavy equipment replacement parts from Canadian & global depots.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#0F1C2B] rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#00E5FF] text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Commodity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0D1826] border border-slate-800/90 hover:border-[#00E5FF]/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Badges Overlay */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1826] via-transparent to-black/40"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                  <span className="bg-[#02060D]/90 backdrop-blur-md text-[#00E5FF] font-black text-[10px] px-2.5 py-1 rounded-md border border-[#00E5FF]/30 uppercase">
                    {item.category}
                  </span>
                  <span className="bg-[#0A2033]/90 backdrop-blur-md text-[#FFB800] font-mono font-bold text-[10px] px-2.5 py-1 rounded-md border border-[#FFB800]/30">
                    {item.code}
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-400 font-extrabold text-[10px] px-2.5 py-1 rounded-md border border-emerald-500/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>VERIFIED STOCK</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#00E5FF] transition-colors leading-snug line-clamp-2">
                    {item.name}
                  </h3>

                  <div className="text-xs text-slate-300 font-medium line-clamp-2">
                    {item.description}
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-slate-400 space-y-1 bg-[#09111C] p-2.5 rounded-lg border border-slate-800">
                    <div><span className="text-slate-500">Origin:</span> <strong className="text-slate-200">{item.origin}</strong></div>
                    <div><span className="text-slate-500">MOQ:</span> <strong className="text-slate-200">{item.minOrderQuantity}</strong></div>
                  </div>
                </div>

                {/* Price & Action Controls */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-bold">Exchange Benchmark</span>
                    <span className="text-base font-black text-[#FFB800] font-mono">
                      ${item.pricePerTon.toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCommodity(item)}
                      className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
                      title="View Full Specifications"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenRFQ(item)}
                      className="bg-[#00E5FF] hover:bg-[#00cbe3] text-slate-950 font-black text-xs px-3.5 py-2 rounded-lg uppercase flex items-center gap-1 transition-all cursor-pointer glow-cyan-sm"
                    >
                      <span>RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
