import React from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {SplashScreenColors} from '../../../Config/Colors';
import {AuthPagesLogoBar} from '../../OtherComponents/GeneralComponents/AuthPagesLogoBar';
import {AuthPagesImageURL} from '../../../Config/WineAppConfig';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthScreenNavigatorStackParamList} from '../../../Config/KWinefoDataTypes';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');
const icon_s = widthDp('4%');

type SplachScreenProps = StackScreenProps<
  AuthScreenNavigatorStackParamList,
  'SplashScreen'
>;

const SplashScreen: React.FC<SplachScreenProps> = props => {
  const {navigation} = props;

  function onPressNextButton() {
    navigation.navigate('Signup');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={AuthPagesImageURL} style={styles.image} />
      </View>
      <View style={styles.innerContainer}>
        <AuthPagesLogoBar />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>KWineFo </Text>
          <Text style={styles.headerSubtext}>
            The number one place to know about your wines and wineries.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onPressNextButton}
              activeOpacity={0.6}
              style={styles.button}>
              <SimpleLineIcons
                name="arrow-right"
                size={icon_s}
                color={SplashScreenColors.backgroundColor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar
        barStyle="light-content"
        backgroundColor={SplashScreenColors.backgroundColor}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: '20rem',
  },
  button: {
    width: '20%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10rem',
    borderWidth: '2rem',
    borderColor: SplashScreenColors.backgroundColor,
  },
  buttonContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#161E54',
  },
  headerSubtext: {
    color: '#fff',
    fontSize: '17rem',
    marginTop: '10rem',
    fontFamily: 'CL',
  },
  headerText: {
    color: '#fff',
    fontSize: '50rem',
    fontFamily: 'Anders',
  },
  image: {
    height: '62%',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: '90rem',
    borderTopRightRadius: '90rem',
  },
  imageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingBottom: heightDp('20'),
  },
  imageWrapper: {},
  logoBar: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoImage: {
    height: '90%',
    width: '20%',
    borderRadius: '10rem',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 0.6,
    paddingHorizontal: '20rem',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '30rem',
  },
});

export default SplashScreen;
