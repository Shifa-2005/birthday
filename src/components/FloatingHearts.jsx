import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingHearts() {
  const floatingElements = useMemo(() => {
    const symbols = ['🎈', '🐾', '💖', '✨', '💕', '⭐', '🎈', '🌸', '🐾', '❤️'];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${(i * 3.4 + 2) % 96}%`,
      size: 16 + (i % 6) * 5,
      duration: 12 + (i % 7) * 3,
      delay: (i % 8) * 1.5,
      opacity: 0.28 + (i % 4) * 0.08,
      horizontalDrift: ((i % 3) - 1) * 45,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dreamy soft pastel ambient glow orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-[#ffd1dc]/35 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] bg-[#f8c8d5]/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-[#fef08a]/20 rounded-full blur-[110px]" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#ffd1dc]/25 rounded-full blur-[100px]" />

      {/* Floating balloons, paw prints, hearts & sparkles */}
      {floatingElements.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none"
          style={{
            left: item.left,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
          }}
          initial={{ y: '105vh', x: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            x: [0, item.horizontalDrift, -item.horizontalDrift, 0],
            rotate: [0, 18, -18, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
}
