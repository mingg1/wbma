import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Platform, KeyboardAvoidingView, View} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button, Card, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(false);
  console.log('isLoggedIn?', isLoggedIn);
  const {checkToken} = useUser();

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.appTitle}>
        <Text h1>RN exercise :D</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.text}>
          {formToggle ? 'No account?' : 'Already have your account?'}
        </Text>
        <Button
          title={formToggle ? 'Register here' : 'Log in'}
          onPress={() => {
            setFormToggle(!formToggle);
          }}
        />
        {formToggle ? (
          <Card>
            <Card.Title h4>Login</Card.Title>
            <Card.Divider />
            <LoginForm navigation={navigation} />
          </Card>
        ) : (
          <Card>
            <Card.Title h4>Register</Card.Title>
            <Card.Divider />
            <RegisterForm navigation={navigation} />
          </Card>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 2,
  },
  text: {alignSelf: 'center'},
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
