import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexNebula from '../shaderNebula/vertexNebula.glsl';
import fragmentNebula from '../shaderNebula/fragmentNebula.glsl';

const Nebula = () => {
  const particleRef = useRef();
  const particleCount = 1000; // Increase if necessary for denser effect
  const particles = useRef(new THREE.BufferGeometry());
  const positions = new Float32Array(particleCount * 3);

  useEffect(() => {
    console.log('Initializing particles...');
    for (let i = 0; i < particleCount; i++) {
      const r = Math.cbrt(Math.random()) * 30; // Radius within 30 units
      const theta = Math.random() * 2 * Math.PI; // Angle around the Y-axis
      const phi = Math.acos((Math.random() * 2) - 1); // Angle from the Z-axis

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    // console.log('Positions set:', positions);
    particles.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // console.log('Particles geometry:', particles.current);
  }, [particleCount]);

  useFrame((state) => {
    if (particleRef.current) {
      particleRef.current.rotation.y += 0.001;
      particleRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
      // console.log('Time uniform updated:', state.clock.getElapsedTime());
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
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0000ff) },
          color2: { value: new THREE.Color(0xff007f) },
        }}
        transparent
        onUpdate={(self) => console.log('Shader Material Updated:', self.uniforms)}
      />
    </points>
  );
};

export default Nebula;
