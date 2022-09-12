import React ,{ useEffect} from 'react'
import { useState } from 'react';
import {View,  StyleSheet, Alert} from 'react-native';
import { Button ,CustomInput} from '../../../CommonViewUtilities';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import firesote from '@react-native-firebase/firestore'
import { navigate } from '../../../Navigation/RootNavigation';
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
    if(post){
        const data={
            post,
            isApproved:false
        }
        try{
          await firebase.firestore().collection('posts').add(data).then((suc)=>{
            if(!!suc){
              Alert.alert('', 'Sucessful post data to the firestore!', [
                {text: 'OK', onPress: () => setPost('')},
              ]);
            }

          });
        }
        catch(err){
        }
    }else{
        Alert.alert("Missing Data")
    }
 }
  
    const [post,setPost]=useState<string | "">("")
    const [user,setUser]=useState<any>(null)
      return (
        <View style={styles.container}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            label="GoBack"
          />
          <Button label="Logout" onPress={() => auth().signOut().then()} />
          <CustomInput
            value={post}
            placeholderTextColor="gray"
            placeholder="Add Post"
            onChangeText={value => {
              setPost(value);
            }}
          />
          <Button
            onPress={() => {
              addPost();
            }}
            label="Post"
          />
          {user?.isAdmin ? (
            <View>
              <Button
                label="Admin HomePage"
                onPress={() => {
                  navigate('HomePage', {});
                }}
              />
            </View>
          ) : null}
          <View>
            <Button
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
});