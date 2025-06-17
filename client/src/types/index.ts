// Product types
export type ProductCategory = 
  | 'wall-decor' 
  | 'lighting' 
  | 'furniture-accents' 
  | 'indoor-plants' 
  | 'rugs-carpets' 
  | 'curtains-blinds';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  popularity: number;
  date: string;
  description?: string;
  inStock?: boolean;
  colors?: string[];
  dimensions?: string;
  materials?: string[];
  rating?: number;
}

// Service types
export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  features?: string[];
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  address?: UserAddress;
}

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Cart and order types
export interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: UserAddress;
}

// Contact form type
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
