import React,{FC} from "react";
import { View,Text ,StyleSheet,Dimensions} from "react-native";
import Colors from "../Colors";
import Button from "./Button";
const {width,height}=Dimensions.get('screen')

interface Props {
  post: string;
  approved: string;
  onApprove?: () => void;
  onReject?: () => void;
}
const RenderPosts :FC <Props>=(props)=>{
    return (
      <View style={[styles.container, {backgroundColor: Colors.white}]}>
        <Text style={styles.post}>POST</Text>
        <View style={styles.rowView}>
          <Text style={styles.propPost}>{props?.post}</Text>
        </View>
        {props?.onApprove && (
          <Button
            buttonStyle={styles.btnStyle}
            labelStyle={styles.lableStyle}
            label="Approved"
            onPress={()=>{props?.onApprove()}}
          />
        )}
        {props?.onReject && (
          <Button
            buttonStyle={styles.btnStyle}
            labelStyle={styles.lableStyle}
            label="Reject"
            onPress={() => props.onReject()}
          />
        )}
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
  propPost: {fontWeight: '500', fontSize: 18, color: Colors.bgColor},
  post: {fontWeight: 'bold', fontSize: 22, color: Colors.bgColor},
  container: {
    padding: 10,
    width: width / 1.1,
    minHeight: 50,
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
  btnStyle: {
    backgroundColor: Colors.bgColor,
    borderRadius: 20,
    marginHorizontal: 60,
  },
  lableStyle: {
    color: Colors.darkwhite,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
