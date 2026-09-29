import React from 'react';
import { TICKER_DATA } from '../data/tradeData';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export const TickerBar: React.FC = () => {
  return (
    <div className="bg-[#050B12] text-slate-300 py-2.5 border-y border-slate-800/90 font-mono text-xs overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 bg-[#0A1A2B] text-[#00E5FF] px-2.5 py-1 rounded font-extrabold text-[10px] uppercase tracking-wider shrink-0 border border-[#00E5FF]/30">
          <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
          <span>EXCHANGE LIVE TICKER</span>
        </div>

        {/* Marquee Ticker Items Container */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap">
          {TICKER_DATA.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0 group cursor-pointer hover:text-white transition-colors">
              <span className="bg-slate-800/80 text-slate-300 font-bold text-[10px] px-1.5 py-0.5 rounded">
                {item.category}
              </span>
              <span className="font-semibold text-slate-200">{item.name}:</span>
              <span className="font-bold text-white">{item.price}</span>
              <span
                className={`flex items-center gap-0.5 font-bold text-[11px] ${
                  item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
