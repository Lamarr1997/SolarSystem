uniform vec3 color1;
uniform vec3 color2;
varying vec3 vPosition;
varying float vOpacity;

void main() {
  // Calculate the blend factor based on the x-coordinate
  float blendFactor = (vPosition.x + 1.0) / 2.0;
  vec3 color = mix(color1, color2, blendFactor);

  // Set the final color with opacity
  gl_FragColor = vec4(color, 1.0);
}

