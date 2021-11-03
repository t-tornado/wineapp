import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../Config/Dimensions';

const HEIGHT = heightDp('60');
const WIDTH = widthDp('100');

interface LoadingComponentProps {
  errorState: boolean;
  fetchingDataState: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  errorState,
  fetchingDataState,
}) => {
  return (
    <View style={styles.container}>
      {fetchingDataState ? (
        <Text style={styles.text}>Loading</Text>
      ) : errorState ? (
        <Text style={styles.text}>Error loading</Text>
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    paddingVertical: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: '15rem',
  },
});

export {LoadingComponent};
