import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      alt: "Elegant living room interior"
    },
    {
      url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1980&q=80",
      alt: "Modern dining room setup"
    },
    {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      alt: "Bedroom with minimalist design"
    }
  ];
  
  // Preload images for smoother transitions
  useEffect(() => {
    backgroundImages.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsChanging(false);
      }, 500);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image Layer - Using crossfade effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <motion.div 
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{ 
              opacity: currentImageIndex === index ? 1 : 0,
              scale: currentImageIndex === index ? 1 : 1.05
            }}
            transition={{ 
              opacity: { duration: 0.8, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" }
            }}
          >
            <img 
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#265550]/60 to-black/30 z-10"></div>
      </div>
      
      {/* Content Layer - Always visible and above the changing background */}
      <div className="container mx-auto px-4 md:px-6 relative h-full flex items-center z-20">
        <motion.div 
          className="max-w-2xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              Transform Your Space,
            </motion.span> 
            <br />
            <motion.span 
              className="text-[#F5A623] inline-block text-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Elevate Your Living
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl opacity-90 mb-8 font-light text-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Curated decor pieces and professional design services to turn your house into a dream home.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/products">
              <motion.div 
                className="bg-[#F5A623] hover:bg-[#d88c0d] text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105 text-center inline-block cursor-pointer shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Collection
              </motion.div>
            </Link>
            <Link href="/services">
              <motion.div 
                className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-medium py-3 px-8 rounded-md transition-all text-center inline-block cursor-pointer shadow-lg"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => {
          const featuredElement = document.getElementById('featured');
          if (featuredElement) {
            featuredElement.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label="Scroll down"
      >
        <ChevronDown className="text-white w-8 h-8" />
      </motion.div>
    </section>
  );
}
