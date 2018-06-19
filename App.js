import React from 'react';
import {
  View, Text, Animated, StyleSheet, Image
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <Animated.View style={{ flex: 1, backgroundColor: 'white' }}>
        <Animated.View style={{ position: 'absolute', left: 0, right: 0, backgroundColor: 'mediumseagreen' }} />
      </Animated.View>
    );
  }
}
