import {Dimensions, PixelRatio} from 'react-native';

const {height, width} = Dimensions.get('window');

export function heightDp(heightPercent) {
  const elementHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elementHeight) / 100);
}

export function widthDp(widthPercent) {
  const elementHeight = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elementHeight) / 100);
}

export const NAVBAR_HEGIHT = heightDp('9%');
export const SPINNER_S = heightDp('6');
