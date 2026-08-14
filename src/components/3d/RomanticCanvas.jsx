import React, { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FloatingHearts } from "./FloatingHearts";
import { FallingPetals } from "./FallingPetals";
import { Butterflies } from "./Butterflies";
import { GoldenParticles } from "./GoldenParticles";

function CameraRig({ isMobile }) {
  useFrame((state) => {
    const mouseX = state.pointer.x * (isMobile ? 0.2 : 0.6);
    const mouseY = state.pointer.y * (isMobile ? 0.2 : 0.6);
    state.camera.position.x += (mouseX - state.camera.position.x) * 0.04;
    state.camera.position.y += (mouseY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function RomanticCanvas({ stage = "intro" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heartCount = isMobile ? 20 : (stage === "celebration" ? 65 : 40);
  const petalCount = isMobile ? 30 : (stage === "celebration" ? 85 : 55);
  const particleCount = isMobile ? 100 : 250;
  const butterflyCount = isMobile ? 5 : (stage === "celebration" ? 14 : 9);

  return (
    <div className="r3f-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} color="#FFFDF9" />
        <directionalLight position={[8, 10, 8]} intensity={1.4} color="#FFF0F3" />
        <pointLight position={[-8, -8, -2]} intensity={0.9} color="#FFE1E8" />
        <pointLight position={[0, 0, 8]} intensity={0.6} color="#F6E4C8" />

        <CameraRig isMobile={isMobile} />
        
        <FloatingHearts count={heartCount} />
        <FallingPetals count={petalCount} />
        <Butterflies count={butterflyCount} />
        <GoldenParticles count={particleCount} />
      </Canvas>
    </div>
  );
}
