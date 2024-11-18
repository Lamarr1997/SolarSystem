uniform float time;
uniform samplerCube uPerlin;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Normalize vPosition for texture sampling
  vec3 normalizedPosition = normalize(vPosition);

  // Sample the texture
  vec3 texColor = textureCube(uPerlin, normalizedPosition).rgb;

  // Output the texture color
  if (texColor == vec3(0.0)) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Red color for debugging
  } else {
    gl_FragColor = vec4(texColor, 1.0);
  }
}
