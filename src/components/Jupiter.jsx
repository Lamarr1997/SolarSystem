import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const Jupiter = ({ distance, speed, tilt, onClick }) => {
  const planetRef = useRef();
  const orbitRef = useRef();

  // Load Jupiter's texture
  const jupiterTexture = useLoader(TextureLoader, '/textures/jupitermap.jpg', undefined, (err) => {
    console.error('Error loading texture:', err);
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * speed;
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);

    // Update Jupiter's position in its orbit
    orbitRef.current.position.set(x, 0, z);
    // Rotate Jupiter on its axis
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbitRef} onClick={onClick}>
      <group rotation={[tilt, 0, 0]}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial attach="material" map={jupiterTexture} />
        </mesh>
      </group>
    </group>
  );
};

export default Jupiter;
