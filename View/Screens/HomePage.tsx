import React, {useEffect} from 'react';
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
} from '../../Interactor/HomePageInteractor';
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderMenu />
        <IntroductoryHeaderComponent />
      </View>
      <View style={styles.body}>
        <FlatList
          stickyHeaderIndices={[0]}
          style={{minHeight: heightDp('100'), minWidth: widthDp('100')}}
          ListHeaderComponent={
            <>
              <SearchBoxComponent />
            </>
          }
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
    backgroundColor: HomeScreenColors.screenBackground,
  },
  header: {
    paddingHorizontal: '15rem',
  },
});

export default Homepage;

/**
 *   <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={renderItemFunction}
          maxToRenderPerBatch={100}
          windowSize={20}
          updateCellsBatchingPeriod={30}
          initialNumToRender={100}
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={false} />
          }
        />
 */
