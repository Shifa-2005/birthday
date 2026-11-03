import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/audio';

export default function PlayfulCats() {
  const [walkerX, setWalkerX] = useState(12);
  const [walkerDir, setWalkerDir] = useState(1);
  const [isWalkerJumping, setIsWalkerJumping] = useState(false);
  const [speechBubble, setSpeechBubble] = useState("Hi Ghuggu! 🐾❤️");

  // Heart-catcher cat states
  const [catcherSwat, setCatcherSwat] = useState(false);

  // Peeking cat state
  const [peekerReact, setPeekerReact] = useState(false);

  // Interactive toy / yarn drops
  const [toys, setToys] = useState([]);

  // Strolling cat loop
  useEffect(() => {
    const walkTimer = setInterval(() => {
      if (!isWalkerJumping) {
        setWalkerX((prev) => {
          let next = prev + walkerDir * 14;
          if (next > 78) {
            setWalkerDir(-1);
            return 78;
          } else if (next < 6) {
            setWalkerDir(1);
            return 6;
          }
          return next;
        });

        const quotes = [
          "Hi Ghuggu! 🐾❤️",
          "Someone is super handsome today! 😻",
          "Click me! *purrr* ✨",
          "Best birthday ever! 🎉",
          "Hoot hoot & Meow! 🦉🐱",
          "You're her favourite person! 💖"
        ];
        if (Math.random() > 0.4) {
          setSpeechBubble(quotes[Math.floor(Math.random() * quotes.length)]);
        }
      }
    }, 4200);

    return () => clearInterval(walkTimer);
  }, [walkerDir, isWalkerJumping]);

  // Heart swatting loop for Cat 2
  useEffect(() => {
    const swatTimer = setInterval(() => {
      setCatcherSwat(true);
      setTimeout(() => setCatcherSwat(false), 900);
    }, 3800);
    return () => clearInterval(swatTimer);
  }, []);

  const handleWalkerTap = () => {
    soundManager.playMeow();
    setIsWalkerJumping(true);
    setSpeechBubble("Meow! I love you Ghuggu! 🐾💖");
    setTimeout(() => setIsWalkerJumping(false), 1200);
  };

  const handlePeekerTap = () => {
    soundManager.playMeow();
    setPeekerReact(true);
    setTimeout(() => setPeekerReact(false), 1400);
  };

  const dropYarnToy = () => {
    soundManager.playPop();
    soundManager.playMeow();
    const id = Date.now();
    setToys((prev) => [...prev, { id, x: Math.random() * 70 + 15 }]);
    setTimeout(() => {
      setToys((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  return (
    <>
      {/* 1. Walking Cat across the screen bottom */}
      <div className="fixed bottom-2 sm:bottom-4 z-40 pointer-events-none w-full max-w-6xl left-1/2 -translate-x-1/2 px-4">
        <motion.div
          animate={{ left: `${walkerX}%` }}
          transition={{ duration: 3.5, ease: 'easeInOut' }}
          className="absolute bottom-0 pointer-events-auto cursor-pointer flex flex-col items-center"
          onClick={handleWalkerTap}
          style={{ transform: `scaleX(${walkerDir})` }}
        >
          {/* Speech Bubble */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-1 px-3 py-1 rounded-full bg-white text-[#72173e] text-xs font-handwriting font-bold shadow-md border-2 border-[#f8c8d5] whitespace-nowrap"
            style={{ transform: `scaleX(${walkerDir})` }}
          >
            {speechBubble}
          </motion.div>

          {/* Animated SVG Walking Cat */}
          <motion.div
            animate={
              isWalkerJumping
                ? { y: [0, -40, 0], scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] }
                : { y: [0, -6, 0] }
            }
            transition={
              isWalkerJumping
                ? { duration: 0.8, ease: 'easeOut' }
                : { repeat: Infinity, duration: 0.55, ease: 'linear' }
            }
            className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-md"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Wagging tail */}
              <motion.path
                d="M20 70 C 10 65, 5 45, 18 35 C 24 30, 26 38, 22 44"
                fill="none"
                stroke="#fffdfa"
                strokeWidth="7"
                strokeLinecap="round"
                animate={{ rotate: [-12, 16, -12] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                style={{ originX: '20px', originY: '68px' }}
              />

              {/* Cat Body */}
              <ellipse cx="48" cy="65" rx="26" ry="20" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />

              {/* Walking Paws */}
              <motion.ellipse
                cx="35" cy="82" rx="6" ry="5" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2"
                animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              />
              <motion.ellipse
                cx="46" cy="82" rx="6" ry="5" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2"
                animate={{ y: [-5, 0, -5] }} transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              />
              <motion.ellipse
                cx="58" cy="82" rx="6" ry="5" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2"
                animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              />
              <motion.ellipse
                cx="69" cy="82" rx="6" ry="5" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2"
                animate={{ y: [-5, 0, -5] }} transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
              />

              {/* Ears */}
              <polygon points="56,38 62,12 76,28" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
              <polygon points="59,34 64,18 73,28" fill="#f8c8d5" />
              <polygon points="82,38 88,12 74,28" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
              <polygon points="80,34 84,18 76,28" fill="#f8c8d5" />

              {/* Head */}
              <ellipse cx="70" cy="38" rx="22" ry="18" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />

              {/* Blinking eyes */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, times: [0, 0.45, 0.5, 1] }}
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

              {/* Nose & mouth */}
              <polygon points="70,41 68,39 72,39" fill="#e6859f" />
              <path d="M66,43 Q68,45 70,43 Q72,45 74,43" fill="none" stroke="#3b0c20" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. Cat Playing with Floating Heart (Bottom Right) */}
      <div className="fixed bottom-6 right-3 sm:right-8 z-30 pointer-events-none hidden md:flex flex-col items-center">
        {/* Floating Heart Bobbing Up and Down */}
        <motion.div
          animate={{ y: [0, -22, 0], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="text-2xl filter drop-shadow-md"
        >
          💖
        </motion.div>

        {/* Playful Cat Swatting */}
        <motion.div
          animate={
            catcherSwat
              ? { y: [0, -18, 0], rotate: [0, -8, 0] }
              : { y: [0, -3, 0] }
          }
          transition={{ duration: 0.6 }}
          className="w-16 h-16 filter drop-shadow-sm"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Body sitting */}
            <ellipse cx="50" cy="70" rx="24" ry="22" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
            
            {/* Paws reaching UP towards the heart! */}
            <motion.ellipse
              cx="42" cy="50" rx="6" ry="12" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2"
              animate={catcherSwat ? { y: -10 } : { y: 0 }}
            />
            <motion.ellipse
              cx="58" cy="50" rx="6" ry="12" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2"
              animate={catcherSwat ? { y: -14 } : { y: 0 }}
            />

            {/* Head looking up */}
            <ellipse cx="50" cy="40" rx="20" ry="18" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
            {/* Ears */}
            <polygon points="35,32 38,14 50,28" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
            <polygon points="38,28 40,18 47,26" fill="#f8c8d5" />
            <polygon points="65,32 62,14 50,28" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
            <polygon points="62,28 60,18 53,26" fill="#f8c8d5" />

            {/* Eyes looking UP */}
            <circle cx="43" cy="36" r="3.5" fill="#240713" />
            <circle cx="43" cy="34" r="1.3" fill="#ffffff" />
            <circle cx="57" cy="36" r="3.5" fill="#240713" />
            <circle cx="57" cy="34" r="1.3" fill="#ffffff" />

            {/* Smile & cheeks */}
            <circle cx="38" cy="42" r="3" fill="#f8c8d5" opacity="0.8" />
            <circle cx="62" cy="42" r="3" fill="#f8c8d5" opacity="0.8" />
            <path d="M46,42 Q50,45 54,42" fill="none" stroke="#3b0c20" strokeWidth="1.5" />

            {/* Tail swishing */}
            <motion.path
              d="M72 75 C 85 70, 88 50, 78 40"
              fill="none" stroke="#fffdfa" strokeWidth="6" strokeLinecap="round"
              animate={{ rotate: [-8, 12, -8] }} transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </svg>
        </motion.div>
      </div>

      {/* 3. Peeking Corner Cat (Left Screen Edge) */}
      <div className="fixed top-1/3 left-0 z-30 hidden sm:block">
        <motion.div
          whileHover={{ x: 12 }}
          onClick={handlePeekerTap}
          className="cursor-pointer flex items-center -ml-6 hover:ml-0 transition-all duration-300"
          title="Click to pet! 🐾"
        >
          <div className="w-14 h-20 filter drop-shadow-md">
            <svg viewBox="0 0 70 100" className="w-full h-full">
              {/* Half face peeking */}
              <ellipse cx="60" cy="50" rx="30" ry="30" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
              {/* Ears */}
              <polygon points="45,25 50,5 68,22" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
              <polygon points="48,22 52,10 64,20" fill="#f8c8d5" />
              {/* Big curious eye */}
              <circle cx="52" cy="46" r="6" fill="#240713" />
              <circle cx="50" cy="43" r="2.2" fill="#ffffff" />
              <circle cx="54" cy="48" r="1.2" fill="#ffffff" />
              {/* Pink blush & nose */}
              <circle cx="44" cy="55" r="4" fill="#f8c8d5" opacity="0.8" />
              <polygon points="65,54 62,51 68,51" fill="#e6859f" />
              {/* Paw peeking over edge */}
              <ellipse cx="66" cy="78" rx="8" ry="12" fill="#fffdfa" stroke="#3b0c20" strokeWidth="2.5" />
            </svg>
          </div>
          {peekerReact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="ml-2 px-2.5 py-1 rounded-full bg-white text-[#72173e] text-xs font-handwriting font-bold shadow-md border border-[#f8c8d5] whitespace-nowrap"
            >
              Hoot hoot! Cat hug for Ghuggu! 🐾❤️
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 4. Interactive "Throw Yarn Ball" Floating Action Button */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={dropYarnToy}
          className="group px-3.5 py-2 rounded-full bg-white/95 hover:bg-[#fffdfa] border-2 border-[#f8c8d5] shadow-md hover:shadow-lg text-[#54112e] text-xs font-handwriting font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          title="Play with the cats!"
        >
          <span className="text-base group-hover:rotate-12 transition-transform">🧶</span>
          <span>Toss Yarn</span>
        </button>
      </div>

      {/* Bouncing Toys when user tosses yarn */}
      <AnimatePresence>
        {toys.map((toy) => (
          <motion.div
            key={toy.id}
            initial={{ y: -50, x: `${toy.x}vw`, scale: 0.5 }}
            animate={{
              y: ['10vh', '80vh', '70vh', '82vh'],
              rotate: [0, 360, 720],
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="fixed z-40 pointer-events-none text-3xl filter drop-shadow-md"
          >
            🧶
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

