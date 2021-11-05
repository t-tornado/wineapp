import React from 'react';
import {Image, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp} from '../../../Config/Dimensions';
import {logoURL} from '../../../Config/WineAppConfig';

const AuthPagesLogoBar: React.FC = () => {
  /**
   * @description
   * The logo must be put inside a view with static height and width
   */

  return (
    <View style={styles.logoBar}>
      <Image source={logoURL} style={styles.logoImage} />
    </View>
  );
};

const styles = EStyleSheet.create({
  logoBar: {
    height: heightDp('10'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoImage: {
    height: '90%',
    width: '40%',
    borderRadius: '7rem',
    resizeMode: 'cover',
  },
});

export {AuthPagesLogoBar};
