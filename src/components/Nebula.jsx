import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexNebula from '../shaderNebula/vertexNebula.glsl';
import fragmentNebula from '../shaderNebula/fragmentNebula.glsl';

const Nebula = () => {
  const particleRef = useRef();
  const particleCount = 10000;  // Increased particle count
  const particles = useRef(new THREE.BufferGeometry());
  const positions = useRef(new Float32Array(particleCount * 3));

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles with a clear separation
      const isLeftSide = Math.random() < 0.5;
      positions.current[i * 3] = isLeftSide ? (Math.random() * -10 - 5) : (Math.random() * 10 + 5); // x
      positions.current[i * 3 + 1] = (Math.random() * 2 - 1) * 10; // y
      positions.current[i * 3 + 2] = (Math.random() * 2 - 1) * 10; // z
    }
    particles.current.setAttribute('position', new THREE.BufferAttribute(positions.current, 3));
  }, [particleCount]);

  useFrame(() => {
    if (particleRef.current) {
      particleRef.current.rotation.y += 0.001; // Rotate the nebula slowly
    }
  });

  return (
    <points ref={particleRef} geometry={particles.current}>
      <shaderMaterial
        vertexShader={vertexNebula}
        fragmentShader={fragmentNebula}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={{
          color1: { value: new THREE.Color(0x0000ff) }, // Blue color
          color2: { value: new THREE.Color(0xff007f) }, // Red/Pink color
        }}
        transparent
      />
    </points>
  );
};

export default Nebula;

