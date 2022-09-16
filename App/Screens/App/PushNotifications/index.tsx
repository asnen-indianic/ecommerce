import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../Navigation/AppNavigater';
import firestore, { firebase } from '@react-native-firebase/firestore'
import Header from '../../../CommonViewUtilities/Header';
import { navigationRef } from '../../../Navigation/RootNavigation';


const renderItem = (item:any) => (
    <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );
  let pushData = [
    {
      title: "First push",
      message: "First push message"
    },
    {
      title: "Second push",
      message: "Second push message"
    }
  ]
const PushNotifications = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <StatusBar backgroundColor={Colors.darkwhite} />
      <Header
        goBack={() => navigationRef.goBack()}
        title={'Remote Configration'}
      />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.listHeader}>
            <Text>Push Notifications</Text>
          </View>
          <View style={styles.body}>
            <FlatList
              data={pushData}
              renderItem={item => renderItem(item)}
              keyExtractor={item => item.title}
            />
            {/* <LearnMoreLinks /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default PushNotifications;

const styles = StyleSheet.create({
  scrollView: {backgroundColor: 'gray'},
  listHeader: {backgroundColor: '#eee', color: '#222', height: 44, padding: 12},
  title: {fontSize: 18, fontWeight: 'bold', paddingTop: 10},
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  engine: {position: 'absolute', right: 0},
  body: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {marginTop: 32, paddingHorizontal: 24},
  sectionTitle: {fontSize: 24, fontWeight: '600', color: 'black'},
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'blue',
  },
  highlight: {fontWeight: '700'},
  footer: {
    color: 'green',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});