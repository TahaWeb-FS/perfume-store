import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuizIntro from './components/QuizIntro';
import PerfumeQuiz from './components/PerfumeQuiz';
import PerfumeCheckout from './components/PerfumeCheckout';

export default function App() {
  const [screen, setScreen] = useState('home');         // 'home' | 'quiz' | 'checkout'
  const [perfumeResults, setPerfumeResults] = useState(null);

  const handleStartQuiz = () => setScreen('quiz');

  const handleQuizComplete = (results) => {
    setPerfumeResults(results);
    setScreen('checkout');
  };

  const handleBackFromCheckout = () => setScreen('quiz');

  return (
    <div>
      <Navbar />

      {screen === 'home' && (
        <>
          <Hero />
          <QuizIntro onStartQuiz={handleStartQuiz} />
        </>
      )}

      {screen === 'quiz' && (
        <PerfumeQuiz onComplete={handleQuizComplete} />
      )}

      {screen === 'checkout' && (
        <PerfumeCheckout
          perfumeResults={perfumeResults}
          onBack={handleBackFromCheckout}
        />
      )}
    </div>
  );
}