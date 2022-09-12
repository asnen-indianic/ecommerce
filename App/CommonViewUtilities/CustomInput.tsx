
import React ,{FC} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Colors from '../Colors';

interface Input {
  placeholder: string;
  value: string;
  placeholderTextColor: string;
  onChangeText: (text: string) => void;
  img?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  title: string;
  secureTextEntry?: boolean;
}
interface Styles {
  inputStyle?: ViewStyle;
}

const CustomInput: FC<Input> = props => {
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
          {props.title}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        {props?.img && <Image  source={props.img} />}
        <TextInput
        secureTextEntry={props.secureTextEntry}
          maxLength={20}
          placeholderTextColor={props?.placeholderTextColor}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};
CustomInput.defaultProps = {
  placeholder: '',
  placeholderTextColor: Colors.cGray,
  style: {},
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