import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface buttonProps {
  onPress: Function;
  likedState: boolean;
}

const AddToCellarButton: React.FC<buttonProps> = props => {
  const {onPress, likedState} = props;
  function handleOnPress() {
    !likedState && onPress();
  }

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.85}
      style={styles.addButtonContainer}>
      <Text style={styles.addButtonText}>
        {!likedState ? 'Add to cellar' : 'Added to Cellar'}
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
