// Import module
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Components

// body of Splash
export const Splash = ({ navigation }) => {

  useEffect(() => {
    autoLoginHandler()
  }, []);

  // auto login
  const autoLoginHandler = async () => {
    const Token = await AsyncStorage.getItem('Token')
    if (Token == null || Token == '' || Token == undefined ) {
      console.log(`empty ${Token}`);
      navigation.navigate('signin')
    }else {
      navigation.navigate('home')
      console.log(`Token ${Token}`);
    }
  }

  // return JSX
  return (
    <View style={styles.container} >
      <Text style={styles.text} >
        Splash Screen
      </Text>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a9d8f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Vazirmatn-Medium',
    fontSize: 26,
    color: '#fefae0'
  }
})