import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GoldenParticles({ count = 220 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const goldColor = new THREE.Color("#C79A5A");
    const pinkColor = new THREE.Color("#FFD1DC");
    const whiteColor = new THREE.Color("#FFFDF9");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 44; // Wide X spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 32; // Wide Y spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const r = Math.random();
      const chosenColor = r < 0.5 ? goldColor : r < 0.8 ? pinkColor : whiteColor;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
