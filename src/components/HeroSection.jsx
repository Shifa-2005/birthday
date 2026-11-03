import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function HeroSection({ onScrollToNext }) {
  const [loveCount, setLoveCount] = useState(0);
  const [floatingPops, setFloatingPops] = useState([]);
  const [showLoveModal, setShowLoveModal] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');

  // Typing animation for "Happy Birthday, My Love ❤️"
  const fullTitle = 'Happy Birthday, My Love ❤️';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const handleSendMoreLove = () => {
    soundManager.playPop();
    soundManager.playChime();
    setLoveCount((prev) => prev + 1);

    // Heart-shaped confetti celebration
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
    });

    confetti({
      shapes: [heart],
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f8c8d5', '#72173e', '#e6859f', '#fff5eb', '#d4af37'],
    });

    // Floating heart particle animation
    const id = Date.now() + Math.random();
    setFloatingPops((prev) => [...prev, { id, x: (Math.random() - 0.5) * 80 }]);
    setTimeout(() => {
      setFloatingPops((prev) => prev.filter((p) => p.id !== id));
    }, 1200);

    // Open romantic love message modal
    setShowLoveModal(true);
  };

  const closeLoveModal = () => {
    soundManager.playPop();
    setShowLoveModal(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[580px] h-[360px] sm:h-[580px] bg-gradient-to-tr from-[#72173e]/30 via-[#942052]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#54112e]/25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#f8c8d5]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#240713]/85 border border-[#f8c8d5]/30 text-xs sm:text-sm text-[#f8c8d5] shadow-lg shadow-[#3b0c20]/40 backdrop-blur-md mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#f8c8d5]" />
        <span className="font-serif tracking-widest uppercase text-[11px] sm:text-xs">
          Today Is All About You ✨
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#f8c8d5]" />
      </motion.div>

      {/* Typing Animated Main Title */}
      <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center mb-8 px-2">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#fff5eb] text-glow leading-tight">
          {displayedTitle}
          {displayedTitle.length < fullTitle.length && (
            <span className="inline-block w-1 h-7 sm:h-10 bg-[#f8c8d5] ml-1.5 animate-pulse align-middle" />
          )}
        </h1>
      </div>

      {/* CENTERPIECE: The Birthday Boy's Picture with Glowing Border & Floating Sparkles */}
      <div className="relative my-2 sm:my-4 flex items-center justify-center">
        {/* Floating Stars and Hearts Around The Picture */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-5 -left-4 sm:-top-7 sm:-left-7 z-20 pointer-events-none text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_#f8c8d5]"
        >
          💖
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-20 pointer-events-none text-xl sm:text-2xl filter drop-shadow-[0_0_8px_#d4af37]"
        >
          ✨
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-5 z-20 pointer-events-none text-xl sm:text-2xl filter drop-shadow-[0_0_8px_#f8c8d5]"
        >
          ⭐
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -bottom-5 -right-3 sm:-bottom-7 sm:-right-5 z-20 pointer-events-none text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_#e6859f]"
        >
          💕
        </motion.div>

        {/* Outer glowing pulsing halo */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-[#72173e] via-[#f8c8d5]/40 to-[#d4af37]/40 blur-2xl opacity-60 animate-pulse pointer-events-none" />

        {/* Picture Card with Smooth Zoom-In */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="relative z-10 p-2 sm:p-2.5 rounded-[2.2rem] sm:rounded-[2.8rem] bg-gradient-to-tr from-[#54112e] via-[#f8c8d5]/50 to-[#d4af37]/60 shadow-[0_0_40px_rgba(248,200,213,0.35),0_0_70px_rgba(114,23,62,0.5)] transition-all duration-300"
        >
          <div className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.4rem] bg-[#14040a] border border-[#f8c8d5]/30">
            <img
              src="/moments/photos/birthday-boy.jpg"
              alt="My handsome birthday boy"
              onError={(e) => {
                // Fallback to .jpg.jpeg if browser needs it
                if (!e.target.src.endsWith('.jpeg')) {
                  e.target.src = '/moments/photos/birthday-boy.jpg.jpeg';
                }
              }}
              className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle romantic corner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14040a]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Message below his picture */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="mt-6 mb-8"
      >
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#fff5eb] text-glow flex items-center justify-center gap-2">
          <span>My handsome birthday boy</span>
          <span className="text-[#f8c8d5]">❤️</span>
        </p>
        <p className="font-script text-xl sm:text-2xl text-[#f8c8d5] mt-1">
          The one who stole my whole heart
        </p>
      </motion.div>

      {/* Cute "Send Him More Love ❤️" Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative mb-14"
      >
        <button
          onClick={handleSendMoreLove}
          className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#72173e] via-[#942052] to-[#72173e] hover:from-[#942052] hover:to-[#72173e] border border-[#f8c8d5]/45 text-[#fff5eb] font-serif text-base sm:text-lg font-semibold tracking-wide flex items-center gap-3 shadow-xl shadow-[#72173e]/50 hover:shadow-[#942052]/70 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <Heart className="w-5 h-5 text-[#f8c8d5] fill-[#f8c8d5] group-hover:scale-125 transition-transform" />
          <span>Send Him More Love ❤️</span>
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-xs font-mono text-[#fce7ec] border border-[#f8c8d5]/30">
            {loveCount > 0 ? `+${loveCount}` : '💌'}
          </span>
        </button>

        {/* Floating Pops */}
        <AnimatePresence>
          {floatingPops.map((pop) => (
            <motion.div
              key={pop.id}
              initial={{ opacity: 1, y: 0, x: pop.x, scale: 0.8 }}
              animate={{ opacity: 0, y: -70, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute left-1/2 -top-4 pointer-events-none select-none text-2xl"
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Romantic Birthday Message Popup Modal */}
      <AnimatePresence>
        {showLoveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full rounded-3xl bg-gradient-to-b from-[#2e0918] via-[#1a050e] to-[#0f0308] border-2 border-[#f8c8d5]/40 p-7 sm:p-9 shadow-2xl shadow-[#72173e]/70 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closeLoveModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#3b0c20]/80 hover:bg-[#72173e] text-[#f8c8d5] hover:text-[#fff5eb] border border-[#f8c8d5]/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Heart Badge */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#54112e] to-[#942052] border border-[#f8c8d5]/40 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#72173e]/50">
                <Heart className="w-8 h-8 text-[#f8c8d5] fill-[#f8c8d5] animate-pulse" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-[#54112e]/70 border border-[#f8c8d5]/30 text-xs text-[#f8c8d5] font-serif uppercase tracking-wider mb-3">
                Sent Straight From My Heart
              </span>

              {/* Modal Heading */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fff5eb] text-glow mb-4">
                To My Handsome Birthday Boy ❤️
              </h3>

              {/* Message text */}
              <p className="font-serif text-sm sm:text-base text-[#fce7ec] leading-relaxed font-light mb-6">
                Every beat of my heart belongs to you. Watching your smile brings so much happiness into my world. May this birthday surround you with endless joy, peace, and everything your heart dreams of.
              </p>

              <p className="font-script text-2xl text-[#f8c8d5] mb-6">
                You are my favourite person in the whole universe.
              </p>

              {/* Close Action Button */}
              <button
                onClick={closeLoveModal}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#72173e] to-[#942052] hover:from-[#942052] hover:to-[#72173e] text-[#fff5eb] font-serif text-xs tracking-wider border border-[#f8c8d5]/30 cursor-pointer shadow-md transition-all"
              >
                Close & Keep In My Heart ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={onScrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="flex flex-col items-center gap-2 text-xs text-[#f8c8d5]/70 hover:text-[#fff5eb] transition-colors cursor-pointer group"
      >
        <span className="font-serif tracking-widest uppercase text-[11px]">Unwrap Your Surprises Below</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#f8c8d5] group-hover:text-[#fff5eb]" />
        </motion.div>
      </motion.button>
    </section>
  );
}
