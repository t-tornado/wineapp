import React, {createContext, useContext, useState} from 'react';

const UserEmailContext = createContext();
const UserPasswordContext = createContext();
const UsernameContext = createContext();
const UserContext = createContext();

const AuthInteractor = props => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserEmailContext.Provider value={[userEmail, setUserEmail]}>
        <UsernameContext.Provider value={[username, setUsername]}>
          <UserPasswordContext.Provider value={[userPassword, setUserPassword]}>
            {props.children}
          </UserPasswordContext.Provider>
        </UsernameContext.Provider>
      </UserEmailContext.Provider>
    </UserContext.Provider>
  );
};

const CreateHook = contextVar => {
  return () => {
    const contextVal = useContext(contextVar);
    return {
      value: contextVar !== null ? contextVal[0] : null,
      setFunction: contextVar !== null ? contextVal[1] : null,
    };
  };
};

export const useUser = CreateHook(UserContext);
export const useUserEmail = CreateHook(UserEmailContext);
export const useUserPassword = CreateHook(UserPasswordContext);
export const useUsername = CreateHook(UsernameContext);

export {AuthInteractor};
