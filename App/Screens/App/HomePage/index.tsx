import React ,{useEffect,FC} from 'react'
import { useState } from 'react';
import {View, Text,StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Image, StatusBar} from 'react-native';
import {Button, RenderPendingsPosts,} from '../../../CommonViewUtilities'
import firestore from '@react-native-firebase/firestore'
import Colors from '../../../Colors';
import { Animated } from 'react-native';
import Header from '../../../CommonViewUtilities/Header';

const HomePage: FC = (props:any) => {
  const [post, setPost] = useState<any>(null);
  const scrollY = new Animated.Value(0);
  const diffSetting = Animated.diffClamp(scrollY, 0, 90);
  const translateY = diffSetting.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -90],
  });
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
      <Header tintColor={Colors.white} simpleView={true} />
      <FlatList
        onScroll={callback => {
          scrollY.setValue(callback.nativeEvent.contentOffset.y);
        }}
        ListEmptyComponent={listEmpty()}
        contentContainerStyle={{paddingTop: 10}}
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