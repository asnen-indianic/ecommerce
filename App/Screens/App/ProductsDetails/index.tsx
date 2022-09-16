import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated,
  StyleSheet,
  Image,
} from 'react-native';
import Colors from '../../../Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../../Navigation/AppNavigater';
import firestore, { firebase } from '@react-native-firebase/firestore'
import Header from '../../../CommonViewUtilities/Header';
import { navigationRef } from '../../../Navigation/RootNavigation';

const capitalize=(str:any)=>
{
    return str[0].toUpperCase() + str.slice(1);
}


  type ScreenProps = NativeStackScreenProps<AppStackParamList, 'ProductsDetails'>;

const ProductsDetails = ({navigation,route}:ScreenProps) => {
    const checkCart = async () => {
        await firestore()
          .collection('cartData')
          .onSnapshot(query => {
            const findPost = query.docs;
            console.log('posesdsrts aare ', findPost);
            // setCartNo(findPost.length)
                    // const arr = DemoList.map(
                    //   obj => findPost.find(o => o?.data().id === obj.id) || obj,
                    // );
            // setCategory(arr);
          });
      };
    useEffect(() => {
        checkCart();
        // console.log("category=-=",category)
      }, []);
const params = route?.params?.details
const [products, setProduct] = useState(params);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="Product Details" goBack={() => navigationRef.goBack()} />
      <View
        style={{
          backgroundColor: '#e5e5e5',
          marginTop: 120,
          borderRadius: 10,
          marginHorizontal: 19,
          elevation: 10,
          shadowColor: '#161616',
          shadowOffset: {width: -10, height: -8},
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 75,
              width: 75,
              justifyContent: 'center',
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={{uri: products.thumbnail}}
            />
          </View>
          <View
            style={{
              marginLeft: 10,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: Colors.bgColor, fontSize: 14}}>
              Category : {capitalize(products?.category)}
            </Text>
            <Text style={{color: Colors.bgColor, fontSize: 14}}>
              Brand : {products?.brand}
            </Text>
            <Text style={{color: Colors.bgColor, fontSize: 14}}>
              Stock : {products?.stock}
            </Text>
            <Text
              style={{color: Colors.bgColor, fontSize: 14, fontWeight: 'bold'}}>
              Price : {products?.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductsDetails;