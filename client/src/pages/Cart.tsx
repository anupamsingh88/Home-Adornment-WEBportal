import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import { Loader2, ShoppingCart, Trash2, CreditCard, Package, ChevronRight } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { formatPrice } from '@/lib/utils';

// Cart data is now managed through the cart context

export default function Cart() {
  const { user, isLoading } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Cart state from context
  const { items: cartItems, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);
  
  // Calculate total
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;
  
  // Handle checkout - Navigate to payment page
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Save cart data to localStorage for payment page
    try {
      localStorage.setItem('decornest-checkout-data', JSON.stringify({
        items: cartItems,
        subtotal,
        shipping,
        total
      }));
      
      // Navigate to payment page (using window.location for full page navigation)
      setTimeout(() => {
        setIsProcessing(false);
        window.location.href = '/payment';
      }, 800);
    } catch (error) {
      console.error('Error saving checkout data:', error);
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "There was an error proceeding to checkout. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#265550]" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <RevealOnScroll className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Items</h2>
                  
                  <div className="space-y-6">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center border-b border-gray-200 dark:border-gray-700 pb-6"
                        >
                          <div className="h-24 w-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-4 sm:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 sm:ml-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">{item.category.replace('-', ' ')}</p>
                              </div>
                              <p className="mt-2 sm:mt-0 text-lg font-semibold text-[#265550] dark:text-[#7cc9bc]">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  +
                                </button>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            {/* Order Summary */}
            <RevealOnScroll>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatPrice(shipping)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                        <span className="text-lg font-bold text-[#265550] dark:text-[#7cc9bc]">{formatPrice(total)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full flex items-center justify-center px-6 py-3 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                          </>
                        )}
                      </motion.button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          <span>Free shipping on orders above ₹10,000</span>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span>Secure payment processing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <motion.button
                  whileHover={{ x: -5 }}
                  onClick={() => setLocation('/products')}
                  className="flex items-center text-[#265550] hover:text-[#1b413d] dark:text-[#7cc9bc] dark:hover:text-white"
                >
                  <ChevronRight className="transform rotate-180 h-5 w-5 mr-2" />
                  Continue Shopping
                </motion.button>
              </div>
            </RevealOnScroll>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-10 text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
              <ShoppingCart className="h-10 w-10 text-gray-400 dark:text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550]"
            >
              Start Shopping
            </motion.a>
          </div>
        )}
      </div>
    </div>
  );
}