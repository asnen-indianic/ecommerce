import React, { useEffect, useRef, useState } from 'react';
import {View, Text, TouchableOpacity,Easing, Image ,StyleSheet, Animated} from 'react-native';
import styles from './styles';
import firestore, { firebase } from '@react-native-firebase/firestore'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../Navigation/AppNavigater';
import { transform } from '@babel/core';
export interface IUser {
  name: string;
  price: number;
  category: string;
  thumbnail: string;
}

const categoryText = () => {
  return <Text style={styles.proList}>Product Details</Text>;
};
const productDetails = (route: any) => {
  return (
    <View style={styles.shadowView}>
      <View style={styles.rowView}>
        <Image
          style={styles.thumImg}
          source={{uri: route?.params?.details?.thumbnail}}
        />
        <View style={styles.marView}>
          <Text style={styles.textStyle}>
            Price: {route?.params?.details?.price}
          </Text>
          <Text style={styles.textStyle}>
            Rating: {route?.params?.details?.rating}
          </Text>
          <Text style={[styles.textStyle, {}]} numberOfLines={2}>
            Product Name: {route?.params?.details?.title}
          </Text>

          <Text style={styles.textStyle}>
            Discout: {route?.params?.details?.discountPercentage}
          </Text>
          <Text style={styles.textStyle}>
            Stock: {route?.params?.details?.stock}
          </Text>
        </View>
      </View>
    </View>
  );
};
type ScreenProps = NativeStackScreenProps<AppStackParamList, 'CategoryList'>;
 const CategoryList = ({navigation,route}: ScreenProps) => {

  const cartAimation = new Animated.ValueXY({x: 0, y: 0});
  const fadeAnim = useRef(new Animated.Value(0.3)).current

   const [qty, setQty] = useState(0);
   const [cartData, setCartData] = useState([]);
   const [showAddOrIncrease, setShowAddOrIncrease] = useState(false);
   const [animation, setAnimation] = useState(false);

   const goBack = (navigation: any) => {
     return (
       <View
         style={{
           marginHorizontal: 20,
           flexDirection: 'row',
           justifyContent: 'space-between',
         }}>
         <TouchableOpacity
           onPress={() => {
             navigation.goBack();
           }}
           style={styles.logTouch}>
           <Text style={styles.textStyle}>GoBack</Text>
         </TouchableOpacity>
         {qty > 0 && (
           <TouchableOpacity
             style={{
               margin: 30,
               marginTop: 50,
               backgroundColor: 'orange',
             }}>
             <Text style={{color: 'blue', fontSize: 20, padding: 10}}>
               Quantity : {qty}
             </Text>
           </TouchableOpacity>
         )}
       </View>
     );
   };
   const checkCart = async () => {
     await firestore()
       .collection('cartData')
       .onSnapshot(query => {
         const findPost = query.docs;
         setCartData(findPost);
         if (findPost.length > 0) {
           findPost.map(finding => {
             const actualData = finding?.data();
             if (
               route?.params?.details?.id == actualData?.id &&
               !!actualData?.cart
             ) {
               setQty(actualData?.quentity);
               setShowAddOrIncrease(true);
             }
           });
         } else {
           setQty(0);
           setShowAddOrIncrease(false);
         }
       });
   };
   useEffect(() => {
     checkCart();
   }, []);

   const addCartData = async (route: any) => {
           
     let dum;
     dum = {
       ...route,
       cart: true,
     };
     try {
       await firebase
         .firestore()
         .collection('cartData')
         .doc(`${dum.id}`)
         .set(dum, {merge: true})
         .then(suc => {
          
         });
     } catch (err) {}
   };
   const animationCode = () => {
     console.log('yeh');
     Animated.timing(cartAimation, {
       toValue: {x: 100, y: -700},
       duration: 1000,
       useNativeDriver: true,
     }).start();
   };
   const rotate = cartAimation.x.interpolate({
     inputRange: [0, 100],
     outputRange: ['0deg', '360deg'],
   });

   
   const addToCart = (route: any) => {
     return (
       <TouchableOpacity
         style={{
           backgroundColor: 'orange',
           alignSelf: 'center',
           marginTop: 150,
         }}
         onPress={() => {
           animationCode();
           setTimeout(() => {
             addCartData(route?.params?.details);
           }, 1000);
         }}>
         <Text
           style={{
             color: 'blue',
             fontWeight: 'bold',
             padding: 20,
           }}>
           Add To Cart
         </Text>
       </TouchableOpacity>
     );
   };
   const lessQuentityByOne = async (route: any) => {
     if (qty == 1) {
       await firestore().collection('cartData').doc(`${route?.id}`).delete();
       setQty(0);
       setShowAddOrIncrease(false);
     } else {
       await firestore()
         .collection('cartData')
         .doc(`${route?.id}`)
         .update('quentity', firebase.firestore.FieldValue.increment(-1));
       checkCart();
     }
   };
   const addQuentityByOne = async (route: any) => {
     await firestore()
       .collection('cartData')
       .doc(`${route?.id}`)
       .update('quentity', firebase.firestore.FieldValue.increment(1));
   };
   const increaseToCart = (route: any) => {
     return (
       <View
         style={{
           alignSelf: 'center',
           flexDirection: 'row',
           alignItems: 'center',
           marginTop: 150,
           backgroundColor: 'orange',
           height: 50,
         }}>
         <TouchableOpacity
           onPress={() => {
             lessQuentityByOne(route?.params?.details);
           }}>
           <Text
             style={{
               paddingHorizontal: 10,
               fontSize: 20,
               color: 'blue',
               fontWeight: 'bold',
             }}>
             -
           </Text>
         </TouchableOpacity>
         <Text
           style={{
             paddingHorizontal: 10,
             fontSize: 15,
             color: 'blue',
             fontWeight: 'bold',
           }}>
           Add And Remove
         </Text>
         <TouchableOpacity
           onPress={() => {
             addQuentityByOne(route?.params?.details);
           }}>
           <Text
             style={{
               paddingHorizontal: 10,
               fontSize: 15,
               color: 'blue',
               fontWeight: 'bold',
             }}>
             +
           </Text>
         </TouchableOpacity>
       </View>
     );
   };
   return (
     <View style={styles.container}>
       {/* <TouchableOpacity onPress={animationCode}>
         <Animated.View
           style={[
             {
               width: 60,
               height: 60,
               borderRadius: 30,
               backgroundColor: 'red',
               alignItems: 'center',
               justifyContent: 'center',margin:30
             },
             animStyle,
           ]}>
           <Text style={{fontWeight: 'bold', color: 'white', fontSize: 32}}>
             +
           </Text>
         </Animated.View>
       </TouchableOpacity> */}

       {goBack(navigation)}
       {categoryText()}
       {productDetails(route)}
       {cartData.length > 0 && (
         <TouchableOpacity
           style={{
             marginTop: 50,
             alignSelf: 'center',
             backgroundColor: 'orange',
           }}>
           <Text style={{padding: 20}}>Check Cart</Text>
         </TouchableOpacity>
       )}
       <Animated.View style={{
        marginTop:100,
        transform:[
          {translateX:cartAimation.x},
          {translateY:cartAimation.y},
          {rotate:rotate}

        ]
       }}>
         {cartData.length > 0 && !!showAddOrIncrease && qty > 0
           ? increaseToCart(route)
           : addToCart(route)}
       </Animated.View>
     </View>
   );
 };

export default CategoryList;
