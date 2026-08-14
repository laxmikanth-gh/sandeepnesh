import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { IntroScene } from "./components/IntroScene";
import { StoryScene } from "./components/StoryScene";
import { MemoryScene } from "./components/MemoryScene";
import { EmotionalBuildup } from "./components/EmotionalBuildup";
import { ConfessionScene } from "./components/ConfessionScene";
import { JerryMaguireScene } from "./components/JerryMaguireScene";
import { ManifestationScene } from "./components/ManifestationScene";
import { ProposalScene } from "./components/ProposalScene";
import { CelebrationScene } from "./components/CelebrationScene";
import { MusicControl } from "./components/MusicControl";
import { RomanticCanvas } from "./components/3d/RomanticCanvas";
import { audioSystem } from "./utils/audioSystem";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("loading");

  useEffect(() => {
    audioSystem.init();
    audioSystem.play();
  }, []);

  const handleStart = () => {
    audioSystem.play();
    setStage("story");
  };

  const handleReplay = () => {
    setStage("intro");
  };

  return (
    <div className="app-container">
      {/* Background ambient glow blobs */}
      <div className="app-bg-glow-1" />
      <div className="app-bg-glow-2" />
      <div className="app-bg-glow-3" />

      {/* 3D React Three Fiber Canvas Background */}
      <RomanticCanvas stage={stage} />

      {/* Floating Music Controller */}
      <MusicControl />

      {/* Main Content Scenes */}
      <div className="relative z-10 w-full max-w-5xl mx-auto py-8">
        <AnimatePresence mode="wait">
          {stage === "loading" && (
            <LoadingScreen key="loading" onFinished={() => setStage("intro")} />
          )}

          {stage === "intro" && (
            <IntroScene key="intro" onStart={handleStart} />
          )}

          {stage === "story" && (
            <StoryScene key="story" onNext={() => setStage("memory")} />
          )}

          {stage === "memory" && (
            <MemoryScene key="memory" onNext={() => setStage("buildup")} />
          )}

          {stage === "buildup" && (
            <EmotionalBuildup key="buildup" onNext={() => setStage("confession")} />
          )}

          {stage === "confession" && (
            <ConfessionScene key="confession" onNext={() => setStage("jerry")} />
          )}

          {stage === "jerry" && (
            <JerryMaguireScene key="jerry" onNext={() => setStage("manifestation")} />
          )}

          {stage === "manifestation" && (
            <ManifestationScene key="manifestation" onNext={() => setStage("proposal")} />
          )}

          {stage === "proposal" && (
            <ProposalScene key="proposal" onYes={() => setStage("celebration")} />
          )}

          {stage === "celebration" && (
            <CelebrationScene key="celebration" onReplay={handleReplay} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
