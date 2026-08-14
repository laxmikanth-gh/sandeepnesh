import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SingleButterfly({ position, scale = 1, speed = 1, phase = 0 }) {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();

  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.4, 0.5, 0.8, 0.9, 1.0, 0.7);
    shape.bezierCurveTo(1.2, 0.5, 0.9, 0.0, 0.6, -0.4);
    shape.bezierCurveTo(0.4, -0.6, 0.1, -0.4, 0, 0);

    const geo = new THREE.ShapeGeometry(shape, 8);
    geo.scale(0.5, 0.5, 0.5);
    return geo;
  }, []);

  const wingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFD1DC"),
      emissive: new THREE.Color("#F7C5B5"),
      emissiveIntensity: 0.5,
      roughness: 0.2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed + phase;
    
    const flapAngle = Math.sin(time * 14) * 0.8;
    if (leftWingRef.current) leftWingRef.current.rotation.y = flapAngle;
    if (rightWingRef.current) rightWingRef.current.rotation.y = -flapAngle;

    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(time * 0.5) * 2.2;
      groupRef.current.position.y = position[1] + Math.cos(time * 0.7) * 1.2;
      groupRef.current.position.z = position[2] + Math.sin(time * 0.3) * 0.8;

      groupRef.current.rotation.y = Math.cos(time * 0.5) * 0.4;
      groupRef.current.rotation.z = Math.sin(time * 0.7) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      <mesh>
        <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
        <meshStandardMaterial color="#654A55" />
      </mesh>

      <group ref={leftWingRef} position={[-0.01, 0, 0]}>
        <mesh geometry={wingGeometry} material={wingMaterial} />
      </group>

      <group ref={rightWingRef} position={[0.01, 0, 0]}>
        <mesh geometry={wingGeometry} material={wingMaterial} rotation={[0, Math.PI, 0]} />
      </group>
    </group>
  );
}

export function Butterflies({ count = 10 }) {
  const butterflies = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 30, // Wide spread
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 8,
      ],
      scale: 0.7 + Math.random() * 0.5,
      speed: 0.9 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <group>
      {butterflies.map((b) => (
        <SingleButterfly
          key={b.id}
          position={b.position}
          scale={b.scale}
          speed={b.speed}
          phase={b.phase}
        />
      ))}
    </group>
  );
}
