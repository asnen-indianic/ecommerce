import React, { useEffect, useRef, useState } from 'react';
import {View, Text, TouchableOpacity,Easing, Image ,StyleSheet, Animated, FlatList} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DemoList } from '../../DemoList';
import { Item } from '../../ProductsList/Item';
const topView=()=>{
    return (
      <View style={styles.rowView}>
        <Text></Text>
        <Text>Header</Text>
        <Text></Text>
      </View>
    );
}


 const HeaderWork = () => {
   const [category, setCategory] = useState([]);
   const scrollY = new Animated.Value(0);
   const diffSetting = Animated.diffClamp(scrollY,0,90)
   const trans = new Animated.ValueXY({x: 0, y: 0});
   const [showObj, setShowObj] = useState(false);
 
   useEffect(() => {
     setCategory(DemoList);
   }, []);
   useEffect(()=>{
if(!!showObj){
    clickAnimation();
}
   },[showObj])

   const translateY = diffSetting.interpolate({
     inputRange: [0, 90],
     outputRange: [0, -90],
   });

   const clickAnimation = () => {
    setShowObj(true)
    console.log('clickingg ');
    Animated.timing(trans, {
      toValue: {x: 120, y: -600},
      duration: 2000,
      useNativeDriver: true,
    }).start(doone => {
      console.log('done fo rcheckinggg ', doone);
      if (!!doone.finished) {
        trans.setValue({x: 0, y: 0});
        setShowObj(false);
      }
    });
   
};   
const rotate = trans.x.interpolate({
    inputRange:[0,10],
    outputRange:["0deg","360deg"]
   })
   return (
     <View style={styles.container}>
       <Animated.View
         style={{
           elevation: 4,
           zIndex: 999,
           transform: [{translateY: translateY}],
         }}>
         {topView()}
       </Animated.View>
       <View
         style={{
           marginTop: 120,
           alignSelf: 'flex-end',
           marginRight: 20,
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: 'red',
           height: 70,
           width: 100,
           borderRadius: 10,
         }}>
         <Text>Cart</Text>
       </View>
       <View style={styles.aniView}>
         <TouchableOpacity
           onPress={() => {
            setShowObj(true)
           }}
           style={styles.touch}>
           <Text>Click</Text>
         </TouchableOpacity>
         {!!showObj && (
           <Animated.View
             style={{
               height: 85,
               width: 85,
               borderRadius: 500,
               marginTop: -75,
               backgroundColor: 'red',
               transform: [
                 {translateX: trans.x},
                 {translateY: trans.y},
                 {rotate: rotate},
               ],
             }}>
             <Image
               style={{height: '100%', borderRadius: 500, width: '100%'}}
               source={{
                 uri: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
               }}
             />
             {/* <Text>d</Text> */}
           </Animated.View>
         )}
       </View>

       {/* <View style={{flex: 1, marginLeft:110}}>
         <FlatList
           contentContainerStyle={{marginTop: 90}}
           bounces={false}
           onScroll={e => {
             scrollY.setValue(e.nativeEvent.contentOffset.y);
           }}
           data={category}
           renderItem={({item}) => <Item onPress={() => {}} data={item} />}
         />
       </View> */}
       {/* </View> */}
     </View>
   );
 };

export default HeaderWork;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aniView: {
    borderRadius: 10,
    position: 'absolute',
    bottom: 40,
    height: 75,
    width: 150,
    backgroundColor: 'green',
    alignSelf: 'center',
  },
  touch: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  rowView: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
    height: 90,
    elevation: 6,
    zIndex: 999,
    flexDirection: 'row',
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
});