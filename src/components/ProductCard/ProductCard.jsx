import { useState } from 'react';
// FIX 7: Replaced useNavigate + onClick with a Link so keyboard users and
// right-click "open in new tab" both work correctly
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../../hooks/useCart';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    // Prevent the Link from navigating when clicking "Add to Cart"
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const categoryLabel = product.category.replace(/_/g, ' ').toUpperCase();

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        {product.discount && (
          <span className="product-badge">-{product.discount}%</span>
        )}
        <button
          className="product-wishlist-btn"
          onClick={e => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Add to wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="product-card-img"
        />
        <div className="product-card-overlay">
          <button
            className={`product-add-btn ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="product-card-info">
        <span className="product-card-category">{categoryLabel}</span>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">
          <span className="price-current">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    discount: PropTypes.number,
    originalPrice: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
