import React, {createContext, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firestore} from '../../Config/FirebaseApp';

const UserEmailContext = createContext();
const UserPasswordContext = createContext();
const UsernameContext = createContext();
const UserContext = createContext();
const UserFirstNameContext = createContext();
const UserLastNameContext = createContext();
const SignupFnContext = createContext();
const SignUpStatesContext = createContext();
const ResetSignupStatesContext = createContext();
const AuthStateChangedContext = createContext();
const SigninFnContext = createContext();
const SigninStatesContext = createContext();
const SigninUserNotFoundStateContext = createContext();
const SigninInvalidInputErrorContext = createContext();
const ResetSigninStatesContext = createContext();

const AuthInteractor = props => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  // SignUp States
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupFailed, setSignupFaied] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  // Signin States
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [signinFailed, setSigninFailed] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [signinInvalidInputError, setSigninInvalidInputError] = useState(false);

  function handleSignup(email, password, firstName, lastName) {
    if ([email, password, username].includes(undefined || '')) {
      console.log('input Fields are empty');
      null;
    } else {
      setSignupLoading(true);
      setSignupFaied(false);
      setSignupSuccess(false);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const setNewUserDoc = () => {
            firestore()
              .collection('users')
              .add({
                email,
                firstName,
                lastName,
              })
              .then(() => {
                setSignupSuccess(true);
                setSignupLoading(false);
                setSignupFaied(false);
              })
              .catch(e => {
                console.log('could not create user document', e);
                setNewUserDoc();
              });
          };
          setNewUserDoc();
        })
        .catch(error => {
          console.log('--error-- Could not create user  ', error);
          setSignupFaied(true);
          setSignupLoading(false);
          setSignupSuccess(false);
        });
    }
  }

  function handleSignin(email, password) {
    if ([email, password].includes(undefined || '')) {
      console.log('Fields are empty, show pop-up');
      null;
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
          console.log(error.message);
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
        });
    }
  }
  let ad = 'adf';

  function handleAuthStateChanged() {
    const unsubscribeFn = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribeFn;
  }

  function resetSigninStates() {
    setSigninFailed(false);
    setSigninSuccess(false);
    setSigninLoading(false);
  }

  function resetSignupStates() {
    setSignupLoading(false);
    setSignupFaied(false);
    setSignupSuccess(false);
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
                              <ResetSigninStatesContext.Provider
                                value={resetSigninStates}>
                                <ResetSignupStatesContext.Provider
                                  value={resetSignupStates}>
                                  {props.children}
                                </ResetSignupStatesContext.Provider>
                              </ResetSigninStatesContext.Provider>
                            </SigninStatesContext.Provider>
                          </SigninInvalidInputErrorContext.Provider>
                        </SigninUserNotFoundStateContext.Provider>
                      </SigninFnContext.Provider>
                    </AuthStateChangedContext.Provider>
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

const createRawHook = contextVar => {
  return () => {
    const contextVal = useContext(contextVar);
    return contextVal;
  };
};
const CreateUserHook = contextVar => {
  return () => {
    const contextVal = useContext(contextVar);
    return {
      value: contextVar !== null ? contextVal[0] : null,
      setFunction: contextVar !== null ? contextVal[1] : null,
    };
  };
};
const CreateAuthStatesHook = contextVar => {
  return () => {
    const states = useContext(contextVar);
    return {
      loading: states[0],
      sucess: states[1],
      failed: states[2],
    };
  };
};

export const useUser = CreateUserHook(UserContext);
export const useUserEmail = CreateUserHook(UserEmailContext);
export const useUserPassword = CreateUserHook(UserPasswordContext);
export const useUsername = CreateUserHook(UsernameContext);
export const useUserFirstName = CreateUserHook(UserFirstNameContext);
export const useUserLastName = CreateUserHook(UserLastNameContext);

export const useSignup = createRawHook(SignupFnContext);
export const useSignupStates = CreateAuthStatesHook(SignUpStatesContext);
export const useResetSignupStates = createRawHook(ResetSignupStatesContext);
export const useSignin = createRawHook(SigninFnContext);
export const useSigninStates = CreateAuthStatesHook(SigninStatesContext);
export const useSigninInvalidInput = createRawHook(
  SigninInvalidInputErrorContext,
);
export const useSigninUserNotFound = createRawHook(
  SigninUserNotFoundStateContext,
);
export const useResetSigninStates = createRawHook(ResetSigninStatesContext);

export const useAuthStateChanged = createRawHook(AuthStateChangedContext);

export {AuthInteractor};
