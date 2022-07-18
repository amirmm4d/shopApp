// Import module
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput, Button, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

// api
const url = 'http://194.62.43.26:1337/api'
const singup = '/users/signup'
const singin = '/users/signin'

// import Components

// validation Schema
let formikSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required').min(6).max(10)
})

// body of Login
export const Login = (props) => {

  const [userdetails, setUserDetails] = useState({})

  const handleLogin = async (values) => {
    const data = {
      'username': values.username,
      'password': values.password
    }
    try {
      const res = await axios.post(url + singin, data)
      const { token } = res.data
      console.log(token);
    }
    catch (err) {
      console.log(`error: ${err.code}`);
    }
  }


  // return JSX
  return (
    <View style={styles.loginContainer}>
      <View>
        <Text style={styles.header}>Login</Text>
      </View>
      <Formik
        validationSchema={formikSchema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ values, errors, touched, isValid, handleChange, handleSubmit }) => (
          <View style={styles.form}>
            <TextInput
              style={[styles.username, styles.inputs]}
              placeholder='Username'
              placeholderTextColor={'#598392'}
              contextMenuHidden={true}
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
              contextMenuHidden={true}
              secureTextEntry={true}
              selectionColor={'#598392'}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {
              (errors.password && touched.password) &&
              <Text style={styles.error}>{errors.password}</Text>
            }
            <Pressable style={styles.forgotPass}
              onPress={() => {
                console.log('forgot pass')
              }}
            >
              <Text style={styles.forgotText}>forgot password ?</Text>
            </Pressable>
            <Pressable
              style={styles.login}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
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
  login: {
    width: 120,
    height: 45,
    backgroundColor: '#edf2f4',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 22
  },
  loginText: {
    fontFamily: 'Vazirmatn-Light',
    color: '#598392',
    fontSize: 22,
  },
  error: {
    fontFamily: 'Vazirmatn-Light',
    color: '#ffb703',
  }
})