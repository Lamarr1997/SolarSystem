uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec2 pixels;

varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

float PI = 3.14159;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}
void main() {

  // float t = time * 0.005;
  mat2 rot = rotate(time);
  vec3 p0 = position;
  p0.yz = rot * p0.yz;
  vLayer0 = p0;

  vec3 p1 = position;
  p1.xz = rot * p.xz;
  vLayer1 = p1;

  vec3 p2 = position;
  p2.xy = rot * p2.xy;
  vLayer2 = p2;

  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}