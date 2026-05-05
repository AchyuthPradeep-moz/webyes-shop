import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Category from './pages/Category/Category';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import './App.css';

const Layout = ({ children, onSearch }) => (
  <>
    <Navbar onSearch={onSearch} />
    {children}
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onSearch: PropTypes.func,
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Layout onSearch={setSearchQuery}><Home /></Layout>} />
              <Route path="/shop" element={<Layout onSearch={setSearchQuery}><Shop searchQuery={searchQuery} /></Layout>} />
              <Route path="/cart" element={<Layout onSearch={setSearchQuery}><Cart /></Layout>} />
              <Route path="/category/:categoryId" element={<Layout onSearch={setSearchQuery}><Category /></Layout>} />
              <Route path="/product/:id" element={<Layout onSearch={setSearchQuery}><ProductDetail /></Layout>} />
              <Route path="/checkout" element={<Layout onSearch={setSearchQuery}><Checkout /></Layout>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
