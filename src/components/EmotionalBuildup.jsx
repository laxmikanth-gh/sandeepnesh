import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { Sparkles } from "lucide-react";

export function EmotionalBuildup({ onNext }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 2200);
    const t2 = setTimeout(() => setStep(3), 4400);
    const t3 = setTimeout(() => setStep(4), 6600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
      <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-3xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 space-y-8">
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#654A55] font-light"
          >
            {proposalConfig.buildup1}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A3440] italic font-semibold"
          >
            {proposalConfig.buildup2}
          </motion.p>
        )}

        {step >= 3 && (
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-handwritten text-5xl sm:text-6xl md:text-7xl text-[#E99AAF] font-bold"
          >
            {proposalConfig.buildup3}
          </motion.h2>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 space-y-8"
          >
            <p className="font-sans text-xl sm:text-2xl text-[#4A3440] font-medium">
              {proposalConfig.buildup4}
            </p>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white rounded-full shadow-2xl bg-gradient-to-r from-[#E99AAF] via-[#D98AA2] to-[#C79A5A] hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer glow-gold"
            >
              <span>Listen To My Heart</span>
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
