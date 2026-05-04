import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import './Cart.css';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <h1 className="cart-page-title">Shopping Cart (0)</h1>
          <div className="cart-empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1.2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="cart-shop-btn">Continue Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-page-header">
          <h1 className="cart-page-title">Shopping Cart ({totalItems})</h1>
          <button className="cart-clear-btn" onClick={clearCart}>Clear all</button>
        </div>

        <div className="cart-page-layout">
          <div className="cart-items-section">
            <ul className="cart-page-items">
              {items.map(item => (
                <li key={item.id} className="cart-page-item">
                  <img src={item.image} alt={item.title} className="cart-page-item-img" />
                  <div className="cart-page-item-info">
                    <h3 className="cart-page-item-title">{item.title}</h3>
                    <p className="cart-page-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-page-item-actions">
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(qty) => updateQuantity(item.id, qty)}
                      />
                      <button
                        className="cart-page-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-page-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="cart-summary-card">
            <h2>Order Summary</h2>
            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span className="free-ship">Calculated at checkout</span>
              </div>
              <div className="cart-summary-row total-row">
                <strong>Total</strong>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </div>
            <button className="checkout-cta" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
            <Link to="/shop" className="continue-shopping-link">Continue Shopping</Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
