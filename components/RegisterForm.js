import React, {useContext} from 'react';
import {View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {useLogin, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {
    inputs,
    handleInputChange,
    registerErrors,
    checkUserAvailable,
    handleInputEnd,
    validateOnSend,
  } = useSignUpForm();
  const {postRegister} = useUser();
  const {postLogin} = useLogin();

  const doRegister = async () => {
    if (!validateOnSend()) {
      Alert.alert('input validation failed');
      return;
    }
    delete inputs.confirmPssword;
    try {
      const result = await postRegister(inputs);
      console.log('doRegister ok', result.message);
      Alert.alert(result.message);
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (err) {
      console.log('registration error', err);
      Alert.alert('register failed');
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(evt) => {
          checkUserAvailable(evt);
          handleInputEnd('username', evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        onEndEditing={(evt) => {
          handleInputEnd('password', evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
        onEndEditing={(evt) => {
          handleInputEnd('confirmPassword', evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.confirmPssword}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(evt) => {
          handleInputEnd('email', evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.email}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(evt) => {
          handleInputEnd('full_name', evt.nativeEvent.text);
        }}
        errorMessage={registerErrors.full_name}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
