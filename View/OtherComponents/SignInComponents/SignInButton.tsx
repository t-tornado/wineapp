import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SignInScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const HEIGHT = heightDp('6%');
const WIDTH = widthDp('80');

const SignInButton: React.FC = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <Text style={styles.text}>sign in</Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SignInScreenColors.signInButtonColor,
    borderRadius: '20rem',
  },
  text: {
    color: '#fff',
    fontSize: '11rem',
  },
});

export {SignInButton};
