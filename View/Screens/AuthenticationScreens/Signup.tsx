import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {AuthPagesImageURL} from '../../../Config/WineAppConfig';
import {AuthButton} from '../../OtherComponents/AuthPagesComponents/AuthButton';
import {EmailTextInputcomponent} from '../../OtherComponents/AuthPagesComponents/EmailTextInputComponent';
import {PasswordInputComponent} from '../../OtherComponents/AuthPagesComponents/PasswordInputComponent';
import {SignUpUsernameInputComponent} from '../../OtherComponents/AuthPagesComponents/SignUpUserNameInput';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');

const SignUpScreen: React.FC = props => {
  const {navigation} = props;

  function onPressSignup() {
    console.log('--info-- user has been logged in');
  }

  function onPressSignInButton() {
    navigation.navigate('Signin');
  }

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
          <EmailTextInputcomponent />
          <SignUpUsernameInputComponent />
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
    height: '50%',
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
