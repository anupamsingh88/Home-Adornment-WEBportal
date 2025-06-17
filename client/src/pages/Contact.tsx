import { motion } from 'framer-motion';
import Contact from '@/components/sections/Contact';

export default function ContactPage() {
  return (
    <main>
      <motion.div 
        className="bg-[#265550] text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            We'd love to hear from you. Get in touch with our team.
          </motion.p>
        </div>
      </motion.div>
      
      <Contact />
    </main>
  );
}
