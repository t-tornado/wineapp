import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  useLikedItems,
  useRecentlyLikedWine,
} from '../../../Interactor/ComponentInteractors/MainAppInteractor';

interface buttonProps {
  onPress: Function;
  wineId: number;
}

const AddToCellarButton: React.FC<buttonProps> = props => {
  const [liked, setLiked] = useState(false);
  const likedWines = useLikedItems();
  const recentlyLikedWine = useRecentlyLikedWine();
  const {onPress, wineId} = props;
  function handleOnPress() {
    !liked && onPress();
  }

  useEffect(() => {
    let clean = true;
    if (
      recentlyLikedWine === wineId ||
      likedWines.some(item => item.id === wineId)
    ) {
      clean && setLiked(true);
    } else {
      clean && setLiked(false);
    }

    return () => {
      clean = false;
    };
  }, [recentlyLikedWine]);

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={!liked ? 0.85 : 1}
      style={styles.addButtonContainer}>
      <Text style={styles.addButtonText}>
        {!liked ? 'Add to cellar' : 'Added to Cellar'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  addButtonText: {
    color: '#fff',
    fontSize: '12rem',
  },
  addButtonContainer: {
    width: '100%',
    height: '40%',
    borderRadius: '25rem',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#51050F',
  },
});

export {AddToCellarButton};
