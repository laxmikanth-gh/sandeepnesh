import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { ArrowRight, Heart } from "lucide-react";

export function StoryScene({ onNext }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 2200);
    const t2 = setTimeout(() => setStep(3), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center z-10 w-full"
    >
      <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-4xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 relative">
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-2xl sm:text-3xl md:text-4xl text-[#654A55] font-light mb-6"
          >
            {proposalConfig.storyBeat1}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A3440] italic font-normal mb-10"
          >
            {proposalConfig.storyBeat2}
          </motion.p>
        )}

        {step >= 3 && (
          <div className="space-y-8">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="font-serif text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-[#4A3440] drop-shadow-md"
            >
              {proposalConfig.storyBeat3}
            </motion.h1>

            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-handwritten text-6xl sm:text-7xl md:text-8xl text-[#E99AAF] font-bold flex items-center justify-center gap-4"
            >
              <span>{proposalConfig.girlName}</span>
              <Heart className="w-12 h-12 md:w-16 md:h-16 fill-[#FFD1DC] text-[#E99AAF] animate-pulse inline-block" />
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="pt-8"
            >
              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 px-10 py-4 text-xl font-bold text-[#4A3440] bg-white/90 hover:bg-white rounded-full shadow-lg border-2 border-[#FFD1DC] hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Continue Our Journey</span>
                <ArrowRight className="w-6 h-6 text-[#E99AAF]" />
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
