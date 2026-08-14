import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { proposalConfig } from "../config/proposalConfig";
import { FinalMessageCard } from "./FinalMessageCard";
import { Heart, Sparkles } from "lucide-react";

export function CelebrationScene({ onReplay }) {
  const [showFinalCard, setShowFinalCard] = useState(false);

  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 9,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: ["#FFD1DC", "#E99AAF", "#C79A5A", "#FFFDF9", "#F7C5B5"],
      });
      confetti({
        particleCount: 9,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: ["#FFD1DC", "#E99AAF", "#C79A5A", "#FFFDF9", "#F7C5B5"],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const timer = setTimeout(() => {
      setShowFinalCard(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center z-10 w-full relative"
    >
      {!showFinalCard ? (
        <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-4xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="inline-block p-5 rounded-full bg-[#FFF0F3] shadow-md border-2 border-[#FFD1DC] glow-pink"
          >
            <Heart className="w-16 h-16 text-[#E99AAF] fill-[#E99AAF] animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl font-black text-[#4A3440] tracking-tight drop-shadow-md"
          >
            {proposalConfig.celebrationTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#654A55] italic font-medium"
          >
            {proposalConfig.celebrationSubtitle}
          </motion.p>

          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="font-handwritten text-6xl sm:text-7xl md:text-8xl text-[#E99AAF] font-bold"
          >
            {proposalConfig.celebrationLove}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#4A3440] font-bold"
          >
            {proposalConfig.celebrationForever}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="pt-6"
          >
            <button
              onClick={() => setShowFinalCard(true)}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-lg font-bold text-[#654A55] bg-white/90 hover:bg-white rounded-full shadow-md border-2 border-[#FFD1DC] cursor-pointer"
            >
              <span>View Final Note</span>
              <Sparkles className="w-5 h-5 text-[#C79A5A]" />
            </button>
          </motion.div>
        </div>
      ) : (
        <FinalMessageCard onReplay={onReplay} />
      )}
    </motion.div>
  );
}
