import React, {useContext} from 'react';
import {View, Button} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useLogInForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLogInForm();
  const {postLogin} = useLogin();
  const {setIsLoggedIn} = useContext(MainContext);

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (err) {
      console.error('postLogin error', err);
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={doLogin} />
    </View>
  );
};
LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
