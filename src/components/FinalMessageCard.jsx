import React from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { RotateCcw, Sparkles } from "lucide-react";

export function FinalMessageCard({ onReplay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-3xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/75 space-y-8 text-center text-[#4A3440]"
    >
      <div className="flex justify-center mb-4">
        <span className="p-4 rounded-full bg-[#FFF0F3] border-2 border-[#FFD1DC] shadow-md glow-gold">
          <Sparkles className="w-8 h-8 text-[#C79A5A]" />
        </span>
      </div>

      <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold italic text-[#4A3440]">
        {proposalConfig.finalHeader}
      </h3>

      <div className="space-y-6 font-sans text-xl sm:text-2xl text-[#654A55] leading-relaxed">
        <p>Thank you for coming into my life.</p>
        <p className="font-bold text-[#4A3440] text-2xl sm:text-3xl">
          {proposalConfig.girlName}, you're special to me in ways words can't explain. ❤️
        </p>
      </div>

      <h2 className="font-handwritten text-5xl sm:text-6xl md:text-7xl text-[#E99AAF] font-bold pt-4 drop-shadow-sm">
        {proposalConfig.finalFooter}
      </h2>

      <div className="pt-8">
        <button
          onClick={onReplay}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-bold text-white rounded-full shadow-2xl bg-gradient-to-r from-[#E99AAF] to-[#C79A5A] hover:opacity-95 transition-all transform hover:scale-105 active:scale-95 cursor-pointer glow-gold"
        >
          <RotateCcw className="w-6 h-6" />
          <span>{proposalConfig.replayButtonText}</span>
        </button>
      </div>
    </motion.div>
  );
}
