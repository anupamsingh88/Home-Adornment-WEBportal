import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from './ThemeProvider';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { 
  Moon, 
  Sun, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { getTotalItems } = useCart();


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const userMenu = document.getElementById('user-menu');
      if (userMenu && !userMenu.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-white dark:bg-[#1E1E1E] transition-all duration-300",
      isScrolled ? "shadow-md" : ""
    )}>
      <nav className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <span className="text-[#265550] dark:text-white text-2xl font-heading font-bold">
                Decor<span className="text-[#F5A623]">Nest</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={cn(
              "font-accent font-medium transition-colors",
              location === '/' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Home
            </Link>
            <Link href="/about" className={cn(
              "font-accent font-medium transition-colors",
              location === '/about' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              About Us
            </Link>
            <Link href="/products" className={cn(
              "font-accent font-medium transition-colors",
              location === '/products' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Products
            </Link>
            <Link href="/services" className={cn(
              "font-accent font-medium transition-colors",
              location === '/services' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Services
            </Link>
            <Link href="/contact" className={cn(
              "font-accent font-medium transition-colors",
              location === '/contact' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Contact Us
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550] transition-colors relative" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#265550] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            <div className="relative" id="user-menu">
              <button 
                className="flex items-center text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550] transition-colors focus:outline-none" 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                aria-label="User Menu"
              >
                <User className="h-5 w-5" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white dark:bg-[#1E1E1E] rounded-md shadow-lg z-50">
                  {user ? (
                    <>
                      <div className="py-2 px-4 border-b border-gray-200 dark:border-[#333333]">
                        <p className="font-medium">Hello, {user.username}!</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your account</p>
                      </div>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-[#333333] dark:text-[#E0E0E0] hover:bg-[#265550] hover:text-white">
                        My Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-[#333333] dark:text-[#E0E0E0] hover:bg-[#265550] hover:text-white">
                        My Orders
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-[#333333] dark:text-[#E0E0E0] hover:bg-[#265550] hover:text-white">
                        Settings
                      </Link>
                      <button 
                        onClick={() => logoutMutation.mutate()} 
                        disabled={logoutMutation.isPending}
                        className="flex items-center w-full px-4 py-2 text-sm text-[#333333] dark:text-[#E0E0E0] hover:bg-[#265550] hover:text-white"
                      >
                        {logoutMutation.isPending ? 'Logging out...' : (
                          <>
                            <LogOut className="h-4 w-4 mr-2" /> Sign Out
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="py-2 px-4 border-b border-gray-200 dark:border-[#333333]">
                        <p className="font-medium">Welcome!</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                      </div>
                      <Link href="/login" className="block px-4 py-2 text-sm text-[#333333] dark:text-[#E0E0E0] hover:bg-[#265550] hover:text-white">
                        Sign In
                      </Link>
                      <Link href="/signup" className="block px-4 py-2 text-sm text-[#333333] dark:text-[#E0E0E0] hover:bg-[#265550] hover:text-white">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button 
              className="md:hidden text-[#333333] dark:text-[#E0E0E0]" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-[80vh]" : "max-h-0"
          )}
        >
          <div className="pt-4 pb-3 space-y-3 max-h-[60vh] overflow-y-auto mobile-menu-scroll">
            <Link href="/" className={cn(
              "block py-2 px-2 font-medium",
              location === '/' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Home
            </Link>
            <Link href="/about" className={cn(
              "block py-2 px-2 font-medium",
              location === '/about' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              About Us
            </Link>
            <Link href="/products" className={cn(
              "block py-2 px-2 font-medium",
              location === '/products' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Products
            </Link>
            <Link href="/services" className={cn(
              "block py-2 px-2 font-medium",
              location === '/services' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Services
            </Link>
            <Link href="/contact" className={cn(
              "block py-2 px-2 font-medium",
              location === '/contact' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
            )}>
              Contact Us
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              {user ? (
                <>
                  <div className="py-2 px-2 font-medium text-[#265550] dark:text-white">
                    Hello, {user.username}!
                  </div>
                  <Link href="/profile" className={cn(
                    "block py-2 px-2 font-medium",
                    location === '/profile' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
                  )}>
                    My Profile
                  </Link>
                  <Link href="/orders" className={cn(
                    "block py-2 px-2 font-medium",
                    location === '/orders' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
                  )}>
                    My Orders
                  </Link>
                  <Link href="/settings" className={cn(
                    "block py-2 px-2 font-medium",
                    location === '/settings' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
                  )}>
                    Settings
                  </Link>
                  <button 
                    onClick={() => logoutMutation.mutate()} 
                    disabled={logoutMutation.isPending}
                    className="flex items-center py-2 px-2 font-medium text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
                  >
                    <LogOut className="h-4 w-4 mr-2" /> 
                    {logoutMutation.isPending ? 'Logging out...' : 'Sign Out'}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={cn(
                    "block py-2 px-2 font-medium",
                    location === '/login' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
                  )}>
                    Sign In
                  </Link>
                  <Link href="/signup" className={cn(
                    "block py-2 px-2 font-medium",
                    location === '/signup' ? "text-[#265550]" : "text-[#333333] dark:text-[#E0E0E0] hover:text-[#265550] dark:hover:text-[#265550]"
                  )}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}