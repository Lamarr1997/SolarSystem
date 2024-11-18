uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform samplerCube uPerlin;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  float t = time * 0.005;
  mat2 rot = rotate(t);

  vec3 p = position;
  p.yz = rot * p.yz;

  vUv = uv;
  vPosition = p;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
