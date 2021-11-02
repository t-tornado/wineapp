import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {ItemCard} from '../OtherComponents/ItemCard';
import {SortHomepage} from '../OtherComponents/SortHomepage';

const Homepage: React.FC = () => {
  return (
    <View style={styles.container}>
      <SortHomepage />
      <ItemCard />
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
