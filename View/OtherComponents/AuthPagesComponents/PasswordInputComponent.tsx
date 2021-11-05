import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput} from 'react-native-gesture-handler';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp} from '../../../Config/Dimensions';

const PasswordInputComponent = () => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputContainerText}>Password</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="password"
          placeholderTextColor="#ffffff90"
        />
      </View>
      <Text style={styles.inputContainerText}>Forgot Password?</Text>
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
    width: '100%',
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

export {PasswordInputComponent};
