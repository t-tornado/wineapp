import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StatusBar} from 'react-native';
import {AppBottomTab} from './Router/AppBottomTab';
import EStyleSheet from 'react-native-extended-stylesheet';

const screenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: screenWidth / 380, $miniPlayerHeight: '50rem'});

const RootApp: React.FC = () => {
  EStyleSheet.build();
  return (
    <NavigationContainer>
      <AppBottomTab />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </NavigationContainer>
  );
};

export {RootApp};
