import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Uranus = ({ distance, speed, tilt, onClick }) => {
  const uranusRef = useRef();
  const orbitRef = useRef();

  // Load Uranus's texture
  const uranusTexture = useLoader(THREE.TextureLoader, '/textures/uranusmap.jpg', undefined, (err) => {
    console.error('Error loading texture:', err);
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * (speed / 84); // Adjust speed for Uranus's orbital period

    // Position Uranus in its orbit
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitRef.current.position.set(x, 0, z);

    // Rotate Uranus on its own axis
    uranusRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbitRef} onClick={onClick}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[1, 32, 32]} ref={uranusRef}>
          <meshStandardMaterial attach="material" map={uranusTexture} metalness={0.5} />
        </Sphere>
      </group>
    </group>
  );
};

export default Uranus;
