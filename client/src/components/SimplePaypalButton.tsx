import React, { useEffect, useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';
import { Check, AlertCircle } from 'lucide-react';

interface SimplePaypalButtonProps {
  amount: number;
  onSuccess: () => void;
}

const SimplePaypalButton: React.FC<SimplePaypalButtonProps> = ({ amount, onSuccess }) => {
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [_, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // Simulate PayPal payment process
  const handlePaypalPayment = () => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to proceed with payment.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccess(true);
      
      // Show success message
      toast({
        title: "Payment Successful! 🎉",
        description: `Thank you for your purchase. Your transaction ID is PP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
      
      // Clear cart
      clearCart();
      
      // Call success callback
      onSuccess();
      
      // Redirect to orders page after a delay
      setTimeout(() => {
        setLocation('/orders');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="w-full">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-4">
        <p className="text-blue-600 dark:text-blue-400 text-sm">
          <strong>Note:</strong> This is a test payment environment. No actual payments will be processed.
        </p>
      </div>
      
      {isPaymentSuccess ? (
        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2">Payment Successful</h3>
          <p className="text-green-600 dark:text-green-500 mb-4">
            Your payment has been processed successfully.
          </p>
        </div>
      ) : (
        <button
          onClick={handlePaypalPayment}
          disabled={isProcessing}
          className="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              <img 
                src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" 
                alt="PayPal" 
                className="h-5 mr-2" 
              />
              Pay with PayPal
            </>
          )}
        </button>
      )}
      
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        By clicking the button, you agree to PayPal's terms and policies.
      </div>
    </div>
  );
};

export default SimplePaypalButton;