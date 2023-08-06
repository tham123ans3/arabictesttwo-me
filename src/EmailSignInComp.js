import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, Text, useColorScheme, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { setActiveFirebase, getActiveFirebase } from './FirebaseEmail';
import { getApp, deleteApp } from 'firebase/app';
import FirebaseAccessLayer from './FirebaseEmailDataAccess';

const EmailSigninComp = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setSignIn] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    setActiveFirebase(0); // select the Firebase configuration to use
    let auth;
    try {
       ({ auth } = getActiveFirebase()); //try first the [DEFAULT] app
    }
    catch (error) {
      const app = getApp(); //get default app
      deleteApp(app); //delete default app
      ({ auth } = getActiveFirebase()); //retry the default app again
    }

    const unsubscribe = onAuthStateChanged(auth, (user1) => {
      if (user1) {
        setUser(user1);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async () => {
    try {
      const auth = getAuth();
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      setIsLoading(false);
      setSignUp(false);
      const user1 = userCredential.user;
      setUser(user1);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      const auth = getAuth();
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const resultData = await FirebaseAccessLayer.read('Accesses', userCredential.user.uid);
      console.log(resultData);

      setIsLoading(false);
      setSignIn(false);
      const user1 = userCredential.user;
      setUser(user1);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const LoginWithEmail = async () => {
    try {
      setSignIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  
  const signUpWithEmail = async () => {
    try {
      setSignUp(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  const CancelLogin = async () => {
    try {
      setSignIn(false);
      setSignUp(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      setIsLoading(true);
      await signOut(auth);
      setIsLoading(false);
      setUser(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
                                                           };

  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? 'black' : 'white';

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {user ? (
        <>
          <Text style={{color: 'red'}}>Welcome, {user.email}!</Text>
          <Button onPress={handleSignOut} title="Sign Out" />
        </>
      ) : (
        <>
          { isSignUp ? (
            <>
            <View>
            
             <TextInput 
                placeholder="Name" 
                value={name} 
                onChangeText={setName} 
                style={{color: textColor, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}} 
              />
              <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                style={{color: textColor, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}} 
              />
              <TextInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                style={{color: textColor, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}} 
                secureTextEntry
              />
              <Button onPress={signUp} title="Sign Up" />
              <Button onPress={CancelLogin} title="Cancel" />
            </View>
            </>
          ) : isSignIn ? ( <>
            <View>
              <TextInput 
                placeholder="Email" 
                value={email} 
                onChangeText={setEmail} 
                style={{color: textColor, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}} 
              />
              <TextInput 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                style={{color: textColor, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10}} 
                secureTextEntry
              />
              <Button onPress={signIn} title="Sign In" />
              <Button onPress={CancelLogin} title="Cancel" />
            </View>
          </>
          ) : (
            <>
              <Button onPress={LoginWithEmail} title="Login with Email" />
              <Button onPress={signUpWithEmail} title="Sign Up with Email" />
            </>
          )}
        </>
      )}
    </View>
  );
};

export default EmailSigninComp;
