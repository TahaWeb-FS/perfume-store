import { useState } from 'react';

import box1 from '../images/box1.png'
import box2 from '../images/box2.png'
import box3 from '../images/box3.png'

// ── Import your box images here when ready ───────────────────────────────────
// import boxImage1 from '../assets/box1.jpg';
// import boxImage2 from '../assets/box2.jpg';
// import boxImage3 from '../assets/box3.jpg';
// Then replace the `image` values below with: boxImage1, boxImage2, boxImage3
// ─────────────────────────────────────────────────────────────────────────────

const serif = 'Georgia, serif';
const gold = '#d4af64';
const goldFaint = 'rgba(212,175,100,0.08)';
const goldBorder = 'rgba(212,175,100,0.12)';
const textLight = '#e8d5a3';
const textMuted = '#6a5a4a';
const textDim = '#4a3f35';

const BOX_STYLES = [
  {
    id: 'classic',
    label: 'Classique',
    sub: 'Timeless elegance',
    image: box1, // ← replace with boxImage1
  },
  {
    id: 'luxe',
    label: 'Luxe',
    sub: 'Pure opulence',
    image: box2, // ← replace with boxImage2
  },
  {
    id: 'minimal',
    label: 'Épuré',
    sub: 'Refined simplicity',
    image: box3, // ← replace with boxImage3
  },
];

// ── Empty image placeholder ──────────────────────────────────────────────────
const ImagePlaceholder = ({ label, isSelected }) => (
  <div
    style={{
      width: '100%',
      aspectRatio: '3/4',
      background: isSelected
        ? 'rgba(212,175,100,0.06)'
        : 'rgba(212,175,100,0.02)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      transition: 'background 0.4s ease',
    }}
  >
    {/* Decorative corner marks */}
    {[
      { top: '10px', left: '10px', transform: 'none' },
      { top: '10px', right: '10px', transform: 'scaleX(-1)' },
      { bottom: '10px', left: '10px', transform: 'scaleY(-1)' },
      { bottom: '10px', right: '10px', transform: 'scale(-1)' },
    ].map((pos, i) => (
      <div key={i} style={{ position: 'absolute', opacity: isSelected ? 0.5 : 0.2, transition: 'opacity 0.4s', ...pos }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1 L1 7 M1 1 L7 1" stroke={gold} strokeWidth="1"/>
        </svg>
      </div>
    ))}
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isSelected ? gold : 'rgba(212,175,100,0.25)'} strokeWidth="0.75" style={{ transition: 'stroke 0.3s' }}>
      <rect x="3" y="3" width="18" height="18" rx="1"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
    <span style={{
      fontFamily: serif,
      fontSize: '0.55rem',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: isSelected ? 'rgba(212,175,100,0.5)' : 'rgba(212,175,100,0.18)',
      transition: 'color 0.3s',
    }}>
      {label}
    </span>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const GiftBoxCustomizer = ({ perfumeResults, onContinue, onBack }) => {
  const [selectedBox, setSelectedBox] = useState('classic');
  const [engraveName, setEngraveName] = useState('');
  const [engraveDate, setEngraveDate]   = useState('');
  const [engraveMsg, setEngraveMsg]     = useState('');
  const [wantsEngraving, setWantsEngraving] = useState(true);
  const [bottleFinish, setBottleFinish] = useState('gold');

  const handleContinue = () => {
    onContinue({
      ...perfumeResults,
      bottleFinish,
      boxCustomization: {
        style: selectedBox,
        engraving: wantsEngraving ? {
          name: engraveName,
          date: engraveDate,
          message: engraveMsg,
        } : null,
      },
    });
  };

  const active = BOX_STYLES.find(b => b.id === selectedBox);

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
            <p style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: textDim, fontFamily: serif }}>Gift Presentation</p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {['Quiz', 'Box', 'Pay'].map((s, i) => (
              <div key={s}>
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
        <div className="text-center mb-16">
          {/* Gift banner */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div style={{ height: '1px', width: '2rem', background: `linear-gradient(to right, transparent, ${gold}50)` }} />
            <div className="flex items-center gap-2 px-4 py-1.5" style={{ border: '1px solid rgba(212,175,100,0.15)', background: 'rgba(212,175,100,0.03)' }}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke={gold} strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span style={{ fontSize: '0.55rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#c4a55a', fontFamily: serif }}>Crafted With Love</span>
            </div>
            <div style={{ height: '1px', width: '2rem', background: `linear-gradient(to left, transparent, ${gold}50)` }} />
          </div>

          <h1 className="font-light" style={{ fontFamily: serif }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 45%, #e8d5a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              marginBottom: '0.1em',
            }}>
              Choose Their
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 50%, #b8955a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              Gift Box
            </span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.25rem 0 1.5rem' }}>
            <div style={{ height: '1px', width: '4rem', background: `linear-gradient(to right, transparent, ${gold}60)` }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: gold, opacity: 0.5 }} />
            <div style={{ height: '1px', width: '4rem', background: `linear-gradient(to left, transparent, ${gold}60)` }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: textMuted, fontFamily: serif, lineHeight: 1.9, maxWidth: '460px', margin: '0 auto' }}>
            Select the presentation that best reflects who they are. Every box is handcrafted and sealed with care.
          </p>
        </div>


        {/* ── BOTTLE FINISH SELECTOR ── */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#c4a55a', fontFamily: serif, marginBottom: '0.4rem' }}>
              Finish
            </p>
            <p style={{ fontSize: '0.75rem', color: textMuted, fontFamily: serif }}>
              Choose the metal finish for the bottle cap & atomiser
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
            {[
              {
                id: 'gold',
                label: 'Or',
                sub: 'Warm Gold',
                glow: 'rgba(212,175,100,0.5)',
                ring: '#d4af64',
              },
              {
                id: 'silver',
                label: 'Argent',
                sub: 'Cool Silver',
                glow: 'rgba(200,200,220,0.4)',
                ring: '#c0c0c0',
              },
            ].map(({ id, label, sub, glow, ring }) => {
              const active = bottleFinish === id;
              return (
                <button
                  key={id}
                  onClick={() => setBottleFinish(id)}
                  style={{
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
                  <div style={{ position: 'relative', width: '60px', height: '100px' }}>
                    <svg width="60" height="100" viewBox="0 0 60 100" fill="none" style={{ position: 'absolute', inset: 0 }}>
                      <defs>
                        <linearGradient id={`gbody-${id}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="rgba(212,175,100,0.08)"/>
                          <stop offset="50%" stopColor="rgba(212,175,100,0.18)"/>
                          <stop offset="100%" stopColor="rgba(212,175,100,0.06)"/>
                        </linearGradient>
                        <linearGradient id={`gmetal-${id}`} x1="0" y1="0" x2="1" y2="1">
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
                      <path d="M18 38 L10 58 L10 94 Q10 97 13 97 L47 97 Q50 97 50 94 L50 58 L42 38 Z" fill={`url(#gbody-${id})`} stroke="rgba(212,175,100,0.2)" strokeWidth="0.5"/>
                      <rect x="22" y="20" width="16" height="19" rx="1" fill={`url(#gbody-${id})`} stroke="rgba(212,175,100,0.2)" strokeWidth="0.5"/>
                      <rect x="20" y="8" width="20" height="13" rx="2" fill={`url(#gmetal-${id})`}/>
                      <rect x="22" y="10" width="6" height="1.5" rx="0.75" fill="rgba(255,255,255,0.5)"/>
                      <rect x="27" y="4" width="6" height="5" rx="1.5" fill={`url(#gmetal-${id})`}/>
                      <rect x="14" y="62" width="32" height="22" rx="0.5" fill="rgba(212,175,100,0.06)" stroke="rgba(212,175,100,0.15)" strokeWidth="0.5"/>
                      <text x="30" y="72" textAnchor="middle" fill="rgba(212,175,100,0.5)" fontSize="4" fontFamily="Georgia, serif" letterSpacing="1.5">NOEME</text>
                      <text x="30" y="79" textAnchor="middle" fill="rgba(212,175,100,0.25)" fontSize="3" fontFamily="Georgia, serif" letterSpacing="2">MAISON NOIR</text>
                    </svg>
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
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: serif, fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: active ? ring : '#5a4f45', margin: '0 0 0.2rem', transition: 'color 0.3s ease' }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: serif, fontSize: '0.58rem', letterSpacing: '2px', color: active ? ring + 'aa' : textDim, margin: 0, transition: 'color 0.3s ease' }}>
                      {sub}
                    </p>
                  </div>
                  <div style={{
                    width: '5px', height: '5px', borderRadius: '50%',
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

        {/* ── BOX SELECTOR ── */}
        <div style={{ marginBottom: '5rem' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase', color: textDim, fontFamily: serif, textAlign: 'center', marginBottom: '2.5rem' }}>
            Select a Style
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '720px', margin: '0 auto' }}>
            {BOX_STYLES.map(({ id, label, sub, image }) => {
              const isSelected = selectedBox === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedBox(id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0',
                  }}
                >
                  {/* Image frame */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    border: `1px solid ${isSelected ? 'rgba(212,175,100,0.45)' : 'rgba(212,175,100,0.1)'}`,
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                    boxShadow: isSelected ? `0 0 40px rgba(212,175,100,0.12), inset 0 0 20px rgba(212,175,100,0.03)` : 'none',
                    overflow: 'hidden',
                  }}>
                    {image ? (
                      <img
                        src={image}
                        alt={label}
                        style={{
                          width: '100%',
                          aspectRatio: '3/4',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.6s ease, opacity 0.4s ease',
                          transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                          opacity: isSelected ? 1 : 0.7,
                        }}
                      />
                    ) : (
                      <ImagePlaceholder label={label} isSelected={isSelected} />
                    )}

                    {/* Selected overlay shimmer */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(212,175,100,0.08) 0%, transparent 60%)',
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>

                  {/* Label */}
                  <div style={{
                    padding: '1rem 0 0.25rem',
                    textAlign: 'center',
                    borderBottom: `1px solid ${isSelected ? 'rgba(212,175,100,0.3)' : 'transparent'}`,
                    transition: 'border-color 0.4s',
                  }}>
                    <p style={{
                      fontFamily: serif,
                      fontSize: '0.75rem',
                      letterSpacing: '4px',
                      textTransform: 'uppercase',
                      color: isSelected ? gold : '#5a4f45',
                      margin: '0 0 0.25rem',
                      transition: 'color 0.3s',
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontFamily: serif,
                      fontSize: '0.6rem',
                      letterSpacing: '2px',
                      color: isSelected ? 'rgba(212,175,100,0.5)' : textDim,
                      margin: 0,
                      transition: 'color 0.3s',
                      fontStyle: 'italic',
                    }}>
                      {sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── ENGRAVING SECTION ── */}
        <div style={{ maxWidth: '680px', margin: '0 auto 3.5rem' }}>

          {/* Toggle engraving */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[
              { val: true,  label: 'Add Personal Engraving', icon: '◈' },
              { val: false, label: 'Leave It Pristine',       icon: '◇' },
            ].map(({ val, label, icon }) => (
              <button
                key={String(val)}
                onClick={() => setWantsEngraving(val)}
                style={{
                  padding: '0.65rem 1.75rem',
                  fontSize: '0.6rem',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontFamily: serif,
                  background: wantsEngraving === val ? 'rgba(212,175,100,0.08)' : 'transparent',
                  border: `1px solid ${wantsEngraving === val ? 'rgba(212,175,100,0.4)' : 'rgba(212,175,100,0.12)'}`,
                  color: wantsEngraving === val ? gold : textDim,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                <span style={{ marginRight: '0.4rem', opacity: 0.6 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Engraving form */}
          {wantsEngraving && (
            <div style={{ padding: '2.5rem', background: goldFaint, border: `1px solid ${goldBorder}` }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ height: '1px', width: '1rem', background: `linear-gradient(to right, transparent, ${gold})` }} />
                  <span style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#c4a55a', fontFamily: serif }}>Personalise</span>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 300, color: textLight, fontFamily: serif, marginBottom: '0.25rem' }}>Engraving Details</h2>
                <p style={{ fontSize: '0.75rem', color: textMuted, fontFamily: serif }}>All fields optional — leave blank to skip that element.</p>
              </div>

              {/* Name */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a4f45', fontFamily: serif, marginBottom: '0.5rem' }}>
                  Their Name or Initials
                </label>
                <input
                  type="text"
                  value={engraveName}
                  maxLength={20}
                  onChange={e => setEngraveName(e.target.value)}
                  placeholder="e.g. Sophie · or · S.M."
                  style={{ width: '100%', background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.12)', padding: '12px 16px', color: '#c4b090', fontFamily: serif, fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.12)'}
                />
                <p style={{ fontSize: '0.6rem', color: textDim, fontFamily: serif, marginTop: '0.3rem', textAlign: 'right' }}>{engraveName.length}/20</p>
              </div>

              {/* Date */}
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
                  style={{ width: '100%', background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.12)', padding: '12px 16px', color: '#c4b090', fontFamily: serif, fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.12)'}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#5a4f45', fontFamily: serif, marginBottom: '0.5rem' }}>
                  A Message For Them
                  <span style={{ color: textDim, marginLeft: '0.5rem', fontStyle: 'italic', textTransform: 'none', letterSpacing: 0 }}>— engraved inside the lid</span>
                </label>
                <textarea
                  value={engraveMsg}
                  maxLength={60}
                  onChange={e => setEngraveMsg(e.target.value)}
                  placeholder="e.g. Forever yours · or · You are unforgettable"
                  rows={3}
                  style={{ width: '100%', background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.12)', padding: '12px 16px', color: '#c4b090', fontFamily: serif, fontSize: '14px', outline: 'none', resize: 'none', boxSizing: 'border-box', lineHeight: 1.7, transition: 'border-color 0.2s' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.12)'}
                />
                <p style={{ fontSize: '0.6rem', color: textDim, fontFamily: serif, marginTop: '0.3rem', textAlign: 'right' }}>{engraveMsg.length}/60</p>
              </div>
            </div>
          )}
        </div>

        {/* ── CONTINUE BUTTON ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            Continue to Payment
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

export default GiftBoxCustomizer;