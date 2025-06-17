import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Smartphone, 
  Check, 
  Copy, 
  AlertCircle, 
  ArrowRight,
  ChevronsRight,
  Download,
  CreditCardIcon
} from 'lucide-react';
import QRCode from 'qrcode';
import RevealOnScroll from '@/components/RevealOnScroll';
import SimplePaypalButton from '@/components/SimplePaypalButton';

const UPI_ID = "anupam03122003@okaxis";
const PHONE_NUMBER = "+91 8765782107";

export default function Payment() {
  const { user, isLoading } = useAuth();
  const { getTotalPrice, clearCart } = useCart();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isPaying, setIsPaying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize with checkout data from localStorage or cart total if available
  useEffect(() => {
    try {
      // Try to get checkout data from localStorage (set by Cart page)
      const checkoutData = localStorage.getItem('decornest-checkout-data');
      if (checkoutData) {
        const { total } = JSON.parse(checkoutData);
        setAmount(total.toString());
      } else {
        // Fallback to cart total
        const cartTotal = getTotalPrice();
        if (cartTotal > 0) {
          setAmount(cartTotal.toString());
        }
      }
    } catch (error) {
      console.error('Error loading checkout data:', error);
      // Fallback to cart total
      const cartTotal = getTotalPrice();
      if (cartTotal > 0) {
        setAmount(cartTotal.toString());
      }
    }
  }, [getTotalPrice]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);
  
  // Generate QR code when amount is entered or changed
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=DecorNest&am=${amount}&cu=INR&tn=Payment for DecorNest order`;
      
      QRCode.toDataURL(upiUrl, { 
        width: 300,
        margin: 2,
        color: {
          dark: '#265550',
          light: '#FFFFFF'
        }
      })
        .then(url => {
          setQrCodeUrl(url);
        })
        .catch(err => {
          console.error('Error generating QR code:', err);
          toast({
            title: "QR Code Generation Failed",
            description: "Could not generate QR code for payment.",
            variant: "destructive",
          });
        });
    } else {
      setQrCodeUrl(null);
    }
  }, [amount, toast]);
  
  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setIsCopied(true);
    
    toast({
      title: "UPI ID Copied",
      description: "The UPI ID has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const downloadQrCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `DecorNest-UPI-Payment-${amount}.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    
    setIsPaying(true);
    
    // Generate QR Code and display it
    setTimeout(() => {
      setIsPaying(false);
      setShowQrCode(true);
      
      toast({
        title: "Scan QR Code to Pay",
        description: "Use any UPI app to scan the QR code and complete the payment.",
      });
    }, 1000);
  };
  
  const completePayment = () => {
    // Save the order to localStorage for the Orders page
    try {
      // Get checkout data if available
      const checkoutDataStr = localStorage.getItem('decornest-checkout-data');
      const orderItems = checkoutDataStr ? JSON.parse(checkoutDataStr).items : [];
      
      // Create a new order
      const newOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: orderItems,
        status: 'processing',
        total: parseFloat(amount) || 0,
      };
      
      // Get existing orders
      const existingOrdersStr = localStorage.getItem('decornest-orders');
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      
      // Add new order to orders list
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('decornest-orders', JSON.stringify(updatedOrders));
      
      // Clean up checkout data
      localStorage.removeItem('decornest-checkout-data');
      
      toast({
        title: "Order Processed Successfully!",
        description: "Your payment has been received. Thank you for your purchase!",
        variant: "default",
      });
      
      // Clear cart and redirect to orders page
      clearCart();
      
      setTimeout(() => {
        setLocation('/orders');
      }, 2000);
    } catch (error) {
      console.error('Error saving order:', error);
      toast({
        title: "Error Saving Order",
        description: "There was an error saving your order. Please contact support.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#265550] border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  const prettyUpiId = UPI_ID.replace('@', ' @ ');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Payment Options
        </motion.h1>
        
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Select Payment Method</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <motion.div 
                  className={`border rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all ${
                    paymentMethod === 'upi' 
                      ? 'border-[#265550] bg-[#265550]/5' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#265550]'
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    paymentMethod === 'upi' 
                      ? 'bg-[#265550] text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">UPI Payment</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                    Pay directly using any UPI app like Google Pay, PhonePe, Paytm
                  </p>
                </motion.div>
                
                <motion.div 
                  className={`border rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-[#265550] bg-[#265550]/5' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#265550]'
                  }`}
                  whileHover={{ y: -5 }}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    paymentMethod === 'card' 
                      ? 'bg-[#265550] text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Card Payment</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
                    Pay securely using credit/debit card (coming soon)
                  </p>
                </motion.div>
              </div>
              
              {paymentMethod === 'upi' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">UPI Payment Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">UPI ID:</p>
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex-1 font-mono text-lg text-gray-900 dark:text-white">{prettyUpiId}</div>
                        <button 
                          className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-[#265550] hover:text-white transition-colors"
                          onClick={handleCopyUPI}
                          title="Copy UPI ID"
                        >
                          {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Enter Amount to Pay:</p>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                          <span className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium">₹</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1 px-4 py-3 focus:outline-none bg-transparent text-gray-900 dark:text-white"
                            placeholder="Enter amount"
                            min="1"
                            step="0.01"
                            required
                          />
                        </div>
                        
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-[#265550] hover:bg-[#1b413d] text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
                          disabled={isPaying}
                        >
                          {isPaying ? (
                            <>
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              Proceed to Pay <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </motion.button>
                      </form>
                    </div>
                    
                    {/* QR Code Section */}
                    {showQrCode && qrCodeUrl && (
                      <motion.div 
                        className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scan QR Code to Pay</h3>
                        
                        <div className="bg-white p-4 rounded-lg inline-block mb-4 mx-auto">
                          <img 
                            src={qrCodeUrl} 
                            alt="UPI Payment QR Code" 
                            className="w-64 h-64 mx-auto"
                          />
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={downloadQrCode}
                            className="flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download QR Code
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={completePayment}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            I've Completed Payment
                          </motion.button>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Once you complete the payment, click the "I've Completed Payment" button to proceed.
                        </p>
                      </motion.div>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Instructions:</p>
                      <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside">
                        <li>Enter the amount you wish to pay</li>
                        <li>Click "Proceed to Pay" to continue</li>
                        <li>Scan the QR code with your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                        <li>Alternatively, use the UPI ID: <span className="font-medium text-gray-900 dark:text-white">{UPI_ID}</span></li>
                        <li>Enter the same amount as specified above</li>
                        <li>Complete the payment on your UPI app</li>
                      </ol>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-yellow-800 dark:text-yellow-200 font-medium">Important Note</p>
                          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                            After completing the payment, please take a screenshot of the transaction and send it to us along with your order details to <span className="font-medium">{PHONE_NUMBER}</span> for order confirmation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                >
                  <div className="flex flex-col items-center mb-6">
                    <div className="rounded-full bg-gray-100 dark:bg-gray-700 h-16 w-16 flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-[#265550] dark:text-[#7cc9bc]" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">PayPal & Card Payment</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
                      Pay securely using PayPal or debit/credit cards. Your payment information is encrypted and secure.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-6">
                      <span className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-medium">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 px-4 py-3 focus:outline-none bg-transparent text-gray-900 dark:text-white"
                        placeholder="Enter amount"
                        min="1"
                        step="0.01"
                        required
                        disabled={isPaying}
                      />
                    </div>
                    
                    {amount && parseFloat(amount) > 0 ? (
                      <div className="space-y-6">
                        <SimplePaypalButton 
                          amount={parseFloat(amount)} 
                          onSuccess={completePayment} 
                        />
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Your payment is secured by PayPal. We do not store your card details.
                          </p>
                          <button
                            onClick={() => setPaymentMethod('upi')}
                            className="text-[#265550] hover:text-[#1b413d] font-medium inline-flex items-center"
                          >
                            Switch to UPI Payment <ChevronsRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-sm text-amber-600 dark:text-amber-400">
                        Please enter a valid amount to see payment options
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Security</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Secure Transactions</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      All payments are processed securely through authorized payment gateways.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order Confirmation</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      You will receive an order confirmation via email once your payment is processed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Customer Support</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      For any payment-related queries, please contact our customer support at {PHONE_NUMBER}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}