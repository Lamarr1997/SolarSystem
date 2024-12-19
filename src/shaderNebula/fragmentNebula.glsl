uniform vec3 color1;
uniform vec3 color2;
varying vec3 vPosition;

void main() {
  // Calculate the blend factor based on the x-coordinate
  float blendFactor = (vPosition.x + 10.0) / 20.0; // Adjusted range for visibility
  vec3 color = mix(color1, color2, blendFactor);

  // Set the final color
  gl_FragColor = vec4(color, 1.0);
}

