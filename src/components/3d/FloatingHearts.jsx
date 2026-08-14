import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingHearts({ count = 35 }) {
  const meshRef = useRef();

  // Create smooth Extruded 3D Heart Geometry
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.3);
    shape.bezierCurveTo(x, y + 0.5, x - 0.4, y + 0.8, x - 0.7, y + 0.8);
    shape.bezierCurveTo(x - 1.1, y + 0.8, x - 1.1, y + 0.3, x - 1.1, y + 0.3);
    shape.bezierCurveTo(x - 1.1, y - 0.2, x - 0.6, y - 0.7, x, y - 1.1);
    shape.bezierCurveTo(x + 0.6, y - 0.7, x + 1.1, y - 0.2, x + 1.1, y + 0.3);
    shape.bezierCurveTo(x + 1.1, y + 0.3, x + 1.1, y + 0.8, x + 0.7, y + 0.8);
    shape.bezierCurveTo(x + 0.4, y + 0.8, x, y + 0.5, x, y + 0.3);

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.1,
      bevelThickness: 0.1,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    geo.scale(0.35, 0.35, 0.35);
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF8AA8"),
      roughness: 0.2,
      metalness: 0.3,
      emissive: new THREE.Color("#FF94B9"),
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  // Wide screen distribution
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 36, // Wide X spread
          (Math.random() - 0.5) * 24, // Wide Y spread
          (Math.random() - 0.5) * 10 - 2,
        ],
        scale: 0.5 + Math.random() * 0.7,
        speed: 0.4 + Math.random() * 0.6,
        rotSpeedX: (Math.random() - 0.5) * 0.8,
        rotSpeedY: (Math.random() - 0.5) * 1.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Y upward floating logic
      particle.position[1] += delta * particle.speed;
      if (particle.position[1] > 12) {
        particle.position[1] = -12;
        particle.position[0] = (Math.random() - 0.5) * 36;
      }

      const currentX = particle.position[0] + Math.sin(state.clock.getElapsedTime() + particle.phase) * 0.4;

      dummy.position.set(currentX, particle.position[1], particle.position[2]);
      dummy.scale.setScalar(particle.scale);
      dummy.rotation.x = state.clock.getElapsedTime() * particle.rotSpeedX;
      dummy.rotation.y = state.clock.getElapsedTime() * particle.rotSpeedY;
      dummy.rotation.z = Math.sin(state.clock.getElapsedTime() + particle.phase) * 0.2;
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
