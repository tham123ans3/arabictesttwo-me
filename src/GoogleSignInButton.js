import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDriYHR51Ub9aVBZtgzcQJ1kmPJGra7h_4",
  authDomain: "arabicpracticetwo.firebaseapp.com",
  projectId: "arabicpracticetwo",
  storageBucket: "arabicpracticetwo.appspot.com",
  messagingSenderId: "171834861504",
  appId: "1:171834861504:web:026ba6b075f441f4070a25"
};

const app = initializeApp(firebaseConfig);

const GoogleSignInButton = () => {
  const [userInfo, setUserInfo] = useState(null);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      setUserInfo(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>adfsdfsd</Text>
      <Text>adfsdfsd</Text>
      <Text>adfsdfsd</Text>
      <Text>adfsdfsd</Text>
      <Button onPress={signIn} title="Login with Google" />
    </View>
  );
};

export default GoogleSignInButton;
