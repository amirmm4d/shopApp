// Import module
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput, Image, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

// api url
const url = 'http://194.62.43.26:1337/api'
const singin = '/users/signin'

// import Components

// validation Schema
let formikSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required').min(6).max(10)
})

// body of Login
export const Login = (props) => {
  // state
  const [newUser, setNewUser] = useState(false)

  // useEffect
  useEffect(() => {
    if (props.route.params == 'newUser') {
      setNewUser(true)
    }
  }, []);

  // login
  const handleLogin = async (values) => {
    try {
      const res = await axios.post(url + singin, { 'username': values.username, 'password': values.password })
      const { token } = res.data
      storeTokenHandler(token)
      if (token) {
        props.navigation.navigate('home')
      }
    }
    catch (e) {
      console.log(e.response);
    }
  }
  // Save Token
  const storeTokenHandler = async (Token) => {
    try {
      // save Token
      await AsyncStorage.setItem('Token', Token);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  // return JSX
  return (
    <View style={styles.loginContainer}>
      <View>
        <Text style={styles.header}>Login</Text>
      </View>
      {
        (newUser) &&
        <Text style={styles.newUser}>new user please wait for accept</Text>
      }
      <Formik
        validationSchema={formikSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={values => handleLogin(values)}
      >
        {({ values, errors, touched, isValid, handleChange, handleSubmit }) => (
          <View style={styles.form}>
            <TextInput
              style={[styles.username, styles.inputs]}
              placeholder='Username'
              placeholderTextColor={'#598392'}
              selectionColor={'#598392'}
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {
              (errors.username && touched.username) &&
              <Text style={styles.error}>{errors.username}</Text>
            }
            <TextInput
              style={[styles.password, styles.inputs]}
              placeholder='Password'
              placeholderTextColor={'#598392'}
              secureTextEntry={true}
              selectionColor={'#598392'}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {
              (errors.password && touched.password) &&
              <Text style={styles.error}>{errors.password}</Text>
            }
            <Pressable style={styles.forgotPass}>
              <Text style={styles.forgotText}>forgot password ?</Text>
            </Pressable>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.login}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.loginText}>Login</Text>
              </Pressable>

              <Pressable
                style={styles.singup}
                onPress={() => props.navigation.navigate('signup')}
              >
                <Text style={styles.loginText}>Signup</Text>
              </Pressable>
            </View>
          </View>)}
      </Formik>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#598392'
  },
  header: {
    fontFamily: 'Vazirmatn-Medium',
    fontSize: 50,
    color: '#edf2f4',
    margin: 26
  },
  form: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    backgroundColor: '#edf6f9',
    width: '70%',
    height: 48,
    margin: 5,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    color: '#598392',
    fontFamily: 'Vazirmatn-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotText: {
    margin: 12,
    fontFamily: 'Vazirmatn-Light',
    color: '#edf2f4',
    fontSize: 16,
    marginTop: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 18
  },
  login: {
    width: 120,
    height: 45,
    backgroundColor: '#edf2f4',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singup: {
    width: 120,
    height: 45,
    backgroundColor: '#edf2f4',
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Vazirmatn-Light',
    color: '#598392',
    fontSize: 22,
  },
  error: {
    fontFamily: 'Vazirmatn-Light',
    color: '#ffb703',
  },
  newUser: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Vazirmatn-Bold'
  }
})