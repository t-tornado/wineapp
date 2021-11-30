import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {VeriifyPasswordsAreValidAndMatch} from '../../../Config/HelperFunctions/JSHelperFunctions';
import {ForgotPasswordScreenprops} from '../../../Config/KWinefoDataTypes';
import {
  useLodingResetPassword,
  useResetPassword,
  useResetPasswordEmailFailed,
  useResetPasswordEmailSuccess,
  useResetPasswordUsernotFound,
  useUserEmail,
  useUserPassword,
  useUserRepeatedPassword,
} from '../../../Interactor/WebInteractor/AuthInteractor';
import {AuthButton} from '../../OtherComponents/AuthPagesComponents/AuthButton';
import {EmailTextInputcomponent} from '../../OtherComponents/AuthPagesComponents/EmailTextInputComponent';
import {ResetPasswordLoadingScreen} from '../../OtherComponents/AuthPagesComponents/ResetPasswordLoadingScreen';
import {ResetEmailFailedPopup} from '../../OtherComponents/Popups/ForgotPassword/ResetEmailFailedPopup';
import {ResetEmailSent} from '../../OtherComponents/Popups/ForgotPassword/ResetEmailPopup';
import {UserNotFoundPopup} from '../../OtherComponents/Popups/ForgotPassword/UserNotFoundPopup';

const imageURL = require('../../../assets/Winesplash.jpeg');

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenprops> = props => {
  const {navigation} = props;
  const password = useUserPassword();
  const repeatedpassword = useUserRepeatedPassword();
  const handleResetPassword = useResetPassword();
  const userEmail = useUserEmail();
  const resetPasswordEmailSuccess = useResetPasswordEmailSuccess();
  const resetPasswordEmailFailed = useResetPasswordEmailFailed();
  const resetPasswordUsernotFound = useResetPasswordUsernotFound();
  const resettingPassword = useLodingResetPassword();

  function onTapBackToSignin() {
    navigation.navigate('Signin');
  }

  function onCloseEmailSentPopup() {
    navigation.navigate('Signin');
  }

  function onChangePassword() {
    handleResetPassword(userEmail.value);
  }

  function onCloseErrorPopup() {
    resetPasswordEmailFailed.setFunction(false);
  }

  function onCloseUsernotFoundPopup() {
    resetPasswordUsernotFound.setFunction(false);
  }

  console.log('resetting password   ', resettingPassword);

  useEffect(() => {
    let clean = true;
    clean && resetPasswordEmailFailed.setFunction(false);
    clean && resetPasswordEmailSuccess.setFunction(false);

    return () => {
      clean = false;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Image source={imageURL} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View
        style={[
          styles.content,
          {
            opacity:
              resetPasswordEmailFailed.value ||
              resetPasswordEmailSuccess.value ||
              resetPasswordUsernotFound.value
                ? 0
                : 1,
          },
        ]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forgot Password ?</Text>
        </View>
        <View style={styles.inputFields}>
          <Text style={styles.pageText}>Enter your email below</Text>
          <EmailTextInputcomponent />
        </View>
        <View style={styles.buttonContainer}>
          <AuthButton name="Reset Password" handleOnPress={onChangePassword} />
          <TouchableOpacity
            onPressOut={onTapBackToSignin}
            activeOpacity={0.6}
            style={[styles.previouActionContainer, {top: heightDp('1')}]}>
            <Text style={styles.previousActionText}>Back to Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      {resettingPassword ? (
        <ResetPasswordLoadingScreen />
      ) : resetPasswordUsernotFound.value ? (
        <UserNotFoundPopup handlePress={onCloseUsernotFoundPopup} />
      ) : resetPasswordEmailSuccess.value ? (
        <ResetEmailSent handlePress={onCloseEmailSentPopup} />
      ) : resetPasswordEmailFailed.value ? (
        <ResetEmailFailedPopup handlePress={onCloseErrorPopup} />
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  buttonContainer: {
    height: heightDp('20'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: '10rem',
  },
  header: {
    height: '10%',
    width: '100%',
    paddingLeft: '10rem',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: '20rem',
    color: SplashScreenColors.backgroundColor,
  },
  inputFields: {
    height: heightDp('25'),
    width: '100%',
    justifyContent: 'space-around',
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#00000080',
  },
  pageText: {
    color: '#fff',
    fontSize: '15rem',
  },
  previouActionContainer: {
    height: '25%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: '40rem',
  },
  previousActionText: {
    color: SplashScreenColors.backgroundColor,
    fontWeight: 'bold',
    fontSize: '12rem',
  },
  screen: {
    height: heightDp('100'),
    width: widthDp('100'),
    backgroundColor: '#00000090',
    // paddingHorizontal: '10rem',
  },
});

export {ForgotPasswordScreen};
