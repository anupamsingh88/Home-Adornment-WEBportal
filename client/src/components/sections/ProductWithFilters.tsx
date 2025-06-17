import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import RevealOnScroll from '@/components/RevealOnScroll';
import { products } from '@/data/products';
import { ProductCategory } from '@/types';

export default function ProductWithFilters() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        if (product.price < min || product.price > max) return false;
      } else {
        // Case for "200+"
        if (product.price < min) return false;
      }
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      default: // popular
        return b.popularity - a.popularity;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const categories: { value: ProductCategory | 'all', label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'wall-decor', label: 'Wall Decor' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'furniture-accents', label: 'Furniture Accents' },
    { value: 'indoor-plants', label: 'Indoor Plants' },
    { value: 'rugs-carpets', label: 'Rugs & Carpets' },
    { value: 'curtains-blinds', label: 'Curtains & Blinds' }
  ];

  return (
    <section id="products" className="py-16 bg-white dark:bg-[#1E1E1E]">
      <div className="container mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Explore Our Collection</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Browse through our extensive range of home decor products across multiple categories.</p>
          </div>
        </RevealOnScroll>
        
        {/* Filters */}
        <RevealOnScroll>
          <div className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-[#333333] dark:text-[#E0E0E0] font-medium">Filter by:</span>
                <select 
                  className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#265550]/50 bg-white dark:bg-[#1E1E1E] text-[#333333] dark:text-[#E0E0E0]"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as ProductCategory | 'all')}
                >
                  <option value="all">All Categories</option>
                  <option value="wall-decor">Wall Decor</option>
                  <option value="lighting">Lighting</option>
                  <option value="furniture-accents">Furniture Accents</option>
                  <option value="indoor-plants">Indoor Plants</option>
                  <option value="rugs-carpets">Rugs & Carpets</option>
                  <option value="curtains-blinds">Curtains & Blinds</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-[#333333] dark:text-[#E0E0E0] font-medium">Price Range:</span>
                <select 
                  className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#265550]/50 bg-white dark:bg-[#1E1E1E] text-[#333333] dark:text-[#E0E0E0]"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">₹0 - ₹50</option>
                  <option value="50-100">₹50 - ₹100</option>
                  <option value="100-200">₹100 - ₹200</option>
                  <option value="200-">₹200+</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-[#333333] dark:text-[#E0E0E0] font-medium">Sort by:</span>
                <select 
                  className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#265550]/50 bg-white dark:bg-[#1E1E1E] text-[#333333] dark:text-[#E0E0E0]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCategory === category.value 
                      ? 'bg-[#265550] text-white' 
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#333333] dark:text-[#E0E0E0]'
                  }`}
                  onClick={() => setActiveCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>
        
        {/* Products Grid */}
        <RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </RevealOnScroll>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <RevealOnScroll>
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show current page and adjacent pages
                  let pageNum = currentPage - 2 + i;
                  if (currentPage < 3) {
                    pageNum = i + 1;
                  } else if (currentPage > totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  }
                  
                  // Ensure page numbers are within valid range
                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-4 py-2 ${
                          currentPage === pageNum
                            ? 'bg-[#265550] text-white border border-[#265550]'
                            : 'bg-white dark:bg-[#1E1E1E] text-[#333333] dark:text-[#E0E0E0] border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        } text-sm font-medium`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </button>
              </nav>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
