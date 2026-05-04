import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import './CartPanel.css';

const CartPanel = ({ isOpen, onClose }) => {
  const { items, itemKey, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();



  const handleCheckout = () => { onClose(); navigate('/checkout'); };
  const handleContinue = () => { onClose(); navigate('/shop'); };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-panel-header">
          <h2>Shopping Cart ({totalItems})</h2>
          <button onClick={onClose} className="cart-close-btn" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-panel-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map(item => (
                <li key={itemKey(item)} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{item.title}</h4>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeItem(itemKey(item))}
                        aria-label={`Remove ${item.title}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    {(item.selectedSize || item.selectedColor) && (
                      <p className="cart-item-variant">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ' • '}
                        {item.selectedColor}
                      </p>
                    )}
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <QuantitySelector
                      quantity={item.quantity}
                      onChange={(qty) => updateQuantity(itemKey(item), qty)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-panel-footer">
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span className="text-muted">Calculated at checkout</span>
              </div>
              <div className="cart-summary-row cart-total">
                <strong>Total</strong>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </div>
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="cart-continue-btn" onClick={handleContinue}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

CartPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartPanel;