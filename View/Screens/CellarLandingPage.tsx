import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  CellarLandingPageScreenProp,
  WineObject,
} from '../../Config/KWinefoDataTypes';
import {heightDp} from '../../Config/Dimensions';
import {
  useItemRemoved,
  useLikedWines,
  useLikedItemsChanged,
} from '../../Interactor/ComponentInteractors/MainAppInteractor';
import {CellarPageEmpty} from '../OtherComponents/CellarComponents/CellarPageEmpty';
import {CellarWineCard} from '../OtherComponents/CellarComponents/CellarWineCard';
import {CellarPageNavbar} from '../OtherComponents/CellarComponents/Navbar';
import {ItemRemoved} from '../OtherComponents/Popups/ItemRemoved';

const CellarLandingScreen: React.FC<CellarLandingPageScreenProp> = props => {
  const [data, setData] = useState<WineObject[] | []>();
  const likedWines = useLikedWines() as [];
  const likedItemsChanged = useLikedItemsChanged();
  const [itemRemoved, setItemRemoved] = useItemRemoved();
  const [numItems, setNumItems] = useState<number>();

  function renderItemFunction({item}: {item: WineObject}) {
    return <CellarWineCard WineObject={item} navigation={props} />;
  }

  const resetTimer = () =>
    setTimeout(() => {
      setItemRemoved(false);
    }, 2000);

  useEffect(() => {
    let clean = true;
    if (likedWines.length > 0) {
      setData(likedWines);
      setNumItems(likedWines.length);
    } else {
      setData([]);
      setNumItems(0);
    }

    return () => {
      clean = false;
    };
  }, [likedItemsChanged, likedWines]);

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
      <CellarPageNavbar numItems={numItems as number} />
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
