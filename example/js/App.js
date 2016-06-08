

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Picker,
} from 'react-native';
import {Surface} from 'gl-react-native';
import BlendmodeShaders from './BlendmodeShaders';
import ColorButton from './ColorButton';
import Color from 'color';

import { getAllBlendNames } from 'gl-react-blend-modes';

function htmlColorToGLSL(htmlColor) {
  return Color(htmlColor).rgbArray().map(x => x / 255).concat([1]);
}
const {width: WINDOW_WIDTH} = Dimensions.get('window');

class App extends Component {

  state = {
    blendColor: htmlColorToGLSL('green'),
    blendMode: 'blendAdd'
  };

  static propTypes = {};

  setColor = color => event => {
    console.log(color, 'ok')
    this.setState({blendColor: color});
  };

  render() {
    return (
      <View style={s.root}>
        <Surface
          width={WINDOW_WIDTH}
          height={300}
        >
          <BlendmodeShaders
            color={this.state.blendColor}
            blendMode={this.state.blendMode}
          >
            <Image
              source={require('../assets/glitch.jpg')}
              onLoad={() => this.forceUpdate()}
              style={s.image}
            />
          </BlendmodeShaders>
        </Surface>
        <View style={s.row}>
          <ColorButton color={'red'} callback={this.setColor(htmlColorToGLSL('red'))}/>
          <ColorButton color={'green'} callback={this.setColor(htmlColorToGLSL('green'))}/>
          <ColorButton color={'blue'} callback={this.setColor(htmlColorToGLSL('blue'))}/>
          <ColorButton color={'red'} callback={this.setColor(htmlColorToGLSL('red'))}/>
          <ColorButton color={'green'} callback={this.setColor(htmlColorToGLSL('green'))}/>
          <ColorButton color={'blue'} callback={this.setColor(htmlColorToGLSL('blue'))}/>
          <ColorButton color={'red'} callback={this.setColor(htmlColorToGLSL('red'))}/>
        </View>
        <Picker
          selectedValue={this.state.blendMode}
          onValueChange={blendMode => {
          console.log('change', blendMode)
          this.setState({ blendMode })
          }}
        >
          {getAllBlendNames().map((mode, index) => (
            <Picker.Item
              key={index}
              label={mode.replace('blend', '').toUpperCase()}
              value={mode}
            />
          ))}
        </Picker>
      </View>
    );
  }
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    width: WINDOW_WIDTH,
    height: 300,
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'red',
  },
});


export default App;
