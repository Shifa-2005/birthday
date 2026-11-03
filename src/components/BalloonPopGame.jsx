import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import CartoonCat from './CartoonCat';

export default function BalloonPopGame() {
  const initialBalloons = [
    {
      id: 1,
      color: '#f8c8d5', // soft pink
      stringColor: '#e6859f',
      title: 'Balloon #1 🎈',
      catMessage: 'Meow! Ghuggu is officially 1 year more handsome & charming today! 🐾❤️',
      catVariant: 'party',
      hasMedia: null,
    },
    {
      id: 2,
      color: '#fef08a', // pastel gold
      stringColor: '#d4af37',
      title: 'Balloon #2 🎈',
      catMessage: 'Sending you 1,000,000 warm cuddles & kisses across the miles! 💋✨',
      catVariant: 'playful',
      hasMedia: null,
    },
    {
      id: 3,
      color: '#ffd1dc', // baby pink
      stringColor: '#f4b8c5',
      title: 'Balloon #3 🎈',
      catMessage: 'Warning: You are loved more than all the treats in the whole universe! 😻',
      catVariant: 'sitting',
      hasMedia: null,
    },
    {
      id: 4,
      color: '#e6859f', // rose burgundy
      stringColor: '#72173e',
      title: 'Balloon #4 🎈',
      catMessage: 'Look at this handsome man! You stole my whole heart forever, Ghuggu! 📸❤️',
      catVariant: 'party',
      hasMedia: {
        type: 'photo',
        src: '/moments/photos/birthday-boy.jpg',
        fallback: '/moments/photos/birthday-boy.jpg.jpeg',
        caption: 'My handsome birthday boy ❤️'
      },
    },
    {
      id: 5,
      color: '#fbcfe8', // lavender pink
      stringColor: '#be185d',
      title: 'Balloon #5 🎈',
      catMessage: 'Distance means nothing when you are my favourite smile to see! 📱🥹❤️',
      catVariant: 'playful',
      hasMedia: {
        type: 'screenshot',
        src: '/moments/screenshots/our-video-call.jpg',
        fallback: '/moments/screenshots/our-video-call.jpg.jpeg',
        caption: 'Our late night video call 🥹'
      },
    },
  ];

  const [poppedBalloons, setPoppedBalloons] = useState({});
  const [activeSurprise, setActiveSurprise] = useState(null);

  const handlePop = (balloon) => {
    if (poppedBalloons[balloon.id]) {
      // If already popped, clicking reveals the note again
      soundManager.playMeow();
      setActiveSurprise(balloon);
      return;
    }

    soundManager.playPop();
    soundManager.playMeow();

    setPoppedBalloons((prev) => {
      const updated = { ...prev, [balloon.id]: true };
      const count = Object.keys(updated).length;

      // Confetti burst for this pop
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: [balloon.color, '#fffdfa', '#72173e', '#f8c8d5'],
      });

      // If all 5 are popped, trigger grand celebration!
      if (count === initialBalloons.length) {
        setTimeout(() => {
          soundManager.playCelebration();
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#f8c8d5', '#ffd1dc', '#fef08a', '#72173e', '#fff5eb'],
          });
        }, 500);
      }

      return updated;
    });

    setActiveSurprise(balloon);
  };

  const handleReset = () => {
    soundManager.playPop();
    setPoppedBalloons({});
    setActiveSurprise(null);
  };

  const poppedCount = Object.keys(poppedBalloons).length;
  const isAllPopped = poppedCount === initialBalloons.length;

  return (
    <section id="balloon-pop" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#942052]/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
      >
        <span className="text-sm">🎈</span>
        <span className="font-handwriting text-base font-bold">Interactive Cat Surprise</span>
        <span className="text-sm">🐱</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-3"
      >
        Pop The Birthday Balloons! 🎈🐾
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-handwriting text-xl sm:text-2xl text-[#fce7ec]/85 max-w-lg mx-auto mb-4"
      >
        Tap each floating balloon to pop it! Cute animated cats have secret birthday notes waiting for you.
      </motion.p>

      {/* Counter Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] text-xs font-handwriting text-base shadow-sm mb-10">
        <span>Balloons Popped:</span>
        <span className="font-bold text-[#72173e]">{poppedCount} / {initialBalloons.length}</span>
        {isAllPopped && <span className="text-emerald-600 font-bold">🎉 All Popped!</span>}
      </div>

      {/* Floating Balloons Interactive Row */}
      <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10 my-4 min-h-[220px]">
        {initialBalloons.map((balloon, index) => {
          const isPopped = !!poppedBalloons[balloon.id];

          return (
            <div key={balloon.id} className="relative flex flex-col items-center">
              {!isPopped ? (
                /* Unpopped Floating Balloon */
                <motion.div
                  onClick={() => handlePop(balloon)}
                  whileHover={{ scale: 1.12, y: -8 }}
                  whileTap={{ scale: 0.88 }}
                  animate={{
                    y: [0, -14, 0],
                    rotate: [0, (index % 2 === 0 ? 3 : -3), 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + (index % 3) * 0.5,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                  className="cursor-pointer flex flex-col items-center select-none"
                  title="Click to pop!"
                >
                  {/* Balloon Oval */}
                  <div
                    className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg flex items-center justify-center border-2 border-white/60"
                    style={{ backgroundColor: balloon.color }}
                  >
                    {/* Shiny Highlight */}
                    <div className="absolute top-3 left-3 w-3.5 h-6 rounded-full bg-white/50 transform -rotate-45" />

                    <span className="text-xl sm:text-2xl filter drop-shadow">
                      {index === 3 ? '📸' : index === 4 ? '📱' : '❤️'}
                    </span>
                  </div>

                  {/* Balloon Knot */}
                  <div
                    className="w-2.5 h-2 -mt-0.5 rounded-sm"
                    style={{ backgroundColor: balloon.stringColor }}
                  />

                  {/* Balloon String */}
                  <svg width="20" height="40" className="opacity-80">
                    <path
                      d="M10,0 Q18,20 10,40"
                      fill="none"
                      stroke={balloon.stringColor}
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Tap Hint */}
                  <span className="font-handwriting text-xs text-[#f8c8d5] font-bold -mt-1">
                    Tap me!
                  </span>
                </motion.div>
              ) : (
                /* Popped State - Cute Cat Popped Out */
                <motion.div
                  initial={{ scale: 0.2, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  onClick={() => handlePop(balloon)}
                  className="cursor-pointer flex flex-col items-center select-none p-2 rounded-2xl bg-[#fffdfa]/90 border-2 border-[#f8c8d5] shadow-md"
                >
                  <CartoonCat size={72} variant={balloon.catVariant} interactive={false} />
                  <span className="font-handwriting text-xs font-bold text-[#72173e] mt-1">
                    Popped! 🐾
                  </span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Message Card / Cat Speech Bubble Modal */}
      <AnimatePresence>
        {activeSurprise && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="relative max-w-lg mx-auto my-8 p-6 sm:p-8 rounded-[2.5rem] bg-[#fffdfa] text-[#240713] paper-shadow border-4 border-[#f8c8d5] text-center"
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-36 h-7 washi-tape-pink rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#54112e]">
                FOR GHUGGU 🐾❤️
              </span>
            </div>

            {/* Cat Mascot */}
            <div className="my-2 flex justify-center">
              <CartoonCat size={95} variant={activeSurprise.catVariant} interactive={true} />
            </div>

            {/* Cat Message */}
            <p className="font-serif text-lg sm:text-xl font-bold text-[#3b0c20] leading-relaxed my-3">
              "{activeSurprise.catMessage}"
            </p>

            {/* Media Attachment if Balloon #4 or #5 */}
            {activeSurprise.hasMedia && (
              <div className="my-4 p-2 bg-white rounded-2xl border border-[#f8c8d5] shadow-sm max-w-[240px] mx-auto">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#240713]">
                  <img
                    src={activeSurprise.hasMedia.src}
                    alt={activeSurprise.hasMedia.caption}
                    onError={(e) => {
                      if (activeSurprise.hasMedia.fallback && !e.target.src.endsWith('.jpeg')) {
                        e.target.src = activeSurprise.hasMedia.fallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-handwriting text-sm font-bold text-[#72173e] mt-1.5">
                  {activeSurprise.hasMedia.caption}
                </p>
              </div>
            )}

            <button
              onClick={() => setActiveSurprise(null)}
              className="mt-3 px-5 py-2 rounded-full bg-[#72173e] hover:bg-[#942052] text-[#fffdfa] text-xs font-serif tracking-wider cursor-pointer shadow-sm"
            >
              Keep popping balloons! 🎈
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grand Birthday Celebration Unlock (When all 5 are popped) */}
      <AnimatePresence>
        {isAllPopped && !activeSurprise && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative max-w-xl mx-auto my-10 p-7 sm:p-10 rounded-[2.8rem] bg-[#fffdfa] text-[#240713] paper-shadow border-4 border-[#e6859f] text-center"
          >
            {/* Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-44 h-8 washi-tape-gold rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-sm font-bold text-[#7a590c]">
                🎉 QUEST COMPLETED! 🎉
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 my-3">
              <CartoonCat size={80} variant="party" />
              <div className="text-3xl sm:text-4xl animate-bounce">🎂</div>
              <CartoonCat size={80} variant="playful" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3b0c20] mb-2">
              All Balloons Popped, Ghuggu! 🐱🎈
            </h3>

            <p className="font-handwriting text-xl sm:text-2xl text-[#72173e] font-semibold leading-relaxed mb-6">
              You unlocked the entire birthday cat celebration! May this year bring you all the warmth, joy, success, and love in the world. ❤️✨
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#fce7ec] hover:bg-[#f8c8d5] text-[#54112e] border-2 border-[#f8c8d5] text-xs font-serif font-bold transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Pop Balloons Again 🎈</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

