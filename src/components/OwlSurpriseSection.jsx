import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import CuteOwl from './CuteOwl';

export default function OwlSurpriseSection() {
  const [isPopped, setIsPopped] = useState(false);
  const [cuddleCount, setCuddleCount] = useState(0);

  const handlePopOwl = () => {
    soundManager.playPop();
    soundManager.playCelebration();
    setIsPopped(true);

    confetti({
      particleCount: 60,
      spread: 65,
      origin: { y: 0.65 },
      colors: ['#f8c8d5', '#ffd1dc', '#fef08a', '#72173e', '#fff5eb'],
    });
  };

  const handleCuddle = () => {
    soundManager.playPop();
    setCuddleCount((prev) => prev + 1);

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#f8c8d5', '#e6859f', '#fff5eb'],
    });
  };

  return (
    <section id="owl-surprise" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#942052]/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
      >
        <span className="text-sm">🦉</span>
        <span className="font-handwriting text-base font-bold">Special Owl Surprise</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-4"
      >
        A Little Ghuggu Surprise 🦉✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-xl sm:text-2xl text-[#fce7ec]/85 max-w-md mx-auto mb-10"
      >
        There is a cute little friend waiting to wish you a happy birthday!
      </motion.p>

      {/* Interactive Nest / Peek Card */}
      <div className="relative max-w-md mx-auto flex flex-col items-center">
        {!isPopped ? (
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handlePopOwl}
            className="cursor-pointer relative w-full rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-8 paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center group"
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape-gold rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#7a590c]">
                PEEK INSIDE! 🦉
              </span>
            </div>

            {/* Nest / Box Icon */}
            <div className="w-24 h-24 rounded-full bg-[#fce7ec] border-2 border-[#f8c8d5] flex items-center justify-center my-4 shadow-inner group-hover:scale-110 transition-transform">
              <span className="text-5xl animate-bounce">🎁</span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#3b0c20] mb-1">
              Who is hiding in here?
            </h3>
            <p className="font-handwriting text-xl text-[#72173e] font-semibold">
              Tap to see your special birthday owl! ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 12 }}
            className="relative w-full rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-8 paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center text-center overflow-hidden"
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape-pink rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#54112e]">
                HOOT HOOT! 🦉❤️
              </span>
            </div>

            {/* Owl Appearance */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="my-3"
            >
              <CuteOwl size={145} hasPartyHat={true} interactive={true} />
            </motion.div>

            {/* Exact Required Message */}
            <div className="p-4 rounded-2xl bg-[#fce7ec] border border-[#f8c8d5] mb-5 w-full">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3b0c20] mb-1">
                My favourite Ghuggu in the whole world! 🦉❤️
              </h3>
              <p className="font-handwriting text-xl sm:text-2xl text-[#72173e] font-semibold">
                Sending you the biggest feathery birthday hug! 🥰
              </p>
            </div>

            {/* Interactive Cuddle Button */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleCuddle}
                className="px-6 py-2.5 rounded-full bg-[#72173e] hover:bg-[#942052] text-[#fffdfa] font-serif text-sm font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Heart className="w-4 h-4 fill-[#fffdfa]" />
                <span>Give Ghuggu a Birthday Hug</span>
                <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs font-mono">
                  {cuddleCount > 0 ? `+${cuddleCount}` : '🤗'}
                </span>
              </button>
              <span className="font-handwriting text-sm text-[#72173e]/70">
                (Tap the owl anytime to hear him celebrate!)
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

