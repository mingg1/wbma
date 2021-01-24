import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import List from '../components/List';
import GlobalStyles from '../utils/GlobalStyles';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  return (
    // SafeAreaView: only for IOS, but there's a hack for Android
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <List navigation={navigation} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
