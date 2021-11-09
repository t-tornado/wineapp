import React, {createContext, useContext, useState} from 'react';
import {firestore} from '../../Config/FirebaseApp';

const SearchKeywordContext = createContext();
const LikedItemsContext = createContext();
const AddToLikedFnContext = createContext();
const LikedItemsChangedContext = createContext();
const RemoveFromLikedContext = createContext();
const ItemRemovedContext = createContext();

const MainAppInteractor = props => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const [likedItemsChanged, setLikedItemsChanged] = useState(false);
  const [itemAlreadylikedState, setitemAlreadyLikedState] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);

  function addToLikedItems(userEmail, wine) {
    const likedItem = firestore.FieldValue.arrayUnion(wine);
    const docRef = firestore().collection('users').doc(userEmail);

    if (likedItems.some(it => it.id === wine.id)) {
      setitemAlreadyLikedState(true);
      console.log('--item already liked --');
    } else {
      docRef
        .update({
          likedItems: likedItem,
        })
        .then(() => {
          console.log('item successfully added');
          setLikedItems(its => {
            its.push(wine);
            return its;
          });
          setLikedItemsChanged(p => !p);
        })
        .catch(e =>
          console.log(
            '--ERROR__ MainAppInteractor: Could not add liked item  ',
            e,
          ),
        );
    }
  }

  function handleRemoveFromLikedItems(userEmail, wine) {
    setItemRemoved(false);
    if (likedItems.length > 0) {
      const docRef = firestore().collection('users').doc(userEmail);
      const updateLikedItems = firestore.FieldValue.arrayRemove(wine);
      docRef
        .update({
          likedItems: updateLikedItems,
        })
        .then(() => {
          console.log('-- Wine object removed --');
          setLikedItems(its => {
            const new_Arr = its.filter(wit => wit.id !== wine.id);
            return new_Arr;
          });
          setLikedItemsChanged(p => !p);
          setItemRemoved(true);
        })
        .catch(() => console.log('--ERROR: Failed to remove liked item  '));
    }
  }

  // fetch liked from firebase and set the value to the user's liked item array

  return (
    <SearchKeywordContext.Provider value={[searchKeyword, setSearchKeyword]}>
      <LikedItemsContext.Provider value={likedItems}>
        <AddToLikedFnContext.Provider value={addToLikedItems}>
          <LikedItemsChangedContext.Provider value={likedItemsChanged}>
            <RemoveFromLikedContext.Provider value={handleRemoveFromLikedItems}>
              <ItemRemovedContext.Provider
                value={[itemRemoved, setItemRemoved]}>
                {props.children}
              </ItemRemovedContext.Provider>
            </RemoveFromLikedContext.Provider>
          </LikedItemsChangedContext.Provider>
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
export const useLikedItemsChanged = () => {
  const state = useContext(LikedItemsChangedContext);
  return state;
};
export const useAddToLikedItems = () => {
  const fn = useContext(AddToLikedFnContext);
  return fn;
};
export const useRemoveFromLikedItems = () => {
  const fnc = useContext(RemoveFromLikedContext);
  return fnc;
};
export const useItemRemoved = () => {
  const contextVal = useContext(ItemRemovedContext);
  return contextVal;
};

export default MainAppInteractor;
