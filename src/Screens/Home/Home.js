// Import module
import React, { useState } from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'

// import Components
import Icon from 'react-native-vector-icons/Ionicons';

// body of Home
export const Home = (props) => {
  const [itemCount, setItemCount] = useState(0)

  // return JSX
  return (
    <View style={styles.homeContainer}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => setItemCount(itemCount + 1)}
        >
          <Icon style={styles.menu} name="menu" size={30} color="black" />
        </Pressable>
        <Text style={styles.logoName} >SHOP</Text>
        <Pressable 
          onPress={() => setItemCount(itemCount - 1)}
        >
          <View style={styles.cartContainer}>
            <Icon style={styles.cart} name="cart-outline" size={30} color="black" />
            <View style={itemCount == 0 ? styles.numberContainerDisable : styles.numberContainer}>
              <Text style={styles.number}>{itemCount}</Text>
            </View>
          </View>
        </Pressable>
      </View>
      <View style={styles.slider}>
        <Text>
          slider
        </Text>
      </View>
      <View style={styles.categories}>
        <Text>cate</Text>
      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f4a261',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menu: {
    color: 'black',
    margin: 15,
    fontSize: 34
  },
  logoName: {
    fontFamily: 'Vazirmatn-Medium',
    fontSize: 22
  },
  cart: {
    margin: 15
  },
  numberContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainerDisable: {
    display: 'none'
  },
  number: {
    fontSize: 12,
    fontFamily: 'Vazirmatn-Light',
    color: 'white'
  },
  cartContainer: {
    flexDirection: 'row'
  },
  slider: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categories: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})