import React, {useEffect} from 'react';
import {useRef} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {WineObject} from '../../Config/CloudData';
import {HomeScreenColors} from '../../Config/Colors';
import {heightDp, widthDp} from '../../Config/Dimensions';
import {
  useErrorFetchingData,
  useFetchDataFunction,
  useFetchingDataState,
  useWineData,
} from '../../Interactor/WebInteractor/HomePageInteractor';
import {HeaderMenu} from '../OtherComponents/HomePageComponents/HeaderMenu';
import {IntroductoryHeaderComponent} from '../OtherComponents/HomePageComponents/IntroductoryHeaderComponent';
import {SearchBoxComponent} from '../OtherComponents/HomePageComponents/SearchBar';
import WineCard from '../OtherComponents/HomePageComponents/WineCard';
import {LoadingComponent} from '../OtherComponents/LoadingComponent';

interface RenderFlatlistFunction {
  item: {};
  index: number;
}

const Homepage: React.FC = props => {
  const fetchData: Function = useFetchDataFunction();
  const fetchingData: boolean = useFetchingDataState();
  const errorFetching: boolean = useErrorFetchingData();
  const scrollRef = useRef();
  const showFetchingComponent = fetchingData || errorFetching;

  function handleRefresh() {
    fetchData();
  }

  function renderItemFunction({item, index}) {
    return <WineCard wineObject={item} navigationProps={props} />;
  }

  const data: [WineObject] = useWineData();

  useEffect(() => {
    fetchData();
  }, []);

  if (scrollRef.current !== undefined) {
    console.log(scrollRef.current._scrollRef);
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
       
      </View> */}
      <View style={styles.body}>
        <FlatList
          stickyHeaderIndices={[0]}
          style={{minHeight: heightDp('100'), minWidth: widthDp('100')}}
          ListHeaderComponent={
            <>
              <HeaderMenu />
              <IntroductoryHeaderComponent />
            </>
          }
          ListEmptyComponent={
            <LoadingComponent
              errorState={errorFetching}
              fetchingDataState={fetchingData}
              handlerRefresh={handleRefresh}
            />
          }
          ref={r => {
            scrollRef.current = r;
          }}
          contentContainerStyle={{alignItems: 'center'}}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={renderItemFunction}
          maxToRenderPerBatch={100}
          windowSize={20}
          updateCellsBatchingPeriod={60}
          initialNumToRender={100}
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={false} />
          }
        />
      </View>
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
    // backgroundColor: HomeScreenColors.backgroundColor,
  },
  header: {
    paddingHorizontal: '10rem',
  },
  headerCover: {
    backgroundColor: HomeScreenColors.backgroundColor,
  },
});

export default Homepage;
