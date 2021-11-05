import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignInScreen from '../../View/Screens/AuthenticationScreens/Signin';
import SignUpScreen from '../../View/Screens/AuthenticationScreens/Signup';
import SplashScreen from '../../View/Screens/AuthenticationScreens/SplashScreen';

const AuthenticationStack = createStackNavigator();
const stackScreenConfig = {
  headerShown: false,
};
const AuthenticatioinStackComponent = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="SplashScreen"
        options={stackScreenConfig}
        component={SplashScreen}
      />
      <AuthenticationStack.Screen
        name="Signup"
        options={stackScreenConfig}
        component={SignUpScreen}
      />
      <AuthenticationStack.Screen
        name="Signin"
        options={stackScreenConfig}
        component={SignInScreen}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticatioinStackComponent;
