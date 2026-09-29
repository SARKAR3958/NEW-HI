import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, LogIn, UserPlus, ShieldCheck, Layers, Menu, X } from 'lucide-react';

interface MainHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onOpenRegister: (type: 'buyer' | 'supplier') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenLogin,
  onOpenRegister,
  onScrollToSection
}) => {
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabName: string, sectionId?: string) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    if (sectionId) {
      onScrollToSection(sectionId);
    }
  };

  return (
    <header className="bg-[#02060D]/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800/80 py-3.5 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('Home', 'hero');
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          {/* Logo Shield / Crown Icon */}
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFB800] via-[#0A2033] to-[#00E5FF] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#02060D] rounded-[7px] flex items-center justify-center relative overflow-hidden">
              <span className="font-serif font-black text-[#FFB800] text-lg tracking-tighter">HI</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Logo Text Block */}
          <div className="flex flex-col leading-tight">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-tight">
              Hammer Industrial
            </span>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <span>Enterprise</span>
              <span className="text-[#00E5FF] font-bold tracking-wide">Commodity Exchange</span>
            </span>
          </div>
        </a>

        {/* Center: Floating Navigation Capsule */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121E2B]/90 border border-slate-700/80 rounded-full px-3 py-1.5 shadow-lg">
          <button
            onClick={() => handleNavClick('Home', 'hero')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'Home'
                ? 'bg-[#243345] text-white shadow-xs'
                : 'text-slate-300 hover:text-[#00E5FF]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick('About Us', 'about-us')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'About Us'
                ? 'bg-[#243345] text-white shadow-xs'
                : 'text-slate-300 hover:text-[#00E5FF]'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => handleNavClick('Products', 'trade-commodities')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'Products'
                ? 'bg-[#243345] text-white shadow-xs'
                : 'text-slate-300 hover:text-[#00E5FF]'
            }`}
          >
            Products
          </button>

          <button
            onClick={() => handleNavClick('Contact Us', 'leave-message')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'Contact Us'
                ? 'bg-[#243345] text-white shadow-xs'
                : 'text-slate-300 hover:text-[#00E5FF]'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right: Cart, Register Dropdown & Login Button */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#121E2B] border border-slate-700 hover:border-[#00E5FF] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-slate-200" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00E5FF] text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Register Dropdown Button */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setRegisterDropdownOpen(!registerDropdownOpen)}
              className="bg-[#121E2B] hover:bg-[#1a2b3d] border border-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Register</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {registerDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#0D1826] border border-slate-700 rounded-xl shadow-2xl py-2 z-50 normal-case">
                <button
                  onClick={() => {
                    setRegisterDropdownOpen(false);
                    onOpenRegister('buyer');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-[#152538] hover:text-[#00E5FF] flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                  <div>
                    <div className="font-bold">Register as Buyer</div>
                    <div className="text-[10px] text-slate-400 font-normal">Verified commodity buyer account</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRegisterDropdownOpen(false);
                    onOpenRegister('supplier');
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-[#152538] hover:text-[#00E5FF] flex items-center gap-2 border-t border-slate-800"
                >
                  <Layers className="w-4 h-4 text-[#FFB800]" />
                  <div>
                    <div className="font-bold">Register as Supplier</div>
                    <div className="text-[10px] text-slate-400 font-normal">Canadian & Global producer listing</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Login Button (Solid Gold/Amber) */}
          <button
            onClick={onOpenLogin}
            className="bg-[#FFB800] hover:bg-[#e5a500] active:scale-95 text-slate-950 font-black text-xs px-4 sm:px-5 py-2 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-md transition-all cursor-pointer glow-gold"
          >
            <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Login</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 bg-[#0D1826] border-t border-slate-800 rounded-b-xl space-y-3 font-semibold text-xs text-slate-200">
          <button
            onClick={() => handleNavClick('Home', 'hero')}
            className="block w-full text-left py-2 border-b border-slate-800 text-[#00E5FF]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('About Us', 'about-us')}
            className="block w-full text-left py-2 border-b border-slate-800"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('Products', 'trade-commodities')}
            className="block w-full text-left py-2 border-b border-slate-800"
          >
            Products & Commodities
          </button>
          <button
            onClick={() => handleNavClick('Contact Us', 'leave-message')}
            className="block w-full text-left py-2 border-b border-slate-800"
          >
            Contact Us
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister('buyer');
              }}
              className="w-full bg-[#121E2B] border border-slate-700 py-2 rounded-lg text-center font-bold text-white"
            >
              Register Buyer Account
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister('supplier');
              }}
              className="w-full bg-[#00E5FF] text-slate-950 py-2 rounded-lg text-center font-extrabold"
            >
              Register Supplier Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
