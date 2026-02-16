import { useState, useEffect } from 'react';

// ─── Auth Utilities (localStorage-based) ────────────────────────────────────
const AUTH_KEY = 'noeme_users';
const SESSION_KEY = 'noeme_session';

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || '{}'); }
  catch { return {}; }
};

const saveUser = (email, data) => {
  const users = getUsers();
  users[email.toLowerCase()] = data;
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
};

const createSession = (email, name) => {
  const session = { email, name, createdAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
};

export const logout = () => localStorage.removeItem(SESSION_KEY);
// ────────────────────────────────────────────────────────────────────────────

const InputField = ({ label, type, value, onChange, error, placeholder }) => (
  <div className="flex flex-col gap-1.5" style={{ width: '100%' }}>
    <label
      style={{
        fontFamily: 'Georgia, serif',
        fontSize: '10px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#7a6a5a',
      }}
    >
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${error ? 'rgba(200,80,80,0.6)' : 'rgba(212,175,100,0.2)'}`,
        outline: 'none',
        padding: '14px 16px',
        color: '#f5f0e8',
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
        letterSpacing: '0.5px',
      }}
      onFocus={e => {
        if (!error) e.target.style.borderColor = 'rgba(212,175,100,0.6)';
      }}
      onBlur={e => {
        if (!error) e.target.style.borderColor = 'rgba(212,175,100,0.2)';
      }}
    />
    {error && (
      <span style={{ fontSize: '11px', color: 'rgba(200,100,100,0.9)', fontFamily: 'Georgia, serif', letterSpacing: '0.5px' }}>
        {error}
      </span>
    )}
  </div>
);

const AuthPage = ({ onNavigate, onAuthSuccess }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [animating, setAnimating] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupErrors, setSignupErrors] = useState({});
  const [signupMessage, setSignupMessage] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  const switchMode = (newMode) => {
    if (newMode === mode) return;
    setAnimating(true);
    setTimeout(() => {
      setMode(newMode);
      setLoginErrors({});
      setSignupErrors({});
      setLoginMessage('');
      setSignupMessage('');
      setSuccessMsg('');
      setAnimating(false);
    }, 300);
  };

  // ─── Login ────────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginEmail.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) errs.email = 'Enter a valid email';
    if (!loginPassword) errs.password = 'Password is required';

    if (Object.keys(errs).length) { setLoginErrors(errs); return; }

    const users = getUsers();
    const user = users[loginEmail.toLowerCase()];

    if (!user) {
      setLoginErrors({ email: 'No account found with this email' });
      return;
    }
    if (user.password !== loginPassword) {
      setLoginErrors({ password: 'Incorrect password' });
      return;
    }

    const session = createSession(loginEmail, user.name);
    setSuccessMsg(`Welcome back, ${user.name}.`);
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(session);
      else onNavigate('home');
    }, 1400);
  };

  // ─── Signup ───────────────────────────────────────────────────────────────
  const handleSignup = (e) => {
    e.preventDefault();
    const errs = {};
    if (!signupName.trim()) errs.name = 'Name is required';
    if (!signupEmail.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(signupEmail)) errs.email = 'Enter a valid email';
    if (!signupPassword) errs.password = 'Password is required';
    else if (signupPassword.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!signupConfirm) errs.confirm = 'Please confirm your password';
    else if (signupPassword !== signupConfirm) errs.confirm = 'Passwords do not match';

    if (Object.keys(errs).length) { setSignupErrors(errs); return; }

    const users = getUsers();
    if (users[signupEmail.toLowerCase()]) {
      setSignupErrors({ email: 'An account with this email already exists' });
      return;
    }

    saveUser(signupEmail, { name: signupName.trim(), password: signupPassword });
    const session = createSession(signupEmail, signupName.trim());
    setSuccessMsg(`Welcome to Noeme, ${signupName.trim()}.`);
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(session);
      else onNavigate('home');
    }, 1400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0c0a08',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Atmospheric background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(212,175,100,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 80% 70%, rgba(180,140,80,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(212,175,100,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Card ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              border: '1px solid rgba(212,175,100,0.3)',
              borderRadius: '50%',
              margin: '0 auto 20px',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '16px',
                background: 'linear-gradient(135deg, #d4af64, #f5f0e8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NO
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '11px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #f5f0e8, #d4af64)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              marginBottom: '8px',
              fontWeight: 'normal',
            }}
          >
            Noeme
          </h1>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '12px',
              color: '#4a3a2a',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {mode === 'login' ? 'Welcome Back' : 'Begin Your Journey'}
          </p>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(212,175,100,0.1)',
            marginBottom: '40px',
          }}
        >
          {['login', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '14px 0',
                fontFamily: 'Georgia, serif',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: mode === m ? '#d4af64' : '#4a3a2a',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
              <span
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(to right, #d4af64, #b8955a)',
                  opacity: mode === m ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            </button>
          ))}
        </div>

        {/* Form container */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* ── Success overlay ── */}
          {successMsg && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 0',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(212,175,100,0.5)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af64" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '13px',
                  color: '#d4af64',
                  letterSpacing: '1px',
                  margin: 0,
                }}
              >
                {successMsg}
              </p>
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && !successMsg && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <InputField
                label="Email Address"
                type="email"
                value={loginEmail}
                onChange={e => { setLoginEmail(e.target.value); setLoginErrors(p => ({ ...p, email: '' })); }}
                error={loginErrors.email}
                placeholder="your@email.com"
              />
              <InputField
                label="Password"
                type="password"
                value={loginPassword}
                onChange={e => { setLoginPassword(e.target.value); setLoginErrors(p => ({ ...p, password: '' })); }}
                error={loginErrors.password}
                placeholder="••••••••"
              />

              <button
                type="submit"
                style={{
                  marginTop: '8px',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #c4a044, #d4af64)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#0c0a08',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Sign In
              </button>

              <p
                style={{
                  textAlign: 'center',
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  color: '#4a3a2a',
                  letterSpacing: '0.5px',
                  margin: 0,
                }}
              >
                New to Noeme?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#d4af64',
                    fontFamily: 'Georgia, serif',
                    fontSize: '11px',
                    padding: 0,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Create an account
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {mode === 'signup' && !successMsg && (
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <InputField
                label="Full Name"
                type="text"
                value={signupName}
                onChange={e => { setSignupName(e.target.value); setSignupErrors(p => ({ ...p, name: '' })); }}
                error={signupErrors.name}
                placeholder="Your name"
              />
              <InputField
                label="Email Address"
                type="email"
                value={signupEmail}
                onChange={e => { setSignupEmail(e.target.value); setSignupErrors(p => ({ ...p, email: '' })); }}
                error={signupErrors.email}
                placeholder="your@email.com"
              />
              <InputField
                label="Password"
                type="password"
                value={signupPassword}
                onChange={e => { setSignupPassword(e.target.value); setSignupErrors(p => ({ ...p, password: '' })); }}
                error={signupErrors.password}
                placeholder="Min. 6 characters"
              />
              <InputField
                label="Confirm Password"
                type="password"
                value={signupConfirm}
                onChange={e => { setSignupConfirm(e.target.value); setSignupErrors(p => ({ ...p, confirm: '' })); }}
                error={signupErrors.confirm}
                placeholder="Repeat password"
              />

              <button
                type="submit"
                style={{
                  marginTop: '8px',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #c4a044, #d4af64)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#0c0a08',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                Create Account
              </button>

              <p
                style={{
                  textAlign: 'center',
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  color: '#4a3a2a',
                  letterSpacing: '0.5px',
                  margin: 0,
                }}
              >
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#d4af64',
                    fontFamily: 'Georgia, serif',
                    fontSize: '11px',
                    padding: 0,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer note */}
        {!successMsg && (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'Georgia, serif',
              fontSize: '10px',
              color: '#2a1f15',
              letterSpacing: '1px',
              marginTop: '40px',
            }}
          >
            Your data is stored locally on this device only.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;