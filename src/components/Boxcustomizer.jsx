import { useState } from 'react';

const serif = 'Georgia, serif';
const gold = '#d4af64';
const goldFaint = 'rgba(212,175,100,0.08)';
const goldBorder = 'rgba(212,175,100,0.12)';
const textLight = '#e8d5a3';
const textMuted = '#6a5a4a';
const textDim = '#4a3f35';

// ── ENGRAVING PREVIEW ────────────────────────────────────────────────────────
const BoxPreview = ({ name, date, message }) => {
  const s = { bg: '#0c0a08', accent: '#d4af64', text: '#f5f0e8' };

  return (
    <div className="relative w-full" style={{ aspectRatio: '4/3', maxWidth: '420px', margin: '0 auto' }}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-sm" style={{ background: `radial-gradient(ellipse at 50% 30%, ${s.accent}22, transparent 70%)`, filter: 'blur(20px)', transform: 'scale(1.1)' }} />

      {/* Box face */}
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{
          background: s.bg,
          border: `1px solid ${s.accent}40`,
          boxShadow: `inset 0 0 60px ${s.accent}08, 0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Corner ornaments */}
        {[
          { top: '1rem', left: '1rem', t: 'none' },
          { top: '1rem', right: '1rem', t: 'scaleX(-1)' },
          { bottom: '1rem', left: '1rem', t: 'scaleY(-1)' },
          { bottom: '1rem', right: '1rem', t: 'scale(-1)' },
        ].map(({ t, ...pos }, i) => (
          <div key={i} style={{ position: 'absolute', opacity: 0.4, transform: t, ...pos }}>
            <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
              <path d="M2 2 L2 14 M2 2 L14 2" stroke={s.accent} strokeWidth="1"/>
            </svg>
          </div>
        ))}

        {/* Top line */}
        <div style={{ height: '1px', width: '60%', background: `linear-gradient(to right, transparent, ${s.accent}60, transparent)`, marginBottom: '1.5rem' }} />

        {/* Brand */}
        <p style={{ fontSize: '0.55rem', letterSpacing: '6px', textTransform: 'uppercase', color: `${s.accent}80`, fontFamily: serif, marginBottom: '0.5rem' }}>
          Maison Noir
        </p>

        {/* Image placeholder */}
        <div
          style={{
            width: '64px',
            height: '64px',
            border: `1px solid ${s.accent}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            background: `${s.accent}06`,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth="0.8" opacity="0.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>

        {/* Engraved name */}
        <p
          style={{
            fontSize: name ? 'clamp(1rem, 3vw, 1.4rem)' : '0.9rem',
            fontWeight: 300,
            letterSpacing: name ? '4px' : '2px',
            color: name ? s.text : `${s.accent}40`,
            fontFamily: serif,
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
            transition: 'all 0.4s ease',
            fontStyle: name ? 'normal' : 'italic',
          }}
        >
          {name || 'Your Name'}
        </p>

        {/* Date */}
        {date && (
          <p style={{ fontSize: '0.6rem', letterSpacing: '3px', color: `${s.accent}70`, fontFamily: serif, marginBottom: '0.6rem' }}>
            {date}
          </p>
        )}

        {/* Message line */}
        {message && (
          <p style={{ fontSize: '0.58rem', letterSpacing: '1.5px', color: `${s.accent}60`, fontFamily: serif, fontStyle: 'italic', maxWidth: '70%', textAlign: 'center', lineHeight: 1.6 }}>
            "{message}"
          </p>
        )}

        {/* Bottom line */}
        <div style={{ height: '1px', width: '60%', background: `linear-gradient(to right, transparent, ${s.accent}60, transparent)`, marginTop: '1.5rem' }} />
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const BoxCustomizer = ({ perfumeResults, onContinue, onBack }) => {
  const [engraveName, setEngraveName] = useState('');
  const [engraveDate, setEngraveDate] = useState('');
  const [engraveMsg, setEngraveMsg]   = useState('');
  const [wantsBox, setWantsBox]   = useState(true);
  const [bottleFinish, setBottleFinish] = useState('gold');

  const handleContinue = () => {
    onContinue({
      ...perfumeResults,
      bottleFinish,
      boxCustomization: wantsBox ? {
        name: engraveName,
        date: engraveDate,
        message: engraveMsg,
      } : null,
    });
  };

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: '#0c0a08' }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,100,0.04), transparent)' }} />

      <div className="relative max-w-6xl mx-auto">

        {/* ── PAGE HEADER ── */}
        <div className="flex items-center justify-between mb-14">
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: textDim, fontFamily: serif, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase' }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = textDim}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/></svg>
            Back
          </button>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <div style={{ height: '1px', width: '1.5rem', background: `linear-gradient(to right, transparent, ${gold})` }} />
              <span style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#c4a55a', fontFamily: serif }}>Step 2 of 3</span>
              <div style={{ height: '1px', width: '1.5rem', background: `linear-gradient(to left, transparent, ${gold})` }} />
            </div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: textDim, fontFamily: serif }}>Maison Noir</p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {['Quiz', 'Box', 'Pay'].map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: i === 1 ? gold : i < 1 ? `${gold}60` : 'rgba(212,175,100,0.15)',
                  border: `1px solid ${i === 1 ? gold : 'rgba(212,175,100,0.2)'}`,
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── HEADING ── */}
        <div className="text-center mb-14">
          <h1 className="font-light mb-4" style={{ fontFamily: serif }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 45%, #e8d5a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              Design Your
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 50%, #b8955a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              Gift Box
            </span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1rem 0 1.5rem' }}>
            <div style={{ height: '1px', width: '4rem', background: `linear-gradient(to right, transparent, ${gold}60)` }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: gold, opacity: 0.5 }} />
            <div style={{ height: '1px', width: '4rem', background: `linear-gradient(to left, transparent, ${gold}60)` }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: textMuted, fontFamily: serif, lineHeight: 1.9, maxWidth: '480px', margin: '0 auto' }}>
            Personalise the presentation of your fragrance. Every detail engraved, every box handcrafted.
          </p>
        </div>

        {/* ── BOTTLE FINISH SELECTOR ── */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#c4a55a', fontFamily: serif, marginBottom: '0.4rem' }}>
              Finish
            </p>
            <p style={{ fontSize: '0.75rem', color: textMuted, fontFamily: serif }}>
              Choose the metal finish for your bottle cap & atomiser
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
            {[
              {
                id: 'gold',
                label: 'Or',
                sub: 'Warm Gold',
                gradient: 'linear-gradient(145deg, #f5d78e 0%, #d4af64 30%, #b8860b 55%, #f0c040 75%, #c8960c 100%)',
                glow: 'rgba(212,175,100,0.5)',
                ring: '#d4af64',
              },
              {
                id: 'silver',
                label: 'Argent',
                sub: 'Cool Silver',
                gradient: 'linear-gradient(145deg, #ffffff 0%, #d8d8d8 25%, #a0a0a0 55%, #e8e8e8 75%, #b0b0b0 100%)',
                glow: 'rgba(200,200,220,0.4)',
                ring: '#c0c0c0',
              },
            ].map(({ id, label, sub, gradient, glow, ring }) => {
              const active = bottleFinish === id;
              return (
                <button
                  key={id}
                  onClick={() => setBottleFinish(id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1.75rem 2.25rem',
                    position: 'relative',
                    transition: 'all 0.4s ease',
                    background: active ? 'rgba(212,175,100,0.04)' : 'transparent',
                    border: `1px solid ${active ? ring + '50' : 'rgba(212,175,100,0.08)'}`,
                    clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
                  }}
                >
                  {/* Bottle silhouette with metallic cap */}
                  <div style={{ position: 'relative', width: '60px', height: '100px' }}>
                    {/* Bottle body */}
                    <svg width="60" height="100" viewBox="0 0 60 100" fill="none" style={{ position: 'absolute', inset: 0 }}>
                      {/* Bottle body gradient */}
                      <defs>
                        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="rgba(212,175,100,0.08)"/>
                          <stop offset="50%" stopColor="rgba(212,175,100,0.18)"/>
                          <stop offset="100%" stopColor="rgba(212,175,100,0.06)"/>
                        </linearGradient>
                        <linearGradient id={`metal-${id}`} x1="0" y1="0" x2="1" y2="1">
                          {id === 'gold' ? (
                            <>
                              <stop offset="0%" stopColor="#f5d78e"/>
                              <stop offset="30%" stopColor="#d4af64"/>
                              <stop offset="60%" stopColor="#b8860b"/>
                              <stop offset="100%" stopColor="#f0c040"/>
                            </>
                          ) : (
                            <>
                              <stop offset="0%" stopColor="#ffffff"/>
                              <stop offset="30%" stopColor="#d8d8d8"/>
                              <stop offset="60%" stopColor="#909090"/>
                              <stop offset="100%" stopColor="#e0e0e0"/>
                            </>
                          )}
                        </linearGradient>
                      </defs>
                      {/* Shoulder taper */}
                      <path d="M18 38 L10 58 L10 94 Q10 97 13 97 L47 97 Q50 97 50 94 L50 58 L42 38 Z" fill={`url(#body-${id})`} stroke="rgba(212,175,100,0.2)" strokeWidth="0.5"/>
                      {/* Neck */}
                      <rect x="22" y="20" width="16" height="19" rx="1" fill={`url(#body-${id})`} stroke="rgba(212,175,100,0.2)" strokeWidth="0.5"/>
                      {/* Cap */}
                      <rect x="20" y="8" width="20" height="13" rx="2" fill={`url(#metal-${id})`}/>
                      {/* Cap shine line */}
                      <rect x="22" y="10" width="6" height="1.5" rx="0.75" fill="rgba(255,255,255,0.5)"/>
                      {/* Atomiser button */}
                      <rect x="27" y="4" width="6" height="5" rx="1.5" fill={`url(#metal-${id})`}/>
                      {/* Label area */}
                      <rect x="14" y="62" width="32" height="22" rx="0.5" fill="rgba(212,175,100,0.06)" stroke="rgba(212,175,100,0.15)" strokeWidth="0.5"/>
                      <text x="30" y="72" textAnchor="middle" fill="rgba(212,175,100,0.5)" fontSize="4" fontFamily="Georgia, serif" letterSpacing="1.5">NOEME</text>
                      <text x="30" y="79" textAnchor="middle" fill="rgba(212,175,100,0.25)" fontSize="3" fontFamily="Georgia, serif" letterSpacing="2">MAISON NOIR</text>
                    </svg>

                    {/* Glow under bottle */}
                    {active && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '50px',
                        height: '10px',
                        background: glow,
                        filter: 'blur(8px)',
                        borderRadius: '50%',
                      }} />
                    )}
                  </div>

                  {/* Label */}
                  <div style={{ textAlign: 'center' }}>
                    <p style={{
                      fontFamily: serif,
                      fontSize: '0.75rem',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      color: active ? ring : '#5a4f45',
                      margin: '0 0 0.2rem',
                      transition: 'color 0.3s ease',
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontFamily: serif,
                      fontSize: '0.58rem',
                      letterSpacing: '2px',
                      color: active ? ring + 'aa' : textDim,
                      margin: 0,
                      transition: 'color 0.3s ease',
                    }}>
                      {sub}
                    </p>
                  </div>

                  {/* Active indicator dot */}
                  <div style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: active ? ring : 'transparent',
                    border: `1px solid ${active ? ring : 'rgba(212,175,100,0.2)'}`,
                    transition: 'all 0.3s ease',
                    boxShadow: active ? `0 0 8px ${glow}` : 'none',
                  }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── TOGGLE: want box? ── */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { val: true,  label: 'Add Gift Box & Engraving', icon: '◈' },
            { val: false, label: 'Skip — Bottle Only',        icon: '◇' },
          ].map(({ val, label, icon }) => (
            <button
              key={String(val)}
              onClick={() => setWantsBox(val)}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '0.65rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: serif,
                background: wantsBox === val ? 'rgba(212,175,100,0.08)' : 'transparent',
                border: `1px solid ${wantsBox === val ? 'rgba(212,175,100,0.4)' : 'rgba(212,175,100,0.12)'}`,
                color: wantsBox === val ? gold : textDim,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
            >
              <span style={{ marginRight: '0.5rem', opacity: 0.6 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {wantsBox && (
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT: LIVE PREVIEW ── */}
            <div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: textDim, fontFamily: serif, marginBottom: '1.5rem', textAlign: 'center' }}>
                Live Preview
              </p>
              <BoxPreview
                name={engraveName}
                date={engraveDate}
                message={engraveMsg}
              />
            </div>

            {/* ── RIGHT: ENGRAVING FORM ── */}
            <div style={{ padding: '2.5rem', background: goldFaint, border: `1px solid ${goldBorder}` }}>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ height: '1px', width: '1rem', background: `linear-gradient(to right, transparent, ${gold})` }} />
                  <span style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#c4a55a', fontFamily: serif }}>Personalise</span>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 300, color: textLight, fontFamily: serif, marginBottom: '0.25rem' }}>Engraving Details</h2>
                <p style={{ fontSize: '0.75rem', color: textMuted, fontFamily: serif }}>All fields optional — leave blank to skip that element.</p>
              </div>

              {/* Name field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a4f45', fontFamily: serif, marginBottom: '0.5rem' }}>
                  Name or Initials
                </label>
                <input
                  type="text"
                  value={engraveName}
                  maxLength={20}
                  onChange={e => setEngraveName(e.target.value)}
                  placeholder="e.g. Élise · or · É.M."
                  style={{
                    width: '100%',
                    background: 'rgba(212,175,100,0.02)',
                    border: '1px solid rgba(212,175,100,0.12)',
                    padding: '12px 16px',
                    color: '#c4b090',
                    fontFamily: serif,
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.12)'}
                />
                <p style={{ fontSize: '0.6rem', color: textDim, fontFamily: serif, marginTop: '0.3rem', textAlign: 'right' }}>{engraveName.length}/20</p>
              </div>

              {/* Date field */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a4f45', fontFamily: serif, marginBottom: '0.5rem' }}>
                  Special Date
                </label>
                <input
                  type="text"
                  value={engraveDate}
                  maxLength={12}
                  onChange={e => setEngraveDate(e.target.value)}
                  placeholder="e.g. 14 · 02 · 2025"
                  style={{
                    width: '100%',
                    background: 'rgba(212,175,100,0.02)',
                    border: '1px solid rgba(212,175,100,0.12)',
                    padding: '12px 16px',
                    color: '#c4b090',
                    fontFamily: serif,
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.12)'}
                />
              </div>

              {/* Message field */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a4f45', fontFamily: serif, marginBottom: '0.5rem' }}>
                  Short Message
                  <span style={{ color: textDim, marginLeft: '0.5rem', fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>— engraved inside the lid</span>
                </label>
                <textarea
                  value={engraveMsg}
                  maxLength={60}
                  onChange={e => setEngraveMsg(e.target.value)}
                  placeholder="e.g. Forever yours · or · You are unforgettable"
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'rgba(212,175,100,0.02)',
                    border: '1px solid rgba(212,175,100,0.12)',
                    padding: '12px 16px',
                    color: '#c4b090',
                    fontFamily: serif,
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                    lineHeight: 1.7,
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.12)'}
                />
                <p style={{ fontSize: '0.6rem', color: textDim, fontFamily: serif, marginTop: '0.3rem', textAlign: 'right' }}>{engraveMsg.length}/60</p>
              </div>

              {/* What's included */}
              <div style={{ padding: '1.25rem', background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.08)', marginBottom: '2rem' }}>
                <p style={{ fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: textDim, fontFamily: serif, marginBottom: '0.75rem' }}>Included with your box</p>
                {[
                  'Hand-lacquered luxury gift box',
                  'Gold foil engraving on lid',
                  'Message engraved inside lid',
                  'Satin interior with bottle holder',
                  'Sealed with a wax stamp',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ width: '4px', height: '4px', background: gold, opacity: 0.5, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', color: '#7a6a5a', fontFamily: serif }}>{item}</span>
                  </div>
                ))}
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(212,175,100,0.08)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: textDim, fontFamily: serif }}>Box & Engraving</span>
                  <span style={{ fontSize: '0.85rem', color: gold, fontFamily: serif }}>+$43</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTINUE BUTTON ── */}
        <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={handleContinue}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.1rem 3.5rem',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: serif,
              background: 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)',
              color: '#0c0a08',
              border: 'none',
              cursor: 'pointer',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              boxShadow: '0 8px 40px rgba(212,175,100,0.2)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 50px rgba(212,175,100,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(212,175,100,0.2)'}
          >
            {wantsBox ? 'Continue to Payment' : 'Skip & Continue to Payment'}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#2a2520', fontFamily: serif }}>
          You can review everything before placing your order
        </p>
      </div>
    </div>
  );
};

export default BoxCustomizer;