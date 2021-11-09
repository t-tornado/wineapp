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
import {WineObject} from '../../Config/CloudData';
import {LocationTag} from '../OtherComponents/WinePageComponents/LocationTag';
import {ReviewTag} from '../OtherComponents/WinePageComponents/ReviewsTag';
import {RatingTag} from '../OtherComponents/WinePageComponents/RatingTag';
import {
  useItemRemoved,
  useRemoveFromLikedItems,
} from '../../Interactor/ComponentInteractors/MainAppInteractor.';
import {useUser} from '../../Interactor/WebInteractor/AuthInteractor';
import {useEffect} from 'react';

const ICON_S = heightDp('2%');
const HEIGHT = heightDp('100');
const WIDTH = widthDp('100%');

interface CellarWinepageRouteprops {
  route: {
    key: string;
    params: {
      wineObject: WineObject;
    };
  };
  navigation: {};
}

const CellarWinePage: React.FC<CellarWinepageRouteprops> = props => {
  const removeFromLiked = useRemoveFromLikedItems();
  const [wineItemRemoved, setWineItemRemoved] = useItemRemoved();
  const userEmail = useUser().value.email;
  const {wineObject} = props.route.params;
  const {wine, winery, rating, location, image} = wineObject;
  const {average, reviews} = rating;
  const _location: string =
    typeof location === 'string' ? location.match(/\b(\w+)/g).join(', ') : '';

  function handleToBackButton() {
    props.navigation.goBack();
  }

  function handleRemoveAction() {
    removeFromLiked(userEmail, wineObject);
  }

  console.log(wineItemRemoved);

  useEffect(() => {
    setWineItemRemoved(false);
  }, []);

  useEffect(() => {
    wineItemRemoved && handleToBackButton();
  }, [wineItemRemoved]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      stickyHeaderIndices={[0]}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={handleToBackButton}
          style={styles.iconContainer}>
          <SimpleLineIcons name="arrow-left" size={ICON_S} color="#000" />
          <Text style={styles.backButtonText}>Cellar</Text>
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
      </View>

      <View style={styles.textDetailsContainer}>
        <Text style={[styles.wineText]}>{wine}</Text>
        <Text style={styles.wineryText}>{winery}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleRemoveAction}
          style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Remove from cellar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  backButtonText: {
    color: '#000',
    fontSize: '15rem',
    fontWeight: 'bold',
  },
  body: {
    height: heightDp('60%'),
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: '40rem',
    paddingBottom: '30rem',
  },
  bodyBottomContainer: {
    height: heightDp('15'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    bachgroundColor: '#000',
    height: '10rem',
  },
  container: {
    width: WIDTH,
    flex: 1,
    backgroundColor: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    borderRadius: '13rem',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: '16rem',
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
    paddingHorizontal: '20rem',
    height: heightDp('30'),
    marginBottom: heightDp('10'),
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
    paddingVertical: '7rem',
    paddingLeft: '10rem',
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
  textDetailsContainer: {
    height: '20%',
    width: '100%',
    paddingHorizontal: '20rem',
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

export {CellarWinePage};
