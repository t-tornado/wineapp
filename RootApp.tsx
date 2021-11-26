import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import EStyleSheet from 'react-native-extended-stylesheet';

import {AppTestIDs} from './Config/TestIDs';
import MainAppInteractor from './Interactor/ComponentInteractors/MainAppInteractor';
import HomepageInteractor from './Interactor/WebInteractor/HomePageInteractor';
import {AuthInteractor} from './Interactor/WebInteractor/AuthInteractor';
import MainAppNavigationContainer from './Router/MainAppNavigationContainer';

const screenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: screenWidth / 380, $miniPlayerHeight: '50rem'});

const RootApp: React.FC = () => {
  EStyleSheet.build();
  return (
    <NavigationContainer>
      <MainAppInteractor>
        <HomepageInteractor>
          <AuthInteractor>
            <MainAppNavigationContainer />
          </AuthInteractor>
        </HomepageInteractor>
      </MainAppInteractor>
    </NavigationContainer>
  );
};

export {RootApp};
