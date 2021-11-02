import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from '../../View/Screens/HomePage';
import {WinePage} from '../../View/Screens/WinePage';

const HomeScreenStack = createStackNavigator();

const HomeScreenStackComponent = () => {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: false,
        }}
      />
      <HomeScreenStack.Screen
        name="WinePage"
        component={WinePage}
        options={{headerShown: false}}
      />
    </HomeScreenStack.Navigator>
  );
};

export default HomeScreenStackComponent;
