// Import module
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import Components


// body of Splash
export const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login')
    }, 2000)
  }, []);

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