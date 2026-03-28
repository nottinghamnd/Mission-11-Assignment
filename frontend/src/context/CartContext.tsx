import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.bookId === item.bookId);

      if (!existingItem) {
        return [...prevCart, item];
      }

      return prevCart.map((cartItem) =>
        cartItem.bookId === item.bookId
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.bookId !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
