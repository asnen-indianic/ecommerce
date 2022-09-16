import React, {useEffect} from 'react';
// import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function permissions() {
  const authStatus = await messaging().requestPermission()
  console.log("auth status ",authStatus)
  const enabled =
  authStatus===messaging.AuthorizationStatus.AUTHORIZED||
  authStatus===messaging.AuthorizationStatus.PROVISIONAL
  if(enabled){
    console.log('noti authorization status is ', authStatus);
    getFcmToken();
  }
  
}

const getFcmToken =async()=>{
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('fcm old token is', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('fcm token is ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('error on saving token', error.messaging);
    }
  }
}
export const notificationListener=async ()=>{
  messaging().onNotificationOpenedApp(remoteMessage=>{
    console.log(
      'Notification caused app to open background state:',
      remoteMessage.notification,
    );
  })
  messaging().getInitialNotification()
  .then(remoteMessage=>{
    if(remoteMessage){
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    }
  })
}
// const pushController = () => {
//   PushNotification.configure({
//     onRegister: function (token) {
//       console.log('TOKEN is = ', token);
//     },
//     onNotification: function (notification) {
//       console.log('NOTIFICATION  :  ', notification);
//     },
//     senderID: '575795426716',
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },
//     popInitialNotification: true,
//     requestPermissions: true,
//   });
// };
// const PushController = () => {
//   useEffect(() => {
//     pushController();
//   });
//   return null;
// };
// export default PushController;
