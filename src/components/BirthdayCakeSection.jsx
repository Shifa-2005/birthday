import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function BirthdayCakeSection() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;

    soundManager.playBlow();
    setCandlesLit(false);
    setWishMade(true);

    // After brief breath sound, trigger fanfare and massive confetti!
    setTimeout(() => {
      soundManager.playCelebration();

      // Side confetti cannons
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#f8c8d5', '#72173e', '#ffd1dc', '#fef08a', '#fff5eb'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Central burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 300);
  };

  const handleRelight = () => {
    soundManager.playPop();
    setCandlesLit(true);
    setWishMade(false);
  };

  return (
    <section id="birthday-cake" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#d4af37]/15 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
      >
        <Cake className="w-3.5 h-3.5 text-[#e6859f]" />
        <span className="font-handwriting text-base font-bold">A Birthday Tradition</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-3"
      >
        Make A Wish, Ghuggu 🎂✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-handwriting text-xl sm:text-2xl text-[#fce7ec]/85 max-w-md mx-auto mb-10"
      >
        Close your eyes, think of your sweetest birthday wish, and tap the candles to blow them out!
      </motion.p>

      {/* Interactive Birthday Cake Container */}
      <div className="relative flex flex-col items-center justify-center my-4">
        
        {/* Clickable Cake Area */}
        <motion.div
          whileHover={candlesLit ? { scale: 1.03 } : {}}
          whileTap={candlesLit ? { scale: 0.98 } : {}}
          onClick={handleBlowCandles}
          className={`relative cursor-pointer select-none transition-transform duration-300 p-6 rounded-3xl ${
            candlesLit ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          {/* Candles Container */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] relative z-20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <div className="h-9 flex items-center justify-center">
                  <AnimatePresence>
                    {candlesLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.15, 0.95, 1] }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ repeat: Infinity, duration: 1.4 + i * 0.2, ease: 'easeInOut' }}
                        className="w-4 h-7 rounded-[50%_50%_40%_40%] bg-gradient-to-t from-[#ff4500] via-[#ffb347] to-[#fffbe6] shadow-[0_0_15px_#ffb347,0_0_25px_#ff4500] candle-flame"
                      />
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -25, scale: 1.6 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="text-xs text-zinc-400 font-mono"
                      >
                        💨
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Wick */}
                <div className="w-[2px] h-2.5 bg-zinc-800" />

                {/* Candle Body */}
                <div className="w-4 sm:w-5 h-12 sm:h-14 rounded-t-sm bg-gradient-to-r from-[#f8c8d5] via-[#fff5eb] to-[#f4b8c5] shadow-inner border border-[#f8c8d5]/40 flex flex-col justify-around py-1">
                  <div className="w-full h-1 bg-[#72173e]/30" />
                  <div className="w-full h-1 bg-[#72173e]/30" />
                  <div className="w-full h-1 bg-[#72173e]/30" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Tier 1 (Top) */}
          <div className="relative z-10 w-44 sm:w-56 h-16 sm:h-20 mx-auto rounded-t-2xl bg-gradient-to-r from-[#54112e] via-[#72173e] to-[#54112e] border-t-2 border-x-2 border-[#f8c8d5]/30 shadow-lg flex flex-col justify-between overflow-hidden">
            {/* Cream Icing Drips */}
            <div className="w-full h-4 bg-[#fff5eb] rounded-b-xl shadow-sm flex justify-around">
              <span className="w-3 h-3 bg-[#fff5eb] rounded-full inline-block -mt-1"></span>
              <span className="w-4 h-5 bg-[#fff5eb] rounded-b-full inline-block"></span>
              <span className="w-3 h-4 bg-[#fff5eb] rounded-b-full inline-block"></span>
              <span className="w-4 h-6 bg-[#fff5eb] rounded-b-full inline-block"></span>
              <span className="w-3 h-3 bg-[#fff5eb] rounded-full inline-block -mt-1"></span>
            </div>
            {/* Decorative pearls */}
            <div className="flex justify-center gap-2 pb-1">
              <Heart className="w-3 h-3 text-[#f8c8d5] fill-[#f8c8d5]" />
              <Heart className="w-3 h-3 text-[#f8c8d5] fill-[#f8c8d5]" />
              <Heart className="w-3 h-3 text-[#f8c8d5] fill-[#f8c8d5]" />
            </div>
          </div>

          {/* Cake Tier 2 (Bottom) */}
          <div className="relative z-0 w-64 sm:w-80 h-20 sm:h-24 mx-auto rounded-t-2xl bg-gradient-to-r from-[#3b0c20] via-[#54112e] to-[#3b0c20] border-t-2 border-x-2 border-[#f8c8d5]/40 shadow-xl flex flex-col justify-between overflow-hidden">
            {/* Middle Cream Layer */}
            <div className="w-full h-4 bg-[#fbeddc] rounded-b-xl shadow-sm flex justify-around">
              <span className="w-4 h-5 bg-[#fbeddc] rounded-b-full inline-block"></span>
              <span className="w-4 h-6 bg-[#fbeddc] rounded-b-full inline-block"></span>
              <span className="w-5 h-7 bg-[#fbeddc] rounded-b-full inline-block"></span>
              <span className="w-4 h-5 bg-[#fbeddc] rounded-b-full inline-block"></span>
              <span className="w-4 h-6 bg-[#fbeddc] rounded-b-full inline-block"></span>
            </div>
            {/* Center Cake Text */}
            <p className="font-handwriting text-2xl sm:text-3xl text-[#f8c8d5] tracking-wider font-bold">
              Happy Birthday Ghuggu 🦉
            </p>
            {/* Base gold piping */}
            <div className="w-full h-2 bg-[#d4af37]/60" />
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-72 sm:w-96 h-5 mx-auto rounded-full bg-gradient-to-r from-[#9e7616] via-[#fef08a] to-[#9e7616] shadow-2xl border border-[#d4af37]" />
          <div className="w-24 sm:w-32 h-4 mx-auto rounded-b-lg bg-[#7a590c]" />

        </motion.div>

        {/* Tap hint or wish congratulations */}
        <div className="mt-8 min-h-[80px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {candlesLit ? (
              <motion.button
                key="blow-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={handleBlowCandles}
                className="px-6 py-2.5 rounded-full bg-[#fffdfa] hover:bg-[#fce7ec] text-[#54112e] border-2 border-[#f8c8d5] font-serif text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Blow Out The Candles</span>
                <span>🎂💨</span>
              </motion.button>
            ) : (
              <motion.div
                key="congrats"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="p-5 rounded-[2rem] bg-[#fffdfa] text-[#240713] paper-shadow border-4 border-[#f8c8d5] max-w-md">
                  <p className="font-serif text-lg sm:text-xl font-bold text-[#72173e] mb-1">
                    ✨ Wish Made Into The Heavens! ✨
                  </p>
                  <p className="font-handwriting text-xl text-[#3b0c20] font-semibold leading-relaxed">
                    May every dream you whispered today come true for my favourite Ghuggu! You deserve all the happiness in the world! ❤️
                  </p>
                </div>

                <button
                  onClick={handleRelight}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#240713] hover:bg-[#3b0c20] text-xs font-serif text-[#f8c8d5] border border-[#f8c8d5]/25 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight Candles 🕯️</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
