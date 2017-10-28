import React from 'react';
import PropTypes from 'prop-types';
import { Shaders, Node, GLSL } from 'gl-react';
import shaderCodes from './shaders'

export const blendNames = Object.keys(shaderCodes);
export const blendShaderCodes = shaderCodes;

const shaderObjects = blendNames.reduce((processed, name) => {
  const formatted = {
    [name]: {
      frag: GLSL`
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

const shaders = Shaders.create(shaderObjects);

class ColorBlending extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    color: PropTypes.array,
    blendMode: PropTypes.string,
  };
  render() {
    const { children: tex, color, blendMode = 'blendAdd' } = this.props;
    return (
      <Node
        shader={shaders[blendMode] }
        uniforms={{ tex, color }}
      />
    );
  }
}

export default ColorBlending;