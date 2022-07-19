// Import module
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, Image, FlatList, StyleSheet } from 'react-native'
import { log } from 'react-native-reanimated';
import axios from 'axios';

// import Components
import Icon from 'react-native-vector-icons/Ionicons';

// body of Home
export const Home = (props) => {
  const [itemCart, setItemCart] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    getItemHandler()
  }, []);

  const getItemHandler = async () => {
    const { data } = await axios.get('http://jsonplaceholder.typicode.com/photos')
    const res = data.slice(0, 50)
    setItems(res)
  }

  const addToCartHandler = (id) => {
    const [...res] = items
    const resulat = res.find(item => item.id == id)
    setItemCart(old => [...old, resulat])
  }

  // return JSX
  return (
    <View style={styles.homeContainer}>
      <View style={styles.header}>
        <Pressable
          onPress={() => console.log(items)}
        >
          <Icon style={styles.menu} name="menu" size={30} color="black" />
        </Pressable>
        <Text style={styles.logoName} >SHOP</Text>
        <Pressable
          onPress={() => props.navigation.navigate({ 
            name: 'cart',
            params: itemCart
            })}
        >
          <View style={styles.cartContainer}>
            <Icon style={styles.cart} name="cart-outline" size={30} color="black" />
            <View style={itemCart == 0 ? styles.numberContainerDisable : styles.numberContainer}>
              <Text style={styles.number}>{itemCart.length}</Text>
            </View>
          </View>
        </Pressable>
      </View>
      <View style={styles.categories}>
        <FlatList
          style={{
            width: '100%',
          }}
          data={items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(items, index) => items.id * index}
          renderItem={({ item }) => {
            return (
              <View style={styles.items}>
                <Image
                  style={{ width: 140, height: 140, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
                  source={{ uri: item.thumbnailUrl }}
                />
                <View style={{
                  flex: 1,
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Vazirmatn-Medium',
                      width: 180
                    }}
                  >{item.title}</Text>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Text>Price: 15000$</Text>
                    <Pressable
                      onPress={() => addToCartHandler(item.id)}
                    >
                      <View
                        style={{
                          color: 'white',
                          width: 25,
                          height: 25,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 20,
                          backgroundColor: 'orange'
                        }}
                      >

                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                          }}
                        >+</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            )
          }}
        />
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
    margin: 10,
    fontSize: 34
  },
  logoName: {
    fontFamily: 'Vazirmatn-Medium',
    fontSize: 22,
    margin: 10
  },
  cart: {
    margin: 10
  },
  numberContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 50,
    position: 'absolute',
    top: '5%',
    left: '33%',
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
  categories: {
    flex: 5.5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  items: {
    backgroundColor: 'white',
    width: '95%',
    height: 140,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})