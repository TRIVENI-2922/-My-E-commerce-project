import { Product, Unit } from './types';

export const BUSINESS_NAME = "Triveni Renuka Wholesale Fruit Shop";
export const BUSINESS_PHONE = "8187855608";
export const BUSINESS_LOCATION = "Khammam, Telangana";
export const GOOGLE_MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.867257324564!2d80.1514!3d17.2473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a34563456789012%3A0x123456789abcdef0!2sKhammam%20Fruit%20Market!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Kashmir Apple (Simla)',
    category: 'Popular',
    image: 'https://picsum.photos/id/1080/400/400',
    description: 'Fresh, crunchy, and sweet apples directly from Kashmir valley.',
    inStock: true,
    isDailyDeal: true,
    variants: [
      { id: 'v1-1', unit: Unit.KG, price: 180, wholesalePrice: 150 },
      { id: 'v1-2', unit: Unit.BOX, price: 2800, wholesalePrice: 2400, weightDescription: '20kg Box' }
    ]
  },
  {
    id: 'p2',
    name: 'Nagpur Oranges',
    category: 'Citrus',
    image: 'https://picsum.photos/id/100/400/400', // approximation
    description: 'Juicy and tangy oranges, perfect for juice or snack.',
    inStock: true,
    isDailyDeal: false,
    variants: [
      { id: 'v2-1', unit: Unit.KG, price: 80, wholesalePrice: 65 },
      { id: 'v2-2', unit: Unit.CRATE, price: 1500, wholesalePrice: 1200, weightDescription: '25kg Crate' }
    ]
  },
  {
    id: 'p3',
    name: 'Robusta Banana',
    category: 'Popular',
    image: 'https://picsum.photos/id/102/400/400', // approximation
    description: 'High energy yellow bananas, ripe and ready to eat.',
    inStock: true,
    isDailyDeal: true,
    variants: [
      { id: 'v3-1', unit: Unit.DOZEN, price: 60, wholesalePrice: 45 },
      { id: 'v3-2', unit: Unit.CRATE, price: 800, wholesalePrice: 650, weightDescription: '100 pieces approx' }
    ]
  },
  {
    id: 'p4',
    name: 'Alphonso Mango',
    category: 'Seasonal',
    image: 'https://picsum.photos/id/108/400/400', // approximation
    description: 'The king of fruits. Rich, creamy, and tender texture.',
    inStock: true,
    isDailyDeal: false,
    variants: [
      { id: 'v4-1', unit: Unit.KG, price: 250, wholesalePrice: 220 },
      { id: 'v4-2', unit: Unit.BOX, price: 1100, wholesalePrice: 950, weightDescription: '1 Dozen Box' }
    ]
  },
  {
    id: 'p5',
    name: 'Green Grapes (Seedless)',
    category: 'Seasonal',
    image: 'https://picsum.photos/id/1025/400/400', // approximation
    description: 'Sweet and crunchy green grapes.',
    inStock: true,
    isDailyDeal: true,
    variants: [
      { id: 'v5-1', unit: Unit.KG, price: 120, wholesalePrice: 90 },
      { id: 'v5-2', unit: Unit.BOX, price: 1100, wholesalePrice: 850, weightDescription: '10kg Box' }
    ]
  },
  {
    id: 'p6',
    name: 'Pomegranate (Kabul)',
    category: 'Popular',
    image: 'https://picsum.photos/id/106/400/400', // approximation
    description: 'Deep red pearls with rich antioxidant properties.',
    inStock: true,
    isDailyDeal: false,
    variants: [
      { id: 'v6-1', unit: Unit.KG, price: 220, wholesalePrice: 190 },
      { id: 'v6-2', unit: Unit.BOX, price: 2000, wholesalePrice: 1800, weightDescription: '10kg Box' }
    ]
  }
];
