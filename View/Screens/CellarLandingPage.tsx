import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {WineObject} from '../../Config/CloudData';
import {heightDp} from '../../Config/Dimensions';
import {
  useItemRemoved,
  useLikedItems,
  useLikedItemsChanged,
} from '../../Interactor/ComponentInteractors/MainAppInteractor.';
import {CellarPageEmpty} from '../OtherComponents/CellarComponents/CellarPageEmpty';
import {CellarWineCard} from '../OtherComponents/CellarComponents/CellarWineCard';
import {CellarPageNavbar} from '../OtherComponents/CellarComponents/Navbar';
import {ItemRemoved} from '../OtherComponents/Popups/ItemRemoved';

type renderItem = {
  item: Object;
  index: number;
};

const CellarLandingScreen: React.FC = props => {
  const [data, setData] = useState();
  const likedWine = useLikedItems();
  const likedItemsChanged = useLikedItemsChanged();
  const [itemRemoved, setItemRemoved] = useItemRemoved();

  function renderItemFunction({item, index}): React.ReactElement {
    return <CellarWineCard wineObject={item} navigationProps={props} />;
  }

  const resetTimer = () =>
    setTimeout(() => {
      setItemRemoved(false);
    }, 2000);

  useEffect(() => {
    let clean = true;
    if (likedWine.length > 0) {
      setData(likedWine);
    } else {
      setData([]);
    }

    return () => (clean = false);
  }, [likedItemsChanged]);

  useEffect(() => {
    if (itemRemoved) {
      resetTimer();
    }

    return () => {
      clearTimeout(resetTimer());
    };
  }, [itemRemoved]);

  return (
    <View style={styles.container}>
      <CellarPageNavbar numItems={data.length} />
      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: heightDp('15'),
        }}
        ListEmptyComponent={CellarPageEmpty}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItemFunction}
        maxToRenderPerBatch={100}
        windowSize={20}
        updateCellsBatchingPeriod={60}
        initialNumToRender={100}
      />
      <ItemRemoved setVisible={setItemRemoved} visible={itemRemoved} />
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
