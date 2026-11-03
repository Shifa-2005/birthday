import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import CartoonCat from './CartoonCat';

// 5x7 LED Dot Matrix patterns for numbers 3, 2, 1
const digitMatrices = {
  3: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  2: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  1: [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
  ],
};

export default function OpeningScreen({ onOpen }) {
  // Stages: 'countdown' -> 'birthdayReveal' -> 'catReadyCheck'
  const [stage, setStage] = useState('countdown');
  const [currentNum, setCurrentNum] = useState(3);

  // Playful NO button evasion state
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Automatic Smooth Countdown: 3 → 2 → 1 → Birthday Reveal
  useEffect(() => {
    soundManager.playPop();

    const timer = setInterval(() => {
      setCurrentNum((prev) => {
        if (prev === 3) {
          soundManager.playPop();
          return 2;
        }
        if (prev === 2) {
          soundManager.playPop();
          return 1;
        }
        if (prev === 1) {
          clearInterval(timer);
          soundManager.playCelebration();
          // After 1, smoothly transition to the Birthday Reveal
          setTimeout(() => {
            setStage('birthdayReveal');
          }, 900);
          return 1;
        }
        return prev;
      });
    }, 1250);

    return () => clearInterval(timer);
  }, []);

  const handleOpenSurpriseClick = () => {
    soundManager.playPop();
    setStage('catReadyCheck');
  };

  const handleYes = () => {
    soundManager.playCelebration();
    soundManager.playMeow();
    soundManager.startAmbientMusic();

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#ffffff', '#f8c8d5', '#ffd1dc', '#72173e', '#fef08a'],
    });

    onOpen();
  };

  const handleNo = () => {
    soundManager.playMeow();
    setNoCount((prev) => prev + 1);

    // Playful button jump
    const randomX = (Math.random() - 0.5) * 140;
    const randomY = (Math.random() - 0.5) * 80;
    setNoPosition({ x: randomX, y: randomY });
  };

  const matrix = digitMatrices[currentNum] || digitMatrices[3];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050507] text-[#fff5eb] overflow-hidden select-none font-mono"
    >
      {/* 1. DEVELOPER'S LAPTOP / CODE EDITOR BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-25 filter blur-[1.2px] overflow-hidden flex flex-col">
        {/* Fake Code Editor Top Bar */}
        <div className="h-10 bg-[#0c0c12] border-b border-white/10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-[#eab308]" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <span className="ml-4 text-xs text-white/40 font-mono">birthday_protocol.ts</span>
            <span className="text-xs text-white/20 font-mono hidden sm:inline">| terminal: bash</span>
          </div>
          <div className="text-[11px] text-emerald-400/70 font-mono">
            ● status: 200 OK (Love = Infinity)
          </div>
        </div>

        {/* Realistic Code Syntax Highlight Lines */}
        <div className="p-6 text-xs sm:text-sm font-mono leading-relaxed text-white/50 space-y-1">
          <p><span className="text-purple-400">import</span> &#123; <span className="text-amber-300">Love</span>, <span className="text-amber-300">Smile</span>, <span className="text-amber-300">Happiness</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@soul/connection'</span>;</p>
          <p><span className="text-purple-400">import</span> <span className="text-sky-300">Ghuggu</span> <span className="text-purple-400">from</span> <span className="text-emerald-300">'@heart/boyfriend'</span>;</p>
          <p className="text-white/20">// Initializing birthday countdown sequence...</p>
          <p><span className="text-purple-400">const</span> <span className="text-sky-300">isSpecialDay</span>: <span className="text-amber-400">boolean</span> = <span className="text-purple-400">true</span>;</p>
          <p><span className="text-purple-400">const</span> <span className="text-sky-300">handsomeLevel</span>: <span className="text-amber-400">number</span> = <span className="text-sky-400">Number</span>.<span className="text-amber-300">POSITIVE_INFINITY</span>;</p>
          <br />
          <p><span className="text-purple-400">async function</span> <span className="text-sky-400">executeBirthdaySurprise</span>() &#123;</p>
          <p className="pl-4"><span className="text-white/30">// Warming up heart chimes & countdown LED display</span></p>
          <p className="pl-4"><span className="text-purple-400">await</span> <span className="text-sky-300">distance</span>.<span className="text-amber-300">close</span>(&#123; <span className="text-sky-300">withHugs</span>: <span className="text-purple-400">true</span> &#125;);</p>
          <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-emerald-300">"Happy Birthday, handsome man ❤️"</span>;</p>
          <p>&#125;</p>
          <br />
          <p className="text-emerald-400/60">$ npm run celebrate --target="Ghuggu" --unconditional-love</p>
          <p className="text-white/30">&gt; [SUCCESS] Compiled successfully. Starting LED countdown...</p>
          <p className="text-white/30">&gt; Rendering 5x7 dot-matrix buffer... <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse align-middle" /></p>
        </div>
      </div>

      {/* Dark Vignette to make the center POP */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050507]/75 to-[#050507] pointer-events-none" />

      {/* Subtle Keyboard Glow Accent at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white/[0.04] to-transparent pointer-events-none" />

      {/* ============================================================== */}
      {/* 2. STAGE 1: HUGE GLOWING WHITE LED DOT-MATRIX COUNTDOWN NUMBER */}
      {/* ============================================================== */}
      {stage === 'countdown' && (
        <div className="relative z-20 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNum}
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: [0.95, 1], opacity: 1 }}
              exit={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* LED Dot-Matrix Grid (5 cols x 7 rows) */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3.5 md:gap-4.5 p-4 sm:p-6 bg-black/60 rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.12)] backdrop-blur-sm">
                {matrix.map((row, rIdx) =>
                  row.map((cell, cIdx) => (
                    <motion.div
                      key={`${rIdx}-${cIdx}`}
                      animate={
                        cell === 1
                          ? {
                              scale: [1, 1.08, 1],
                              opacity: [0.95, 1, 0.95],
                            }
                          : {}
                      }
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className={`w-3.5 h-3.5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full transition-all duration-200 ${
                        cell === 1
                          ? 'bg-white shadow-[0_0_12px_#ffffff,0_0_24px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.5)] border border-white/80'
                          : 'bg-white/[0.03] border border-white/[0.02]'
                      }`}
                    />
                  ))
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. STAGE 2: AFTER COUNTDOWN REVEAL ("Happy Birthday, handsome man ❤️") */}
      {/* ============================================================== */}
      {stage === 'birthdayReveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-20 max-w-lg w-full mx-4 p-8 sm:p-12 rounded-3xl bg-[#0d0d14]/90 border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.15)] backdrop-blur-md text-center flex flex-col items-center"
        >
          {/* Subtle Glow Ring */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

          {/* System Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white/80 font-mono tracking-widest uppercase mb-6">
            <span>● SEQUENCE COMPLETE</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 text-glow leading-tight">
            Happy Birthday, <br />
            <span className="text-[#f8c8d5]">handsome man ❤️</span>
          </h1>

          {/* Button: Open Your Surprise */}
          <motion.button
            onClick={handleOpenSurpriseClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-serif text-base sm:text-lg font-semibold tracking-wide text-black bg-white hover:bg-[#fff5eb] border border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center gap-3 cursor-pointer"
          >
            <span>Open Your Surprise</span>
            <span>🎁</span>
          </motion.button>
        </motion.div>
      )}

      {/* ============================================================== */}
      {/* 4. STAGE 3: CUTE ANIMATED CAT YES / NO SCREEN */}
      {/* ============================================================== */}
      {stage === 'catReadyCheck' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 max-w-md w-full mx-4 p-8 sm:p-10 rounded-3xl bg-[#fffdfa] text-[#3b0c20] paper-shadow border-4 border-[#f8c8d5] text-center flex flex-col items-center"
        >
          {/* Cute Cat Mascot */}
          <div className="my-2">
            <CartoonCat
              size={120}
              variant="playful"
              speechText="Say YES! 🐾💖"
              interactive={true}
            />
          </div>

          {/* Question */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3b0c20] mb-2 leading-tight">
            Ready for your birthday surprise?
          </h2>

          <p className="font-handwriting text-xl text-[#72173e] font-semibold mb-6">
            I made this with all my love for you! 🦉❤️
          </p>

          {/* YES and NO Buttons */}
          <div className="relative flex items-center justify-center gap-4 sm:gap-6 min-h-[60px] w-full">
            {/* YES Button */}
            <motion.button
              onClick={handleYes}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#72173e] to-[#942052] hover:from-[#942052] hover:to-[#72173e] text-[#fffdfa] font-serif text-base font-bold shadow-lg shadow-[#72173e]/30 border-2 border-[#f8c8d5] flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>YES ❤️</span>
            </motion.button>

            {/* NO Button (Playfully evades or reacts) */}
            <motion.button
              onClick={handleNo}
              onMouseEnter={handleNo}
              animate={{
                x: noPosition.x,
                y: noPosition.y,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="px-7 py-3 rounded-full bg-white hover:bg-[#fff0f3] text-[#54112e] font-serif text-sm font-bold border-2 border-[#f8c8d5] shadow-sm flex items-center gap-1.5 cursor-pointer select-none"
            >
              <span>NO 🙈</span>
            </motion.button>
          </div>

          {/* Playful hint if he clicks NO */}
          {noCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 font-handwriting text-base text-[#72173e] font-bold"
            >
              {noCount === 1 && "Hey! You can't say NO to your birthday surprise! 😜"}
              {noCount === 2 && "The cat said 'NO' is not permitted! Tap YES! 🐾❤️"}
              {noCount >= 3 && "Nice try, Ghuggu! You HAVE to click YES! 🥰"}
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
