import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import Spinner from 'react-native-spinkit';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');
const SPINNER_S = heightDp('8');

interface CompoProps {
  isVisible: boolean;
}

const RemovingItemLoadingScreen: React.FC<CompoProps> = props => {
  const {isVisible} = props;
  return (
    <View style={styles.container}>
      <Spinner
        type="ChasingDots"
        color="#fff"
        size={SPINNER_S}
        isVisible={isVisible}
      />
      <Text style={styles.text}>Please wait . . .</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    backgroundColor: '#00000080',
    paddingVertical: heightDp('10'),
  },
  text: {
    color: '#fff',
    fontSize: '25rem',
  },
});

export {RemovingItemLoadingScreen};
