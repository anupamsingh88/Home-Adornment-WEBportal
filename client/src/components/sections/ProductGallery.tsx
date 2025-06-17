import { useState, useEffect, useRef } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Modern Minimalist Living",
    description: "A perfect blend of comfort and style for contemporary homes."
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Scandinavian Inspired Decor",
    description: "Clean lines, natural materials, and a bright, airy atmosphere."
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=958&q=80",
    title: "Bohemian Chic Spaces",
    description: "Vibrant colors, patterns, and eclectic pieces for free-spirited homes."
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    title: "Luxurious Elegance",
    description: "Sophisticated interiors with premium finishes and rich textures."
  }
];

export default function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  // Auto-rotate the carousel
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset timer on manual change
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % galleryImages.length);
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-[#265550] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Experience Our Products</h2>
            <p className="text-white/80 max-w-2xl mx-auto">See how our carefully selected pieces transform spaces and create stunning interiors.</p>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <div className="product-3d mx-auto max-w-5xl">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div className="h-96 md:h-[32rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="h-full w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={galleryImages[activeIndex].url} 
                      alt={galleryImages[activeIndex].title} 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <motion.h3 
                  className="text-2xl font-heading font-bold mb-2"
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {galleryImages[activeIndex].title}
                </motion.h3>
                <motion.p 
                  className="text-white/90 mb-4"
                  key={`desc-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {galleryImages[activeIndex].description}
                </motion.p>
                <div className="flex space-x-3">
                  {galleryImages.map((_, index) => (
                    <button 
                      key={index}
                      className={`carousel-dot ${activeIndex === index ? 'bg-white' : 'bg-white/30 hover:bg-white'} w-3 h-3 rounded-full transition-colors`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
