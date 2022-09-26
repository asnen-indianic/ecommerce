import React, {FC, useEffect} from 'react';
import MainNavigation from './App/Navigation';
import {permissions,notificationListener, }from './App/utils/pushController'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { configureGoogle } from './App/utils/Social/GoogleSignManager';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

 
const App: FC = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '575795426716-dqdinb1v8gif84eioqd5tovho98etbfu.apps.googleusercontent.com',
    });
 
    // configureGoogle()
    // permissions();
    // notificationListener();
  }, []);


  const handleDynamicLink = link => {
    console.log("linking is ",link)
  // Handle dynamic link inside your own application
  if (link.url) {
    // ...navigate to your offers screen
  }
};


useEffect(() => {
  console.log("dfsfsf")
  const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  // When the component is unmounted, remove the listener
  return () => unsubscribe();
}, []);





    return <MainNavigation />;
  };

  

  // return null;





export default App;
