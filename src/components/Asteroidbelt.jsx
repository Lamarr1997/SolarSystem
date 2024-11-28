import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const AsteroidBelt = ({ innerRadius, outerRadius, numAsteroids, speed }) => {
  const groupRef = useRef();
  const asteroidTexture = useLoader(THREE.TextureLoader, '/textures//1024px-Generic_Celestia_asteroid_texture.jpg');

  const asteroids = useMemo(() => {
    const temp = [];
    for (let i = 0; i < numAsteroids; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = THREE.MathUtils.lerp(innerRadius, outerRadius, Math.random());
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const size = Math.random() * 0.2;

      temp.push({ position: [x, (Math.random() - 0.5) * 2, z], size });
    }
    return temp;
  }, [innerRadius, outerRadius, numAsteroids]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    groupRef.current.rotation.y = elapsedTime * speed;
  });

  return (
    <group ref={groupRef}>
      {asteroids.map((asteroid, index) => (
        <mesh key={index} position={asteroid.position}>
          <sphereGeometry args={[asteroid.size, 8, 8]} />
          <meshStandardMaterial map={asteroidTexture} color="white" emissive={'grey'} emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export default AsteroidBelt;
