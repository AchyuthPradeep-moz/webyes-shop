import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ProductsContext = createContext(null);

const CATEGORY_MAP = {
  "men's clothing": 'men',
  "women's clothing": 'women',
  "jewelery": 'accessories',
  "electronics": 'electronics',
};

const transformProduct = (p) => {
  const discount = ((p.id * 7) % 40) + 10;
  const originalPrice = parseFloat((p.price / (1 - discount / 100)).toFixed(2));
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.image,
    category: p.category,
    mappedCategory: CATEGORY_MAP[p.category] || 'accessories',
    rating: p.rating,
    description: p.description,
    originalPrice,
    discount,
  };
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data.map(transformProduct));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = { children: PropTypes.node.isRequired };
