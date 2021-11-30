import React, {createContext, useContext, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppUser, firestore} from '../../Config/FirebaseApp';
import {
  BooleanTuple,
  KWineFoUser,
  StringTuple,
} from '../../Config/KWinefoDataTypes';
import {firebase} from '@react-native-firebase/firestore';

type Tuple = [
  string | FirebaseAuthTypes.User | FirebaseAuthTypes.UserCredential | null,
  Function,
];
type useStateHookValues = {
  value: Tuple[0];
  setFunction: Tuple[1];
};

type SignupFunction = (
  email: string,
  password: string,
  fullName: string,
  username: string,
) => void;

const UserEmailContext = createContext<StringTuple>(['', () => null]);
const UserPasswordContext = createContext<StringTuple>(['', () => null]);
const UsernameContext = createContext<StringTuple>(['', () => null]);
const UserContext = createContext<Tuple>([null, () => null]);
const UserFullNameContext = createContext<StringTuple>(['', () => null]);
const SignoutFnContext = createContext<Function>(() => null);
const SignoutLoadingContext = createContext<boolean>(false);
const SignoutFailedContext = createContext<boolean>(false);
const UserRepeatedPasswordContext = createContext<StringTuple>([
  '',
  () => null,
]);
// RESET PASSWORD
const HandleRestPasswordContext = createContext<Function>(() => null);
const ForgotPasswordResetEmailSuccessContext = createContext<BooleanTuple>([
  false,
  () => null,
]);
const ForgotPasswordResetEmailFailedContext = createContext<BooleanTuple>([
  false,
  () => null,
]);
const ForgotPasswordUserNotFoundContext = createContext<BooleanTuple>([
  false,
  () => null,
]);
const LoadingResetPasswordContext = createContext<boolean>(false);

const SignupFnContext = createContext<SignupFunction>(() => null);
const SignUpStatesContext = createContext<[boolean, boolean, boolean]>([
  false,
  false,
  false,
]);
const SignupFieldEmptyErrorContext = createContext<boolean>(false);

const AuthStateChangedContext = createContext<Function>(() => null);
const SigninFnContext = createContext<Function>(() => null);
const SigninStatesContext = createContext<[boolean, boolean, boolean]>([
  false,
  false,
  false,
]);
const SigninUserNotFoundStateContext = createContext<boolean>(false);
const SigninInvalidInputErrorContext = createContext<boolean>(false);

const ResetAuthStatesContext = createContext<Function>(() => null);

const AuthInteractor: React.FC = props => {
  const [user, setUser] = useState<Tuple[0]>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRepeatedPassword, setUserRepeatedPassword] = useState<string>('');
  const [username, setUsername] = useState('');
  const [userFullName, setUserFullName] = useState('');
  // SignUp States
  const [signupFieldEmpty, setSignupFieldEmpty] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  // Signin States
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [signinFailed, setSigninFailed] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [signinInvalidInputError, setSigninInvalidInputError] = useState(false);

  const [signoutLoading, setSignoutLoading] = useState(false);
  const [signoutFailed, setSignoutFailed] = useState(false);
  // [auth/weak-password]
  // Forgot pasword popups
  const [resetEmailSuccess, setResetEmailSuccess] = useState(false);
  const [resetEmailError, setResetEmailError] = useState(false);
  const [forgotPasswordUsernotFound, setForgotPasswordUsernotFound] =
    useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);

  function handleSignup(
    email: string,
    password: string,
    fullName: string,
    username: string,
  ) {
    if (
      [email, password, fullName, username].some(
        it => it === undefined || it === '',
      )
    ) {
      setSignupFieldEmpty(true);
      setSignupFailed(true);
      setSignupLoading(false);
      setSignupSuccess(false);
    } else {
      setSignupLoading(true);
      setSignupFailed(false);
      setSignupSuccess(false);
      setSignupFieldEmpty(false);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(email)
            .set({
              email,
              fullName,
              username,
            })
            .catch(e => {
              setSignupLoading(false);
              setSignupFailed(true);
              setSignupSuccess(false);
              setSignupFieldEmpty(false);
            });
        })
        .catch(() => {
          setSignupFailed(true);
          setSignupLoading(false);
          setSignupSuccess(false);
          setSignupFieldEmpty(false);
        });
    }
  }

  function handleSignin(email: string, password: string) {
    if ([email, password].some(it => it === undefined || it === '')) {
      setSigninLoading(false);
      setSigninSuccess(false);
      setSigninFailed(true);
      setUserNotFound(false);
      setSigninInvalidInputError(true);
    } else {
      setSigninLoading(true);
      setSigninSuccess(false);
      setSigninFailed(false);
      setUserNotFound(false);
      setSigninInvalidInputError(false);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          setUser(user);
          setSigninSuccess(true);
          setSigninLoading(false);
          setSigninFailed(false);
          setUserNotFound(false);
          setSigninInvalidInputError(false);
        })
        .catch(error => {
          if (error.message.startsWith('[auth/wrong-password]')) {
            setSigninInvalidInputError(true);
            setUserNotFound(false);
          } else if (error.message.startsWith('[auth/user-not-found]')) {
            setUserNotFound(true);
            setSigninInvalidInputError(false);
          }

          setSigninFailed(true);
          setSigninSuccess(false);
          setSigninLoading(false);
          // depending on the error, show a popup that either shows a wrong credentials or
          // account registered
        })
        .finally(() => {
          setSigninSuccess(false);
          setSigninLoading(false);
          setSigninFailed(false);
        });
    }
  }

  function handleSignout() {
    setSignoutLoading(true);
    setSignoutFailed(false);
    auth()
      .signOut()
      .then(() => {
        setSignoutLoading(false);
        setUser(null);
        setSignoutFailed(false);
      })
      .catch(() => {
        setSignoutLoading(false);
        setSignoutFailed(true);
      });
  }

  async function handleResetPassword(userEmail: string) {
    setResetEmailSuccess(false);
    setResetEmailError(false);
    setUserNotFound(false);
    setLoadingResetPassword(true);
    try {
      const users = (
        await firestore().collection('users').get({source: 'server'})
      ).docs;
      let userfound: boolean = false;
      users.forEach(async user => {
        if (user.exists) {
          const userData = user.data() as KWineFoUser;
          const {email} = userData;
          if (email === userEmail) {
            userfound = true;
            const emailSent = await AppUser.sendPasswordResetEmail(userEmail);
            console.log('Response from email sent   ', emailSent);
            // {
            //   .then(() => {
            //     setResetEmailSuccess(true);
            //     setResetEmailError(false);
            //     setUserNotFound(false);
            //     setLoadingResetPassword(false);
            //   })
            //   .catch(e => {
            //     userfound = false;
            //     setResetEmailSuccess(false);
            //     setResetEmailError(true);
            //     setForgotPasswordUsernotFound(false);
            //     setLoadingResetPassword(false);
            //   });
            // }
          }
        }
      });
      // if uer does not exist, show popup for user to create new account.
      if (!userfound) {
        setForgotPasswordUsernotFound(true);
        setLoadingResetPassword(false);
        setResetEmailSuccess(false);
        setResetEmailError(false);
      }
    } catch (error) {
      if (error.message.startsWith('[firestore/unavailable] ')) {
        setForgotPasswordUsernotFound(false);
        setLoadingResetPassword(false);
        setResetEmailSuccess(false);
        setResetEmailError(true);
      }
    }
  }

  function handleAuthStateChanged() {
    const unsubscribeFn = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribeFn;
  }

  function resetAuthStates() {
    setSigninFailed(false);
    setSigninSuccess(false);
    setSigninLoading(false);
    setSignupLoading(false);
    setSignupFailed(false);
    setSignupSuccess(false);
    setSignupFieldEmpty(false);
    setUserNotFound(false);
  }
  return (
    <UserContext.Provider value={[user, setUser]}>
      <ForgotPasswordResetEmailFailedContext.Provider
        value={[resetEmailError, setResetEmailError]}>
        <LoadingResetPasswordContext.Provider value={loadingResetPassword}>
          <ForgotPasswordResetEmailSuccessContext.Provider
            value={[resetEmailSuccess, setResetEmailSuccess]}>
            <ForgotPasswordUserNotFoundContext.Provider
              value={[
                forgotPasswordUsernotFound,
                setForgotPasswordUsernotFound,
              ]}>
              <UserEmailContext.Provider value={[userEmail, setUserEmail]}>
                <UserFullNameContext.Provider
                  value={[userFullName, setUserFullName]}>
                  <UserRepeatedPasswordContext.Provider
                    value={[userRepeatedPassword, setUserRepeatedPassword]}>
                    <UsernameContext.Provider value={[username, setUsername]}>
                      <UserPasswordContext.Provider
                        value={[userPassword, setUserPassword]}>
                        <SignupFnContext.Provider value={handleSignup}>
                          <SignUpStatesContext.Provider
                            value={[
                              signupLoading,
                              signupSuccess,
                              signupFailed,
                            ]}>
                            <SignupFieldEmptyErrorContext.Provider
                              value={signupFieldEmpty}>
                              <AuthStateChangedContext.Provider
                                value={handleAuthStateChanged}>
                                <SigninFnContext.Provider value={handleSignin}>
                                  <SigninUserNotFoundStateContext.Provider
                                    value={userNotFound}>
                                    <SigninInvalidInputErrorContext.Provider
                                      value={signinInvalidInputError}>
                                      <SigninStatesContext.Provider
                                        value={[
                                          signinLoading,
                                          signinSuccess,
                                          signinFailed,
                                        ]}>
                                        <ResetAuthStatesContext.Provider
                                          value={resetAuthStates}>
                                          <SignoutFnContext.Provider
                                            value={handleSignout}>
                                            <SignoutLoadingContext.Provider
                                              value={signoutLoading}>
                                              <SignoutFailedContext.Provider
                                                value={signoutFailed}>
                                                <HandleRestPasswordContext.Provider
                                                  value={handleResetPassword}>
                                                  {props.children}
                                                </HandleRestPasswordContext.Provider>
                                              </SignoutFailedContext.Provider>
                                            </SignoutLoadingContext.Provider>
                                          </SignoutFnContext.Provider>
                                        </ResetAuthStatesContext.Provider>
                                      </SigninStatesContext.Provider>
                                    </SigninInvalidInputErrorContext.Provider>
                                  </SigninUserNotFoundStateContext.Provider>
                                </SigninFnContext.Provider>
                              </AuthStateChangedContext.Provider>
                            </SignupFieldEmptyErrorContext.Provider>
                          </SignUpStatesContext.Provider>
                        </SignupFnContext.Provider>
                      </UserPasswordContext.Provider>
                    </UsernameContext.Provider>
                  </UserRepeatedPasswordContext.Provider>
                </UserFullNameContext.Provider>
              </UserEmailContext.Provider>
            </ForgotPasswordUserNotFoundContext.Provider>
          </ForgotPasswordResetEmailSuccessContext.Provider>
        </LoadingResetPasswordContext.Provider>
      </ForgotPasswordResetEmailFailedContext.Provider>
    </UserContext.Provider>
  );
};

function createRawHook<T>(contextVal: React.Context<T>): () => T {
  return () => {
    const value = useContext(contextVal) as T;
    return value;
  };
}

function CreateUserHook(
  contextValue: React.Context<Tuple>,
): () => useStateHookValues {
  return () => {
    const value = useContext(contextValue);
    return {
      value: value[0],
      setFunction: value[1],
    };
  };
}

const CreateAuthStatesHook = (
  contextVar: React.Context<[boolean, boolean, boolean]>,
) => {
  return () => {
    const states = useContext(contextVar);
    return {
      loading: states[0],
      sucess: states[1],
      failed: states[2],
    };
  };
};

function CreateValueNSetValueObjHook<T>(
  contextValue: React.Context<[T, Function]>,
) {
  return () => {
    const value = useContext(contextValue);
    return {
      value: value[0],
      setFunction: value[1],
    };
  };
}

export function useUserRepeatedPassword() {
  const value = useContext(UserRepeatedPasswordContext);
  return {
    value: value[0],
    setFunction: value[1],
  };
}

// user hooks
export const useUser = CreateUserHook(UserContext);
export const useUserEmail =
  CreateValueNSetValueObjHook<string>(UserEmailContext);
// export const useUserEmail = CreateUserHook(UserEmailContext);
export const useUserPassword = CreateValueNSetValueObjHook(UserPasswordContext);
export const useUsername = CreateValueNSetValueObjHook(UsernameContext);
export const useUserFullName = CreateValueNSetValueObjHook(UserFullNameContext);

// Auth action hooks

export const useSignup = createRawHook<SignupFunction>(SignupFnContext);
export const useSignupStates = CreateAuthStatesHook(SignUpStatesContext);
export const useSignupFieldEmptyError = createRawHook(
  SignupFieldEmptyErrorContext,
);
// Sign in hooks
export const useSignin = createRawHook(SigninFnContext);
export const useSigninStates = CreateAuthStatesHook(SigninStatesContext);
export const useSigninInvalidInput = createRawHook(
  SigninInvalidInputErrorContext,
);
export const useSigninUserNotFound = createRawHook(
  SigninUserNotFoundStateContext,
);

//sign out
export const useSignoutFailed = createRawHook(SignoutFailedContext);
export const useSignOut = createRawHook(SignoutFnContext);
export const useSignoutLoading = createRawHook(SignoutLoadingContext);

export const useResetAuthStates = createRawHook(ResetAuthStatesContext);
export const useAuthStateChanged = createRawHook(AuthStateChangedContext);

// Reset Password
export const useResetPassword = createRawHook(HandleRestPasswordContext);

// Reset password Popup
export const useResetPasswordEmailSuccess = CreateValueNSetValueObjHook(
  ForgotPasswordResetEmailSuccessContext,
);
export const useResetPasswordEmailFailed = CreateValueNSetValueObjHook(
  ForgotPasswordResetEmailFailedContext,
);
export const useResetPasswordUsernotFound = CreateValueNSetValueObjHook(
  ForgotPasswordUserNotFoundContext,
);
export const useLodingResetPassword = createRawHook(
  LoadingResetPasswordContext,
);

export {AuthInteractor};
