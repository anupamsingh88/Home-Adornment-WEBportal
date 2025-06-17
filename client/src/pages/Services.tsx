import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { services } from '@/data/services';
import ServiceCard from '@/components/ui/service-card';
import RevealOnScroll from '@/components/RevealOnScroll';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "How do I book a design consultation?",
    answer: "You can book a design consultation through our website by filling out the contact form, or by calling our office directly. We'll schedule a time that works for you, either virtually or in-person."
  },
  {
    question: "What areas do you serve for in-home services?",
    answer: "We currently provide in-home services in Lucknow and surrounding areas within a 50km radius. For clients outside this area, we offer virtual consultations and design services."
  },
  {
    question: "How much does a typical interior design project cost?",
    answer: "The cost varies depending on the scope of your project. We offer packages starting from ₹25,000 for single room designs, with full home designs ranging based on square footage and requirements. We provide detailed quotes after the initial consultation."
  },
  {
    question: "How long does a typical design project take?",
    answer: "Timeline varies based on project complexity. A single room refresh might take 2-4 weeks, while a complete home design could take 2-6 months. We'll provide a project timeline during our initial consultation."
  },
  {
    question: "Do you help with product purchasing and installation?",
    answer: "Yes, we offer full-service options where we handle product sourcing, purchasing, and installation coordination. We can also provide design plans only if you prefer to manage the implementation yourself."
  }
];

export default function Services() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

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
            Our Design Services
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Professional solutions to transform your living spaces
          </motion.p>
        </div>
      </motion.div>
      
      <section className="py-16 bg-white dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-3">How We Can Help You</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Our expert team provides comprehensive design services tailored to your unique style and needs.</p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-3">Our Design Process</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">We follow a structured approach to ensure your vision comes to life seamlessly.</p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-heading font-bold text-lg mb-2">Consultation</h3>
                <p className="text-gray-600 dark:text-gray-300">We meet to understand your style preferences, needs, and budget for the project.</p>
              </div>
              
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-heading font-bold text-lg mb-2">Concept Design</h3>
                <p className="text-gray-600 dark:text-gray-300">We create mood boards, layouts, and initial design concepts for your approval.</p>
              </div>
              
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-heading font-bold text-lg mb-2">Selection & Procurement</h3>
                <p className="text-gray-600 dark:text-gray-300">We source furnishings, decor items, and materials based on the approved design.</p>
              </div>
              
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-heading font-bold text-lg mb-2">Installation</h3>
                <p className="text-gray-600 dark:text-gray-300">We coordinate delivery and installation of all items to bring your design to life.</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Find answers to common questions about our design services.</p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0"
                >
                  <button 
                    className="flex justify-between items-center w-full text-left font-medium text-lg focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-[#265550] transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`mt-2 text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ${
                      expandedFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pb-4">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
