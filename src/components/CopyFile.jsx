if (plutoOrbitRef.current) {
  plutoOrbitRef.current.computeLineDistances();
  // Rotate the orbit line to match Pluto's tilt
  const axis = new THREE.Vector3(0, 0, 1);
  plutoOrbitRef.current.rotateOnAxis(axis, THREE.MathUtils.degToRad(17.16));
}
