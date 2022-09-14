import React ,{Component,FC, useEffect} from 'react'
import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import {getProduct}from '../../../Api'
import Colors from '../../../Colors';
import { navigationRef } from '../../../Navigation/RootNavigation';
import Header from '../../../CommonViewUtilities/Header';
const myLoginStatus ='Offline'

interface Props {
  navigation: any;
}
const FBConfig: React.FC<Props> = (props: Props) => {
  const [loginStatus, setLoginStatus] = useState(myLoginStatus);

  useEffect(() => {
    (async () => {
      try {
        // await remoteConfig().setDefaults({test: '1.1'}); // setting default value
        await remoteConfig().fetch(10); // 10 seconds cache
        const activated = remoteConfig().fetchAndActivate(); //can read remote data if true
        if (!!activated) {
          const values = remoteConfig().getAll(); //returns all values set in remote
          if (values?.isOnline?._value == 'true') {
            setLoginStatus('Online'); // state can be set from here
          } else {
            setLoginStatus(myLoginStatus);
          }
        } else {
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header
        goBack={() => navigationRef.goBack()}
        title={'Remote Configration'}
      />
      <Text
        style={{
          fontSize: 18,
          color: 'gray',
          alignSelf: 'center',
          marginTop: 50,
        }}>
        Remote Configration.
      </Text>
      <View
        style={{
          height: 150,
          marginHorizontal: 20,
          backgroundColor: '#E5E5E5',
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>My Login Status {loginStatus}</Text>
      </View>
    </View>
  );
};

export default FBConfig