import { useState } from 'react';

const serif = 'Georgia, serif';
const gold = '#d4af64';
const textMuted = '#6a5a4a';
const textDim = '#4a3f35';
const textLight = '#e8d5a3';

const channels = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    label: 'Electronic Mail',
    value: 'contact@noeme.com',
    sub: 'Response within 24 hours',
    href: 'mailto:contact@noeme.com',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
    label: 'Atelier Line',
    value: '+212 6 45 76 89 01',
    sub: 'Mon–Fri, 10h–18h ',
    href: 'tel:+18000000000',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    label: 'NOEME',
    value: 'Agadir, Maroc',
    sub: '',
    href: null,
  },
];

const InputField = ({ label, type = 'text', value, onChange, error, placeholder, as: As = 'input', rows }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label style={{ fontFamily: serif, fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a4f45' }}>
      {label}
    </label>
    <As
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${error ? 'rgba(200,80,80,0.5)' : 'rgba(212,175,100,0.12)'}`,
        padding: '14px 16px',
        color: '#c4b090',
        fontFamily: serif,
        fontSize: '13px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
        resize: As === 'textarea' ? 'none' : undefined,
        letterSpacing: '0.3px',
        lineHeight: As === 'textarea' ? 1.8 : undefined,
      }}
      onFocus={e => { if (!error) e.target.style.borderColor = 'rgba(212,175,100,0.45)'; }}
      onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(212,175,100,0.12)'; }}
    />
    {error && (
      <span style={{ fontFamily: serif, fontSize: '0.6rem', color: 'rgba(200,100,100,0.9)', letterSpacing: '0.5px' }}>{error}</span>
    )}
  </div>
);

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Your name is required';
    if (!email.trim()) e.email = 'Your email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address';
    if (!subject.trim()) e.subject = 'Please specify a subject';
    if (!message.trim()) e.message = 'A message is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1600);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0c0a08', paddingTop: '100px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>

      {/* ── Atmospheric background ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 15% 30%, rgba(212,175,100,0.05) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 85% 75%, rgba(180,140,80,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(212,175,100,0.03) 1px, transparent 1px)', backgroundSize: '56px 56px', pointerEvents: 'none' }} />

      {/* Vertical rule lines */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '8%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,100,0.06) 20%, rgba(212,175,100,0.06) 80%, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: '8%', width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,100,0.06) 20%, rgba(212,175,100,0.06) 80%, transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', flex: 1, maxWidth: '60px', background: `linear-gradient(to right, transparent, ${gold}50)` }} />
            <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#c4a55a', margin: 0 }}>
              Noeme · Maison de Parfum
            </p>
            <div style={{ height: '1px', flex: 1, maxWidth: '60px', background: `linear-gradient(to left, transparent, ${gold}50)` }} />
          </div>

          <h1 style={{ fontFamily: serif, fontWeight: 300, margin: '0 0 1.5rem', lineHeight: 1.05 }}>
            <span style={{ display: 'block', fontSize: 'clamp(3rem, 8vw, 6.5rem)', background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 40%, #e8d5a3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Speak
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(3rem, 8vw, 6.5rem)', background: 'linear-gradient(135deg, #b8955a 0%, #f5f0e8 50%, #d4af64 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginLeft: 'clamp(2rem, 6vw, 6rem)' }}>
              With Us
            </span>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'clamp(2rem, 6vw, 6rem)' }}>
            <div style={{ width: '40px', height: '1px', background: `linear-gradient(to right, transparent, ${gold}60)` }} />
            <p style={{ fontFamily: serif, fontSize: '0.9rem', color: textMuted, margin: 0, lineHeight: 1.8, maxWidth: '420px', letterSpacing: '0.3px' }}>
              Every question, every desire — heard with care. Our atelier is at your service.
            </p>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}>

          {/* ── LEFT: CHANNELS ── */}
          <div>
            <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '5px', textTransform: 'uppercase', color: textDim, marginBottom: '2.5rem' }}>
              Direct Lines
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {channels.map((ch, i) => (
                <a
                  key={i}
                  href={ch.href || undefined}
                  onClick={!ch.href ? e => e.preventDefault() : undefined}
                  style={{ textDecoration: 'none', display: 'block' }}
                  onMouseEnter={() => setActiveChannel(i)}
                  onMouseLeave={() => setActiveChannel(null)}
                >
                  <div style={{
                    padding: '1.5rem 1.25rem',
                    borderTop: i === 0 ? '1px solid rgba(212,175,100,0.08)' : 'none',
                    borderBottom: '1px solid rgba(212,175,100,0.08)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    transition: 'background 0.3s ease',
                    background: activeChannel === i ? 'rgba(212,175,100,0.03)' : 'transparent',
                    cursor: ch.href ? 'pointer' : 'default',
                  }}>
                    {/* Icon */}
                    <div style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      border: `1px solid ${activeChannel === i ? 'rgba(212,175,100,0.3)' : 'rgba(212,175,100,0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.3s, color 0.3s',
                      color: activeChannel === i ? gold : '#4a3f35',
                    }}>
                      {ch.icon}
                    </div>

                    <div>
                      <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: activeChannel === i ? '#c4a55a' : textDim, margin: '0 0 0.3rem', transition: 'color 0.3s' }}>
                        {ch.label}
                      </p>
                      <p style={{ fontFamily: serif, fontSize: '0.9rem', color: activeChannel === i ? textLight : '#8a7a6a', margin: '0 0 0.2rem', letterSpacing: '0.5px', transition: 'color 0.3s' }}>
                        {ch.value}
                      </p>
                      <p style={{ fontFamily: serif, fontSize: '0.65rem', color: textDim, margin: 0, fontStyle: 'italic', letterSpacing: '0.3px' }}>
                        {ch.sub}
                      </p>
                    </div>

                    {/* Arrow */}
                    {ch.href && (
                      <div style={{ marginLeft: 'auto', color: activeChannel === i ? gold : 'transparent', transition: 'color 0.3s', alignSelf: 'center' }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Hours note */}
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(212,175,100,0.03)', border: '1px solid rgba(212,175,100,0.08)' }}>
              <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase', color: textDim, margin: '0 0 0.75rem' }}>
                Atelier Hours
              </p>
              {[
                ['Monday – Friday', '10:00 – 18:00'],
                ['Saturday', '11:00 – 16:00'],
                ['Sunday', 'Closed'],
              ].map(([day, hours], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < 2 ? '0.4rem' : 0 }}>
                  <span style={{ fontFamily: serif, fontSize: '0.72rem', color: textMuted }}>{day}</span>
                  <span style={{ fontFamily: serif, fontSize: '0.72rem', color: hours === 'Closed' ? '#3a2f25' : '#8a7a6a', fontStyle: hours === 'Closed' ? 'italic' : 'normal' }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div>
            <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '5px', textTransform: 'uppercase', color: textDim, marginBottom: '2.5rem' }}>
              Send a Message
            </p>

            {sent ? (
              /* Success state */
              <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px solid rgba(212,175,100,0.15)', background: 'rgba(212,175,100,0.02)' }}>
                <div style={{ width: '56px', height: '56px', border: '1px solid rgba(212,175,100,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="1.2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p style={{ fontFamily: serif, fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#c4a55a', margin: '0 0 0.75rem' }}>
                  Received
                </p>
                <h3 style={{ fontFamily: serif, fontWeight: 300, fontSize: '1.5rem', color: textLight, margin: '0 0 1rem' }}>
                  Your message is with us.
                </h3>
                <p style={{ fontFamily: serif, fontSize: '0.8rem', color: textMuted, lineHeight: 1.9, maxWidth: '340px', margin: '0 auto' }}>
                  We will respond with care within 24 hours. Thank you for reaching out to Noeme.
                </p>
                <div style={{ marginTop: '2rem', height: '1px', width: '60px', background: `linear-gradient(to right, transparent, ${gold}50, transparent)`, margin: '2rem auto 0' }} />
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <InputField
                    label="Full Name"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })); }}
                    error={errors.name}
                    placeholder="Your name"
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                    error={errors.email}
                    placeholder="your@email.com"
                  />
                </div>

                <InputField
                  label="Subject"
                  value={subject}
                  onChange={e => { setSubject(e.target.value); setErrors(p => ({ ...p, subject: '' })); }}
                  error={errors.subject}
                  placeholder="How can we help you?"
                />

                <InputField
                  label="Message"
                  as="textarea"
                  value={message}
                  onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                  error={errors.message}
                  placeholder="Tell us anything — we listen."
                  rows={6}
                />

                {/* Subject suggestions */}
                <div>
                  <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '3px', textTransform: 'uppercase', color: textDim, margin: '0 0 0.75rem' }}>
                    Common Enquiries
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['My Order', 'Reorder Formula', 'Custom Fragrance', 'Gift Advice', 'Partnership'].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setSubject(s); setErrors(p => ({ ...p, subject: '' })); }}
                        style={{
                          fontFamily: serif,
                          fontSize: '0.6rem',
                          letterSpacing: '2px',
                          padding: '0.4rem 0.9rem',
                          background: subject === s ? 'rgba(212,175,100,0.08)' : 'transparent',
                          border: `1px solid ${subject === s ? 'rgba(212,175,100,0.35)' : 'rgba(212,175,100,0.1)'}`,
                          color: subject === s ? gold : textDim,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    marginTop: '0.5rem',
                    padding: '1rem 2.5rem',
                    fontFamily: serif,
                    fontSize: '0.65rem',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    background: sending ? 'rgba(212,175,100,0.4)' : 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)',
                    color: '#0c0a08',
                    border: 'none',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
                    transition: 'box-shadow 0.3s ease, opacity 0.3s ease',
                    boxShadow: '0 6px 30px rgba(212,175,100,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.boxShadow = '0 10px 40px rgba(212,175,100,0.32)'; }}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 30px rgba(212,175,100,0.18)'}
                >
                  {sending ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/>
                        <path d="M21 12a9 9 0 00-9-9"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;