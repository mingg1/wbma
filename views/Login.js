import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  View,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, Text, ListItem} from 'react-native-elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(false);
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
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        enabled
      >
        <View style={styles.appTitle}>
          <Text h1>RN exercise :D</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Card>
              {formToggle ? (
                <>
                  <Card.Title h4>Login</Card.Title>
                  <Card.Divider />
                  <LoginForm navigation={navigation} />
                </>
              ) : (
                <>
                  <Card.Title h4>Register</Card.Title>
                  <Card.Divider />
                  <RegisterForm navigation={navigation} />
                </>
              )}
              <ListItem
                onPress={() => {
                  setFormToggle(!formToggle);
                }}
              >
                <ListItem.Content>
                  <Text style={styles.text}>
                    {formToggle
                      ? 'No account? Register here.'
                      : 'Already registered? Login here.'}
                  </Text>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </Card>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    marginTop: 60,
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
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
