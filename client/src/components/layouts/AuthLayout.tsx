import { ReactNode } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <motion.div 
              className="inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-3xl font-heading font-bold text-[#265550]">DecorNest</h1>
            </motion.div>
          </Link>
          <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
        
        <div className="mt-8 bg-white dark:bg-[#1E1E1E] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}