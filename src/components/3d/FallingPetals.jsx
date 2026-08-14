import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FallingPetals({ count = 50 }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.25, 0.5, 0.35, 1.0);
    shape.quadraticCurveTo(0, 1.4, -0.35, 1.0);
    shape.quadraticCurveTo(-0.25, 0.5, 0, 0);

    const geo = new THREE.ShapeGeometry(shape, 8);
    geo.center();
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(y * Math.PI) * 0.2);
    }
    geo.computeVertexNormals();
    geo.scale(0.4, 0.4, 0.4);
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFC2D1"),
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
  }, []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 38, // Wide X spread
          Math.random() * 24 - 12,    // Wide Y spread
          (Math.random() - 0.5) * 12 - 2,
        ],
        scale: 0.6 + Math.random() * 0.6,
        fallSpeed: 0.5 + Math.random() * 0.7,
        swaySpeed: 0.8 + Math.random() * 0.9,
        rotSpeedX: Math.random() * 1.6,
        rotSpeedY: Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      particle.position[1] -= delta * particle.fallSpeed;
      if (particle.position[1] < -12) {
        particle.position[1] = 12;
        particle.position[0] = (Math.random() - 0.5) * 38;
      }

      const currentX = particle.position[0] + Math.sin(state.clock.getElapsedTime() * particle.swaySpeed + particle.phase) * 0.6;
      const currentZ = particle.position[2] + Math.cos(state.clock.getElapsedTime() * particle.swaySpeed + particle.phase) * 0.3;

      dummy.position.set(currentX, particle.position[1], currentZ);
      dummy.scale.setScalar(particle.scale);
      dummy.rotation.x = state.clock.getElapsedTime() * particle.rotSpeedX;
      dummy.rotation.y = state.clock.getElapsedTime() * particle.rotSpeedY;
      dummy.rotation.z = Math.sin(state.clock.getElapsedTime() + particle.phase);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      castShadow
      receiveShadow
    />
  );
}
