import RevealOnScroll from '@/components/RevealOnScroll';
import ServiceCard from '@/components/ui/service-card';
import { services } from '@/data/services';

export default function Services() {
  return (
    <section id="services" className="py-16 bg-neutral-50 dark:bg-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Our Design Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Expert guidance to transform your space with personalized consultation and professional design solutions.</p>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
