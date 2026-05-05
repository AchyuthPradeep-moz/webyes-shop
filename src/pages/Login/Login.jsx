import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1  className="auth-brand-link">WebYes Shop</h1>

        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email"
              autoComplete="email" placeholder="Enter Email Id"
              value={form.email} onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password"
              autoComplete="current-password" placeholder="••••••••"
              value={form.password} onChange={handleChange}
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account?{' '}
          <Link to="/signup" state={{ from }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;