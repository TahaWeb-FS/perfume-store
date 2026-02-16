import { useState, useEffect } from 'react';
import { getSession, logout } from './Authpage';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(getSession());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Re-check session whenever the page changes (e.g. after login)
  useEffect(() => {
    setSession(getSession());
  }, [currentPage]);

  const navLinks = [
    { name: 'About', page: 'about' },
    { name: 'Legal', page: 'legal' },
    { name: 'Contact', page: 'contact' },
  ];

  const handleNav = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFaqScroll = () => {
    setIsMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    setSession(null);
    handleNav('home');
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: isScrolled ? 'rgba(12, 10, 8, 0.96)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(212,175,100,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div
          className="flex items-center justify-between"
          style={{ height: isScrolled ? '72px' : '88px', transition: 'height 0.5s ease' }}
        >

          {/* ── LOGO ── */}
          <button
            onClick={() => handleNav('home')}
            className="group flex items-center gap-3"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div
              className="relative flex items-center justify-center transition-all duration-300"
              style={{ width: '40px', height: '40px', border: '1px solid rgba(212,175,100,0.4)', borderRadius: '50%' }}
            >
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  background: 'linear-gradient(135deg, #d4af64, #f5f0e8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '1px',
                }}
              >
                NO
              </span>
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(212,175,100,0.6)' }}
              />
            </div>
            <span
              className="text-xl lg:text-2xl font-light tracking-[6px] uppercase"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #f5f0e8, #d4af64)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NOEME
            </span>
          </button>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.page)}
                className="relative text-xs uppercase tracking-[3px] transition-all duration-300 group"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: currentPage === link.page ? '#d4af64' : '#7a6a5a',
                  fontFamily: 'Georgia, serif',
                  padding: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
                onMouseLeave={e => e.currentTarget.style.color = currentPage === link.page ? '#d4af64' : '#7a6a5a'}
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-400 group-hover:w-full"
                  style={{
                    background: 'linear-gradient(to right, #d4af64, #b8955a)',
                    width: currentPage === link.page ? '100%' : '0%',
                    transitionDuration: '400ms',
                  }}
                />
              </button>
            ))}

            {/* ── FAQ scroll link ── */}
            <button
              onClick={handleFaqScroll}
              className="relative text-xs uppercase tracking-[3px] transition-all duration-300 group"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#7a6a5a',
                fontFamily: 'Georgia, serif',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
              onMouseLeave={e => e.currentTarget.style.color = '#7a6a5a'}
            >
              FAQ
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-400 group-hover:w-full"
                style={{
                  background: 'linear-gradient(to right, #d4af64, #b8955a)',
                  transitionDuration: '400ms',
                }}
              />
            </button>

            {/* ── Auth link ── */}
            {session ? (
              <button
                onClick={handleLogout}
                className="relative text-xs uppercase tracking-[3px] transition-all duration-300"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#4a3a2a',
                  fontFamily: 'Georgia, serif',
                  padding: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
                onMouseLeave={e => e.currentTarget.style.color = '#4a3a2a'}
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => handleNav('auth')}
                className="relative text-xs uppercase tracking-[3px] transition-all duration-300 group"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: currentPage === 'auth' ? '#d4af64' : '#7a6a5a',
                  fontFamily: 'Georgia, serif',
                  padding: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
                onMouseLeave={e => e.currentTarget.style.color = currentPage === 'auth' ? '#d4af64' : '#7a6a5a'}
              >
                Login
                <span
                  className="absolute -bottom-1 left-0 h-px transition-all duration-400 group-hover:w-full"
                  style={{
                    background: 'linear-gradient(to right, #d4af64, #b8955a)',
                    width: currentPage === 'auth' ? '100%' : '0%',
                    transitionDuration: '400ms',
                  }}
                />
              </button>
            )}
          </div>

          {/* ── DESKTOP RIGHT: COMPOSE CTA ── */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNav('quiz')}
              className="relative px-7 py-2.5 text-xs uppercase tracking-[3px] transition-all duration-400 overflow-hidden group"
              style={{
                border: '1px solid rgba(212,175,100,0.4)',
                color: ['quiz', 'checkout'].includes(currentPage) ? '#0c0a08' : '#d4af64',
                fontFamily: 'Georgia, serif',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                background: ['quiz', 'checkout'].includes(currentPage) ? 'linear-gradient(135deg, #c4a044, #d4af64)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0c0a08]">
                Compose Your Scent
              </span>
              {!['quiz', 'checkout'].includes(currentPage) && (
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #c4a044, #d4af64)' }}
                />
              )}
            </button>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden transition-colors duration-300"
            style={{ color: '#7a6a5a', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className="lg:hidden transition-all duration-500 overflow-hidden"
        style={{
          maxHeight: isMobileMenuOpen ? '500px' : '0px',
          background: 'rgba(12,10,8,0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(212,175,100,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8 space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNav(link.page)}
              className="block w-full text-left text-sm uppercase tracking-[4px] transition-colors duration-300 py-1"
              style={{
                color: currentPage === link.page ? '#d4af64' : '#7a6a5a',
                fontFamily: 'Georgia, serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {link.name}
            </button>
          ))}

          {/* Mobile FAQ scroll link */}
          <button
            onClick={handleFaqScroll}
            className="block w-full text-left text-sm uppercase tracking-[4px] transition-colors duration-300 py-1"
            style={{
              color: '#7a6a5a',
              fontFamily: 'Georgia, serif',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            FAQ
          </button>

          {/* Mobile auth */}
          {session ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-sm uppercase tracking-[4px] transition-colors duration-300 py-1"
              style={{
                color: '#4a3a2a',
                fontFamily: 'Georgia, serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => handleNav('auth')}
              className="block w-full text-left text-sm uppercase tracking-[4px] transition-colors duration-300 py-1"
              style={{
                color: currentPage === 'auth' ? '#d4af64' : '#7a6a5a',
                fontFamily: 'Georgia, serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          )}

          <div className="pt-4 border-t" style={{ borderColor: 'rgba(212,175,100,0.1)' }}>
            <button
              onClick={() => handleNav('quiz')}
              className="w-full py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
              style={{
                border: '1px solid rgba(212,175,100,0.3)',
                color: '#d4af64',
                fontFamily: 'Georgia, serif',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              Compose Your Scent
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;