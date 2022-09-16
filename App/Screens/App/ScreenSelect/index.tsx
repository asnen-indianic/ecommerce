import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { navigate, navigationRef} from '../../../Navigation/RootNavigation';
import Colors from '../../../Colors';
import auth from '@react-native-firebase/auth';
import Screens from '../../Screens';

const selectNavigation=(screenName :any)=>{
    navigate(screenName, {});

}
const logout=()=>{
  return (
    <TouchableOpacity
      onPress={() => auth().signOut().then()}
      style={styles.logTouch}>
      <Text style={styles.logout}>Logout</Text>
    </TouchableOpacity>
  );
}
const cardView = (key: any, screenName: any) => {
  return (
    <View style={styles.navView}>
      <TouchableOpacity
        onPress={() => {
          selectNavigation(screenName);
        }}
        style={styles.navTouch}>
        <Text style={styles.touchTitle}>{key}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScreenSelect = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.darkwhite}/>
      {logout()}
      {cardView('Add To Cart Feature', Screens.ProductsList)}
      {cardView('Firebase Remote', Screens.FBConfig)}
      {cardView('Add post on firebase database', Screens.AddPost)}
      {/* {cardView(
        'Push Notifications Implementations',
        Screens.PushNotifications,
      )} */}
    </View>
  );
};
export default ScreenSelect;
const styles = StyleSheet.create({
  touchTitle: {
    marginVertical: 10,
    marginLeft: 10,
    color: Colors.bgColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkwhite,
  },
  logTouch: {marginTop: 80, marginLeft: 20},
  logout: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
  },
  navView: {
    backgroundColor: Colors.darkwhite,
    // flex: 1,
    marginTop: 20,
  },
  navTouch: {
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});