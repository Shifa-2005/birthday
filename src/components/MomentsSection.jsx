import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Maximize2, Camera, PhoneCall } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function MomentsSection() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const memories = [
    {
      id: 'm1',
      type: 'photo',
      src: '/moments/photos/birthday-boy.jpg',
      fallback: '/moments/photos/birthday-boy.jpg.jpeg',
      title: 'My Handsome Birthday Boy ❤️',
      caption: 'The smile that lights up my whole world 🦉✨',
      tag: 'My Ghuggu 🦉',
      washiText: 'SO HANDSOME ✨',
      tapeColor: 'washi-tape-pink'
    },
    {
      id: 'm2',
      type: 'screenshot',
      src: '/moments/screenshots/our-video-call.jpg',
      fallback: '/moments/screenshots/our-video-call.jpg.jpeg',
      title: 'Our Late Night Video Call 📱',
      caption: 'My favourite face to see, even through a screen. 🥹❤️',
      tag: 'Connected ❤️',
      washiText: 'LATE NIGHT CALLS 📱',
      tapeColor: 'washi-tape-gold'
    }
  ];

  const openLightbox = (item) => {
    soundManager.playPop();
    soundManager.playChime();
    setSelectedMedia(item);
  };

  const closeLightbox = () => {
    soundManager.playPop();
    setSelectedMedia(null);
  };

  return (
    <section id="our-moments" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-[#72173e]/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffdfa] text-[#54112e] border-2 border-[#f8c8d5] shadow-sm mb-3"
        >
          <Camera className="w-3.5 h-3.5 text-[#e6859f]" />
          <span className="font-handwriting text-base font-bold">Scrapbook of Us</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold text-[#fff5eb] text-glow mb-3"
        >
          Our Little Moments ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-[#fce7ec]/85 max-w-lg mx-auto"
        >
          Precious memories of my favourite person that I keep closest to my heart.
        </motion.p>
      </div>

      {/* Two Scrapbook Polaroid Memories - No empty spaces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-3xl mx-auto">
        {memories.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25, rotate: idx === 0 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
            onClick={() => openLightbox(item)}
            className="cursor-pointer relative p-4 sm:p-5 rounded-[2.2rem] bg-[#fffdfa] text-[#240713] paper-shadow border-4 border-[#f8c8d5] flex flex-col justify-between group overflow-hidden"
          >
            {/* Washi Tape at Top Corner */}
            <div
              className={`absolute -top-3.5 ${
                idx === 0 ? 'left-8' : 'right-8'
              } w-36 h-7 ${item.tapeColor} rounded-sm flex items-center justify-center z-20`}
            >
              <span className="font-handwriting text-xs font-bold text-[#54112e] tracking-wider">
                {item.washiText}
              </span>
            </div>

            {/* Floating Cute Heart on Card */}
            <motion.div
              animate={{ y: [0, -5, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.8 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 -right-1 z-20 pointer-events-none text-xl filter drop-shadow"
            >
              {idx === 0 ? '💖' : '💕'}
            </motion.div>

            {/* Photo / Screenshot Frame */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-[#240713] border border-[#f8c8d5]/40 shadow-inner mt-2">
              <img
                src={item.src}
                alt={item.title}
                onError={(e) => {
                  if (item.fallback && !e.target.src.endsWith('.jpeg')) {
                    e.target.src = item.fallback;
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-handwriting text-[#54112e] font-bold border border-[#f8c8d5] shadow-sm">
                <span>{item.tag}</span>
              </div>

              {/* Hover overlay icon */}
              <div className="absolute inset-0 bg-[#3b0c20]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-11 h-11 rounded-full bg-white/90 border border-[#f8c8d5] flex items-center justify-center text-[#72173e] shadow-lg">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Cute Scrapbook Caption below */}
            <div className="mt-4 px-1 pb-1 text-center">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3b0c20] group-hover:text-[#72173e] transition-colors">
                {item.title}
              </h3>
              <p className="font-handwriting text-lg sm:text-xl text-[#72173e] font-semibold mt-1">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-xl w-full rounded-[2.5rem] bg-[#fffdfa] text-[#240713] p-5 sm:p-7 paper-shadow border-4 border-[#f8c8d5] text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#fce7ec] hover:bg-[#f8c8d5] text-[#72173e] border border-[#f8c8d5] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Display */}
              <div className="relative max-h-[65vh] w-full rounded-2xl overflow-hidden mb-4 bg-[#240713] flex items-center justify-center">
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  onError={(e) => {
                    if (selectedMedia.fallback && !e.target.src.endsWith('.jpeg')) {
                      e.target.src = selectedMedia.fallback;
                    }
                  }}
                  className="max-h-[65vh] w-auto max-w-full object-contain mx-auto rounded-2xl shadow-xl"
                />
              </div>

              {/* Caption */}
              <div className="pt-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#fce7ec] text-xs font-handwriting text-[#54112e] font-bold mb-2">
                  {selectedMedia.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3b0c20] mb-1">
                  {selectedMedia.title}
                </h3>
                <p className="font-handwriting text-xl text-[#72173e] font-semibold">
                  {selectedMedia.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
