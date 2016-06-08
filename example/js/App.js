import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Picker,
  Slider,
  Text,
} from 'react-native';
import {Surface} from 'gl-react-native';
import BlendmodeShaders from './BlendmodeShaders';
import ColorButton from './ColorButton';
import Color from 'color';

import {getAllBlendNames} from 'gl-react-blend-modes';

function htmlColorToGLSL(htmlColor) {
  return Color(htmlColor).rgbArray().map(x => x / 255);
}
const {width: WINDOW_WIDTH} = Dimensions.get('window');

const round = value => Math.floor(value * 100) / 100;

const getDisplayColor = (color) => {
  return Color().rgb([...color.map(v => v * 255)]).hexString();
};

class App extends Component {

  state = {
    activeProfile: 0,
    profiles: [{
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('red'), 1]
    }, {
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('green'), 1]
    }, {
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('blue'), 1]
    }, {
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('yellow'), 1]
    }, {
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('purple'), 1]
    }, {
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('darkorange'), 1]
    }, {
      blendMode: 'blendAdd',
      color: [...htmlColorToGLSL('tomato'), 1]
    }]
  };

  render() {
    const colorComponents = ['r', 'g', 'b', 'a'];
    const {activeProfile, profiles} = this.state;
    const {color, blendMode} = profiles[activeProfile];

    return (
      <View style={s.root}>
        <Surface
          width={WINDOW_WIDTH}
          height={300}
        >
          <BlendmodeShaders
            color={color}
            blendMode={blendMode}
          >
            <Image
              source={require('../assets/glitch.jpg')}
              onLoad={() => this.forceUpdate()}
              style={s.image}
            />
          </BlendmodeShaders>
        </Surface>
        <View style={s.row}>
          {profiles.map((profile, index) => {
            return (
              <ColorButton
                key={index}
                color={getDisplayColor(profile.color)}
                callback={() => this.setState({ activeProfile: index })}
              />
            )
          })}
        </View>
        <View>
          {color.map((value, index) => (
            <View style={s.colorComponent} key={index}>
              <Text
                style={s.label}
              >
                {colorComponents[index].toUpperCase()} {round(color[index])}
              </Text>
              <Slider
                style={s.slider}
                maximumValue={1}
                onValueChange={value => {
                  const newColor = [...color];
                  newColor[index] = value;
                  const newProfiles = [...profiles];
                  newProfiles[activeProfile] = {
                    color: newColor,
                    blendMode: profiles[activeProfile].blendMode
                  };
                  this.setState({ profiles: newProfiles })
                }}
                value={color[index]}
              />
            </View>
          ))}
        </View>
        <Picker
          selectedValue={blendMode}
          onValueChange={blendMode => {
            const newProfiles = [...profiles];
            newProfiles[activeProfile] = {
              color: profiles[activeProfile].color,
              blendMode,
            };
            this.setState({ profiles: newProfiles });
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
  colorComponent: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  slider: {
    flex: 5,
  },
  label: {
    flex: 1,
  }
});


export default App;
