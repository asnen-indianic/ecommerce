import React, {FC, useEffect} from 'react';
import MainNavigation from './App/Navigation';
import {permissions,notificationListener, }from './App/utils/pushController'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { configureGoogle } from './App/utils/Social/GoogleSignManager';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

 
const App: FC = () => {

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: false,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
      accountName: '',
      scopes: ['profile', 'email'],
      androidClientId:'575795426716-varmedokso4bljqir8da107lgg2r4s31.apps.googleusercontent.com',
      webClientId:
        '575795426716-iierpquv1ipacf3n8ij7topt6fk9ft5j.apps.googleusercontent.com',
    });
 
    // configureGoogle()
    // permissions();
    // notificationListener();
  }, []);


  const handleDynamicLink = link => {
    console.log("linking is ",link)
  // Handle dynamic link inside your own application
  if (link.url === 'https://invertase.io/offer') {
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
