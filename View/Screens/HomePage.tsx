import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {WineObject} from '../../Config/KWinefoDataTypes';
import {HomeScreenColors} from '../../Config/Colors';
import {heightDp, widthDp} from '../../Config/Dimensions';
import {
  useFetchLikedItems,
  useItemAlreadyLiked,
  useLikedItems,
  useLikeSuccessPopup,
  useLikeWineFailedState,
  useLoadUserLikedItems,
  useSearchKeyword,
} from '../../Interactor/ComponentInteractors/MainAppInteractor';
import {useUser} from '../../Interactor/WebInteractor/AuthInteractor';
import {
  useCurrentUser,
  useErrorFetchingData,
  useFetchCurrentUser,
  useFetchDataFunction,
  useFetchingDataState,
  useWineData,
} from '../../Interactor/WebInteractor/HomePageInteractor';
import {HeaderMenu} from '../OtherComponents/HomePageComponents/HeaderMenu';
import {IntroductoryHeaderComponent} from '../OtherComponents/HomePageComponents/IntroductoryHeaderComponent';
import WineCard from '../OtherComponents/HomePageComponents/WineCard';
import {LoadingComponent} from '../OtherComponents/LoadingComponent';
import {ItemAlreadyLikedPopup} from '../OtherComponents/Popups/ItemAlreadyLiked';
import {ItemLiked} from '../OtherComponents/Popups/ItemLiked';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LikeFailedPopup} from '../OtherComponents/Popups/LikeFailedPopup';

const Homepage: React.FC = props => {
  const user = useUser().value as FirebaseAuthTypes.User;
  const fetchCurrentUser: Function = useFetchCurrentUser();
  const currentUser = useCurrentUser()[0];
  const fetchData: Function = useFetchDataFunction();
  const fetchingData: boolean = useFetchingDataState();
  const errorFetching: boolean = useErrorFetchingData();
  const fetchResults: WineObject[] = useWineData();
  const [data, setData] = useState<WineObject[] | []>([]);
  const keyword: string = useSearchKeyword().value;
  const [itemAlreadyLiked, setItemAlreadyLiked] = useItemAlreadyLiked();
  const likedItems = useLikedItems() as WineObject[];
  const fetchLikedItems = useFetchLikedItems();
  const showLikeSuccessPopupState = useLikeSuccessPopup();
  const likeFailed = useLikeWineFailedState();
  const loadUserLikedItems = useLoadUserLikedItems();

  function handleRefresh() {
    fetchData();
  }

  function renderItemFunction({item}: {item: WineObject}) {
    if (likedItems.some(it => it.id === item.id)) {
      return (
        <WineCard wineObject={item} likeState={true} navigationProps={props} />
      );
    } else {
      return (
        <WineCard wineObject={item} likeState={false} navigationProps={props} />
      );
    }
  }

  function initAllStates() {
    showLikeSuccessPopupState.setFunction(false);
    setItemAlreadyLiked(false);
    likeFailed.setFunction(false);
  }

  useEffect(() => {
    fetchLikedItems(user.email);
    fetchData();
    fetchCurrentUser(user.email);
    loadUserLikedItems();
  }, [user]);

  useEffect(() => {
    let cleanup = true;
    const __data = fetchResults.filter((item, index) => {
      const {wine, winery, location} = item;
      if (
        wine.toLowerCase().includes(keyword.toLowerCase()) ||
        winery.toLowerCase().includes(keyword.toLowerCase()) ||
        location.toLowerCase().includes(keyword.toLowerCase())
      )
        return true;
      return false;
    });

    if (keyword === '') {
      cleanup && setData(fetchResults);
    } else {
      cleanup && setData(__data);
    }

    return () => {
      cleanup = false;
    };
  }, [keyword, fetchResults]);

  console.log(
    'Wine added to fav popup state  ',
    showLikeSuccessPopupState.value,
  );

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          stickyHeaderIndices={[0]}
          style={{minHeight: heightDp('100'), minWidth: widthDp('100')}}
          ListHeaderComponent={
            <>
              <HeaderMenu />
              <IntroductoryHeaderComponent
                userFirstname={
                  currentUser !== undefined ? currentUser.firstName : ''
                }
              />
            </>
          }
          ListEmptyComponent={
            <LoadingComponent
              errorState={errorFetching}
              fetchingDataState={fetchingData}
              handlerRefresh={handleRefresh}
            />
          }
          contentContainerStyle={{alignItems: 'center'}}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={renderItemFunction}
          maxToRenderPerBatch={60}
          windowSize={20}
          updateCellsBatchingPeriod={60}
          initialNumToRender={100}
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={false} />
          }
        />
      </View>
      <ItemAlreadyLikedPopup
        setVisible={setItemAlreadyLiked}
        visible={itemAlreadyLiked}
      />
      <ItemLiked
        setVisible={showLikeSuccessPopupState.setFunction}
        visible={showLikeSuccessPopupState.value}
      />
      <LikeFailedPopup
        setVisible={likeFailed.setFunction}
        visible={likeFailed.value}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  body: {
    marginTop: '10rem',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: '10rem',
  },
  headerCover: {
    backgroundColor: HomeScreenColors.backgroundColor,
  },
});

export default Homepage;
