import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import FullScreenLayout  from './FullScreenLayout';
import TopSaveLoadCtrl from './TopSaveLoadCtrl'
import GoogleSignInButton from './GoogleSignInButton';
import GoogleAppSignInButton from './GoogleAppSignInButton';

const TestingPoint  = () => {
  
    return (
        <View style={[
            styles.container,
            ]}>
          <GoogleSignInButton/>
          <GoogleAppSignInButton/>
          <FullScreenLayout/>
          <TopSaveLoadCtrl/>
        </View>
            
       
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
