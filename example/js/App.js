import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Picker,
  Slider,
  Text,
  StatusBar,
} from 'react-native';

import {Surface} from 'gl-react-native';
import ColorBlending, {getAllBlendNames} from 'gl-react-color-blending';

import ColorButton from './ColorButton';
import Color from 'color';

function htmlColorToGLSL(htmlColor) {
  return Color(htmlColor).rgbArray().map(x => x / 255);
}

function getDisplayColor(color) {
  return Color().rgb([...color.map(v => v * 255)]).hexString();
}

function round(value) {
  return Math.floor(value * 100) / 100;
}

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const colorComponents = ['r', 'g', 'b', 'a'];

class App extends Component {

  state = {
    blendMode: 'blendAdd',
    activeProfile: 0,
    profiles: [{
      color: [...htmlColorToGLSL('red'), 1]
    }, {
      color: [...htmlColorToGLSL('green'), 1]
    }, {
      color: [...htmlColorToGLSL('blue'), 1]
    }, {
      color: [...htmlColorToGLSL('yellow'), 1]
    }, {
      color: [...htmlColorToGLSL('purple'), 1]
    }, {
      color: [...htmlColorToGLSL('darkorange'), 1]
    }, {
      color: [...htmlColorToGLSL('tomato'), 1]
    }]
  };

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  render() {
    const {activeProfile, profiles, blendMode} = this.state;
    const {color} = profiles[activeProfile];

    return (
      <View style={s.root}>
        <Surface
          width={WINDOW_WIDTH}
          height={300}
        >
          <ColorBlending
            color={color}
            blendMode={blendMode}
          >
            <Image
              source={require('../assets/glitch.jpg')}
              onLoad={() => this.forceUpdate()}
              style={s.image}
            />
          </ColorBlending>
        </Surface>
        <View style={s.row}>
          {profiles.map((profile, index) => {
            return (
              <ColorButton
                key={index}
                color={getDisplayColor(profile.color)}
                isSelected={activeProfile === index}
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
                  newProfiles[activeProfile] = { color: newColor };
                  this.setState({ profiles: newProfiles })
                }}
                value={color[index]}
              />
            </View>
          ))}
        </View>
        <Picker
          selectedValue={blendMode}
          onValueChange={blendMode => this.setState({ blendMode })}
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
    alignSelf: 'center',
  }
});


export default App;
