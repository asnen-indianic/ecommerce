import React,{FC} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import Colors from "../Colors";
import back from '../assets/back.png'


import {navigationRef} from '../Navigation/RootNavigation'

interface Props {
  goBack?: () => void;
  translateY?: object;
  cartNo?: number;
  simpleView?: Boolean;
  cartCallback?: () => void;
  title?: string;
  tintColor?: string;
}


const Header :FC <Props>=(props)=>{
  const childView=()=>{
    return (
      <View style={[styles.rdView, {}]}>
        <TouchableOpacity
          onPress={() => navigationRef.goBack()}
          style={styles.absTouch}>
          {imageReturn()}
        </TouchableOpacity>
        <Text style={styles.pList}>{props.title}</Text>
        {props.cartNo > 0 && (
          <TouchableOpacity
            onPress={() => props.cartCallback()}
            style={styles.headerAbs}>
            <Text style={styles.cartNo}>Cart :{props.cartNo}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  const imageReturn=()=>{
    return (
      <Image
        style={{height: 25, width: 30, tintColor: props.tintColor}}
        source={back}
      />
    );
  }
 return props?.simpleView ? (
   <View style={styles.headerView}>
     <TouchableOpacity
       onPress={() => navigationRef.goBack()}
       style={{marginLeft: 20}}>
     {imageReturn()}
     </TouchableOpacity>
   </View>
 ) : !!props?.translateY ? (
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
Header.defaultProps = {
  tintColor: Colors.bgColor,
};
const styles = StyleSheet.create({
  elevation: {
    elevation: 4,
    zIndex: 999,
    img: {height: 25, width: 30, tintColor: Colors.white},
    touchLeft: {marginLeft: 20},
  },
  headerView: {height: 45, justifyContent: 'center'},

  absTouch: {
    position: 'absolute',
    top: Platform.OS == 'android' ? 25 : 50,
    left: 30,
  },
  back: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
  },
  pList: {
    marginTop: Platform.OS == 'android' ? 25 : 50,

    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
  },
  headerAbs: {
    position: 'absolute',
    backgroundColor: Colors.bgColor,
    borderRadius: 100,
    marginTop: Platform.OS == 'android' ? 20 : 45,
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
