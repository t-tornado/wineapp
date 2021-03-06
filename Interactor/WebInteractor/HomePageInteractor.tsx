import React, {createContext, useContext, useState} from 'react';
import {firestore} from '../../Config/FirebaseApp';
import {KWineFoUser, WineObject} from '../../Config/KWinefoDataTypes';
import {API_URL} from '../../Config/WineAppConfig';

type ReturnContextFunction<type> = () => type;

const FetchFunctionContext = createContext<Function>(() => null);
const WineDataContext = createContext<WineObject[]>([]);
const FetchingDataContext = createContext<boolean>(false);
const ErrorFetchingDataContext = createContext<boolean>(false);
const CurrentUserContext = createContext<[KWineFoUser, Function]>([
  {} as KWineFoUser,
  () => null,
]);
const FetchCurrentUserFnContext = createContext<Function>(() => null);

const HomepageInteractor: React.FC = props => {
  const [fetchingData, setFetchingData] = useState(false);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [wineData, setWineData] = useState<WineObject[]>([]);
  const [currentUser, setCurrentUser] = useState<KWineFoUser>(
    {} as KWineFoUser,
  );

  function fetchData() {
    setErrorFetchingData(false);
    setFetchingData(true);
    setWineData([]);
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await (await fetch(API_URL)).json();
        resolve(resp);
        setFetchingData(false);
        setErrorFetchingData(false);
      } catch (error) {
        reject(error);
        setFetchingData(false);
        setErrorFetchingData(true);
      }
    });
  }

  function getCurrentUser(email: string) {
    return new Promise(async (res, rej) => {
      try {
        const user = await firestore().collection('users').doc(email).get();
        res(user.data());
      } catch (error) {
        // could not get current user action
        null;
      }
    });
  }

  return (
    <FetchFunctionContext.Provider value={fetchData}>
      <WineDataContext.Provider value={wineData}>
        <FetchingDataContext.Provider value={fetchingData}>
          <ErrorFetchingDataContext.Provider value={errorFetchingData}>
            <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
              <FetchCurrentUserFnContext.Provider value={getCurrentUser}>
                {props.children}
              </FetchCurrentUserFnContext.Provider>
            </CurrentUserContext.Provider>
          </ErrorFetchingDataContext.Provider>
        </FetchingDataContext.Provider>
      </WineDataContext.Provider>
    </FetchFunctionContext.Provider>
  );
};

function CreateHookFromContext<Type>(
  contextValue: React.Context<Type>,
): ReturnContextFunction<Type> {
  return () => {
    const value = useContext(contextValue) as Type;
    return value;
  };
}

export const useFetchDataFunction =
  CreateHookFromContext<Function>(FetchFunctionContext);
export const useFetchingDataState =
  CreateHookFromContext<boolean>(FetchingDataContext);
export const useErrorFetchingData = CreateHookFromContext<boolean>(
  ErrorFetchingDataContext,
);
export const useWineData = CreateHookFromContext<WineObject[]>(WineDataContext);

// User hooks
export const useFetchCurrentUser = CreateHookFromContext<Function>(
  FetchCurrentUserFnContext,
);
export const useCurrentUser =
  CreateHookFromContext<[KWineFoUser, Function]>(CurrentUserContext);

export default HomepageInteractor;
