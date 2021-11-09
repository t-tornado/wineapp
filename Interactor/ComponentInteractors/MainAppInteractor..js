import React, {createContext, useContext, useState} from 'react';
import {firestore} from '../../Config/FirebaseApp';

const SearchKeywordContext = createContext();
const LikedItemsContext = createContext();
const AddToLikedFnContext = createContext();

const MainAppInteractor = props => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [likedItems, setLikedItems] = useState([]);

  function addToLikedItems(userEmail, wine) {
    const likedItem = firestore.FieldValue.arrayUnion(wine);
    const docRef = firestore().collection('users').doc(userEmail);
    docRef
      .update({
        likedItems: likedItem,
      })
      .then(() => {
        console.log('item successfully added');
        setLikedItems(it => {
          it.push(wine);
          return it;
        });
      })
      .catch(e =>
        console.log(
          '--ERROR__ MainAppInteractor: Could not add liked item  ',
          e,
        ),
      );
  }

  return (
    <SearchKeywordContext.Provider value={[searchKeyword, setSearchKeyword]}>
      <LikedItemsContext.Provider value={likedItems}>
        <AddToLikedFnContext.Provider value={addToLikedItems}>
          {props.children}
        </AddToLikedFnContext.Provider>
      </LikedItemsContext.Provider>
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

export const useLikedItems = () => {
  const val = useContext(LikedItemsContext);
  return val;
};

export const useAddToLikedItems = () => {
  const fn = useContext(AddToLikedFnContext);
  return fn;
};

export default MainAppInteractor;
