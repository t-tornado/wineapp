import React, {createContext, useContext, useState} from 'react';
import {APIURL} from '../Config/CloudData';

const FetchFunctionContext = createContext();
const WineDataContext = createContext();
const FetchingDataContext = createContext();
const ErrorFetchingDataContext = createContext();

const HomepageInteractor = props => {
  const [fetchingData, setFetchingData] = useState(false);
  const [errorFetchingData, setErrorFetchingData] = useState(false);
  const [wineData, setWineData] = useState([]);

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

  return (
    <FetchFunctionContext.Provider value={fetchData}>
      <WineDataContext.Provider value={wineData}>
        <FetchingDataContext.Provider value={fetchingData}>
          <ErrorFetchingDataContext.Provider value={errorFetchingData}>
            {props.children}
          </ErrorFetchingDataContext.Provider>
        </FetchingDataContext.Provider>
      </WineDataContext.Provider>
    </FetchFunctionContext.Provider>
  );
};

const CreateContext = context => {
  return () => {
    const value = useContext(context);
    return value;
  };
};

export const useFetchDataFunction = CreateContext(FetchFunctionContext);
export const useFetchingDataState = CreateContext(FetchingDataContext);
export const useErrorFetchingData = CreateContext(ErrorFetchingDataContext);
export const useWineData = CreateContext(WineDataContext);

export default HomepageInteractor;
