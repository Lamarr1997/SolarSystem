{/* Nebula Background */}
<Plane args={[400, 400]} position={[0, 0, -150]}>
  <meshBasicMaterial
    attach="material"
    map={nebulaTexture}
    transparent={true}
    opacity={0.15}
    blending={THREE.AdditiveBlending}
    depthWrite={false}
    side={THREE.DoubleSide}
  />
</Plane>
