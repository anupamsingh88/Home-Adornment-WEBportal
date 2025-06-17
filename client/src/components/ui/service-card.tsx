import { ArrowRight } from 'lucide-react';
import { Service } from '@/types';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div 
      className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md overflow-hidden transition-all"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="h-56 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold mb-3">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
        {/* <a href="#" className="text-[#265550] hover:text-[#1b413d] font-medium inline-flex items-center">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </a> */}
      </div>
    </motion.div>
  );
}
