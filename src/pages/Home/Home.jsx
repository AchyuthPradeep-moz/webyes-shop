import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import './Home.css';


const STATIC_CATEGORIES = [
  { id: 'men',         label: "Men's Fashion" },
  { id: 'women',       label: "Women's Fashion" },
  { id: 'accessories', label: 'Accessories' },
  { id: 'electronics', label: 'Electronics' },
];

const FILTER_TABS = ['All', 'Men', 'Women', 'Accessories', 'Electronics'];
const CategoryCard = ({ cat, products }) => {
  const sample = products.find(p => p.mappedCategory === cat.id);
  const count = products.filter(p => p.mappedCategory === cat.id).length;
  if (!sample) return null; 

  return (
    <Link to={`/category/${cat.id}`} className="category-card">
      <img src={sample.image} alt={cat.label} />
      <div className="category-card-info">
        <h3>{cat.label}</h3>
        <p>{count} products</p>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  cat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.array.isRequired,
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { products, loading } = useProducts();

  const filtered = products.filter(p => {
    if (activeTab === 'All') return true;
    return p.mappedCategory === activeTab.toLowerCase();
  });

  return (
    <main className="home-page">

      <section className="hero-section">
        <div className="hero-inner container">
          <h1 className="hero-title">Summer Collection 2026</h1>
          <p className="hero-sub">
            Discover the latest trends in fashion. Shop our exclusive collection with up to 50% off on selected items.
          </p>
          <div className="hero-actions">
            <Link to="/category/women" className="hero-btn-primary">Shop Now →</Link>
            <button className="hero-btn-secondary" onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}>View Collection</button>
          </div>
        </div>
      </section>

      <section className="section-categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Explore our curated collections designed for every style and occasion</p>
          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : (
            <div className="categories-grid">
              {STATIC_CATEGORIES.map(cat => (
                <CategoryCard key={cat.id} cat={cat} products={products} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-featured" id="featured">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Discover our handpicked selection of premium fashion items</p>

          <div className="filter-tabs" role="tablist">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : (
            <div className="products-grid">
              {filtered.slice(0, 8).map((product, i) => (
                <div key={product.id} style={{ animationDelay: `${i * 0.06}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;