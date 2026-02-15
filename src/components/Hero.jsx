import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      title: 'Craft Your',
      subtitle: 'Signature Scent',
      description: 'Design a fragrance as unique as your story',
      cta: 'Start Composing',
    },
    {
      title: 'Moments',
      subtitle: 'That Matter',
      description: 'Discover perfect scents for every occasion',
      cta: 'Explore Collections',
    },
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0c0a08' }}>

      {/* ── RICH LAYERED BACKGROUND ── */}
      <div className="absolute inset-0">
        {/* Base warm dark */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a1810 0%, #0c0a08 60%)' }} />
        {/* Champagne bloom top-right */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(212,175,100,0.12) 0%, transparent 60%)' }} />
        {/* Rose-gold bloom bottom-left */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ background: 'radial-gradient(ellipse at 20% 90%, rgba(180,120,80,0.08) 0%, transparent 60%)' }} />
        {/* Subtle center vignette glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,175,100,0.04) 0%, transparent 70%)' }} />
      </div>

      {/* ── DECORATIVE GEOMETRIC LINES ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="200" x2="600" y2="900" stroke="#d4af64" strokeWidth="1"/>
          <line x1="1440" y1="100" x2="900" y2="900" stroke="#d4af64" strokeWidth="1"/>
          <line x1="200" y1="0" x2="1200" y2="900" stroke="#d4af64" strokeWidth="0.5"/>
        </svg>
        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
            <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute top-8 right-8 opacity-20" style={{ transform: 'scaleX(-1)' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
            <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute bottom-8 left-8 opacity-20" style={{ transform: 'scaleY(-1)' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
            <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 opacity-20" style={{ transform: 'scale(-1)' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
            <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
          </svg>
        </div>
      </div>

      {/* ── FLOATING PERFUME BOTTLE (RIGHT SIDE, LARGE) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 300 500" className="w-64 xl:w-80" fill="none">
          <rect x="112" y="20" width="76" height="36" rx="10" fill="#d4af64"/>
          <rect x="120" y="56" width="60" height="24" rx="4" fill="#b8955a"/>
          <path d="M60 130 Q55 95 150 90 Q245 95 240 130 L255 400 Q258 450 150 452 Q42 450 45 400 Z" fill="#d4af64"/>
          <ellipse cx="150" cy="130" rx="90" ry="22" fill="#e8c97a"/>
          <rect x="82" y="220" width="136" height="150" rx="12" fill="rgba(12,10,8,0.4)"/>
          <text x="150" y="265" textAnchor="middle" fill="#d4af64" fontSize="14" fontFamily="serif" letterSpacing="4">MAISON</text>
          <line x1="95" y1="278" x2="205" y2="278" stroke="#d4af64" strokeWidth="0.8" opacity="0.5"/>
          <text x="150" y="305" textAnchor="middle" fill="#f5f0e8" fontSize="20" fontFamily="serif" letterSpacing="2">NOIR</text>
          <text x="150" y="340" textAnchor="middle" fill="#b8955a" fontSize="10" fontFamily="serif" letterSpacing="6">EAU DE PARFUM</text>
        </svg>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-32 w-full">
        <div className="max-w-3xl">

          {/* ── EYEBROW TAG ── */}
          <div className={`inline-flex items-center gap-3 mb-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #d4af64)' }} />
            <span className="text-xs uppercase tracking-[5px]" style={{ color: '#c4a55a', fontFamily: 'Georgia, serif' }}>
              Luxury Fragrance Atelier
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #d4af64)' }} />
          </div>

          {/* ── MAIN HEADING ── */}
          <div className="mb-8">
            <h1 className="font-light leading-none mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              <span
                className="block text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem]"
                style={{
                  background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 40%, #e8d5a3 70%, #f5f0e8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.8s ease',
                }}
              >
                {slides[currentSlide].title}
              </span>
              <span
                className="block text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem]"
                style={{
                  background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 50%, #b8955a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.8s ease',
                  marginTop: '-0.1em',
                }}
              >
                {slides[currentSlide].subtitle}
              </span>
            </h1>

            {/* Decorative line under heading */}
            <div className="flex items-center gap-4 mt-6 mb-8">
              <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, #d4af64, transparent)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4af64' }} />
            </div>

            <p
              className="text-lg lg:text-xl font-light tracking-wide max-w-xl"
              style={{ color: '#9a8a7a', fontFamily: 'Georgia, serif', lineHeight: '1.8', transition: 'all 0.8s ease' }}
            >
              {slides[currentSlide].description}
            </p>
          </div>

          {/* ── CTA BUTTONS ── */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
            <button
              className="group relative px-10 py-4 text-sm uppercase tracking-[3px] overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)',
                color: '#0c0a08',
                fontFamily: 'Georgia, serif',
                letterSpacing: '3px',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3 font-medium">
                {slides[currentSlide].cta}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #d4af64, #e8c97a, #c4a044)' }} />
            </button>

            <button
              className="group px-10 py-4 text-sm uppercase tracking-[3px] border transition-all duration-500"
              style={{
                borderColor: 'rgba(212,175,100,0.25)',
                color: '#c4a55a',
                fontFamily: 'Georgia, serif',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.5)'; e.currentTarget.style.background = 'rgba(212,175,100,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.25)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span className="flex items-center gap-3">
                View Collections
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* ── STATS ROW ── */}
          <div className="flex items-center gap-10">
            {[
              { num: '400+', label: 'Unique Ingredients' },
              { num: '12K+', label: 'Bespoke Creations' },
              { num: '4', label: 'Fragrance Archetypes' },
            ].map(({ num, label }, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-light" style={{ color: '#d4af64', fontFamily: 'Georgia, serif' }}>{num}</span>
                <span className="text-xs uppercase tracking-widest mt-0.5" style={{ color: '#5a4f45', fontFamily: 'Georgia, serif' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SLIDE INDICATORS ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="transition-all duration-500 rounded-none"
            style={{
              width: index === currentSlide ? '32px' : '6px',
              height: '2px',
              background: index === currentSlide ? '#d4af64' : 'rgba(212,175,100,0.25)',
            }}
          />
        ))}
      </div>

      {/* ── SCROLL HINT ── */}
      <div className="absolute right-10 bottom-10 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs uppercase tracking-[4px]" style={{ color: '#d4af64', writingMode: 'vertical-rl', fontFamily: 'Georgia, serif' }}>Scroll</span>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, #d4af64, transparent)' }} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0c0a08, transparent)' }} />
    </div>
  );
};

export default Hero;