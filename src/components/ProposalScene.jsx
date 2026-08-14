import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";
import { NoButton } from "./NoButton";
import { Heart, Sparkles } from "lucide-react";

export function ProposalScene({ onYes }) {
  const [toastMessage, setToastMessage] = useState("");

  const handleToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center z-10 w-full relative"
    >
      {/* Toast Notification for NO button evasion */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="fixed top-24 z-50 px-8 py-4 rounded-full bg-white/95 backdrop-blur-xl shadow-2xl border-2 border-[#FFD1DC] text-[#4A3440] font-bold text-lg md:text-xl flex items-center gap-3 glow-pink"
          >
            <Sparkles className="w-6 h-6 text-[#C79A5A]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel p-10 sm:p-14 md:p-20 rounded-[2.5rem] max-w-4xl w-11/12 border-2 border-white/80 shadow-2xl backdrop-blur-xl bg-white/70 relative space-y-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-handwritten text-5xl sm:text-6xl md:text-7xl text-[#E99AAF] font-bold"
        >
          {proposalConfig.girlName}...
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#654A55] italic"
        >
          {proposalConfig.proposalHeadline}
        </motion.p>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 120, damping: 10 }}
          className="font-serif text-6xl sm:text-8xl md:text-[8.5rem] font-black text-[#4A3440] tracking-tight leading-none drop-shadow-md my-6"
        >
          {proposalConfig.proposalQuestion}
        </motion.h1>

        {/* Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-8 relative min-h-[90px]"
        >
          {/* YES Button */}
          <button
            onClick={onYes}
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-5 text-2xl sm:text-3xl font-extrabold text-white rounded-full shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-110 active:scale-95 bg-gradient-to-r from-[#E99AAF] via-[#D98AA2] to-[#C79A5A] ring-8 ring-[#FFD1DC]/50 cursor-pointer z-30 glow-gold"
          >
            <Heart className="w-8 h-8 fill-white text-white animate-bounce" />
            <span className="relative z-10">{proposalConfig.yesButtonText}</span>
            <div className="absolute inset-0 bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Dodging NO Button */}
          <NoButton onToast={handleToast} />
        </motion.div>
      </div>
    </motion.div>
  );
}
