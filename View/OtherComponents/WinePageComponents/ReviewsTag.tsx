import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WinePageColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const icon_s = heightDp('3%');
const HEIGHT = heightDp('17%');
const WIDTH = widthDp('25');

interface WinePageReviewTagProps {
  reviews: string;
}

const ReviewTag: React.FC<WinePageReviewTagProps> = props => {
  const {reviews} = props;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="comment"
          color={WinePageColors.reviewTag}
          size={icon_s}
        />
      </View>
      <Text style={styles.labelText}>Reviews</Text>
      <Text style={styles.dataText}>{reviews}</Text>
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
    backgroundColor: `${WinePageColors.reviewTag}80`,
  },
  labelText: {
    color: WinePageColors.reviewTag,
    marginTop: '3rem',
    fontSize: '13rem',
  },
});

export {ReviewTag};
