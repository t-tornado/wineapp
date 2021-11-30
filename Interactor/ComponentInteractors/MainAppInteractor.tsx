import React, {createContext, useContext, useEffect, useState} from 'react';
import {firestore} from '../../Config/FirebaseApp';
import {
  BooleanTuple,
  KWineFoUser,
  StringTuple,
  ValueSetFuncReturnObject,
  WineObject,
} from '../../Config/KWinefoDataTypes';

type SyncLikeAtionResolveVale = {id: number};

const SearchKeywordContext = createContext<StringTuple>(['', () => null]);
const LikedWinesContext = createContext<WineObject[]>([]);
const AddToLikedFnContext = createContext<Function>(() => null);
const LikedItemsChangedContext = createContext<boolean>(false);
const ItemAddedToLikeContext = createContext<BooleanTuple>([false, () => null]);
const RemoveFromLikedContext = createContext<Function>(() => null);
const ItemRemovedContext = createContext<BooleanTuple>([false, () => null]);
const ItemAreadyLikedContext = createContext<BooleanTuple>([false, () => null]);
const LoadLikedItemsContext = createContext<Function>(() => null);
const LoadingRemoveStateContext = createContext<boolean>(false);
const RecentlyLikedItemContext = createContext<number>(NaN);
const ShowLikeSuccessPopupContext = createContext<BooleanTuple>([
  false,
  () => null,
]);
const LikeWineFailedStateContext = createContext<BooleanTuple>([
  false,
  () => null,
]);

const MainAppInteractor: React.FC = props => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [likedItems, setLikedItems] = useState<WineObject[]>([]);
  const [likedItemsChanged, setLikedItemsChanged] = useState(false);
  const [itemAlreadylikedState, setitemAlreadyLikedState] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [itemAddedToLike, setItemAddedTolike] = useState(false);
  const [loadingRemoveState, setLoadingRemoveState] = useState(false);
  const [recentlyLikedWine, setRecentlyLikedWine] = useState(NaN);
  const [showLikeSuccessPopup, setShowLikeSuccessPopup] = useState(false);
  const [showLikeWineFailedState, setShowLikeWineFailedState] = useState(false);

  async function addToCloudLiked(email: string, wine: WineObject) {
    return new Promise(async (resolve, reject) => {
      try {
        const likedItem = firestore.FieldValue.arrayUnion(wine);
        const docRef = await firestore().collection('users').doc(email);
        await docRef.update({
          likedItems: likedItem,
        });
        resolve({id: wine.id} as SyncLikeAtionResolveVale);
      } catch (error) {
        reject({message: error});
      }
    });
  }

  async function addToLikedItems(userEmail: string, wine: WineObject) {
    const likedWines = likedItems;
    if (likedWines.some(item => item.id === wine.id)) {
      setitemAlreadyLikedState(true);
      setShowLikeSuccessPopup(false);
      setShowLikeWineFailedState(false);
    } else {
      setShowLikeSuccessPopup(false);
      setShowLikeWineFailedState(false);
      setRecentlyLikedWine(wine.id);
      const returnValue = (await addToCloudLiked(
        userEmail,
        wine,
      )) as SyncLikeAtionResolveVale;
      if (returnValue && returnValue.id) {
        setLikedItems(items => {
          items.push(wine);
          return items;
        });
        setShowLikeSuccessPopup(true);
        setShowLikeWineFailedState(false);
      } else {
        setShowLikeSuccessPopup(false);
        setShowLikeWineFailedState(true);
        //throw error that unable to add item to liked and clear recently liked wine state to Nan.
        // Show popup as well
      }
    }
  }

  async function handleRemoveFromLikedItems(
    userEmail: string,
    wine: WineObject,
  ) {
    setLoadingRemoveState(true);
    setItemRemoved(false);
    if (likedItems.length > 0) {
      const docRef = await firestore().collection('users').doc(userEmail);
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

  function getUserLikedItems(userEmail: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDocRef = await firestore()
          .collection('users')
          .doc(userEmail)
          .get();
        const userData = userDocRef.data() as KWineFoUser;
        const {likedItems} = userData;
        if (likedItems) {
          setLikedItems(likedItems);
          resolve('success');
        }
      } catch (error) {
        reject('failed');
      }
    });
    // firestore()
    //   .collection('users')
    //   .doc(userEmail)
    //   .get()
    //   .then(res => {
    //     if (res.exists) {
    //       const user = res.data();
    //       if (user && user.likedItems) {
    //         setLikedItems(user.likedItems);
    //       }
    //     }
    //   })
    //   .catch(() => null);
  }

  useEffect(() => {
    let clean = true;
  }, []);

  // fetch liked from firebase and set the value to the user's liked item array

  return (
    <SearchKeywordContext.Provider value={[searchKeyword, setSearchKeyword]}>
      <LikedWinesContext.Provider value={likedItems}>
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
                        <RecentlyLikedItemContext.Provider
                          value={recentlyLikedWine}>
                          <ShowLikeSuccessPopupContext.Provider
                            value={[
                              showLikeSuccessPopup,
                              setShowLikeSuccessPopup,
                            ]}>
                            <LikeWineFailedStateContext.Provider
                              value={[
                                showLikeWineFailedState,
                                setShowLikeWineFailedState,
                              ]}>
                              {props.children}
                            </LikeWineFailedStateContext.Provider>
                          </ShowLikeSuccessPopupContext.Provider>
                        </RecentlyLikedItemContext.Provider>
                      </LoadingRemoveStateContext.Provider>
                    </LoadLikedItemsContext.Provider>
                  </ItemAddedToLikeContext.Provider>
                </ItemAreadyLikedContext.Provider>
              </ItemRemovedContext.Provider>
            </RemoveFromLikedContext.Provider>
          </LikedItemsChangedContext.Provider>
        </AddToLikedFnContext.Provider>
      </LikedWinesContext.Provider>
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

export function useLoadUserLikedItems(): Function {
  const func = useContext(LoadLikedItemsContext);
  return func;
}

export function useLikeWineFailedState(): ValueSetFuncReturnObject<boolean> {
  const value = useContext(LikeWineFailedStateContext);
  return {value: value[0], setFunction: value[1]};
}

export function useLikeSuccessPopup(): ValueSetFuncReturnObject<boolean> {
  const value = useContext(ShowLikeSuccessPopupContext);
  return {
    value: value[0],
    setFunction: value[1],
  };
}

export function useRecentlyLikedWine() {
  const value = useContext<number>(RecentlyLikedItemContext);
  return value;
}

export const useLikedWines = () => {
  const val = useContext(LikedWinesContext);
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
