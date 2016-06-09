import shaderCodes from './shaders'

export function getAllBlendNames() {
  return Object.keys(shaderCodes);
}

export const blendModeCodes = shaderCodes;

import GL from 'gl-react';
import React, {
  PropTypes
} from 'react';

const shaderObjects = getAllBlendNames().reduce((processed, name) => {
  const formatted = {
    [name]: {
      frag: `
precision highp float;
varying vec2 uv;

uniform sampler2D tex;
uniform vec4 color;

${shaderCodes[name]}

void main () {
  vec4 baseColor = texture2D(tex, uv);
  vec3 newColor = ${name}(baseColor.rgb, color.rgb, color.a);
  gl_FragColor = vec4(newColor, 1.);
}`
    }
  };
  return Object.assign({}, processed, formatted);
}, {});

const shaders = GL.Shaders.create(shaderObjects);

const ColorBlending = GL.createComponent(({ children: tex, color, blendMode = 'blendAdd' }) => (
  <GL.Node
    shader={ shaders[blendMode] }
    uniforms={{ tex, color }}
  />
), {
  displayName: "ColorBlending",
  propTypes: {
    children: PropTypes.any.isRequired,
    color: PropTypes.array,
    blendMode: PropTypes.string,
  }
});

export default ColorBlending;