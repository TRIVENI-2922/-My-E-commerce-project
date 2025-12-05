export enum Unit {
  KG = 'KG',
  DOZEN = 'Dozen',
  BOX = 'Box',
  CRATE = 'Crate',
  PIECE = 'Piece'
}

export interface PricingVariant {
  id: string;
  unit: Unit;
  price: number;
  wholesalePrice: number; // For bulk buyers
  weightDescription?: string; // e.g., "approx 10kg"
}

export interface Product {
  id: string;
  name: string;
  category: 'Popular' | 'Seasonal' | 'Exotic' | 'Citrus';
  image: string;
  description: string;
  variants: PricingVariant[];
  inStock: boolean;
  isDailyDeal: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  unit: Unit;
  price: number;
  quantity: number;
}

export interface User {
  name: string;
  phone: string;
  role: 'customer' | 'admin';
  isWholesale?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: User;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Delivered';
  paymentMethod: string;
}
