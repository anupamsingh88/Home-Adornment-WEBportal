import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/ThemeProvider';
import { 
  Moon, 
  Sun, 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Save,
  Loader2
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function Settings() {
  const { user, isLoading } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('appearance');
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  });
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/login');
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || ''
      }));
    }
  }, [user, isLoading, setLocation]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev] as any,
            [child]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      });
    }, 1500);
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <RevealOnScroll className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 flex flex-col items-center border-b border-gray-200 dark:border-gray-700">
                <div className="h-24 w-24 rounded-full bg-[#265550] flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {user?.username?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.username}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Account Settings</p>
              </div>
              
              <nav className="p-4">
                <button 
                  onClick={() => setActiveTab('appearance')}
                  className={`flex items-center w-full px-4 py-2 rounded-md mb-2 text-left transition-colors ${
                    activeTab === 'appearance' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Sun className="h-5 w-5 mr-3" />
                  Appearance
                </button>
                
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-4 py-2 rounded-md mb-2 text-left transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
                
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center w-full px-4 py-2 rounded-md mb-2 text-left transition-colors ${
                    activeTab === 'notifications' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center w-full px-4 py-2 rounded-md text-left transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-[#265550] text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  Security
                </button>
              </nav>
            </div>
          </RevealOnScroll>
          
          {/* Main Content */}
          <RevealOnScroll className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    <Sun className="inline-block mr-2 h-5 w-5" /> Appearance
                  </h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button
                        className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                          theme === 'light' 
                            ? 'border-[#265550] bg-[#265550]/5' 
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                          theme === 'light' 
                            ? 'bg-[#265550] text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          <Sun className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Light</span>
                      </button>
                      
                      <button
                        className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                          theme === 'dark' 
                            ? 'border-[#265550] bg-[#265550]/5' 
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                          theme === 'dark' 
                            ? 'bg-[#265550] text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          <Moon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">Dark</span>
                      </button>
                      
                      <button
                        className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                          theme === 'system' 
                            ? 'border-[#265550] bg-[#265550]/5' 
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setTheme('system')}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                          theme === 'system' 
                            ? 'bg-[#265550] text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          <SettingsIcon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">System</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Description</h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <p>
                        <strong>Light Mode:</strong> A clean, bright theme for better visibility during daytime.
                      </p>
                      <p>
                        <strong>Dark Mode:</strong> An eye-friendly dark theme for low-light environments.
                      </p>
                      <p>
                        <strong>System:</strong> Automatically follows your system's theme setting.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    <User className="inline-block mr-2 h-5 w-5" /> Profile Information
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
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
                          placeholder="your.email@example.com"
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
                          placeholder="+91 1234567890"
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
              
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    <Bell className="inline-block mr-2 h-5 w-5" /> Notification Preferences
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6 mb-6">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive order updates and promotions via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            name="notifications.email"
                            checked={formData.notifications.email}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#265550]/30 dark:peer-focus:ring-[#265550]/70 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#265550]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Get notified directly in your browser</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            name="notifications.push"
                            checked={formData.notifications.push}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#265550]/30 dark:peer-focus:ring-[#265550]/70 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#265550]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive order status updates via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            name="notifications.sms"
                            checked={formData.notifications.sms}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#265550]/30 dark:peer-focus:ring-[#265550]/70 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#265550]"></div>
                        </label>
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
                            <Save className="mr-2 h-4 w-4" /> Save Preferences
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    <Shield className="inline-block mr-2 h-5 w-5" /> Security Settings
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
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
                          value={formData.newPassword}
                          onChange={handleInputChange}
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
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
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
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" /> Update Password
                          </>
                        )}
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