import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homepage from '../View/Screens/HomePage';
import SearchScreen from '../View/Screens/SearchScreen';
import {BottomNavbar} from '../View/NavBars/BottomNavBar';

const BottomTab = createBottomTabNavigator();

const AppBottomTab = () => {
  return (
    <BottomTab.Navigator tabBar={props => <BottomNavbar {...props} />}>
      <BottomTab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Homepage}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={SearchScreen}
      />
    </BottomTab.Navigator>
  );
};

export {AppBottomTab};
