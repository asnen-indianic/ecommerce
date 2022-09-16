import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated,
  Image,
} from 'react-native';
import {navigate, navigationRef} from '../../../Navigation/RootNavigation';
import styles from '../CategoryList/styles';
import firestore, { firebase } from '@react-native-firebase/firestore'
import { DemoList } from '../DemoList';
import Header from '../../../CommonViewUtilities/Header';
import Screens from '../../Screens';
export interface IUser {
  id: string;
  category: string;
  thumbnail: string;
  brand: string;
  price: string;
}
const ProductsList = () => {
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const scrollY = new Animated.Value(0);
  const diffSetting = Animated.diffClamp(scrollY, 0, 90);
  const [category, setCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cartNo, setCartNo] = useState(0);

  const translateY = diffSetting.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -90],
  });
  const checkCart = async () => {
    await firestore()
      .collection('cartData')
      .onSnapshot(allData => {
        const findPost = allData.docs;
        setCartNo(findPost.length);
        const arr = DemoList.map(
          obj => findPost.find(o => o?.data().id === obj.id) || obj,
        );
        setCategory(arr);
      });
  };
  useEffect(() => {
    checkCart();
  }, []);
  const addFTAndLTCart = async (item: any) => {
    if (item?.quentity !== 0) {
      await firestore()
        .collection('cartData')
        .doc(`${item?.id}`)
        .update('quentity', firebase.firestore.FieldValue.increment(1));
    } else {
      let dum;
      dum = {
        ...item,
        cart: true,
      };
      try {
        await firebase
          .firestore()
          .collection('cartData')
          .doc(`${dum.id}`)
          .set(dum, {merge: true})
          .then(suc => {});
        await firestore()
          .collection('cartData')
          .doc(`${item?.id}`)
          .update('quentity', firebase.firestore.FieldValue.increment(1));
        checkCart();
      } catch (err) {
        console.log('is thererere', err);
      }
    }
  };
const increaseByOne = async (item: any) => {
  if (item.quentity == 1) {
    await firestore().collection('cartData').doc(`${item?.id}`).delete();
  } else {
    await firestore()
      .collection('cartData')
      .doc(`${item?.id}`)
      .update('quentity', firebase.firestore.FieldValue.increment(-1));
  }
};
  const renderItem = (items: any) => {
    let item = items?.item;
    if (!!items?.item?.data) {
      item = items?.item?.data();
    }
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('ProductsDetails', {
            details: item,
          });
        }}
        style={[styles.renderTopView, {}]}>
        <View style={styles.shadowViewRow}>
          <View style={styles.sshadowViewRow}>
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
          {item?.cart && (
              <TouchableOpacity
                onPress={() => {
                  increaseByOne(item);
                }}
                style={styles.addCartTouch}>
                <Text style={styles.plus}>-</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={async () => {
                addFTAndLTCart(item);
              }}
              style={styles.addCartTouch}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Product List"
        goBack={() => navigationRef.goBack()}
        cartCallback={() => navigate(Screens.Cart,{})}
        translateY={translateY}
        cartNo={cartNo}
      />
      <FlatList
        bounces={false}
        onScroll={callback => {
          scrollY.setValue(callback.nativeEvent.contentOffset.y);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{marginLeft: 5, paddingTop: 100}}
        data={category}
        renderItem={renderItem}
        keyExtractor={(item: IUser) => item.id}
      />
    </View>
  );
};
export default ProductsList;
