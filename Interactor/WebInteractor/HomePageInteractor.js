import React, {createContext, useContext, useState} from 'react';
import {APIURL} from '../../Config/CloudData';
import {firestore} from '../../Config/FirebaseApp';

const FetchFunctionContext = createContext();
const WineDataContext = createContext();
const FetchingDataContext = createContext();
const ErrorFetchingDataContext = createContext();
const CurrentUserContext = createContext();
const FetchCurrentUserFnContext = createContext();

const HomepageInteractor = props => {
  const [fetchingData, setFetchingData] = useState(false);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [wineData, setWineData] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  function fetchData() {
    setErrorFetchingData(false);
    setFetchingData(true);
    setWineData([]);
    fetch(APIURL)
      .then(res => res.json())
      .then(data => {
        setWineData(data);
        setFetchingData(false);
        setErrorFetchingData(false);
      })
      .catch(() => {
        setErrorFetchingData(true);
        setFetchingData(false);
      });
  }

  function getCurrentUser(email) {
    console.log('getting current user   ', email);
    firestore()
      .collection('users')
      .doc(email)
      .get()
      .then(data => {
        data.exists && setCurrentUser(data.data());
      })
      .catch(() =>
        console.log('--error-- could not get current user first name'),
      );
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

const CreateRawContext = context => {
  return () => {
    const value = useContext(context);
    return value;
  };
};

export const useFetchDataFunction = CreateRawContext(FetchFunctionContext);
export const useFetchingDataState = CreateRawContext(FetchingDataContext);
export const useErrorFetchingData = CreateRawContext(ErrorFetchingDataContext);
export const useWineData = CreateRawContext(WineDataContext);

// User hooks
export const useFetchCurrentUser = CreateRawContext(FetchCurrentUserFnContext);
export const useCurrentUser = CreateRawContext(CurrentUserContext);

export default HomepageInteractor;
