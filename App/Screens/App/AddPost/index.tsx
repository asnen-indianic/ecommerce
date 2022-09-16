import React ,{ useEffect} from 'react'
import { useState } from 'react';
import {View,  StyleSheet, Alert} from 'react-native';
import { Button ,CustomInput} from '../../../CommonViewUtilities';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firesote from '@react-native-firebase/firestore'
import { navigate } from '../../../Navigation/RootNavigation';
import Colors from '../../../Colors';
interface Props {
  navigation: any;
}
const AddPost = ({navigation}: Props) => {
const fetchCurrentUser = async () => {
  const currentLoginUserId = firebase.auth().currentUser?.uid;

  const user = await firesote()
    .collection('users')
    .doc(currentLoginUserId)
    .get();
  setUser({id: user.id, ...user?.data()});
};
useEffect(()=>{
fetchCurrentUser();
},[])
const addPost=async()=>{
    if (post) {
      const data = {
        post,
        // userName:
        isApproved: false,
      };
      try {
        await firebase
          .firestore()
          .collection('posts')
          .add(data)
          .then(suc => {
            if (!!suc) {
              Alert.alert('', 'Sucessful post data to the firestore!', [
                {text: 'OK', onPress: () => setPost('')},
              ]);
            }
          });
      } catch (err) {}
    } else {
      Alert.alert('Missing Data');
    }
 }
  
    const [post,setPost]=useState<string | "">("")
    const [user,setUser]=useState<any>(null)
    console.log("user is ")
      return (
        <View style={styles.container}>
          <Button
           buttonStyle={styles.btnStyle}
           labelStyle={styles.lableStyle}
            onPress={() => {
              navigation.goBack();
            }}
            label="GoBack"
          />
          <Button
            buttonStyle={styles.btnStyle}
            labelStyle={styles.lableStyle}
            label="Logout"
            onPress={() => auth().signOut().then()}
          />
          <CustomInput
            value={post}
            placeholderTextColor="gray"
            placeholder="Add Post"
            onChangeText={value => {
              setPost(value);
            }}
          />
          <Button
           buttonStyle={styles.btnStyle}
           labelStyle={styles.lableStyle}
            onPress={() => {
              addPost();
            }}
            label="Post"
          />
          {user?.isAdmin ? (
            <View>
              <Button
               buttonStyle={styles.btnStyle}
               labelStyle={styles.lableStyle}
                label="Admin HomePage"
                onPress={() => {
                  navigate('HomePage', {});
                }}
              />
            </View>
          ) : null}
          <View>
            <Button
             buttonStyle={styles.btnStyle}
             labelStyle={styles.lableStyle}
              label="User HomePage"
              onPress={() => {
                navigate('UserHomePage', {});
              }}
            />
          </View>
        </View>
      );
};

export default AddPost

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: 'white'},
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
});