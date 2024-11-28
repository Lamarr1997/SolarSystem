uniform sampler2D globeTexture;
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
  // Normalize the normal vector
  vec3 normalizedNormal = normalize(vertexNormal);

  // Calculate the intensity based on the dot product with the up vector
  float intensity = 1.05 - dot(normalizedNormal, vec3(0.0, 0.0, 1.0));

  // Define the atmosphere color with a dark blue hue
  vec3 atmosphere = vec3(0.0, 0.0, 1.0) * pow(intensity, 0.2);  // Adjusting for dark blue

  // Combine the atmosphere with the globe texture
  vec4 textureColor = texture2D(globeTexture, vertexUV);
  gl_FragColor = vec4(atmosphere + textureColor.xyz, textureColor.a);
}
