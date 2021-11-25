import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const icon_s = heightDp('3%');
const HEIGHT = heightDp('17%');
const WIDTH = widthDp('40');

interface WinePageLocationTagProps {
  location: string;
}

const LocationTag: React.FC<WinePageLocationTagProps> = props => {
  const {location} = props;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Entypo name="location-pin" color="#14279B" size={icon_s} />
      </View>
      <Text style={styles.labelText}>Location</Text>
      <Text style={styles.dataText}>{location}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // bottom: '20rem',
  },
  dataText: {
    fontSize: '16rem',
    color: '#000',
    marginTop: '3rem',
  },
  iconContainer: {
    borderRadius: '5rem',
    width: '40rem',
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: `${WinePageColors.locationTag}80`,
    backgroundColor: '#14279B60',
  },
  labelText: {
    color: '#14279B',
    marginTop: '3rem',
    fontSize: '13rem',
  },
});

export {LocationTag};
