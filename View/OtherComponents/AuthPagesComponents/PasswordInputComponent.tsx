import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInput} from 'react-native-gesture-handler';
import {SplashScreenColors} from '../../../Config/Colors';
import {heightDp} from '../../../Config/Dimensions';
import {HidePasswordChars} from '../../../Config/HelperFunctions/JSHelperFunctions';
import {useUserPassword} from '../../../Interactor/WebInteractor/AuthInteractor';

type PasswordInputProps = {
  type: 'Signin' | 'Signup';
};

const PasswordInputComponent: React.FC<PasswordInputProps> = () => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState<boolean>(true);
  const setUserPassword = useUserPassword().setFunction;

  function handleTextChanged(text: string) {
    setValue(text);
  }

  function handleVisibleState() {
    setVisible(p => !p);
  }

  useEffect(() => {
    let cleanup = true;
    cleanup && setUserPassword(value);
    // cleanup && setDisplayPassword(HidePasswordChars(value));

    return () => {
      cleanup = false;
    };
  }, [value]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputContainerText}>Password</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          value={value}
          style={styles.textInput}
          placeholder="password"
          placeholderTextColor="#ffffff90"
          onChangeText={handleTextChanged}
          selectTextOnFocus={true}
          clearTextOnFocus={true}
          secureTextEntry={visible}
        />
        <TouchableOpacity
          onPress={handleVisibleState}
          activeOpacity={0.8}
          style={styles.showStateContainer}>
          <Text style={styles.showText}>{visible ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
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
  showText: {
    color: '#ffffff90',
    fontSize: '12rem',
  },
  showStateContainer: {
    alignSelf: 'center',
  },
  textInput: {
    height: '90%',
    width: '85%',
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
    flexDirection: 'row',
  },
});

export {PasswordInputComponent};
