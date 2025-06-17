import { useState } from 'react';
import { MapPin, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { toast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll be in touch soon!",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 bg-white dark:bg-[#1E1E1E]">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Get In Touch</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Have questions about our products or services? We'd love to hear from you.</p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <RevealOnScroll>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-[#1E1E1E] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#265550]/50 focus:border-[#265550]" 
                  placeholder="Your name" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-[#1E1E1E] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#265550]/50 focus:border-[#265550]" 
                  placeholder="Your email" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-[#1E1E1E] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#265550]/50 focus:border-[#265550]" 
                  placeholder="Subject" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-[#1E1E1E] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#265550]/50 focus:border-[#265550]" 
                  placeholder="Your message" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#265550] hover:bg-[#1b413d] text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#265550]/10 flex items-center justify-center text-[#265550]">
                      <MapPin size={16} />
                    </div>
                    <div className="ml-4">
                      <p className="text-[#333333] dark:text-[#E0E0E0] font-medium">Address</p>
                      <p className="text-gray-600 dark:text-gray-300">8A/280 Vrindavan Yojna, Lucknow, UP - 226029</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#265550]/10 flex items-center justify-center text-[#265550]">
                      <Mail size={16} />
                    </div>
                    <div className="ml-4">
                      <p className="text-[#333333] dark:text-[#E0E0E0] font-medium">Email</p>
                      <a href="mailto:anupam03122003@gmail.com" className="text-[#265550] hover:underline">anupam03122003@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#265550]/10 flex items-center justify-center text-[#265550]">
                      <Clock size={16} />
                    </div>
                    <div className="ml-4">
                      <p className="text-[#333333] dark:text-[#E0E0E0] font-medium">Business Hours</p>
                      <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9am - 6pm</p>
                      <p className="text-gray-600 dark:text-gray-300">Saturday: 10am - 4pm</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/thewitcher_07" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-[#265550]/10 flex items-center justify-center text-[#265550] hover:bg-[#265550] hover:text-white transition-colors" 
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href="https://www.facebook.com/john.wick.360084?rdid=6MNOp0A12kIgPwRF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AkDCTLErs%2F#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-[#265550]/10 flex items-center justify-center text-[#265550] hover:bg-[#265550] hover:text-white transition-colors" 
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a 
                    href="https://twitter.com/Anupamcr07" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-[#265550]/10 flex items-center justify-center text-[#265550] hover:bg-[#265550] hover:text-white transition-colors" 
                    aria-label="Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden shadow">
                {/* Google Map Embed */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.7171790266037!2d80.90840487539204!3d26.887399076749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be48b93d7c0fd%3A0x5fd02d9411e92ca8!2s8A%2F280%2C%20Vrindavan%20Yojna%2C%20Sector%208A%2C%20Telibagh%2C%20Lucknow%2C%20Uttar%20Pradesh%20226029!5e0!3m2!1sen!2sin!4v1685888122805!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DecorNest Location"
                  className="h-full w-full"
                ></iframe>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
