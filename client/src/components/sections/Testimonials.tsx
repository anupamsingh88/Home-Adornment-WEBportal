import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Deepika",
    role: "Home Owner",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    text: "DecorNest completely transformed my living room. The team understood my vision perfectly and delivered beyond my expectations. I'm in love with my new space!",
    rating: 5
  },
  {
    id: 2,
    name: "Harsh",
    role: "Interior Design Enthusiast",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    text: "The quality of products from DecorNest is exceptional. Each piece has a unique character and elevates the entire room. Their customer service is equally impressive.",
    rating: 5
  },
  {
    id: 3,
    name: "Anubhav",
    role: "Apartment Owner",
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
    text: "Working with DecorNest was a breeze. They respected my budget while still delivering a stylish and functional design for my new apartment. Highly recommended!",
    rating: 4
  },
  {
    id: 4,
    name: "Abhinav",
    role: "Real Estate Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    text: "As a real estate developer, I've worked with many design companies, but DecorNest stands out. Their attention to detail and ability to meet deadlines sets them apart.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 bg-neutral-50 dark:bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">What Our Clients Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We take pride in creating spaces that our clients love. Here's what some of them have to say about their experience with DecorNest.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="relative">
              {/* Desktop View - Show multiple testimonials */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover mr-4" 
                      />
                      <div>
                        <h4 className="font-heading font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Mobile View - Carousel */}
              <div className="md:hidden">
                <motion.div
                  key={testimonials[currentIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md relative"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name} 
                      className="w-14 h-14 rounded-full object-cover mr-4" 
                    />
                    <div>
                      <h4 className="font-heading font-bold text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">"{testimonials[currentIndex].text}"</p>
                  
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={prevTestimonial}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </button>
                    <div className="flex space-x-1">
                      {testimonials.map((_, idx) => (
                        <span 
                          key={idx} 
                          className={`block w-2 h-2 rounded-full ${currentIndex === idx ? 'bg-[#265550]' : 'bg-gray-300 dark:bg-gray-600'}`}
                        ></span>
                      ))}
                    </div>
                    <button 
                      onClick={nextTestimonial}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}