import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import {AuthButton} from '../../OtherComponents/AuthPagesComponents/AuthButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SplashScreenColors} from '../../../Config/Colors';
import {useCurrentUser} from '../../../Interactor/WebInteractor/HomePageInteractor';
import {
  useSignOut,
  useSignoutLoading,
} from '../../../Interactor/WebInteractor/AuthInteractor';
import {SignoutLoadingScreen} from '../../OtherComponents/AuthPagesComponents/SignoutLoadingScreen';

const HEIGHT = heightDp('100');
const WIDTH = widthDp('100');
const icon_s = heightDp('4');

const ProfileScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('yourEmail@xxx.com');
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const currentUser = useCurrentUser()[0];
  const signoutLoading = useSignoutLoading();
  const signOut = useSignOut();

  useEffect(() => {
    let clean = true;
    if (currentUser !== undefined) {
      clean && setEmail(currentUser.email);
      clean && setFirstName(currentUser.firstName);
      clean && setLastName(currentUser.lastName);
      clean && setFullName(`${currentUser.firstName} ${currentUser.lastName} `);
    }

    return () => (clean = false);
  }, [currentUser]);

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.screenBar}>
        <Text style={styles.screeBarText}>Profile</Text>
      </View>
      <View style={styles.accountHeaderContainer}>
        <View style={styles.accountIconContainer}>
          <Icon name="account" size={icon_s} color="#fff" />
        </View>
        <View style={styles.accountHeaderTextContainer}>
          <Text style={styles.accountHeaderText}>{fullName}</Text>
        </View>
      </View>
      <View style={styles.userDetailsContainer}>
        <View style={styles.userDetailsTextWrapper}>
          <View style={styles.userDetailsLabelValueContainer}>
            <Text style={styles.userDetailsLabelText}>First Name</Text>
            <Text style={styles.userDetailsValueText}>
              {firstName ? firstName : 'First Name'}
            </Text>
          </View>
          <View style={styles.userDetailsLabelValueContainer}>
            <Text style={styles.userDetailsLabelText}>Last Name</Text>
            <Text style={styles.userDetailsValueText}>
              {lastName ? lastName : 'Last Name'}
            </Text>
          </View>
          <View style={styles.userDetailsLabelValueContainer}>
            <Text style={styles.userDetailsLabelText}>Email</Text>
            <Text style={styles.userDetailsValueText}>
              {email ? email : 'Example@xxxx.com'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.signOut}>
        <AuthButton handleOnPress={handleSignOut} name="Sign out" />
      </View>
      {signoutLoading ? <SignoutLoadingScreen /> : null}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </View>
  );
};

const styles = EStyleSheet.create({
  accountHeaderContainer: {
    height: heightDp('18'),
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#000',
  },
  accountHeaderText: {
    color: '#000',
    fontSize: '18rem',
  },
  accountHeaderTextContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountIconContainer: {
    height: '60%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: '100rem',
  },
  screen: {
    heihgt: HEIGHT,
    width: WIDTH,
    backgroundColor: '#fff',
  },
  screenBar: {
    height: heightDp('7%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screeBarText: {
    fontSize: '20rem',
    color: '#000',
  },
  signOut: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailsContainer: {
    height: heightDp('45'),
    width: '100%',
    alignItems: 'center',
  },
  userDetailsTextWrapper: {
    height: '90%',
    width: '80%',
    justifyContent: 'space-between',
    backgroundColor: `${SplashScreenColors.backgroundColor}`,
    borderRadius: '30rem',
    padding: '25rem',
  },
  userDetailsLabelText: {
    color: '#ffffff80',
    fontSize: '15rem',
  },
  userDetailsLabelValueContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  userDetailsValueText: {
    color: '#fff',
    fontSize: '16rem',
  },
});

export {ProfileScreen};
