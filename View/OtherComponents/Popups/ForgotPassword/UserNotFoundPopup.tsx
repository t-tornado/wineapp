import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SplashScreenColors} from '../../../../Config/Colors';
import {heightDp, widthDp} from '../../../../Config/Dimensions';

const POPUP_H = heightDp('20');
const POPUP_W = widthDp('80');
const icon_s = heightDp('5');

interface ForgotPasswordPopupProps {
  handlePress: Function;
}

const UserNotFoundPopup: React.FC<ForgotPasswordPopupProps> = props => {
  const {handlePress} = props;

  function handleClose() {
    handlePress();
  }

  return (
    <View style={[styles.screen, {transform: [{translateY: 100}]}]}>
      <View style={styles.overlay} />
      <View style={[styles.popupContainer]}>
        <Icon
          name="error-outline"
          size={icon_s}
          color={SplashScreenColors.backgroundColor}
        />
        <Text style={styles.popupText}>
          Sorry, user with this email not found. Sign up to create a new account{' '}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPressOut={handleClose}
        style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  closeButton: {
    height: '25%',
    width: '50%',
    backgroundColor: SplashScreenColors.backgroundColor,
    borderRadius: '20rem',
    marginTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: '13rem',
  },
  popupContainer: {
    height: POPUP_H,
    width: POPUP_W,
    borderRadius: heightDp('2'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '15rem',
  },
  popupText: {
    color: '#000',
    fontSize: '15rem',
    textAlign: 'center',
  },
  screen: {
    height: POPUP_H,
    width: widthDp('100'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export {UserNotFoundPopup};
