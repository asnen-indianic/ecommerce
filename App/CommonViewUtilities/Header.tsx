import React,{FC} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Colors from "../Colors";
import { navigationRef } from "../Navigation/RootNavigation";
import Button from "./Button";

const {width,height}=Dimensions.get('screen')

interface Props {
  goBack: () => void;
  translateY: object;
  cartNo: number;
  cartCallback: () => void;
  //   post: string;
  //   approved: string;
  //   onApprove: () => void;
  //   onReject: () => void;
}
const Header :FC <Props>=(props)=>{
 return (
   <Animated.View
     style={{
       elevation: 4,
       zIndex: 999,
       transform: [{translateY: props.translateY}],
     }}>
     <View style={[styles.rdView, {}]}>
       <TouchableOpacity
         onPress={() => props.goBack()}
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
           {`<`}
         </Text>
       </TouchableOpacity>
       <Text style={styles.pList}>Products List</Text>
       {props.cartNo > 0 && (
         <TouchableOpacity
           onPress={() =>props.cartCallback()}
           style={styles.headerAbs}>
           <Text style={styles.cartNo}>Cart :{props.cartNo}</Text>
         </TouchableOpacity>
       )}
     </View>
   </Animated.View>
 );
}
export default Header
const styles = StyleSheet.create({
  pList: {
    marginTop: 50,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
  },
  headerAbs: {
    position: 'absolute',
    backgroundColor: Colors.bgColor,
    borderRadius: 100,
    marginTop: 45,
    right: 10,
  }, cartNo: {
    color: '#E5E5E5',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
  }, rdView: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: Colors.darkwhite,
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    elevation: 6,
    zIndex: 999,
    // flexDirection: 'row',
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
});
