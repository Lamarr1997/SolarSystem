import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';


const Neptune = ({ distance, speed, tilt }) => {
  const orbitRef = useRef();
  const neptuneRef = useRef();
  const neptuneTexture = useLoader(THREE.TextureLoader, '/textures/neptunemap.jpg');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * (speed / 165); // Adjust speed for Neptune's orbital period

    // Position Neptune in its orbit
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitRef.current.position.set(x, 0, z);

    // Rotate Neptune on its own axis
    neptuneRef.current.rotation.y += 0.01
  })

  return (
    <group ref={orbitRef}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[1, 32, 32]} ref={neptuneRef}>
          <meshStandardMaterial attach="material" map={neptuneTexture} metalness={0.5} />
        </Sphere>
      </group>
    </group>
  )
}

export default Neptune;
