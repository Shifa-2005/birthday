import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Cake, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import CuteOwl from './CuteOwl';

export default function BirthdayCardSection({ onScrollToNext }) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [lovePops, setLovePops] = useState([]);
  const [loveCount, setLoveCount] = useState(0);

  const toggleCard = () => {
    soundManager.playPop();
    if (!isCardOpen) {
      soundManager.playCelebration();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f8c8d5', '#72173e', '#ffd1dc', '#fef08a', '#fff5eb'],
      });
    }
    setIsCardOpen(!isCardOpen);
  };

  const handleSendLove = (e) => {
    e.stopPropagation();
    soundManager.playPop();
    setLoveCount((prev) => prev + 1);

    const id = Date.now() + Math.random();
    setLovePops((prev) => [...prev, { id, x: (Math.random() - 0.5) * 60 }]);
    setTimeout(() => {
      setLovePops((prev) => prev.filter((p) => p.id !== id));
    }, 1200);

    if ((loveCount + 1) % 4 === 0) {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#f8c8d5', '#72173e', '#fff5eb'],
      });
    }
  };

  return (
    <section id="birthday-card" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] bg-[#72173e]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Cute Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-md mb-8"
      >
        <span className="text-base">🦉</span>
        <span className="font-handwriting text-base sm:text-lg font-bold tracking-wide">
          Special Birthday Card for My Ghuggu
        </span>
        <Sparkles className="w-4 h-4 text-[#e6859f]" />
      </motion.div>

      {/* Interactive Birthday Card Container */}
      <div className="relative max-w-xl w-full mx-auto flex flex-col items-center">
        
        {/* Closed Card Front */}
        {!isCardOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={toggleCard}
            className="cursor-pointer relative w-full rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-8 sm:p-12 paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center justify-between group overflow-hidden"
          >
            {/* Washi Tape Accent */}
            <div className="absolute -top-3.5 left-8 w-24 h-7 washi-tape-gold rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#7a590c]">
                SPECIAL CARD ✨
              </span>
            </div>
            <div className="absolute -top-3.5 right-8 w-24 h-7 washi-tape-pink rounded-sm flex items-center justify-center">
              <span className="font-handwriting text-xs font-bold text-[#54112e]">
                FOR YOU ❤️
              </span>
            </div>

            {/* Owl Greeting on Front */}
            <div className="my-4 flex flex-col items-center">
              <CuteOwl size={130} hasPartyHat={true} />
              
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3b0c20] mt-4 mb-1">
                To The Sweetest Ghuggu 🦉
              </h2>
              <p className="font-handwriting text-xl sm:text-2xl text-[#72173e] font-semibold">
                Tap here to open your birthday card! 💌
              </p>
            </div>

            {/* Decorative Ribbon & Heart */}
            <div className="mt-4 pt-4 border-t-2 border-dashed border-[#f8c8d5] w-full flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#e6859f]" />
              <span className="font-handwriting text-base font-bold text-[#54112e]">
                Click to unwrap the love inside!
              </span>
              <Sparkles className="w-4 h-4 text-[#e6859f]" />
            </div>
          </motion.div>
        )}

        {/* Opened Card Inside */}
        <AnimatePresence>
          {isCardOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.94 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full relative rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-7 sm:p-10 paper-shadow border-4 border-[#f8c8d5] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Cute Party Bunting at Top */}
              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl mb-4 select-none">
                <span>🎈</span>
                <span>✨</span>
                <span>🎉</span>
                <span>🎂</span>
                <span>🎉</span>
                <span>✨</span>
                <span>🎈</span>
              </div>

              {/* Main Inside Birthday Title */}
              <motion.h2
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="font-serif text-3xl sm:text-5xl font-bold text-[#3b0c20] tracking-tight mb-2"
              >
                Happy Birthday, <br />
                <span className="font-script text-4xl sm:text-6xl text-[#72173e]">
                  My Ghuggu! ❤️
                </span>
              </motion.h2>

              <p className="font-handwriting text-xl sm:text-2xl text-[#72173e] font-semibold mb-6">
                You make every single day brighter, sweeter & warmer.
              </p>

              {/* Polaroid Frame of His Photo with Cute Scrapbook Pins */}
              <div className="relative my-2 p-3 sm:p-4 bg-white rounded-2xl shadow-lg border border-[#f8c8d5] flex flex-col items-center max-w-[280px] sm:max-w-[320px]">
                {/* Washi tape over polaroid */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape-pink rounded-sm flex items-center justify-center">
                  <span className="font-handwriting text-xs font-bold text-[#54112e]">
                    MY HANDSOME MAN ❤️
                  </span>
                </div>

                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-xl overflow-hidden bg-[#240713] mt-2 mb-3 border border-[#f8c8d5]/40 shadow-inner">
                  <img
                    src="/moments/photos/birthday-boy.jpg"
                    alt="My Birthday Boy Ghuggu"
                    onError={(e) => {
                      if (!e.target.src.endsWith('.jpeg')) {
                        e.target.src = '/moments/photos/birthday-boy.jpg.jpeg';
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="font-handwriting text-xl font-bold text-[#3b0c20]">
                  My favourite person in the world 🦉✨
                </p>
              </div>

              {/* Romantic paragraph */}
              <p className="font-serif text-sm sm:text-base text-[#54112e] max-w-md mx-auto leading-relaxed mt-6 mb-6">
                Wishing the sweetest, most handsome man the happiest birthday ever! 
                Thank you for being my peace, my smile, and my favourite reason to laugh.
              </p>

              {/* Send Love Button */}
              <div className="relative mb-6">
                <button
                  onClick={handleSendLove}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#72173e] to-[#942052] hover:from-[#942052] hover:to-[#72173e] text-[#fffdfa] font-serif text-sm sm:text-base font-semibold shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Heart className="w-4 h-4 fill-[#fffdfa]" />
                  <span>Send Ghuggu Love</span>
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs font-mono">
                    {loveCount > 0 ? `+${loveCount}` : '❤️'}
                  </span>
                </button>

                {/* Floating Love Pops */}
                <AnimatePresence>
                  {lovePops.map((pop) => (
                    <motion.div
                      key={pop.id}
                      initial={{ opacity: 1, y: 0, x: pop.x, scale: 0.8 }}
                      animate={{ opacity: 0, y: -50, scale: 1.4 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-1/2 -top-4 pointer-events-none text-xl"
                    >
                      💖
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Close / Fold Button */}
              <button
                onClick={toggleCard}
                className="font-handwriting text-base text-[#72173e] hover:text-[#3b0c20] underline cursor-pointer"
              >
                (Fold card back ✉️)
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Scroll Down Hint */}
      <motion.button
        onClick={onScrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 flex flex-col items-center gap-1.5 text-xs text-[#f8c8d5]/80 hover:text-[#fff5eb] transition-colors cursor-pointer group"
      >
        <span className="font-handwriting text-base">Read your letter & surprises below ↓</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#f8c8d5]" />
        </motion.div>
      </motion.button>
    </section>
  );
}

