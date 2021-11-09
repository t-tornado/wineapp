import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {POPUP_H, POPUP_TRANSLATE_Y, POPUP_W} from '../../../Config/Dimensions';

const ItemRemoved = () => {
  return (
    <View
      style={[
        styles.container,
        {transform: [{translateY: POPUP_TRANSLATE_Y}]},
      ]}>
      <View style={styles.popup}>
        <Text style={styles.text}>Wine removed from favorites</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: POPUP_H,
    width: POPUP_W,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  popup: {
    backgroundColor: '#141E61',
    width: '90%',
    height: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30rem',
  },
  text: {
    color: '#fff',
    fontSize: '14rem',
  },
});

export {ItemRemoved};
