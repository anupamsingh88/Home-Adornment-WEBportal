import { Link } from 'wouter';
import { motion } from 'framer-motion';
import RevealOnScroll from '@/components/RevealOnScroll';

const teamMembers = [
  {
    name: "Anupam Singh",
    role: "Founder & Lead Designer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "With over 10 years of experience in interior design, Anupam founded DecorNest with a vision to make beautiful spaces accessible to everyone."
  },
  {
    name: "Anshu Rai",
    role: "Senior Design Consultant",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    bio: "Anshu specializes in contemporary and minimalist designs. Her attention to detail and innovative ideas have transformed countless homes."
  },
  {
    name: "Vinayak Srivastava",
    role: "Product Curator",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    bio: "Vinayak has an exceptional eye for quality and uniqueness, ensuring DecorNest's collection remains fresh, exciting and on-trend."
  }
];

export default function About() {
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
            About Us
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Learn about our story, mission, and the team behind DecorNest
          </motion.p>
        </div>
      </motion.div>
      
      <section className="py-16 bg-white dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Founded in 2018, DecorNest began as a small home decor boutique in Lucknow, India. 
                  What started as a passion project quickly evolved into a comprehensive home adornment 
                  solution as we recognized the growing need for curated, high-quality decor items and 
                  professional design services.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Over the years, we've expanded our collection and services, building a reputation for 
                  exceptional customer experiences and transformative design solutions. Our commitment to 
                  quality craftsmanship and sustainability has remained unwavering throughout our journey.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Today, DecorNest serves clients across India, helping them create spaces that reflect 
                  their unique personalities and enhance their everyday living experience.
                </p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll>
              <div className="relative">
                <div className="relative overflow-hidden rounded-lg shadow-xl" style={{ height: '400px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                    alt="DecorNest showroom" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-3">
                      <div className="bg-[#D9BBA9] p-3 rounded-lg shadow-lg mr-4">
                        <p className="font-heading font-bold text-lg text-gray-800">Est. 2018</p>
                      </div>
                      <h3 className="text-2xl font-semibold">Our Showroom</h3>
                    </div>
                    <p className="text-white/90 max-w-md">
                      Visit our flagship showroom in Lucknow to experience our collections in person and get expert design advice.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-3">Our Mission & Values</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                At the heart of DecorNest is our commitment to create beautiful, functional spaces that enhance 
                our clients' lives and reflect their unique personalities.
              </p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Design Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe in creating spaces that are not only beautiful but also functional and reflective of 
                  our clients' lifestyles. Our designs balance aesthetics with practicality.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Customer Satisfaction</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our clients' satisfaction is paramount. We listen attentively to their needs and preferences, 
                  ensuring the final result exceeds their expectations.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-[#265550] text-white rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Sustainability</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We are committed to environmentally responsible practices. We source products from ethical 
                  suppliers and promote sustainable design solutions.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-4 md:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-3">Meet Our Team</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The talented individuals behind DecorNest's success, bringing expertise and passion to every project.
              </p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-neutral-50 dark:bg-[#121212] rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                    <p className="text-[#265550] font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-heading font-bold mb-4">Work With Us</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                Ready to transform your space with DecorNest? Our team of experts is here to help you create 
                the home of your dreams.
              </p>
              <Link href="/contact">
                <motion.div 
                  className="inline-block bg-[#265550] hover:bg-[#1b413d] text-white font-medium py-3 px-8 rounded-md transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us Today
                </motion.div>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
      
      <section className="py-12 bg-[#D9BBA9]/20 dark:bg-[#D9BBA9]/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <RevealOnScroll>
            <p className="text-[#265550] font-heading font-bold text-xl mb-2">Developed by</p>
            <p className="text-2xl font-bold">Badmos Developers</p>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
