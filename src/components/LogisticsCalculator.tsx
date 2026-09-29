import React, { useState } from 'react';
import { LOGISTICS_DESTINATIONS } from '../data/tradeData';
import { Anchor, Ship, Globe, ArrowRight, ShieldCheck, Clock, Calculator } from 'lucide-react';

interface LogisticsCalculatorProps {
  onOpenRFQ: () => void;
}

export const LogisticsCalculator: React.FC<LogisticsCalculatorProps> = ({ onOpenRFQ }) => {
  const [originPort, setOriginPort] = useState('Port of Vancouver (Pacific)');
  const [selectedDestination, setSelectedDestination] = useState(LOGISTICS_DESTINATIONS[0]);
  const [cargoType, setCargoType] = useState('20ft FCL Container');
  const [tonnage, setTonnage] = useState(500);

  const calculateTotalEstimate = () => {
    const rateMatch = parseInt(selectedDestination.estCostPerTon.split('-')[0].replace('$', '')) || 40;
    return (tonnage * rateMatch).toLocaleString();
  };

  return (
    <section id="logistics-strategy" className="py-20 px-4 sm:px-8 bg-[#02060D] text-white border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0A2033] border border-[#00E5FF]/30 text-[#00E5FF] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5" />
            <span>End-to-End Supply Chain Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Cross-Border Logistics & <span className="text-[#00E5FF]">Freight Strategy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Optimized ocean freight shipping, vessel chartering, and rail logistics from Canadian ports to 50+ international trade corridors with real-time tracking and documentation control.
          </p>
        </div>

        {/* Interactive Freight Route & Rate Estimator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calculator Controls */}
          <div className="lg:col-span-7 bg-[#0D1826] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Instant Freight Matrix Calculator</h3>
                <p className="text-xs text-slate-400">Estimate ocean transit & port-to-port logistics costs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              {/* Origin Port */}
              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Canadian Origin Hub *</label>
                <select
                  value={originPort}
                  onChange={(e) => setOriginPort(e.target.value)}
                  className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  <option>Port of Vancouver (Pacific Corridor)</option>
                  <option>Port of Montreal (Atlantic/St. Lawrence)</option>
                  <option>Port of Halifax (Deepwater Gateway)</option>
                  <option>Winnipeg Inland Intermodal Terminal</option>
                </select>
              </div>

              {/* Destination Port */}
              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Global Destination Port *</label>
                <select
                  value={selectedDestination.port}
                  onChange={(e) => {
                    const dest = LOGISTICS_DESTINATIONS.find(d => d.port === e.target.value);
                    if (dest) setSelectedDestination(dest);
                  }}
                  className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  {LOGISTICS_DESTINATIONS.map((d) => (
                    <option key={d.port} value={d.port}>
                      {d.city}, {d.country} ({d.port})
                    </option>
                  ))}
                </select>
              </div>

              {/* Cargo Transport Mode */}
              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Logistics Mode / Cargo Type</label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full bg-[#02060D] border border-slate-700 rounded-lg p-3 text-white focus:border-[#00E5FF] focus:outline-none"
                >
                  <option>20ft FCL Dry Container</option>
                  <option>40ft HC Heavy Container</option>
                  <option>Bulk Grain / Dry Vessel Charter</option>
                  <option>Heavy Equipment Breakbulk / RoRo</option>
                </select>
              </div>

              {/* Tonnage / Volume Slider */}
              <div>
                <label className="block text-slate-300 mb-1.5 font-bold">Estimated Tonnage: <span className="text-[#00E5FF]">{tonnage} MT</span></label>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={tonnage}
                  onChange={(e) => setTonnage(parseInt(e.target.value))}
                  className="w-full accent-[#00E5FF] cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* Calculated Results Banner */}
            <div className="p-4 bg-[#0A1D2E] border border-[#00E5FF]/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Freight Baseline</span>
                <span className="text-2xl font-black text-[#00E5FF] font-mono">${calculateTotalEstimate()} <span className="text-xs text-slate-300 font-normal">USD</span></span>
              </div>

              <button
                onClick={onOpenRFQ}
                className="w-full sm:w-auto bg-[#FFB800] hover:bg-[#e0a200] text-slate-950 font-black px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book / Lock Rate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Destination Hub Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
              Active Trade Corridors & Transit Times
            </h3>

            <div className="space-y-3">
              {LOGISTICS_DESTINATIONS.map((dest, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedDestination(dest)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedDestination.port === dest.port
                      ? 'bg-[#0F2236] border-[#00E5FF] shadow-lg ring-1 ring-[#00E5FF]/50'
                      : 'bg-[#0D1826] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center font-bold">
                      <Ship className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{dest.city}, {dest.country}</h4>
                      <span className="text-xs text-slate-400 font-mono">{dest.port}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#FFB800] block">{dest.transitDays}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{dest.estCostPerTon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
