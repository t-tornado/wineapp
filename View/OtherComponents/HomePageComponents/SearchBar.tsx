import React from 'react';
import {View, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const HEIGHT = heightDp('10');
const WIDTH = widthDp('90%');
const ICON_S = heightDp('3');

const SearchBoxComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <EvilIcons size={ICON_S} color="#fff" name="search" />
        <TextInput
          placeholderTextColor="#fff"
          placeholder="Search Your Wine"
          style={styles.textInputBox}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // positioin: 'absolute',
    // backgroundColor: 'blue',
  },
  searchBar: {
    height: '65%',
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: '20rem',
  },
  textInputBox: {
    height: '90%',
    width: '90%',
    paddingVertical: '5rem',
  },
});

export {SearchBoxComponent};
