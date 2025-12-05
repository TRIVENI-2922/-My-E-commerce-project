import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, PricingVariant, Unit } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  addToCart: (product: Product, variantId: string, qty: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  login: (phone: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  updateProductPrice: (productId: string, variantId: string, newPrice: number, newWholesalePrice: number) => void;
  toggleProductStock: (productId: string) => void;
  addProduct: (product: Product) => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Load state from local storage on mount (simulated persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('triveni_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addToCart = (product: Product, variantId: string, qty: number) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return;

    setCart(prev => {
      const existing = prev.find(item => item.variantId === variantId);
      const priceToUse = (user?.isWholesale || user?.role === 'admin') ? variant.wholesalePrice : variant.price;
      
      if (existing) {
        return prev.map(item => 
          item.variantId === variantId 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        image: product.image,
        unit: variant.unit,
        price: priceToUse,
        quantity: qty
      }];
    });
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(item => item.variantId !== variantId));
  };

  const clearCart = () => setCart([]);

  const login = (phone: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      name: role === 'admin' ? 'Store Manager' : 'Valued Customer',
      phone,
      role,
      isWholesale: role === 'admin' // Admins see wholesale prices
    };
    setUser(newUser);
    localStorage.setItem('triveni_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setCart([]); // Clear cart on logout for security
    localStorage.removeItem('triveni_user');
  };

  // Admin functions
  const updateProductPrice = (productId: string, variantId: string, newPrice: number, newWholesalePrice: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        variants: p.variants.map(v => 
          v.id === variantId ? { ...v, price: newPrice, wholesalePrice: newWholesalePrice } : v
        )
      };
    }));
  };

  const toggleProductStock = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, inStock: !p.inStock } : p));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      user,
      addToCart,
      removeFromCart,
      clearCart,
      login,
      logout,
      updateProductPrice,
      toggleProductStock,
      addProduct,
      cartTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
