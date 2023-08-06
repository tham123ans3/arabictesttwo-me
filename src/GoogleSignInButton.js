import React, { useState, useEffect } from 'react';
import { View, Button, Text, useColorScheme } from 'react-native';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
//import { app } from "./Firebase";

const GoogleSignInButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //const auth = getAuth(app);
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };

  /*  console.log(auth.user);
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  */

  }, []);

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      //const auth = getAuth(app);
      const auth = getAuth();
      await signInWithPopup(auth, provider);
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    //const auth = getAuth(app);
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
