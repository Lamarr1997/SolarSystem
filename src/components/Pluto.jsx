import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

const Pluto = ({ distance, speed, tilt, onClick }) => {
  const plutoRef = useRef();
  const plutoTexture = useLoader(THREE.TextureLoader, '/textures/plutomap1k.jpg');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * speed;

    // Calculate base orbital position
    const x = Math.cos(angle) * distance;
    const baseZ = Math.sin(angle) * distance;

    // Apply the 17.16-degree tilt using the same method as the orbit path
    const tiltAngle = THREE.MathUtils.degToRad(17.16);
    const y = baseZ * Math.sin(tiltAngle);
    const z = baseZ * Math.cos(tiltAngle);

    // Update Pluto's position
    plutoRef.current.position.set(x, y, z);

    // Rotate Pluto on its axis
    plutoRef.current.rotation.y += 0.01;
  });

  return (
    <Sphere
      args={[0.5, 32, 32]}
      ref={plutoRef}
      onClick={onClick}
      rotation={[tilt, 0, 0]}
    >
      <meshStandardMaterial
        attach="material"
        map={plutoTexture}
        metalness={0.3}
      />
    </Sphere>
  );
};

export default Pluto;
