import React ,{useEffect,FC} from 'react'
import { useState } from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image} from 'react-native';
import {Button, RenderPendingsPosts,} from '../../../CommonViewUtilities'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth';


const HomePage: FC = (props:any) => {
  const [post, setPost] = useState<any>(null);
  const fetchPendingPosts = async () => {
    console.log('geting post from..firestore ');
    // const posts = await firestore()
    //   .collection('posts')
    //   .where('isApproved', '==', false)
    //   .get();

    // console.log('approved posts ', posts);
    // setPost([...posts.docs]);
    // console.log('my post is ', post);
    

    firestore().collection('posts').where('isApproved','==',false).onSnapshot(querySnapShot=>{
      console.log("quesry snamp ",querySnapShot)
      const findPost = querySnapShot.docs
      setPost(findPost)

    })

  };
  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const onApprove = async (id: string) => {
    console.log("id isss ",id)
    const posts = await firestore().collection('posts').doc(id).get();
    console.log("the approve filter post is ",posts)
    posts.ref.set({isApproved: true}, {merge: true});
  };
  const onRejectionHandled = async (id: string) => {
    console.log('click id is ', id);
    await firestore().collection('posts').doc(id).delete();
  };
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
        ---HOME PAGE---
      </Text>
      <View style={{height: '50%', backgroundColor: 'gray'}}>
        <FlatList
          data={post}
          renderItem={({item}) => (
            <RenderPendingsPosts
              approved={item?.isApproved}
              onApprove={() => onApprove(item.id)}
              post={(item?.data().post)}
              onReject={() => onRejectionHandled(item?.id)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default HomePage
