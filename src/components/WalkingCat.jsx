import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function WalkingCat() {
  const [posX, setPosX] = useState(10); // percentage 10% to 85%
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isJumping, setIsJumping] = useState(false);
  const [catSpeech, setCatSpeech] = useState("Hi Ghuggu! 🐾");

  const speechNotes = [
    "Hi Ghuggu! 🐾❤️",
    "Someone is super handsome today! 😻",
    "Click me! *purrr* ✨",
    "Best birthday ever! 🎉",
    "You have my whole heart! 💖",
    "Hoot hoot & Meow! 🦉🐱",
  ];

  // Random gentle strolling across bottom
  useEffect(() => {
    const walkInterval = setInterval(() => {
      if (!isJumping) {
        setPosX((prev) => {
          let next = prev + direction * 12;
          if (next > 82) {
            setDirection(-1);
            return 82;
          } else if (next < 8) {
            setDirection(1);
            return 8;
          }
          return next;
        });

        // Chance to change speech bubble
        if (Math.random() > 0.5) {
          const randomNote = speechNotes[Math.floor(Math.random() * speechNotes.length)];
          setCatSpeech(randomNote);
        }
      }
    }, 4500);

    return () => clearInterval(walkInterval);
  }, [direction, isJumping]);

  const handleCatClick = () => {
    soundManager.playMeow();
    setIsJumping(true);
    setCatSpeech("Meow! I love you Ghuggu! 🐾💖");
    setTimeout(() => {
      setIsJumping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-3 sm:bottom-5 z-40 pointer-events-none w-full max-w-6xl left-1/2 -translate-x-1/2 px-4">
      <motion.div
        animate={{
          left: `${posX}%`,
        }}
        transition={{ duration: 3.8, ease: 'easeInOut' }}
        className="absolute bottom-0 pointer-events-auto cursor-pointer flex flex-col items-center"
        onClick={handleCatClick}
        style={{ transform: `scaleX(${direction})` }}
      >
        {/* Speech Bubble */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-1 px-3 py-1 rounded-full bg-[#fffdfa] text-[#72173e] text-xs font-handwriting font-bold shadow-md border-2 border-[#f8c8d5] whitespace-nowrap"
          style={{ transform: `scaleX(${direction})` }}
        >
          {catSpeech}
        </motion.div>

        {/* Animated Walking Cat SVG */}
        <motion.div
          animate={
            isJumping
              ? { y: [0, -35, 0], scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }
              : { y: [0, -6, 0] }
          }
          transition={
            isJumping
              ? { duration: 0.8, ease: 'easeOut' }
              : { repeat: Infinity, duration: 0.6, ease: 'linear' }
          }
          className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-lg"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Wagging tail */}
            <motion.path
              d="M20 70 C 10 65, 5 45, 18 35 C 24 30, 26 38, 22 44"
              fill="none"
              stroke="#fffdfa"
              strokeWidth="7"
              strokeLinecap="round"
              animate={{ rotate: [-10, 15, -10] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ originX: '20px', originY: '68px' }}
            />

            {/* Cat Body */}
            <ellipse cx="48" cy="65" rx="26" ry="20" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />

            {/* Paws with Walking Cycle */}
            <motion.ellipse
              cx="35"
              cy="82"
              rx="6"
              ry="5"
              fill="#fffdfa"
              stroke="#3b0c20"
              strokeWidth="1.8"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="45"
              cy="82"
              rx="6"
              ry="5"
              fill="#fffdfa"
              stroke="#3b0c20"
              strokeWidth="1.8"
              animate={{ y: [-4, 0, -4] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="58"
              cy="82"
              rx="6"
              ry="5"
              fill="#fffdfa"
              stroke="#3b0c20"
              strokeWidth="1.8"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="68"
              cy="82"
              rx="6"
              ry="5"
              fill="#fffdfa"
              stroke="#3b0c20"
              strokeWidth="1.8"
              animate={{ y: [-4, 0, -4] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            />

            {/* Cat Ears */}
            <polygon points="56,38 62,12 76,28" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />
            <polygon points="59,34 64,18 73,28" fill="#f8c8d5" />

            <polygon points="82,38 88,12 74,28" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />
            <polygon points="80,34 84,18 76,28" fill="#f8c8d5" />

            {/* Cat Head */}
            <ellipse cx="70" cy="38" rx="22" ry="18" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />

            {/* Blinking Eyes */}
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.45, 0.5, 1] }}
              style={{ originY: '36px' }}
            >
              <circle cx="63" cy="36" r="3.5" fill="#240713" />
              <circle cx="61.5" cy="34.5" r="1.2" fill="#ffffff" />

              <circle cx="77" cy="36" r="3.5" fill="#240713" />
              <circle cx="75.5" cy="34.5" r="1.2" fill="#ffffff" />
            </motion.g>

            {/* Pink cheeks */}
            <circle cx="58" cy="42" r="3" fill="#f8c8d5" opacity="0.8" />
            <circle cx="82" cy="42" r="3" fill="#f8c8d5" opacity="0.8" />

            {/* Nose & Mouth */}
            <polygon points="70,41 68,39 72,39" fill="#e6859f" />
            <path d="M66,43 Q68,45 70,43 Q72,45 74,43" fill="none" stroke="#3b0c20" strokeWidth="1.2" />

            {/* Whiskers */}
            <line x1="84" y1="38" x2="94" y2="39" stroke="#3b0c20" strokeWidth="1" />
            <line x1="83" y1="42" x2="93" y2="43" stroke="#3b0c20" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

