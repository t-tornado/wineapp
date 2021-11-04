import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const AddToCellarButton: React.FC = () => {
  return (
    <View style={styles.addButtonContainer}>
      <Text style={styles.addButtonText}>Add to cellar</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  addButtonText: {
    color: '#fff',
    fontSize: '12rem',
  },
  addButtonContainer: {
    width: '40%',
    height: '40%',
    borderRadius: '20rem',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export {AddToCellarButton};
