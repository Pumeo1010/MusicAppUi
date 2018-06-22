import { Dimensions } from 'react-native';

const IPHONE_8_DEVICE_WIDTH = 414;

export default class ScaleUtility {
  static getSize(size) {
    return (size * Dimensions.get('window').width) / IPHONE_8_DEVICE_WIDTH;
  }
}
