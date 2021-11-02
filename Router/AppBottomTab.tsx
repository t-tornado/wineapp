import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from '../View/Screens/SearchScreen';
import {BottomNavbar} from '../View/NavBars/BottomNavBar';
import HomeScreenStackComponent from './StackNavigators/HomeScreenStack';

const BottomTab = createBottomTabNavigator();

const AppBottomTab = () => {
  return (
    <BottomTab.Navigator tabBar={props => <BottomNavbar {...props} />}>
      <BottomTab.Screen
        options={{
          headerShown: false,
        }}
        name="MainHomePage"
        component={HomeScreenStackComponent}
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
