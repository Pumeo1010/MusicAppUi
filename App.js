import React from 'react';
import {
  View, Animated, Image, Dimensions, PanResponder
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
  componentWillMount() {
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 80 });

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (e, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 10
          }).start();
        } else if (gestureState.dy > 0) {
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 130,
            tension: 10
          }).start();
        }
      }
    });
  }
  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    };

    const expandImage = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [210, 35],
      extrapolate: 'clamp'
    });

    const animatedSongNameOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });

    const animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH / 2 - 100, 20],
      extrapolate: 'clamp'
    });

    const animatedTop = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT / 2, 90],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View style={{ flex: 1, backgroundColor: 'white' }}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[
            animatedHeight,
            {
              position: 'absolute',
              left: 0,
              right: 0,
              zIndex: 10,
              backgroundColor: 'white',
              height: SCREEN_HEIGHT
            }]}
        >
          <Animated.View
            style={{
              height: animatedTop,
              borderTopWidth: 1,
              borderTopColor: '#ede3e3',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <View style={{
              flex: 4,
              flexDirection: 'row',
              alignItems: 'center'
            }}
            >
              <Animated.View style={{ width: expandImage, height: expandImage, marginLeft: animatedImageMarginLeft }}>
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  source={require('./images/lucifer-album.jpg')}
                />
              </Animated.View>
              <Animated.Text style={{ padding: 20, fontSize: 18, opacity: animatedSongNameOpacity }}>Lucifer - SHINee</Animated.Text>
            </View>
            <Animated.View style={{
              flex: 2,
              flexDirection: 'row',
              opacity: animatedSongNameOpacity,
              justifyContent: 'space-around',
              marginRight: 20
            }}
            >
              <Icon name='md-play' size={35} />
              <Icon name='md-pause' size={35} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }
}
