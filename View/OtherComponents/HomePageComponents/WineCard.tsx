import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {WineCardProps} from '../../../Config/KWinefoDataTypes';
import {WineCardColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {
  useAddToLikedItems,
  useLikedWines,
  useRecentlyLikedWine,
} from '../../../Interactor/ComponentInteractors/MainAppInteractor';
import {useUser} from '../../../Interactor/WebInteractor/AuthInteractor';

const HEIGHT = heightDp('25%');
const WIDTH = widthDp('43');
const ICON_S = heightDp('3%');

const WineCard: React.FC<WineCardProps> = props => {
  const likedWines = useLikedWines();
  const {wineObject, navigationProps, likeState} = props;
  const [liked, setLiked] = useState(likeState);
  const [likeItem, setLikeItem] = useState(false);
  const user = useUser().value;
  const addToLikedFn = useAddToLikedItems();
  const recentlyLikedWineId = useRecentlyLikedWine();
  const {image, wine, winery, id} = wineObject;

  function callNavigation() {
    navigationProps.navigation.navigate('WinePage', {
      wineObject,
      likeState: liked,
    });
  }

  function handleAddToLiked() {
    setLiked(true);
    setLikeItem(true);
  }

  useEffect(() => {
    let clean = true;
    setLikeItem(false);
    if (recentlyLikedWineId === id || likedWines.some(wine => wine.id === id)) {
      clean && setLiked(true);
    } else {
      clean && setLiked(false);
    }
    return () => {
      clean = false;
    };
  }, [recentlyLikedWineId]);

  useEffect(() => {
    (async function () {
      if (liked && likedWines.every(item => item.id !== id)) {
        await addToLikedFn(user.email, wineObject);
      }
    })();
  }, [liked]);

  useEffect(() => {
    if (likedWines.some(wine => wine.id === id)) {
      setLikeItem(true);
      setLiked(true);
    } else {
      setLikeItem(false);
      setLiked(false);
    }
  }, [likedWines]);

  // console.log(likeItem);
  return (
    <TouchableOpacity
      onPress={callNavigation}
      activeOpacity={0.9}
      style={styles.container}>
      <View style={styles.imageDetails}>
        <Image style={styles.coverImage} source={{uri: image}} />
      </View>
      <View style={styles.bottomDetails}>
        <View style={[styles.textDetails]}>
          <Text style={styles.wineText}>{wine}</Text>
        </View>
        <View style={styles.iconDetails}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: liked ? '#FF4C29' : '#fff'},
            ]}>
            <TouchableOpacity
              onPress={handleAddToLiked}
              activeOpacity={0.5}
              style={styles.icon}>
              <Entypo
                name="heart"
                color={liked ? '#fff' : '#EEBB4D'}
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
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'flex-start',
    borderRadius: '20rem',
    padding: '10rem',
    margin: '10rem',
    backgroundColor: '#B980F060',
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
  iconContainer: {
    height: '35rem',
    width: '35rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20rem',
    backgroundColor: '#fff',
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
