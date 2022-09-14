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
console.log("pa ra ms-= ",products)
const headerView=()=>{
    return (
      <View
        style={styles.elev}>
        <View style={styles.rdView}>
          <View style={styles.widhView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.pList}>Product Details</Text>
            {products?.quentity > 0 && (
              <Text 
                style={styles.qty}>
                Quantity:{products.quentity}
              </Text>
            )}
          </View>
        </View>
        {/* <View style={{position:'absolute',right:20,marginTop:80}}> */}

        {/* </View> */}
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {headerView()}
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
const styles = StyleSheet.create({
  rdView: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: Colors.darkwhite,
    alignItems: 'center',
    height: 90,
    elevation: 6,
    zIndex: 999,
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  elev: {
    elevation: 4,
    zIndex: 999,
  },
  qty: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.bgColor,
  },
  back: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.bgColor,
  },
  widhView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    width: '90%',
  },
  pList: {
    // marginTop: 45,
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
    left: 100,
  },
});