import React, { useState, useEffect } from "react";
import { audioSystem } from "../utils/audioSystem";
import { Music, Volume2, VolumeX, Play } from "lucide-react";
import { motion } from "framer-motion";

export function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    audioSystem.init();
  }, []);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    const playingState = audioSystem.togglePlay();
    setIsPlaying(playingState);
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const mutedState = audioSystem.toggleMute();
    setIsMuted(mutedState);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-3"
    >
      <div className="glass-panel px-4 py-2.5 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-xl border-2 border-white/90 bg-white/80">
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause Music" : "Play Music"}
          className="p-3 text-[#4A3440] hover:text-[#C79A5A] transition-colors rounded-full flex items-center justify-center bg-white/80 hover:bg-white shadow-md cursor-pointer"
        >
          {isPlaying ? (
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Music className="w-6 h-6 text-[#E99AAF] animate-pulse" />
            </motion.div>
          ) : (
            <Play className="w-6 h-6 fill-current text-[#4A3440]" />
          )}
        </button>

        <button
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute Music" : "Mute Music"}
          className="p-3 text-[#4A3440] hover:text-[#C79A5A] transition-colors rounded-full flex items-center justify-center bg-white/80 hover:bg-white shadow-md cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-[#654A55]" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#4A3440]" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
