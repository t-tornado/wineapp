import React, {useRef} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, NAVBAR_HEGIHT, widthDp} from '../../Config/Dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RatingsCard} from '../OtherComponents/RatingsCard';
import {LocationCard} from '../OtherComponents/LocationCard';

const ICON_S = heightDp('2%');
const CIRCLE_S = heightDp('1%');
const HEIGHT = heightDp('100');
const WIDTH = widthDp('100%');
const artwork = require('../../wineBottle.png');

const WinePage: React.FC = props => {
  const {wine, winery, reviews} = props;

  function handlePress() {
    props.navigation.goBack();
  }

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topIconContainer}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.iconContainer}>
              <SimpleLineIcons name="arrow-left" size={ICON_S} color="#000" />
              <Text style={styles.backButtonText}>Home</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={styles.wineText}>
              {wine !== undefined ? wine : 'Winery'}
            </Text>
            <Text numberOfLines={1} style={styles.wineryText}>
              {winery !== undefined ? winery : 'Winery'}
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={artwork} style={styles.image} />
        </View>
        <View style={styles.details}>
          <View style={styles.reviewContainer}>
            <FontAwesome color="#000" name="circle" size={CIRCLE_S} />
            <Text style={styles.reviewText}>
              {reviews !== undefined ? reviews : 0} reviews
            </Text>
          </View>
          <View style={styles.detailsWithIcons}>
            <RatingsCard rating={'4.5'} />
            <LocationCard location="Ohio" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  backButtonText: {
    color: '#000',
    fontSize: '15rem',
  },
  circle: {
    bachgroundColor: '#000',
    height: '10rem',
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#fff',
  },
  details: {
    flex: 1,
  },
  detailsWithIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    height: '20%',
    width: '100%',
    paddingVertical: '10rem',
  },
  iconContainer: {
    flexDirection: 'row',
    height: '80%',
    width: '18%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: '90%',
    width: '60%',
    resizeMode: 'cover',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '25rem',
  },
  reviewText: {
    color: '#000',
    fontSize: '16rem',
    marginHorizontal: '5rem',
  },
  scrollView: {
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: '20rem',
  },
  topIconContainer: {
    height: '40%',
    width: '100%',
    paddingHorizontal: '10rem',
  },

  wineryText: {
    color: '#00000090',
    fontSize: '15rem',
  },
  wineText: {
    color: '#000',
    fontSize: '25rem',
  },
});

export {WinePage};
