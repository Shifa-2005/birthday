import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Page1Countdown from './pages/Page1Countdown';
import Page2CatSurprise from './pages/Page2CatSurprise';
import Page3BirthdayLetter from './pages/Page3BirthdayLetter';
import Page4AZReasons from './pages/Page4AZReasons';
import Page4CakeSurprise from './pages/Page4CakeSurprise';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden select-none">
      {/* Persistent Ambient Music Toggle */}
      <MusicPlayer />

      {/* Full-Screen Page Transitions */}
      <AnimatePresence mode="wait">
        {/* PAGE 1: COUNTDOWN */}
        {currentPage === 1 && (
          <motion.div
            key="page-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Page1Countdown onNext={() => goToPage(2)} />
          </motion.div>
        )}

        {/* PAGE 2: BUBU & DUDU SURPRISE */}
        {currentPage === 2 && (
          <motion.div
            key="page-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <Page2CatSurprise
              onNext={() => goToPage(3)}
              onBack={() => goToPage(1)}
            />
          </motion.div>
        )}

        {/* PAGE 3: BIRTHDAY LETTER */}
        {currentPage === 3 && (
          <motion.div
            key="page-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <Page3BirthdayLetter
              onNext={() => goToPage(4)}
              onBack={() => goToPage(2)}
            />
          </motion.div>
        )}

        {/* PAGE 4: A–Z REASONS I LOVE YOU */}
        {currentPage === 4 && (
          <motion.div
            key="page-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full"
          >
            <Page4AZReasons
              onNext={() => goToPage(5)}
              onBack={() => goToPage(3)}
            />
          </motion.div>
        )}

        {/* PAGE 5: BIRTHDAY CAKE */}
        {currentPage === 5 && (
          <motion.div
            key="page-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Page4CakeSurprise
              onReplay={() => goToPage(1)}
              onBack={() => goToPage(4)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
