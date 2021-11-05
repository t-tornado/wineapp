import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {defaultStackScreenConfig} from '../Config/WineAppConfig';
import {useUser} from '../Interactor/WebInteractor/AuthInteractor';
import {BottomNavbar} from '../View/NavBars/BottomNavBar';
import SignInScreen from '../View/Screens/AuthenticationScreens/Signin';
import SignUpScreen from '../View/Screens/AuthenticationScreens/Signup';
import SplashScreen from '../View/Screens/AuthenticationScreens/SplashScreen';
import CellartStactContainer from './StackNavigators/CellarStackComponent';
import HomeScreenStackComponent from './StackNavigators/HomeScreenStack';

const AppStack = createStackNavigator();
const AppBottomTab = createBottomTabNavigator();

const MainAppNavigationContainer = () => {
  const user = useUser().value;

  return (
    <NavigationContainer independent={true}>
      {user === null ? (
        <AppStack.Navigator>
          <AppStack.Screen
            options={defaultStackScreenConfig}
            name="SplashScreen"
            component={SplashScreen}
          />
          <AppStack.Screen
            options={defaultStackScreenConfig}
            name="Signup"
            component={SignUpScreen}
          />
          <AppStack.Screen
            options={defaultStackScreenConfig}
            name="Signin"
            component={SignInScreen}
          />
        </AppStack.Navigator>
      ) : (
        <AppBottomTab.Navigator tabBar={props => <BottomNavbar {...props} />}>
          <AppBottomTab.Screen
            options={defaultStackScreenConfig}
            name="Home"
            component={HomeScreenStackComponent}
          />
          <AppBottomTab.Screen
            options={defaultStackScreenConfig}
            name="Cellar"
            component={CellartStactContainer}
          />
        </AppBottomTab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainAppNavigationContainer;
