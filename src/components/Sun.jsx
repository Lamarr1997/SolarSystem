import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexSun from '../shaderSun/VertexSun.glsl';
import fragmentsSun from '../shaderSun/FragmentsSun.glsl';
import vertex from '../shader/Vertex.glsl';
import fragments from '../shader/Fragments.glsl';

const Sun = ({ onClick }) => {
  const meshRef = useRef();
  const { gl, size } = useThree();
  const renderTarget = new THREE.WebGLCubeRenderTarget(256, { format: THREE.RGBAFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
  const cubeCamera = useRef();
  const perlinMaterial = useRef();
  const tempScene = useRef(new THREE.Scene()); // Separate scene for cube camera rendering

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

    // Temporary sphere in a separate scene for Perlin noise texture
    const tempSphere = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), perlinMaterial.current);
    tempScene.current.add(tempSphere);

    cubeCamera.current = new THREE.CubeCamera(1, 1000, renderTarget);
    tempScene.current.add(cubeCamera.current);
  }, [size]);

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

      // Render the cube camera for the Perlin texture in a separate scene
      cubeCamera.current.update(gl, tempScene.current);

      // Update the Perlin texture uniform in the main material
      if (meshRef.current.material.uniforms.uPerlin) {
        meshRef.current.material.uniforms.uPerlin.value = renderTarget.texture;
      }

      // Debugging outputs
      console.log('uPerlin Uniform:', meshRef.current.material.uniforms.uPerlin.value);
      console.log('Elapsed Time:', elapsedTime);
    }
  });

  return (
    <>
      <mesh material={perlinMaterial.current} visible={false} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[2, 32, 32]} />
      </mesh>

      <mesh ref={meshRef} castShadow={false} receiveShadow={false} onClick={onClick}>
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
