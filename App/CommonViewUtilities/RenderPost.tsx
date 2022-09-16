import React,{FC} from "react";
import { View,Text ,StyleSheet,Dimensions} from "react-native";
import Button from "./Button";

const {width,height}=Dimensions.get('screen')

interface Props {
  post: string;
  approved: string;
}
const RenderPendingsPosts :FC <Props>=(props)=>{
    return (
      <View style={styles.container}>
       <View>
          <Text style={styles.post}>POST</Text>
          <Text style={styles.propPost}>{props?.post}</Text>
        </View>
      </View>
    );
}
export default RenderPendingsPosts
const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: width / 1.1,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 34,
      height: 3,
    },
    shadowColor: '#ccc',
    shadowOpacity: 0.9,
  },
  propPost: {fontWeight: 'bold', fontSize: 22, color: '#E5E5E5'},
  post: {fontWeight: 'bold', fontSize: 22, color: 'blue'},
});
