import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { OurAdvantages } from './components/OurAdvantages';
import { CustomManufacturing } from './components/CustomManufacturing';
import { BrandsWeWorkWith } from './components/BrandsWeWorkWith';
import { ProductGallery } from './components/ProductGallery';
import { AboutUs } from './components/AboutUs';
import { LeaveUsMessage } from './components/LeaveUsMessage';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { ShoppingCartDrawer, CartItem } from './components/ShoppingCartDrawer';

// Page Components
import { ProductsPage } from './pages/ProductsPage';
import { CompanyPage } from './pages/CompanyPage';
import { GalleryPage } from './pages/GalleryPage'; // Renamed Markets to Gallery Page
import { BrandsPage } from './pages/BrandsPage';
import { MachineryPage } from './pages/MachineryPage';
import { IndustryPage } from './pages/IndustryPage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage, ProfileRequestItem } from './pages/ProfilePage'; // New Profile/My Requests view

import { PartsSearchModal } from './components/PartsSearchModal';
import { GetQuoteModal } from './components/GetQuoteModal';
import { AuthModal } from './components/AuthModal'; // New Auth Modal
import { CartQuoteModal } from './components/CartQuoteModal'; // New Cart RFQ Modal
import { WhatsAppChatModal } from './components/WhatsAppChatModal';
import { VideoModal } from './components/VideoModal';
import { ALL_PRELOAD_IMAGES, PartItem } from './data/partsData';
import { useGlobalImageCache } from './components/PreloadedImage';

// Marketplace Context & Components
import { useMarketplace } from './marketplace/context/MarketplaceContext';
import { RoleSelectionModal } from './marketplace/components/RoleSelectionModal';
import { CustomerAuthModal } from './marketplace/components/CustomerAuthModal';
import { VendorRegistrationModal } from './marketplace/components/VendorRegistrationModal';
import { VendorStatusModal } from './marketplace/components/VendorStatusModal';
import { LoginRequiredModal } from './marketplace/components/LoginRequiredModal';
import { CustomerPortal } from './marketplace/components/CustomerPortal';
import { VendorPortal } from './marketplace/components/VendorPortal';
import { AdminPortal } from './marketplace/components/AdminPortal';
import { RoleQuickSwitcher } from './marketplace/components/RoleQuickSwitcher';

// Premium Historical Demo Seeding Database
const INITIAL_DEMO_REQUESTS: ProfileRequestItem[] = [
  {
    id: 'RFQ-90051',
    date: '2026-09-24',
    urgency: 'Standard (1-3 Days Delivery)',
    notes: 'Please verify track pin diameter compatibilities with older Komatsu series models.',
    status: 'APPROVED',
    adminReply: 'PROPOSAL APPROVED:\n- Track Chain assembly (49 Links) verified compatible with PC300-7.\n- Special wholesale pricing of $3,900.00 CAD applied (15% Partner Discount).\n- In-stock at our Calgary dispatch terminal. Freight delivery is ready for release.',
    items: [
      {
        id: 'p-101',
        name: 'Heavy Duty Track Chain Assembly (49 Links)',
        partNumber: '208-27-00120',
        brand: 'KOMATSU',
        quantity: 1,
        priceEstimate: '$2,450.00 CAD',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'RFQ-89942',
    date: '2026-09-18',
    urgency: 'Immediate / Machine Down',
    notes: 'Hydraulic cylinder leaking badly on R924 excavator boom. Urgently need the slewing ring tooth counts checked.',
    status: 'REJECTED',
    adminReply: 'REQUEST RESOLUTION:\nSlewing ring gear PN: A924-400-1120 for Liebherr R924 model is temporarily out of production globally. We have rejected this specific RFQ. However, our technical desk suggests utilizing the updated A924-400-1125 casting replacement instead. Contact us directly to configure.',
    items: [
      {
        id: 'p-107',
        name: 'Swing Bearing Slewing Ring Gear',
        partNumber: 'A924-400-1120',
        brand: 'LIEBHERR',
        quantity: 1,
        priceEstimate: 'Contact for Pricing',
        imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'RFQ-90184',
    date: '2026-09-27',
    urgency: 'Standard (1-3 Days Delivery)',
    notes: 'Standard spring overhaul order for backup fleets.',
    status: 'PENDING',
    adminReply: 'STATUS UPDATE:\nWe are currently verifying precise stock levels for track recoil springs with our Vancouver logistics hub. Logistics estimates and custom transport dimensions will be updated here in less than 15 minutes. Stand by.',
    items: [
      {
        id: 'p-104',
        name: 'Track Tensioner Recoil Spring Group',
        partNumber: '921/52800',
        brand: 'JCB',
        quantity: 1,
        priceEstimate: 'Inquire for Quote',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  
  // Global Image Preloader & Cache
  const { progress, isPreloading } = useGlobalImageCache(ALL_PRELOAD_IMAGES);

  // Marketplace Context
  const {
    currentCustomer,
    activeRole,
    setShowCustomerAuthModal
  } = useMarketplace();

  // Authentication states (Default logged in to Marc-André Fleury for immediate testing)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone: string; company: string } | null>({
    name: 'MARC-ANDRÉ FLEURY',
    email: 'FLEURY@EARTHWORKS.CA',
    phone: '+1 (431) 990-6055',
    company: 'HEAVY EARTHWORKS INC.'
  });

  // Effective buyer profile for legacy components
  const activeUser = currentCustomer ? {
    name: currentCustomer.name,
    email: currentCustomer.email,
    phone: currentCustomer.phone,
    company: currentCustomer.company || 'HEAVY EARTHWORKS INC.'
  } : (activeRole === 'guest' ? null : currentUser);

  // User past and live Requests/Quotations state
  const [userRequests, setUserRequests] = useState<ProfileRequestItem[]>(() => {
    const saved = localStorage.getItem('hammer_user_rfqs');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem('hammer_user_rfqs', JSON.stringify(userRequests));
  }, [userRequests]);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal states
  const [isPartsSearchOpen, setIsPartsSearchOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartQuoteOpen, setIsCartQuoteOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartItem | null>(null);

  // Floating Cart Bouncing state
  const [bouncingCart, setBouncingCart] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setBouncingCart(true);
      const t = setTimeout(() => setBouncingCart(false), 800);
      return () => clearTimeout(t);
    }
  }, [cart.reduce((sum, item) => sum + item.quantity, 0)]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleScrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      const offset = 100; // Account for fixed header
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenQuoteWithPart = (part?: PartItem) => {
    setSelectedPart(part || null);
    setIsQuoteModalOpen(true);
  };

  // Cart action handlers
  const handleAddToCart = (part: PartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.part.id === part.id);
      if (existing) {
        return prev.map((item) =>
          item.part.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { part, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (partId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(partId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.part.id === partId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (partId: string) => {
    setCart((prev) => prev.filter((item) => item.part.id !== partId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Check if price estimate is numeric
  const isBuyItem = (priceEstimate: string) => {
    return /[\d]/.test(priceEstimate) && !/Inquire|Contact/i.test(priceEstimate);
  };

  // Bulk Cart Quote Submission handler
  const handleCartQuoteSubmit = (quoteDetails: {
    company: string;
    phone: string;
    urgency: string;
    notes: string;
    items: CartItem[];
  }) => {
    const newRef = `RFQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRequest: ProfileRequestItem = {
      id: newRef,
      date: new Date().toISOString().split('T')[0],
      urgency: quoteDetails.urgency,
      notes: quoteDetails.notes,
      status: 'PENDING',
      adminReply: 'Awaiting heavy parts desk review. We are currently verifying specific stock levels and transport logistics dimensions.',
      items: quoteDetails.items.map((i) => ({
        id: i.part.id,
        name: i.part.name,
        partNumber: i.part.partNumber,
        brand: i.part.brand,
        quantity: i.quantity,
        priceEstimate: i.part.priceEstimate,
        imageUrl: i.part.imageUrl
      }))
    };

    // Add to request list
    setUserRequests((prev) => [newRequest, ...prev]);

    // Clear quota-only items from cart
    setCart((prev) => prev.filter((item) => isBuyItem(item.part.priceEstimate)));

    // Redirect to profile/ledger tab to see pending status
    setActiveTab('PROFILE');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'PRODUCTS':
        return (
          <ProductsPage 
            onOpenQuoteModal={handleOpenQuoteWithPart} 
            onAddToCart={handleAddToCart} 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'COMPANY':
        return (
          <CompanyPage 
            onPlayVideo={() => setIsVideoOpen(true)} 
            onOpenRFQ={() => handleOpenQuoteWithPart()} 
          />
        );
      case 'GALLERY':
        return <GalleryPage />;
      case 'BRANDS':
        return <BrandsPage />;
      case 'MACHINERY':
        return <MachineryPage />;
      case 'INDUSTRY':
        return <IndustryPage />;
      case 'CONTACT':
        return <ContactPage />;
      case 'PROFILE':
        return (
          <ProfilePage
            user={activeUser}
            userRequests={userRequests}
            onLogout={() => setCurrentUser(null)}
            onPayRequest={(amt, ref) => {
              // Simulates paying for approved requests via Stripe Checkout
              alert(`Sandbox Stripe authorization launched for approved proposal ${ref}.`);
            }}
          />
        );
      case 'HOME':
      default:
        return (
          <>
            {/* 3. Hero Slider with customized Explore Inventory scroll redirection */}
            <HeroSlider
              onInitiateRFQ={() => handleOpenQuoteWithPart()}
              onOpenPartsSearch={() => setActiveTab('PRODUCTS')}
              onExploreInventory={() => handleScrollToSection('product-gallery')}
            />

            {/* 4. Our Advantages Section */}
            <OurAdvantages />

            {/* 5. Custom Manufacturing Services Section */}
            <CustomManufacturing
              onSelectMachinery={() => setActiveTab('PRODUCTS')}
            />

            {/* 6. Product Gallery Section (Interactive checkout) */}
            <ProductGallery
              onSelectPart={(part) => handleOpenQuoteWithPart(part)}
              onOpenQuoteModal={(part) => handleOpenQuoteWithPart(part)}
              onAddToCart={handleAddToCart}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
            />

            {/* 7. About Us Section */}
            <AboutUs
              onPlayVideo={() => setIsVideoOpen(true)}
              onOpenRFQ={() => handleOpenQuoteWithPart()}
            />

            {/* 8. Brands We Work With Section */}
            <BrandsWeWorkWith
              onBrandClick={() => setActiveTab('PRODUCTS')}
            />

            {/* 9. Leave Us Message Section */}
            <LeaveUsMessage />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#02060D] font-sans text-white selection:bg-[#FFB800] selection:text-black antialiased relative">
      {/* 0. App Premium Splash Screen */}
      <SplashScreen />

      {/* Top Preloader Progress Indicator */}
      {isPreloading && (
        <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/10 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-[#FFB800] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* 1. Navigation Bar - Fixed */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPartsSearch={() => setActiveTab('PRODUCTS')}
        onOpenQuoteModal={() => handleOpenQuoteWithPart()}
        onScrollToSection={handleScrollToSection}
        currentUser={activeUser}
        onOpenAuthModal={() => setShowCustomerAuthModal(true)}
      />

      {/* Main Page Layout */}
      <main className="pt-0">
        {renderContent()}
      </main>

      {/* 10. Footer */}
      <Footer onNavClick={setActiveTab} />

      {/* Shopping Cart Sidebar Drawer */}
      <ShoppingCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onOpenCartQuote={() => setIsCartQuoteOpen(true)}
      />

      {/* Floating Bottom CART Button with Bounce Animation */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotate: bouncingCart ? [0, -6, 6, -6, 6, 0] : 0
            }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 20,
              rotate: { duration: 0.5, ease: 'easeInOut' }
            }}
            onClick={() => setIsCartOpen(true)}
            className={`fixed bottom-6 right-6 z-40 bg-[#FFB800] hover:bg-white text-[#02060D] font-black px-6 py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-2xl shadow-[#FFB800]/30 border border-white/25 active:scale-95 transition-all cursor-pointer ${
              bouncingCart ? 'ring-4 ring-[#FFB800]/50' : ''
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Direct Modals */}
      <PartsSearchModal
        isOpen={isPartsSearchOpen}
        onClose={() => setIsPartsSearchOpen(false)}
        onOpenQuoteModal={(part) => handleOpenQuoteWithPart(part)}
      />

      <GetQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setSelectedPart(null);
        }}
        selectedPart={selectedPart}
      />

      {/* Secure Corporate Partner Auth Portal Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Secure Cart Bulk RFQ Quote Submission Modal */}
      <CartQuoteModal
        isOpen={isCartQuoteOpen}
        onClose={() => setIsCartQuoteOpen(false)}
        quotaItems={cart.filter((item) => !isBuyItem(item.part.priceEstimate))}
        onSubmitSuccess={handleCartQuoteSubmit}
      />

      <WhatsAppChatModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* ============================================================ */}
      {/* MULTI-VENDOR MARKETPLACE COMPONENTS & MODALS                */}
      {/* ============================================================ */}
      <RoleSelectionModal />
      <CustomerAuthModal />
      <VendorRegistrationModal />
      <VendorStatusModal />
      <LoginRequiredModal />
      <CustomerPortal onOpenCart={() => setIsCartOpen(true)} />
      <VendorPortal />
      <AdminPortal />
      <RoleQuickSwitcher />
    </div>
  );
}
