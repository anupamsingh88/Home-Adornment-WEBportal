import { Link } from 'wouter';
import RevealOnScroll from '@/components/RevealOnScroll';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-neutral-50 dark:bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">About DecorNest</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At DecorNest, we believe that a well-designed home is the foundation for a well-lived life. 
                Our curated collection of home decor items and professional design services are crafted to 
                help you create spaces that reflect your personal style and enhance your everyday living.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Founded with a passion for beautiful interiors and an eye for quality craftsmanship, 
                we source products from artisans and designers who share our commitment to excellence and sustainability.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our team of design consultants brings years of experience and a wealth of knowledge to help 
                transform your home into a sanctuary that feels both stylish and comfortable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <motion.a 
                    className="bg-[#265550] hover:bg-[#1b413d] text-white font-medium py-3 px-8 rounded-md transition-all transform hover:scale-105 text-center inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Our Services
                  </motion.a>
                </Link>
                <Link href="/contact">
                  <motion.a 
                    className="bg-transparent hover:bg-[#265550]/10 border-2 border-[#265550] text-[#265550] font-medium py-3 px-8 rounded-md transition-all text-center inline-block"
                    whileHover={{ backgroundColor: "rgba(38, 85, 80, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.a>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="relative h-96 md:h-[32rem] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="DecorNest team at work" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white font-medium">Developed with ♥ by Badmos Developers</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
