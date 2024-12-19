import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Plane } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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
import AsteroidBelt from './Asteroidbelt';
import PopUp from './PopUp';

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
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const canvasRef = useRef(null);
  const earthOrbitRef = useRef();
  const mercuryOrbitRef = useRef();
  const saturnOrbitRef = useRef();
  const uranusOrbitRefUnique = useRef();
  const neptuneOrbitRef = useRef();
  const venusOrbitRef = useRef();
  const marsOrbitRef = useRef();
  const jupiterOrbitRef = useRef();

  const planetFacts = {
    sun: {
      title: "Sun",
      facts: ["The Sun is a star at the center of the Solar System.", "It is composed primarily of hydrogen and helium.", "The Sun's surface temperature is about 5,500 degrees Celsius."]
    },
    mercury: {
      title: "Mercury",
      facts: ["Mercury is the closest planet to the Sun.", "It has no atmosphere.", "A year on Mercury is just 88 days long."]
    },
    venus: {
      title: "Venus",
      facts: ["Venus is the second planet from the Sun.", "It has a thick, toxic atmosphere.", "Venus is sometimes called Earth's 'sister planet' due to their similar size."]
    },
    earth: {
      title: "Earth",
      facts: ["Earth is the third planet from the Sun.", "It is the only planet known to support life.", "Earth has a diverse climate and geography."]
    },
    mars: {
      title: "Mars",
      facts: ["Mars is the fourth planet from the Sun.", "It is known as the Red Planet due to its reddish appearance.", "Mars has the largest volcano in the solar system, Olympus Mons."]
    },
    jupiter: {
      title: "Jupiter",
      facts: ["Jupiter is the largest planet in the Solar System.", "It has a Great Red Spot, which is a giant storm.", "Jupiter has at least 79 moons."]
    },
    saturn: {
      title: "Saturn",
      facts: ["Saturn is the sixth planet from the Sun.", "It is known for its prominent ring system.", "Saturn has the most moons, with at least 83."]
    },
    uranus: {
      title: "Uranus",
      facts: ["Uranus is the seventh planet from the Sun.", "It rotates on its side, making its axis nearly parallel to the Sun.", "Uranus has a faint ring system."]
    },
    neptune: {
      title: "Neptune",
      facts: ["Neptune is the eighth planet from the Sun.", "It has a deep blue color due to methane in its atmosphere.", "Neptune has the strongest winds in the Solar System."]
    }
  };

  const handlePlanetClick = (planet) => {
    const selected = planetFacts[planet]
    setSelectedPlanet(selected);
    setShowPopUp(true);
    console.log('Selected Planet:', selected);
  };

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
    if (venusOrbitRef.current) {
      venusOrbitRef.current.computeLineDistances();
    }
    if (marsOrbitRef.current) {
      marsOrbitRef.current.computeLineDistances();
    }
    if (jupiterOrbitRef.current) {
      jupiterOrbitRef.current.computeLineDistances();
    }
  }, []);

  const earthOrbitPath = createOrbitPath(17, 100); // Earth's orbit radius and segments
  const mercuryOrbitPath = createOrbitPath(10, 100); // Mercury's orbit radius and segments
  const saturnOrbitPath = createOrbitPath(23, 100); // Saturn's orbit radius and segments
  const uranusOrbitRefPath = createOrbitPath(26, 100);
  const neptuneOrbitPath = createOrbitPath(30, 100);
  const venusOrbitPath = createOrbitPath(12, 100);
  const marsOrbitPath = createOrbitPath(19, 100);
  const jupiterOrbitPath = createOrbitPath(21, 100);

  const nebulaTexture = useLoader(THREE.TextureLoader, '/textures/purple-nebula.jpg');

  return (
    <>
      <Canvas ref={canvasRef} className="Canvas-container" camera={{ position: [50, 50, 50], fov: 60 }} style={{ background: '#000' }} onPointerDown={(e) => e.stopPropagation()}>
        <FullScreenCanvas>
          <ambientLight intensity={0.8} />
          <Stars radius={200} depth={60} count={20000} factor={6} saturation={0} fade />
          <pointLight
            position={[0, 0, 0]}
            intensity={20.0}
            decay={2}
            distance={2000}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[50, 0, 0]} intensity={10.0} decay={2} distance={2000} />
          <pointLight position={[-50, 0, 0]} intensity={10.0} decay={2} distance={2000} />
          <pointLight position={[0, 50, 0]} intensity={10.0} decay={2} distance={2000} />
          <pointLight position={[0, -50, 0]} intensity={10.0} decay={2} distance={2000} />
          <OrbitControls />

          {/* Nebula Background */}
          <Plane args={[200, 200]} position={[0, 0, -100]}>
            <meshBasicMaterial attach="material" map={nebulaTexture} transparent={true} opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </Plane>

          <Sun onClick={() => handlePlanetClick('sun')} />
          <Mercury distance={10} speed={0.01} tilt={0.1} onClick={() => handlePlanetClick('mercury')} />
          <Venus distance={12} speed={0.02} tilt={0.2} onClick={() => handlePlanetClick('venus')} />
          <Earth distance={17} speed={0.02} tilt={0.1} onClick={() => handlePlanetClick('earth')} >
            <EffectComposer>
              <Bloom intensity={0.9} luminanceThreshold={0.3} luminanceSmoothing={0.6}/>
            </EffectComposer>
          </Earth>
          <Mars distance={19} speed={0.01} tilt={0.3} onClick={() => handlePlanetClick('mars')} />
          <AsteroidBelt innerRadius={20} outerRadius={22} numAsteroids={1000} speed={0.001} />
          <Jupiter distance={21} speed={0.02} tilt={0.3} onClick={() => handlePlanetClick('jupiter')} />
          <Saturn distance={23} speed={0.03} tilt={0.4} onClick={() => handlePlanetClick('saturn')} />
          <Uranus distance={26} speed={10.0} tilt={0.5} onClick={() => handlePlanetClick('uranus')} />
          <Neptune distance={30} speed={0.3} tilt={0.6} onClick={() => handlePlanetClick('neptune')} />

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

          {/*Venus Oribit Path */}
          <line ref={venusOrbitRef} geometry={venusOrbitPath}>
            <lineDashedMaterial attach="material" color="red" dashSize={1} gapSize={1}/>
          </line>

          {/* Saturn's Orbit Path */}
          <line ref={saturnOrbitRef} geometry={saturnOrbitPath}>
            <lineDashedMaterial attach="material" color="blue" dashSize={1} gapSize={1} />
          </line>

          {/*Jupiter Orbit Path */}
          <line ref={jupiterOrbitRef} geometry={jupiterOrbitPath}>
            <lineDashedMaterial attach="material" color="orange" dashSize={1} gapSize={1}/>
          </line>

          {/*Mars Orbit Path */}
          <line ref={marsOrbitRef} geometry={marsOrbitPath}>
            <lineDashedMaterial attach="material" color="pink" dashSize={1} gapSize={1}/>
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
      {showPopUp && selectedPlanet && <PopUp visible={showPopUp} onClose={() => setShowPopUp(false)} title={selectedPlanet.title} facts={selectedPlanet.facts} />}
    </>
  );
};

export default SolarSystem;
