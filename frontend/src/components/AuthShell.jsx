import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  WarningCircle,
  CheckCircle,
  ArrowCounterClockwise,
  ArrowRight,
} from '@phosphor-icons/react';
import FluentEmoji from './ui/FluentEmoji';
import MotionButton from './ui/MotionButton';
import Logo from './ui/Logo';
import api, { setAuthToken } from '../lib/api';
import { useUserContext } from '../context/CreateContext';

const OTP_LENGTH = 6;

const AuthPage = ({ mode = 'signup' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserContextData } = useUserContext();

  const [tab, setTab] = useState(mode === 'verify' ? 'signup' : mode);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(mode === 'verify');
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const refs = useRef([]);

  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState(localStorage.getItem('pendingVerifyEmail') || '');

  const bulletPoints = useMemo(
    () => ['Recipes from any ingredients', 'Chef-styled cooking guidance', 'Budget-aware meal planning'],
    []
  );

  useEffect(() => {
    if (mode === 'verify') {
      setShowOtp(true);
      setTab('signup');
    }
  }, [mode]);

  useEffect(() => {
    if (!showOtp || countdown <= 0) return undefined;
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showOtp, countdown]);

  const syncUserState = (user, token) => {
    localStorage.setItem('storedFullname', user?.fullname || '');
    localStorage.setItem('storedEmail', user?.email || '');
    localStorage.setItem('storedIsVerified', String(Boolean(user?.isVerified)));
    setUserContextData({
      fullname: user?.fullname || '',
      email: user?.email || '',
      isVerified: Boolean(user?.isVerified),
    });
    setAuthToken(token);
  };

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
    if (serverError) setServerError('');
  };

  const validate = () => {
    const e = {};
    if (tab === 'signup' && !form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    if (!form.password.trim()) e.password = 'Password is required.';
    if (form.password.trim() && form.password.length < 8) e.password = 'Password must be 8+ chars.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitAuth = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      setServerError('');

      if (tab === 'signup') {
        const { data } = await api.post('/api/auth/signup', {
          fullname: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
        });

        if (!data?.success) {
          setServerError(data?.message || 'Signup failed. Please try again.');
          return;
        }

        localStorage.setItem('pendingVerifyEmail', form.email.trim().toLowerCase());
        setPendingEmail(form.email.trim().toLowerCase());
        setCountdown(30);
        setShowOtp(true);
        setOtp(Array(OTP_LENGTH).fill(''));
        return;
      }

      const { data } = await api.post('/api/auth/login', {
        email: form.email.trim(),
        password: form.password,
      });

      if (!data?.success) {
        setServerError(data?.message || 'Login failed. Please try again.');
        return;
      }

      syncUserState(data.user, data.token);
      navigate(location.state?.from || '/home', { replace: true });
    } catch (error) {
      const message = error?.response?.data?.message || 'Request failed. Please try again.';
      const redirectToVerify = error?.response?.data?.redirectToVerify;
      setServerError(message);
      if (redirectToVerify) {
        localStorage.setItem('pendingVerifyEmail', form.email.trim().toLowerCase());
        setPendingEmail(form.email.trim().toLowerCase());
        setShowOtp(true);
        setCountdown(30);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    const enteredOtp = otp.join('');
    const emailForOtp = pendingEmail || form.email.trim().toLowerCase();
    if (enteredOtp.length !== OTP_LENGTH || !emailForOtp) {
      setServerError('Enter complete OTP and valid email.');
      return;
    }

    try {
      setIsSubmitting(true);
      setServerError('');

      const verifyResponse = await api.post('/api/auth/verify-otp', {
        email: emailForOtp,
        otp: enteredOtp,
      });

      if (!verifyResponse?.data?.success) {
        setServerError(verifyResponse?.data?.message || 'OTP verification failed.');
        return;
      }

      if (!form.password) {
        localStorage.removeItem('pendingVerifyEmail');
        navigate('/login', { replace: true });
        return;
      }

      const loginResponse = await api.post('/api/auth/login', {
        email: emailForOtp,
        password: form.password,
      });
      const loginData = loginResponse?.data;
      if (!loginData?.success) {
        setServerError(loginData?.message || 'Login failed after verification.');
        return;
      }

      localStorage.removeItem('pendingVerifyEmail');
      syncUserState(loginData.user, loginData.token);
      navigate('/home', { replace: true });
    } catch (error) {
      setServerError(error?.response?.data?.message || 'OTP verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;
    if (!pendingEmail || !form.password || !form.fullName) {
      setServerError('Resend ke liye signup details dubara fill karo.');
      return;
    }

    try {
      setIsSubmitting(true);
      setServerError('');
      await api.post('/api/auth/signup', {
        fullname: form.fullName.trim(),
        email: pendingEmail,
        password: form.password,
      });
      setCountdown(30);
    } catch (error) {
      setServerError(error?.response?.data?.message || 'OTP resend failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOtp = (i, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[i] = value;
    setOtp(next);
    if (value && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
  };

  return (
    <div className="auth-layout">
      <aside style={{ background: 'var(--green-900)', color: '#fff', position: 'relative', overflow: 'hidden', padding: 48, display: 'none' }} className="auth-left">
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <defs>
            <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#fff" /></pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(122,201,154,0.25), transparent 55%)' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <Logo size={98} alt="GlobalBites" />
          <h1 style={{ marginTop: 24, fontSize: 36, lineHeight: 1.3 }}>Your Kitchen Has Never Been This Smart.</h1>
          <p style={{ marginTop: 12, color: 'rgba(255,255,255,0.72)', maxWidth: 380, fontSize: 15 }}>Join 10,000+ home cooks using AI to plan, cook, and eat better.</p>
          <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
            {bulletPoints.map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.9)' }}><CheckCircle size={18} weight="duotone" color="var(--green-300)" /> {b}</div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.08)', padding: 20 }}>
            <p style={{ fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
              "Made pasta with leftover veggies and it came out restaurant quality!"
            </p>
            <div style={{ marginTop: 10, fontWeight: 600, fontSize: 12 }}>Priya S., Mumbai</div>
          </div>
          <div style={{ position: 'absolute', bottom: 24, right: 26 }} className="float"><FluentEmoji name="pot" size={48} /></div>
          <div style={{ position: 'absolute', top: 40, right: 26 }} className="float"><FluentEmoji name="chef_hat" size={36} /></div>
        </div>
      </aside>

      <main className="auth-main" style={{ background: 'var(--bg-surface)', padding: 48, display: 'flex', justifyContent: 'center' }}>
        <div className="auth-inner" style={{ width: '100%', maxWidth: 440 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}><ArrowLeft size={16} /> Back to home</Link>

          <AnimatePresence mode="wait">
            {!showOtp ? (
              <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ marginTop: 28, background: 'var(--bg-muted)', borderRadius: 999, padding: 4, display: 'flex' }}>
                  {['signup', 'login'].map((m) => (
                    <motion.button key={m} type="button" onClick={() => setTab(m)} whileTap={{ scale: 0.97 }} style={{ flex: 1, border: 0, borderRadius: 999, padding: '10px 14px', fontWeight: 600, fontSize: 14, background: tab === m ? '#fff' : 'transparent', boxShadow: tab === m ? 'var(--shadow-sm)' : 'none', color: tab === m ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {m === 'signup' ? 'Sign Up' : 'Log In'}
                    </motion.button>
                  ))}
                </div>

                <h2 className="text-h1" style={{ marginTop: 24, fontSize: 28 }}>{tab === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: 14 }}>{tab === 'signup' ? 'Start cooking smarter with AI.' : 'Log in to continue your culinary flow.'}</p>

                <form onSubmit={submitAuth} style={{ marginTop: 22, display: 'grid', gap: 14 }}>
                  {tab === 'signup' ? (
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13 }}>Full Name</label>
                      <div className={`input-wrap ${errors.fullName ? 'shake' : ''}`} style={{ marginTop: 6 }}>
                        <span className="left-icon"><User size={18} /></span>
                        <input className="input" value={form.fullName} onChange={(e) => onChange('fullName', e.target.value)} />
                      </div>
                      {errors.fullName ? <div style={{ color: 'var(--terracotta)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginTop: 6 }}><WarningCircle size={14} /> {errors.fullName}</div> : null}
                    </div>
                  ) : null}

                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Email Address</label>
                    <div className={`input-wrap ${errors.email ? 'shake' : ''}`} style={{ marginTop: 6 }}>
                      <span className="left-icon"><Envelope size={18} /></span>
                      <input className="input" value={form.email} onChange={(e) => onChange('email', e.target.value)} />
                    </div>
                    {errors.email ? <div style={{ color: 'var(--terracotta)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginTop: 6 }}><WarningCircle size={14} /> {errors.email}</div> : null}
                  </div>

                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Password</label>
                    <div className={`input-wrap ${errors.password ? 'shake' : ''}`} style={{ marginTop: 6 }}>
                      <span className="left-icon"><Lock size={18} /></span>
                      <input className="input" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => onChange('password', e.target.value)} style={{ paddingRight: 46 }} />
                      <button type="button" className="right-icon" style={{ border: 0, background: 'transparent' }} onClick={() => setShowPassword((s) => !s)}>{showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}</button>
                    </div>
                    {errors.password ? <div style={{ color: 'var(--terracotta)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginTop: 6 }}><WarningCircle size={14} /> {errors.password}</div> : null}
                  </div>

                  {serverError ? (
                    <div style={{ color: 'var(--terracotta)', fontSize: 13 }}>{serverError}</div>
                  ) : null}

                  <MotionButton type="submit" icon={ArrowRight} className="number-text" style={{ width: '100%' }}>
                    {isSubmitting ? 'Please wait...' : tab === 'signup' ? 'Create Account' : 'Log In'}
                  </MotionButton>
                </form>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ textAlign: 'center', marginTop: 36 }}>
                  <FluentEmoji name="envelope_arrow" size={72} />
                  <h2 style={{ marginTop: 10, fontSize: 28 }}>Check your inbox</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>We sent a 6-digit code to {pendingEmail || 'your email'}</p>
                </div>

                <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 10 }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { refs.current[i] = el; }}
                      value={digit}
                      onChange={(e) => onOtp(i, e.target.value)}
                      className="otp-box"
                      maxLength={1}
                    />
                  ))}
                </div>

                {serverError ? (
                  <div style={{ color: 'var(--terracotta)', fontSize: 13, textAlign: 'center', marginTop: 10 }}>{serverError}</div>
                ) : null}

                <div className="number-text" style={{ marginTop: 14, textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
                  {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                  <button type="button" style={{ marginLeft: 8, border: 0, color: 'var(--green-700)', background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: 4 }} onClick={resendOtp}>
                    <ArrowCounterClockwise size={14} /> Resend code
                  </button>
                </div>

                <MotionButton onClick={verifyOtp} className="number-text" icon={ArrowRight} style={{ width: '100%', marginTop: 16 }}>
                  {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                </MotionButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <style>{`@media (min-width: 1024px) { .auth-left { display: block !important; } }`}</style>
    </div>
  );
};

export default AuthPage;
