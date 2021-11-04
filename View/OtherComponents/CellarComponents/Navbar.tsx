import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {heightDp, widthDp} from '../../../Config/Dimensions';

const icon_s = heightDp('5%');
const HEIGHT = heightDp('8');
const WIDTH = widthDp('100');

const CellarPageNavbar: React.FC = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="glass-wine" color="#630000" size={icon_s} />
      <View style={styles.hederTextContainer}>
        <Text style={styles.text}> Your Cellar</Text>
        <Text>2 Products</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerDetailsContainer: {
    width: '60%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '10rem',
  },
  hederTextContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000',
    fontSize: '16rem',
  },
});

export {CellarPageNavbar};
