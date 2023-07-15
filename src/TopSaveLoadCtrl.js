import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { app } from "./Firebase";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { showAlert } from './utility'; 

//import "firebase/firestore";

const TopSaveLoadCtrl = () => {


    const checkStorageSize = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          let totalSize = 0;
          let keyCollections = '';
          for (const key of keys) {
            const value = await AsyncStorage.getItem(key);
            totalSize += value ? value.length : 0;
            keyCollections += key + ',';
          }
    
          //Alert.alert('Storage Size', `The total size of AsyncStorage is ${totalSize} characters. And key collections are ${keyCollections}`);
          const message = `The total size of AsyncStorage is ${totalSize} characters. And key collections are ${keyCollections}`;
          if (Platform.OS === 'web') {
            window.alert(message);
          } else {
            Alert.alert('Storage Size', message);
          }
          

        } catch (error) {
          console.error('Error while checking storage size:', error);
          //Alert.alert('Error', 'Failed to check the storage size');
          showAlert('Error', 'Failed to check the storage size');
          /*if (Platform.OS === 'web') {
            window.alert('Failed to check the storage size');
          } else {
            Alert.alert('Error', 'Failed to check the storage size');
          }*/

        }
      };

      const checkDbAccess = async () => {
        console.log("check db access");

        try {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
        const uid = user?.uid;
        console.log("uid = ", uid?uid:"");

        const docRef = doc(db, "Answers", "3QxKLvMCBEMyZWXIvlwjjsJiIei1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            showAlert('Data', JSON.stringify(docSnap.data(), null, 2));
        } else {
            console.log("No such document!");
            showAlert('Warning', 'No such document!');
        }
        
        /*// Add a listener for auth state changes
        onAuthStateChanged(auth, async (user) => {
          if (user) {
              const uid = user.uid;
              console.log("uid = ", uid);

              const docRef = doc(db, "Answers", "3QxKLvMCBEMyZWXIvlwjjsJiIei1");
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                  console.log("Document data:", docSnap.data());
              } else {
                  console.log("No such document!");
              }
          } else {
              console.log("User is not logged in");
          }
        });*/


        //const db = firebase.firestore();
        // const docRef = doc(db, "Answers", "3QxKLvMCBEMyZWXIvlwjjsJiIei1"); // replace "docId" with your actual document ID
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        // } else {
        //   console.log("No such document!");
        // }

        /*
        const answersCollectionRef = collection(db, "Answers");
        const querySnapshot = await getDocs(answersCollectionRef);

        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
        */

      } catch (error) {
        console.error('Error:', error);
        //Alert.alert('Error', 'Failed to check the storage size');
        /*if (Platform.OS === 'web') {
          window.alert('Access Error');
        } else {
          Alert.alert('Error', 'Access Error');
        }*/
        showAlert('Error', 'Access Error');

      }

      };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>TopSaveLoadCtrl --- next</Text>
            <TouchableOpacity style={styles.button} onPress={checkStorageSize}>
                <Text style={styles.buttonText}>Check Storage Size</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={checkDbAccess}>
                <Text style={styles.buttonText}>Check DB Access</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        padding: 8,
      },
      buttonText: {
        color: 'white',
      },
  });

export default TopSaveLoadCtrl;