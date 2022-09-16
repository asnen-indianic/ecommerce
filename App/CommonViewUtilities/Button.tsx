
import React, {FC} from 'react';

import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyleIOS
} from 'react-native';
import back from '../assets/back.png'
import Colors from '../Colors';
interface IProps {
  label: string;
  
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress:((even:GestureResponderEvent)=>void)
}

interface Styles {
  button: ViewStyle;
  label: TextStyle;
  links:TextStyleIOS;
  }

const styles = StyleSheet.create<Styles>({
  links: {
    backgroundColor: 'magenta',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'gray',
    marginHorizontal: 20,
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
const Button: FC<IProps> = props => {
  return (
    <TouchableOpacity onPress={props?.onPress}>
      <View style={[styles.button, props.buttonStyle]}>
        {props.img? (
          <Image
            style={{
              position: 'absolute',
              left: 0,
              tintColor: Colors.white,
              height: 25,
              width: 30,
            }}
            source={back}
          />
        ) : (
          <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;