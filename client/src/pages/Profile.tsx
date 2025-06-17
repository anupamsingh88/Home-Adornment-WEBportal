import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, Save, User, MapPin, CreditCard, Lock } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  
  // User data form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    }
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    } else if (user) {
      // Initialize form with user data
      setFormData({
        fullName: user.username || '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'India'
        }
      });
    }
  }, [user, isLoading, setLocation]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like address.street
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as any,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Load saved profile data on component mount
  useEffect(() => {
    try {
      const savedProfileData = localStorage.getItem('decornest-profile-data');
      if (savedProfileData) {
        const parsedData = JSON.parse(savedProfileData);
        setFormData(currentData => ({
          ...currentData,
          ...parsedData
        }));
      }
    } catch (error) {
      console.error('Failed to load profile data from localStorage:', error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Save user profile data to localStorage
      localStorage.setItem('decornest-profile-data', JSON.stringify(formData));
      
      setTimeout(() => {
        setIsSaving(false);
        toast({
          title: 'Profile updated',
          description: 'Your profile information has been updated successfully.',
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to save profile data to localStorage:', error);
      setIsSaving(false);
      toast({
        title: 'Error',
        description: 'Failed to save your profile information. Please try again.',
        variant: 'destructive'
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
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <RevealOnScroll className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-gray-200 dark:border-gray-700">
                <div className="h-24 w-24 rounded-full bg-[#265550] flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {user?.username?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.username}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Member since May 2025</p>
              </div>
              
              <nav className="p-4">
                <button 
                  onClick={() => setActiveTab('personal')}
                  className={`flex items-center w-full px-4 py-2 rounded-md mb-2 text-left transition-colors ${
                    activeTab === 'personal' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Personal Information
                </button>
                
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`flex items-center w-full px-4 py-2 rounded-md mb-2 text-left transition-colors ${
                    activeTab === 'address' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <MapPin className="h-5 w-5 mr-3" />
                  Address
                </button>
                
                <button 
                  onClick={() => setActiveTab('payment')}
                  className={`flex items-center w-full px-4 py-2 rounded-md mb-2 text-left transition-colors ${
                    activeTab === 'payment' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payment Methods
                </button>
                
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center w-full px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Lock className="h-5 w-5 mr-3" />
                  Security
                </button>
              </nav>
            </div>
          </RevealOnScroll>
          
          {/* Main Content */}
          <RevealOnScroll className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {activeTab === 'personal' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-2 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550]"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'address' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Address Information</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            State/Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="address.state"
                            value={formData.address.state}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="address.postalCode"
                            value={formData.address.postalCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Country
                          </label>
                          <select
                            id="country"
                            name="address.country"
                            value={formData.address.country}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-2 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550]"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Save Address
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Methods</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Payment methods will be available in the next update.</p>
                  
                  <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-md">
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                      No payment methods added yet
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-6 py-2 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550]"
                      onClick={() => {
                        toast({
                          title: 'Coming Soon',
                          description: 'Payment method management will be available in a future update.',
                        });
                      }}
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                    </motion.button>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: 'Security settings',
                      description: 'Password change functionality will be available in a future update.',
                    });
                  }}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="••••••••"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#265550] focus:border-[#265550] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-2 bg-[#265550] text-white rounded-md shadow-sm hover:bg-[#1b413d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#265550]"
                      >
                        <Lock className="mr-2 h-4 w-4" /> Update Password
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}