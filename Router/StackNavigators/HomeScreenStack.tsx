import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from '../../View/Screens/HomePage';
import {WinePage} from '../../View/Screens/WinePage';
import {HomeButtonStackParamList} from '../../Config/KWinefoDataTypes';

const HomeScreenStack = createStackNavigator<HomeButtonStackParamList>();

const HomeScreenStackComponent = () => {
  return (
    <HomeScreenStack.Navigator initialRouteName="HomePage">
      <HomeScreenStack.Screen
        name="HomePage"
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
