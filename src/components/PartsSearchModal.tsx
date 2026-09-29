import React, { useState } from 'react';
import { X, Search, Filter, CheckCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SAMPLE_PARTS, BRANDS_LIST, CATEGORIES_LIST, PartItem } from '../data/partsData';
import { PreloadedImage } from './PreloadedImage';

interface PartsSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (part?: PartItem) => void;
}

export const PartsSearchModal: React.FC<PartsSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredParts = SAMPLE_PARTS.filter((part) => {
    const matchesQuery =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.machineModel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'ALL' || part.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'ALL' || part.category === selectedCategory;

    return matchesQuery && matchesBrand && matchesCategory;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Modal Header */}
            <div className="bg-[#0A2240] text-white p-4 sm:p-6 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFC000] text-black rounded-full flex items-center justify-center font-black shadow-sm">
                  <Search className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight">3M+ Heavy Parts Search Engine</h3>
                  <p className="text-xs text-gray-300">Enter Part Number, Brand, or Equipment Model</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-white p-1.5 rounded-full hover:bg-blue-900/50 cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Controls */}
            <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 208-27-00120, Komatsu PC300, Hydraulic Pump..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-2 border-yellow-500 rounded-md py-3 pl-11 pr-4 text-sm font-semibold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-2xs"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-gray-600 font-bold">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter By:</span>
                </div>

                {/* Brand Select */}
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-3 py-1.5 font-semibold text-gray-800 focus:outline-none"
                >
                  <option value="ALL">All Brands ({BRANDS_LIST.length})</option>
                  {BRANDS_LIST.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>

                {/* Category Select */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-gray-300 rounded px-3 py-1.5 font-semibold text-gray-800 focus:outline-none"
                >
                  <option value="ALL">All Categories ({CATEGORIES_LIST.length})</option>
                  {CATEGORIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {(searchQuery || selectedBrand !== 'ALL' || selectedCategory !== 'ALL') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('ALL');
                      setSelectedCategory('ALL');
                    }}
                    className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results List with Cached Product Thumbnails */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredParts.length === 0 ? (
                <div className="text-center py-12 text-gray-500 space-y-2">
                  <p className="font-bold text-base">No parts matched your query.</p>
                  <p className="text-xs">
                    Can&apos;t find your exact part number? Request a custom quote and our specialist will source it in 15 mins.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal();
                    }}
                    className="mt-3 bg-[#0A2240] text-white font-extrabold text-xs px-5 py-2.5 rounded uppercase cursor-pointer"
                  >
                    Request Custom Part Quote
                  </button>
                </div>
              ) : (
                filteredParts.map((part) => (
                  <motion.div
                    key={part.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-yellow-500 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs group"
                  >
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="w-20 h-20 sm:w-24 sm:h-20 rounded-md overflow-hidden shrink-0 border border-gray-200 bg-gray-950">
                        <PreloadedImage
                          src={part.imageUrl}
                          alt={part.name}
                          partId={part.id}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform"
                          containerClassName="w-full h-full"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-[#0A2240] text-yellow-400 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                            {part.brand}
                          </span>
                          <span className="text-xs font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                            PN: {part.partNumber}
                          </span>
                          <span className="text-[10px] bg-green-100 text-green-800 font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Ready to Dispatch
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-gray-900 leading-snug">{part.name}</h4>
                        <p className="text-xs text-gray-500">{part.machineModel} • {part.specifications}</p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between border-t sm:border-t-0 pt-2 sm:pt-0">
                      <span className="text-sm font-black text-[#0A2240]">{part.priceEstimate}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onClose();
                          onOpenQuoteModal(part);
                        }}
                        className="bg-[#FFC000] hover:bg-[#e6ad00] text-black font-extrabold text-xs px-4 py-2 rounded flex items-center gap-1 uppercase cursor-pointer transition-colors shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Get Quote</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer info */}
            <div className="p-3 bg-gray-100 text-center text-xs text-gray-600 font-medium border-t border-gray-200">
              Showing {filteredParts.length} verified part numbers in Canadian distribution hubs.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
