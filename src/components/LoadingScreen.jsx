import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinished(), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F6] text-[#4A3440]"
    >
      <motion.div
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="mb-6 p-4 rounded-full bg-[#FFF0F3] shadow-md border border-[#FFD1DC]"
      >
        <Heart className="w-12 h-12 text-[#E99AAF] fill-[#FFD1DC]" />
      </motion.div>

      <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-[#4A3440] mb-3">
        Preparing something special...
      </h2>

      <div className="w-48 h-1.5 bg-[#FFE1E8] rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FFD1DC] via-[#E99AAF] to-[#C79A5A]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
