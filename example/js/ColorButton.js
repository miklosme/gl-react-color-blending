import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

function ColorButton({ color, callback, isSelected }) {
  return (
    <TouchableHighlight
      style={s.root}
      onPress={event => callback(event)}
    >
      <View style={[s.button, isSelected ? s.selected : null, { backgroundColor: color }]}/>
    </TouchableHighlight>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    flex: 1,
    height: 50
  },
  selected: {
    // TODO: something
  }
});


export default ColorButton;
