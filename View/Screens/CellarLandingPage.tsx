import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {WineObject} from '../../Config/CloudData';
import {
  useLikedItems,
  useLikedItemsChanged,
} from '../../Interactor/ComponentInteractors/MainAppInteractor.';
import {CellarWineCard} from '../OtherComponents/CellarComponents/CellarWineCard';
import {CellarPageNavbar} from '../OtherComponents/CellarComponents/Navbar';

const CellarLandingScreen: React.FC = props => {
  const [data, setData] = useState([]);
  const likedWine = useLikedItems();
  const likedItemsChanged = useLikedItemsChanged();

  function renderItemFunction({item, index}) {
    return <CellarWineCard wineObject={item} navigationProps={props} />;
  }

  console.log(likedWine);

  useEffect(() => {
    let clean = true;
    if (likedWine.length > 0) {
      setData(likedWine);
    } else {
      setData([]);
    }

    return () => (clean = false);
  }, [likedItemsChanged]);

  return (
    <View style={styles.container}>
      <CellarPageNavbar numItems={data.length} />
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItemFunction}
        maxToRenderPerBatch={100}
        windowSize={20}
        updateCellsBatchingPeriod={60}
        initialNumToRender={100}
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
