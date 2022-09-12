import React ,{FC}  from "react";
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
interface IUser {
  onPress: (even: GestureResponderEvent) => void;
  data: {
    category: string;
    thumbnail:string;
  };
}
export const Item :FC<IUser>=(props) => {
    const data=props?.data;
    return (
      <TouchableOpacity onPress={props?.onPress} style={styles.shadowViews}>
        <Image style={styles.thImg} source={{uri: data?.thumbnail}} />
        <Text style={styles.text}>{data?.category.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    thImg: {height: 40, width: 40, borderRadius: 100},
    text: {marginTop: 10},
    shadowViews: {
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '50%',
      marginBottom: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      marginEnd: 5,
      elevation: 10,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });