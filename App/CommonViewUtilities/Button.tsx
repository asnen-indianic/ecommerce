
import React, {FC} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyleIOS,
} from 'react-native';
interface IProps {
  translateY?: object;
  label?: string;
  img?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress: (even: GestureResponderEvent) => void;
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
        <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;