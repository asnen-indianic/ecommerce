import React ,{} from 'react'
import { useState } from 'react';
import {View, Text, TextInput,StyleSheet, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CustomInput, Button} from '../../../CommonViewUtilities';
import user from '../../../assets/user.png'
import passwords from '../../../assets/password.png'

import Colors from '../../../Colors';
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

interface Props {
    navigation: any;
}

const Signup = ({navigation}: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');


const textShow = () => {
  return (
    <View style={styles.textShow}>
      <Text style={styles.heading}>E-Commerce App</Text>
    </View>
  );
};
// const inputsShow=()=>{
//     return (
//       <View style={{marginTop: 75}}>
//         <CustomInput
//           value={userName}
//           placeholder="Enter username"
//           placeholderTextColor="#000"
//           onChangeText={name => {
//             setUserName(name);
//           }}
//         />
//         <CustomInput
//           value={password}
//           placeholder="Enter password"
//           placeholderTextColor="#000"
//           onChangeText={password => {
//             setPassword(password);
//           }}
//         />
//       </View>
//     );
// }
const validation=()=>{
  if (!email) {
    Alert.alert('Alert', 'Enter you email-address');
    return false;
  } else if (!reg.test(email)) {
    Alert.alert('Alert', 'Enter a valid email-address');
  } else if (!password) {
    Alert.alert('Alert', 'Enter you password');
    return false;
  } else if (!rePassword) {
    Alert.alert('Alert', 'Re-Enter your password');
    return false;
  } else if (password.length < 6 || rePassword.length < 6) {
    Alert.alert('Alert', 'Password should be minimum 6 characters');
    return false;
  } else if (password !== rePassword) {
    Alert.alert('Alert', 'Password should be same');
    return false;
  } else return true;
}
const buttonShow = (typeParam: any) => {
  return (
    <View style={{marginTop: 0}}>
      <Button
         buttonStyle={{
          backgroundColor: Colors.white,
          borderWidth: 1,
          borderColor: Colors.bgColor,
        }}
        onPress={() => {
          navigation.navigate('Login');         
        }}
        label={typeParam}
        labelStyle={{fontSize: 18, color: Colors.bgColor, fontWeight: 'bold'}}

      />
    </View>
  );
};

const signupView = (typeParam: any) => {
  return (
    <View style={{marginTop: 10}}>
      <Button
        buttonStyle={{backgroundColor: '#00FA9A'}}
        onPress={() => {
          if(!!validation()){
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                console.log('User account created & signed in!');
              })
              .catch(error => {
                console.log('errr while su', error);
                if (error.code === 'auth/email-already-in-use') {
                  Alert.alert('Alert', 'That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                  Alert.alert('Alert', 'That email address is invalid!');
                }
                console.error(error);
              });
          }

        }}
        label={typeParam}
        labelStyle={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}

      />
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={styles.radiousView}>
        <CustomInput
          title={'Email'}
          img={user}
          value={email}
          placeholder="Your Email"
          placeholderTextColor="gray"
          onChangeText={email => {
            setEmail(email);
          }}
        />
        <CustomInput
          secureTextEntry={true}
          title={'Password'}
          img={passwords}
          value={password}
          placeholder="Your Password"
          placeholderTextColor="gray"
          onChangeText={password => {
            setPassword(password);
          }}
        />
        <CustomInput
          secureTextEntry={true}
          title={'Password'}
          img={passwords}
          value={rePassword}
          placeholder="re-enter password"
          placeholderTextColor="gray"
          onChangeText={Repassword => {
            setRepassword(Repassword);
          }}
        />
        {signupView('Signup')}
        {buttonShow('Login')}
      </View>
      {/* {textShow()} */}
      {/* {inputsShow()}
      {buttonShow('Login')}
      <Text style={styles.dontA}>Don't have account, Please signup</Text>
      {buttonShow('Signup')} */}
    </View>
  );
};

export default Signup

const styles = StyleSheet.create({
  textShow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    height: 120,
    width: 200,
    alignSelf: 'center',
    marginTop: 60,
    backgroundColor: Colors.darkwhite,
  },
  radiousView: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  heading: {color: Colors.gray, fontWeight: 'bold', fontSize: 18},
  welcome: {
    padding: 20,
    marginTop: 200,
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  dontA: {alignSelf: 'center', marginTop: 10, color: Colors.gray},
  container: {flex: 1, backgroundColor: Colors.bgColor},
});