import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, X, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';
import { surpriseMessages } from '../data/surprises';
import { soundManager } from '../utils/audio';

export default function SurpriseMessagesSection() {
  const [activeSurprise, setActiveSurprise] = useState(null);

  const handleOpenSurprise = (surprise) => {
    soundManager.playPop();
    soundManager.playChime();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#f8c8d5', '#72173e', '#fff5eb', '#d4af37'],
    });
    setActiveSurprise(surprise);
  };

  const handleClose = () => {
    soundManager.playPop();
    setActiveSurprise(null);
  };

  return (
    <section id="surprises" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-[#942052]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b0c20]/60 border border-[#f8c8d5]/20 text-xs sm:text-sm text-[#f8c8d5] font-serif uppercase tracking-widest mb-3"
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Interactive Keepsakes</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-4"
        >
          Three Surprise Messages
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#fce7ec]/80 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed"
        >
          Click each surprise box below to unlock special notes meant just for your eyes and heart.
        </motion.p>
      </div>

      {/* 3 Interactive Surprise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {surpriseMessages.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => handleOpenSurprise(item)}
            className="cursor-pointer group relative rounded-3xl p-7 bg-gradient-to-b from-[#240713]/90 via-[#1c050f]/90 to-[#100308]/95 border border-[#f8c8d5]/25 hover:border-[#f8c8d5]/50 shadow-xl shadow-[#3b0c20]/30 hover:shadow-[#72173e]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Ribbon Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-xs uppercase tracking-widest text-[#f8c8d5] px-3 py-1 rounded-full bg-[#3b0c20]/80 border border-[#f8c8d5]/20">
                Box {item.boxNumber}
              </span>
              <span className="text-[11px] font-mono text-[#fce7ec]/60">
                {item.sealText}
              </span>
            </div>

            {/* Visual Box Icon */}
            <div className="my-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3b0c20] to-[#72173e] border border-[#f8c8d5]/30 flex items-center justify-center shadow-lg shadow-[#72173e]/40 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-4">
                <Gift className="w-8 h-8 text-[#f8c8d5]" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#fff5eb] mb-2 group-hover:text-[#f8c8d5] transition-colors">
                {item.title}
              </h3>

              <p className="text-[#fce7ec]/70 text-xs sm:text-sm font-light leading-relaxed mb-4">
                {item.teaser}
              </p>
            </div>

            {/* Bottom action button */}
            <div className="mt-4 pt-4 border-t border-[#f8c8d5]/10 flex items-center justify-center">
              <span className="text-xs font-serif text-[#f8c8d5] tracking-wider group-hover:text-[#fff5eb] flex items-center gap-1.5 transition-colors">
                <span>Click to Unwrap</span>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Surprise Modal */}
      <AnimatePresence>
        {activeSurprise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#2b0816] via-[#1a050e] to-[#0f0308] border-2 border-[#f8c8d5]/40 shadow-2xl shadow-[#72173e]/60 p-7 sm:p-9 text-left overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#3b0c20]/80 hover:bg-[#72173e] text-[#f8c8d5] hover:text-[#fff5eb] border border-[#f8c8d5]/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag / Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#54112e]/70 border border-[#f8c8d5]/30 text-xs text-[#f8c8d5] font-serif uppercase tracking-wider mb-4">
                <Heart className="w-3 h-3 fill-[#f8c8d5]" />
                <span>{activeSurprise.badge}</span>
              </div>

              {/* Modal Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fff5eb] text-glow mb-4">
                {activeSurprise.title}
              </h3>

              {/* Content Paragraphs */}
              <div className="font-sans text-[#fce7ec]/90 text-sm sm:text-base leading-relaxed space-y-3 mb-6 font-light">
                {activeSurprise.message.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Romantic Quote banner */}
              <div className="p-4 rounded-xl bg-[#3b0c20]/50 border border-[#f8c8d5]/20 flex items-start gap-3">
                <Quote className="w-5 h-5 text-[#f8c8d5] shrink-0 mt-0.5" />
                <p className="font-serif italic text-xs sm:text-sm text-[#f8c8d5]">
                  {activeSurprise.quote}
                </p>
              </div>

              {/* Close button */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-[#72173e] hover:bg-[#942052] text-[#fff5eb] font-serif text-xs tracking-wider border border-[#f8c8d5]/30 cursor-pointer shadow-md transition-colors"
                >
                  Close & Keep in Heart ❤️
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

