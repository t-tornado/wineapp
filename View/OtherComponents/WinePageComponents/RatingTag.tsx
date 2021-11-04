import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {WinePageColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const icon_s = heightDp('3%');
const HEIGHT = heightDp('17%');
const WIDTH = widthDp('25');

interface WinePageRatingTagProps {
  rating: string;
}

const RatingTag: React.FC<WinePageRatingTagProps> = props => {
  const {rating} = props;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AntDesign name="star" color={WinePageColors.ratingTag} size={icon_s} />
      </View>
      <Text style={styles.labelText}>Rating</Text>
      <Text style={styles.dataText}>{rating}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    // bottom: '20rem',
  },
  dataText: {
    fontSize: '18rem',
    color: '#000',
    marginTop: '3rem',
  },
  iconContainer: {
    borderRadius: '5rem',
    width: '40rem',
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${WinePageColors.ratingTag}80`,
  },
  labelText: {
    color: WinePageColors.ratingTag,
    marginTop: '3rem',
    fontSize: '13rem',
  },
});

export {RatingTag};
