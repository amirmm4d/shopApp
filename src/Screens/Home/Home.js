// Import module
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, Image, FlatList, TextInput, StyleSheet } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Components
import Icon from 'react-native-vector-icons/Ionicons';

// api urls
const url = 'http://194.62.43.26:1337/api'
const seatchUrl = '/products/search'

// body of Home
export const Home = (props) => {
  // state
  const [itemCart, setItemCart] = useState([])
  const [items, setItems] = useState()
  const [search, setSearch] = useState('')
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')

  // useEffect
  useEffect(() => {
    getItemHandler()
  }, []);

  // useEffect(() => {

  // },[search])

  // get Item from API
  const getItemHandler = async () => {
    const Token = await AsyncStorage.getItem('Token')
    const headers = { 'Authorization': `Token ${Token}` }
    const { data } = await axios.get(url + '/products', { headers: headers })
    setItems(data.results)
    setNext(data.next)
  }

  const loadItemsHandler = async () => {
    const Token = await AsyncStorage.getItem('Token')
    const headers = { 'Authorization': `Token ${Token}` }
    const { data } = await axios.get(next, { headers: headers })
    setItems(old => [...old, ...data.results])
    setNext(data.next)
    setPrev(data.previous)
  }

  const searchHandler = async (value) => {
    setSearch(value)
    const Token = await AsyncStorage.getItem('Token')
    const headers = { Authorization: `Token ${Token}` }
    const params = { name: search }
    const { data } = await axios.get(url + seatchUrl, { params: params, headers: headers })
    setItems(data)
  }

  const test = (value) => {
    setSearch(value)
    console.log(search);
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
        {/* <Pressable
          onPress={() => searchHandler()}
        >
          <Icon style={styles.menu} name="search" size={30} color="black" />
        </Pressable> */}
        <TextInput style={{
          width: '70%',
          height: '60%',
          backgroundColor: 'white',
          marginLeft: '10%',
          borderRadius: 12,
          color: 'orange',
          fontFamily: 'Vazirmatn',
          fontSize: 16,
          textAlign: 'center',
        }}
          value={search}
          // onChange={() => test()}
          onChangeText={v => searchHandler(v)}
        />
        <Pressable
          onPress={() => //props.navigation.navigate({
            //   name: 'cart',
            //   params: itemCart
            // })
            loadItemsHandler()
          }
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
          // showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.5}
          onEndReached={() => loadItemsHandler()}
          renderItem={({ item }) => {
            return (
              <View style={styles.items}>
                <View
                  style={{
                    backgroundColor: 'gray',
                    width: 150,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name='happy-outline' size={130}
                    style={{
                      transform: [{ rotate: '20deg' }],
                    }}
                  />
                </View>
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
                  >{item.name}</Text>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <Text>Price: 15000$</Text>
                    <Pressable
                      onPress={() => addToCartHandler(item.id)}
                    >
                      <Icon name='add-circle' color='orange' size={35} />
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