import React, {useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {WineObject} from '../../Config/CloudData';
import {
  useErrorFetchingData,
  useFetchDataFunction,
  useFetchingDataState,
  useWineData,
} from '../../Interactor/HomePageInteractor';
import ItemCard from '../OtherComponents/ItemCard';
import {LoadingComponent} from '../OtherComponents/LoadingComponent';
import {SortHomepage} from '../OtherComponents/SortHomepage';

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
    return <ItemCard wineObject={item} navigationProps={props} />;
  }

  const data: [WineObject] = useWineData();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <SortHomepage />
      {showFetchingComponent ? (
        <LoadingComponent
          errorState={errorFetching}
          fetchingDataState={fetchingData}
        />
      ) : (
        <FlatList
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Homepage;
