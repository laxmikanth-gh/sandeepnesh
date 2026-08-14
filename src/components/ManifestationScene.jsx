import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { Heart } from "lucide-react";

export function ManifestationScene({ onNext }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 1800);
    const t2 = setTimeout(() => setStep(3), 4200);
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
      <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-4xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#654A55] italic"
        >
          So...
        </motion.p>

        {step >= 2 && (
          <motion.h1
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="font-handwritten text-5xl sm:text-7xl md:text-8xl text-[#E99AAF] font-bold leading-tight drop-shadow-sm"
          >
            {proposalConfig.manifestationMessage}
          </motion.h1>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pt-6"
          >
            <p className="font-sans text-2xl sm:text-3xl text-[#4A3440] font-medium">
              {proposalConfig.manifestationSubtext}
            </p>

            <div>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white rounded-full shadow-2xl bg-gradient-to-r from-[#E99AAF] via-[#D98AA2] to-[#C79A5A] hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer glow-pink"
              >
                <span>Ask The Question</span>
                <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
