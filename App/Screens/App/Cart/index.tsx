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
  Alert,
} from 'react-native';
import { navigationRef} from '../../../Navigation/RootNavigation';
import styles from '../CategoryList/styles';
import Colors from '../../../Colors';
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { DemoList } from '../DemoList';
import Button from '../../../CommonViewUtilities/Button';
import { Item } from '../../../CommonViewUtilities/ItemsList';


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
  const [cartNo, setCartNo] = useState(0);
 


  const translateY = diffSetting.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -90],
  });
  const checkCart = async () => {
    const events = await firestore()
      .collection('cartData')
      .get()
      .then(res => {
        setCategory(res.docs);
        console.log('response is ', res.docs);
        //   res.docs.map(doc => {
        //     console.log('loging ', doc.data());
        //     return doc.data()
        //   });
      });
    console.log('second log ', events);
    // return events;

    // await firestore()
    //   .collection('cartData')
    //   .onSnapshot(allData => {
    //     console.log("alldtacsds ",allData.query)
    //     const findPost = allData.docs;
    //     setCartNo(findPost.length);
    //             const arr = DemoList.map(
    //               obj => findPost.find(o => o?.data().id === obj.id) || obj,
    //             );
    //             console.log("arrrr of ",arr)
    //     setCategory(arr);
    //   });
  };
  useEffect(() => {
    checkCart();
  }, []);
const headerView = () => {
  return (
    <Animated.View
      style={{
        elevation: 4,
        zIndex: 999,
        transform: [{translateY: translateY}],
      }}>
      <View style={[styles.rdView, {}]}>
        <TouchableOpacity
          onPress={() => navigationRef.goBack()}
          style={{
            position: 'absolute',
            top: 50,
            left: 30,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: Colors.bgColor,
            }}>
            {'<'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.pList}>Cart List</Text>
      </View>
    </Animated.View>
  );
};

// const renderItem = (items,index) => {
//   console.log("iteemees ",items)
//   let item = items?.item;
//   if (!!items?.item?.data) {
//     item = items?.item?.data();
//   }
//   return (
//     <View style={[styles.renderTopView, {}]}>
//       <View style={styles.shadowViewRow}>
//         <View style={[styles.sshadowViewRow, {}]}>
//           <View style={styles.imgView}>
//             <Image source={{uri: item.thumbnail}} style={styles.thumnail} />
//           </View>
//           <View style={styles.leftMar}>
//             <Text style={styles.category}>{item?.category.toUpperCase()}</Text>
//             <Text style={styles.brand}>{item?.brand.toUpperCase()}</Text>
//             <Text style={styles.price}>${item.price}</Text>
//           </View>
//         </View>
//         <View style={[styles.touchView, {}]}>
//           <Text>Quentity : {item.quentity}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

  return (
    <View style={styles.container}>
      {headerView()}
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
        // renderItem={renderItem}
        // console.log("iteemees ",items)
        // let item = items?.item;
        // if (!!items?.item?.data) {
        //   item = items?.item?.data();
        // }
        renderItem={item => {
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
