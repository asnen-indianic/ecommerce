
import React ,{FC} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
  ReturnKeyType,
  GestureResponderEvent,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Colors from '../Colors';

interface Input {
  inputRef?: any;
  placeholder: string;
  value: string;
  placeholderTextColor: string;
  onSubmitEditing?: () => void;
  onChangeText: (text: string) => void;
  img?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  title: string;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
  returnKeyType?:
    | 'none'
    | 'done'
    | 'search'
    | 'default'
    | 'go'
    | 'next'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call';
}
interface Styles {
  inputStyle?: ViewStyle;
}

const CustomInput: FC<Input> = props => {
  const {
    onSubmitEditing,
    returnKeyType,
    secureTextEntry,
    title,
    style,
    img,
    onChangeText,
    placeholderTextColor,
    value,
    placeholder,
    keyboardType,
    autoFocus
  } = props;
  return (
    <View style={{marginHorizontal: 20, marginTop: 20}}>
      {true && (
        <Text
          style={{
            fontSize: 14,
            color: '#556B2F',
            fontWeight: '400',
            marginBottom: 5,
          }}>
          {title}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        {img && <Image style={{height:20,width:20}} source={img} />}
        <TextInput
          autoCorrect={false}
          ref={props.inputRef}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize={'none'}
          autoFocus={autoFocus}
          blurOnSubmit={false}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={[{color: 'gray'}, styles.inputStyle]}
        />
      </View>
    </View>
  );
};
CustomInput.defaultProps = {
  placeholder: '',
  placeholderTextColor: Colors.cGray,
  style: {},
  keyboardType: 'default',
  returnKeyType: 'done',
  autoFocus:false,
};
const styles = StyleSheet.create<Styles>({
  inputStyle: {
    borderColor:Colors.bgColor,
    borderBottomWidth:1,
    flex:1,
    padding: 10,
  },
});
export default CustomInput