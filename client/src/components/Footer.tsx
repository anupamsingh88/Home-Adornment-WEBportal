import { Link } from 'wouter';
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#265550] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">DecorNest</h3>
            <p className="mb-6 text-white/80">Transforming spaces into beautiful, functional homes with curated decor and expert design services.</p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/thewitcher_07" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/john.wick.360084?rdid=6MNOp0A12kIgPwRF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AkDCTLErs%2F#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" 
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com/Anupamcr07" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" 
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=wall-decor" className="text-white/80 hover:text-white transition-colors">
                  Wall Decor
                </Link>
              </li>
              <li>
                <Link href="/products?category=lighting" className="text-white/80 hover:text-white transition-colors">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/products?category=furniture-accents" className="text-white/80 hover:text-white transition-colors">
                  Furniture Accents
                </Link>
              </li>
              <li>
                <Link href="/products?category=indoor-plants" className="text-white/80 hover:text-white transition-colors">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link href="/products?category=rugs-carpets" className="text-white/80 hover:text-white transition-colors">
                  Rugs & Carpets
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <span>8A/280 Vrindavan Yojna, Lucknow, UP - 226029</span>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <a href="mailto:anupam03122003@gmail.com" className="hover:underline">anupam03122003@gmail.com</a>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <a href="tel:+918765782107" className="hover:underline">+91 8765782107</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 mb-4 md:mb-0">&copy; {new Date().getFullYear()} DecorNest. All rights reserved.</p>
            <p className="text-white/70">Developed by <a href="#" className="text-[#D9BBA9] hover:underline">Badmos Developers</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
