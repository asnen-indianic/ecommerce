import React, {FC, useEffect} from 'react';
import MainNavigation from './App/Navigation';
import {permissions,notificationListener, }from './App/utils/pushController'
const App: FC = () => {
useEffect(() => {
  permissions();
  notificationListener();
}, []);
  return <MainNavigation />;
};

export default App;
