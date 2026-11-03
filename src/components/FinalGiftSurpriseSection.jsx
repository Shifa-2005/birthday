import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function FinalGiftSurpriseSection({ onReplay }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    soundManager.playPop();
    soundManager.playCelebration();
    setIsOpen(true);

    // Heart-shaped confetti celebration
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
    });

    confetti({
      shapes: [heart],
      particleCount: 50,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#f8c8d5', '#ffd1dc', '#72173e', '#e6859f', '#fff5eb'],
    });
  };

  const handleShowerLove = () => {
    soundManager.playPop();
    soundManager.playChime();
    confetti({
      particleCount: 35,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#f8c8d5', '#72173e', '#ffd1dc', '#fff5eb'],
    });
  };

  return (
    <footer id="final-surprise" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#f8c8d5]/20 mt-10">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#72173e]/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
      >
        <Gift className="w-3.5 h-3.5 text-[#e6859f]" />
        <span className="font-handwriting text-base font-bold">The Last Birthday Present</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-4"
      >
        One Last Surprise For You 🎁✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-xl sm:text-2xl text-[#fce7ec]/85 max-w-md mx-auto mb-10"
      >
        There is one more little gift box waiting just for you.
      </motion.p>

      {/* Interactive Gift Box */}
      <div className="relative max-w-md mx-auto flex flex-col items-center">
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenGift}
            className="cursor-pointer relative w-full rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-8 paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center group"
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape-pink rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#54112e]">
                TAP TO UNWRAP 🎀
              </span>
            </div>

            {/* Gift Box Icon / Animation */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#72173e] to-[#942052] border-2 border-[#f8c8d5] flex items-center justify-center my-4 shadow-xl text-4xl shadow-[#72173e]/40"
            >
              🎁
            </motion.div>

            <h3 className="font-serif text-2xl font-bold text-[#3b0c20] mb-1">
              Your Birthday Gift Box
            </h3>
            <p className="font-handwriting text-xl text-[#72173e] font-semibold">
              Click the present to open your final wish! ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14 }}
            className="relative w-full rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-8 sm:p-10 paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center text-center overflow-hidden"
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape-gold rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#7a590c]">
                WITH ALL MY LOVE ❤️
              </span>
            </div>

            {/* Heart Icon */}
            <div className="w-14 h-14 rounded-full bg-[#fce7ec] border border-[#f8c8d5] flex items-center justify-center mb-4 mt-2">
              <Heart className="w-7 h-7 text-[#72173e] fill-[#72173e] animate-pulse" />
            </div>

            {/* Exact Required Final Message */}
            <div className="space-y-3 font-serif text-base sm:text-lg text-[#3b0c20] leading-relaxed mb-6 font-medium">
              <p className="text-xl sm:text-2xl font-bold text-[#72173e]">
                Happy birthday, my love.
              </p>
              <p>
                I wish I could be beside you today.
              </p>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#54112e] font-bold">
                Until then, sending you the biggest hug through this little surprise. ❤️
              </p>
            </div>

            {/* Shower With Hugs Button */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleShowerLove}
                className="px-6 py-2.5 rounded-full bg-[#72173e] hover:bg-[#942052] text-[#fffdfa] font-serif text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Send Another Big Hug 🤗</span>
              </button>

              <button
                onClick={onReplay}
                className="px-6 py-2.5 rounded-full bg-[#fffdfa] hover:bg-[#fce7ec] text-[#54112e] border-2 border-[#f8c8d5] font-serif text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Surprise ↻</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Romantic Closing Footer */}
      <div className="mt-16 pt-6 border-t border-[#f8c8d5]/15">
        <p className="font-handwriting text-2xl sm:text-3xl text-[#f8c8d5]">
          Forever your girl, always & forever ❤️
        </p>
        <p className="font-serif text-xs text-[#fce7ec]/50 uppercase tracking-widest mt-1">
          Made especially for my favourite Ghuggu 🦉
        </p>
      </div>
    </footer>
  );
}

