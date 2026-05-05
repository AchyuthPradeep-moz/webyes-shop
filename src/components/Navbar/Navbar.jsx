import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import CartPanel from '../CartPanel/CartPanel';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const accountRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch && onSearch(searchVal.trim());
      navigate('/shop');
    }
  };

 
  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner container">
          <Link to="/" className="navbar-logo">WebYes Shop</Link>

          <ul className="navbar-links">
            <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/category/men" className={({ isActive }) => isActive ? 'active' : ''}>Men</NavLink></li>
            <li><NavLink to="/category/women" className={({ isActive }) => isActive ? 'active' : ''}>Women</NavLink></li>
            <li><NavLink to="/category/accessories" className={({ isActive }) => isActive ? 'active' : ''}>Accessories</NavLink></li>
            <li><NavLink to="/category/electronics" className={({ isActive }) => isActive ? 'active' : ''}>Electronics</NavLink></li>
          </ul>

          <div className="navbar-actions">
            <form className="navbar-search" onSubmit={handleSearch}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                aria-label="Search products"
              />
            </form>

           
            <div className="navbar-account" ref={accountRef}>
              {user ? (
                <>
                  <button
                    className="navbar-icon-btn navbar-user-btn"
                    onClick={() => setAccountOpen(o => !o)}
                    aria-label="Account menu"
                  >
                    <span className="navbar-avatar">{user.username[0].toUpperCase()}</span>
                  </button>
                  {accountOpen && (
                    <div className="account-dropdown">
                      <div className="account-dropdown-name">Hi, {user.username} 👋</div>
                      <div className="account-dropdown-email">{user.email}</div>
                      <hr className="account-dropdown-divider" />
                      <button className="account-dropdown-logout" onClick={handleLogout}>
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="navbar-icon-btn"
                    aria-label="Account"
                    onClick={() => setAccountOpen(o => !o)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </button>
                  {accountOpen && (
                    <div className="account-dropdown">
                      <button className="account-dropdown-auth-btn" onClick={() => { setAccountOpen(false); navigate('/login'); }}>
                        Log in
                      </button>
                      <button className="account-dropdown-auth-btn signup" onClick={() => { setAccountOpen(false); navigate('/signup'); }}>
                        Sign up
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              className="navbar-icon-btn navbar-cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart with ${totalItems} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {totalItems > 0 && (
                <span className="cart-badge" >{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func,
};

export default Navbar;