import React from 'react';
import {Image, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';

const HEIGHT = heightDp('10%');
const WIDTH = widthDp('90');
const artwork = require('../../../logo.jpeg');
const ICON_S = heightDp('5%');

const HeaderMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={artwork} style={styles.logo} />
      <View>
        <Entypo size={ICON_S} color="red" name="heart" />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: '90%',
    width: '20%',
    resizeMode: 'cover',
    borderRadius: '10rem',
  },
});

export {HeaderMenu};
