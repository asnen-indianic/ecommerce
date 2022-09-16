import React ,{useEffect,FC} from 'react'
import { useState } from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image, StatusBar} from 'react-native';
import {Button, RenderPendingsPosts,} from '../../../CommonViewUtilities'
import firestore from '@react-native-firebase/firestore'
import Colors from '../../../Colors';
import back from '../../../assets/back.png'

const HomePage: FC = (props:any) => {
  const [post, setPost] = useState<any>(null);
  const fetchPendingPosts = async () => {
    firestore().collection('posts').where('isApproved','==',false).onSnapshot(querySnapShot=>{
      const findPost = querySnapShot.docs
      setPost(findPost)
    })
  };
  useEffect(() => {
    fetchPendingPosts();
  }, []);
  const onApprove = async (id: string) => {
    const posts = await firestore().collection('posts').doc(id).get();
    posts.ref.set({isApproved: true}, {merge: true});
  };
  const onRejectionHandled = async (id: string) => {
    await firestore().collection('posts').doc(id).delete();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bgColor,
      }}>
        <StatusBar backgroundColor={Colors.bgColor}/>
      <Button
        buttonStyle={styles.btnStyle}
        labelStyle={styles.lableStyle}
        onPress={() => props.navigation.goBack()}
        img={true}
      />
      
        <FlatList
          data={post}
          renderItem={({item}) => (
            <RenderPendingsPosts
              approved={item?.isApproved}
              onApprove={() => onApprove(item.id)}
              post={item?.data().post}
              onReject={() => onRejectionHandled(item?.id)}
            />
          )}
        />
      
    </View>
  );
};

export default HomePage
const styles = StyleSheet.create({
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