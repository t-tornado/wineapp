import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface buttonProps {
  onPress: Function;
}

const AddToCellarButton: React.FC<buttonProps> = props => {
  const {onPress} = props;
  function handleOnPress() {
    onPress();
  }

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.85}
      style={styles.addButtonContainer}>
      <Text style={styles.addButtonText}>Add to cellar</Text>
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
