import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp} from '../../../Config/Dimensions';
import {useUsername} from '../../../Interactor/WebInteractor/AuthInteractor';

const UsernameField = () => {
  const [value, setValue] = useState('');
  const setUsername = useUsername().setFunction;

  function handleChangedText(text: string) {
    setValue(text);
  }

  useEffect(() => {
    let cleanup = true;
    cleanup && setUsername(value);

    return () => {
      cleanup = false;
    };
  }, [value]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputContainerText}>Username</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          value={value}
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor="#ffffff90"
          onChangeText={handleChangedText}
          selectTextOnFocus={true}
          clearTextOnFocus={true}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  inputContainer: {
    height: heightDp('10'),
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: '10rem',
  },
  inputContainerText: {
    color: '#fff',
    fontSize: '12rem',
    marginBottom: '10rem',
  },
  textInput: {
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: '13rem',
    paddingLeft: '10rem',
  },
  textInputContainer: {
    width: '100%',
    height: '60%',
    borderColor: `${SplashScreenColors.backgroundColor}`,
    borderWidth: '2rem',
    justifyContent: 'center',
    borderRadius: '10rem',
  },
});

export {UsernameField};
