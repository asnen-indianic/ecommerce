import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Animated,
  Alert,
} from 'react-native';
import { navigationRef} from '../../../Navigation/RootNavigation';
import styles from '../CategoryList/styles';
import Colors from '../../../Colors';
import firestore from '@react-native-firebase/firestore'
import Button from '../../../CommonViewUtilities/Button';
import { Item } from '../../../CommonViewUtilities/ItemsList';
import Header from '../../../CommonViewUtilities/Header';

export interface IUser {
  id: string;
  category: string;
  thumbnail: string;
  brand: string;
  price: string;
}
const Cart = () => {
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const scrollY = new Animated.Value(0);
 const diffSetting = Animated.diffClamp(scrollY,0,90)
  const [category, setCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const translateY = diffSetting.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -90],
  });
  const checkCart = async () => {
    const events = await firestore()
      .collection('cartData')
      .get()
      .then((res:any) => {
        setCategory(res.docs);
        });
    };
  useEffect(() => {
    checkCart();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        title="Cart List"
        goBack={() => navigationRef.goBack()}
        translateY={translateY}
      />
      <FlatList
        bounces={false}
        onScroll={callback => {
          scrollY.setValue(callback.nativeEvent.contentOffset.y);
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          marginLeft: 5,
          marginTop: 90,
          paddingVertical: 20,
        }}
        data={category}
        renderItem={(item: any) => {
          let itemss = item?.item;
          if (!!item?.item.data) {
            itemss = item?.item.data();
          }
          return <Item datas={itemss} />;
        }}
        keyExtractor={(item: IUser) => item.id}
      />
      <Button
        buttonStyle={{
          position: 'absolute',
          width: '80%',
          bottom: 40,
          alignSelf: 'center',
          backgroundColor: Colors.bgColor,
        }}
        labelStyle={{fontWeight: 'bold', color: Colors.darkwhite, fontSize: 16}}
        label="Payment"
        onPress={() => {
          Alert.alert('Thanks You!');
        }}
      />
    </View>
  );
};
export default Cart;
