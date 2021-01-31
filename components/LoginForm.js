import React, {useContext, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput';
import useLogInForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {inputs, handleInputChange} = useLogInForm();
  const {postLogin} = useLogin();
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const doLogin = async () => {
    setLoading(true);
    try {
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('postLogin error', err);
      Alert.alert('Invalid username or password');
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
      <Button title="Login" onPress={doLogin} loading={loading} />
    </View>
  );
};
LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
