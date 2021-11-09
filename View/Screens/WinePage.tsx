import React, {useEffect, useRef} from 'react';
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
import {WineObject} from '../../Config/CloudData';
import {LocationTag} from '../OtherComponents/WinePageComponents/LocationTag';
import {ReviewTag} from '../OtherComponents/WinePageComponents/ReviewsTag';
import {RatingTag} from '../OtherComponents/WinePageComponents/RatingTag';
import {AddToCellarButton} from '../OtherComponents/WinePageComponents/AddToCellarButton';
import {useUser} from '../../Interactor/WebInteractor/AuthInteractor';
import {
  useAddToLikedItems,
  useItemAddedToLike,
  useItemAlreadyLiked,
} from '../../Interactor/ComponentInteractors/MainAppInteractor.';
import {ItemAlreadyLikedPopup} from '../OtherComponents/Popups/ItemAlreadyLiked';
import {ItemLiked} from '../OtherComponents/Popups/ItemLiked';

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
  const [itemAlreadyLiked, setItemAlreadyLiked] = useItemAlreadyLiked();
  const [itemAddedToLike, setItemAddedToLike] = useItemAddedToLike();
  const user = useUser().value;
  const addToLikedFn = useAddToLikedItems();
  const {wineObject} = props.route.params;
  const {wine, winery, rating, location, image} = wineObject;
  const {average, reviews} = rating;
  const _location: string =
    typeof location === 'string' ? location.match(/\b(\w+)/g).join(' ') : '';

  function handlePress() {
    props.navigation.goBack();
  }

  function handleAddTolike() {
    addToLikedFn(user.email, wineObject);
  }

  const alreadyLikedTimer = () =>
    setTimeout(() => {
      setItemAlreadyLiked(false);
    }, 3000);

  const itemLikedTimer = () =>
    setTimeout(() => {
      setItemAddedToLike(false);
    }, 2000);

  useEffect(() => {
    setItemAddedToLike(false);
  }, []);

  useEffect(() => {
    itemAlreadyLiked && alreadyLikedTimer();

    return () => clearTimeout(alreadyLikedTimer());
  }, [itemAlreadyLiked]);

  useEffect(() => {
    itemAddedToLike && itemLikedTimer();

    return () => clearTimeout(itemLikedTimer());
  }, [itemAddedToLike]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        stickyHeaderIndices={[0]}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
            <SimpleLineIcons name="arrow-left" size={ICON_S} color="#000" />
            <Text style={styles.backButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.imageContainer}>
            <View style={[styles.imageShadowWrapper]}>
              <Image source={{uri: image}} style={[styles.image]} />
            </View>
          </View>
          <LocationTag location={_location} />
          <ReviewTag reviews={reviews} />
          <RatingTag rating={average} />
          <View style={styles.bodyBottomContainer}>
            <AddToCellarButton onPress={handleAddTolike} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.wineText]}>{wine}</Text>
          <Text style={styles.wineryText}>{winery}</Text>
        </View>
      </ScrollView>
      {itemAlreadyLiked ? <ItemAlreadyLikedPopup /> : null}
      {itemAddedToLike ? <ItemLiked /> : null}
    </>
  );
};

const styles = EStyleSheet.create({
  backButtonText: {
    color: '#000',
    fontSize: '15rem',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: '30rem',
  },
  bodyBottomContainer: {
    height: heightDp('15'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  circle: {
    bachgroundColor: '#000',
    height: '10rem',
  },
  container: {
    width: WIDTH,
    flex: 1,
    // paddingHorizontal: '20rem',
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
  footer: {
    height: heightDp('30'),
    marginBottom: heightDp('10'),
    paddingHorizontal: '10rem',
  },

  iconContainer: {
    flexDirection: 'row',
    height: '80%',
    width: '18%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: heightDp('35'),
    width: widthDp('30%'),
    resizeMode: 'contain',
    borderRadius: '10rem',
  },
  imageContainer: {
    height: heightDp('70'),
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    paddingRight: '20rem',
  },
  imageShadowWrapper: {
    height: heightDp('37'),
    width: widthDp('30%'),
    elevation: 30,
    borderRadius: '60rem',
  },
  navbar: {
    height: heightDp('7%'),
    width: '100%',
    paddingVertical: '10rem',
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    color: '#000',
    fontSize: '20rem',
    paddingHorizontal: '5rem',
    fontFamily: 'Roboto',
  },
  wineText: {
    color: '#000',
    fontSize: '27rem',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed',
  },
});

export {WinePage};
