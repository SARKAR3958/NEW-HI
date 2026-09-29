import React, { useState } from 'react';
import { Youtube, Search, ShoppingCart, SlidersHorizontal, CheckCircle, Plus, Minus } from 'lucide-react';
import { SAMPLE_PARTS, PartItem } from '../data/partsData';
import { PreloadedImage } from './PreloadedImage';
import { CartItem } from './ShoppingCartDrawer';
import { useMarketplace } from '../marketplace/context/MarketplaceContext';

interface ProductGalleryProps {
  onSelectPart?: (part: PartItem) => void;
  onOpenQuoteModal?: (part?: PartItem) => void;
  onAddToCart?: (part: PartItem) => void;
  cart?: CartItem[];
  onUpdateQuantity?: (partId: string, quantity: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  onOpenQuoteModal,
  onAddToCart,
  cart = [],
  onUpdateQuantity
}) => {
  const { requireCustomerAuth } = useMarketplace();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Undercarriage Parts', 'Hydraulic Pumps & Motors', 'Engine Components', 'Transmission & Final Drive'];

  // Filter parts by category AND search query (model number, name, brand, spec, or category)
  const filteredParts = SAMPLE_PARTS.filter((p) => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.machineModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specifications.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="product-gallery" className="pb-24 px-6 lg:px-16 xl:px-20 bg-[#02060D] text-white">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
              <span className="w-6 h-px bg-[#FFB800]"></span>
              Premium Inventory
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-tight">
              Verified Industrial <br />
              <span className="text-slate-500">Components.</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open('https://youtube.com', '_blank')}
              className="text-[11px] font-black uppercase tracking-widest text-[#FFB800] flex items-center gap-2 hover:text-white transition-colors btn-glass-hover px-4 py-2 rounded-full cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              Watch Technical Demos
            </button>
          </div>
        </div>

        {/* Real-time Inline Search Bar Container */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[30px] p-6 space-y-6 animate-in fade-in duration-1000 delay-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by part name, brand (Komatsu, Liebherr, JCB), PN number, machinery model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800]/50 focus:ring-1 focus:ring-[#FFB800]/30 transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-4" />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <SlidersHorizontal className="w-4 h-4 text-[#FFB800]" />
              <span>Filter Category</span>
            </div>
          </div>

          {/* Filter Tabs inside search container */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#FFB800] text-[#02060D] shadow-lg shadow-[#FFB800]/10 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Exactly 4 columns per row for larger cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredParts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 space-y-4">
              <p className="font-extrabold text-lg text-slate-300">No parts matched your search query.</p>
              <p className="text-xs max-w-md mx-auto">
                Can&apos;t find your exact part number or specifications? Click request quote in actions or email us. We can source any heavy machine part worldwide.
              </p>
            </div>
          ) : (
            filteredParts.map((part, idx) => {
              // Find if this specific part is already in the shopping cart
              const activeCartItem = cart.find((item) => item.part.id === part.id);

              return (
                <div
                  key={part.id}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-[#FFB800]/40 hover:-translate-y-1.5 active:scale-98 transition-all duration-500 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div 
                    onClick={() => onOpenQuoteModal && onOpenQuoteModal(part)}
                    className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
                  >
                    <PreloadedImage
                      src={part.imageUrl}
                      alt={part.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/80 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Tag Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-[#02060D]/80 backdrop-blur-md text-[#FFB800] text-[9px] font-black uppercase tracking-widest border border-white/10 shadow-sm">
                        {part.brand}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> In Stock
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                        <span>{part.category}</span>
                        <span className="text-slate-400 font-mono">PN: {part.partNumber}</span>
                      </div>
                      <h3 
                        onClick={() => onOpenQuoteModal && onOpenQuoteModal(part)}
                        className="text-lg font-black uppercase tracking-tight text-white leading-tight cursor-pointer hover:text-[#FFB800] transition-colors line-clamp-2"
                      >
                        {part.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium line-clamp-2">{part.description}</p>
                      <div className="text-sm font-black text-[#FFB800] pt-1">{part.priceEstimate}</div>
                    </div>

                    {/* Interactive Quantity Sizing Incrementor on Card directly */}
                    {activeCartItem ? (
                      <div className="flex items-center justify-between w-full bg-[#FFB800] text-[#02060D] rounded-2xl p-1 shadow-md shadow-[#FFB800]/10 border border-white/15">
                        <button
                          onClick={() => onUpdateQuantity && onUpdateQuantity(part.id, activeCartItem.quantity - 1)}
                          className="w-10 h-10 bg-black/10 hover:bg-black/20 text-[#02060D] rounded-xl flex items-center justify-center font-black transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="text-[10px] font-black uppercase tracking-wider font-mono">
                          {activeCartItem.quantity} Added to Cart
                        </span>
                        <button
                          onClick={() => onUpdateQuantity && onUpdateQuantity(part.id, activeCartItem.quantity + 1)}
                          className="w-10 h-10 bg-black/10 hover:bg-black/20 text-[#02060D] rounded-xl flex items-center justify-center font-black transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          requireCustomerAuth(
                            () => onAddToCart && onAddToCart(part),
                            `Add to Cart: ${part.name}`
                          )
                        }
                        className="group/btn w-full bg-[#FFB800] text-[#02060D] font-black text-[10px] py-4 rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#FFB800]/5 hover:bg-white hover:text-[#02060D] hover:-translate-y-0.5 hover:scale-102 active:scale-95 transition-all duration-300 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                        ADD TO CART
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
