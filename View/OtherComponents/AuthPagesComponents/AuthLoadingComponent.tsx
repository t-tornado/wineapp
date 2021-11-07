import React from 'react';
import {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';

interface AuthLoadingComponentProps {
  loading: boolean;
  success: boolean;
  failed: boolean;
  type: string;
  closeIndicator: Function;
  userNotFound?: boolean;
  invalidInput?: boolean;
  signupFieldEmpty?: boolean;
}

const AuthLoadingComponent: React.FC<AuthLoadingComponentProps> = props => {
  const {
    loading,
    success,
    type,
    closeIndicator,
    userNotFound,
    invalidInput,
    signupFieldEmpty,
  } = props;
  let stateText = loading ? ' loading ' : success ? 'successful' : 'Failed';
  let message = userNotFound
    ? 'User not found'
    : invalidInput
    ? 'Wrong email or password'
    : signupFieldEmpty
    ? 'Enter all details'
    : '';

  function handleClose() {
    closeIndicator();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.popupContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.stateText}>{type} </Text>
          <Text style={styles.stateText}>{stateText}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.stateText}>{message}</Text>
        </View>
        <TouchableOpacity
          onPress={handleClose}
          activeOpacity={0.8}
          style={styles.closeButton}>
          <Text style={styles.closeButtonText}>close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  closeButton: {
    height: '15%',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SplashScreenColors.backgroundColor,
    borderRadius: '15rem',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: '13rem',
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: '15rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    height: '30%',
    width: '70%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '30rem',
  },
  screen: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  stateText: {
    color: '#000',
    fontSize: '20rem',
    fontFamily: 'CL',
  },
});

export {AuthLoadingComponent};
