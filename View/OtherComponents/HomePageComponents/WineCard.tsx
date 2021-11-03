import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {WineCardProps} from '../../../Config/CloudData';
import {WineCardColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const HEIGHT = heightDp('25%');
const WIDTH = widthDp('43');
const ICON_S = heightDp('2.5%');
const artwork = require('../../../wineBottle.png');

const WineCard: React.FC<WineCardProps> = props => {
  const {wineObject} = props;
  const {image, wine, winery} = wineObject;

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <View style={styles.imageDetails}>
        <Image style={styles.coverImage} source={{uri: image}} />
      </View>
      <View style={styles.bottomDetails}>
        <View style={[styles.textDetails]}>
          <Text style={styles.wineText}>{wine}</Text>
        </View>
        <View style={styles.iconDetails}>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon}>
              <Entypo
                name="heart"
                color={WineCardColors.likeIcon}
                size={ICON_S}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  bottomDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContext: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: '15rem',
    padding: '10rem',
    margin: '10rem',
  },
  coverImage: {
    height: '90%',
    width: '65%',
    resizeMode: 'contain',
    borderRadius: '10rem',
  },
  icon: {
    height: '100%',
    width: '100%',
    backgroundColor: WineCardColors.likeIconBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15rem',
  },
  iconDetails: {
    flex: 1,
  },
  imageDetails: {
    height: '75%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textDetails: {
    flex: 3,
    paddingRight: '5rem',
  },
  wineryText: {
    color: '#000',
    fontSize: '1rem',
  },
  wineText: {
    color: '#000',
    fontSize: '11rem',
    fontWeight: 'bold',
  },
});

export default React.memo(WineCard);

/**
 *  <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <Entypo
              name="heart"
              color={WineCardColors.likeIcon}
              size={ICON_S}
            />
          </TouchableOpacity>
        </View>
 */
