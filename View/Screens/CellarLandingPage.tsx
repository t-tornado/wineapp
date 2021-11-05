import React from 'react';
import {useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {WineObject} from '../../Config/CloudData';
import {
  useErrorFetchingData,
  useFetchDataFunction,
  useFetchingDataState,
  useWineData,
} from '../../Interactor/WebInteractor/HomePageInteractor';
import {CellarWineCard} from '../OtherComponents/CellarComponents/CellarWineCard';
import {CellarPageNavbar} from '../OtherComponents/CellarComponents/Navbar';
import {LoadingComponent} from '../OtherComponents/LoadingComponent';

const CellarLandingScreen: React.FC = props => {
  const fetchCellaDataFunction: Function = useFetchDataFunction();
  const fetchingCellaData: boolean = useFetchingDataState();
  const errorFetchingCellaData: boolean = useErrorFetchingData();
  const data: [WineObject] = useWineData();

  function renderItemFunction({item, index}) {
    return <CellarWineCard wineObject={item} navigationProps={props} />;
  }

  function handleRefreshPage() {
    fetchCellaDataFunction();
  }

  useEffect(() => {
    data.length < 1 ? fetchCellaDataFunction() : null;
  }, []);

  return (
    <View style={styles.container}>
      <CellarPageNavbar />
      <FlatList
        ListEmptyComponent={
          <LoadingComponent
            errorState={errorFetchingCellaData}
            fetchingDataState={fetchingCellaData}
            handlerRefresh={handleRefreshPage}
          />
        }
        contentContainerStyle={{alignItems: 'center'}}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItemFunction}
        maxToRenderPerBatch={30}
        windowSize={20}
        updateCellsBatchingPeriod={60}
        initialNumToRender={100}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefreshPage} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default CellarLandingScreen;
