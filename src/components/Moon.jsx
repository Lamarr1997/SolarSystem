import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Moon = ({earthRef, distance, speed, tilt}) => {
  const moonRef = useRef();
  const orbitRef = useRef();
  const moonTexture = useLoader(THREE.TextureLoader, '/textures/moonmap1k.jpg');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * (speed / 27.3); // Adjust speed for the Moon's orbital period

    // Position the Moon in its orbit around the Earth
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    orbitRef.current.position.set(x, 0, z);
    // Make the orbitRef follow the Earth's position
    const earthPosition = earthRef.current.position;
    orbitRef.current.position.add(earthPosition);
    // Rotate the Moon on its own axis
    moonRef.current.rotation.y += 0.01;
  })

  return (
    <group ref={orbitRef}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[0.27, 32, 32]} ref={moonRef}>
          <meshStandardMaterial attach="material" map={moonTexture} metalness={0.5} />
        </Sphere>
    </group>
  </group>
  )
}

export default Moon;
