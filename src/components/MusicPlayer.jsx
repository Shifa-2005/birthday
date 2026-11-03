import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      soundManager.stopAmbientMusic();
      setIsPlaying(false);
    } else {
      soundManager.startAmbientMusic();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40">
      <button
        onClick={toggleSound}
        className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 backdrop-blur-md text-[#fff5eb] text-xs font-serif shadow-lg transition-all cursor-pointer"
        title={isPlaying ? "Mute romantic melody" : "Play romantic melody"}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-[#f8c8d5] animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#f8c8d5]" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f8c8d5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#f8c8d5]"></span>
            </span>
          )}
        </div>
        <span className="text-[11px] tracking-wide text-zinc-300 group-hover:text-white">
          {isPlaying ? "Music On" : "Music"}
        </span>
      </button>
    </div>
  );
}
