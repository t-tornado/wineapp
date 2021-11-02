import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import {AppBottomTab} from './Router/AppBottomTab';
import EStyleSheet from 'react-native-extended-stylesheet';
import {AppTestIDs} from './Config/TestIDs';
import HomepageInteractor from './Interactor/HomePageInteractor';

const screenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: screenWidth / 380, $miniPlayerHeight: '50rem'});

const RootApp: React.FC = () => {
  EStyleSheet.build();
  return (
    <NavigationContainer>
      <HomepageInteractor>
        <View style={{flex: 1}} testID={AppTestIDs.bottomNavbar}>
          <AppBottomTab />
        </View>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </HomepageInteractor>
    </NavigationContainer>
  );
};

export {RootApp};
