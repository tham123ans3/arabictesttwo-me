import React from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';

GoogleSignin.configure({
  iosClientId: '171834861504-popt7b4i0ofq076l39gkhnhrvtcm3nfg.apps.googleusercontent.com', // replace with your web client ID from Firebase
});

const GoogleAppSignInButton = () => {
  const signIn = async () => {
    try {
      //await GoogleSignin.hasPlayServices();
      console.log('signIn Pressed')
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo');
      console.log(userInfo);
    } catch (error) {
      console.log('error')
      console.error(error);
    }
  };

  return (
    <View>
      <GoogleSigninButton
        onPress={signIn}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />
    </View>
  );
};

export default GoogleAppSignInButton;
