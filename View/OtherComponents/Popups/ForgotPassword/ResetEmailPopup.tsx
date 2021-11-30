import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/AntDesign';
import {SplashScreenColors} from '../../../../Config/Colors';
import {heightDp, widthDp} from '../../../../Config/Dimensions';

const POPUP_H = heightDp('25');
const POPUP_W = widthDp('80');
const icon_s = heightDp('6');

interface ForgotPasswordPopupProps {
  handlePress: Function;
}

const ResetEmailSent: React.FC<ForgotPasswordPopupProps> = props => {
  const {handlePress} = props;
  function handleClose() {
    handlePress();
  }

  return (
    <View style={[styles.screen, {transform: [{translateY: 100}]}]}>
      <View style={styles.overlay} />
      <View style={[styles.popupContainer]}>
        <Icon
          name="checkcircle"
          size={icon_s}
          color={SplashScreenColors.backgroundColor}
        />
        <Text style={styles.popupText}>
          A password reset email has been sent. Reset your password and Sign in
          with your new password
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
    height: '20%',
    width: '50%',
    backgroundColor: SplashScreenColors.backgroundColor,
    borderRadius: '20rem',
    marginTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: '15rem',
  },
  popupContainer: {
    height: POPUP_H,
    width: POPUP_W,
    borderRadius: heightDp('2'),
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '13rem',
  },
  popupText: {
    color: '#000',
    fontSize: '14rem',
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

export {ResetEmailSent};
