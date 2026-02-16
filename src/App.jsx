import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuizIntro from './components/Quizintro';
import PerfumeQuiz from './components/Perfumequiz';
import PartnerQuiz from './components/Partnerquiz';
import BoxCustomizer from './components/Boxcustomizer';
import PerfumeCheckout from './components/Perfumecheckout';
import AboutPage from './components/Aboutpage';
import LegalPage from './components/Legalpage';
import AuthPage from './components/Authpage';
import FAQSection from './components/Faqsection';
import ContactPage from './components/Contactpage';
import GiftBoxCustomizer from './components/Giftboxcustomizer';

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'quiz' | 'partnerQuiz' | 'boxCustomizer' | 'giftBoxCustomizer' | 'checkout' | 'about' | 'legal' | 'auth' | 'contact'
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
      {page === 'contact' && <ContactPage />}

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