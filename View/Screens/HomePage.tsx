import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {WineObject} from '../../Config/CloudData';
import {
  useFetchDataFunction,
  useWineData,
} from '../../Interactor/HomePageInteractor';
import {ItemCard} from '../OtherComponents/ItemCard';
import {SortHomepage} from '../OtherComponents/SortHomepage';

const Homepage: React.FC = props => {
  const fetchData = useFetchDataFunction();
  const data: [WineObject] = useWineData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <SortHomepage />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={({item, index}) => <ItemCard {...item} />}
      />
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
