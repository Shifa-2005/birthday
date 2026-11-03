import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Page2CatSurprise({ onNext, onBack }) {
  const [bubuState, setBubuState] = useState('question'); // 'question' | 'angry' | 'happy'
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  // Playfully move the NO button away when he hovers or touches it
  const handleNoDodge = () => {
    soundManager.playPop();
    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);

    // Calculate dynamic playful evasion offsets within screen bounds
    const angle = Math.random() * Math.PI * 2;
    const distance = 85 + Math.random() * 85;
    const newX = Math.cos(angle) * distance;
    const newY = Math.sin(angle) * (distance * 0.75);

    setNoOffset({
      x: Math.max(-130, Math.min(130, newX)),
      y: Math.max(-90, Math.min(90, newY)),
    });
  };

  // If he manages to actually click NO
  const handleNoClick = (e) => {
    e.stopPropagation();
    soundManager.playPop();
    setBubuState('angry');
  };

  // When YES is clicked: celebration animation + confetti
  const handleYes = () => {
    soundManager.playCelebration();
    confetti({
      particleCount: 85,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#f8c8d5', '#72173e', '#ffd1dc', '#fff5eb', '#f07b46', '#e6859f'],
    });
    setBubuState('happy');
  };

  // Reset back to Question state
  const handleTryAgain = () => {
    soundManager.playPop();
    setNoOffset({ x: 0, y: 0 });
    setBubuState('question');
  };

  // Dynamic playful hint messages when NO runs away
  const getDodgeHint = () => {
    if (dodgeCount === 0) return 'Think very carefully before clicking... 🐻❤️';
    if (dodgeCount === 1) return 'Hey! You can’t click NO! 😜';
    if (dodgeCount === 2) return 'Nope! Over here! 🙈';
    if (dodgeCount === 3) return 'Ghuggu, why are you chasing NO?! 🐻';
    if (dodgeCount === 4) return 'There is only ONE right answer! 🥰';
    return 'Give up and just click YES! ❤️';
  };

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-[#fff6f8] via-[#fce7ec] to-[#f8c8d5] text-[#3b0c20] flex flex-col justify-between items-center px-4 py-5 sm:py-6 select-none">
      
      {/* Background Soft Glow & Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f8c8d5]/40 rounded-full blur-[90px]" />
        <div className="absolute bottom-10 left-10 text-2xl opacity-25 animate-pulse">🐻</div>
        <div className="absolute top-16 right-12 text-2xl opacity-25 animate-bounce">💖</div>
        <div className="absolute bottom-20 right-16 text-xl opacity-25">✨</div>
      </div>

      {/* Top Header / Back Button */}
      <div className="relative z-20 w-full max-w-xl flex items-center justify-between shrink-0">
        {onBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#54112e] text-xs font-serif shadow-xs border border-[#f8c8d5] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
        <div className="px-3.5 py-1 rounded-full bg-white/90 border border-[#f8c8d5] text-[11px] font-handwriting font-bold text-[#72173e] shadow-xs flex items-center gap-1.5">
          <span>🐻 Bubu & Dudu Surprise</span>
          <span>🎁</span>
        </div>
      </div>

      {/* Main Center Area */}
      <div className="relative z-20 w-full max-w-lg flex flex-col items-center justify-center my-auto min-h-0">
        <AnimatePresence mode="wait">
          
          {/* 1. INITIAL QUESTION STATE (Actual Bubu & Dudu from Reference) */}
          {bubuState === 'question' && (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Question Heading from Reference */}
              <div className="mb-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#72173e]">
                  I made something special for you ❤️
                </h3>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3b0c20] leading-snug mt-0.5">
                  Ready for your birthday surprise, Ghuggu? 🥺
                </h2>
              </div>

              {/* Real Animated Bubu Character from Reference Video */}
              <div className="relative my-2 flex flex-col items-center">
                {/* Floating hearts */}
                <motion.div
                  animate={{ y: [-4, -14, -4], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="absolute -top-3 left-4 text-base sm:text-lg z-20 pointer-events-none"
                >
                  🧡
                </motion.div>
                <motion.div
                  animate={{ y: [-2, -12, -2], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.1, delay: 0.4, ease: 'easeInOut' }}
                  className="absolute -top-4 right-6 text-base sm:text-lg z-20 pointer-events-none"
                >
                  💖
                </motion.div>

                {/* Actual Bubu from Reference Video */}
                <div className="w-60 sm:w-72 h-40 sm:h-48 rounded-2xl overflow-hidden flex items-center justify-center filter drop-shadow-md bg-white/40 border border-white/60 p-2">
                  <img
                    src="/moments/animations/bubu-dudu-question.gif"
                    alt="Bubu and Dudu Birthday Surprise"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Playful Evasion Hint */}
              <p className="font-handwriting text-base sm:text-lg text-[#72173e] font-bold mb-5 min-h-[26px]">
                {getDodgeHint()}
              </p>

              {/* Interactive YES & Moving NO Buttons */}
              <div className="relative flex items-center justify-center gap-6 w-full max-w-xs min-h-[60px]">
                
                {/* YES ❤️ Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleYes}
                  className="py-3 px-8 rounded-full font-serif font-bold text-base text-white bg-gradient-to-r from-[#e7623b] via-[#f07b46] to-[#e7623b] shadow-lg shadow-[#e7623b]/35 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-white"
                >
                  <span>YES</span>
                  <span className="text-lg">❤️</span>
                </motion.button>

                {/* NO 🙈 Button with playful moving evasion */}
                <motion.div
                  animate={{ x: noOffset.x, y: noOffset.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="relative"
                >
                  <button
                    onMouseEnter={handleNoDodge}
                    onTouchStart={handleNoDodge}
                    onClick={handleNoClick}
                    className="py-3 px-8 rounded-full font-serif font-bold text-base text-white bg-gradient-to-r from-[#d95d41] to-[#c84d32] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-white select-none whitespace-nowrap"
                  >
                    <span>NO</span>
                    <span className="text-lg">🙈</span>
                  </button>
                </motion.div>

              </div>
            </motion.div>
          )}

          {/* 2. ANGRY STATE: If he manages to click NO */}
          {bubuState === 'angry' && (
            <motion.div
              key="angry-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: [-10, 10, -6, 6, -3, 3, 0],
              }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Text from Reference */}
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#c84d32] mb-1 tracking-tight">
                Why did u click no!? 🥺
              </h2>

              <p className="font-handwriting text-base sm:text-xl text-[#3b0c20] font-bold max-w-xs mb-2">
                There is NO "no" option for Ghuggu! You HAVE to see your surprise! 💢
              </p>

              {/* Actual Animated Angry Bubu from Reference */}
              <div className="relative my-2 w-60 sm:w-72 h-44 sm:h-52 rounded-2xl overflow-hidden flex items-center justify-center filter drop-shadow-lg bg-white/40 border border-white/60 p-2">
                <img
                  src="/moments/animations/bubu-dudu-angry.gif"
                  alt="Why did you click no!"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Exact TRY AGAIN Button from Reference */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleTryAgain}
                className="mt-3 py-3 px-9 rounded-full font-serif font-bold text-base text-white bg-gradient-to-r from-[#e7623b] to-[#d95d41] shadow-lg shadow-[#e7623b]/35 flex items-center gap-2 cursor-pointer border-2 border-white"
              >
                <RotateCcw className="w-4 h-4" />
                <span>TRY AGAIN 🥺</span>
              </motion.button>
            </motion.div>
          )}

          {/* 3. YES STATE: Cute Animated Bubu Pop-up from Reference */}
          {bubuState === 'happy' && (
            <motion.div
              key="happy-box"
              initial={{ scale: 0.6, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.55, type: 'spring', bounce: 0.32 }}
              className="flex flex-col items-center text-center w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border-3 border-[#f8c8d5]"
            >
              {/* Happy Bubu & Dudu Celebration from Reference (with Cake and Party Hats) */}
              <div className="relative w-full max-w-sm aspect-[500/270] rounded-2xl overflow-hidden mb-3 bg-[#e8f4f8] border border-[#f8c8d5]/40 flex items-center justify-center shadow-inner">
                <img
                  src="/moments/animations/bubu-dudu-yes.gif"
                  alt="Happy Birthday Bubu Celebration"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Exact Requested Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#72173e] text-glow mb-1">
                Happy Birthday, handsome man ❤️
              </h2>

              <p className="font-handwriting text-base sm:text-xl text-[#3b0c20] font-semibold mb-5 max-w-xs">
                I poured my entire heart into your handwritten birthday letter... 💌✨
              </p>

              {/* Exact Requested Continue Button to Birthday Letter Page */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={onNext}
                className="py-3 px-8 rounded-full font-serif font-bold text-base text-white bg-gradient-to-r from-[#72173e] via-[#942052] to-[#72173e] shadow-xl shadow-[#72173e]/30 hover:shadow-2xl transition-all flex items-center gap-2 cursor-pointer border border-[#f8c8d5]"
              >
                <span>Continue</span>
                <Heart className="w-4 h-4 fill-white text-white" />
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer hint */}
      <div className="relative z-20 text-center text-xs font-serif text-[#72173e]/70 shrink-0">
        Page 2 of 4 • Ghuggu's Birthday Surprise 🎈
      </div>

    </div>
  );
}
