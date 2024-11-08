import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Sun from './Sun';

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
    <Canvas ref={canvasRef} className='Canvas-container'>
      <ambientLight intensity={0.5} />
      <Stars radius={200} depth={60} count={10000} factor={6} saturation={0} fade={true} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls /> { <Sun /> }
    </Canvas>
  )
}

export default SolarSystem;
