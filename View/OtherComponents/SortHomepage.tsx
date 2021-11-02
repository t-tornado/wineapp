import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {heightDp, widthDp} from '../../Config/Dimensions';

const HEADER_H = heightDp('5%');
const HEADER_W = widthDp('100%');
const ICON_S = heightDp('2.5%');

const SortHomepage = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.sortButton}>
        <Text style={styles.sortText}> Sort By </Text>
        <MaterialIcons name="keyboard-arrow-down" size={ICON_S} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  header: {
    height: HEADER_H,
    width: HEADER_W,
    alignItems: 'flex-end',
    paddingHorizontal: '30rem',
  },
  sortButton: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sortText: {
    color: '#000',
    fontSize: '13rem',
    fontWeight: 'bold',
  },
});

export {SortHomepage};
