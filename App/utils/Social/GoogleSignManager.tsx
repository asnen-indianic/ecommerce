 import {GoogleSignin} from '@react-native-google-signin/google-signin'
 import auth from '@react-native-firebase/auth'
 export const configureGoogle =()=>{
   GoogleSignin.configure({
     offlineAccess: false,
     hostedDomain: '',
     androidClientId:'575795426716-dou23626kctci9gkni5cp7etgtsha67d.apps.googleusercontent.com',
     forceCodeForRefreshToken: true,
     accountName: '',
     scopes: [
       'https://www.googleapis.com/auth/userinfo.email',
       'https://www.googleapis.com/auth/userinfo.profile',
     ],
     webClientId:
       '575795426716-iierpquv1ipacf3n8ij7topt6fk9ft5j.apps.googleusercontent.com',
   });
 }
 export const loginWithGoogle =(callback:any)=>{
   GoogleSignin.signIn()
     .then(response => {
       console.log('response of google login is ', response);
       if (response) {
         const googleCredential = auth.GoogleAuthProvider.credential(
           response.idToken,
         );
         callback({data: response, googleCredential});
       } else {
         callback('Error Occured');
       }
     })
     .catch(error => {
       console.log('error while login', error);
     });
 }
 export const firebaseGoogleSign =(googleCredentials)=>{
   return new Promise((resolve, reject) => {
     return auth()
       .signInWithCredential(googleCredentials)
       .then(response => {
         if (response) resolve(response);
         reject('Error Occured');
       });
   }).catch(error => {
     console.log('error while signin with firebase', error);
   });
 }