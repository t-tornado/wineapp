import React, {createContext, useContext, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {firestore} from '../../Config/FirebaseApp';

type Tuple = [
  string | FirebaseAuthTypes.User | FirebaseAuthTypes.UserCredential | null,
  Function,
];
type useStateHookValues = {
  value: Tuple[0];
  setFunction: Tuple[1];
};

const UserEmailContext = createContext<Tuple>([null, () => null]);
const UserPasswordContext = createContext<Tuple>([null, () => null]);
const UsernameContext = createContext<Tuple>([null, () => null]);
const UserContext = createContext<Tuple>([null, () => null]);
const UserFirstNameContext = createContext<Tuple>([null, () => null]);
const UserLastNameContext = createContext<Tuple>([null, () => null]);
const SignoutFnContext = createContext<Function>(() => null);
const SignoutLoadingContext = createContext<boolean>(false);
const SignoutFailedContext = createContext<boolean>(false);

const SignupFnContext = createContext<Function>(() => null);
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
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
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

  function handleSignup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    if (
      [email, password, firstName, lastName].some(
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
              firstName,
              lastName,
            })
            .catch(e => {
              setSignupLoading(false);
              setSignupFailed(true);
              setSignupSuccess(false);
              setSignupFieldEmpty(false);
            });
        })
        .catch(error => {
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
      <UserEmailContext.Provider value={[userEmail, setUserEmail]}>
        <UserFirstNameContext.Provider
          value={[userFirstName, setUserFirstName]}>
          <UserLastNameContext.Provider value={[userLastName, setUserLastName]}>
            <UsernameContext.Provider value={[username, setUsername]}>
              <UserPasswordContext.Provider
                value={[userPassword, setUserPassword]}>
                <SignupFnContext.Provider value={handleSignup}>
                  <SignUpStatesContext.Provider
                    value={[signupLoading, signupSuccess, signupFailed]}>
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
                                        {props.children}
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
          </UserLastNameContext.Provider>
        </UserFirstNameContext.Provider>
      </UserEmailContext.Provider>
    </UserContext.Provider>
  );
};

// const createRawHook = contextVar => {
//   return () => {
//     const contextVal = useContext(contextVar);
//     return contextVal;
//   };
// };
function createRawHook<T>(contextVal: React.Context<T>): () => T {
  return () => {
    const value = useContext(contextVal);
    return value;
  };
}
// const CreateUserHook = (contextVar: React.Context<[]>) => {
//   return () => {
//     const contextVal = useContext(contextVar);
//     return {
//       value: contextVar !== null ? contextVal[0] : null,
//       setFunction: contextVar !== null ? contextVal[1] : null,
//     };
//   };
// };

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

// user hooks
export const useUser = CreateUserHook(UserContext);
export const useUserEmail = CreateUserHook(UserEmailContext);
export const useUserPassword = CreateUserHook(UserPasswordContext);
export const useUsername = CreateUserHook(UsernameContext);
export const useUserFirstName = CreateUserHook(UserFirstNameContext);
export const useUserLastName = CreateUserHook(UserLastNameContext);

// Auth action hooks

export const useSignup = createRawHook(SignupFnContext);
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

export {AuthInteractor};
