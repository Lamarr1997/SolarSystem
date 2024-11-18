import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Venus = ({distance, speed, tilt}) => {
  const orbitRef = useRef();
  const planetRef = useRef();

  const venusTexture = useLoader(THREE.TextureLoader, '/textures/venusmap.jpg')

  useFrame(() => {
    orbitRef.current.rotation.y += speed;
    planetRef.current.rotation.y += 0.01;
  })

  return (
    <group ref={orbitRef}>
      <group rotation={[tilt, 0, 0]}>
        <Sphere args={[0.5, 32, 32]} position={[distance, 0, 0]} ref={planetRef}>
          <meshStandardMaterial attach="material" map={venusTexture} metalness={0.3} />
        </Sphere>
      </group>
    </group>
  )
}

export default Venus;
