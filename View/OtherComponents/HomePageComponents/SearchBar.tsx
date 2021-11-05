import React from 'react';
import {View, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightDp, widthDp} from '../../../Config/Dimensions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useState} from 'react';

const HEIGHT = heightDp('8');
const WIDTH = widthDp('70%');
const ICON_S = heightDp('3');

const SearchBoxComponent: React.FC = () => {
  const [input, setInput] = useState<string>('');

  function handleChangedText(text: string) {
    setInput(text);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <EvilIcons size={ICON_S} color="#fff" name="search" />
        <TextInput
          placeholderTextColor="#ffffff80"
          placeholder="Search Your Wine"
          style={styles.textInputBox}
          value={input}
          onChangeText={handleChangedText}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // positioin: 'absolute',
    // backgroundColor: 'blue',
  },
  searchBar: {
    height: '65%',
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: '12rem',
  },
  textInputBox: {
    height: '90%',
    width: '90%',
    paddingVertical: '5rem',
    color: '#fff',
  },
});

export {SearchBoxComponent};
