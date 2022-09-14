import React,{FC} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Colors from "../Colors";
interface Props {
  goBack: () => void;
  translateY?: object;
  cartNo?: number;
  cartCallback?: () => void;
  title: string;
}

const Header :FC <Props>=(props)=>{
  const childView=()=>{
    return(
      <View style={[styles.rdView, {}]}>
      <TouchableOpacity
        onPress={() => props.goBack()}
        style={styles.absTouch}>
        <Text 
          style={styles.back}>
          {`<`}
        </Text>
      </TouchableOpacity>
      <Text style={styles.pList}>{props.title}</Text>
      {props.cartNo > 0 && (
        <TouchableOpacity
          onPress={() =>props.cartCallback()}
          style={styles.headerAbs}>
          <Text style={styles.cartNo}>Cart :{props.cartNo}</Text>
        </TouchableOpacity>
      )}
    </View>
    )
  }
 return !!props?.translateY ? (
   <Animated.View
     style={{
       elevation: 4,
       zIndex: 999,
       transform: [{translateY: props.translateY}],
     }}>
     {childView()}
   </Animated.View>
 ) : (
   <View style={styles.elevation}>{childView()}</View>
 );
}
export default Header
const styles = StyleSheet.create({
  elevation: {
    elevation: 4,
    zIndex: 999,
  },
  absTouch: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  back: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
  },
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
  },
  cartNo: {
    color: '#E5E5E5',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
  },
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
});
