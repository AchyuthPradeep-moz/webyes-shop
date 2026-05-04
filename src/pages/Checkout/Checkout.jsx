import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Footer from '../../components/Footer/Footer';
import './Checkout.css';

const Checkout = () => {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  });

  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      alert('Order placed successfully! Thank you for your purchase.');
      navigate('/');
    }, 1500);
  };

  return (
    <>
      <main className="checkout-page">
        <div className="container">
          <Link to="/cart" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Back
          </Link>
          <h1 className="checkout-title">Checkout</h1>

          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <section className="checkout-section">
                <h2>Shipping Information</h2>
                <div className="form-row two-col">
                  <div className="form-field">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="address">Street Address</label>
                  <input id="address" name="address" value={form.address} onChange={handleChange} required />
                </div>
                <div className="form-row three-col">
                  <div className="form-field">
                    <label htmlFor="city">City</label>
                    <input id="city" name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="state">State</label>
                    <input id="state" name="state" value={form.state} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="zip">ZIP Code</label>
                    <input id="zip" name="zip" value={form.zip} onChange={handleChange} required />
                  </div>
                </div>
              </section>

              <section className="checkout-section">
                <h2>Payment Information</h2>
                <div className="form-field">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} required />
                </div>
                <div className="form-row two-col">
                  <div className="form-field">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input id="expiry" name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" name="cvv" placeholder="123" value={form.cvv} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input id="cardName" name="cardName" value={form.cardName} onChange={handleChange} required />
                </div>
              </section>

              <div className="checkout-trust-badges">
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  <span>Secure Payment</span>
                </div>
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  <span>Fast Delivery</span>
                </div>
                <div className="trust-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Money Back</span>
                </div>
              </div>
            </form>

            <aside className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-items">
                {items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p className="order-item-name">{item.title}</p>
                      <p className="order-item-meta">${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-totals">
                <div className="order-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="order-row"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="order-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="order-row order-total"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div>
              </div>
              <button
                type="submit"
                form="checkout-form-el"
                className={`place-order-btn ${placing ? 'placing' : ''}`}
                onClick={handleSubmit}
                disabled={placing || items.length === 0}
              >
                {placing ? 'Processing...' : 'Place Order'}
              </button>
              <p className="checkout-terms">By placing your order, you agree to our Terms & Conditions</p>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;