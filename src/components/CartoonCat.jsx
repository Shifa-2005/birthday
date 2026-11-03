import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function CartoonCat({
  size = 110,
  variant = 'sitting', // 'sitting', 'party', 'playful', 'peeking'
  color = '#fffdfa',   // white/cream cat
  accentColor = '#f8c8d5', // soft pink
  interactive = true,
  speechText = null,
}) {
  const [isReacting, setIsReacting] = useState(false);

  const handleClick = (e) => {
    if (!interactive) return;
    e.stopPropagation();
    soundManager.playMeow();
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 1400);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center select-none ${
        interactive ? 'cursor-pointer' : ''
      }`}
      style={{ width: size, height: size * 1.1 }}
    >
      {/* Interactive Heart / Meow Reaction Bubble */}
      {isReacting && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.6 }}
          animate={{ opacity: 1, y: -40, scale: 1.2 }}
          exit={{ opacity: 0 }}
          className="absolute -top-7 z-40 px-2.5 py-1 rounded-full bg-white text-[#72173e] text-xs font-handwriting font-bold shadow-md border border-[#f8c8d5] whitespace-nowrap pointer-events-none"
        >
          Meow! *purrr* 🐾❤️
        </motion.div>
      )}

      {/* Speech Text Bubble if provided */}
      {speechText && !isReacting && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 z-30 px-2.5 py-1 rounded-full bg-white text-[#54112e] text-[11px] font-handwriting font-bold shadow-sm border border-[#f8c8d5] whitespace-nowrap pointer-events-none"
        >
          {speechText}
        </motion.div>
      )}

      {/* SVG Cartoon Cat Character */}
      <motion.svg
        viewBox="0 0 120 130"
        className="w-full h-full filter drop-shadow-md"
        animate={
          isReacting
            ? { y: [0, -18, 0], scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] }
            : variant === 'playful'
            ? { y: [0, -8, 0], rotate: [0, 3, -3, 0] }
            : { y: [0, -3, 0] }
        }
        transition={
          isReacting
            ? { duration: 0.5, ease: 'easeOut' }
            : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
        }
      >
        {/* Cat Tail with wagging animation */}
        <motion.path
          d="M32 95 C 15 90, 8 70, 22 58 C 28 53, 30 60, 26 66 C 18 78, 26 84, 38 88"
          fill="none"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          animate={{ rotate: [-8, 12, -8] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ originX: '34px', originY: '92px' }}
        />

        {/* Cat Chubby Body */}
        <ellipse cx="60" cy="85" rx="35" ry="32" fill={color} stroke="#3b0c20" strokeWidth="2.5" />

        {/* White/Cream Fluffy Chest Patch */}
        <ellipse cx="60" cy="88" rx="20" ry="20" fill="#fff5eb" />

        {/* Cat Ears */}
        {/* Left Ear */}
        <polygon points="32,48 40,15 62,35" fill={color} stroke="#3b0c20" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="36,44 42,22 56,36" fill={accentColor} />

        {/* Right Ear */}
        <polygon points="88,48 80,15 58,35" fill={color} stroke="#3b0c20" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="84,44 78,22 64,36" fill={accentColor} />

        {/* Cat Round Head */}
        <ellipse cx="60" cy="46" rx="33" ry="27" fill={color} stroke="#3b0c20" strokeWidth="2.5" />

        {/* Party Hat (if variant is 'party') */}
        {variant === 'party' && (
          <g>
            <polygon points="60,6 48,28 72,28" fill="#e6859f" stroke="#3b0c20" strokeWidth="1.5" />
            <line x1="52" y1="20" x2="68" y2="20" stroke="#fef08a" strokeWidth="2.5" />
            <circle cx="60" cy="5" r="4" fill="#fef08a" stroke="#d4af37" strokeWidth="1" />
          </g>
        )}

        {/* Cute Blinking Eyes */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.45, 0.5, 0.55, 1] }}
          style={{ originY: '44px' }}
        >
          {/* Left Eye */}
          <circle cx="48" cy="44" r="5.5" fill="#240713" />
          <circle cx="46" cy="42" r="2" fill="#ffffff" />
          <circle cx="50" cy="46" r="1" fill="#ffffff" />

          {/* Right Eye */}
          <circle cx="72" cy="44" r="5.5" fill="#240713" />
          <circle cx="70" cy="42" r="2" fill="#ffffff" />
          <circle cx="74" cy="46" r="1" fill="#ffffff" />
        </motion.g>

        {/* Cute Rosy Blushing Cheeks */}
        <ellipse cx="38" cy="51" rx="5" ry="3" fill="#f8c8d5" opacity="0.8" />
        <ellipse cx="82" cy="51" rx="5" ry="3" fill="#f8c8d5" opacity="0.8" />

        {/* Cute Pink Triangular Nose */}
        <polygon points="60,50 56,47 64,47" fill="#e6859f" />

        {/* Cute 'w' Smile Mouth */}
        <path d="M54,53 Q57,56 60,53 Q63,56 66,53" fill="none" stroke="#3b0c20" strokeWidth="1.8" strokeLinecap="round" />

        {/* Whiskers */}
        {/* Left Whiskers */}
        <line x1="28" y1="46" x2="42" y2="48" stroke="#3b0c20" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="26" y1="52" x2="42" y2="52" stroke="#3b0c20" strokeWidth="1.2" strokeLinecap="round" />
        {/* Right Whiskers */}
        <line x1="92" y1="46" x2="78" y2="48" stroke="#3b0c20" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="94" y1="52" x2="78" y2="52" stroke="#3b0c20" strokeWidth="1.2" strokeLinecap="round" />

        {/* Paws */}
        <ellipse cx="48" cy="110" rx="9" ry="7" fill={color} stroke="#3b0c20" strokeWidth="2" />
        <ellipse cx="72" cy="110" rx="9" ry="7" fill={color} stroke="#3b0c20" strokeWidth="2" />

        {/* Paw toe dividers */}
        <line x1="45" y1="108" x2="45" y2="114" stroke="#e6859f" strokeWidth="1.2" />
        <line x1="51" y1="108" x2="51" y2="114" stroke="#e6859f" strokeWidth="1.2" />
        <line x1="69" y1="108" x2="69" y2="114" stroke="#e6859f" strokeWidth="1.2" />
        <line x1="75" y1="108" x2="75" y2="114" stroke="#e6859f" strokeWidth="1.2" />
      </motion.svg>
    </div>
  );
}

