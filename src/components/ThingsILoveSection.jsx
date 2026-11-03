import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, HeartHandshake, Flame, Smile, Star, Heart, CheckCircle2 } from 'lucide-react';
import { loveReasons } from '../data/loveReasons';
import { soundManager } from '../utils/audio';

const iconMap = {
  Sparkles,
  Shield,
  HeartHandshake,
  Flame,
  Smile,
  Star,
};

export default function ThingsILoveSection() {
  const [openedCards, setOpenedCards] = useState({});

  const toggleCard = (id) => {
    soundManager.playPop();
    setOpenedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const unlockedCount = Object.values(openedCards).filter(Boolean).length;
  const totalCount = loveReasons.length;

  return (
    <section id="things-i-love" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
        >
          <span className="text-sm">🦉</span>
          <span className="font-handwriting text-base font-bold">Why You Mean The World</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-3"
        >
          Things I Love About You ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-[#fce7ec]/85 max-w-xl mx-auto"
        >
          A few little reasons that make my heart skip a beat every single day.
          <span className="block mt-1 text-base text-[#f8c8d5]">
            (Tap each card to reveal the secret note inside!)
          </span>
        </motion.p>

        {/* Counter Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#fffdfa] text-[#54112e] border border-[#f8c8d5] text-xs font-handwriting text-base shadow-sm"
        >
          <span>Discovered:</span>
          <span className="font-bold text-[#72173e]">{unlockedCount} / {totalCount}</span>
          {unlockedCount === totalCount && (
            <span className="text-emerald-600 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-4 h-4" /> All Unlocked!
            </span>
          )}
        </motion.div>
      </div>

      {/* Grid of Cute Scrapbook Note Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loveReasons.map((reason, index) => {
          const IconComponent = iconMap[reason.icon] || Sparkles;
          const isOpened = !!openedCards[reason.id];

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => toggleCard(reason.id)}
              className={`cursor-pointer relative rounded-3xl p-6 sm:p-7 border-3 transition-all duration-400 overflow-hidden flex flex-col justify-between ${
                isOpened
                  ? 'bg-[#fffdfa] text-[#240713] border-[#e6859f] paper-shadow scale-[1.02]'
                  : 'bg-[#fffdfa]/95 text-[#240713] border-[#f8c8d5] paper-shadow hover:border-[#e6859f]'
              }`}
            >
              {/* Card top ornament */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    isOpened
                      ? 'bg-[#72173e] border-[#f8c8d5] text-[#fffdfa] shadow-sm'
                      : 'bg-[#fce7ec] border-[#f8c8d5] text-[#72173e]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="font-handwriting text-sm font-bold px-3 py-1 rounded-full bg-[#fce7ec] text-[#72173e] border border-[#f8c8d5]">
                  {reason.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3b0c20] mb-2">
                {reason.title}
              </h3>

              {/* Preview or Expanded Details */}
              <div className="min-h-[72px] flex items-center">
                <AnimatePresence mode="wait">
                  {isOpened ? (
                    <motion.p
                      key="details"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-[#54112e] text-sm leading-relaxed font-normal"
                    >
                      {reason.details}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="preview"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="font-handwriting text-lg text-[#72173e] leading-snug"
                    >
                      "{reason.preview}"
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom toggle indicator */}
              <div className="mt-4 pt-3 border-t-2 border-dashed border-[#f8c8d5] flex items-center justify-between font-handwriting text-sm text-[#72173e]">
                <span className="font-bold">
                  {isOpened ? 'Tap to close note' : 'Tap to reveal full thought ✨'}
                </span>
                <span className="text-base">
                  {isOpened ? '❤️' : '💌'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
