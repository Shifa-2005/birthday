import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function CuteOwl({ size = 120, hasPartyHat = true, interactive = true }) {
  const [isHappy, setIsHappy] = useState(false);

  const handleTap = () => {
    if (!interactive) return;
    soundManager.playPop();
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 1500);
  };

  return (
    <div
      onClick={handleTap}
      className={`relative inline-flex flex-col items-center select-none ${
        interactive ? 'cursor-pointer' : ''
      }`}
      style={{ width: size, height: size * 1.15 }}
      title={interactive ? 'Tap Ghuggu for love! 🦉' : undefined}
    >
      {/* Floating love reaction on tap */}
      {isHappy && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -45, scale: 1.3 }}
          exit={{ opacity: 0 }}
          className="absolute -top-6 text-xl pointer-events-none z-30"
        >
          💖 Hoot Hoot! 💖
        </motion.div>
      )}

      <motion.svg
        viewBox="0 0 140 160"
        className="w-full h-full filter drop-shadow-lg"
        animate={isHappy ? { rotate: [0, -10, 10, -5, 0], scale: [1, 1.1, 1] } : { y: [0, -4, 0] }}
        transition={
          isHappy
            ? { duration: 0.6 }
            : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
        }
      >
        {/* Cute Party Hat */}
        {hasPartyHat && (
          <g>
            <polygon
              points="70,12 52,52 88,52"
              fill="#e6859f"
              stroke="#fff5eb"
              strokeWidth="2"
            />
            {/* Stripes on party hat */}
            <line x1="57" y1="42" x2="83" y2="42" stroke="#fef08a" strokeWidth="3" />
            <line x1="62" y1="30" x2="78" y2="30" stroke="#fffdfa" strokeWidth="2.5" />
            {/* Pom-pom on party hat */}
            <circle cx="70" cy="11" r="5.5" fill="#fef08a" stroke="#d4af37" strokeWidth="1" />
          </g>
        )}

        {/* Owl Ear Tufts */}
        <polygon points="35,46 45,72 26,62" fill="#54112e" />
        <polygon points="105,46 95,72 114,62" fill="#54112e" />

        {/* Owl Round Body */}
        <ellipse cx="70" cy="95" rx="46" ry="48" fill="#72173e" stroke="#f8c8d5" strokeWidth="2.5" />

        {/* Owl Cream Belly */}
        <ellipse cx="70" cy="104" rx="32" ry="34" fill="#fff5eb" />

        {/* Cute Feather Doodles on Belly (heart-like U shapes) */}
        <path d="M60,94 Q65,99 70,94" fill="none" stroke="#e6859f" strokeWidth="2" strokeLinecap="round" />
        <path d="M70,94 Q75,99 80,94" fill="none" stroke="#e6859f" strokeWidth="2" strokeLinecap="round" />
        <path d="M54,106 Q60,112 66,106" fill="none" stroke="#e6859f" strokeWidth="2" strokeLinecap="round" />
        <path d="M74,106 Q80,112 86,106" fill="none" stroke="#e6859f" strokeWidth="2" strokeLinecap="round" />
        <path d="M64,118 Q70,123 76,118" fill="none" stroke="#e6859f" strokeWidth="2" strokeLinecap="round" />

        {/* Owl Wings */}
        <ellipse cx="26" cy="96" rx="9" ry="24" transform="rotate(-15 26 96)" fill="#54112e" />
        <ellipse cx="114" cy="96" rx="9" ry="24" transform="rotate(15 114 96)" fill="#54112e" />

        {/* Left Big Eye White */}
        <circle cx="53" cy="74" r="16" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />
        {/* Right Big Eye White */}
        <circle cx="87" cy="74" r="16" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2" />

        {/* Pupils with Cute Sparkles */}
        <circle cx="55" cy="74" r="9" fill="#240713" />
        <circle cx="85" cy="74" r="9" fill="#240713" />
        {/* Eye Catchlights (cute shiny anime dots) */}
        <circle cx="52" cy="71" r="3.5" fill="#ffffff" />
        <circle cx="58" cy="77" r="1.5" fill="#ffffff" />
        <circle cx="82" cy="71" r="3.5" fill="#ffffff" />
        <circle cx="88" cy="77" r="1.5" fill="#ffffff" />

        {/* Owl Beak */}
        <polygon points="70,78 64,88 76,88" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="37" cy="85" rx="6" ry="3.5" fill="#f8c8d5" opacity="0.85" />
        <ellipse cx="103" cy="85" rx="6" ry="3.5" fill="#f8c8d5" opacity="0.85" />

        {/* Little Cute Orange Feet */}
        <ellipse cx="58" cy="144" rx="7" ry="4" fill="#fbbf24" />
        <ellipse cx="82" cy="144" rx="7" ry="4" fill="#fbbf24" />
      </motion.svg>
    </div>
  );
}

