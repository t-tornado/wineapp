import {StackScreenProps} from '@react-navigation/stack';

export type AuthScreenTypes = 'Signin' | 'Signup';
export type AuthLoadingText =
  | 'Signing In'
  | 'Signing up'
  | 'Resetting password';
export interface LikedWineObject {
  id: string;
  image: string;
  location: string;
}

export interface KWineFoUser {
  email: string;
  fullName: string;
  username: string;
  likedItems: Array<LikedWineObject>;
}

export type ratings = {
  average: string;
  reviews: string;
};

export interface WineObject {
  winery: string;
  wine: string;
  rating: ratings;
  id: number;
  image: string;
  location: string;
}

export interface WineCardProps {
  wineObject: WineObject;
  navigationProps: {};
  likeState: boolean;
}

export type AuthScreenNavigatorStackParamList = {
  SplashScreen: undefined;
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
};

export type MainAppNavigationStckParamsList = {
  Home: undefined;
  Cellar: undefined;
  Profile: undefined;
};

export type HomeButtonStackParamList = {
  HomePage: undefined;
  WinePage: {
    wineObject: WineObject;
    likeState: boolean;
  };
};

export type SigninScreenProps = StackScreenProps<
  AuthScreenNavigatorStackParamList,
  'Signin'
>;
export type SignupScreenProps = StackScreenProps<
  AuthScreenNavigatorStackParamList,
  'Signup'
>;

export type ForgotPasswordScreenprops = StackScreenProps<
  AuthScreenNavigatorStackParamList,
  'ForgotPassword'
>;

export type CellarStackParamList = {
  CellarLandingPage: WineObject | undefined;
  CellarWinePage: {WineObject: WineObject} | undefined;
};

export type CellarLandingPageScreenProp = StackScreenProps<
  CellarStackParamList,
  'CellarLandingPage'
>;

export type CellarWinePageScreenProps = StackScreenProps<
  CellarStackParamList,
  'CellarWinePage'
>;

export type WinePageScreenProps = StackScreenProps<
  HomeButtonStackParamList,
  'WinePage'
>;
export type BooleanTuple = [boolean, Function];
export type StringTuple = [string, Function];
export type ValueSetFuncReturnObject<t> = {
  value: t;
  setFunction: Function;
};
// OBJECT TYPES
export type UseStateValuesAsObject<Type> = {
  value: Type;
  setFunction: Function;
};

// FUNCTION TYPES
