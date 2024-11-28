import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import Sun from './Sun';
import Mercury from './Mercury';
import Venus from './Venus';
import Earth from './Earth';
import Mars from './Mars';
import Jupiter from './Jupiter';
import Saturn from './Saturn';
import Uranus from './Uranus';
import Neptune from './Neptune';
import Nebula from './Nebula';

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

const createOrbitPath = (radius, segments) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  return new THREE.BufferGeometry().setFromPoints(points);
};

const SolarSystem = () => {
  const canvasRef = useRef(null);
  const earthOrbitRef = useRef();
  const mercuryOrbitRef = useRef();
  const saturnOrbitRef = useRef();
  const uranusOrbitRefUnique = useRef();
  const neptuneOrbitRef = useRef();

  useEffect(() => {
    if (earthOrbitRef.current) {
      earthOrbitRef.current.computeLineDistances();
    }
    if (mercuryOrbitRef.current) {
      mercuryOrbitRef.current.computeLineDistances();
    }
    if (saturnOrbitRef.current) {
      saturnOrbitRef.current.computeLineDistances();
    }
    if (uranusOrbitRefUnique.current) {
      uranusOrbitRefUnique.current.computeLineDistances();
    }
    if (neptuneOrbitRef.current) {
      neptuneOrbitRef.current.computeLineDistances();
    }
  }, []);

  const earthOrbitPath = createOrbitPath(17, 100); // Earth's orbit radius and segments
  const mercuryOrbitPath = createOrbitPath(12, 100); // Mercury's orbit radius and segments
  const saturnOrbitPath = createOrbitPath(23, 100); // Saturn's orbit radius and segments
  const uranusOrbitRefPath = createOrbitPath(26, 100);
  const neptuneOrbitPath = createOrbitPath(30, 100);

  return (
    <Canvas ref={canvasRef} className="Canvas-container" camera={{ position: [50, 50, 50], fov: 60 }} style={{ background: '#000' }}>
      <FullScreenCanvas>
        <ambientLight intensity={0.2} />
        <Stars radius={200} depth={60} count={20000} factor={6} saturation={0} fade />
        <pointLight
          position={[0, 0, 0]}
          intensity={5.0}
          decay={2}
          distance={100}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <OrbitControls />
        <Sun />
        <Mercury distance={10} speed={0.01} tilt={0.1} />
        <Venus distance={13} speed={0.02} tilt={0.2} />
        <Earth distance={17} speed={0.3} tilt={0.1} />
        <Mars distance={19} speed={0.01} tilt={0.3} />
        <Jupiter distance={21} speed={0.4} tilt={0.3} />
        <Saturn distance={23} speed={0.5} tilt={0.4} />
        <Uranus distance={26} speed={10.0} tilt={0.5} />
        <Neptune distance={30} speed={0.3} tilt={0.6} />

        {/* Interactive Nebula */}
        <Nebula />

        {/* Earth's Orbit Path */}
        <line ref={earthOrbitRef} geometry={earthOrbitPath}>
          <lineDashedMaterial attach="material" color="white" dashSize={1} gapSize={1} />
        </line>

        {/* Mercury's Orbit Path */}
        <line ref={mercuryOrbitRef} geometry={mercuryOrbitPath}>
          <lineDashedMaterial attach="material" color="yellow" dashSize={1} gapSize={1} />
        </line>

        {/* Saturn's Orbit Path */}
        <line ref={saturnOrbitRef} geometry={saturnOrbitPath}>
          <lineDashedMaterial attach="material" color="blue" dashSize={1} gapSize={1} />
        </line>

        {/* Uranus's Orbit Path */}
        <line ref={uranusOrbitRefUnique} geometry={uranusOrbitRefPath}>
          <lineDashedMaterial attach="material" color="green" dashSize={1} gapSize={1} />
        </line>

        {/* Neptune's Orbit Path */}
        <line ref={neptuneOrbitRef} geometry={neptuneOrbitPath}>
          <lineDashedMaterial attach="material" color="purple" dashSize={1} gapSize={1} />
        </line>
      </FullScreenCanvas>
    </Canvas>
  );
};

export default SolarSystem;

