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
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navigate} from '../../../Navigation/RootNavigation';
import styles from '../CategoryList/styles';
import Clipboard from '@react-native-clipboard/clipboard';
import Colors from '../../../Colors';
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { DemoList } from '../DemoList';

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
 const diffSetting = Animated.diffClamp(scrollY,0,90)
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
    console.log("category=-=",category)
  }, []);
const addFTAndLTCart = async (item: any) => {
  console.log("item s ss  ",item)
  if (item?.quentity !== 0) {
    console.log("!==00 true")
    await firestore()
      .collection('cartData')
      .doc(`${item?.id}`)
      .update('quentity', firebase.firestore.FieldValue.increment(1));
  } else {
    console.log('else case loging ');
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

const headerView=()=>{
   return (
     <Animated.View
       style={{
         elevation: 4,
         zIndex: 999,
         transform: [{translateY: translateY}],
       }}>
       <View style={[styles.rdView, {}]}>
         <TouchableOpacity
           onPress={() => auth().signOut().then()}
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
             Logout
           </Text>
         </TouchableOpacity>

         <Text style={styles.pList}>Products List</Text>
         {cartNo > 0 && (
           <TouchableOpacity onPress={()=>navigate("Cart")} style={styles.headerAbs}>
             <Text style={styles.cartNo}>Cart : {cartNo}</Text>
           </TouchableOpacity>
         )}
       </View>
     </Animated.View>
   );
}

const renderItem = (items,index) => {
  console.log("iteemees ",items)
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
        // navigate('CategoryList', {
        //   details: item,
        // });
      }}
      style={[styles.renderTopView, {}]}>
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
          {/* {selectedId !== 0 && selectedId === item.id && (
            <Animated.View
              style={[
                styles.imgView,
                {
                  transform: [
                    {translateX: cartAimation.x},
                    {translateY: cartAimation.y},
                  ],
                },
              ]}>
              <Image source={{uri: item.thumbnail}} style={styles.thumnail} />
            </Animated.View>
          )} */}
       
          {/* {selectedId !== item.id  && ( */}
            <View style={[styles.imgView, {}]}>
              <Image source={{uri: item.thumbnail}} style={styles.thumnail} />
            </View>
          {/* )} */}
          <View style={styles.leftMar}>
            <Text style={styles.category}>{item?.category.toUpperCase()}</Text>
            <Text style={styles.brand}>{item?.brand.toUpperCase()}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
        <View style={[styles.touchView, {}]}>
          <TouchableOpacity
            onPress={async () => {
              // setSelectedId(item.id);
    

              addFTAndLTCart(item);
            }}
            style={styles.addCartTouch}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
          {item?.cart && (
            <TouchableOpacity
              onPress={async () => {
                if (item.quentity == 1) {
                  await firestore()
                    .collection('cartData')
                    .doc(`${item?.id}`)
                    .delete();
                  // setQty(0);
                } else {
                  await firestore()
                    .collection('cartData')
                    .doc(`${item?.id}`)
                    .update(
                      'quentity',
                      firebase.firestore.FieldValue.increment(-1),
                    );
                }
              }}
              style={styles.addCartTouch}>
              <Text style={styles.plus}>-</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


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
        contentContainerStyle={{marginLeft: 5, marginTop: 90}}
        data={category}
        renderItem={renderItem}
        // renderItem={itt => {
        //   console.log('ittt is ', itt);
        //   let item = itt?.item;
        //   if (!!itt?.item?.data) {
        //     item = itt?.item?.data();
        //   }
        //   return (
        //     <TouchableOpacity
        //       onPress={() => {
        //         navigate('CategoryList', {
        //           details: item,
        //         });
        //       }}
        //       style={[styles.renderTopView, {}]}>
        //       <View
        //         style={[
        //           styles.shadowViewRow,
        //           {
        //             flexDirection: 'row',
        //             justifyContent: 'space-between',
        //             alignItems: 'center',
        //           },
        //         ]}>
        //         <View style={[styles.sshadowViewRow, {}]}>
        //           <View style={styles.imgView}>
        //             <Image
        //               source={{uri: item.thumbnail}}
        //               style={styles.thumnail}
        //             />
        //           </View>
        //           <View style={styles.leftMar}>
        //             <Text style={styles.category}>
        //               {item?.category.toUpperCase()}
        //             </Text>
        //             <Text style={styles.brand}>
        //               {item?.brand.toUpperCase()}
        //             </Text>
        //             <Text style={styles.price}>${item.price}</Text>
        //           </View>
        //         </View>
        //         <View style={[styles.touchView, {}]}>
        //           <TouchableOpacity
        //             onPress={async () => {
        //               console.log('heoe therer');
        //               addFTAndLTCart(item);
        //             }}
        //             style={styles.addCartTouch}>
        //             <Text style={styles.plus}>+</Text>
        //           </TouchableOpacity>
        //           {item?.cart && (
        //             <TouchableOpacity
        //               onPress={async () => {
        //                 if (item.quentity == 1) {
        //                   await firestore()
        //                     .collection('cartData')
        //                     .doc(`${item?.id}`)
        //                     .delete();
        //                   setQty(0);
        //                 } else {
        //                   await firestore()
        //                     .collection('cartData')
        //                     .doc(`${item?.id}`)
        //                     .update(
        //                       'quentity',
        //                       firebase.firestore.FieldValue.increment(-1),
        //                     );
        //                 }
        //               }}
        //               style={styles.addCartTouch}>
        //               <Text style={styles.plus}>-</Text>
        //             </TouchableOpacity>
        //           )}
        //         </View>
        //       </View>
        //     </TouchableOpacity>
        //   );
        // }}
        keyExtractor={(item: IUser) => item.id}
      />
    </View>
  );
};
export default ProductsList;
