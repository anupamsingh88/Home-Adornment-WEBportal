import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Services from '@/components/sections/Services';
import ProductGallery from '@/components/sections/ProductGallery';
import ProductWithFilters from '@/components/sections/ProductWithFilters';
import AboutUs from '@/components/sections/AboutUs';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <ProductGallery />
      <ProductWithFilters />
      <AboutUs />
      <Testimonials />
      <Contact />
    </main>
  );
}
