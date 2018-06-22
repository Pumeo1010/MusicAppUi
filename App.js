import React from 'react';
import {
  View, Image, PanResponder, Animated, Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const playingBarMinHeight = screenHeight - 90;
const playingBarMaxHeight = -screenHeight + 120;

export default class MusicAppUi extends React.Component {
  state = {
    isScrollEnabled: false
  }

  componentWillMount() {
    this.animation = new Animated.ValueXY({ x: 0, y: playingBarMinHeight });

    this.scrollOffset = 0;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if ((this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) ||
          (!this.state.isScrollEnabled && gestureState.dy < 0)) {
          return true;
        }
        return false;
      },

      onPanResponderGrant: () => {
        this.animation.extractOffset();
      },

      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true });

          Animated.spring(this.animation.y, {
            toValue: playingBarMaxHeight,
            tension: 1
          }).start();
        } else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false });

          Animated.spring(this.animation.y, {
            toValue: playingBarMinHeight - 30,
            tension: 1
          }).start();
        } else if (gestureState.moveY < playingBarMaxHeight) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        } else if (gestureState.moveY > playingBarMinHeight - 30) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start();
        }
      }
    });
  }

  render() {
    const playingBar = {
      transform: this.animation.getTranslateTransform()
    };

    const imageAnimation = this.animation.y.interpolate({
      inputRange: [0, playingBarMinHeight],
      outputRange: [220, 35]
    });

    const imageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, playingBarMinHeight],
      outputRange: [screenWidth / 2 - 110, 0]
    });

    const textAnimation = this.animation.y.interpolate({
      inputRange: [0, playingBarMinHeight],
      outputRange: [0, 1]
    });

    const playingBarHeader = this.animation.y.interpolate({
      inputRange: [0, playingBarMinHeight],
      outputRange: [screenHeight / 2, 90]
    });

    return (
      <Animated.View
        style={{ flex: 1, backgroundColor: 'pink' }}
      >
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[playingBar,
            {
              position: 'absolute',
              height: screenHeight,
              left: 0,
              right: 0,
              backgroundColor: 'white'
            }]}
        >
          <Animated.View style={{
            borderTopWidth: 1,
            borderTopColor: 'lightpink',
            flexDirection: 'row',
            height: playingBarHeader
          }}
          >
            <View style={{ flex: 4, marginLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Animated.View style={{ height: imageAnimation, width: imageAnimation, marginLeft: imageMarginLeft }}>
                <Image
                  style={{ flex: 1, width: null, height: null }}
                  source={require('./images/lucifer-album.jpg')}
                />
              </Animated.View>
              <Animated.Text style={{ padding: 10, opacity: textAnimation }}>Lucifer - SHINee</Animated.Text>
            </View>
          </Animated.View>

        </Animated.View>
      </Animated.View>
    );
  }
}
