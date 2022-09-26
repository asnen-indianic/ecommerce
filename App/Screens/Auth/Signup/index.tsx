import React ,{} from 'react'
import { useState } from 'react';
import {View, Text, TextInput,StyleSheet, Alert, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CustomInput, Button} from '../../../CommonViewUtilities';
import user from '../../../assets/user.png'
import _email from '../../../assets/mail.png'

import passwords from '../../../assets/password.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebaseGoogleSign, loginWithGoogle } from '../../../utils/Social/GoogleSignManager';

import Colors from '../../../Colors';
import { firebase } from '@react-native-firebase/messaging';
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

interface Props {
    navigation: any;
}

const Signup = ({navigation}: Props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');
    
    const nameRef = React.useRef()
    const emailRef = React.useRef()
    const passRef = React.useRef()
    const rePassRef = React.useRef();



const validation=()=>{
  if(!name){
    Alert.alert('Alert', 'Enter you name');
    return false;
  }
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
const googleLogin =()=>{
  let googleLoginResponse;
  loginWithGoogle(response => {
    googleLoginResponse = response;
    console.log('response is ', response);
    firebaseGoogleSign(googleLoginResponse.googleCredential)
      .then(res => {
        console.log('let me show response isss ', res);
      })
      .catch(error => {
        console.log('firebase error is ', error);
      });
  });
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
          if(typeParam=='Login'){
            navigation.navigate('Login');         

          }
          else{
            googleLogin()
            console.log("google login")
          }
        }}
        label={typeParam}
        labelStyle={{fontSize: 18, color: Colors.bgColor, fontWeight: 'bold'}}

      />
    </View>
  );
};
const signup=async()=>{
  var data;
          data={
            name,
            email,
        }
          if (!!validation()) {
            try {
              await firebase
                .firestore()
                .collection('users')
                .add(data)
                .then(suc => {
                  if (!!suc) {
                    Alert.alert('', 'Sucessful post data to the firestore!');
                  }
                });
            } catch (err) {}

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
}
const signupView = (typeParam: any) => {
  return (
    <View style={{marginTop: 10}}>
      <StatusBar backgroundColor={Colors.bgColor} />
      <Button
        buttonStyle={{backgroundColor: '#00FA9A'}}
        onPress={() => {
          signup();
        }}
        label={typeParam}
        labelStyle={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}
      />
    </View>
  );
};

  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome!</Text>
        <View style={styles.radiousView}>
          <CustomInput
            autoFocus={true}
            onSubmitEditing={() => {
              emailRef?.current?.focus();
            }}
            title={'Name'}
            img={user}
            value={name}
            placeholder="Your Name"
            placeholderTextColor="gray"
            onChangeText={name => {
              setName(name);
            }}
          />
          <CustomInput
            inputRef={emailRef}
            onSubmitEditing={() => {
              passRef.current?.focus();
            }}
            title={'Email'}
            img={_email}
            value={email}
            placeholder="Your Email"
            placeholderTextColor="gray"
            onChangeText={email => {
              setEmail(email);
            }}
          />
          <CustomInput
            inputRef={passRef}
            onSubmitEditing={() => {
              rePassRef?.current?.focus();
            }}
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
            inputRef={rePassRef}
            onSubmitEditing={() => {
              signup();
            }}
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
          {buttonShow('Google Login')}

          {/* {buttonShow('Login')} */}

        </View>
      </View>
    </KeyboardAwareScrollView>
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
    marginTop: 100,
    fontSize: 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  dontA: {alignSelf: 'center', marginTop: 10, color: Colors.gray},
  container: {flex: 1, backgroundColor: Colors.bgColor},
});