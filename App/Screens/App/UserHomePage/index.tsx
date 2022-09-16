import React ,{ FC, useEffect,} from 'react'
import { useState } from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image} from 'react-native';
import {Button, RenderPost,} from '../../../CommonViewUtilities'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth';
import Colors from '../../../Colors';


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
  return (
    <View style={styles.container}>
      <Button
        buttonStyle={styles.btnStyle}
        labelStyle={styles.lableStyle}
        onPress={() => props.navigation.goBack()}
        label="GoBack"
      />
      <View style={{height: '50%'}}>
        <FlatList
          data={post}
          renderItem={({item}) => {
            console.log("item data is ",item?.data())
            return (
              <RenderPost
                approved={item?.isApproved}
                post={item?.data().post}
              />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{flex: 1}}>
                <Text>No data found</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default UserHomePage
const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Colors.darkwhite,
  },
  btnStyle: {
    backgroundColor: Colors.bgColor,
    marginHorizontal: 100,
    borderRadius: 20,
  },
  lableStyle: {
    color: Colors.darkwhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
})