varying vec3 vNormal;
varying vec3 eyeVector;

float PI = 3.141592653589793238;

// Ensure Fresnel function is defined only once
float Fresnel(vec3 eyeVector, vec3 worldPosition) {
  return pow(1.0 + dot(eyeVector, worldPosition), 3.0);
}

vec3 brightnessToColor(float b) {
  b *= 0.25;
  return (vec3(b, b * b, b * b * b * b) / 0.25) * 0.6;
}
