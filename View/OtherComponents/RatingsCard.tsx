import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {heightDp, widthDp} from '../../Config/Dimensions';

const ICON_S = heightDp('4%');
const CARD_H = heightDp('20%');
const CARD_W = widthDp('30%');

interface RatingsProps {
  rating: string;
}

const RatingsCard: React.FC<RatingsProps> = props => {
  const {rating} = props;
  return (
    <View style={styles.container}>
      <AntDesign name="star" size={ICON_S} color="#000" />

      <Text style={styles.text}> {rating}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: CARD_H,
    width: CARD_W,
    padding: '5rem',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff90',
    borderRadius: '15rem',
  },
  text: {
    color: '#000',
    fontSize: '13rem',
  },
});

export {RatingsCard};
