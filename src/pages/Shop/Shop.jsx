import { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import './Shop.css';

const FILTER_TABS = ['All', 'Men', 'Women', 'Accessories', 'Electronics'];


const Shop = ({ searchQuery = '' }) => {
  const [activeTab, setActiveTab] = useState('All');
  const { products, loading, error } = useContext(ProductsContext);

  const filtered = products.filter(p => {
    const matchesTab = activeTab === 'All' || p.mappedCategory === activeTab.toLowerCase();
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <main className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1 className="section-title">Featured Products</h1>
          <p className="section-subtitle">
            {searchQuery ? `Results for "${searchQuery}"` : 'Discover our handpicked selection of premium fashion items'}
          </p>
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
        </div>

        {loading && <div className="spinner-wrap"><div className="spinner" /></div>}
        {error && <p className="shop-error">Failed to load products. Please try again.</p>}

        {!loading && !error && (
          <div className="products-grid">
            {filtered.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 0.04}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="no-results">No products found.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

Shop.propTypes = {
  searchQuery: PropTypes.string,
};

export default Shop;
