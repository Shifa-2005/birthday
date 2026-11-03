import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function FinalWishesSection({ onReplay }) {
  const handleShowerHearts = () => {
    soundManager.playPop();
    soundManager.playChime();

    // Heart-shaped confetti celebration
    const scalar = 2;
    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
    });

    confetti({
      shapes: [heart],
      scalar,
      particleCount: 35,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#f8c8d5', '#72173e', '#e6859f', '#fff5eb'],
    });
  };

  return (
    <footer id="final-wishes" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#f8c8d5]/15 mt-10">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#72173e]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative center icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3b0c20] to-[#72173e] border border-[#f8c8d5]/40 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#72173e]/50"
      >
        <Heart className="w-8 h-8 text-[#f8c8d5] fill-[#f8c8d5] animate-pulse" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-4"
      >
        Happy Birthday, My Entire World ❤️
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-[#fce7ec]/85 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10"
      >
        I hope this birthday brings you as much happiness, peace, and warmth as you effortlessly bring into my life every day. Here is to celebrating you today and cherishing you always.
      </motion.p>

      {/* Action Buttons: Replay + Shower of Hearts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-16"
      >
        {/* Heart Burst Button */}
        <button
          onClick={handleShowerHearts}
          className="group px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#72173e] to-[#942052] hover:from-[#942052] hover:to-[#72173e] text-[#fff5eb] font-serif text-sm sm:text-base border border-[#f8c8d5]/40 shadow-xl shadow-[#72173e]/40 flex items-center gap-2.5 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#f8c8d5] group-hover:rotate-12 transition-transform" />
          <span>Shower With Hearts</span>
          <Heart className="w-4 h-4 text-[#f8c8d5] fill-[#f8c8d5]" />
        </button>

        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="px-6 sm:px-8 py-3.5 rounded-full bg-[#240713] hover:bg-[#3b0c20] text-[#f8c8d5] hover:text-[#fff5eb] font-serif text-sm sm:text-base border border-[#f8c8d5]/25 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Surprise ↻</span>
        </button>
      </motion.div>

      {/* Romantic Cursive Signature */}
      <div className="pt-8 border-t border-[#f8c8d5]/10">
        <p className="font-script text-2xl sm:text-3xl text-[#f8c8d5]">
          Always & Forever Yours
        </p>
        <p className="text-xs text-[#fce7ec]/50 uppercase tracking-widest font-serif mt-2">
          Made with all my love, just for you ❤️
        </p>
      </div>
    </footer>
  );
}

