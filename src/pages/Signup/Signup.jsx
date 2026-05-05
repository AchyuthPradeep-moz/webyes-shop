import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../Login/Login.css';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.username || !form.password || !form.confirm) {
      setError('Please fill in all fields.'); return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.'); return;
    }
    setLoading(true);
    try {
      signup(form.email, form.username, form.password);
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
          <h1>Create account</h1>
          <p>Join WebYes Shop today</p>
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
            <label htmlFor="username">Username</label>
            <input
              id="username" name="username" type="text"
              autoComplete="username" placeholder="johndoe"
              value={form.username} onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password"
              autoComplete="new-password" placeholder="Min. 6 characters"
              value={form.password} onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm" name="confirm" type="password"
              autoComplete="new-password" placeholder="••••••••"
              value={form.confirm} onChange={handleChange}
            />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" state={{ from }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;