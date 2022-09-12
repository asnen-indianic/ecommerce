import React,{FC} from "react";
import { View,Text ,StyleSheet,Dimensions} from "react-native";
import Button from "./Button";

const {width,height}=Dimensions.get('screen')

interface Props {
  post: string;
  approved: string;
  onApprove: () => void;
  onReject: () => void;
}
const RenderPosts :FC <Props>=(props)=>{
    return (
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Text style={styles.post}>POST</Text>
          <Text style={styles.propPost}>{props?.post}</Text>
        </View>

        <Button
          label="Approved"
          onPress={() => {
            props?.onApprove();
          }}
        />
        <Button label="Reject" onPress={() => props?.onReject()} />
      </View>
    );
}
export default RenderPosts
const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  propPost: {fontWeight: 'bold', fontSize: 22, color: '#E5E5E5'},
  post: {fontWeight: 'bold', fontSize: 22, color: 'blue'},
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
});
