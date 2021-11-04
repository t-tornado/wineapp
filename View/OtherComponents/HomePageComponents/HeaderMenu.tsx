import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {HomeScreenColors} from '../../../Config/Colors';

const HEIGHT = heightDp('10%');
const WIDTH = widthDp('95');
const artwork = require('../../../logo.jpeg');
const ICON_S = heightDp('4%');

const HeaderMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={artwork} style={styles.logo} />
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <EvilIcons size={ICON_S} color="#000" name="search" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Entypo size={ICON_S} color="#FFD36B" name="drop" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.25,
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    justifyContent: 'center',
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
