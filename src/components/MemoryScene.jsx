import React from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

export function MemoryScene({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center z-10 w-full"
    >
      <div className="max-w-2xl w-11/12 relative">
        {/* Polaroid Memory Card */}
        <motion.div
          initial={{ rotate: -3, scale: 0.9, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-xl p-8 sm:p-12 md:p-16 rounded-[2.5rem] shadow-2xl border-2 border-white relative text-[#4A3440]"
        >
          {/* Tape decoration at top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#FFE1E8]/80 rounded-md shadow-sm backdrop-blur-md transform -rotate-1 border border-white" />

          <div className="bg-gradient-to-br from-[#FFF9F6] via-[#FFF0F3] to-[#FFE1E8]/50 p-8 sm:p-10 rounded-2xl border-2 border-[#FFD1DC]/80 mb-8 shadow-inner relative overflow-hidden">
            <div className="flex justify-center mb-4">
              <span className="p-4 rounded-full bg-white shadow-md border-2 border-[#FFD1DC] glow-pink">
                <Heart className="w-10 h-10 text-[#E99AAF] fill-[#FFD1DC]" />
              </span>
            </div>

            <motion.h3
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-handwritten text-4xl sm:text-5xl md:text-6xl text-[#4A3440] font-bold mb-3 leading-snug"
            >
              {proposalConfig.firstMetReference}
            </motion.h3>

            <Sparkles className="w-7 h-7 text-[#C79A5A] absolute top-4 right-4 animate-pulse" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="font-serif text-2xl sm:text-3xl text-[#654A55] italic mb-4 font-medium"
          >
            {proposalConfig.memorySubtext1}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="font-sans text-lg sm:text-xl md:text-2xl text-[#4A3440] font-medium mb-8 leading-relaxed"
          >
            {proposalConfig.memorySubtext2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <button
              onClick={onNext}
              className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 text-xl font-bold text-white rounded-2xl shadow-xl bg-gradient-to-r from-[#E99AAF] to-[#C79A5A] hover:opacity-95 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer glow-gold"
            >
              <span>Next Memory</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
