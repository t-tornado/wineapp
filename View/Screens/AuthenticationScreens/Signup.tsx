import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {AuthPagesLogoBar} from '../../OtherComponents/GeneralComponents/AuthPagesLogoBar';
import {EmailInputcomponent} from '../../OtherComponents/SignInComponents/EmailInputComponent';
import {PasswordInputContainer} from '../../OtherComponents/SignInComponents/PasswordInput';
import {SignInButton} from '../../OtherComponents/SignInComponents/SignInButton';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');
const imageURL = require('../../../assets/Winesplash.jpeg');

const SignUpPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={imageURL} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.body}>
          <View style={styles.headerContainer}>
            {/* <AuthPagesLogoBar /> */}
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Sign In to </Text>
              <Text style={styles.brandText}>KWineFo</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsContainerTop}>
              <EmailInputcomponent />
              <PasswordInputContainer />
            </View>
            <View style={styles.bodyFooter}>
              <SignInButton />
              <View style={styles.newUserContainer}>
                <Text style={styles.newUserText}>Are you a new user?</Text>
                <TouchableOpacity>
                  <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
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
    fontSize: '17rem',
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

export default SignUpPage;
