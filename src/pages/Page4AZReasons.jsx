import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, Sparkles, Check, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const azReasons = [
  { letter: 'A', text: 'I love your ambition and the way you work towards your dreams.' },
  { letter: 'B', text: 'I love your beautiful smile.' },
  { letter: 'C', text: 'I love how comfortable I feel talking to you.' },
  { letter: 'D', text: 'I love your determination.' },
  { letter: 'E', text: 'I love how you make ordinary conversations special.' },
  { letter: 'F', text: 'I love how you make me feel close to you, even from far away.' },
  { letter: 'G', text: 'I love your genuine heart.' },
  { letter: 'H', text: 'I love how handsome you are.' },
  { letter: 'I', text: 'I love your individuality and the person you are.' },
  { letter: 'J', text: 'I love joking and laughing with you.' },
  { letter: 'K', text: 'I love how much I know about you and how much I still want to learn.' },
  { letter: 'L', text: 'I love listening to your voice.' },
  { letter: 'M', text: 'I love the memories we have made together.' },
  { letter: 'N', text: 'I love how naturally you became such an important part of my life.' },
  { letter: 'O', text: 'I love our little conversations about everything and nothing.' },
  { letter: 'P', text: 'I love your patience when we understand things differently.' },
  { letter: 'Q', text: 'I love how you make even a simple conversation feel special.' },
  { letter: 'R', text: 'I love the respect and understanding I want us to keep building.' },
  { letter: 'S', text: 'I love your smile, especially when you are genuinely happy.' },
  { letter: 'T', text: 'I love talking to you about the smallest things.' },
  { letter: 'U', text: 'I love that I can share my thoughts with you.' },
  { letter: 'V', text: 'I love the way you make me smile without even trying.' },
  { letter: 'W', text: 'I love wishing for all the beautiful things waiting for you.' },
  { letter: 'X', text: 'I love the little moments between us that no one else knows about.' },
  { letter: 'Y', text: 'I love you for the person you are, not just for what you do.' },
  { letter: 'Z', text: 'I love the way you have become such a special part of my life.' },
];

export default function Page4AZReasons({ onNext, onBack }) {
  const [activeLetterIdx, setActiveLetterIdx] = useState(null);
  const [openedLetters, setOpenedLetters] = useState(() => new Set());
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const openLetter = (idx) => {
    soundManager.playPop();
    setActiveLetterIdx(idx);
    const updated = new Set(openedLetters);
    updated.add(idx);
    setOpenedLetters(updated);

    // If all 26 letters have been opened
    if (updated.size === azReasons.length && !showCompletionModal) {
      setTimeout(() => {
        soundManager.playCelebration();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f8c8d5', '#72173e', '#ffd1dc', '#fff5eb', '#d4af37'],
        });
        setShowCompletionModal(true);
      }, 700);
    }
  };

  const handleNextLetter = () => {
    if (activeLetterIdx !== null) {
      const nextIdx = (activeLetterIdx + 1) % azReasons.length;
      openLetter(nextIdx);
    }
  };

  const handlePrevLetter = () => {
    if (activeLetterIdx !== null) {
      const prevIdx = (activeLetterIdx - 1 + azReasons.length) % azReasons.length;
      openLetter(prevIdx);
    }
  };

  const handleCloseCard = () => {
    soundManager.playPop();
    setActiveLetterIdx(null);
  };

  const isAllOpened = openedLetters.size === azReasons.length;

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-[#fffdfa] via-[#fff0f3] to-[#fce7ec] text-[#3b0c20] flex flex-col justify-between p-3 sm:p-5 select-none">
      
      {/* Background Romantic Scrapbook Glow & Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#f8c8d5]/35 rounded-full blur-[90px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#72173e]/15 rounded-full blur-[100px]" />
        
        {/* Subtle floating heart doodles */}
        <div className="absolute top-12 left-10 text-xl opacity-15">💌</div>
        <div className="absolute top-20 right-14 text-xl opacity-15">✨</div>
        <div className="absolute bottom-16 left-12 text-lg opacity-15">❤️</div>
      </div>

      {/* 1. TOP HEADER & NAVIGATION BAR */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#54112e] text-xs font-serif shadow-xs border border-[#f8c8d5] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Letter</span>
        </button>

        {/* Center Title Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-[#f8c8d5] shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#e6859f] fill-[#e6859f]" />
            <h1 className="font-serif text-xs sm:text-sm font-bold text-[#72173e] tracking-wide">
              A–Z Reasons I Love You ❤️
            </h1>
          </div>
          <p className="text-[10px] sm:text-xs font-handwriting text-[#54112e]/75 mt-0.5 font-bold">
            {openedLetters.size} of 26 letters opened {openedLetters.size === 26 ? '✨ (All completed!)' : '• Tap any letter to read'}
          </p>
        </div>

        {/* Next to Cake Button */}
        <button
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#72173e] hover:bg-[#54112e] text-[#fff5eb] text-xs font-serif shadow-xs transition-all cursor-pointer"
        >
          <span>Next: Cake</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. MAIN CENTER: 26 CLICKABLE A-Z CARDS GRID */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center my-1.5 min-h-0">
        
        {/* Scrapbook Container */}
        <div className="w-full bg-[#fffdfa]/95 backdrop-blur-xs p-3 sm:p-5 rounded-3xl border-3 border-[#f8c8d5] shadow-xl relative flex flex-col justify-center max-h-[82vh] sm:max-h-[78vh]">
          
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-5 washi-tape-pink shadow-xs rounded-xs flex items-center justify-center z-10">
            <span className="font-handwriting text-[10px] font-bold text-[#72173e] tracking-wider">
              FOR GHUGGU'S HEART ❤️
            </span>
          </div>

          {/* Subtitle */}
          <p className="font-handwriting text-center text-sm sm:text-base text-[#72173e] font-semibold mb-2.5">
            Every single letter holds a piece of why you mean the world to me ✨
          </p>

          {/* 26 Clickable Alphabet Cards Grid (5-6 cols mobile, 7-9 cols desktop to fit screen perfectly) */}
          <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 gap-1.5 sm:gap-2.5 justify-center items-center px-1">
            {azReasons.map((item, idx) => {
              const isOpened = openedLetters.has(idx);

              return (
                <motion.button
                  key={item.letter}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => openLetter(idx)}
                  className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl transition-all cursor-pointer border ${
                    isOpened
                      ? 'bg-gradient-to-b from-[#fce7ec] to-[#f8c8d5] border-[#e6859f] shadow-sm text-[#72173e]'
                      : 'bg-white hover:bg-[#fff5eb] border-[#f8c8d5] shadow-xs text-[#3b0c20]'
                  }`}
                  title={`Open Letter ${item.letter}`}
                >
                  {/* Embossed Letter */}
                  <span className="font-serif font-extrabold text-base sm:text-xl leading-none">
                    {item.letter}
                  </span>

                  {/* Cute Status Indicator */}
                  <span className="mt-1 text-[8px] sm:text-[10px] leading-none">
                    {isOpened ? (
                      <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#72173e] fill-[#72173e]" />
                    ) : (
                      <span className="text-[#e6859f]/50">♡</span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Progress Bar at Bottom of Scrapbook */}
          <div className="mt-3 w-full max-w-md mx-auto flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-[#fce7ec] rounded-full overflow-hidden border border-[#f8c8d5]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(openedLetters.size / 26) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-[#e6859f] to-[#72173e]"
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#72173e]">
              {openedLetters.size}/26
            </span>
          </div>

        </div>

      </div>

      {/* 3. CUTE ANIMATED CORNER CAT */}
      <div className="absolute bottom-2 right-3 z-30 pointer-events-none flex items-end gap-1.5">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="relative bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-2xl rounded-br-xs border border-[#f8c8d5] shadow-xs text-[10px] font-handwriting font-bold text-[#72173e] hidden sm:block mb-6 -mr-2"
        >
          {isAllOpened
            ? "You found all 26, Ghuggu! 🥰"
            : "Tap each letter! 🐾"}
        </motion.div>

        {/* Animated Corner Cat SVG */}
        <motion.svg
          viewBox="0 0 100 95"
          className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-md pointer-events-auto cursor-pointer"
          onClick={() => soundManager.playPop()}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          {/* Tail */}
          <motion.path
            d="M20 70 C 10 65, 5 50, 16 42 C 22 38, 24 45, 20 50"
            fill="none"
            stroke="#fffdfa"
            strokeWidth="6"
            strokeLinecap="round"
            animate={{ rotate: [-10, 12, -10] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ originX: '20px', originY: '70px' }}
          />
          {/* Body */}
          <ellipse cx="50" cy="65" rx="26" ry="24" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />
          <ellipse cx="50" cy="68" rx="14" ry="14" fill="#fff5eb" />
          {/* Ears */}
          <polygon points="30,36 36,12 50,26" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="33,32 37,18 47,26" fill="#f8c8d5" />
          <polygon points="70,36 64,12 50,26" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="67,32 63,18 53,26" fill="#f8c8d5" />
          {/* Head */}
          <ellipse cx="50" cy="35" rx="24" ry="20" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />
          {/* Eyes */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.45, 0.5, 0.55, 1] }}
            style={{ originY: '34px' }}
          >
            <circle cx="42" cy="34" r="3.5" fill="#240713" />
            <circle cx="41" cy="33" r="1.2" fill="#ffffff" />
            <circle cx="58" cy="34" r="3.5" fill="#240713" />
            <circle cx="57" cy="33" r="1.2" fill="#ffffff" />
          </motion.g>
          {/* Cheeks */}
          <ellipse cx="35" cy="40" rx="3.5" ry="2.2" fill="#f8c8d5" opacity="0.8" />
          <ellipse cx="65" cy="40" rx="3.5" ry="2.2" fill="#f8c8d5" opacity="0.8" />
          {/* Nose & Mouth */}
          <polygon points="50,39 47,37 53,37" fill="#e6859f" />
          <path d="M46,42 Q48,44 50,42 Q52,44 54,42" fill="none" stroke="#3b0c20" strokeWidth="1.2" strokeLinecap="round" />
          {/* Paws */}
          <ellipse cx="42" cy="84" rx="6" ry="4.5" fill="#fffdfa" stroke="#3b0c20" strokeWidth="1.5" />
          <ellipse cx="58" cy="84" rx="6" ry="4.5" fill="#fffdfa" stroke="#3b0c20" strokeWidth="1.5" />
        </motion.svg>
      </div>

      {/* 4. FOOTER NOTE */}
      <div className="relative z-20 text-center text-xs font-serif text-[#72173e]/70 shrink-0">
        Page 4 of 5 • A–Z Reasons I Love You ❤️
      </div>

      {/* POPUP MODAL: FLIPPED/OPENED LETTER REASON CARD */}
      <AnimatePresence>
        {activeLetterIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseCard}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.75, rotateY: 90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.75, rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#fffdfa] rounded-3xl p-6 sm:p-8 paper-shadow border-4 border-[#f8c8d5] text-center flex flex-col items-center"
            >
              {/* Top Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-gold rounded-xs shadow-xs flex items-center justify-center">
                <span className="font-handwriting text-xs font-bold text-[#7a590c]">
                  REASON {azReasons[activeLetterIdx].letter} ❤️
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseCard}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-[#fce7ec] hover:bg-[#f8c8d5] text-[#72173e] transition-colors cursor-pointer"
                title="Back to Alphabet Grid"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Huge Romantic Embossed Letter */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#72173e] via-[#942052] to-[#e6859f] text-white flex items-center justify-center shadow-lg border-2 border-white mb-4 mt-2">
                <span className="font-serif text-3xl sm:text-4xl font-extrabold text-glow-white">
                  {azReasons[activeLetterIdx].letter}
                </span>
              </div>

              {/* Animated Floating Heart */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="mb-2 text-xl"
              >
                💖
              </motion.div>

              {/* Full Reason Text */}
              <p className="font-serif text-lg sm:text-xl font-bold text-[#3b0c20] leading-relaxed px-2 my-2">
                "{azReasons[activeLetterIdx].text}"
              </p>

              {/* Card Navigation Controls (< Back | Next >) */}
              <div className="w-full mt-6 pt-4 border-t-2 border-dashed border-[#f8c8d5] flex items-center justify-between">
                <button
                  onClick={handlePrevLetter}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#fce7ec] text-[#54112e] text-xs font-serif border border-[#f8c8d5] shadow-xs cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={handleCloseCard}
                  className="px-4 py-1.5 rounded-full bg-[#fce7ec] hover:bg-[#f8c8d5] text-[#72173e] text-xs font-serif font-bold transition-all cursor-pointer"
                >
                  Back to Grid
                </button>

                <button
                  onClick={handleNextLetter}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#72173e] hover:bg-[#54112e] text-white text-xs font-serif font-bold shadow-xs cursor-pointer transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL CELEBRATION MODAL: TRIGGERED WHEN ALL 26 LETTERS HAVE BEEN OPENED */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-md bg-[#fffdfa] rounded-3xl p-6 sm:p-8 text-center paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center"
            >
              {/* Celebration icon */}
              <div className="w-16 h-16 rounded-full bg-[#fce7ec] flex items-center justify-center text-3xl mb-4 border border-[#e6859f] shadow-inner">
                🎉
              </div>

              {/* Exact Requested Heading */}
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#72173e] mb-2 leading-tight">
                26 letters, but so many more reasons ❤️
              </h2>

              <p className="font-handwriting text-lg sm:text-xl text-[#3b0c20] font-semibold mb-6 max-w-xs leading-relaxed">
                You have unlocked every single reason from A to Z! But the truth is, I fall in love with you for a thousand more little reasons every single day.
              </p>

              {/* Buttons: Back to Surprise and Continue to Cake */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="w-full sm:flex-1 py-3 px-4 rounded-full bg-white hover:bg-[#fce7ec] text-[#54112e] text-xs font-serif font-bold border-2 border-[#f8c8d5] shadow-xs cursor-pointer transition-all"
                >
                  Back to Birthday Surprise
                </button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onNext}
                  className="w-full sm:flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#72173e] to-[#942052] text-white text-xs font-serif font-bold shadow-md hover:shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Go to Birthday Cake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

