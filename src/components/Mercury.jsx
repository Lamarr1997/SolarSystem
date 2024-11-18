import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Mercury = ({ distance, speed, tilt }) => {
  const planetRef = useRef();
  const orbitRef = useRef();

  // Load the texture
  const mercuryTexture = useLoader(THREE.TextureLoader, '/textures/mercurymap.jpg',
    undefined,
    (err) => {
      console.error('Error loading texture:', err);
    }
  );

  useFrame(() => {
    orbitRef.current.rotation.y += speed;
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbitRef}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[0.5, 32, 32]} position={[distance, 0, 0]} ref={planetRef}>
          <meshStandardMaterial attach="material" map={mercuryTexture} metalness={0.3} />
        </Sphere>
      </group>
    </group>
  );
};

export default Mercury;
