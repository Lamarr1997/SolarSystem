
import { Sphere, Wireframe } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import { CubeTextureLoader } from 'three';
import * as THREE from 'three';
import fragments from '../shader/Fragments.glsl';
import vertex from '../shader/Vertex.glsl';
import vertexSun from '../shaderSun/VertexSun.glsl';
import fragmentsSun from '../shaderSun/FragmentsSun.glsl';

const Sun = () => {

  const meshRef = useRef();
  const { gl, scene } = useThree();
  const renderTarget = new THREE.WebGLCubeRenderTarget(256);
  const cubeCamera = useRef();
  const perlinMaterial = useRef();

  useEffect(() => {
    perlinMaterial.current = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragments,
      uniforms: {
        time: { value: 1.0 },
      },
      side: THREE.DoubleSide,
    });
    cubeCamera.current = new THREE.CubeCamera(1, 1000, renderTarget);
    scene.add(cubeCamera.current);
  }, [scene])

  useFrame(({ clock }) => {
    if (meshRef.current && cubeCamera.current) {
      const elapsedTime = clock.getElapsedTime();
      //meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
      perlinMaterial.current.uniforms.time.value = elapsedTime;
      cubeCamera.current.update(gl, scene);
      if (meshRef.current.material.uniforms.uPerlin) {
        meshRef.current.material.uniforms.uPerlin.value = renderTarget.texture;
      }
      console.log('Cube Texture:', renderTarget.texture);
      console.log('Elapsed Time:', elapsedTime);
      console.log('Main Material Uniforms:', meshRef.current.material.uniforms);

    }
  });


  return (
    <>
      <mesh material={perlinMaterial.current} visible={true}>
        <sphereGeometry args={[2, 32, 32]} />
      </mesh>

      <mesh ref={meshRef}>
        <sphereGeometry args={[ 2, 32, 32 ]}/>
        <shaderMaterial
          attach="material"
          uniforms={{
            time: { value: 1.0 },
            uPerlin: { value: null },
            progress: { value: 0 },
            texture1: { value: null },
            resolution: { value: new THREE.Vector4() },
         }}
          vertexShader={vertexSun}
          fragmentShader={fragmentsSun}
        />
      </mesh>
    </>
  )
}

export default Sun;
