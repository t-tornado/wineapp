import React from 'react';
import {useEffect} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');

interface CompProps {
  actionFailed: boolean;
}

const SignoutLoadingScreen: React.FC<CompProps> = props => {
  const {actionFailed} = props;
  useEffect(() => {}, [props]);

  return (
    <View style={styles.screen}>
      <View style={styles.overlay} />
      <View style={styles.loaderContainer}></View>
      {!actionFailed ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Signing out . . . </Text>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.text}>failed to sign out. </Text>
          <TouchableOpacity style={styles.closeButtonContaniner}>
            <Text style={styles.closeButtonText}>close</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  closeButtonContaniner: {
    height: '30%',
    width: '40%',
    borderRadius: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: '14rem',
  },
  loaderContainer: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000070',
    position: 'absolute',
  },
  screen: {
    height: HEIGHT,
    width: WIDTH,
    position: 'absolute',
  },
  text: {
    fontSize: '20rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    height: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export {SignoutLoadingScreen};
