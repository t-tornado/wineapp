import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {SigninScreenProps} from '../../../Config/KWinefoDataTypes';
import {
  useResetAuthStates,
  useSignin,
  useSigninInvalidInput,
  useSigninStates,
  useSigninUserNotFound,
  useUserEmail,
  useUserPassword,
} from '../../../Interactor/WebInteractor/AuthInteractor';
import {AuthButton} from '../../OtherComponents/AuthPagesComponents/AuthButton';
import {AuthLoadingComponent} from '../../OtherComponents/AuthPagesComponents/AuthLoadingComponent';
import {EmailTextInputcomponent} from '../../OtherComponents/AuthPagesComponents/EmailTextInputComponent';
import {PasswordInputComponent} from '../../OtherComponents/AuthPagesComponents/PasswordInputComponent';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');
const imageURL = require('../../../assets/Winesplash.jpeg');

const SignInScreen: React.FC<SigninScreenProps> = props => {
  const [openLoadingIndicator, setOpenLoadingIndicator] = useState(false);
  const {navigation} = props;
  const resetAuthStates = useResetAuthStates();
  const signIn = useSignin();
  const signinStates = useSigninStates();
  const userEmail = useUserEmail().value;
  const userPassword = useUserPassword().value;
  const userNotFound = useSigninUserNotFound();
  const invalidInput = useSigninInvalidInput();
  const {loading, sucess, failed} = signinStates;

  function onPressSignupButton() {
    navigation.navigate('Signup');
  }

  function onPressSignin() {
    signIn(userEmail, userPassword);
  }

  function handleCloseLoadingIndicator() {
    setOpenLoadingIndicator(false);
    resetAuthStates();
  }

  useEffect(() => {
    let cleanUp = true;
    if (loading || sucess || failed) cleanUp && setOpenLoadingIndicator(true);

    return () => (cleanUp = false);
  }, [loading, sucess, failed]);

  return (
    <View style={styles.container}>
      <ImageBackground source={imageURL} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.body}>
          <View style={styles.headerContainer}>
            {/* <AuthPagesLogoBar /> */}
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Welcome back to</Text>
              <Text style={styles.brandText}>KWineFo</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsContainerTop}>
              <EmailTextInputcomponent />
              <PasswordInputComponent type="Signin" />
            </View>
            <View style={styles.bodyFooter}>
              <AuthButton name="sign in" handleOnPress={onPressSignin} />
              <View style={styles.newUserContainer}>
                <Text style={styles.newUserText}>Are you a new user?</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={onPressSignupButton}>
                  <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {openLoadingIndicator ? (
          <AuthLoadingComponent
            type="signin"
            loading={loading}
            failed={failed}
            success={sucess}
            userNotFound={userNotFound}
            invalidInput={invalidInput}
            closeIndicator={handleCloseLoadingIndicator}
          />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  bodyFooter: {
    flex: 1,
    alignItems: 'center',
  },
  brandText: {
    color: '#fff',
    fontFamily: 'Anders',
    fontSize: '30rem',
  },
  detailsContainer: {
    flex: 1,
  },
  detailsContainerTop: {
    height: '60%',
    width: '100%',
    paddingHorizontal: '20rem',
  },
  headerContainer: {
    height: '40%',
    width: '100%',
    paddingHorizontal: '20rem',
  },
  headerText: {
    color: '#fff',
    fontSize: '20rem',
    fontFamily: 'CL',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  inputContainer: {
    height: '10%',
    width: '100%',
    alignItems: 'flex-start',
  },
  inputContainerText: {
    color: '#fff',
    fontSize: '12rem',
  },
  newUserContainer: {
    height: '40%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newUserText: {
    color: '#fff',
    fontSize: '13rem',
  },
  overlay: {
    backgroundColor: '#00000090',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  signinLoadingScreen: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
  signinLoadingScreenText: {
    color: '#fff',
    fontSize: '15rem',
  },
  signUpText: {
    fontSize: '12rem',
    left: '30rem',
    color: SplashScreenColors.backgroundColor,
  },
  textInput: {
    width: '70%',
    height: '70%',
    borderColor: '#fff',
    borderWidth: '1rem',
  },
});

export default SignInScreen;
