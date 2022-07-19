// Import module
import React, { } from 'react'
import { View, Text, Pressable, FlatList, Image, StyleSheet } from 'react-native'

// import Components


// body of Cart
export const Cart = (props) => {

  console.log(props.route.params);

  // return JSX
  return (
    <View style={styles.cartContainer}>
      <View style={styles.categories}>
        <FlatList
          style={{
            width: '100%',
            height: '90%'
          }}
          data={props.route.params}
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
      <Pressable
        style={styles.submmitCon}
        onPress={() => addToCartHandler(item.id)}
      >
        <Text style={styles.submmit}>تکمیل خرید</Text>
      </Pressable>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    backgroundColor: '#bde0fe',
    flexDirection: 'column',
    justifyContent: 'space-between'
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
  },
  submmitCon: {
    marginBottom: 20,
    width: 100,
    height: 35,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'center',
  },
  submmit: {
    color: 'white',
    fontFamily: 'Vazirmatn-Medium'
  }
})