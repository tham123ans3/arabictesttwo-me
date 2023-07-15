import React, {useState, useEffect} from 'react';
import { initializeApp } from 'firebase/app';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { View, Text, Button, useColorScheme } from 'react-native';

import { GoogleAuthProvider, signInWithCredential, signInWithRedirect, getRedirectResult, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './Firebase';


GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '171834861504-cao2u77o4t8me8d7kdcuo7ep4nqm9gmk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *. 
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '171834861504-7eatrji5i49i7nc4g071e2ctj3u226o6.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const GoogleAppSignInButton = () => {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {

    const signInSilently = async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
  
        const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
        const auth = getAuth(app);
        const firebaseUser = await signInWithCredential(auth, googleCredential);
        console.log('Firebase user:', firebaseUser.user);
  
        setUserInfo(userInfo);
  
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // user has not signed in yet
          console.log("user has not signed in yet ,", error);
          // user has not signed in yet, get the user info from persistent storage
       } else {
          // some other error
          console.log("some other error, ", error);
        }
      }
    };

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, setUserInfo);
    signInSilently(); // try silent sign-in when the component mounts
    return unsubscribe;

  }, []);

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const auth = getAuth(app);
      const firebaseUser = await signInWithCredential(auth, googleCredential);
      console.log('User info:', userInfo);
      console.log('Firebase user:', firebaseUser.user);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log("user has not signed in yet ,", error);
      } else {
        // some other error
        console.log("some other error, ", error);
      }
    }
  };

  const signIn = async () => {
    try {
      //await GoogleSignin.hasPlayServices();

      console.log('signIn Pressed')
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const auth = getAuth(app);
      const firebaseUser = await signInWithCredential(auth, googleCredential);
      console.log('User info:', userInfo);
      console.log('Firebase user:', firebaseUser.user);
      console.log('userInfo');
      console.log(userInfo);
      //console.log(userInfo.user.id);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('error')
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to nullify the user info when the user signs out
    } catch (error) {
      console.error(error);
    }
  };

  if (userInfo) {
    return (
      <View>
        <Text style={{color: 'red'}}>Welcome, {userInfo?.user?.name} {userInfo?.user?.email}!</Text>
        <Button title="Logout" onPress={signOut} />
      </View>
    );
  } else {
    return (
      <View>
        <GoogleSigninButton
          onPress={signIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </View>
    );
  }

};

export default GoogleAppSignInButton;


