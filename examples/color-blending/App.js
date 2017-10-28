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

import {Surface} from 'gl-react-expo';
import ColorBlending, { blendNames } from 'gl-react-color-blending';

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
        currentDisplayColor: [...htmlColorToGLSL('red'), 1],
        profiles: [
            [...htmlColorToGLSL('red'), 1],
            [...htmlColorToGLSL('green'), 1],
            [...htmlColorToGLSL('blue'), 1],
            [...htmlColorToGLSL('yellow'), 1],
            [...htmlColorToGLSL('purple'), 1],
            [...htmlColorToGLSL('darkorange'), 1],
            [...htmlColorToGLSL('tomato'), 1]
        ]
    };

    componentWillMount() {
        StatusBar.setHidden(true);
    }

    render() {
        const {activeProfile, profiles, blendMode, currentDisplayColor} = this.state;
        const activeProfileColor = profiles[activeProfile];

        return (
            <View style={s.root}>
                <Surface style={s.surface}>
                    <ColorBlending
                        color={currentDisplayColor}
                        blendMode={blendMode}
                    >
                      {{ uri: 'https://i.imgur.com/iPKTONG.jpg' }}
                    </ColorBlending>
                </Surface>
                <View style={s.row}>
                    {profiles.map((profile, index) => {
                        return (
                            <ColorButton
                                key={index}
                                color={getDisplayColor(profile)}
                                isSelected={activeProfile === index}
                                callback={() => this.setState({
                                  activeProfile: index,
                                  currentDisplayColor: profiles[index]
                                })}
                            />
                        )
                    })}
                </View>
                <View>
                    {activeProfileColor.map((value, index) => (
                        <View style={s.colorComponent} key={index}>
                            <Text
                                style={s.label}
                            >
                                {colorComponents[index].toUpperCase()} {round(activeProfileColor[index])}
                            </Text>
                            <Slider
                                style={s.slider}
                                maximumValue={1}
                                onSlidingComplete={value => {
                                    const newColor = [...activeProfileColor];
                                    newColor[index] = value;
                                    const newProfiles = [...profiles];
                                    newProfiles[activeProfile] = newColor;
                                    this.setState({ profiles: newProfiles })
                                }}
                                onValueChange={value => {
                                  const newColor = [...currentDisplayColor];
                                  newColor[index] = value;
                                  this.setState({ currentDisplayColor: newColor })
                                }}
                                value={activeProfileColor[index]}
                            />
                        </View>
                    ))}
                </View>
                <Picker
                    selectedValue={blendMode}
                    onValueChange={blendMode => this.setState({ blendMode })}
                >
                    {blendNames.map((mode, index) => (
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
    surface: {
        width: WINDOW_WIDTH,
        height: 300
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
        height: 50,
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
