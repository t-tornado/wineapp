import React, {createContext, useContext, useState} from 'react';

const SearchKeywordContext = createContext();
const SetSearchKeywordContext = createContext();

const MainAppInteractor = props => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <SearchKeywordContext.Provider value={[searchKeyword, setSearchKeyword]}>
      {props.children}
    </SearchKeywordContext.Provider>
  );
};

export function useSearchKeyword() {
  const value = useContext(SearchKeywordContext);
  return {
    value: value[0],
    setFunction: value[1],
  };
}

export default MainAppInteractor;
