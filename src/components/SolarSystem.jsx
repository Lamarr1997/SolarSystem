import React, { useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Sun from './Sun';
import Mercury from './Mercury';
import Venus from './Venus';

const FullScreenCanvas = ({ children }) => {
  const { gl, camera, size } = useThree();

  useEffect(() => {
    // Set the aspect ratio and update the projection matrix
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    // Update the renderer's size
    gl.setSize(size.width, size.height);
  }, [gl, camera, size]);

  return <>{children}</>;
};

const SolarSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => { window.removeEventListener('resize', handleResize);
    };
  }, [])

  return (
    <Canvas ref={canvasRef} className='Canvas-container' camera={{ position: [10, 10, 10], fov: 60 }}>
      <FullScreenCanvas>
        <ambientLight intensity={0.5} />
        <Stars radius={200} depth={60} count={20000} factor={6} saturation={0} fade={true} />
        <directionalLight position={[5, 5, 5]} intensity={1.0}  castShadow shadow-mapSize-width={1024}  shadow-mapSize-height={1024} />
        <OrbitControls />
        <Sun />
        <Mercury distance={4} speed={0.01} tilt={0.1} />
        <Venus distance={5} speed={0.02} tilt={0.2} />
      </FullScreenCanvas>
    </Canvas>
  )
}

export default SolarSystem;
