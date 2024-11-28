varying vec3 vPosition;
varying float vOpacity;

void main() {
  vPosition = position;

  // Calculate opacity based on distance from the center
  float dist = length(position);
  vOpacity = 1.0 - smoothstep(0.0, 1.0, dist);

  // Pass the position to the fragment shader
  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

