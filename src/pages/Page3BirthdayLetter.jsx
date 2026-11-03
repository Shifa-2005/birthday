import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Maximize2, X, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

const letterParts = [
  {
    part: 1,
    title: "Miles Apart, But Close In Heart",
    paragraphs: [
      "I wish I could be there with you today, hugging you tightly, looking into your eyes and telling you how much I love you. I wish I could hold your hand, annoy you with my little talks, steal your attention and spend the whole day making you feel special. Since we're miles apart, I'm sending all my love through this little letter. But honestly, if I could choose one thing today, it would be to be right beside you.",
      "You mean so much to me, more than I think you'll ever fully understand. You're the person I want to share everything with, the person I miss even during the most ordinary moments and the person whose happiness genuinely matters to me. Sometimes I wish you could see yourself through my eyes because maybe then you'd understand why I love you this much.",
      "I love our conversations, our little moments and the way you make my days better. I love hearing your voice, talking about random things and sharing the smallest details of my day with you. Sometimes even a simple conversation with you makes me smile for hours. And sometimes I just wish I could be next to you, resting my head on your shoulder and doing absolutely nothing, just enjoying your presence.",
      "Distance isn't easy, especially when all I want is to see you, hug you and spend time with you. There are so many little things I wish we could do together. Going on dates, walking together, sharing food, laughing at silly things and making memories that belong only to us. I look forward to the day when I won't have to miss you through a screen anymore.",
      "And honestly, I love the thought of being your girl. ❤️ I love knowing that there's someone special in my life whom I can miss, care for and look forward to talking to. I love imagining our little moments together and all the beautiful memories we still have to make."
    ]
  },
  {
    part: 2,
    title: "So Proud Of You & Building Together",
    paragraphs: [
      "I'm so proud of you and everything you're working towards. I know you have your own dreams, responsibilities and goals, and I genuinely want to see you achieve everything you've ever wished for. I want to see you happy, successful and proud of yourself. Your happiness means so much to me, and I hope life gives you every beautiful thing you deserve.",
      "I want to be someone who makes your difficult days easier, someone you can talk to when you're tired, someone who celebrates your achievements and someone who genuinely wants the best for you. I want us to grow together, understand each other better and keep choosing each other even when life gets busy.",
      "I know we aren't perfect, but I genuinely want us to build something beautiful together. I want our relationship to be filled with love, understanding, trust, little surprises, silly conversations and so many happy memories. I want you to feel loved and appreciated, not just through my words but through the way I treat you.",
      "And if there's one thing I want you to know, it's that you don't have to do anything extraordinary to make me happy. Sometimes just hearing your voice, knowing you're okay or sharing a little moment with you is enough to make my day special."
    ]
  },
  {
    part: 3,
    title: "My Duas & Prayers For You",
    paragraphs: [
      "May Allah bless you with happiness, good health, success and peace. May He protect you from every difficulty, guide you towards everything good and bless your efforts. May Allah grant you everything your heart wishes for in this duniya and akhirah. Ameen. ❤️",
      "And I pray that Allah keeps our hearts connected in the most beautiful way, helps us understand each other better and blesses our relationship with love, patience, honesty and happiness.",
      "I hope this birthday brings you so many reasons to smile. I hope you feel loved, appreciated and special today because you genuinely deserve that.",
      "Thank you for being a part of my life, for the memories we've made and for all the little moments that have become so special to me.",
      "I wish I could tell you all of this while holding your hand, looking into your eyes and giving you the biggest hug. Maybe someday I'll get to do that instead of writing it in a letter."
    ]
  },
  {
    part: 4,
    title: "Until I Am Right Beside You",
    paragraphs: [
      "Until then, just know that somewhere miles away, there's a girl who loves you so much, misses you more than she can explain and wishes she could be beside you today.",
      "Happy birthday, Ghugguuuu ❤️",
      "I love you more than these words can ever explain, and I hope I get to celebrate many more birthdays with you.",
      "And one day, I hope I won't have to write how much I miss you because I'll be right there beside you, annoying you, hugging you and making you smile.",
      "Until that day, you're my favourite person to miss, my favourite person to talk.",
      "Happy birthday, handsome man. ❤️"
    ]
  }
];

export default function Page3BirthdayLetter({ onNext, onBack }) {
  const [currentPartIdx, setCurrentPartIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // for full-screen photo popup
  const [activePhoto, setActivePhoto] = useState('boy'); // 'boy' | 'call'

  const currentPart = letterParts[currentPartIdx];

  const handlePrevPart = () => {
    soundManager.playPop();
    if (currentPartIdx > 0) {
      setCurrentPartIdx(currentPartIdx - 1);
    }
  };

  const handleNextPart = () => {
    soundManager.playPop();
    if (currentPartIdx < letterParts.length - 1) {
      setCurrentPartIdx(currentPartIdx + 1);
    } else {
      // Finished letter, trigger confetti and navigate to cake
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f8c8d5', '#72173e', '#ffd1dc', '#fff5eb'],
      });
      onNext();
    }
  };

  return (
    <div className="relative w-screen h-screen h-[100dvh] overflow-hidden bg-gradient-to-b from-[#fff6f8] via-[#fce7ec]/80 to-[#f8c8d5] text-[#3b0c20] flex flex-col justify-between p-3 sm:p-5 select-none">
      
      {/* Background Soft Glow & Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#f8c8d5]/40 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#e6859f]/30 rounded-full blur-[80px]" />
      </div>

      {/* 1. TOP NAVIGATION & HEADER BAR */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#54112e] text-xs font-serif shadow-xs border border-[#f8c8d5] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#f8c8d5] shadow-xs">
          <Heart className="w-3.5 h-3.5 text-[#e6859f] fill-[#e6859f]" />
          <span className="font-handwriting text-xs sm:text-sm font-bold text-[#72173e]">
            A Handwritten Letter For Ghuggu 💌
          </span>
        </div>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#72173e] hover:bg-[#54112e] text-[#fff5eb] text-xs font-serif shadow-xs transition-all cursor-pointer"
        >
          <span>Next: A–Z Reasons</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. MAIN CENTER CONTENT: PICTURE + LETTER SIDE-BY-SIDE (Desktop) OR STACKED (Mobile) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex-1 flex flex-col md:flex-row items-center md:items-stretch gap-3 md:gap-6 my-2 min-h-0 overflow-hidden">
        
        {/* LEFT COLUMN: HIS PICTURE IN CUTE POLAROID FRAME */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="shrink-0 flex md:flex-col items-center justify-center md:justify-center w-full md:w-64 lg:w-72"
        >
          <div className="relative bg-white p-2.5 sm:p-3 rounded-2xl shadow-lg border-2 border-[#f8c8d5] flex flex-row md:flex-col items-center gap-3 md:gap-2 group">
            {/* Washi tape topper */}
            <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 washi-tape-pink shadow-xs rounded-xs z-10" />

            {/* Photo Box */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-56 md:h-64 lg:w-60 lg:h-72 rounded-xl overflow-hidden bg-[#240713] shrink-0 border border-[#f8c8d5]/60 shadow-inner">
              <img
                src={
                  activePhoto === 'boy'
                    ? '/moments/photos/birthday-boy.jpg'
                    : '/moments/screenshots/our-video-call.jpg'
                }
                alt="Birthday Boy Ghuggu"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback for double extension if needed
                  if (activePhoto === 'boy' && !e.target.dataset.tried) {
                    e.target.dataset.tried = 'true';
                    e.target.src = '/moments/photos/birthday-boy.jpg.jpeg';
                  } else if (activePhoto === 'call' && !e.target.dataset.tried) {
                    e.target.dataset.tried = 'true';
                    e.target.src = '/moments/screenshots/our-video-call.jpg.jpeg';
                  }
                }}
              />

              {/* Expand button */}
              <button
                onClick={() =>
                  setSelectedImage(
                    activePhoto === 'boy'
                      ? '/moments/photos/birthday-boy.jpg'
                      : '/moments/screenshots/our-video-call.jpg'
                  )
                }
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer"
                title="View full picture"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Floating Heart Badge */}
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-handwriting font-bold text-[#72173e] flex items-center gap-1 shadow-xs">
                <span>❤️</span>
                <span>{activePhoto === 'boy' ? 'Ghuggu 🦉' : 'Video Call 📱'}</span>
              </div>
            </div>

            {/* Polaroid Caption & Photo Switcher */}
            <div className="flex flex-col items-start md:items-center text-left md:text-center justify-center">
              <p className="font-handwriting text-base sm:text-lg md:text-xl font-bold text-[#3b0c20] leading-tight">
                {activePhoto === 'boy' ? 'My handsome birthday boy ❤️' : 'My favourite face on screen 🥹'}
              </p>
              
              {/* Switch between his photo and video call screenshot */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <button
                  onClick={() => setActivePhoto('boy')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-serif transition-all cursor-pointer ${
                    activePhoto === 'boy'
                      ? 'bg-[#72173e] text-white font-bold'
                      : 'bg-white text-[#72173e] border border-[#f8c8d5]'
                  }`}
                >
                  Photo 📸
                </button>
                <button
                  onClick={() => setActivePhoto('call')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-serif transition-all cursor-pointer ${
                    activePhoto === 'call'
                      ? 'bg-[#72173e] text-white font-bold'
                      : 'bg-white text-[#72173e] border border-[#f8c8d5]'
                  }`}
                >
                  Video Call 📱
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: LETTER READING CARD (100% Verbatim Letter, Dedicated Non-Scroll Paginated Stepper) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full flex flex-col bg-[#fffdfa] rounded-3xl p-4 sm:p-6 shadow-xl border-3 border-[#f8c8d5] min-h-0 overflow-hidden relative"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3 right-8 w-28 h-5 washi-tape-gold rounded-xs shadow-xs z-10 hidden sm:flex items-center justify-center">
            <span className="font-handwriting text-[11px] font-bold text-[#7a590c]">
              FROM YOUR GIRL ❤️
            </span>
          </div>

          {/* Letter Sub-Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#f8c8d5] pb-2 sm:pb-3 mb-2 sm:mb-3 shrink-0">
            <div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#3b0c20] leading-snug">
                To my favourite person ❤️
              </h3>
              <p className="font-handwriting text-xl sm:text-2xl text-[#72173e] font-bold">
                Happy birthday, Ghugguuuu. ❤️
              </p>
            </div>

            {/* Part Pill Indicator */}
            <div className="text-right shrink-0">
              <span className="px-3 py-1 rounded-full bg-[#fce7ec] text-[#72173e] text-xs font-serif font-bold border border-[#f8c8d5]">
                Part {currentPartIdx + 1} of {letterParts.length}
              </span>
              <p className="text-[10px] font-handwriting text-[#54112e]/70 mt-1 hidden sm:block">
                {currentPart.title}
              </p>
            </div>
          </div>

          {/* Letter Body - Smooth Animated Transition between Parts */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 sm:pr-2 letter-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPartIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="space-y-3 font-serif text-xs sm:text-sm md:text-base text-[#2b0816] leading-relaxed"
              >
                {currentPart.paragraphs.map((p, idx) => {
                  const isHighlight =
                    p.includes('Happy birthday, Ghugguuuu') ||
                    p.includes('Happy birthday, handsome man.') ||
                    p.includes('Ameen. ❤️');

                  return (
                    <p
                      key={idx}
                      className={
                        isHighlight
                          ? 'font-bold text-[#54112e] text-sm sm:text-base md:text-lg bg-[#fce7ec]/40 p-2 rounded-xl border-l-3 border-[#72173e]'
                          : ''
                      }
                    >
                      {p}
                    </p>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Letter Bottom Pagination Bar (< Prev Part | Next Part >) */}
          <div className="pt-2 sm:pt-3 mt-2 border-t-2 border-dashed border-[#f8c8d5] flex items-center justify-between shrink-0">
            <button
              onClick={handlePrevPart}
              disabled={currentPartIdx === 0}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
                currentPartIdx === 0
                  ? 'opacity-40 cursor-not-allowed text-zinc-400 bg-zinc-100'
                  : 'bg-white hover:bg-[#fce7ec] text-[#54112e] border border-[#f8c8d5] shadow-xs'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Part</span>
            </button>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {letterParts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playPop();
                    setCurrentPartIdx(idx);
                  }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                    currentPartIdx === idx
                      ? 'bg-[#72173e] w-5 sm:w-6'
                      : 'bg-[#f8c8d5] hover:bg-[#e6859f]'
                  }`}
                  title={`Go to Part ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleNextPart}
              className={`inline-flex items-center gap-1 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-serif font-semibold shadow-xs transition-all cursor-pointer ${
                currentPartIdx === letterParts.length - 1
                  ? 'bg-gradient-to-r from-[#72173e] to-[#942052] text-white'
                  : 'bg-[#72173e] hover:bg-[#54112e] text-white'
              }`}
            >
              <span>{currentPartIdx === letterParts.length - 1 ? 'A–Z Reasons ❤️' : 'Next Part'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

        </motion.div>
      </div>

      {/* 3. FOOTER HINT */}
      <div className="relative z-20 text-center text-xs font-serif text-[#72173e]/70 shrink-0">
        Page 3 of 5 • Read Ghuggu's Letter with 4 easy parts ❤️
      </div>

      {/* FULL-SCREEN IMAGE POPUP MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#fffdfa] p-4 rounded-3xl border-4 border-[#f8c8d5] shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black text-white cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Popup memory"
                  className="max-h-[70vh] w-auto object-contain rounded-xl"
                  onError={(e) => {
                    if (!e.target.dataset.tried) {
                      e.target.dataset.tried = 'true';
                      e.target.src = selectedImage + '.jpeg';
                    }
                  }}
                />
              </div>

              <p className="font-handwriting text-xl text-[#72173e] font-bold mt-3 text-center">
                {selectedImage.includes('video-call')
                  ? "My favourite face to see, even through a screen. 🥹❤️"
                  : "My handsome birthday boy Ghuggu ❤️"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

