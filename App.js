import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {SafeAreaView} from 'react-native';
import List from './components/List';
import GlobalStyles from './utils/GlobalStyles';

const App = () => {
  return (
    // SafeAreaView: only for IOS, but there's a hack for Android
    <SafeAreaView style={GlobalStyles.container}>
      <List />
      <StatusBar style="light" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default App;
