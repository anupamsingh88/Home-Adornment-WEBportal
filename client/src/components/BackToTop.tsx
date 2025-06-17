import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 h-12 w-12 bg-[#265550] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#1b413d] ${
        isVisible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
      aria-label="Back to Top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
