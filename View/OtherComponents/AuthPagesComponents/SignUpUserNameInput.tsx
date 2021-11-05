import React from 'react';
import {Text, TextInput, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp} from '../../../Config/Dimensions';

const SignUpUsernameInputComponent = () => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputContainerText}>Username</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="username"
          placeholderTextColor="#ffffff90"
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

export {SignUpUsernameInputComponent};
