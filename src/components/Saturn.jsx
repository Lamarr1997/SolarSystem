import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Saturn = ({ distance, speed, tilt, onClick }) => {
  const planetRef = useRef();
  const orbitRef = useRef();

  // Load Saturn's texture
  const saturnTexture = useLoader(THREE.TextureLoader, '/textures/saturnmap.jpg');
  const ringTexture = useLoader(THREE.TextureLoader, '/textures/saturnringcolor.jpg');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * speed;

    // Position Saturn in its orbit
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitRef.current.position.set(x, 0, z);

    // Rotate Saturn on its own axis
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbitRef} onClick={onClick}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[1, 32, 32]} ref={planetRef}>
          <meshStandardMaterial attach="material" map={saturnTexture} metalness={0.5} />
        </Sphere>
        {/* Saturn's Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 2, 32]} />
          <meshBasicMaterial
            attach="material"
            map={ringTexture}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Saturn;
