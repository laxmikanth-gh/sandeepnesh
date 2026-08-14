import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../config/proposalConfig";

export function NoButton({ onToast }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [isVanished, setIsVanished] = useState(false);
  const buttonRef = useRef(null);

  const moveButton = () => {
    if (isVanished) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts % 2 === 1 || newAttempts > 3) {
      const msgIndex = (newAttempts - 1) % proposalConfig.noEscapeMessages.length;
      onToast(proposalConfig.noEscapeMessages[msgIndex]);
    }

    if (newAttempts >= 6) {
      setIsVanished(true);
      onToast(proposalConfig.mobileOnlyChoiceText);
      return;
    }

    const btnWidth = 140;
    const btnHeight = 60;
    const padding = 30;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxMoveX = Math.min(vw / 2 - btnWidth - padding, 260);
    const maxMoveY = Math.min(vh / 2 - btnHeight - padding, 240);

    const randomX = (Math.random() - 0.5) * 2 * maxMoveX;
    const randomY = (Math.random() - 0.5) * 2 * maxMoveY;

    setPosition({ x: randomX, y: randomY });
  };

  if (isVanished) return null;

  const currentScale = Math.max(0.3, 1 - attempts * 0.12);

  return (
    <motion.div
      animate={{ x: position.x, y: position.y, scale: currentScale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block relative z-20"
    >
      <button
        ref={buttonRef}
        onMouseEnter={moveButton}
        onTouchStart={(e) => {
          e.preventDefault();
          moveButton();
        }}
        onClick={moveButton}
        className="px-10 py-4.5 text-xl sm:text-2xl font-bold text-[#654A55] bg-white/90 hover:bg-white rounded-full shadow-lg border-2 border-[#FFD1DC] backdrop-blur-md cursor-pointer select-none transition-colors"
      >
        {proposalConfig.noButtonText}
      </button>
    </motion.div>
  );
}
