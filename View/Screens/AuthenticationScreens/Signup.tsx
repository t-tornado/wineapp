import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {AuthPagesImageURL} from '../../../Config/WineAppConfig';
import {
  useResetSignupStates,
  useSignup,
  useSignupStates,
  useUserEmail,
  useUsername,
  useUserPassword,
} from '../../../Interactor/WebInteractor/AuthInteractor';
import {AuthButton} from '../../OtherComponents/AuthPagesComponents/AuthButton';
import {AuthLoadingComponent} from '../../OtherComponents/AuthPagesComponents/AuthLoadingComponent';
import {EmailTextInputcomponent} from '../../OtherComponents/AuthPagesComponents/EmailTextInputComponent';
import {SignUpFirstnameInputComponent} from '../../OtherComponents/AuthPagesComponents/FirstNameInputContainer';
import {SignUpLastNameInputComponent} from '../../OtherComponents/AuthPagesComponents/LastNameInputContainer';
import {PasswordInputComponent} from '../../OtherComponents/AuthPagesComponents/PasswordInputComponent';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');

const SignUpScreen: React.FC = props => {
  const [openLoadingIndicator, setOpenLoadingIndicator] = useState(false);
  const {navigation} = props;
  const resetSignupStates = useResetSignupStates();
  const signUpStates = useSignupStates();
  const userEmail = useUserEmail().value;
  const userPassword = useUserPassword().value;
  const userName = useUsername().value;
  const signUp = useSignup();
  const {loading, sucess, failed} = signUpStates;

  function onPressSignup() {
    signUp(userEmail, userPassword, userName);
  }

  function onPressSignInButton() {
    navigation.navigate('Signin');
  }

  function handleCloseLoadingIndicator() {
    setOpenLoadingIndicator(false);
    // reset all signin loading states
    resetSignupStates();
  }

  useEffect(() => {
    let cleanUp = true;
    if (loading || sucess || failed) cleanUp && setOpenLoadingIndicator(true);

    return () => (cleanUp = false);
  }, [loading, sucess, failed]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={AuthPagesImageURL}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create an account</Text>
          <Text style={styles.headerSubText}>
            Fill the form below to join KWinefo
          </Text>
        </View>
        <View style={styles.body}>
          <SignUpFirstnameInputComponent />
          <SignUpLastNameInputComponent />
          <EmailTextInputcomponent />
          <PasswordInputComponent />
        </View>
        <View style={styles.signUpFooter}>
          <AuthButton name="sign up" handleOnPress={onPressSignup} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>Already have an account</Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onPressSignInButton}
              style={styles.footerSignInTextContainer}>
              <Text style={styles.footerSignInText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {openLoadingIndicator ? (
        <AuthLoadingComponent
          closeIndicator={handleCloseLoadingIndicator}
          failed={failed}
          loading={loading}
          success={sucess}
          type="signup"
        />
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  body: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '20rem',
  },
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  footerTextContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerSignInText: {
    color: SplashScreenColors.backgroundColor,
    fontSize: '13rem',
  },
  footerSignInTextContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffff',
    fontSize: '13rem',
  },
  signUpFooter: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupLoadingScreen: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090',
  },
  signupLoadingScreenText: {
    color: '#fff',
    fontSize: '15rem',
  },
  headerContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: '20rem',
  },
  headerSubText: {
    color: '#fff',
    fontSize: '15rem',
    marginTop: '15rem',
  },
  headerText: {
    color: '#fff',
    fontFamily: 'CL',
    // fontWeight: 'bold',
    fontSize: '30rem',
  },
  overlay: {
    backgroundColor: '#00000090',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

export default SignUpScreen;
