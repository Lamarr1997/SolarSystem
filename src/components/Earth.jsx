import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, ShaderMaterial } from 'three';
import vertexEarth from '../earthshader/Vertex.glsl';
import fragmentsEarth from '../earthshader/Fragments.glsl';
import AtmosphereVertex from '../earthshader/Atmospherevertex.glsl';
import AtmosphereFragments from '../earthshader/Atmospherefragments.glsl';
import * as THREE from 'three';
import Moon from'./Moon';

const Earth = ({ distance, speed, tilt, onClick }) => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  const earthTexture = useLoader(TextureLoader, '/textures/earthmap1k.jpg');
  const cloudsTexture = useLoader(TextureLoader, '/textures/earthcloudmap.jpg');

  // console.log('Earth Texture:', earthTexture);
  // console.log('Clouds Texture:', cloudsTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * speed;
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);

    // Position the Earth in its orbit
    earthRef.current.parent.position.set(x, 0, z);
    earthRef.current.rotation.y += 0.01; // Rotate Earth on its axis

    // Rotate the clouds mesh slightly faster than the Earth
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.015;
    }
  });

  return (
    <group onClick={onClick}>
      <group ref={earthRef} rotation={[tilt, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <shaderMaterial
            attach="material"
            args={[{
              vertexShader: vertexEarth,
              fragmentShader: fragmentsEarth,
              uniforms: {
                globeTexture: { value: earthTexture },
              },
            }]}
          />
        </mesh>
        {cloudsTexture && (
          <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              attach="material"
              map={cloudsTexture}
              blending={THREE.AdditiveBlending}
              transparent={true}
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        <mesh ref={atmosphereRef} scale={[1.1, 1.1, 1.1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <shaderMaterial
            attach="material"
            args={[{
              vertexShader: AtmosphereVertex,
              fragmentShader: AtmosphereFragments,
              blending: THREE.AdditiveBlending,
              side: THREE.BackSide,
              transparent: true,
              uniforms: {}
            }]}
          />
        </mesh>
        <Moon earthRef={earthRef} distance={1.5} speed={0.001} tilt={0.2} />
      </group>
    </group>
  );
};

export default Earth;
