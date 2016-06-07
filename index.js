const source = require('./src.js');
const freeze = require('deep-freeze');

const blendModes = Object.keys(source).reduce((processed, current) => {
  if (typeof curr === 'string') {
    processed[current] = source[current];
    return processed;
  }

  if (typeof curr === 'object') {
    let temp = '';
    
  }
}, {});

export default freeze(blendModes);
