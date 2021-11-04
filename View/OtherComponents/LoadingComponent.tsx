import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../Config/Dimensions';

const HEIGHT = heightDp('60');
const WIDTH = widthDp('100');
const RELOAD_H = heightDp('5%');
const RELOAD_W = widthDp('30%');

interface LoadingComponentProps {
  errorState: boolean;
  fetchingDataState: boolean;
  handlerRefresh: Function;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  errorState,
  fetchingDataState,
  handlerRefresh,
}) => {
  function handleReload() {
    handlerRefresh();
  }

  return (
    <View style={styles.container}>
      {fetchingDataState ? (
        <Text style={styles.text}>Loading</Text>
      ) : errorState ? (
        <View style={styles.errorContainer}>
          <Text style={styles.text}>connection failed</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleReload}
            style={styles.reloadButton}>
            <Text style={styles.reloadText}>reload</Text>
          </TouchableOpacity>
        </View>
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
  errorContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reloadButton: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: RELOAD_H,
    width: RELOAD_W,
    borderRadius: '20rem',
  },
  reloadText: {
    color: '#fff',
    fontSize: '12rem',
  },
  text: {
    color: '#000',
    fontSize: '15rem',
  },
});

export {LoadingComponent};
