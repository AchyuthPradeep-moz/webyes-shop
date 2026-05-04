import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner container">
      <div className="footer-brand">
        <h3 className="footer-logo">WebYes Shop</h3>
        <p>Your destination for premium fashion and accessories. Quality products, exceptional service.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
          </a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Store Locator</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Customer Service</h4>
        <ul>
          <li><a href="#">Shipping & Returns</a></li>
          <li><a href="#">Size Guide</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Track Order</a></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Newsletter</h4>
        <p className="footer-newsletter-desc">Subscribe to get special offers and updates</p>
        <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your email" aria-label="Email for newsletter" />
          <button type="submit" aria-label="Subscribe">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </div>
    <div className="footer-bottom container">
      <p>© 2025 WebYes Shop. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
