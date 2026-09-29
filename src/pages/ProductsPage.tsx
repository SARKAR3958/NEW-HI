import React from 'react';
import { motion } from 'motion/react';
import { ProductGallery } from '../components/ProductGallery';
import { CartItem } from '../components/ShoppingCartDrawer';

interface ProductsPageProps {
  onOpenQuoteModal: (part?: any) => void;
  onAddToCart?: (part: any) => void;
  cart?: CartItem[];
  onUpdateQuantity?: (partId: string, quantity: number) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ 
  onOpenQuoteModal, 
  onAddToCart,
  cart,
  onUpdateQuantity
}) => {
  return (
    <div className="bg-[#02060D] min-h-screen overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#02060D] py-20 px-4 text-center mt-[50px] pl-[17px]"
      >
        <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter">
          Our <span className="text-[#FFB800]">Products</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
          Premium Heavy Equipment Parts & Industrial Components
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProductGallery 
          onSelectPart={onOpenQuoteModal}
          onOpenQuoteModal={onOpenQuoteModal}
          onAddToCart={onAddToCart}
          cart={cart}
          onUpdateQuantity={onUpdateQuantity}
        />
      </motion.div>
    </div>
  );
};
