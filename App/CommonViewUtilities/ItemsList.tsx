import React ,{FC}  from "react";
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../Colors";

export interface IUser {
  datas: {
    id: string;
    category: string;
    thumbnail: string;
    brand: string;
    price: string;
  };
}
export const Item :FC<IUser>=(props) => {
    console.log("datasss",props)
    const item = props?.datas
   
    return (
      <View style={[styles.renderTopView, {}]}>
        <View
          style={[
            styles.shadowViewRow,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <View style={[styles.sshadowViewRow, {}]}>
            <View style={[styles.imgView, {}]}>
              <Image source={{uri: item.thumbnail}} style={styles.thumnail} />
            </View>
            <View style={styles.leftMar}>
              <Text style={styles.category}>
                {item?.category.toUpperCase()}
              </Text>
              <Text style={styles.brand}>{item?.brand.toUpperCase()}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
          <View style={[styles.touchView, {}]}>
            <Text>Quentity : {item.quentity}</Text>
          </View>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    renderTopView: {
      justifyContent: 'center',
      flex: 1,
      marginBottom: 10,
      marginHorizontal: 10,
      borderRadius: 15,
    },imgView: {
        margin: 4,
        borderRadius: 10,
        height: 70,
        width: 90,
        justifyContent: 'center',
      },
    thumnail: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
      margin: 3,
    },
    touchView: {
      justifyContent: 'flex-end',
      marginRight: 20,
      flexDirection: 'row',
    },
    price: {
      fontSize: 14,
      color: Colors.bgColor,
      fontWeight: 'bold',
    },
    leftMar: {marginLeft: 20},
    category: {
      fontSize: 15,
      color: Colors.bgColor,
      fontWeight: '600',
    },
    brand: {
      fontSize: 14,
      color: '#200',
      fontWeight: '600',
      marginVertical: 7,
    },
    shadowViewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.white,
      borderRadius: 10,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    sshadowViewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.white,
      borderRadius: 10,
    },
  });