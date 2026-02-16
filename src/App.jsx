import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuizIntro from './components/QuizIntro';
import PerfumeQuiz from './components/PerfumeQuiz';
import PartnerQuiz from './components/PartnerQuiz';
import BoxCustomizer from './components/BoxCustomizer';
import PerfumeCheckout from './components/PerfumeCheckout';
import AboutPage from './components/AboutPage';
import LegalPage from './components/LegalPage';
import AuthPage from './components/AuthPage';
import FAQSection from './components/FAQSection';
import GiftBoxCustomizer from './components/GiftBoxCustomizer';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'quiz' | 'partnerQuiz' | 'boxCustomizer' | 'giftBoxCustomizer' | 'checkout' | 'about' | 'legal' | 'auth'
  const [perfumeResults, setPerfumeResults] = useState(null);

  const handleNavigate = (destination) => {
    setPage(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => handleNavigate('quiz');
  const handleStartPartnerQuiz = () => handleNavigate('partnerQuiz');

  // Auth success → go home
  const handleAuthSuccess = () => {
    handleNavigate('home');
  };

  // Quiz done → route to the right box customizer
  const handleQuizComplete = (results) => {
    setPerfumeResults(results);
    handleNavigate(results.isPartnerGift ? 'giftBoxCustomizer' : 'boxCustomizer');
  };

  // Box done → go to checkout (results now include boxCustomization)
  const handleBoxComplete = (resultsWithBox) => {
    setPerfumeResults(resultsWithBox);
    handleNavigate('checkout');
  };

  const handleBackFromBox = () => {
    handleNavigate(perfumeResults?.isPartnerGift ? 'partnerQuiz' : 'quiz');
  };

  const handleBackFromCheckout = () => {
    handleNavigate(perfumeResults?.isPartnerGift ? 'giftBoxCustomizer' : 'boxCustomizer');
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} currentPage={page} />

      {/* ── HOME ── */}
      {page === 'home' && (
        <>
          <Hero />
          <QuizIntro
            onStartQuiz={handleStartQuiz}
            onStartPartnerQuiz={handleStartPartnerQuiz}
          />
          <FAQSection />
        </>
      )}

      {/* ── MY OWN PERFUME FLOW ── */}
      {page === 'quiz' && (
        <PerfumeQuiz onComplete={handleQuizComplete} />
      )}

      {/* ── PARTNER GIFT FLOW ── */}
      {page === 'partnerQuiz' && (
        <PartnerQuiz onComplete={handleQuizComplete} />
      )}

      {/* ── BOX CUSTOMIZER (my own perfume flow) ── */}
      {page === 'boxCustomizer' && (
        <BoxCustomizer
          perfumeResults={perfumeResults}
          onContinue={handleBoxComplete}
          onBack={handleBackFromBox}
        />
      )}

      {/* ── GIFT BOX CUSTOMIZER (partner gift flow) ── */}
      {page === 'giftBoxCustomizer' && (
        <GiftBoxCustomizer
          perfumeResults={perfumeResults}
          onContinue={handleBoxComplete}
          onBack={handleBackFromBox}
        />
      )}

      {/* ── CHECKOUT ── */}
      {page === 'checkout' && (
        <PerfumeCheckout
          perfumeResults={perfumeResults}
          onBack={handleBackFromCheckout}
        />
      )}

      {/* ── STATIC PAGES ── */}
      {page === 'about' && <AboutPage onNavigate={handleNavigate} />}
      {page === 'legal' && <LegalPage />}

      {/* ── AUTH PAGE ── */}
      {page === 'auth' && (
        <AuthPage
          onNavigate={handleNavigate}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}