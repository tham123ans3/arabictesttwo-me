import React, { useState, useEffect } from 'react';
import { View, Button, Text, useColorScheme } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDriYHR51Ub9aVBZtgzcQJ1kmPJGra7h_4",
  authDomain: "arabicpracticetwo.firebaseapp.com",
  projectId: "arabicpracticetwo",
  storageBucket: "arabicpracticetwo.appspot.com",
  messagingSenderId: "171834861504",
  appId: "1:171834861504:web:026ba6b075f441f4070a25"
};

initializeApp(firebaseConfig);

const GoogleSignInButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? 'black' : 'white';

  return (
    <View>
      {user ? (
        <>
          <Text style={{color: 'red'}}>Welcome, {user.displayName || user.email}!</Text>
          <Button onPress={handleSignOut} title="Sign Out" />
        </>
      ) : (
        <Button onPress={signIn} title="Login with Google" />
      )}
    </View>
  );
};

export default GoogleSignInButton;
