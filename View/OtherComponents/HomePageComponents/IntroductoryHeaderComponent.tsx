import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const HEIGHT = heightDp('18%');
const WIDTH = widthDp('100%');

const IntroductoryHeaderComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.welcomeText}>
        {' '}
        Welcome to KWINEFO!
      </Text>
      <Text numberOfLines={2} style={styles.introductoryText}>
        Browse the largest and finest selection of Wine
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: '10rem',
  },
  introductoryText: {
    color: '#000',
    fontSize: '25rem',
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#000',
    fontSize: '15rem',
  },
});

export {IntroductoryHeaderComponent};
