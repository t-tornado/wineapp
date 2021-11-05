import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const AddToCellarButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.addButtonContainer}>
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
