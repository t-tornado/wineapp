import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-spinkit';
import {heightDp, SPINNER_S, widthDp} from '../../../Config/Dimensions';

const screen_h = heightDp('100');
const screen_w = widthDp('100');

const ResetPasswordLoadingScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Spinner color="#fff" type="ChasingDots" size={SPINNER_S} />
        <Text>Resetting Password</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  popupBody: {
    height: heightDp('40'),
    width: '100%',
    backgroundColor: 'red',
  },
  header: {
    height: heightDp('20'),
    widt: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  screen: {
    height: screen_h,
    width: screen_w,
    backgroundColor: '#00000090',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {ResetPasswordLoadingScreen};
