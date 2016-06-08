import GL from 'gl-react';
import React from 'react';
import BlendModes, {getAllBlendNames} from 'gl-react-blend-modes';

const LOG = (head, ...tail) => {
  console.log('/----------------------\\');
  console.log(head, ...tail);
  console.log('\\----------------------/');
  return head;
};

const CLEAR = (lines = 5) => {
  console.log(`\n`.repeat(lines));
};

const shaders = getAllBlendNames().map(name => {
  return GL.Shaders.create({
    [name]: {
      frag: `
precision highp float;
varying vec2 uv;

uniform sampler2D tex;
uniform vec4 color;

${BlendModes[name]}

void main () {
  vec4 baseColor = texture2D(tex, uv);
  vec3 newColor = ${name}(baseColor.rgb, color.rgb, color.a);
  gl_FragColor = vec4(newColor, 1.);
}`
    }
  });
}).reduce((prev, curr) => {
  return Object.assign({}, prev, curr);
}, {});

console.log('////////////', shaders)

export default GL.createComponent(
  ({children, color, blendMode = 'blendAdd'}) => (
    <GL.Node
      shader={ shaders[blendMode] }
      uniforms={{ color }}
    >
      <GL.Uniform name="tex">{children}</GL.Uniform>
    </GL.Node>
  ),
  {displayName: 'ColorBlending'}
);
