import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import './Category.css';

const CATEGORY_LABELS = {
  men: "Men's Fashion",
  women: "Women's Fashion",
  accessories: 'Accessories',
  electronics: 'Electronics',
};

const Category = () => {
  const { categoryId } = useParams();
  const { products, loading } = useProducts();

  const filtered = products.filter(p => p.mappedCategory === categoryId);
  const label = CATEGORY_LABELS[categoryId] || categoryId;

  return (
    <main className="category-page">
      <div className="category-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <h1 className="category-hero-title">{label}</h1>
          <p className="category-hero-count">
            {loading ? '...' : `${filtered.length} products available`}
          </p>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="spinner-wrap"><div className="spinner" /></div>
        ) : (
          <div className="products-grid">
            {filtered.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="no-results">No products in this category yet.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Category;