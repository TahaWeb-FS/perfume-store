import { useState, useEffect, useRef } from 'react';

// ── ABOUT PAGE — MAISON NOIR ─────────────────────────────────────────────────

const pillars = [
  {
    number: '01',
    title: 'The Ingredients',
    text: 'We source from the world\'s most storied suppliers — Bulgarian rose fields, Grasse jasmine farms, aged Cambodian oud. Every raw material is selected by hand, chosen not just for quality but for character.',
    detail: '400+ Unique Ingredients',
  },
  {
    number: '02',
    title: 'The Craft',
    text: 'Our perfumers trained in the classical French tradition, apprenticed for over a decade before composing under the Maison Noir name. Each fragrance undergoes a minimum of 18 months of development before release.',
    detail: '18+ Months Per Creation',
  },
  {
    number: '03',
    title: 'The Bespoke',
    text: 'No two people smell the same. Our Composer allows you to collaborate with our in-house nose, iterating through accords until the result is unmistakably yours — then bottled, sealed, and archived.',
    detail: '12,000+ Bespoke Creations',
  },
];

const timeline = [
  { year: '1998', event: 'Founded in Paris by master perfumer Éléonore Vidal in a single atelier room on Rue du Faubourg.' },
  { year: '2004', event: 'First bespoke commission for a private client — the beginning of our custom fragrance programme.' },
  { year: '2011', event: 'Awarded the Grand Prix de la Création by the French Perfumers\' Guild.' },
  { year: '2017', event: 'Launched the Composer — bringing bespoke fragrance creation online for the first time.' },
  { year: '2023', event: 'Expanded to a global atelier network, with consultation rooms in Paris, Dubai, and Tokyo.' },
];

const AboutPage = () => {
  const [mounted, setMounted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observers = Object.entries(sectionRefs.current).map(([key, el]) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, key]));
          }
        },
        { threshold: 0.12 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [mounted]);

  const ref = (key) => (el) => { sectionRefs.current[key] = el; };
  const isVisible = (key) => visibleSections.has(key);

  return (
    <div style={{ minHeight: '100vh', background: '#0c0a08', fontFamily: 'Georgia, "Times New Roman", serif', color: '#e8dfd0' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Layered backgrounds */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a1810 0%, #0c0a08 60%)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', background: 'radial-gradient(ellipse at 80% 20%, rgba(212,175,100,0.09) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '60%', background: 'radial-gradient(ellipse at 10% 90%, rgba(180,120,80,0.06) 0%, transparent 60%)' }} />

        {/* Diagonal lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035, pointerEvents: 'none' }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="200" x2="600" y2="900" stroke="#d4af64" strokeWidth="1"/>
          <line x1="1440" y1="100" x2="900" y2="900" stroke="#d4af64" strokeWidth="1"/>
        </svg>

        {/* Corner ornaments */}
        {[
          { style: { top: '2rem', left: '2.5rem' }, flip: '' },
          { style: { top: '2rem', right: '2.5rem' }, flip: 'scaleX(-1)' },
          { style: { bottom: '2rem', left: '2.5rem' }, flip: 'scaleY(-1)' },
          { style: { bottom: '2rem', right: '2.5rem' }, flip: 'scale(-1)' },
        ].map(({ style, flip }, i) => (
          <div key={i} style={{ position: 'absolute', opacity: 0.2, transform: flip || undefined, ...style }}>
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
              <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
            </svg>
          </div>
        ))}

        {/* Large ghost monogram */}
        <div style={{ position: 'absolute', right: '-4rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.025, userSelect: 'none', pointerEvents: 'none' }}>
          <span style={{ fontSize: 'clamp(16rem, 25vw, 28rem)', fontWeight: 300, letterSpacing: '-0.05em', color: '#d4af64', lineHeight: 1 }}>MN</span>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '10rem 2.5rem 8rem', width: '100%' }}>
          <div style={{ maxWidth: '680px' }}>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.9s ease',
            }}>
              <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to right, transparent, #d4af64)' }} />
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '5px', color: '#c4a55a' }}>Our Story</span>
              <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to left, transparent, #d4af64)' }} />
            </div>

            {/* Headline */}
            <h1 style={{
              fontWeight: 300, lineHeight: 1, marginBottom: '2rem',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 1s ease 0.15s',
            }}>
              <span style={{
                display: 'block', fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 40%, #e8d5a3 70%, #f5f0e8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Scent Is
              </span>
              <span style={{
                display: 'block', fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', marginTop: '-0.08em',
                background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 50%, #b8955a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Memory
              </span>
            </h1>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ height: '1px', width: '10rem', background: 'linear-gradient(to right, #d4af64, transparent)' }} />
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af64', opacity: 0.6 }} />
            </div>

            <p style={{
              fontSize: '1.05rem', lineHeight: 2, color: '#9a8a7a', fontWeight: 300, maxWidth: '540px',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 1s ease 0.3s',
            }}>
              Founded in Paris in 1998, Maison Noir was born from a single belief: that fragrance is not merely worn — it is lived. Every bottle we create carries the weight of a memory not yet made.
            </p>

            {/* Founder signature line */}
            <div style={{
              marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 1s ease 0.45s',
            }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(212,175,100,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1rem', color: '#d4af64', opacity: 0.7 }}>ÉV</span>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#c4a55a', letterSpacing: '2px', marginBottom: '0.15rem' }}>Éléonore Vidal</p>
                <p style={{ fontSize: '0.62rem', color: '#5a4f45', letterSpacing: '3px', textTransform: 'uppercase' }}>Founder & Master Perfumer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '10rem', background: 'linear-gradient(to top, #0c0a08, transparent)', pointerEvents: 'none' }} />
      </section>

      {/* ── PHILOSOPHY QUOTE ─────────────────────────────────────────────── */}
      <section
        ref={ref('quote')}
        style={{
          padding: '8rem 2.5rem',
          borderTop: '1px solid rgba(212,175,100,0.08)',
          borderBottom: '1px solid rgba(212,175,100,0.08)',
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible('quote') ? 1 : 0,
          transform: isVisible('quote') ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s ease',
        }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,100,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '4rem', color: '#d4af64', opacity: 0.2, lineHeight: 0.8, marginBottom: '1.5rem', fontFamily: 'Georgia, serif' }}>"</div>
          <blockquote style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 300, lineHeight: 1.7, color: '#d4c4a8', letterSpacing: '0.5px', marginBottom: '2.5rem' }}>
            A fragrance should not announce itself. It should be discovered — slowly, the way one discovers a person worth knowing.
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ height: '1px', width: '3rem', background: 'linear-gradient(to right, transparent, rgba(212,175,100,0.4))' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#7a6a5a' }}>Éléonore Vidal, 1998</span>
            <div style={{ height: '1px', width: '3rem', background: 'linear-gradient(to left, transparent, rgba(212,175,100,0.4))' }} />
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────────────────────────── */}
      <section style={{ padding: '8rem 2.5rem', maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section label */}
        <div
          ref={ref('pillars-label')}
          style={{
            marginBottom: '5rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
            opacity: isVisible('pillars-label') ? 1 : 0, transform: isVisible('pillars-label') ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to right, transparent, #d4af64)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#c4a55a' }}>What We Believe</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(212,175,100,0.2), transparent)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
          {pillars.map(({ number, title, text, detail }, i) => (
            <div
              key={number}
              ref={ref(`pillar-${i}`)}
              style={{
                padding: '3rem 2.5rem',
                border: '1px solid rgba(212,175,100,0.1)',
                background: 'rgba(212,175,100,0.01)',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible(`pillar-${i}`) ? 1 : 0,
                transform: isVisible(`pillar-${i}`) ? 'translateY(0)' : 'translateY(32px)',
                transition: `all 0.8s ease ${i * 0.15}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(212,175,100,0.04)';
                e.currentTarget.style.borderColor = 'rgba(212,175,100,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(212,175,100,0.01)';
                e.currentTarget.style.borderColor = 'rgba(212,175,100,0.1)';
              }}
            >
              {/* Large number ghost */}
              <div style={{ position: 'absolute', top: '-1rem', right: '1.5rem', fontSize: '8rem', fontWeight: 300, color: '#d4af64', opacity: 0.04, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{number}</div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#d4af64', opacity: 0.6 }}>{number}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 300, color: '#f5f0e8', margin: '0.75rem 0 1.25rem', letterSpacing: '0.5px' }}>{title}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.95, color: '#7a6a5a', marginBottom: '2rem' }}>{text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ height: '1px', width: '1.5rem', background: 'linear-gradient(to right, #d4af64, transparent)' }} />
                  <span style={{ fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#c4a55a', opacity: 0.7 }}>{detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '6rem 2.5rem 8rem',
          borderTop: '1px solid rgba(212,175,100,0.08)',
          background: 'linear-gradient(180deg, #0c0a08 0%, #110e09 50%, #0c0a08 100%)',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Label */}
          <div
            ref={ref('timeline-label')}
            style={{
              marginBottom: '5rem', textAlign: 'center',
              opacity: isVisible('timeline-label') ? 1 : 0, transform: isVisible('timeline-label') ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s ease',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to right, transparent, #d4af64)' }} />
              <span style={{ fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#c4a55a' }}>Our History</span>
              <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to left, transparent, #d4af64)' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#f5f0e8', letterSpacing: '1px' }}>A Quarter Century</h2>
          </div>

          {/* Timeline items */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '5.5rem', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,100,0.2), rgba(212,175,100,0.15), transparent)' }} />

            {timeline.map(({ year, event }, i) => (
              <div
                key={year}
                ref={ref(`tl-${i}`)}
                style={{
                  display: 'flex', gap: '2.5rem', marginBottom: '3rem', alignItems: 'flex-start',
                  opacity: isVisible(`tl-${i}`) ? 1 : 0, transform: isVisible(`tl-${i}`) ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.7s ease ${i * 0.1}s`,
                }}
              >
                {/* Year */}
                <div style={{ width: '4rem', flexShrink: 0, textAlign: 'right', paddingTop: '0.2rem' }}>
                  <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#d4af64', opacity: 0.7, fontFamily: 'Georgia, serif' }}>{year}</span>
                </div>
                {/* Dot */}
                <div style={{ position: 'relative', flexShrink: 0, width: '3rem', display: 'flex', justifyContent: 'center', paddingTop: '0.35rem' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d4af64', opacity: 0.5, flexShrink: 0 }} />
                </div>
                {/* Text */}
                <p style={{ fontSize: '0.9rem', lineHeight: 1.85, color: '#7a6a5a', paddingTop: '0.1rem', flex: 1 }}>{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATELIER CTA ───────────────────────────────────────────────────── */}
      <section
        ref={ref('cta')}
        style={{
          padding: '8rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(212,175,100,0.08)',
          opacity: isVisible('cta') ? 1 : 0,
          transform: isVisible('cta') ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s ease',
        }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(42,24,16,0.8) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to right, transparent, #d4af64)' }} />
            <span style={{ fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#c4a55a' }}>Begin Here</span>
            <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to left, transparent, #d4af64)' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.15 }}>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 50%, #e8d5a3 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Your Signature Scent
            </span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 50%, #b8955a 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Awaits
            </span>
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ height: '1px', width: '6rem', background: 'linear-gradient(to right, transparent, rgba(212,175,100,0.4))' }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d4af64', opacity: 0.5 }} />
            <div style={{ height: '1px', width: '6rem', background: 'linear-gradient(to left, transparent, rgba(212,175,100,0.4))' }} />
          </div>

          <p style={{ fontSize: '0.95rem', lineHeight: 1.95, color: '#7a6a5a', marginBottom: '3rem', maxWidth: '480px', margin: '0 auto 3rem' }}>
            Work with our perfumers to compose a fragrance built entirely around who you are — and who you want to be remembered as.
          </p>

          <button
            style={{
              padding: '1rem 3rem',
              fontSize: '0.72rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)',
              color: '#0c0a08',
              border: 'none',
              cursor: 'pointer',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Enter the Composer
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(212,175,100,0.08)', padding: '3rem 2.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.9rem', letterSpacing: '5px', color: 'rgba(212,175,100,0.35)', textTransform: 'uppercase', fontWeight: 300 }}>Maison Noir</span>
          <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#4a3f35', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} Maison Noir — All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;