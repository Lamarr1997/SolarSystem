uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
uniform samplerCube uPerlin;
varying vec2 vUv;
varying vec3 vPosition;

varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

float PI = 3.14159;

void main() {

  // gl_FragColor = textureCube(uPerlin, normalize(vPosition));
  vec3 color = textureCube(uPerlin, normalize(vPosition)).rgb;
  gl_FragColor = vec4(color, 1.0);
  gl_FragColor = vec4(vLayer0, 1.0);

}
