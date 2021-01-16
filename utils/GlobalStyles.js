import {StyleSheet, Platform} from 'react-native';

const THEME_COLOR = '#F67A32';

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: THEME_COLOR,
  },
  container: {
    backgroundColor: THEME_COLOR,
  },
});
