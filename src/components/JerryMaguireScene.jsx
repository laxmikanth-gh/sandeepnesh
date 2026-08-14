import React from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { Sparkles } from "lucide-react";

export function JerryMaguireScene({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center z-10 w-full"
    >
      <div className="glass-panel p-10 sm:p-16 md:p-20 rounded-[2.5rem] max-w-3xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 relative overflow-hidden">
        {/* Soft golden warm spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F6E4C8]/60 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#4A3440] font-bold tracking-tight mb-10 drop-shadow-md">
            "{proposalConfig.jerryMaguireQuote}"
          </h1>

          <button
            onClick={onNext}
            className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white rounded-full shadow-2xl bg-gradient-to-r from-[#E99AAF] via-[#D98AA2] to-[#C79A5A] hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer glow-gold"
          >
            <span>One More Thing...</span>
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
