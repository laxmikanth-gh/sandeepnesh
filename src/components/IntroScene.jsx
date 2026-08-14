import React from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { Sparkles, Heart } from "lucide-react";

export function IntroScene({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center z-10 w-full"
    >
      <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-3xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 relative overflow-hidden my-auto">
        {/* Soft floating background glow spots */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#FFD1DC]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#F7C5B5]/60 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block p-4 rounded-full bg-[#FFF0F3] mb-8 shadow-md border-2 border-[#FFE1E8] glow-pink"
        >
          <Heart className="w-12 h-12 text-[#E99AAF] fill-[#FFD1DC]" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-handwritten text-6xl sm:text-7xl md:text-8xl text-[#4A3440] mb-6 font-bold tracking-wide drop-shadow-sm"
        >
          {proposalConfig.introGreeting}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#654A55] mb-10 italic font-medium"
        >
          {proposalConfig.introSubtext}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 text-xl sm:text-2xl font-bold text-white rounded-full shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r from-[#E99AAF] via-[#D98AA2] to-[#C79A5A] cursor-pointer glow-gold"
          >
            <span className="relative z-10 flex items-center gap-3">
              {proposalConfig.introButton}
            </span>
            <Sparkles className="w-7 h-7 text-white animate-spin-slow" />
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
