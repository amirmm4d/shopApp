// Import module
import React, { } from 'react'
// import { View, Text, Pressable, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import Components
import { Home, Login, Signup, Cart, Splash } from '../../index'
const Stack = createNativeStackNavigator()

// body of Route
export const Route = (props) => {

  // return JSX
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='splash' component={Splash} />
        <Stack.Screen name='signup' component={Signup} />
        <Stack.Screen name='signin' component={Login} />
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='cart' component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
