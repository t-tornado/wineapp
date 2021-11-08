import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavbar} from '../../View/NavBars/BottomNavBar';
import HomeScreenStackComponent from '../StackNavigators/HomeScreenStack';
import CellartStactContainer from '../StackNavigators/CellarStackComponent';
import {ProfileScreen} from '../../View/Screens/UserProfile/ProfileScreen';
import {defaultStackScreenConfig} from '../../Config/WineAppConfig';

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
      {/* <BottomTab.Screen
        options={defaultStackScreenConfig}
        name="Cellar"
        component={CellartStactContainer}
      />
      <BottomTab.Screen
        options={defaultStackScreenConfig}
        name="Profile"
        component={ProfileScreen}
      /> */}
    </BottomTab.Navigator>
  );
};

export default UserAppBottomTab;
