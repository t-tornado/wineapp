import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CellarWinePage} from '../../View/Screens/CellarWinePage';
import CellarLandingScreen from '../../View/Screens/CellarLandingPage';
import {CellarStackParamList} from '../../Config/KWinefoDataTypes';

const CellarStackNav = createStackNavigator<CellarStackParamList>();
const screenOptions = {
  headerShown: false,
};

const CellartStactContainer = () => {
  return (
    <CellarStackNav.Navigator initialRouteName="CellarLandingPage">
      <CellarStackNav.Screen
        options={screenOptions}
        name="CellarLandingPage"
        component={CellarLandingScreen}></CellarStackNav.Screen>
      <CellarStackNav.Screen
        options={screenOptions}
        name="CellarWinePage"
        component={CellarWinePage}></CellarStackNav.Screen>
    </CellarStackNav.Navigator>
  );
};

export default CellartStactContainer;
