import { useState } from 'react';

const PartnerQuiz = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // ── Same archetypes & result engine as PerfumeQuiz ──────────────────────
  const archetypes = {
    muse: {
      name: 'The Muse',
      description: 'Deep, mysterious, and sensual. They inspire others with their creative depth and introspective nature.',
      heartNotes: ['Jasmine', 'Peony', 'Orange Blossom'],
      trait: 'Creative & Introspective',
    },
    catalyst: {
      name: 'The Catalyst',
      description: 'Confident, bold, and powerful. They motivate others and leave a lasting impression wherever they go.',
      heartNotes: ['Rose', 'Tuberose', 'Ylang-Ylang'],
      trait: 'Passionate & Expressive',
    },
    harmony: {
      name: 'The Harmony',
      description: 'Calm, composed, and serene. They bring balance and comfort to those around them.',
      heartNotes: ['Lavender', 'Lily of the Valley', 'Freesia'],
      trait: 'Calm & Balanced',
    },
    free_spirit: {
      name: 'The Free Spirit',
      description: 'Free, alive, and energetic. They embrace life with spontaneity and infectious enthusiasm.',
      heartNotes: ['Neroli', 'Magnolia', 'Iris'],
      trait: 'Free & Adventurous',
    },
  };

  // ── Partner-focused questions (same structure, different wording) ─────────
  const questions = [
    // Q0 — Emotional tone only (no archetype, no noteModifier)
    {
      id: 1, category: 'tone',
      question: "Who is this perfume for?",
      options: [
        { text: 'Partner', value: 'partner' },
        { text: 'Friend', value: 'friend' },
        { text: 'Family member', value: 'family' },
        { text: 'Someone special', value: 'special' },
      ],
    },
    // Q1 — Variable: gender/expression
    {
      id: 2, category: 'variable',
      question: "How do you want this perfume to express itself?",
      options: [
        { text: 'Feminine', value: 'feminine', noteModifier: 'feminine' },
        { text: 'Masculine', value: 'masculine', noteModifier: 'masculine' },
        { text: 'Unisex', value: 'unisex', noteModifier: 'unisex' },
      ],
    },
    // Q2 — Archetype: core heart notes
    {
      id: 3, category: 'archetype',
      question: "How would you describe them in one word?",
      options: [
        { text: 'Gentle & calm', value: 'gentle', archetype: 'harmony' },
        { text: 'Confident & bold', value: 'confident', archetype: 'catalyst' },
        { text: 'Free-spirited & energetic', value: 'free', archetype: 'free_spirit' },
        { text: 'Deep & mysterious', value: 'deep', archetype: 'muse' },
      ],
    },
    // Q3 — Archetype: refines heart notes
    {
      id: 4, category: 'archetype',
      question: "How do they usually show up in a room?",
      options: [
        { text: 'Quiet presence', value: 'quiet', archetype: 'harmony' },
        { text: 'Natural leader', value: 'leader', archetype: 'catalyst' },
        { text: 'Observant & reserved', value: 'observer', archetype: 'muse' },
        { text: 'Effortlessly adaptable', value: 'adaptable', archetype: 'free_spirit' },
      ],
    },
    // Q4 — Variable: base note warmth/freshness
    {
      id: 5, category: 'variable',
      question: "What kind of energy do you associate with them?",
      options: [
        { text: 'Comforting', value: 'comforting', noteModifier: 'subtle', family: 'floral' },
        { text: 'Powerful', value: 'powerful', noteModifier: 'bold', family: 'woody' },
        { text: 'Fresh & uplifting', value: 'fresh', noteModifier: 'soft', family: 'fresh' },
        { text: 'Intense & sensual', value: 'sensual', noteModifier: 'noticeable', family: 'oriental' },
      ],
    },
    // Q5 — Variable: time/occasion
    {
      id: 6, category: 'variable',
      question: "When do you imagine them wearing this perfume?",
      options: [
        { text: 'Every day', value: 'daily', noteModifier: 'daily' },
        { text: 'Special occasions', value: 'special', noteModifier: 'special' },
        { text: 'Evenings / nights', value: 'night', noteModifier: 'night' },
        { text: 'Whenever they feel like it', value: 'versatile', noteModifier: 'versatile' },
      ],
    },
    // Q6 — Archetype: emotional message, locks archetype
    {
      id: 7, category: 'archetype',
      question: "What do you want this gift to say?",
      subtitle: "Choose the message that feels most true",
      options: [
        { text: '"I see you."', value: 'see', archetype: 'muse' },
        { text: '"You inspire me."', value: 'inspire', archetype: 'catalyst' },
        { text: '"You make me feel safe."', value: 'safe', archetype: 'harmony' },
        { text: '"You are unforgettable."', value: 'unforgettable', archetype: 'free_spirit' },
      ],
    },
  ];

  const getNotes = (archetype, variables) => {
    const { family, time, intensity } = variables;
    let topNotes = [];
    if (family === 'fresh' || time === 'daily') topNotes = ['Bergamot', 'Grapefruit', 'Lemon'];
    else if (family === 'floral') topNotes = ['Bergamot', 'Pink Pepper', 'Pear'];
    else if (family === 'woody') topNotes = ['Cardamom', 'Black Pepper', 'Juniper'];
    else if (family === 'oriental') topNotes = ['Saffron', 'Cinnamon', 'Pink Pepper'];
    else if (time === 'night') topNotes = ['Bergamot', 'Juniper', 'Pink Pepper'];
    else topNotes = ['Bergamot', 'Lemon', 'Green Tea'];
    let baseNotes = [];
    if (intensity === 'bold' || intensity === 'noticeable') {
      if (family === 'woody') baseNotes = ['Cedarwood', 'Sandalwood', 'Patchouli'];
      else if (family === 'oriental') baseNotes = ['Amber', 'Vanilla', 'Oud'];
      else baseNotes = ['Soft White Musk', 'Cedarwood', 'Vanilla'];
    } else if (intensity === 'subtle' || intensity === 'soft') {
      baseNotes = ['Soft White Musk', 'Sandalwood', 'Tonka Bean'];
    } else {
      baseNotes = ['Soft White Musk', 'Sandalwood', 'Vanilla'];
    }
    return { top: topNotes, heart: archetypes[archetype].heartNotes, base: baseNotes };
  };

  const calculateResults = () => {
    // Archetype votes come from Q2 (idx 2), Q3 (idx 3), Q6 (idx 6)
    const archetypeVotes = {};
    [2, 3, 6].forEach((qIndex) => {
      const answer = answers[qIndex];
      if (answer?.archetype) archetypeVotes[answer.archetype] = (archetypeVotes[answer.archetype] || 0) + 1;
    });
    const dominantArchetype = Object.entries(archetypeVotes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'muse';

    // Q1 = gender, Q4 = intensity + family, Q5 = time
    const variables = {
      gender: answers[1]?.noteModifier || 'unisex',
      time: answers[5]?.noteModifier || 'versatile',
      intensity: answers[4]?.noteModifier || 'soft',
      family: answers[4]?.family || 'fresh',
    };
    const notes = getNotes(dominantArchetype, variables);

    // Emotional message from Q6
    const messages = {
      see: 'A scent as perceptive and layered as they are.',
      inspire: 'A scent that moves as boldly as they do.',
      safe: 'A scent as warm and grounding as their presence.',
      unforgettable: 'A scent that lingers long after they leave the room.',
    };
    const emotionalMessage = messages[answers[6]?.value] || '';

    return {
      archetype: archetypes[dominantArchetype],
      variables,
      notes,
      emotionalMessage,
      profile: `${variables.gender.charAt(0).toUpperCase() + variables.gender.slice(1)} · ${variables.time.charAt(0).toUpperCase() + variables.time.slice(1)} · ${variables.intensity.charAt(0).toUpperCase() + variables.intensity.slice(1)} · ${variables.family.charAt(0).toUpperCase() + variables.family.slice(1)}`,
      isPartnerGift: true,
    };
  };

  const handleAnswer = (option) => setSelectedAnswer(option);
  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentStep]: selectedAnswer });
      if (currentStep === questions.length - 1) setShowResults(true);
      else { setCurrentStep(currentStep + 1); setSelectedAnswer(answers[currentStep + 1] || null); }
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) { setCurrentStep(currentStep - 1); setSelectedAnswer(answers[currentStep - 1] || null); }
  };
  const handleRestart = () => { setCurrentStep(0); setAnswers({}); setSelectedAnswer(null); setShowResults(false); };

  const results = showResults ? calculateResults() : null;
  const progress = (Object.keys(answers).length / questions.length) * 100;

  // ── RESULTS SCREEN ──────────────────────────────────────────────────────
  if (showResults && results) {
    return (
      <div className="min-h-screen py-20 px-6" style={{ background: '#0c0a08' }}>
        <div className="max-w-4xl mx-auto">

          {/* Gift ribbon banner */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,100,0.25))' }} />
            <div className="flex items-center gap-2 px-5 py-2" style={{ border: '1px solid rgba(212,175,100,0.2)', background: 'rgba(212,175,100,0.03)' }}>
              <svg className="w-3.5 h-3.5" style={{ color: '#d4af64' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs uppercase tracking-[4px]" style={{ color: '#c4a55a', fontFamily: 'Georgia, serif' }}>Crafted With Love</span>
            </div>
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,100,0.25))' }} />
          </div>

          <div className="p-8 lg:p-12" style={{ background: 'rgba(212,175,100,0.03)', border: '1px solid rgba(212,175,100,0.12)' }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, #d4af64)' }} />
                <span className="text-xs uppercase tracking-[4px]" style={{ color: '#c4a55a', fontFamily: 'Georgia, serif' }}>Their Perfect Scent</span>
                <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, #d4af64)' }} />
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-4" style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, #f5f0e8, #d4af64, #e8d5a3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {results.archetype.name}
              </h2>
              <p className="text-base max-w-2xl mx-auto mb-3" style={{ color: '#6a5a4a', fontFamily: 'Georgia, serif', lineHeight: '1.8' }}>
                {results.archetype.description}
              </p>
              {results.emotionalMessage && (
                <p className="text-sm max-w-xl mx-auto mb-5 italic" style={{ color: '#c4a55a', fontFamily: 'Georgia, serif', lineHeight: '1.7' }}>
                  {results.emotionalMessage}
                </p>
              )}
              <span className="text-xs uppercase tracking-[3px] px-5 py-1.5" style={{ color: '#b8955a', border: '1px solid rgba(212,175,100,0.2)', fontFamily: 'Georgia, serif' }}>
                {results.profile}
              </span>
            </div>

            <div className="space-y-4 mb-12">
              {[
                { label: 'Top Notes', sub: 'Opening · First Impression', notes: results.notes.top, highlight: false },
                { label: 'Heart Notes', sub: 'Core · Their Archetype DNA', notes: results.notes.heart, highlight: true },
                { label: 'Base Notes', sub: 'Dry-down · Memory & Trail', notes: results.notes.base, highlight: false },
              ].map(({ label, sub, notes, highlight }) => (
                <div key={label} className="p-6" style={{ background: highlight ? 'rgba(212,175,100,0.05)' : 'rgba(212,175,100,0.02)', border: `1px solid ${highlight ? 'rgba(212,175,100,0.25)' : 'rgba(212,175,100,0.08)'}` }}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-base font-light" style={{ color: '#e8d5a3', fontFamily: 'Georgia, serif' }}>{label}</h3>
                    <span className="text-xs" style={{ color: '#4a3f35', fontFamily: 'Georgia, serif' }}>{sub}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {notes.map((note, i) => (
                      <span key={i} className="px-4 py-1.5 text-xs uppercase tracking-widest" style={{ color: highlight ? '#d4af64' : '#8a7a6a', border: `1px solid ${highlight ? 'rgba(212,175,100,0.3)' : 'rgba(212,175,100,0.12)'}`, fontFamily: 'Georgia, serif' }}>
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRestart}
                className="px-8 py-4 text-xs uppercase tracking-[3px] transition-all duration-300"
                style={{ border: '1px solid rgba(212,175,100,0.2)', color: '#8a7a6a', fontFamily: 'Georgia, serif' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.4)'; e.currentTarget.style.color = '#d4af64'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,100,0.2)'; e.currentTarget.style.color = '#8a7a6a'; }}
              >
                Retake Quiz
              </button>
              <button
                onClick={() => onComplete && onComplete(results)}
                className="group relative px-10 py-4 text-xs uppercase tracking-[3px] overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #c4a044, #d4af64, #b8955a)', color: '#0c0a08', fontFamily: 'Georgia, serif', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)', boxShadow: '0 8px 30px rgba(212,175,100,0.2)' }}
              >
                Gift This Perfume
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen py-20 px-6" style={{ background: '#0c0a08' }}>
      <div className="max-w-3xl mx-auto">

        {/* Gift context banner */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <svg className="w-4 h-4" style={{ color: 'rgba(212,175,100,0.4)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs uppercase tracking-[4px]" style={{ color: '#4a3f35', fontFamily: 'Georgia, serif' }}>
            Creating a gift for your partner
          </span>
          <svg className="w-4 h-4" style={{ color: 'rgba(212,175,100,0.4)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[4px]" style={{ color: '#5a4f45', fontFamily: 'Georgia, serif' }}>Question {currentStep + 1} of {questions.length}</span>
            <span className="text-xs tracking-widest" style={{ color: '#5a4f45', fontFamily: 'Georgia, serif' }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-px w-full" style={{ background: 'rgba(212,175,100,0.08)' }}>
            <div className="h-full transition-all duration-500 ease-out" style={{ width: `${progress}%`, background: 'linear-gradient(to right, #b8955a, #d4af64)' }} />
          </div>
        </div>

        <div className="p-8 lg:p-12" style={{ background: 'rgba(212,175,100,0.03)', border: '1px solid rgba(212,175,100,0.12)' }}>
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-1 h-1 rounded-full" style={{ background: '#d4af64' }} />
              <span className="text-xs uppercase tracking-[4px]" style={{ color: '#7a6a5a', fontFamily: 'Georgia, serif' }}>
                {questions[currentStep].category === 'archetype' ? 'Defines Their Essence' : questions[currentStep].category === 'tone' ? 'Sets The Intention' : 'Personalizes Their Scent'}
              </span>
              <div className="w-1 h-1 rounded-full" style={{ background: '#d4af64' }} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-light mb-3" style={{ fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, #f5f0e8, #d4af64)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {questions[currentStep].question}
            </h2>
            {questions[currentStep].subtitle && (
              <p className="text-sm italic" style={{ color: '#5a4f45', fontFamily: 'Georgia, serif' }}>{questions[currentStep].subtitle}</p>
            )}
          </div>

          <div className="space-y-3 mb-10">
            {questions[currentStep].options.map((option) => {
              const isSelected = selectedAnswer?.value === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option)}
                  className="w-full p-5 text-left flex items-center gap-4 transition-all duration-300"
                  style={{ background: isSelected ? 'rgba(212,175,100,0.08)' : 'rgba(212,175,100,0.02)', border: `1px solid ${isSelected ? 'rgba(212,175,100,0.4)' : 'rgba(212,175,100,0.08)'}` }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = 'rgba(212,175,100,0.04)'; e.currentTarget.style.borderColor = 'rgba(212,175,100,0.2)'; }}}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = 'rgba(212,175,100,0.02)'; e.currentTarget.style.borderColor = 'rgba(212,175,100,0.08)'; }}}
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 rounded-full transition-all duration-300"
                    style={{ border: isSelected ? '1px solid #d4af64' : '1px solid rgba(212,175,100,0.2)', background: isSelected ? '#d4af64' : 'transparent' }}>
                    {isSelected && (
                      <svg className="w-3 h-3" style={{ color: '#0c0a08' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm tracking-wide" style={{ color: isSelected ? '#e8d5a3' : '#6a5a4a', fontFamily: 'Georgia, serif', transition: 'color 0.3s' }}>
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-6" style={{ borderTop: '1px solid rgba(212,175,100,0.08)' }}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[3px] transition-all duration-300"
              style={{ color: currentStep === 0 ? '#2a2520' : '#6a5a4a', fontFamily: 'Georgia, serif', cursor: currentStep === 0 ? 'not-allowed' : 'pointer', background: 'none', border: 'none' }}
              onMouseEnter={e => { if (currentStep > 0) e.currentTarget.style.color = '#d4af64'; }}
              onMouseLeave={e => { if (currentStep > 0) e.currentTarget.style.color = '#6a5a4a'; }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex items-center gap-3 px-8 py-3 text-xs uppercase tracking-[3px] transition-all duration-300"
              style={{ background: selectedAnswer ? 'linear-gradient(135deg, #c4a044, #d4af64)' : 'rgba(212,175,100,0.05)', color: selectedAnswer ? '#0c0a08' : '#3a3028', fontFamily: 'Georgia, serif', cursor: selectedAnswer ? 'pointer' : 'not-allowed', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)', border: 'none' }}
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next Question'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-xs uppercase tracking-[3px]" style={{ color: '#2a2520', fontFamily: 'Georgia, serif' }}>
          Your answers help us craft their perfect signature scent
        </p>
      </div>
    </div>
  );
};

export default PartnerQuiz;