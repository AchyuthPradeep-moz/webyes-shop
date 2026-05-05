import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
};

export const useProduct = (id) => {
  const { products, loading, error } = useProducts();
  const product = products.find(p => p.id === Number(id)) ?? null;
  return { product, loading, error };
};
