import React ,{ FC, useEffect,} from 'react'
import { useState } from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image} from 'react-native';
import {Button, RenderPost,} from '../../../CommonViewUtilities'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth';


const UserHomePage: FC = (props:any) => {
  const [post, setPost] = useState<any>(null);
  const fetchPosts = async () => {
    console.log('geting post from..firestore ');
    // const posts = await firestore()
    //   .collection('posts')
    //   .where('isApproved', '==', true)
    //   .get();

    // console.log('approved posts ', posts);
    // setPost([...posts.docs]);
    // console.log('my post is ', post);
    firestore().collection('posts').where('isApproved','==',true).onSnapshot(querySnapShot=>{
      console.log("quesry snamp ",querySnapShot)
      const findPost = querySnapShot.docs
      setPost(findPost)

    })
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
      }}>
      <Button
      labelStyle={{paddingHorizontal:20}}
      onPress={()=>props.navigation.goBack()}
      label="GoBack" />
      <Text
        style={{marginVertical: 60, alignSelf: 'center', fontWeight: 'bold'}}>
        ---USER HOME PAGE---
      </Text>
      <View style={{height: '50%', }}>
        <FlatList
          data={post}
          renderItem={({item}) => (
            <RenderPost
              approved={item?.isApproved}
              post={(item?.data().post)}
            />
          )}
          ListEmptyComponent={()=>{
            return(<View style={{flex:1,}}>
              <Text>NO Data found</Text>
            </View>)
          }}
        />
      </View>
    </View>
  );
};

export default UserHomePage
