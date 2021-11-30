import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {defaultStackScreenConfig} from '../Config/WineAppConfig';
import {
  useAuthStateChanged,
  useUser,
} from '../Interactor/WebInteractor/AuthInteractor';
import {BottomNavbar} from '../View/NavBars/BottomNavBar';
import SignInScreen from '../View/Screens/AuthenticationScreens/Signin';
import SignUpScreen from '../View/Screens/AuthenticationScreens/Signup';
import SplashScreen from '../View/Screens/AuthenticationScreens/SplashScreen';
import CellartStactContainer from './StackNavigators/CellarStackComponent';
import HomeScreenStackComponent from './StackNavigators/HomeScreenStack';

import auth from '@react-native-firebase/auth';
import {ProfileScreen} from '../View/Screens/UserProfile/ProfileScreen';
import {
  AuthScreenNavigatorStackParamList,
  MainAppNavigationStckParamsList,
} from '../Config/KWinefoDataTypes';
import {ForgotPasswordScreen} from '../View/Screens/AuthenticationScreens/ForgotPasswordScreen';

const AppAuthenticationStack =
  createStackNavigator<AuthScreenNavigatorStackParamList>();
const AppBottomTab =
  createBottomTabNavigator<MainAppNavigationStckParamsList>();

const MainAppNavigationContainer = () => {
  const user = useUser().value;
  const handleAuthChanged = useAuthStateChanged();

  useEffect(() => {
    let clean = true;
    return handleAuthChanged();
  }, [user]);

  return (
    <NavigationContainer independent={true}>
      {user === null ? (
        <AppAuthenticationStack.Navigator initialRouteName="SplashScreen">
          <AppAuthenticationStack.Screen
            options={defaultStackScreenConfig}
            name="SplashScreen"
            component={SplashScreen}
          />
          <AppAuthenticationStack.Screen
            options={defaultStackScreenConfig}
            name="Signup"
            component={SignUpScreen}
          />
          <AppAuthenticationStack.Screen
            options={defaultStackScreenConfig}
            name="Signin"
            component={SignInScreen}
          />
          <AppAuthenticationStack.Screen
            options={defaultStackScreenConfig}
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </AppAuthenticationStack.Navigator>
      ) : (
        <AppBottomTab.Navigator
          initialRouteName="Home"
          tabBar={props => <BottomNavbar {...props} />}>
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
          <AppBottomTab.Screen
            options={defaultStackScreenConfig}
            name="Profile"
            component={ProfileScreen}
          />
        </AppBottomTab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainAppNavigationContainer;
