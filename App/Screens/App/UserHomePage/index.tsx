import React ,{ FC, useEffect,} from 'react'
import { useState } from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image, StatusBar, Animated} from 'react-native';
import {Button, RenderPendingsPosts, RenderPost,} from '../../../CommonViewUtilities'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth';
import Colors from '../../../Colors';
import Header from '../../../CommonViewUtilities/Header';


const UserHomePage: FC = (props:any) => {
  const [post, setPost] = useState<any>(null);
  
  const fetchPosts = async () => {
        firestore()
          .collection('posts')
          .where('isApproved', '==', true)
          .onSnapshot(querySnapShot => {
            const findPost = querySnapShot.docs;
            setPost(findPost);
          });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const listEmpty=()=>{
    return (
      <Text style={{marginTop: 200, alignSelf: 'center', color: 'white'}}>
        No post found
      </Text>
    );
  }
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={Colors.bgColor} />
    <Header simpleView={true} />
    <FlatList
      ListEmptyComponent={listEmpty()}
      contentContainerStyle={{paddingTop: 10}}
      data={post}
      renderItem={({item}) => (
        <RenderPendingsPosts
          approved={item?.isApproved}
          post={item?.data().post}
        />
      )}
    />
  </View>
  );
};

export default UserHomePage
const styles = StyleSheet.create({
  headerView: {height: 45, justifyContent: 'center'},
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  img: {height: 25, width: 30, tintColor: Colors.white},
  touchLeft: {marginLeft: 20},
  btnStyle: {
    backgroundColor: Colors.bgColor,
    borderRadius: 20,
    width: 120,
  },
  lableStyle: {
    color: Colors.darkwhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
});