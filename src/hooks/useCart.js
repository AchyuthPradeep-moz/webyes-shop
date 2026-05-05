// FIX 8: Moved out of CartContext.jsx so fast-refresh works correctly
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
