import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, RotateCcw, Heart, ArrowLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

// User's Exact Personal Birthday Quote — 100% Verbatim
const QUOTE_STANZAS = [
  {
    id: 1,
    lines: [
      "Pehle dosti thi, phir ek khaas rishta ban gaya,",
      "Haste haste jaane kab tu dil ke itna kareeb aa gaya."
    ]
  },
  {
    id: 2,
    lines: [
      "Teri baaton mein sukoon, teri dosti mein khushi hai,",
      "Tu jaisa hai, waise hi rehna, bas yahi dua meri hai."
    ]
  },
  {
    id: 3,
    lines: [
      "Zindagi ke har mod pe kamyabi tere saath rahe,",
      "Tere chehre pe hamesha wohi pyari si muskaan rahe."
    ]
  },
  {
    id: 4,
    isClosing: true,
    lines: [
      "Saalgirah mubarak, mere dost ❤️",
      "Khush rehna, haste rehna, aur hamesha aise hi amazing rehna."
    ]
  }
];

export default function Page4CakeSurprise({ onReplay, onBack }) {
  // 'cake' | 'quote'
  const [activeTab, setActiveTab] = useState('cake');
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  // Quote view animation key
  const [quoteAnimKey, setQuoteAnimKey] = useState(0);

  // Floating ambient elements (petals, tiny hearts, and embers)
  const floatingAmbience = useMemo(() => {
    return [
      { sym: '🌸', size: 16, left: '6%', delay: 0, dur: 14, xDrift: 20 },
      { sym: '✨', size: 12, left: '16%', delay: 2, dur: 10, xDrift: -12 },
      { sym: '💕', size: 14, left: '30%', delay: 4, dur: 13, xDrift: 25 },
      { sym: '🌸', size: 18, left: '50%', delay: 1, dur: 15, xDrift: -20 },
      { sym: '✨', size: 13, left: '68%', delay: 3, dur: 11, xDrift: 18 },
      { sym: '❤️', size: 13, left: '84%', delay: 2.5, dur: 12, xDrift: -25 },
      { sym: '🌸', size: 16, left: '94%', delay: 0.5, dur: 16, xDrift: 12 },
    ];
  }, []);

  // Play chime when entering Quote view
  const handleOpenQuote = () => {
    soundManager.playChime();
    setActiveTab('quote');
    setQuoteAnimKey((prev) => prev + 1);
  };

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    soundManager.playBlow();
    setCandlesLit(false);
    setWishMade(true);

    // After brief breath sound, trigger fanfare and confetti
    setTimeout(() => {
      soundManager.playCelebration();

      const end = Date.now() + 3.2 * 1000;
      const colors = ['#f8c8d5', '#72173e', '#ffd1dc', '#fef08a', '#fff5eb', '#e6859f', '#d4af37'];

      (function frame() {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: colors,
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.55 },
        colors: colors,
      });
    }, 280);
  };

  const handleRelight = () => {
    soundManager.playPop();
    setCandlesLit(true);
    setWishMade(false);
  };

  const handleReplayQuote = () => {
    soundManager.playChime();
    setQuoteAnimKey((prev) => prev + 1);
  };

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-[#0d0108] via-[#1c0413] to-[#080106] text-[#fff5eb] flex flex-col justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3.5 select-none">
      
      {/* ── CINEMATIC BACKGROUND: MOONLIGHT, BOKEH & FLOATING PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Moonlight Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[480px] sm:w-[600px] h-[300px] sm:h-[380px] rounded-full bg-gradient-to-b from-[#ffd1dc]/15 via-[#f8c8d5]/8 to-transparent blur-[90px]" />
        
        {/* Deep Burgundy & Plum Backing Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[550px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#72173e]/20 via-[#430825]/15 to-transparent blur-[120px]" />

        {/* Floating Rose Petals & Embers */}
        {floatingAmbience.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: '105vh', x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: '-10vh',
              x: [0, item.xDrift, -item.xDrift, 0],
              opacity: [0, 0.6, 0.7, 0],
              rotate: [0, 45, -35, 10],
            }}
            transition={{
              duration: item.dur,
              repeat: Infinity,
              delay: item.delay,
              ease: 'linear',
            }}
            className="absolute pointer-events-none select-none"
            style={{
              left: item.left,
              fontSize: `${item.size}px`,
              filter: item.sym === '✨' ? 'drop-shadow(0 0 6px rgba(254,240,138,0.7))' : 'drop-shadow(0 0 5px rgba(248,200,213,0.4))',
            }}
          >
            {item.sym}
          </motion.div>
        ))}
      </div>

      {/* ── 1. TOP BAR NAVIGATION ── */}
      <div className="relative z-30 w-full max-w-xl flex items-center justify-between shrink-0 mb-1 sm:mb-2">
        <button
          onClick={activeTab === 'quote' ? () => setActiveTab('cake') : onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-[#fff5eb] text-xs font-serif shadow-xs border border-white/20 backdrop-blur-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">{activeTab === 'quote' ? 'Cake' : 'A–Z Reasons'}</span>
          <span className="xs:hidden">Back</span>
        </button>

        {/* Tab Switcher: Cake vs Quote */}
        <div className="inline-flex items-center p-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-xl shadow-inner text-xs font-serif">
          <button
            onClick={() => setActiveTab('cake')}
            className={`px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'cake'
                ? 'bg-gradient-to-r from-[#72173e] to-[#942052] text-white shadow-md font-semibold'
                : 'text-[#f8c8d5]/70 hover:text-white'
            }`}
          >
            <span>🎂 Cake</span>
          </button>
          <button
            onClick={handleOpenQuote}
            className={`px-3.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'quote'
                ? 'bg-gradient-to-r from-[#72173e] via-[#b8235e] to-[#72173e] text-white shadow-md font-semibold'
                : 'text-[#f8c8d5]/70 hover:text-white'
            }`}
          >
            <span>💌 Quote</span>
            <Heart className="w-3 h-3 fill-[#e63946] text-[#e63946]" />
          </button>
        </div>

        <button
          onClick={onReplay}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-[#f8c8d5] text-xs font-serif shadow-xs border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          title="Restart surprise from beginning"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Replay</span>
        </button>
      </div>

      {/* ── 2. MAIN CENTER AREA: ANIMATED SWITCH BETWEEN CAKE & ROMANTIC QUOTE ── */}
      <div className="relative z-20 w-full max-w-xl flex flex-col items-center justify-center my-auto min-h-0 flex-1 px-1">
        <AnimatePresence mode="wait">
          
          {/* ═══════════ TAB A: INTERACTIVE BIRTHDAY CAKE & WISH ═══════════ */}
          {activeTab === 'cake' && (
            <motion.div
              key="cake-view"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center w-full max-w-md my-auto"
            >
              {/* Header Text */}
              <div className="text-center mb-2 sm:mb-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#fff5eb] text-glow mb-0.5">
                  Make A Wish, Ghuggu 🎂✨
                </h2>
                <p className="font-handwriting text-sm sm:text-base text-[#fce7ec]/85">
                  {candlesLit
                    ? 'Close your eyes, make a silent wish, and blow out the candles!'
                    : 'Your wish has flown straight to the stars! ✨'}
                </p>
              </div>

              {/* The Interactive Birthday Cake */}
              <motion.div
                whileHover={candlesLit ? { scale: 1.03 } : {}}
                whileTap={candlesLit ? { scale: 0.97 } : {}}
                onClick={handleBlowCandles}
                className={`relative select-none p-2 sm:p-3 rounded-3xl transition-transform ${
                  candlesLit ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                {/* Candles Container */}
                <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-3px] relative z-20">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="h-7 sm:h-8 flex items-center justify-center">
                        <AnimatePresence>
                          {candlesLit ? (
                            <motion.div
                              key="flame"
                              initial={{ scale: 0 }}
                              animate={{ scale: [1, 1.18, 0.94, 1] }}
                              exit={{ scale: 0, opacity: 0, y: -10 }}
                              transition={{ repeat: Infinity, duration: 1.3 + i * 0.2, ease: 'easeInOut' }}
                              className="w-3.5 sm:w-4 h-6 sm:h-7 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-[#ff4500] via-[#ffb347] to-[#fffbe6] shadow-[0_0_15px_#ffb347,0_0_25px_#ff4500]"
                            />
                          ) : (
                            <motion.div
                              key="smoke"
                              initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
                              animate={{ opacity: 0, y: -24, scale: 1.6 }}
                              transition={{ duration: 1.2, ease: 'easeOut' }}
                              className="text-xs text-zinc-300 font-mono"
                            >
                              💨
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="w-[2px] h-2 bg-zinc-800" />

                      <div className="w-4 sm:w-5 h-8 sm:h-10 rounded-t-xs bg-gradient-to-r from-[#f8c8d5] via-[#fff5eb] to-[#f4b8c5] shadow-inner border border-[#f8c8d5]/40 flex flex-col justify-around py-1">
                        <div className="w-full h-1 bg-[#72173e]/30" />
                        <div className="w-full h-1 bg-[#72173e]/30" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tier 1 (Top Tier) */}
                <div className="relative z-10 w-36 sm:w-44 h-11 sm:h-14 mx-auto rounded-t-2xl bg-gradient-to-r from-[#54112e] via-[#72173e] to-[#54112e] border-t-2 border-x-2 border-[#f8c8d5]/30 shadow-lg flex flex-col justify-between overflow-hidden">
                  <div className="w-full h-2.5 bg-[#fff5eb] rounded-b-xl shadow-xs flex justify-around">
                    <span className="w-2 h-2 bg-[#fff5eb] rounded-full inline-block -mt-1" />
                    <span className="w-2.5 h-3 bg-[#fff5eb] rounded-b-full inline-block" />
                    <span className="w-2 h-2.5 bg-[#fff5eb] rounded-b-full inline-block" />
                    <span className="w-2.5 h-3.5 bg-[#fff5eb] rounded-b-full inline-block" />
                    <span className="w-2 h-2 bg-[#fff5eb] rounded-full inline-block -mt-1" />
                  </div>
                  <div className="flex justify-center gap-2 pb-1">
                    <Heart className="w-2 h-2 text-[#f8c8d5] fill-[#f8c8d5]" />
                    <Heart className="w-2 h-2 text-[#f8c8d5] fill-[#f8c8d5]" />
                    <Heart className="w-2 h-2 text-[#f8c8d5] fill-[#f8c8d5]" />
                  </div>
                </div>

                {/* Tier 2 (Bottom Tier) */}
                <div className="relative z-0 w-50 sm:w-64 h-14 sm:h-18 mx-auto rounded-t-2xl bg-gradient-to-r from-[#3b0c20] via-[#54112e] to-[#3b0c20] border-t-2 border-x-2 border-[#f8c8d5]/40 shadow-xl flex flex-col justify-between overflow-hidden">
                  <div className="w-full h-2.5 bg-[#fbeddc] rounded-b-xl shadow-xs flex justify-around">
                    <span className="w-2.5 h-3 bg-[#fbeddc] rounded-b-full inline-block" />
                    <span className="w-3 h-3.5 bg-[#fbeddc] rounded-b-full inline-block" />
                    <span className="w-3 h-4 bg-[#fbeddc] rounded-b-full inline-block" />
                    <span className="w-2.5 h-3 bg-[#fbeddc] rounded-b-full inline-block" />
                    <span className="w-3 h-3.5 bg-[#fbeddc] rounded-b-full inline-block" />
                  </div>
                  <p className="font-handwriting text-base sm:text-lg text-[#f8c8d5] tracking-wider font-bold text-center">
                    Happy Birthday Ghuggu 🦉
                  </p>
                  <div className="w-full h-1 bg-[#d4af37]/60" />
                </div>

                {/* Cake Stand */}
                <div className="w-56 sm:w-72 h-3 mx-auto rounded-full bg-gradient-to-r from-[#9e7616] via-[#fef08a] to-[#9e7616] shadow-xl border border-[#d4af37]" />
                <div className="w-16 sm:w-20 h-2.5 mx-auto rounded-b-lg bg-[#7a590c]" />
              </motion.div>

              {/* Action Area */}
              <div className="mt-2 min-h-[85px] flex flex-col items-center justify-center w-full">
                <AnimatePresence mode="wait">
                  {candlesLit ? (
                    <motion.button
                      key="blow-btn"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleBlowCandles}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-[#f8c8d5] via-[#fff5eb] to-[#f8c8d5] text-[#54112e] font-serif font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all border border-white"
                    >
                      <span>Blow Out The Candles</span>
                      <span className="text-base sm:text-lg">🎂💨</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="wish-unlocked"
                      initial={{ opacity: 0, scale: 0.94, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-2 w-full max-w-sm text-center"
                    >
                      <p className="font-serif text-xs sm:text-sm font-bold text-[#f8c8d5] text-glow flex items-center gap-1.5 justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-[#ffd1dc]" />
                        <span>Wish Flown Straight To The Stars!</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#ffd1dc]" />
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleOpenQuote}
                        className="w-full py-2 px-5 rounded-full bg-gradient-to-r from-[#72173e] via-[#b8235e] to-[#72173e] text-white font-serif font-bold text-sm shadow-lg shadow-[#72173e]/40 border border-[#f8c8d5]/40 flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                      >
                        <Sparkles className="w-4 h-4 text-[#f8c8d5]" />
                        <span>Open Your Birthday Wish</span>
                        <Heart className="w-3.5 h-3.5 fill-white text-white" />
                      </motion.button>

                      <div className="flex items-center justify-center gap-4 text-xs font-serif text-[#f8c8d5]/75">
                        <button
                          onClick={handleRelight}
                          className="hover:text-white underline cursor-pointer"
                        >
                          Relight Candles 🕯️
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ═══════════ TAB B: EXACT PERSONAL BIRTHDAY QUOTE WITH CUTE CUDDLE ENDING ═══════════ */}
          {activeTab === 'quote' && (
            <motion.div
              key={`quote-view-${quoteAnimKey}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center justify-center w-full max-w-lg my-auto"
            >
              
              {/* ── HEADING: COMPACT, BALANCED, ZERO OVERLAP ── */}
              <div className="text-center mb-1.5 sm:mb-2 shrink-0">
                {/* Subtle Ornamental Filigree */}
                <div className="flex items-center justify-center gap-2 mb-0.5 select-none">
                  <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent via-[#ffd1dc]/40 to-[#f8c8d5]" />
                  <span className="text-[#ffd1dc]/80 text-[10px] sm:text-xs tracking-widest">
                    ✦ ❦ ✦
                  </span>
                  <div className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent via-[#ffd1dc]/40 to-[#f8c8d5]" />
                </div>

                {/* Main Heading */}
                <h2
                  className="font-serif italic font-bold text-lg sm:text-xl md:text-2xl text-[#fff5eb] tracking-tight leading-snug"
                  style={{
                    textShadow: '0 0 14px rgba(248, 200, 213, 0.4), 0 0 24px rgba(184, 35, 94, 0.3)',
                  }}
                >
                  A Special Birthday Wish For You ❤️
                </h2>

                <p className="font-handwriting text-xs text-[#f8c8d5]/80 mt-0.5 tracking-wide">
                  From my heart directly to yours, Ghuggu...
                </p>
              </div>

              {/* ── ELEGANT GLASS QUOTE FRAME ── */}
              <div
                className="relative w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-[#ffd1dc]/30 via-[#f8c8d5]/15 to-[#ffd1dc]/25 shadow-[0_0_35px_rgba(114,23,62,0.4)]"
              >
                {/* Inner Frosted Glass Card */}
                <div className="relative w-full rounded-[15px] sm:rounded-[23px] bg-gradient-to-b from-[#18030e]/90 via-[#0e0208]/95 to-[#14030d]/95 backdrop-blur-xl p-3.5 sm:p-4 sm:px-6 border border-white/10 flex flex-col justify-between overflow-hidden">
                  
                  {/* Classical Corner Accents */}
                  <div className="absolute top-2 left-2.5 text-[#f8c8d5]/30 text-[10px] select-none pointer-events-none">❧</div>
                  <div className="absolute top-2 right-2.5 text-[#f8c8d5]/30 text-[10px] select-none pointer-events-none">☙</div>

                  {/* ════ QUOTE BODY: USER'S EXACT 4 STANZAS VERBATIM ════ */}
                  <div className="flex flex-col items-center text-center my-auto py-1 max-h-[58vh] sm:max-h-[62vh] overflow-y-auto no-scrollbar">
                    
                    {/* The Quote Stanzas */}
                    <div className="space-y-1.5 sm:space-y-2 max-w-md w-full">
                      {QUOTE_STANZAS.map((stanza, sIdx) => (
                        <motion.div
                          key={stanza.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: sIdx * 0.3 + 0.15,
                            ease: 'easeOut'
                          }}
                          className={`flex flex-col items-center justify-center ${
                            stanza.isClosing ? 'pt-1 sm:pt-1.5' : ''
                          }`}
                        >
                          {stanza.lines.map((line, lIdx) => (
                            <p
                              key={lIdx}
                              className={`font-serif italic tracking-wide transition-all ${
                                stanza.isClosing
                                  ? lIdx === 0
                                    ? 'text-sm sm:text-base md:text-lg font-bold text-[#ffd1dc] tracking-wider leading-snug mb-0.5'
                                    : 'text-xs sm:text-sm font-semibold text-[#f8c8d5] leading-snug'
                                  : 'text-xs sm:text-sm text-[#fff5eb]/95 leading-relaxed'
                              }`}
                              style={{
                                textShadow: stanza.isClosing
                                  ? '0 0 10px rgba(255, 100, 130, 0.5)'
                                  : '0 0 8px rgba(248, 200, 213, 0.3)',
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </motion.div>
                      ))}
                    </div>

                    {/* ── CUTE BUBU & DUDU CUDDLE SURPRISE (THE FINAL ENDING) ── */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.6, type: 'spring', bounce: 0.35, delay: 1.4 }}
                      className="pt-2 sm:pt-2.5 pb-0.5 flex flex-col items-center justify-center select-none"
                    >
                      <div className="relative group">
                        {/* Ambient Pink Glow Ring */}
                        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#ff758c] via-[#ff7eb3] to-[#f8c8d5] opacity-50 blur-md animate-pulse pointer-events-none" />
                        
                        {/* Floating Mini Hearts around Cuddle GIF */}
                        <motion.span
                          animate={{ y: [-2, -8, -2], opacity: [0.6, 1, 0.6] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                          className="absolute -top-3 -left-3 text-sm z-20 pointer-events-none"
                        >
                          💕
                        </motion.span>
                        <motion.span
                          animate={{ y: [-1, -7, -1], opacity: [0.7, 1, 0.7] }}
                          transition={{ repeat: Infinity, duration: 2.1, delay: 0.3, ease: 'easeInOut' }}
                          className="absolute -top-3.5 -right-3 text-sm z-20 pointer-events-none"
                        >
                          💖
                        </motion.span>

                        {/* Bubu & Dudu Cuddle / Hug Animated Sticker */}
                        <div className="relative z-10 w-22 sm:w-26 h-18 sm:h-22 rounded-2xl overflow-hidden bg-white/95 border-2 border-[#f8c8d5] shadow-lg flex items-center justify-center p-1">
                          <img
                            src="/moments/animations/bubu-dudu-cuddle.gif"
                            alt="Bubu and Dudu Cuddle Hug"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </motion.div>

                  </div>

                  {/* ════ CARD ACTION CONTROLS: NEVER CUT OFF, BEAUTIFULLY ALIGNED ════ */}
                  <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-[#f8c8d5]/20 text-[11px] sm:text-xs font-serif shrink-0">
                    
                    {/* 1. Replay Reveal Button */}
                    <button
                      onClick={handleReplayQuote}
                      className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-[#f8c8d5]/30 text-[#f8c8d5] hover:text-white transition-all shadow-xs cursor-pointer"
                      title="Replay quote reveal animation"
                    >
                      <RotateCcw className="w-3 h-3 text-[#ffd1dc]" />
                      <span>Replay</span>
                    </button>

                    {/* 2. Cake Button */}
                    <button
                      onClick={() => setActiveTab('cake')}
                      className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#72173e] via-[#942052] to-[#72173e] hover:from-[#942052] hover:to-[#b8235e] border border-[#f8c8d5]/40 text-white font-semibold shadow-md transition-all cursor-pointer"
                    >
                      <Cake className="w-3 h-3 text-[#f8c8d5]" />
                      <span>Cake</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── 3. FOOTER: THE EMOTIONAL ENDING ── */}
      <div className="relative z-30 text-center text-[10px] sm:text-xs font-serif text-[#f8c8d5]/70 shrink-0 flex items-center justify-center gap-1 pt-1">
        <span>Page 5 of 5 • The Emotional Ending</span>
        <Heart className="w-3 h-3 fill-[#e63946] text-[#e63946] inline-block" />
      </div>

    </div>
  );
}
