import React from 'react';
import {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {AuthScreenTypes} from '../../../Config/KWinefoDataTypes';

interface AuthLoadingComponentProps {
  loading: boolean;
  success: boolean;
  failed: boolean;
  type: AuthScreenTypes;
  closeIndicator: Function;
  userNotFound?: boolean;
  invalidInput?: boolean;
  signupFieldEmpty?: boolean;
}

const SPINNER_S = heightDp('6');

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
  let loadingText: string | null =
    type === 'Signin' ? 'Signing in' : type === 'Signup' ? 'Signing up' : null;

  function handleClose() {
    closeIndicator();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.overlay} />
      <View style={styles.loaderContainer}>
        <Spinner
          color="#fff"
          size={SPINNER_S}
          isVisible={loading}
          type="ChasingDots"
        />
        {typeof loadingText !== null && loading ? (
          <Text style={styles.loadingText}>{loadingText}</Text>
        ) : null}
      </View>
      {loading ? null : (
        <View style={[styles.popupContainer]}>
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
      )}
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
  loaderContainer: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: '18rem',
    fontWeight: 'bold',
  },
  messageContainer: {
    padding: '15rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#00000090',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  popupContainer: {
    height: '25%',
    width: '60%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: '15rem',
    backgroundColor: '#f4f4f4',
  },
  screen: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
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
