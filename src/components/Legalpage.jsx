import { useState, useEffect, useRef } from 'react';

// ── LEGAL PAGE — MAISON NOIR ──────────────────────────────────────────────────

const sections = [
  {
    id: 'copyright',
    number: 'I',
    title: 'Copyright & Intellectual Property',
    content: [
      {
        subtitle: 'Ownership',
        text: `All content on this website — including but not limited to text, imagery, fragrance compositions, formulations, brand identity, graphics, logos, icons, and software — is the exclusive property of Maison Noir and is protected under international copyright law. © ${new Date().getFullYear()} Maison Noir. All rights reserved.`,
      },
      {
        subtitle: 'Fragrance Formulations',
        text: `Our scent compositions, ingredient combinations, and bespoke formulas constitute proprietary trade secrets. Reproduction, reverse engineering, or commercial imitation of any Maison Noir fragrance — in whole or in part — is strictly prohibited and will be pursued to the fullest extent of applicable law.`,
      },
      {
        subtitle: 'Permitted Use',
        text: `Personal, non-commercial use of website content is permitted provided all copyright notices remain intact. Any reproduction for commercial purposes, redistribution, or derivative works require prior written consent from Maison Noir.`,
      },
    ],
  },
  {
    id: 'trademarks',
    number: 'II',
    title: 'Trademarks & Brand Identity',
    content: [
      {
        subtitle: 'Registered Marks',
        text: `"Maison Noir," the bottle silhouette device, and all associated wordmarks, trade dress, and visual identity elements are registered or pending trademarks. Unauthorized use of these marks in connection with any product, service, or commercial activity constitutes infringement.`,
      },
      {
        subtitle: 'Brand Guidelines',
        text: `Third parties may not use Maison Noir branding in press, editorial, or affiliate contexts without a current, signed brand usage agreement. Media enquiries should be directed to our press office prior to publication.`,
      },
    ],
  },
  {
    id: 'privacy',
    number: 'III',
    title: 'Privacy & Data Protection',
    content: [
      {
        subtitle: 'Data We Collect',
        text: `When you interact with our Fragrance Composer, quiz, or checkout, we collect information you voluntarily provide: name, contact details, scent preferences, and purchase history. We also collect anonymised analytics data to improve your experience.`,
      },
      {
        subtitle: 'How We Use Your Data',
        text: `Your personal data is used solely to fulfil orders, personalise recommendations, and communicate relevant updates. We do not sell, rent, or trade your data to third parties. Fragrance preference profiles created through our quiz are stored securely and linked only to your account.`,
      },
      {
        subtitle: 'Your Rights',
        text: `Under GDPR and applicable data protection legislation, you have the right to access, rectify, erase, or port your personal data at any time. To exercise these rights, contact us at privacy@maisonnoir.com. We will respond within 30 days.`,
      },
      {
        subtitle: 'Cookies',
        text: `We use essential cookies for site function, and optional analytics cookies to understand how visitors engage with our atelier. You may withdraw consent for non-essential cookies at any time via your browser settings or our cookie preference centre.`,
      },
    ],
  },
  {
    id: 'terms',
    number: 'IV',
    title: 'Terms of Use',
    content: [
      {
        subtitle: 'Acceptance',
        text: `By accessing this website, you agree to be bound by these terms. If you do not agree, please discontinue use immediately. We reserve the right to amend these terms at our discretion, with changes effective upon publication.`,
      },
      {
        subtitle: 'Prohibited Conduct',
        text: `You may not use this website to distribute malware, engage in scraping or automated access, impersonate Maison Noir or its representatives, or conduct any activity that disrupts our services or infringes on the rights of others.`,
      },
      {
        subtitle: 'Bespoke Orders',
        text: `Custom fragrance compositions created through our Composer are unique to each client. Once a bespoke formulation has been approved and produced, cancellations are not accepted. All sales of personalised fragrances are final.`,
      },
      {
        subtitle: 'Limitation of Liability',
        text: `Maison Noir shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our products, beyond the value of the original transaction. This limitation applies to the fullest extent permitted by law.`,
      },
    ],
  },
  {
    id: 'returns',
    number: 'V',
    title: 'Returns & Satisfaction',
    content: [
      {
        subtitle: 'Standard Collections',
        text: `Unopened items from our standard collections may be returned within 30 days of delivery for a full refund, provided they are in original, undamaged packaging. Return shipping costs are the responsibility of the customer unless the item is defective.`,
      },
      {
        subtitle: 'Bespoke Creations',
        text: `Due to their personalised nature, bespoke and custom-blended fragrances are non-returnable and non-refundable once produced. We encourage all clients to engage fully with our consultation process before confirming a bespoke order.`,
      },
    ],
  },
  {
    id: 'governing',
    number: 'VI',
    title: 'Governing Law & Disputes',
    content: [
      {
        subtitle: 'Jurisdiction',
        text: `These terms are governed by and construed in accordance with the laws of France, without regard to conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of Paris.`,
      },
      {
        subtitle: 'Resolution',
        text: `We encourage resolution of any disputes through direct communication before formal proceedings. Please contact us at legal@maisonnoir.com. We are committed to a fair and timely response.`,
      },
    ],
  },
];

const LegalPage = () => {
  const [activeSection, setActiveSection] = useState('copyright');
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection observer to update active nav on scroll
  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [mounted]);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0c0a08',
        fontFamily: 'Georgia, "Times New Roman", serif',
        color: '#e8dfd0',
      }}
    >
      {/* ── HERO BANNER ────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '10rem 2.5rem 6rem',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(212,175,100,0.08)',
        }}
      >
        {/* Background radial glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 0%, #2a1810 0%, #0c0a08 70%)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse at 80% 20%, rgba(212,175,100,0.07) 0%, transparent 60%)' }} />

        {/* Corner ornament */}
        <div style={{ position: 'absolute', top: '2rem', left: '2.5rem', opacity: 0.2 }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
            <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '2rem', right: '2.5rem', opacity: 0.2, transform: 'scaleX(-1)' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M2 2 L2 30 M2 2 L30 2" stroke="#d4af64" strokeWidth="0.8"/>
            <circle cx="2" cy="2" r="2" fill="#d4af64" opacity="0.6"/>
          </svg>
        </div>

        {/* Diagonal faint lines */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03, pointerEvents: 'none' }}
          viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="100" x2="500" y2="400" stroke="#d4af64" strokeWidth="1"/>
          <line x1="1440" y1="50" x2="950" y2="400" stroke="#d4af64" strokeWidth="1"/>
        </svg>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2rem',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.9s ease',
            }}
          >
            <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to right, transparent, #d4af64)' }} />
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '5px', color: '#c4a55a' }}>
              Legal Information
            </span>
            <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to left, transparent, #d4af64)' }} />
          </div>

          {/* Main title */}
          <h1
            style={{
              fontWeight: 300,
              lineHeight: 1,
              marginBottom: '1.5rem',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 1s ease 0.15s',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 40%, #e8d5a3 70%, #f5f0e8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Protecting
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 50%, #b8955a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginTop: '-0.08em',
              }}
            >
              Our Craft
            </span>
          </h1>

          {/* Decorative divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ height: '1px', width: '12rem', background: 'linear-gradient(to right, #d4af64, transparent)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af64', opacity: 0.6 }} />
          </div>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.9,
              color: '#9a8a7a',
              maxWidth: '560px',
              fontWeight: 300,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 1s ease 0.3s',
            }}
          >
            The artistry, formulations, and identity of Maison Noir are protected by law and by our commitment to excellence. These documents outline your rights and ours.
          </p>

          {/* Last updated */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '2.5rem',
              padding: '0.6rem 1.2rem',
              border: '1px solid rgba(212,175,100,0.15)',
              background: 'rgba(212,175,100,0.03)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4af64" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span style={{ fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(212,175,100,0.5)' }}>
              Last revised: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </section>

      {/* ── BODY: SIDEBAR + CONTENT ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2.5rem', display: 'flex', gap: '5rem', alignItems: 'flex-start' }}>

        {/* ── LEFT NAV (sticky) ─────────── */}
        <aside
          style={{
            position: 'sticky',
            top: '6rem',
            width: '220px',
            flexShrink: 0,
            paddingTop: '5rem',
            paddingBottom: '5rem',
          }}
        >
          <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#5a4f45', marginBottom: '1.5rem' }}>
            Contents
          </p>
          <nav>
            {sections.map(({ id, number, title }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.75rem',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.65rem 0',
                  borderLeft: `2px solid ${activeSection === id ? '#d4af64' : 'rgba(212,175,100,0.12)'}`,
                  paddingLeft: '1rem',
                  marginBottom: '0.25rem',
                  transition: 'all 0.35s ease',
                }}
              >
                <span style={{ fontSize: '0.6rem', color: activeSection === id ? '#d4af64' : '#5a4f45', letterSpacing: '2px', fontFamily: 'Georgia, serif' }}>
                  {number}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: activeSection === id ? '#d4af64' : '#7a6a5a',
                    fontFamily: 'Georgia, serif',
                    lineHeight: 1.4,
                    transition: 'color 0.35s ease',
                  }}
                >
                  {title}
                </span>
              </button>
            ))}
          </nav>

          {/* Copyright badge */}
          <div
            style={{
              marginTop: '3rem',
              padding: '1.25rem',
              border: '1px solid rgba(212,175,100,0.12)',
              background: 'rgba(212,175,100,0.02)',
            }}
          >
            <div style={{ fontSize: '1.5rem', color: '#d4af64', opacity: 0.4, marginBottom: '0.5rem', lineHeight: 1 }}>©</div>
            <p style={{ fontSize: '0.62rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5a4f45', lineHeight: 1.7 }}>
              {new Date().getFullYear()} Maison Noir<br/>All rights reserved
            </p>
          </div>
        </aside>

        {/* ── MAIN CONTENT ─────────────────── */}
        <main style={{ flex: 1, paddingTop: '5rem', paddingBottom: '8rem', minWidth: 0 }}>
          {sections.map(({ id, number, title, content }, sIdx) => (
            <section
              key={id}
              ref={el => (sectionRefs.current[id] = el)}
              style={{
                marginBottom: sIdx < sections.length - 1 ? '6rem' : 0,
                scrollMarginTop: '8rem',
              }}
            >
              {/* Section header */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
                  {/* Roman numeral + line */}
                  <span
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '4px',
                      color: '#d4af64',
                      opacity: 0.6,
                      fontFamily: 'Georgia, serif',
                      textTransform: 'uppercase',
                    }}
                  >
                    {number}
                  </span>
                  <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(212,175,100,0.3), transparent)' }} />
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 300,
                    letterSpacing: '1px',
                    color: '#f5f0e8',
                    marginBottom: '0.25rem',
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h2>
              </div>

              {/* Content blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {content.map(({ subtitle, text }, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      paddingLeft: '1.75rem',
                      borderLeft: '1px solid rgba(212,175,100,0.12)',
                      position: 'relative',
                    }}
                  >
                    {/* Gold dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-3px',
                        top: '0.5rem',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#d4af64',
                        opacity: 0.5,
                      }}
                    />
                    <h3
                      style={{
                        fontSize: '0.72rem',
                        letterSpacing: '3.5px',
                        textTransform: 'uppercase',
                        color: '#c4a55a',
                        marginBottom: '0.75rem',
                        fontWeight: 400,
                      }}
                    >
                      {subtitle}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        lineHeight: 2,
                        color: '#8a7a6a',
                        fontWeight: 300,
                        letterSpacing: '0.3px',
                      }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Section divider (not after last) */}
              {sIdx < sections.length - 1 && (
                <div
                  style={{
                    marginTop: '5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,100,0.08)' }} />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="5.5" y="0.5" width="5" height="5" transform="rotate(45 5.5 5.5)" stroke="#d4af64" strokeWidth="0.6" opacity="0.35"/>
                  </svg>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,100,0.08)' }} />
                </div>
              )}
            </section>
          ))}

          {/* ── CONTACT FOOTER CARD ── */}
          <div
            style={{
              marginTop: '5rem',
              padding: '3rem',
              border: '1px solid rgba(212,175,100,0.15)',
              background: 'linear-gradient(135deg, rgba(42,24,16,0.6) 0%, rgba(12,10,8,0.8) 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner ornaments */}
            {[
              { top: '1rem', left: '1rem', transform: 'none' },
              { top: '1rem', right: '1rem', transform: 'scaleX(-1)' },
              { bottom: '1rem', left: '1rem', transform: 'scaleY(-1)' },
              { bottom: '1rem', right: '1rem', transform: 'scale(-1)' },
            ].map((style, i) => (
              <div key={i} style={{ position: 'absolute', opacity: 0.25, ...style }}>
                <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
                  <path d="M2 2 L2 20 M2 2 L20 2" stroke="#d4af64" strokeWidth="1"/>
                </svg>
              </div>
            ))}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ height: '1px', width: '1.5rem', background: 'linear-gradient(to right, transparent, #d4af64)' }} />
                <span style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#c4a55a' }}>
                  Legal Enquiries
                </span>
              </div>
              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 300,
                  color: '#f5f0e8',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                Questions About These Terms?
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#7a6a5a', lineHeight: 1.9, maxWidth: '520px', marginBottom: '2rem' }}>
                Our legal team is happy to clarify anything within these documents. Please allow up to 5 business days for a response.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Legal', email: 'legal@maisonnoir.com' },
                  { label: 'Privacy', email: 'privacy@maisonnoir.com' },
                  { label: 'Press', email: 'press@maisonnoir.com' },
                ].map(({ label, email }) => (
                  <a
                    key={label}
                    href={`mailto:${email}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      textDecoration: 'none',
                      padding: '0.85rem 1.25rem',
                      border: '1px solid rgba(212,175,100,0.15)',
                      background: 'rgba(212,175,100,0.03)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(212,175,100,0.4)';
                      e.currentTarget.style.background = 'rgba(212,175,100,0.07)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(212,175,100,0.15)';
                      e.currentTarget.style.background = 'rgba(212,175,100,0.03)';
                    }}
                  >
                    <span style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#d4af64', opacity: 0.6 }}>{label}</span>
                    <span style={{ fontSize: '0.78rem', color: '#c4a55a', letterSpacing: '0.5px' }}>{email}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default LegalPage;