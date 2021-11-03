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
import {WineObject} from '../../Config/CloudData';

const ICON_S = heightDp('2%');
const CIRCLE_S = heightDp('1%');
const HEIGHT = heightDp('100');
const WIDTH = widthDp('100%');
const artwork = require('../../wineBottle.png');

interface WinepageRouteprops {
  route: {
    key: string;
    params: {
      wineObject: WineObject;
    };
  };
  navigation: {};
}

const WinePage: React.FC<WinepageRouteprops> = props => {
  const {wine, winery, rating, location, image} = props.route.params.wineObject;
  const {average, reviews} = rating;
  const full_location: string =
    typeof location === 'string' ? location.match(/\b(\w+)/g)?.join(' ') : '';

  function handlePress() {
    props.navigation.goBack();
  }

  return (
    <ScrollView style={[styles.container]} stickyHeaderIndices={[1]}>
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
            <Text numberOfLines={2} style={styles.wineText}>
              {wine}
            </Text>
            <Text numberOfLines={1} style={styles.wineryText}>
              {winery}
            </Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
        <View style={styles.details}>
          <View style={styles.reviewContainer}>
            <FontAwesome color="#000" name="circle" size={CIRCLE_S} />
            <Text style={styles.reviewText}>{reviews} reviews</Text>
          </View>
          <View style={styles.detailsWithIcons}>
            <RatingsCard rating={average} />
            <LocationCard location={full_location} />
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
    height: '85%',
    width: '50%',
    resizeMode: 'contain',
    borderRadius: '10rem',
    // backgroundColor: 'red',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '25rem',
  },
  reviewText: {
    color: '#000',
    fontSize: '13rem',
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
    textAlign: 'center',
    paddingHorizontal: '5rem',
  },
  wineText: {
    color: '#000',
    fontSize: '20rem',
    textAlign: 'center',
    paddingHorizontal: '5rem',
  },
});

export {WinePage};
