import { useState } from 'react';

const serif = 'Georgia, serif';
const gold = '#d4af64';

const faqs = [
  {
    q: 'How does the personalization process work?',
    a: 'Your journey begins with a carefully crafted sensory and personality questionnaire. Rather than selecting notes manually, your responses guide our formulation process. Each fragrance is then composed to reflect your identity, preferences, and emotional universe — creating a scent that feels instinctively yours.',
  },
  {
    q: 'How are my fragrance notes determined?',
    a: 'Your answers are analyzed to create a balanced and harmonious olfactory composition. The notes are revealed to you once your fragrance has been crafted — allowing for a moment of discovery that is part of the experience itself.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Every fragrance is created exclusively after your order is placed. Please allow 5 to 7 business days for production and delivery.',
  },
  {
    q: 'Is each perfume truly unique?',
    a: 'Yes. Each formula is generated individually based on your personal profile, ensuring a fragrance that reflects your distinct identity and preferences.',
  },
  {
    q: 'Can I reorder my personalized fragrance?',
    a: 'Absolutely. Your unique formula is securely archived, allowing you to reorder your signature scent whenever you wish.',
  },
  {
    q: 'Are the perfumes long-lasting?',
    a: 'We use high-quality fragrance oils in a concentrated formula designed for depth, elegance, and lasting presence.',
  },
  {
    q: 'What if there is an issue with my order?',
    a: 'As each fragrance is custom-made, refunds are not available. However, if your product arrives damaged or defective, we will gladly arrange a replacement.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq-section"
      style={{
        background: '#0c0a08',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Atmospheric top border */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(212,175,100,0.2), transparent)',
      }} />

      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(212,175,100,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{
            fontSize: '0.6rem',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#c4a55a',
            fontFamily: serif,
            marginBottom: '1.25rem',
          }}>
            Questions
          </p>
          <h2 style={{
            fontFamily: serif,
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 50%, #e8d5a3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 1.25rem',
            lineHeight: 1.15,
          }}>
            Frequently Asked
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            <div style={{ height: '1px', width: '3rem', background: `linear-gradient(to right, transparent, ${gold}50)` }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: gold, opacity: 0.4 }} />
            <div style={{ height: '1px', width: '3rem', background: `linear-gradient(to left, transparent, ${gold}50)` }} />
          </div>
        </div>

        {/* ── FAQ Items ── */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? '1px solid rgba(212,175,100,0.1)' : 'none',
                  borderBottom: '1px solid rgba(212,175,100,0.1)',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '28px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '2rem',
                    textAlign: 'left',
                  }}
                >
                  {/* Number + Question */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
                    <span style={{
                      fontFamily: serif,
                      fontSize: '0.6rem',
                      letterSpacing: '2px',
                      color: isOpen ? gold : 'rgba(212,175,100,0.25)',
                      transition: 'color 0.3s ease',
                      flexShrink: 0,
                      userSelect: 'none',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: serif,
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                      fontWeight: 300,
                      color: isOpen ? '#f5f0e8' : '#9a8a7a',
                      letterSpacing: '0.5px',
                      lineHeight: 1.5,
                      transition: 'color 0.3s ease',
                    }}>
                      {faq.q}
                    </span>
                  </div>

                  {/* Icon */}
                  <div style={{
                    flexShrink: 0,
                    width: '28px',
                    height: '28px',
                    border: `1px solid ${isOpen ? 'rgba(212,175,100,0.4)' : 'rgba(212,175,100,0.12)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <line x1="5" y1="0" x2="5" y2="10" stroke={isOpen ? gold : 'rgba(212,175,100,0.4)'} strokeWidth="1"/>
                      <line x1="0" y1="5" x2="10" y2="5" stroke={isOpen ? gold : 'rgba(212,175,100,0.4)'} strokeWidth="1"/>
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '300px' : '0px',
                  transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <p style={{
                    fontFamily: serif,
                    fontSize: '0.875rem',
                    color: '#7a6a5a',
                    lineHeight: 1.9,
                    paddingBottom: '28px',
                    paddingLeft: 'calc(1.25rem + 0.6rem * 2)',  // aligns under the question text
                    margin: 0,
                    letterSpacing: '0.3px',
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Atmospheric bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to top, rgba(12,10,8,0.6), transparent)',
        pointerEvents: 'none',
      }} />
    </section>
  );
};

export default FAQSection;