import React, {createContext, useContext, useEffect, useState} from 'react';
import {firestore} from '../../Config/FirebaseApp';

const SearchKeywordContext = createContext();
const LikedItemsContext = createContext();
const AddToLikedFnContext = createContext();
const LikedItemsChangedContext = createContext();
const ItemAddedToLikeContext = createContext();
const RemoveFromLikedContext = createContext();
const ItemRemovedContext = createContext();
const ItemAreadyLikedContext = createContext();
const LoadLikedItemsContext = createContext();
const LoadingRemoveStateContext = createContext();

const MainAppInteractor = props => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const [likedItemsChanged, setLikedItemsChanged] = useState(false);
  const [itemAlreadylikedState, setitemAlreadyLikedState] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [itemAddedToLike, setItemAddedTolike] = useState(false);
  const [loadingRemoveState, setLoadingRemoveState] = useState(false);

  function addToLikedItems(userEmail, wine) {
    const likedItem = firestore.FieldValue.arrayUnion(wine);
    const docRef = firestore().collection('users').doc(userEmail);

    if (likedItems.some(it => it.id === wine.id)) {
      setitemAlreadyLikedState(true);
      setItemAddedTolike(false);
    } else {
      docRef
        .update({
          likedItems: likedItem,
        })
        .then(() => {
          setLikedItemsChanged(p => !p);
          setItemAddedTolike(true);
          setLikedItems(its => {
            its.push(wine);
            return its;
          });
        })
        .catch(() => null);
    }
  }

  function handleRemoveFromLikedItems(userEmail, wine) {
    setLoadingRemoveState(true);
    setItemRemoved(false);
    if (likedItems.length > 0) {
      const docRef = firestore().collection('users').doc(userEmail);
      const updateLikedItems = firestore.FieldValue.arrayRemove(wine);
      docRef
        .update({
          likedItems: updateLikedItems,
        })
        .then(() => {
          setItemRemoved(true);
          setLikedItemsChanged(p => !p);
          setLikedItems(its => {
            const new_Arr = its.filter(wit => wit.id !== wine.id);
            return new_Arr;
          });
        })
        .catch(() => null)
        .finally(() => setLoadingRemoveState(false));
    }
  }

  function getUserLikedItems(userEmail) {
    firestore()
      .collection('users')
      .doc(userEmail)
      .get()
      .then(res => {
        if (res.exists) {
          const user = res.data();
          if (user !== null && user.likedItem !== undefined) {
            setLikedItems(user.likedItem);
            setLikedItemsChanged(p => !p);
          }
        }
      })
      .catch(null);
  }

  useEffect(() => {
    let clean = true;
  }, []);

  // fetch liked from firebase and set the value to the user's liked item array

  return (
    <SearchKeywordContext.Provider value={[searchKeyword, setSearchKeyword]}>
      <LikedItemsContext.Provider value={likedItems}>
        <AddToLikedFnContext.Provider value={addToLikedItems}>
          <LikedItemsChangedContext.Provider value={likedItemsChanged}>
            <RemoveFromLikedContext.Provider value={handleRemoveFromLikedItems}>
              <ItemRemovedContext.Provider
                value={[itemRemoved, setItemRemoved]}>
                <ItemAreadyLikedContext.Provider
                  value={[itemAlreadylikedState, setitemAlreadyLikedState]}>
                  <ItemAddedToLikeContext.Provider
                    value={[itemAddedToLike, setItemAddedTolike]}>
                    <LoadLikedItemsContext.Provider value={getUserLikedItems}>
                      <LoadingRemoveStateContext.Provider
                        value={loadingRemoveState}>
                        {props.children}
                      </LoadingRemoveStateContext.Provider>
                    </LoadLikedItemsContext.Provider>
                  </ItemAddedToLikeContext.Provider>
                </ItemAreadyLikedContext.Provider>
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
export const useLoadingRemoveState = () => {
  const state = useContext(LoadingRemoveStateContext);
  return state;
};
export const useItemAlreadyLiked = () => {
  const val = useContext(ItemAreadyLikedContext);
  return val;
};
export const useItemAddedToLike = () => {
  const val = useContext(ItemAddedToLikeContext);
  return val;
};
export const useFetchLikedItems = () => {
  const fn = useContext(LoadLikedItemsContext);
  return fn;
};

export default MainAppInteractor;
