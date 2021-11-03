import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {heightDp, widthDp} from '../../Config/Dimensions';
import {AppTestIDs} from '../../Config/TestIDs';
import {WineCardProps, WineObject} from '../../Config/CloudData';
const CARD_H = heightDp('13%');
const CARD_W = widthDp('100%');
const STAR_ICON_SIZE = heightDp('2 %');
const LOCATION_ICON_S = heightDp('2 %');

const ItemCard: React.FC<WineCardProps> = ({wineObject, navigationProps}) => {
  const {winery, wine, rating, location, image} = wineObject;
  const {average} = rating;
  const full_location = location.match(/\b(\w+)/g)?.join(' ');

  function handlePress() {
    navigationProps.navigation.navigate('WinePage', {wineObject});
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      testID={AppTestIDs.wineCard}
      style={styles.container}>
      <View style={styles.cover}>
        <Image
          source={{uri: image}}
          // source={require('../../wineBottle.png')}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.headerDetails}>
          <Text style={styles.wineryText}>
            {winery !== undefined ? winery : 'Winery'}
          </Text>
          <Text style={styles.wineText}>
            {wine !== undefined ? wine : 'Wine'}
          </Text>
        </View>
        <View style={styles.subDetails}>
          <View style={styles.ratingsContainer}>
            <SimpleLineIcons
              name="star"
              size={STAR_ICON_SIZE}
              color="#00000090"
              style={styles.icon}
            />
            <Text>{average !== undefined ? average : '0.0'} </Text>
          </View>
          <View style={styles.locationContainer}>
            <Entypo
              name="location"
              color="#00000090"
              size={LOCATION_ICON_S}
              style={styles.icon}
            />
            <Text style={styles.locationText}>{full_location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: CARD_H,
    width: CARD_W,
    flexDirection: 'row',
    backgroundColor: '#00000030',
    alignItems: 'center',
    paddingHorizontal: '10rem',
    marginBottom: '20rem',
  },

  cover: {
    flex: 1,
    borderRadius: '10rem',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  details: {
    flex: 4,
    paddingHorizontal: '20rem',
    paddingVertical: '10rem',
  },
  headerDetails: {
    flex: 3,
  },
  headerImage: {
    height: CARD_H * 0.7,
    width: CARD_W * 0.12,
    resizeMode: 'center',
    borderRadius: '10rem',
  },
  icon: {
    marginRight: '10rem',
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  locationText: {
    color: '#000000',
    fontSize: '12.5rem',
  },
  ratingsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  subDetails: {
    flex: 1,
    flexDirection: 'row',
  },
  wineText: {
    color: '#000',
    fontSize: '14rem',
  },
  wineryText: {
    color: '#00000080',
    fontSize: '11.5rem',
  },
});

export default React.memo(ItemCard);
