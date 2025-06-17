import { useState } from 'react';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      // If product is already in cart, show added state
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      return;
    }
    
    setIsAdding(true);
    
    // Add item to cart after a short delay to show animation
    setTimeout(() => {
      addItem(product);
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset button state after a delay
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 600);
  };
  
  // Check if product is in cart already
  const inCart = isInCart(product.id);
  
  return (
    <motion.div 
      className={`product-card rounded-lg overflow-hidden bg-white dark:bg-[#1E1E1E] shadow-sm hover:shadow-xl transition-all duration-300 ${inCart ? 'ring-2 ring-[#265550] ring-opacity-50' : ''}`}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        {inCart && (
          <div className="absolute top-3 left-3 z-10 bg-[#265550] text-white text-xs px-2 py-1 rounded-full">
            In Cart
          </div>
        )}
        <img 
          src={product.image || 'https://via.placeholder.com/300x300?text=Product+Image'} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-105'}`}
        />
        <div className="absolute top-3 right-3">
          <motion.button 
            className={`p-2 rounded-full shadow-md transition-colors ${isFavorite ? 'bg-[#265550] text-white' : 'bg-white hover:bg-[#265550] hover:text-white'}`}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            aria-label="Add to wishlist"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={16} className={isFavorite ? 'fill-white' : ''} />
          </motion.button>
        </div>
        
        {/* Price tag with badge effect */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md text-sm font-bold text-[#265550] dark:text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 capitalize">{product.category.replace('-', ' ')}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {product.rating && (
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(product.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.rating})</span>
              </div>
            )}
          </div>
          <motion.button 
            className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 ${
              isAdded 
                ? 'bg-green-500' 
                : isAdding 
                  ? 'bg-gray-400' 
                  : 'bg-[#265550] hover:bg-[#1b413d]'
            }`}
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div 
                  key="added"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center"
                >
                  <Check className="mr-1" size={16} />
                  Added
                </motion.div>
              ) : isAdding ? (
                <motion.div 
                  key="adding"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="mr-1"
                  >
                    <ShoppingBag size={16} />
                  </motion.div>
                  Adding...
                </motion.div>
              ) : (
                <motion.div 
                  key="add"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center"
                >
                  <ShoppingBag className="mr-1" size={16} />
                  {inCart ? 'In Cart' : 'Add to Cart'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
