import React from 'react';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';

/*GoogleSignin.configure({
  iosClientId: '171834861504-popt7b4i0ofq076l39gkhnhrvtcm3nfg.apps.googleusercontent.com', // replace with your web client ID from Firebase
  webClientId: '171834861504-cao2u77o4t8me8d7kdcuo7ep4nqm9gmk.apps.googleusercontent.com',
});
*/

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '171834861504-cao2u77o4t8me8d7kdcuo7ep4nqm9gmk.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *. 
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: '171834861504-7eatrji5i49i7nc4g071e2ctj3u226o6.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const GoogleAppSignInButton = () => {
  const signIn = async () => {
    try {
      //await GoogleSignin.hasPlayServices();
      /*GoogleSignin.configure({
        iosClientId: '171834861504-popt7b4i0ofq076l39gkhnhrvtcm3nfg.apps.googleusercontent.com', // replace with your web client ID from Firebase
        webClientId: '171834861504-cao2u77o4t8me8d7kdcuo7ep4nqm9gmk.apps.googleusercontent.com',
      });*/

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
