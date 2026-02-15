const QuizIntro = ({ onStartQuiz }) => {
  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0c0a08, #110e0a, #0c0a08)' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,100,0.06) 0%, transparent 70%)' }} className="absolute inset-0" />
        <div style={{ background: 'radial-gradient(ellipse 40% 30% at 20% 100%, rgba(180,120,80,0.04) 0%, transparent 70%)' }} className="absolute inset-0" />
        <div style={{ background: 'radial-gradient(ellipse 40% 30% at 80% 100%, rgba(212,175,100,0.04) 0%, transparent 70%)' }} className="absolute inset-0" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,100,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,100,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #d4af64)' }} />
            <span className="text-xs uppercase tracking-[5px]" style={{ color: '#c4a55a', fontFamily: 'Georgia, serif' }}>
              Personalized Experience
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #d4af64)' }} />
          </div>

          {/* Heading */}
          <h2
            className="text-5xl lg:text-7xl font-light tracking-tight mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #f5f0e8 0%, #d4af64 50%, #e8d5a3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Discover Your
            </span>
            <span
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #d4af64 0%, #f5f0e8 60%, #b8955a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Signature Scent
            </span>
          </h2>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,100,0.4))' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="6" y="0" width="4" height="4" transform="rotate(45 8 2)" fill="none" stroke="rgba(212,175,100,0.5)" strokeWidth="0.8"/>
              <circle cx="8" cy="8" r="2" fill="rgba(212,175,100,0.4)"/>
              <rect x="6" y="10" width="4" height="4" transform="rotate(45 8 14)" fill="none" stroke="rgba(212,175,100,0.5)" strokeWidth="0.8"/>
            </svg>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,100,0.4))' }} />
          </div>

          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#6a5a4a', fontFamily: 'Georgia, serif', lineHeight: '1.9' }}
          >
            Answer 9 thoughtful questions about your personality, preferences, and essence.
            Our intelligent system will reveal your unique fragrance archetype and craft a bespoke scent profile.
          </p>
        </div>

        {/* ── FEATURES GRID ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              number: '01',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              ),
              title: 'Archetype Discovery',
              description: 'Unlock one of four unique fragrance personalities that define your essence',
            },
            {
              number: '02',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              ),
              title: 'Custom Note Selection',
              description: 'Your choices determine top, heart, and base notes for a truly personal fragrance',
            },
            {
              number: '03',
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: 'Instant Results',
              description: 'Get your complete fragrance profile in under 2 minutes',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 transition-all duration-500"
              style={{
                background: 'rgba(212,175,100,0.02)',
                border: '1px solid rgba(212,175,100,0.1)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(212,175,100,0.05)';
                e.currentTarget.style.borderColor = 'rgba(212,175,100,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(212,175,100,0.02)';
                e.currentTarget.style.borderColor = 'rgba(212,175,100,0.1)';
              }}
            >
              {/* Number */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-4xl font-light opacity-20"
                  style={{ color: '#d4af64', fontFamily: 'Georgia, serif', lineHeight: 1 }}
                >
                  {feature.number}
                </span>
                <div
                  className="flex items-center justify-center w-10 h-10 transition-all duration-300 group-hover:scale-110"
                  style={{ color: '#d4af64' }}
                >
                  {feature.icon}
                </div>
              </div>
              <h3
                className="text-lg font-light mb-3"
                style={{ color: '#e8d5a3', fontFamily: 'Georgia, serif' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#5a4f45', fontFamily: 'Georgia, serif', lineHeight: '1.8' }}
              >
                {feature.description}
              </p>
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M24 0 L24 24 L0 24" stroke="#d4af64" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="group relative inline-flex items-center gap-5 px-14 py-5 text-sm uppercase tracking-[4px] overflow-hidden transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)',
              color: '#0c0a08',
              fontFamily: 'Georgia, serif',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              boxShadow: '0 8px 40px rgba(212,175,100,0.2)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 50px rgba(212,175,100,0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(212,175,100,0.2)'}
          >
            <span className="relative z-10 font-medium">Begin Your Journey</span>
            <svg
              className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #d4af64, #e8c97a, #c4a044)' }}
            />
          </button>

          <p
            className="mt-5 text-xs uppercase tracking-[3px]"
            style={{ color: '#3a3028', fontFamily: 'Georgia, serif' }}
          >
            Takes less than 2 minutes &nbsp;·&nbsp; No account required
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuizIntro;