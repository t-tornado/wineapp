import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavbar} from '../../View/NavBars/BottomNavBar';
import HomeScreenStackComponent from '../StackNavigators/HomeScreenStack';
import CellartStactContainer from '../StackNavigators/CellarStackComponent';

const BottomTab = createBottomTabNavigator();

const UserAppBottomTab = () => {
  return (
    <BottomTab.Navigator tabBar={props => <BottomNavbar {...props} />}>
      <BottomTab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreenStackComponent}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
        }}
        name="Cellar"
        component={CellartStactContainer}
      />
    </BottomTab.Navigator>
  );
};

export default UserAppBottomTab;
