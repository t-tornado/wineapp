import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {WineCardProps} from '../../../Config/KWinefoDataTypes';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const HEIGHT = heightDp('25');
const WIDTH = widthDp('100%');
const icon_s = heightDp('3%');

const CellarWineCard: React.FC<WineCardProps> = props => {
  const {wineObject, navigationProps} = props;
  const {image, wine, winery} = wineObject;

  function handleNavigate() {
    navigationProps.navigation.navigate('CellarWinePage', {wineObject});
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleNavigate}
      style={styles.container}>
      <View style={styles.coverImageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      </View>
      <View style={styles.textDetailsContainer}>
        <Text style={styles.wineText}>
          {wine
            ? wine
            : 'Wine apsindf aspodf pasojdfp oasp ojp o aposf aospfpo safp '}
        </Text>
        <Text style={styles.wineryText}>{winery ? winery : 'Winery'}</Text>
      </View>
      <View style={styles.cardRightIcon}>
        <SimpleLineIcons name="arrow-right" color="#000" size={icon_s} />
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  cardRightIcon: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    backgroundColor: '#FAEEE0',
    alignItems: 'center',
    paddingHorizontal: '15rem',
  },
  coverImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: '30rem',
  },
  imageWrapper: {
    height: '70%',
    width: '60%',
    elevation: 50,
    borderRadius: '60rem',
  },
  textDetailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wineText: {
    color: '#000',
    fontSize: '20rem',
    fontWeight: 'bold',
    paddingVertical: '10rem',
  },
  wineryText: {
    color: '#000',
    fontSize: '13rem',
  },
});

export {CellarWineCard};
