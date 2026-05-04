import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import Footer from '../../components/Footer/Footer';
import './ProductDetail.css';

const COLORS = ['Black', 'Beige', 'Burgundy'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const FEATURES = ['Premium fabric blend', 'Water-resistant coating', 'Multiple pockets', 'Adjustable cuffs'];

const hasVariants = (category) =>
  category === "men's clothing" || category === "women's clothing";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading } = useProduct(id);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('Burgundy');
  const [selectedSize, setSelectedSize] = useState('XL');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    const variants = hasVariants(product.category)
      ? { selectedSize, selectedColor }
      : {};
    addItem({ ...product, ...variants }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
  if (!product) return <p style={{padding:'40px', textAlign:'center'}}>Product not found.</p>;

  const categoryLabel = product.category.replace(/_/g, ' ').toUpperCase();

  return (
    <>
      <main className="product-detail-page">
        <div className="container">
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>

          <div className="product-detail-grid">
            <div className="product-detail-image-wrap">
              {product.discount && <span className="product-badge">-{product.discount}%</span>}
              <img src={product.image} alt={product.title} />
            </div>

            <div className="product-detail-info">
              <span className="detail-category">{categoryLabel}</span>
              <h1 className="detail-title">{product.title}</h1>

              <div className="detail-prices">
                <span className="detail-price">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="detail-original">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="detail-description">{product.description}</p>

              <hr className="detail-divider" />

              <div className="detail-options">
                {hasVariants(product.category) && (
                  <>
                    <div className="option-group">
                      <label className="option-label">Color: <strong>{selectedColor}</strong></label>
                      <div className="option-pills">
                        {COLORS.map(c => (
                          <button
                            key={c}
                            className={`option-pill ${selectedColor === c ? 'active' : ''}`}
                            onClick={() => setSelectedColor(c)}
                          >{c}</button>
                        ))}
                      </div>
                    </div>
                    <div className="option-group">
                      <label className="option-label">Size: <strong>{selectedSize}</strong></label>
                      <div className="option-pills">
                        {SIZES.map(s => (
                          <button
                            key={s}
                            className={`option-pill ${selectedSize === s ? 'active' : ''}`}
                            onClick={() => setSelectedSize(s)}
                          >{s}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="detail-qty-row">
                <label className="option-label">Quantity</label>
                <QuantitySelector quantity={qty} onChange={setQty} />
              </div>

              <button
                className={`detail-add-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button className="detail-wishlist-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Add to Wishlist
              </button>

              <hr className="detail-divider" />

              <div className="detail-features">
                <h3>Product Features</h3>
                <ul>
                  {FEATURES.map(f => (
                    <li key={f}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-badges">
                <div className="detail-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  <div>
                    <strong>Free Shipping</strong>
                    <span>On orders over $50</span>
                  </div>
                </div>
                <div className="detail-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <div>
                    <strong>Secure Payment</strong>
                    <span>100% protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;