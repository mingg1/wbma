import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  console.log('isLoggedIn?', isLoggedIn);
  const {checkToken} = useLogin();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
        navigation.navigate('Home');
      } catch (err) {
        console.log('token check failed', err.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.login}>
            <Text>Login</Text>
            <LoginForm navigation={navigation} />
          </View>
          <View style={styles.register}>
            <Text>Register</Text>
            <RegisterForm navigation={navigation} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
