import React from 'react';
import {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {
  AuthLoadingText,
  AuthScreenTypes,
} from '../../../Config/KWinefoDataTypes';

interface AuthLoadingComponentProps {
  loading: boolean;
  success: boolean;
  failed: boolean;
  type: AuthScreenTypes;
  loadingText: AuthLoadingText;
  closeIndicator: Function;
  userNotFound?: boolean;
  invalidInput?: boolean;
  signupFieldEmpty?: boolean;
}

const SPINNER_S = heightDp('6');
const POPUP_H = heightDp('25');
const POPUP_W = widthDp('80');

const AuthLoadingComponent: React.FC<AuthLoadingComponentProps> = props => {
  const {
    loading,
    success,
    type,
    loadingText,
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
    : stateText === 'Failed'
    ? 'Check your connection and try again'
    : '';

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
          <Text style={styles.messageHeader}>
            {type} {stateText}
          </Text>
          <View style={styles.messageContainer}>
            <Text style={{color: '#000'}}>{message}</Text>
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
    height: '20%',
    width: '50%',
    backgroundColor: SplashScreenColors.backgroundColor,
    borderRadius: '20rem',
    marginTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
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
  messageHeader: {
    fontSize: '15rem',
    color: SplashScreenColors.backgroundColor,
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: '#00000090',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  popupContainer: {
    height: POPUP_H,
    width: POPUP_W,
    borderRadius: heightDp('2'),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '13rem',
    bottom: heightDp('15'),
  },
  screen: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  messageText: {
    color: '#000',
    fontSize: '15rem',
  },
});

export {AuthLoadingComponent};
