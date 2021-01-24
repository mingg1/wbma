import React from 'react';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigators';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
};

export default App;
