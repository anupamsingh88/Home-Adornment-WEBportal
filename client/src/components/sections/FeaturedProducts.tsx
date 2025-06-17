import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import RevealOnScroll from '@/components/RevealOnScroll';
import { featuredProducts } from '@/data/products';

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-16 bg-white dark:bg-[#1E1E1E]">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Featured Collection</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover our handpicked selection of stunning home decor pieces that blend style, functionality, and artistry.</p>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll>
          <div className="text-center mt-12">
            <Link href="/products">
              <a className="inline-flex items-center text-[#265550] hover:text-[#1b413d] font-medium transition-colors">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
