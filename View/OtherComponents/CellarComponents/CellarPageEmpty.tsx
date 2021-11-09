import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome5';

const icon_s = heightDp('6');
const HEIGHT = heightDp('50%');
const WIDTH = widthDp('100%');

const CellarPageEmpty: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="wine-bottle"
        size={icon_s}
        color={SplashScreenColors.backgroundColor}
      />
      <Text style={styles.text}>Your Cellar is empty</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: SplashScreenColors.backgroundColor,
    fontSize: '20rem',
  },
});

export {CellarPageEmpty};
