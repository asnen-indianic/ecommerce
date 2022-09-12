import React ,{Component, useEffect} from 'react'
import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';
import {getProduct}from '../../../Api'
const myLoginStatus ='Online'
const FBConfig = ({navigation}: Props) => {
    const [loginStatus,setLoginStatus]=useState(myLoginStatus)
     useEffect(() => {
      remoteConfig()
        .setDefaults({
          isLogin:false,
        })
        .then(() =>remoteConfig().fetchAndActivate()).then(fetch=>{});
        const check = remoteConfig().getValue("isLogin")
        console.log("check login or not",check)
        setLoginStatus(!!check?._value? "Onlie":"Offline")

    }, []);
    
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
         <Text style={{fontSize:18,color:'gray',alignSelf:'center',marginTop:50}}>Firebase Remote Configration.</Text>
         <View style={{height:150,marginHorizontal:20,backgroundColor:'#E5E5E5',marginTop:50,justifyContent:'center',alignItems:'center'}}>
            <Text>My Login Status {loginStatus}</Text>

         </View>
        </View>
      );
};

export default FBConfig