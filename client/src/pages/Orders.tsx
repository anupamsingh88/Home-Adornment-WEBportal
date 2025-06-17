import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, Package, ChevronRight, ShoppingBag, X, Calendar, Clock, CreditCard, Truck } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Orders() {
  const { user, isLoading } = useAuth();
  const [_, setLocation] = useLocation();
  
  // Get orders from local storage instead of using dummy data
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('decornest-orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (error) {
      console.error('Failed to load orders from localStorage:', error);
    }
  }, []);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    }
  }, [user, isLoading, setLocation]);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let color;
    switch (status) {
      case 'delivered':
        color = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        break;
      case 'shipped':
        color = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        break;
      case 'processing':
        color = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        break;
      case 'cancelled':
        color = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        break;
      default:
        color = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
    
    return (
      <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', color)}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h1>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <RevealOnScroll key={order.id}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                          <Package className="h-5 w-5 mr-2" />
                          Order {order.id}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Placed on {order.date}</p>
                      </div>
                      
                      <div className="mt-4 sm:mt-0">
                        <StatusBadge status={order.status} />
                        <p className="text-lg font-medium text-gray-900 dark:text-white mt-2">
                          ₹{order.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </h4>
                    
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.quantity} × ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900 flex justify-end">
                    <button 
                      className="flex items-center text-sm font-medium text-[#265550] hover:text-[#1b413d]"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailOpen(true);
                      }}
                    >
                      View Order Details <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No orders yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <motion.a
              href="/products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-2 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550]"
            >
              Browse Products
            </motion.a>
          </div>
        )}
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedOrder && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center">
                <Package className="h-6 w-6 mr-2" />
                Order Details <span className="ml-2 text-[#265550]">#{selectedOrder.id}</span>
              </DialogTitle>
              <DialogDescription className="text-base">
                Placed on {selectedOrder.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-6 space-y-8">
              {/* Order Status */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#265550]" />
                  Order Status
                </h3>
                <div className="flex items-center justify-between">
                  <StatusBadge status={selectedOrder.status} />
                  <div className="text-sm text-gray-500">
                    {selectedOrder.status === 'delivered' ? 'Delivered on ' + selectedOrder.date : 
                     selectedOrder.status === 'shipped' ? 'Expected delivery in 2-3 days' :
                     selectedOrder.status === 'processing' ? 'Processing your order' : 
                     'Order has been cancelled'}
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-[#265550]" />
                  Items ({selectedOrder.items.length})
                </h3>
                <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Unit Price: ₹{item.price.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-[#265550]">₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-[#265550]" />
                  Payment Information
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                    <span>{selectedOrder.paymentMethod || "Online Payment"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Status</span>
                    <span className="text-green-600 dark:text-green-400">Paid</span>
                  </div>
                </div>
              </div>
              
              {/* Shipping Details */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-[#265550]" />
                  Shipping Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <address className="not-italic">
                    <p className="font-medium">{user?.name || "Customer"}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedOrder.shippingAddress?.street || "8A/280 Vrindavan Yojna"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedOrder.shippingAddress?.city || "Lucknow"}, {selectedOrder.shippingAddress?.state || "UP"} - {selectedOrder.shippingAddress?.postalCode || "226029"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedOrder.shippingAddress?.country || "India"}
                    </p>
                  </address>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}