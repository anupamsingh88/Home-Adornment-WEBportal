import React, { useEffect, useRef } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

// Add a simple declaration for the paypal object on window
declare global {
  interface Window {
    paypal: any;
  }
}

interface PaypalButtonsProps {
  amount: number;
  onSuccess: () => void;
}

const PaypalButtons: React.FC<PaypalButtonsProps> = ({ amount, onSuccess }) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { clearCart } = useCart();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    // Make sure amount is valid
    if (amount <= 0) return;

    // Load PayPal script dynamically
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.PAYPAL_CLIENT_ID || ''}&currency=INR`;
    script.async = true;

    const addPayPalButtons = () => {
      if (!paypalRef.current || !window.paypal) return;
      
      window.paypal
        .Buttons({
          createOrder: (_: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                    currency_code: 'INR'
                  },
                  description: 'DecorNest Purchase'
                }
              ]
            });
          },
          onApprove: async (_: any, actions: any) => {
            const order = await actions.order.capture();
            
            // Handle successful payment
            toast({
              title: "Payment Successful! 🎉",
              description: `Thank you for your purchase. Your transaction ID is ${order.id}`,
            });
            
            // Clear cart and redirect
            clearCart();
            onSuccess();
            
            setTimeout(() => {
              setLocation('/orders');
            }, 2000);
          },
          onError: (err: any) => {
            toast({
              title: "Payment Failed",
              description: "There was an error processing your payment. Please try again.",
              variant: "destructive",
            });
            console.error('PayPal Error:', err);
          }
        })
        .render(paypalRef.current);
    };

    script.onload = addPayPalButtons;

    script.onerror = () => {
      toast({
        title: "PayPal Error",
        description: "Failed to load PayPal. Please try a different payment method.",
        variant: "destructive",
      });
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount, clearCart, setLocation, toast, onSuccess]);

  return (
    <div className="py-4">
      <div ref={paypalRef} className="paypal-button-container"></div>
      {/* Fallback message if PayPal doesn't load */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Having trouble with PayPal? Try UPI payment instead.
      </div>
    </div>
  );
};

export default PaypalButtons;