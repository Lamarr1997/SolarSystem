import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Mars = ({distance, speed, tilt}) => {
  const marsRef = useRef();
  const orbitRef = useRef();
  const marsTexture = useLoader(THREE.TextureLoader, '/textures/mars_1k_color.jpg');

  useFrame(({clock}) => {
    orbitRef.current.rotation.y += speed;
    marsRef.current.rotation.y += 0.01;
  })

  return (
    <group ref={orbitRef}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[0.5, 32, 32]} position={[distance, 0, 0]} ref={marsRef}>
          <meshStandardMaterial attach="material" map={marsTexture} metalness={0.3} />
        </Sphere>
      </group>
    </group>
  )
}

export default Mars;
