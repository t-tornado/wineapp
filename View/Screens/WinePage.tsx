import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../Config/Dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {WinePageScreenProps} from '../../Config/KWinefoDataTypes';
import {LocationTag} from '../OtherComponents/WinePageComponents/LocationTag';
import {ReviewTag} from '../OtherComponents/WinePageComponents/ReviewsTag';
import {RatingTag} from '../OtherComponents/WinePageComponents/RatingTag';
import {AddToCellarButton} from '../OtherComponents/WinePageComponents/AddToCellarButton';
import {useUser} from '../../Interactor/WebInteractor/AuthInteractor';
import {
  useAddToLikedItems,
  useItemAlreadyLiked,
  useLikedWines,
  useLikeSuccessPopup,
  useRecentlyLikedWine,
} from '../../Interactor/ComponentInteractors/MainAppInteractor';
import {ItemAlreadyLikedPopup} from '../OtherComponents/Popups/ItemAlreadyLiked';
import {ItemLiked} from '../OtherComponents/Popups/ItemLiked';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

const ICON_S = heightDp('2%');
const WIDTH = widthDp('100%');

const WinePage: React.FC<WinePageScreenProps> = props => {
  const showLikeSuccessPopup = useLikeSuccessPopup();
  const [wineLiked, setWineLiked] = useState<boolean>(false);
  const recentlyLikedWine = useRecentlyLikedWine();
  const likedWines = useLikedWines();
  const [itemAlreadyLiked, setItemAlreadyLiked] = useItemAlreadyLiked();
  const user = useUser().value as FirebaseAuthTypes.User;
  const addToLikedFn = useAddToLikedItems();
  const {wineObject} = props.route.params;
  const {wine, winery, rating, location, image, id} = wineObject;
  const {average, reviews} = rating;
  const _location: string = (loc => {
    const split_location = loc.match(/\b(\w+)/g);
    return split_location!.join(' ');
  })(location);

  function handlePress() {
    props.navigation.goBack();
  }

  function handleAddTolike() {
    addToLikedFn(user.email, wineObject);
  }

  useEffect(() => {
    // let clean = true;
    // if (recentlyLikedWine === id || likedWines.some(item => item.id === id)) {
    //   clean && setWineLiked(true);
    // } else {
    //   clean && setWineLiked(false);
    // }
    // return () => {
    //   clean = false;
    // };
  }, [recentlyLikedWine]);

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
            <AddToCellarButton onPress={handleAddTolike} wineId={id} />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.wineText]}>{wine}</Text>
          <Text style={styles.wineryText}>{winery}</Text>
        </View>
      </ScrollView>
      <ItemAlreadyLikedPopup
        setVisible={setItemAlreadyLiked}
        visible={itemAlreadyLiked}
      />
      <ItemLiked
        setVisible={showLikeSuccessPopup.setFunction}
        visible={showLikeSuccessPopup.value}
      />
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
