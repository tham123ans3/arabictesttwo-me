import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import FullScreenLayout  from './FullScreenLayout';
import TopSaveLoadCtrl from './TopSaveLoadCtrl'
import GoogleAppSignInButton from './GoogleAppSignInButton';
import { SafeAreaView} from 'react-native';

const TestingPoint  = () => {
  
    return (
        <SafeAreaView style={[
            styles.container,
            ]}>
          <GoogleAppSignInButton/>
          <FullScreenLayout/>
          <TopSaveLoadCtrl/>
        </SafeAreaView>
            
       
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
    box: {
      backgroundColor: 'green',
      padding: 20,
      borderRadius: 10,
    },
    text: {
      color : 'white',
      fontSize: 50,
    },
  });

  
export default TestingPoint;
