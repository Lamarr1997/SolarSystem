import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Plane } from '@react-three/drei';
import * as THREE from 'three';

const NebulaScene = () => {
  const orangeNebulaTexture = useLoader(THREE.TextureLoader, '/textures/orange-nebula.jpg');

  const nebulaShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      texture: { value: orangeNebulaTexture },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D texture;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(texture, vUv);
        float alpha = smoothstep(0.0, 0.5, length(vUv - 0.5));
        gl_FragColor = vec4(color.rgb, alpha * color.a);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <Canvas style={{ background: '#000' }} camera={{ position: [0, 0, 200], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <Stars radius={200} depth={60} count={20000} factor={6} saturation={0} fade />
      <OrbitControls />

      {/* Orange Nebula Background */}
      <Plane args={[200, 200]} position={[0, 0, 100]}>
        <primitive attach="material" object={nebulaShaderMaterial} />
      </Plane>
    </Canvas>
  );
};

export default NebulaScene;
