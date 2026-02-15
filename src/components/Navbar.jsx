import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', href: '#collections' },
    { name: 'Occasions', href: '#occasions' },
    { name: 'Compose', href: '#compose' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: isScrolled
          ? 'rgba(12, 10, 8, 0.96)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(212,175,100,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between" style={{ height: isScrolled ? '72px' : '88px', transition: 'height 0.5s ease' }}>

          {/* ── LOGO ── */}
          <a href="/" className="group flex items-center gap-3">
            {/* Monogram circle */}
            <div
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid rgba(212,175,100,0.4)',
                borderRadius: '50%',
              }}
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
                MN
              </span>
              {/* Rotating ring on hover */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(212,175,100,0.6)' }}
              />
            </div>
            <div>
              <span
                className="text-xl lg:text-2xl font-light tracking-[6px] uppercase transition-all duration-300"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #f5f0e8, #d4af64)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ESSENCE
              </span>
            </div>
          </a>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-xs uppercase tracking-[3px] transition-all duration-300 group"
                style={{ color: '#7a6a5a', fontFamily: 'Georgia, serif' }}
                onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
                onMouseLeave={e => e.currentTarget.style.color = '#7a6a5a'}
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
                  style={{ background: 'linear-gradient(to right, #d4af64, #b8955a)', transitionDuration: '400ms' }}
                />
              </a>
            ))}
          </div>

          {/* ── DESKTOP RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search */}
            <button
              className="transition-colors duration-300"
              style={{ color: '#5a4f45' }}
              onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a4f45'}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              className="relative transition-colors duration-300"
              style={{ color: '#5a4f45' }}
              onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a4f45'}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-medium flex items-center justify-center"
                style={{ background: '#d4af64', color: '#0c0a08' }}
              >
                0
              </span>
            </button>

            {/* Divider */}
            <div className="h-4 w-px" style={{ background: 'rgba(212,175,100,0.2)' }} />

            {/* CTA */}
            <button
              className="relative px-7 py-2.5 text-xs uppercase tracking-[3px] transition-all duration-400 overflow-hidden group"
              style={{
                border: '1px solid rgba(212,175,100,0.4)',
                color: '#d4af64',
                fontFamily: 'Georgia, serif',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
              }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0c0a08]">Create Your Scent</span>
              <div
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, #c4a044, #d4af64)' }}
              />
            </button>
          </div>

          {/* ── MOBILE MENU BUTTON ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden transition-colors duration-300"
            style={{ color: '#7a6a5a' }}
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
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[4px] transition-colors duration-300 py-1"
              style={{ color: '#7a6a5a', fontFamily: 'Georgia, serif' }}
              onMouseEnter={e => e.currentTarget.style.color = '#d4af64'}
              onMouseLeave={e => e.currentTarget.style.color = '#7a6a5a'}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 space-y-4 border-t" style={{ borderColor: 'rgba(212,175,100,0.1)' }}>
            <button
              className="w-full py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
              style={{
                border: '1px solid rgba(212,175,100,0.3)',
                color: '#d4af64',
                fontFamily: 'Georgia, serif',
              }}
            >
              Create Your Scent
            </button>
            <div className="flex items-center justify-center gap-8 pt-2">
              <button style={{ color: '#5a4f45' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="relative" style={{ color: '#5a4f45' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center" style={{ background: '#d4af64', color: '#0c0a08' }}>0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;