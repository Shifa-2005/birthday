import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Feather, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

export default function RomanticLetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    soundManager.playPop();
    if (!isOpen) {
      soundManager.playChime();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f8c8d5', '#fff5eb', '#72173e', '#d4af37'],
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="romantic-letter" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#72173e]/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
      >
        <Feather className="w-3.5 h-3.5 text-[#e6859f]" />
        <span className="font-handwriting text-base font-bold">A Handwritten Letter For You</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-3"
      >
        My Birthday Letter To You 💌
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-[#fce7ec]/85 font-handwriting text-xl sm:text-2xl max-w-lg mx-auto mb-10"
      >
        Words could never fully capture everything, but I poured my heart into this for you.
      </motion.p>

      {/* Envelope & Letter Container */}
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Closed Envelope */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={toggleLetter}
            className="cursor-pointer relative w-full max-w-md h-64 sm:h-72 rounded-[2.2rem] bg-[#fffdfa] text-[#240713] paper-shadow border-4 border-[#f8c8d5] p-6 flex flex-col items-center justify-between overflow-hidden group"
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 washi-tape-pink flex items-center justify-center rounded-sm">
              <span className="font-handwriting text-xs font-bold text-[#54112e]">
                FOR GHUGGU'S EYES ONLY 🦉
              </span>
            </div>

            {/* Envelope flap triangle aesthetic */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-[#fce7ec]/80 border-b-2 border-dashed border-[#f8c8d5] [clip-path:polygon(0_0,100%_0,50%_100%)] group-hover:bg-[#f8c8d5]/80 transition-colors" />

            {/* Top postage stamp */}
            <div className="self-end z-10 w-12 h-14 border-2 border-dashed border-[#72173e]/40 rounded-lg p-1 flex flex-col items-center justify-center bg-white shadow-sm">
              <span className="text-[10px] font-mono font-bold text-[#72173e]">LOVE</span>
              <Heart className="w-4 h-4 text-[#e6859f] fill-[#e6859f]" />
            </div>

            {/* Golden & Pink Wax Heart Seal in Center */}
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#72173e] via-[#e6859f] to-[#f8c8d5] p-[3px] shadow-xl flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#72173e] to-[#54112e] flex flex-col items-center justify-center border-2 border-[#fff5eb]">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-[#fffdfa] fill-[#fffdfa] filter drop-shadow" />
                <span className="text-[9px] font-serif uppercase tracking-widest text-[#fffdfa] font-bold">
                  SEALED
                </span>
              </div>
            </motion.div>

            {/* Instruction bottom */}
            <div className="z-10 text-center">
              <p className="font-handwriting text-lg text-[#72173e] font-bold group-hover:text-[#3b0c20] transition-colors">
                ✨ Tap the seal to break & read ✨
              </p>
            </div>
          </motion.div>
        )}

        {/* Opened Letter View */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full relative rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-5 sm:p-10 paper-shadow border-4 border-[#f8c8d5] text-left"
            >
              {/* Cute Washi Tape at Corner */}
              <div className="absolute -top-3.5 left-8 w-28 h-6 washi-tape-gold rounded-sm flex items-center justify-center">
                <span className="font-handwriting text-xs font-bold text-[#7a590c]">
                  MY HEART FOR YOU ❤️
                </span>
              </div>

              {/* Letter Top Details */}
              <div className="relative z-10 flex items-center justify-between border-b-2 border-dashed border-[#f8c8d5] pb-4 mb-5">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3b0c20]">
                    To my favourite person ❤️
                  </h3>
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#72173e] font-bold mt-1">
                    Happy birthday, Ghugguuuu. ❤️
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#fce7ec] flex items-center justify-center border border-[#72173e]/20 shrink-0 ml-3">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#72173e] fill-[#72173e]" />
                </div>
              </div>

              {/* Scrollable Letter Body for Desktop and Mobile */}
              <div className="relative z-10 max-h-[62vh] sm:max-h-[68vh] overflow-y-auto overscroll-contain pr-2 sm:pr-4 space-y-4 font-serif text-sm sm:text-base text-[#2b0816] leading-relaxed letter-scrollbar">
                <p>
                  I wish I could be there with you today, hugging you tightly, looking into your eyes and telling you how much I love you. I wish I could hold your hand, annoy you with my little talks, steal your attention and spend the whole day making you feel special. Since we're miles apart, I'm sending all my love through this little letter. But honestly, if I could choose one thing today, it would be to be right beside you.
                </p>

                <p>
                  You mean so much to me, more than I think you'll ever fully understand. You're the person I want to share everything with, the person I miss even during the most ordinary moments and the person whose happiness genuinely matters to me. Sometimes I wish you could see yourself through my eyes because maybe then you'd understand why I love you this much.
                </p>

                <p>
                  I love our conversations, our little moments and the way you make my days better. I love hearing your voice, talking about random things and sharing the smallest details of my day with you. Sometimes even a simple conversation with you makes me smile for hours. And sometimes I just wish I could be next to you, resting my head on your shoulder and doing absolutely nothing, just enjoying your presence.
                </p>

                <p>
                  Distance isn't easy, especially when all I want is to see you, hug you and spend time with you. There are so many little things I wish we could do together. Going on dates, walking together, sharing food, laughing at silly things and making memories that belong only to us. I look forward to the day when I won't have to miss you through a screen anymore.
                </p>

                <p>
                  And honestly, I love the thought of being your girl. ❤️ I love knowing that there's someone special in my life whom I can miss, care for and look forward to talking to. I love imagining our little moments together and all the beautiful memories we still have to make.
                </p>

                <p>
                  I'm so proud of you and everything you're working towards. I know you have your own dreams, responsibilities and goals, and I genuinely want to see you achieve everything you've ever wished for. I want to see you happy, successful and proud of yourself. Your happiness means so much to me, and I hope life gives you every beautiful thing you deserve.
                </p>

                <p>
                  I want to be someone who makes your difficult days easier, someone you can talk to when you're tired, someone who celebrates your achievements and someone who genuinely wants the best for you. I want us to grow together, understand each other better and keep choosing each other even when life gets busy.
                </p>

                <p>
                  I know we aren't perfect, but I genuinely want us to build something beautiful together. I want our relationship to be filled with love, understanding, trust, little surprises, silly conversations and so many happy memories. I want you to feel loved and appreciated, not just through my words but through the way I treat you.
                </p>

                <p>
                  And if there's one thing I want you to know, it's that you don't have to do anything extraordinary to make me happy. Sometimes just hearing your voice, knowing you're okay or sharing a little moment with you is enough to make my day special.
                </p>

                <p>
                  May Allah bless you with happiness, good health, success and peace. May He protect you from every difficulty, guide you towards everything good and bless your efforts. May Allah grant you everything your heart wishes for in this duniya and akhirah. Ameen. ❤️
                </p>

                <p>
                  And I pray that Allah keeps our hearts connected in the most beautiful way, helps us understand each other better and blesses our relationship with love, patience, honesty and happiness.
                </p>

                <p>
                  I hope this birthday brings you so many reasons to smile. I hope you feel loved, appreciated and special today because you genuinely deserve that.
                </p>

                <p>
                  Thank you for being a part of my life, for the memories we've made and for all the little moments that have become so special to me.
                </p>

                <p>
                  I wish I could tell you all of this while holding your hand, looking into your eyes and giving you the biggest hug. Maybe someday I'll get to do that instead of writing it in a letter.
                </p>

                <p>
                  Until then, just know that somewhere miles away, there's a girl who loves you so much, misses you more than she can explain and wishes she could be beside you today.
                </p>

                <p className="font-bold text-[#54112e] text-base sm:text-lg">
                  Happy birthday, Ghugguuuu ❤️
                </p>

                <p>
                  I love you more than these words can ever explain, and I hope I get to celebrate many more birthdays with you.
                </p>

                <p>
                  And one day, I hope I won't have to write how much I miss you because I'll be right there beside you, annoying you, hugging you and making you smile.
                </p>

                <p>
                  Until that day, you're my favourite person to miss, my favourite person to talk.
                </p>

                <p className="font-bold text-[#54112e] text-base sm:text-lg pt-2">
                  Happy birthday, handsome man. ❤️
                </p>
              </div>

              {/* Letter Bottom Controls */}
              <div className="relative z-10 mt-5 pt-4 border-t-2 border-dashed border-[#f8c8d5] flex items-center justify-between">
                <span className="font-handwriting text-base text-[#72173e] font-semibold">
                  Scroll down inside to read every word ✨
                </span>
                <button
                  onClick={toggleLetter}
                  className="px-4 py-2 rounded-full bg-[#72173e] hover:bg-[#54112e] text-[#fff5eb] text-xs font-serif tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Fold Letter Back ✉️
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
