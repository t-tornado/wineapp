import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {HomeScreenColors} from '../../../Config/Colors';
import {SearchBoxComponent} from './SearchBar';
import {useSearchKeyword} from '../../../Interactor/ComponentInteractors/MainAppInteractor.';

const HEIGHT = heightDp('10%');
const WIDTH = widthDp('100');
const artwork = require('../../../logo.jpeg');
const ICON_S = heightDp('4%');

const HeaderMenu: React.FC = () => {
  const [searchActive, setSetActiveState] = useState<boolean>(false);
  const setSearchWord: Function = useSearchKeyword().setFunction;

  function handleCloseSearchBar() {
    setSetActiveState(false);
    setSearchWord('');
  }
  function handleOpenSearchBar() {
    setSetActiveState(true);
  }

  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: searchActive ? 0 : heightDp('3')},
      ]}>
      {searchActive ? (
        <View style={styles.searchContainer}>
          <SearchBoxComponent />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleCloseSearchBar}
            style={styles.cancelButton}>
            <Text style={styles.cancelText}>cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Image source={artwork} style={styles.logo} />
          <View style={styles.actionButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleOpenSearchBar}
              style={styles.iconContainer}>
              <EvilIcons size={ICON_S} color="#000" name="search" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconContainer}>
              <Entypo size={ICON_S} color="#FFD36B" name="drop" />
            </TouchableOpacity> */}
          </View>
        </>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.25,
  },
  cancelButton: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#000',
    fontSize: '13rem',
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '90%',
    width: '20%',
    resizeMode: 'cover',
    borderRadius: '10rem',
  },
  searchContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: '10rem',
  },
});

export {HeaderMenu};
