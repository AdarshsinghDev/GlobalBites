import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { List, X, ArrowRight } from '@phosphor-icons/react';
import MotionButton from './ui/MotionButton';
import Logo from './ui/Logo';
import api, { getAuthToken, setAuthToken } from '../lib/api';
import { useUserContext } from '../context/CreateContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userContextData, setUserContextData } = useUserContext();

  const hidden = useMemo(() => ['/signup', '/login', '/verify-otp'].includes(location.pathname), [location.pathname]);
  if (hidden) return null;
  const isLoggedIn = Boolean(getAuthToken() || userContextData?.email);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/home', label: 'Results' },
    { to: '/chef', label: 'AI Chef' },
    { to: '/budget', label: 'Budget' },
    { to: '/knowledge', label: 'Knowledge' },
    { to: '/profile', label: 'Profile' },
  ];

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setAuthToken(null);
      localStorage.removeItem('storedFullname');
      localStorage.removeItem('storedEmail');
      localStorage.removeItem('storedIsVerified');
      localStorage.removeItem('pendingVerifyEmail');
      setUserContextData({ email: '', fullname: '', isVerified: false });
      setOpen(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <>
      <motion.nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 64,
          background: 'rgba(247,244,239,0.85)',
          backdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Logo size={58} />
          </Link>

          <div className="desktop-links" style={{ display: 'none', gap: 24 }}>
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="desktop-actions" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
            {isLoggedIn ? (
              <MotionButton variant="ghost" icon={null} onClick={handleLogout}>Logout</MotionButton>
            ) : (
              <>
                <Link to="/login"><MotionButton variant="ghost" icon={null}>Log in</MotionButton></Link>
                <Link to="/signup"><MotionButton icon={ArrowRight}>Get Started</MotionButton></Link>
              </>
            )}
          </div>

          <button type="button" onClick={() => setOpen(!open)} style={{ border: 0, background: 'transparent' }}>
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </motion.nav>

      {open ? (
        <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
          <div className="container" style={{ paddingTop: 16, paddingBottom: 16, display: 'grid', gap: 10 }}>
            {links.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>)}
            {isLoggedIn ? (
              <button type="button" onClick={handleLogout} style={{ border: 0, background: 'transparent', padding: 0, textAlign: 'left', color: 'var(--terracotta)', fontWeight: 600 }}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>Log in</Link>
                <Link to="/signup" onClick={() => setOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      ) : null}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-links, .desktop-actions { display: flex !important; }
          nav button { display: none; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
