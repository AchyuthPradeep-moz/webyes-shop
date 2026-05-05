// FIX 5: Hooks now read from shared ProductsContext instead of each fetching independently.
// useProducts() returns the full list; useProduct(id) returns a single item by id.
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
  // While the shared fetch is still in flight, mirror the loading state
  return { product, loading, error };
};
