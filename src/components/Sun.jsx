import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import fragments from '../shader/Fragments.glsl';
import vertex from '../shader/Vertex.glsl';
import vertexSun from '../shaderSun/VertexSun.glsl';
import fragmentsSun from '../shaderSun/FragmentsSun.glsl';

const Sun = () => {
  const meshRef = useRef();
  const { gl, scene, size } = useThree();
  const renderTarget = new THREE.WebGLCubeRenderTarget(256, { format: THREE.RGBAFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
  const cubeCamera = useRef();
  const perlinMaterial = useRef();

  useEffect(() => {
    perlinMaterial.current = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragments,
      uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector4(size.width, size.height, 1.0, 1.0) },
      },
      side: THREE.DoubleSide,
    });

    cubeCamera.current = new THREE.CubeCamera(1, 1000, renderTarget);
    scene.add(cubeCamera.current);
  }, [scene, size]);

  useFrame(({ clock }) => {
    if (meshRef.current && cubeCamera.current) {
      const elapsedTime = clock.getElapsedTime();

      // Update the time uniform for both materials
      perlinMaterial.current.uniforms.time.value = elapsedTime;
      perlinMaterial.current.uniforms.resolution.value.set(size.width, size.height, 1.0, 1.0);

      if (meshRef.current.material.uniforms.time) {
        meshRef.current.material.uniforms.time.value = elapsedTime;
      }
      if (meshRef.current.material.uniforms.resolution) {
        meshRef.current.material.uniforms.resolution.value.set(size.width, size.height, 1.0, 1.0);
      }

      // Render the cube camera for the Perlin texture
      cubeCamera.current.update(gl, scene);
      console.log('Updated Cube Texture:', renderTarget.texture);

      // Update the Perlin texture uniform in the main material
      if (meshRef.current.material.uniforms.uPerlin) {
        meshRef.current.material.uniforms.uPerlin.value = renderTarget.texture;
      }

      console.log('uPerlin Uniform:', meshRef.current.material.uniforms.uPerlin.value);
      console.log('Cube Texture:', renderTarget.texture);
      console.log('Elapsed Time:', elapsedTime);
      console.log('Main Material Uniforms:', meshRef.current.material.uniforms);
    }
  });

  return (
    <>
      <mesh material={perlinMaterial.current} visible={false}>
        <sphereGeometry args={[2, 32, 32]} />
      </mesh>

      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <shaderMaterial
          attach="material"
          uniforms={{
            time: { value: 1.0 },
            uPerlin: { value: renderTarget.texture },
            resolution: { value: new THREE.Vector4(size.width, size.height, 1.0, 1.0) },
          }}
          vertexShader={vertexSun}
          fragmentShader={fragmentsSun}
        />
      </mesh>
    </>
  );
};

export default Sun;
