import { useState, useEffect } from 'react';

const CATEGORY_MAP = {
  "men's clothing": "men",
  "women's clothing": "women",
  "jewelery": "accessories",
  "electronics": "electronics",
};

const transformProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  image: p.image,
  category: p.category,
  mappedCategory: CATEGORY_MAP[p.category] || 'accessories',
  rating: p.rating,
  description: p.description,
  originalPrice: parseFloat((p.price * (1 + Math.random() * 0.5 + 0.1)).toFixed(2)),
  discount: Math.floor(Math.random() * 40 + 10),
});

export const useProducts = () => {
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

  return { products, loading, error };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(transformProduct(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading, error };
};