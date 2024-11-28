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

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * speed;

    // Position Mercury in its orbit
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitRef.current.position.set(x, 0, z);

    // Rotate Mercury on its own axis
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbitRef}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[0.5, 32, 32]} ref={planetRef}>
          <meshStandardMaterial attach="material" map={mercuryTexture} metalness={0.3} />
        </Sphere>
      </group>
    </group>
  );
};

export default Mercury;

