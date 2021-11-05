import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {AppTestIDs} from './Config/TestIDs';
import MainAppInteractor from './Interactor/ComponentInteractors/MainAppInteractor.';
import HomepageInteractor from './Interactor/WebInteractor/HomePageInteractor';
import HomeScreenStackComponent from './Router/StackNavigators/HomeScreenStack';
import {AppBottomTab} from './Router/TabNavigators/AppBottomTab';
import SignUpPage from './View/Screens/AuthenticationScreens/Signup';
import SplashScreen from './View/Screens/AuthenticationScreens/SplashScreen';

const screenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: screenWidth / 380, $miniPlayerHeight: '50rem'});

const RootApp: React.FC = () => {
  EStyleSheet.build();
  return (
    <NavigationContainer>
      {/* <MainAppInteractor>
        <HomepageInteractor>
          <View style={{flex: 1}} testID={AppTestIDs.bottomNavbar}>
            <AppBottomTab />
          </View>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        </HomepageInteractor>
      </MainAppInteractor> */}
      <SignUpPage />
      {/* <SplashScreen /> */}
    </NavigationContainer>
  );
};

export {RootApp};
