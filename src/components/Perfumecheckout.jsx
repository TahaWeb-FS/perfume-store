import { useState } from "react";

const bg = { background: '#0c0a08' };
const serif = 'Georgia, serif';
const gold = '#d4af64';
const goldFaint = 'rgba(212,175,100,0.08)';
const goldBorder = 'rgba(212,175,100,0.12)';
const goldBorderHover = 'rgba(212,175,100,0.3)';
const textMuted = '#6a5a4a';
const textDim = '#4a3f35';
const textLight = '#e8d5a3';

// ── ORDER SUMMARY ─────────────────────────────────────────────────────────────
const OrderSummary = ({ perfume }) => (
  <div className="h-fit sticky top-8" style={{ background: goldFaint, border: `1px solid ${goldBorder}`, padding: '2rem' }}>
    <div className="relative flex justify-center mb-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,100,0.08), transparent)' }} />
      </div>
      <svg viewBox="0 0 120 200" className="w-24 relative z-10" style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,100,0.25))' }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="45" y="8" width="30" height="14" rx="4" fill="url(#capGrad2)" />
        <rect x="48" y="22" width="24" height="10" rx="2" fill="#92400e" />
        <path d="M28 48 Q28 36 60 36 Q92 36 92 48 L96 160 Q96 178 60 178 Q24 178 24 160 Z" fill="url(#bottleGrad2)" />
        <path d="M28 48 Q28 36 60 36 Q92 36 92 48 L96 160 Q96 178 60 178 Q24 178 24 160 Z" fill="url(#liquidGrad2)" opacity="0.7"/>
        <ellipse cx="60" cy="48" rx="32" ry="8" fill="url(#topGrad2)" />
        <rect x="34" y="88" width="52" height="60" rx="2" fill="rgba(12,10,8,0.6)" stroke="rgba(212,175,100,0.3)" strokeWidth="0.8"/>
        <text x="60" y="110" textAnchor="middle" fill="#d4af64" fontSize="6" fontFamily="Georgia, serif" letterSpacing="3">MAISON</text>
        <line x1="40" y1="115" x2="80" y2="115" stroke="rgba(212,175,100,0.3)" strokeWidth="0.5"/>
        <text x="60" y="128" textAnchor="middle" fill="#f5f0e8" fontSize="8" fontFamily="Georgia, serif" letterSpacing="1">{perfume.archetype?.name?.split(' ')[1] || 'NOIR'}</text>
        <text x="60" y="141" textAnchor="middle" fill="#b8955a" fontSize="5" fontFamily="Georgia, serif" letterSpacing="3">EAU DE PARFUM</text>
        <defs>
          <linearGradient id="capGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#78350f"/><stop offset="100%" stopColor="#451a03"/></linearGradient>
          <linearGradient id="bottleGrad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="rgba(120,80,20,0.3)"/><stop offset="40%" stopColor="rgba(212,175,100,0.15)"/><stop offset="100%" stopColor="rgba(120,80,20,0.3)"/></linearGradient>
          <linearGradient id="liquidGrad2" x1="0.3" y1="0" x2="0.7" y2="1"><stop offset="0%" stopColor="rgba(212,175,100,0.2)"/><stop offset="100%" stopColor="rgba(180,83,9,0.08)"/></linearGradient>
          <linearGradient id="topGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(212,175,100,0.25)"/><stop offset="100%" stopColor="rgba(120,53,15,0.15)"/></linearGradient>
        </defs>
      </svg>
    </div>

    <div className="text-center mb-6">
      <p className="text-xs uppercase tracking-[4px] mb-1" style={{ color: '#5a4f45', fontFamily: serif }}>Your Signature Scent</p>
      <h3 className="text-xl font-light mb-1" style={{ color: textLight, fontFamily: serif }}>{perfume.archetype?.name || 'The Muse'}</h3>
      <p className="text-xs" style={{ color: textMuted, fontFamily: serif }}>{perfume.profile || 'Unisex · Evening · Bold · Floral'}</p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { label: 'Top Notes', notes: perfume.notes?.top || ['Bergamot', 'Pear'], highlight: false },
        { label: 'Heart Notes', notes: perfume.notes?.heart || ['Jasmine', 'Peony'], highlight: true },
        { label: 'Base Notes', notes: perfume.notes?.base || ['Sandalwood', 'Musk'], highlight: false },
      ].map(({ label, notes, highlight }) => (
        <div key={label} className="px-4 py-3" style={{ background: highlight ? 'rgba(212,175,100,0.05)' : 'rgba(212,175,100,0.02)', border: `1px solid ${highlight ? 'rgba(212,175,100,0.2)' : 'rgba(212,175,100,0.07)'}` }}>
          <p className="text-xs uppercase tracking-[3px] mb-2" style={{ color: '#3a3028', fontFamily: serif }}>{label}</p>
          <div className="flex flex-wrap gap-1.5">
            {notes.map(note => (
              <span key={note} className="text-xs px-2 py-0.5" style={{ color: highlight ? gold : '#6a5a4a', border: `1px solid ${highlight ? 'rgba(212,175,100,0.25)' : 'rgba(212,175,100,0.1)'}`, fontFamily: serif }}>{note}</span>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="pt-5 space-y-3" style={{ borderTop: '1px solid rgba(212,175,100,0.1)' }}>
      {[
        { label: '50ml Eau de Parfum', price: '$189' },
        { label: 'Custom Engraving', price: '$25' },
        { label: 'Luxury Gift Box', price: '$18' },
      ].map(({ label, price }) => (
        <div key={label} className="flex justify-between text-xs" style={{ fontFamily: serif }}>
          <span style={{ color: textDim }}>{label}</span>
          <span style={{ color: '#8a7a6a' }}>{price}</span>
        </div>
      ))}
      <div className="flex justify-between text-xs" style={{ fontFamily: serif }}>
        <span style={{ color: textDim }}>Shipping</span>
        <span style={{ color: '#6a9a6a', letterSpacing: '2px', fontSize: '10px', textTransform: 'uppercase' }}>Free</span>
      </div>
      <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(212,175,100,0.1)' }}>
        <span className="text-sm" style={{ color: textLight, fontFamily: serif }}>Total</span>
        <span className="text-2xl font-light" style={{ fontFamily: serif, background: 'linear-gradient(135deg, #d4af64, #f5f0e8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$232</span>
      </div>
    </div>
  </div>
);

// ── INPUT ─────────────────────────────────────────────────────────────────────
const Input = ({ label, placeholder, type = 'text', half, value, onChange, error }) => (
  <div className={`${half ? 'col-span-1' : 'col-span-2'} flex flex-col gap-1.5`}>
    <label className="text-xs uppercase tracking-[3px]" style={{ color: '#5a4f45', fontFamily: serif }}>{label}</label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="outline-none transition-all duration-200"
      style={{
        background: 'rgba(212,175,100,0.02)',
        border: `1px solid ${error ? 'rgba(180,80,80,0.5)' : 'rgba(212,175,100,0.12)'}`,
        padding: '12px 16px',
        color: '#c4b090',
        fontFamily: serif,
        fontSize: '14px',
      }}
      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.35)'; e.currentTarget.style.background = 'rgba(212,175,100,0.04)'; }}
      onBlur={e => { e.currentTarget.style.borderColor = error ? 'rgba(180,80,80,0.5)' : 'rgba(212,175,100,0.12)'; e.currentTarget.style.background = 'rgba(212,175,100,0.02)'; }}
    />
    {error && <p className="text-xs" style={{ color: 'rgba(200,100,100,0.8)', fontFamily: serif }}>{error}</p>}
  </div>
);

// ── CARD VISUAL ───────────────────────────────────────────────────────────────
const CardVisual = ({ cardNum, name, expiry }) => {
  const display = (cardNum || '').replace(/\s/g, '').padEnd(16, '•');
  const chunks = [display.slice(0,4), display.slice(4,8), display.slice(8,12), display.slice(12,16)];
  return (
    <div className="relative h-44 mb-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(42,24,16,0.8), rgba(12,10,8,0.95))', border: '1px solid rgba(212,175,100,0.2)' }}>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,100,0.06), transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-[5px] mb-0.5" style={{ color: 'rgba(212,175,100,0.4)', fontFamily: serif }}>Maison</p>
            <p className="text-lg font-light tracking-[4px]" style={{ color: textLight, fontFamily: serif }}>NOIR</p>
          </div>
          <div className="flex">
            <div className="w-8 h-8 rounded-full" style={{ background: 'rgba(212,175,100,0.3)', border: '1px solid rgba(212,175,100,0.2)' }} />
            <div className="w-8 h-8 rounded-full -ml-3" style={{ background: 'rgba(180,130,60,0.2)', border: '1px solid rgba(212,175,100,0.15)' }} />
          </div>
        </div>
        <div>
          <div className="flex gap-3 mb-3">
            {chunks.map((chunk, i) => (
              <span key={i} className="font-mono text-base tracking-widest" style={{ color: chunk.includes('•') ? 'rgba(212,175,100,0.25)' : textLight }}>{chunk}</span>
            ))}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs uppercase tracking-[3px] mb-0.5" style={{ color: 'rgba(212,175,100,0.3)', fontFamily: serif }}>Card Holder</p>
              <p className="text-xs tracking-wider" style={{ color: '#c4b090', fontFamily: serif, textTransform: 'uppercase' }}>{name || 'YOUR NAME'}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[3px] mb-0.5" style={{ color: 'rgba(212,175,100,0.3)', fontFamily: serif }}>Expires</p>
              <p className="text-xs font-mono" style={{ color: '#c4b090' }}>{expiry || 'MM/YY'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── STEP INDICATOR ────────────────────────────────────────────────────────────
const StepIndicator = ({ currentStep }) => {
  const steps = ['Delivery', 'Payment', 'Confirm'];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center text-xs transition-all duration-300"
              style={{
                border: `1px solid ${i <= currentStep ? gold : 'rgba(212,175,100,0.15)'}`,
                background: i < currentStep ? gold : 'transparent',
                color: i < currentStep ? '#0c0a08' : i === currentStep ? gold : '#3a3028',
                fontFamily: serif,
              }}>
              {i < currentStep ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              ) : i + 1}
            </div>
            <span className="text-xs mt-2 uppercase tracking-[3px]" style={{ color: i === currentStep ? gold : '#3a3028', fontFamily: serif }}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-16 h-px mx-2 mb-5 transition-all duration-300" style={{ background: i < currentStep ? gold : 'rgba(212,175,100,0.12)' }} />
          )}
        </div>
      ))}
    </div>
  );
};

// ── MAIN CHECKOUT ─────────────────────────────────────────────────────────────
const PerfumeCheckout = ({ perfumeResults, onBack }) => {
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '', country: '' });
  const [payment, setPayment] = useState({ cardNum: '', name: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const perfume = perfumeResults || {
    archetype: { name: 'The Muse' },
    profile: 'Unisex · Evening · Bold · Floral',
    notes: { top: ['Bergamot', 'Pear'], heart: ['Jasmine', 'Peony', 'Orange Blossom'], base: ['Sandalwood', 'Vanilla', 'Musk'] },
  };

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => { const v = val.replace(/\D/g, '').slice(0, 4); return v.length >= 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; };

  const validateDelivery = () => {
    const e = {};
    if (!delivery.firstName) e.firstName = 'Required';
    if (!delivery.lastName) e.lastName = 'Required';
    if (!delivery.email || !/\S+@\S+\.\S+/.test(delivery.email)) e.email = 'Valid email required';
    if (!delivery.address) e.address = 'Required';
    if (!delivery.city) e.city = 'Required';
    if (!delivery.zip) e.zip = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (payMethod !== 'card') return true;
    const e = {};
    if (!payment.cardNum || payment.cardNum.replace(/\s/g, '').length < 16) e.cardNum = 'Enter valid card number';
    if (!payment.name) e.name = 'Required';
    if (!payment.expiry || payment.expiry.length < 5) e.expiry = 'Enter valid date';
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateDelivery()) { setErrors({}); setStep(1); }
    else if (step === 1 && validatePayment()) { setErrors({}); setStep(2); }
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setOrderPlaced(true); }, 2200);
  };

  const btnPrimary = {
    background: 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)',
    color: '#0c0a08',
    fontFamily: serif,
    clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
    boxShadow: '0 6px 24px rgba(212,175,100,0.18)',
  };

  // ── ORDER SUCCESS ──
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-20" style={bg}>
        <div className="max-w-md w-full text-center">
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center" style={{ border: '1px solid rgba(212,175,100,0.25)' }}>
              <svg className="w-10 h-10" style={{ color: gold }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${gold})` }} />
            <span className="text-xs uppercase tracking-[4px]" style={{ color: '#c4a55a', fontFamily: serif }}>Order Confirmed</span>
            <div className="h-px w-8" style={{ background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>

          <h2 className="text-4xl font-light mb-3" style={{ fontFamily: serif, background: 'linear-gradient(135deg, #f5f0e8, #d4af64)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Thank You, {delivery.firstName || 'Connoisseur'}
          </h2>
          <p className="text-sm mb-2" style={{ color: textMuted, fontFamily: serif }}>Your signature scent is being crafted by our master perfumers.</p>
          <p className="text-xs mb-10 uppercase tracking-[2px]" style={{ color: '#4a3f35', fontFamily: serif }}>
            Order #MN-{Math.floor(Math.random() * 90000) + 10000}
          </p>

          <div className="p-6 mb-8 text-left space-y-3" style={{ background: goldFaint, border: `1px solid ${goldBorder}` }}>
            {[
              { label: 'Fragrance', val: perfume.archetype?.name },
              { label: 'Profile', val: perfume.profile },
              { label: 'Est. Delivery', val: '7–10 business days' },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between text-xs" style={{ fontFamily: serif }}>
                <span style={{ color: textDim }}>{label}</span>
                <span style={{ color: '#8a7a6a' }}>{val}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(212,175,100,0.1)' }}>
              <span className="text-sm" style={{ color: textLight, fontFamily: serif }}>Total Charged</span>
              <span className="text-sm" style={{ color: gold, fontFamily: serif }}>$232.00</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full py-4 text-xs uppercase tracking-[3px] transition-all duration-300" style={btnPrimary}>
              Track Your Order
            </button>
            {onBack && (
              <button onClick={onBack} className="w-full py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,100,0.15)', color: textMuted, fontFamily: serif }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.3)'; e.currentTarget.style.color = gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.15)'; e.currentTarget.style.color = textMuted; }}>
                Back to Store
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={bg}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,100,0.04), transparent)' }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-[3px] transition-colors duration-300"
            style={{ color: '#3a3028', fontFamily: serif }}
            onMouseEnter={e => e.currentTarget.style.color = gold}
            onMouseLeave={e => e.currentTarget.style.color = '#3a3028'}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[5px] mb-0.5" style={{ color: 'rgba(212,175,100,0.4)', fontFamily: serif }}>Maison Noir</p>
            <p className="text-lg font-light" style={{ color: textLight, fontFamily: serif }}>Checkout</p>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" style={{ color: '#6a9a6a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span className="text-xs uppercase tracking-[2px]" style={{ color: '#6a9a6a', fontFamily: serif }}>Secure</span>
          </div>
        </div>

        <StepIndicator currentStep={step} />

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* LEFT FORM */}
          <div className="p-8 lg:p-10" style={{ background: goldFaint, border: `1px solid ${goldBorder}` }}>

            {/* STEP 0: DELIVERY */}
            {step === 0 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-light mb-1" style={{ color: textLight, fontFamily: serif }}>Delivery Information</h2>
                  <p className="text-xs uppercase tracking-[3px]" style={{ color: textDim, fontFamily: serif }}>Where should we send your bespoke fragrance?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="Jean" half value={delivery.firstName} onChange={e => setDelivery({...delivery, firstName: e.target.value})} error={errors.firstName} />
                  <Input label="Last Name" placeholder="Dupont" half value={delivery.lastName} onChange={e => setDelivery({...delivery, lastName: e.target.value})} error={errors.lastName} />
                  <Input label="Email Address" placeholder="you@example.com" type="email" value={delivery.email} onChange={e => setDelivery({...delivery, email: e.target.value})} error={errors.email} />
                  <Input label="Phone (Optional)" placeholder="+1 555 000 0000" half value={delivery.phone} onChange={e => setDelivery({...delivery, phone: e.target.value})} />
                  <Input label="Street Address" placeholder="123 Rue de la Paix" value={delivery.address} onChange={e => setDelivery({...delivery, address: e.target.value})} error={errors.address} />
                  <Input label="City" placeholder="Paris" half value={delivery.city} onChange={e => setDelivery({...delivery, city: e.target.value})} error={errors.city} />
                  <Input label="ZIP / Postal Code" placeholder="75001" half value={delivery.zip} onChange={e => setDelivery({...delivery, zip: e.target.value})} error={errors.zip} />
                  <Input label="Country" placeholder="France" half value={delivery.country} onChange={e => setDelivery({...delivery, country: e.target.value})} />
                </div>
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[4px] mb-4" style={{ color: '#4a3f35', fontFamily: serif }}>Shipping Method</p>
                  <div className="space-y-3">
                    {[
                      { id: 'std', label: 'Standard Delivery', sub: '7–10 business days', price: 'Free', free: true },
                      { id: 'exp', label: 'Express Delivery', sub: '2–4 business days', price: '$18', free: false },
                    ].map(opt => (
                      <label key={opt.id} className="flex items-center justify-between p-4 cursor-pointer transition-all duration-300"
                        style={{ background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.08)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,100,0.08)'}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="ship" defaultChecked={opt.id === 'std'} style={{ accentColor: gold }} />
                          <div>
                            <p className="text-sm" style={{ color: '#8a7a6a', fontFamily: serif }}>{opt.label}</p>
                            <p className="text-xs" style={{ color: textDim, fontFamily: serif }}>{opt.sub}</p>
                          </div>
                        </div>
                        <span className="text-xs uppercase tracking-wider" style={{ color: opt.free ? '#6a9a6a' : '#b8955a', fontFamily: serif }}>{opt.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: PAYMENT */}
            {step === 1 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-light mb-1" style={{ color: textLight, fontFamily: serif }}>Payment</h2>
                  <p className="text-xs uppercase tracking-[3px]" style={{ color: textDim, fontFamily: serif }}>All transactions are encrypted and secure</p>
                </div>
                {/* Tabs */}
                <div className="flex gap-1 mb-8 p-1" style={{ background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.1)' }}>
                  {[
                    { id: 'card', label: 'Card' },
                    { id: 'paypal', label: 'PayPal' },
                    { id: 'apple', label: 'Apple Pay' },
                  ].map(m => (
                    <button key={m.id} onClick={() => setPayMethod(m.id)}
                      className="flex-1 py-3 text-xs uppercase tracking-[3px] transition-all duration-200"
                      style={{ background: payMethod === m.id ? 'rgba(212,175,100,0.08)' : 'transparent', border: payMethod === m.id ? '1px solid rgba(212,175,100,0.25)' : '1px solid transparent', color: payMethod === m.id ? gold : '#4a3f35', fontFamily: serif }}>
                      {m.label}
                    </button>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div>
                    <CardVisual cardNum={payment.cardNum} name={payment.name} expiry={payment.expiry} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Card Number" placeholder="1234 5678 9012 3456" value={payment.cardNum} onChange={e => setPayment({...payment, cardNum: formatCard(e.target.value)})} error={errors.cardNum} />
                      <Input label="Name on Card" placeholder="Jean Dupont" value={payment.name} onChange={e => setPayment({...payment, name: e.target.value})} error={errors.name} />
                      <Input label="Expiry Date" placeholder="MM/YY" half value={payment.expiry} onChange={e => setPayment({...payment, expiry: formatExpiry(e.target.value)})} error={errors.expiry} />
                      <Input label="CVV" placeholder="•••" half type="password" value={payment.cvv} onChange={e => setPayment({...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})} error={errors.cvv} />
                    </div>
                    <div className="flex items-center gap-3 mt-6 p-4" style={{ background: 'rgba(100,160,100,0.03)', border: '1px solid rgba(100,160,100,0.15)' }}>
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#6a9a6a' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <p className="text-xs" style={{ color: '#4a5a4a', fontFamily: serif }}>256-bit SSL encryption. We never store your card details.</p>
                    </div>
                  </div>
                )}
                {payMethod === 'paypal' && (
                  <div className="text-center py-12" style={{ border: '1px solid rgba(212,175,100,0.08)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(50,80,150,0.1)', border: '1px solid rgba(50,80,150,0.2)' }}>
                      <svg className="w-7 h-7" style={{ color: '#6080c0' }} fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/></svg>
                    </div>
                    <p className="text-sm mb-1" style={{ color: textMuted, fontFamily: serif }}>You'll be redirected to PayPal</p>
                    <p className="text-xs" style={{ color: textDim, fontFamily: serif }}>Securely complete your payment on PayPal's platform</p>
                  </div>
                )}
                {payMethod === 'apple' && (
                  <div className="text-center py-12" style={{ border: '1px solid rgba(212,175,100,0.08)' }}>
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <svg className="w-7 h-7" style={{ color: '#c0b8b0' }} fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.22 1.3-2.2 3.88.03 3.02 2.65 4.03 2.68 4.04l-.03.14zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    </div>
                    <p className="text-sm mb-1" style={{ color: textMuted, fontFamily: serif }}>Use Touch ID or Face ID</p>
                    <p className="text-xs" style={{ color: textDim, fontFamily: serif }}>Complete with Apple Pay in one tap</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: CONFIRM */}
            {step === 2 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-light mb-1" style={{ color: textLight, fontFamily: serif }}>Review & Confirm</h2>
                  <p className="text-xs uppercase tracking-[3px]" style={{ color: textDim, fontFamily: serif }}>Verify your order before we begin crafting</p>
                </div>
                <div className="space-y-4">
                  {/* Delivery summary */}
                  <div className="p-5" style={{ background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.1)' }}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs uppercase tracking-[3px]" style={{ color: '#4a3f35', fontFamily: serif }}>Delivery To</h4>
                      <button onClick={() => setStep(0)} className="text-xs uppercase tracking-wider transition-colors" style={{ color: textDim, fontFamily: serif }}
                        onMouseEnter={e => e.currentTarget.style.color = gold}
                        onMouseLeave={e => e.currentTarget.style.color = textDim}>Edit</button>
                    </div>
                    <p className="text-sm mb-0.5" style={{ color: '#8a7a6a', fontFamily: serif }}>{delivery.firstName} {delivery.lastName}</p>
                    <p className="text-xs" style={{ color: textDim, fontFamily: serif }}>{delivery.address}, {delivery.city} {delivery.zip}</p>
                    <p className="text-xs" style={{ color: textDim, fontFamily: serif }}>{delivery.email}</p>
                  </div>
                  {/* Payment summary */}
                  <div className="p-5" style={{ background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.1)' }}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs uppercase tracking-[3px]" style={{ color: '#4a3f35', fontFamily: serif }}>Payment</h4>
                      <button onClick={() => setStep(1)} className="text-xs uppercase tracking-wider transition-colors" style={{ color: textDim, fontFamily: serif }}
                        onMouseEnter={e => e.currentTarget.style.color = gold}
                        onMouseLeave={e => e.currentTarget.style.color = textDim}>Edit</button>
                    </div>
                    <p className="text-sm" style={{ color: '#8a7a6a', fontFamily: serif }}>
                      {payMethod === 'card' ? `•••• •••• •••• ${payment.cardNum.replace(/\s/g,'').slice(-4) || '????'}` : payMethod}
                    </p>
                  </div>
                  {/* Items */}
                  <div className="p-5" style={{ background: 'rgba(212,175,100,0.02)', border: '1px solid rgba(212,175,100,0.1)' }}>
                    <h4 className="text-xs uppercase tracking-[3px] mb-4" style={{ color: '#4a3f35', fontFamily: serif }}>Your Order</h4>
                    {[
                      { name: (perfume.archetype?.name || 'Signature') + ' — 50ml EDP', price: '$189' },
                      { name: 'Custom Bottle Engraving', price: '$25' },
                      { name: 'Luxury Gift Box & Ribbon', price: '$18' },
                    ].map(item => (
                      <div key={item.name} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(212,175,100,0.06)' }}>
                        <span className="text-xs" style={{ color: textDim, fontFamily: serif }}>{item.name}</span>
                        <span className="text-xs" style={{ color: '#8a7a6a', fontFamily: serif }}>{item.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3">
                      <span className="text-sm" style={{ color: textLight, fontFamily: serif }}>Total</span>
                      <span className="text-sm" style={{ color: gold, fontFamily: serif }}>$232.00</span>
                    </div>
                  </div>
                  <p className="text-xs text-center leading-relaxed" style={{ color: '#2a2520', fontFamily: serif }}>
                    By placing your order you agree to our Terms of Service. Your perfume is crafted exclusively for you.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8 pt-8" style={{ borderTop: '1px solid rgba(212,175,100,0.08)' }}>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
                  style={{ border: '1px solid rgba(212,175,100,0.15)', color: textMuted, fontFamily: serif }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.3)'; e.currentTarget.style.color = gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.15)'; e.currentTarget.style.color = textMuted; }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
              )}
              {step < 2 ? (
                <button onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-3 py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
                  style={btnPrimary}>
                  {step === 0 ? 'Continue to Payment' : 'Review Order'}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              ) : (
                <button onClick={handlePlaceOrder} disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
                  style={{ ...btnPrimary, opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer' }}>
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      Place Order · $232
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <OrderSummary perfume={perfume} />
        </div>
      </div>
    </div>
  );
};

export default PerfumeCheckout;