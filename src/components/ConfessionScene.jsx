import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { Heart, ArrowRight } from "lucide-react";

export function ConfessionScene({ onNext }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 2000);
    const t2 = setTimeout(() => setStep(3), 4000);
    const t3 = setTimeout(() => setStep(4), 5800);
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
      <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-4xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-handwritten text-6xl sm:text-7xl md:text-8xl text-[#E99AAF] font-bold drop-shadow-sm"
        >
          {proposalConfig.girlName}...
        </motion.h1>

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A3440] font-normal"
          >
            {proposalConfig.confession1}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#654A55] italic"
          >
            {proposalConfig.confession2}
          </motion.p>
        )}

        {step >= 3 && (
          <motion.h2
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 10 }}
            className="font-serif text-7xl sm:text-9xl md:text-[10rem] font-black text-[#4A3440] tracking-wider my-6 drop-shadow-md"
          >
            {proposalConfig.confession3}
          </motion.h2>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 pt-4"
          >
            <h3 className="font-handwritten text-5xl sm:text-7xl md:text-8xl text-[#E99AAF] font-bold flex items-center justify-center gap-4">
              <span>{proposalConfig.confessionLove}</span>
            </h3>

            <div>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 px-10 py-4 text-xl font-bold text-[#4A3440] bg-white/90 hover:bg-white rounded-full shadow-lg border-2 border-[#FFD1DC] hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-6 h-6 text-[#E99AAF]" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
