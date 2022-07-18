// Import module
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput, Image, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'

// import Components

// validation Schema
let formikSchema = yup.object().shape({
  username: yup.string(),
  username: yup.string(),
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required').min(6).max(10)
})

// body of Signin
export const Signin = (props) => {

  // return JSX
  return (
    <View style={styles.signinContainer}>
      <View>
        <Text style={styles.header}>Signup</Text>
      </View>
      <Formik
        validationSchema={formikSchema}
        initialValues={{ name: '', email: '', username: '', password: '' }}
        onSubmit={() => props.navigation.navigate('home')}
      >
        {({ values, errors, touched, isValid, handleChange, handleSubmit }) => (

          <View style={styles.form}>
            <TextInput
              style={[styles.username, styles.inputs]}
              placeholder='Name'
              placeholderTextColor={'#8338ec'}
              selectionColor={'#8338ec'}
              onChangeText={handleChange('name')}
              value={values.name}
            />
            <TextInput
              style={[styles.password, styles.inputs]}
              placeholder='Email'
              placeholderTextColor={'#8338ec'}
              selectionColor={'#8338ec'}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            <TextInput
              style={[styles.password, styles.inputs]}
              placeholder='username'
              placeholderTextColor={'#8338ec'}
              selectionColor={'#8338ec'}
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
              placeholderTextColor={'#8338ec'}
              contextMenuHidden={true}
              secureTextEntry={true}
              selectionColor={'#8338ec'}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {
              (errors.username && touched.username) &&
              <Text style={styles.error}>{errors.password}</Text>
            }
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already a member?</Text>
              <Pressable
                style={styles.login}
                onPress={() => props.navigation.navigate('login')}
              >
                <Text style={[styles.loginText, styles.loginT]}>Login</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.signup}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.signupText}>Signup</Text>
            </Pressable>
          </View>)}
      </Formik>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  signinContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8338ec'
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
    color: '#8338ec',
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
  signup: {
    width: 120,
    height: 45,
    backgroundColor: '#edf2f4',
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 22
  },
  signupText: {
    fontFamily: 'Vazirmatn-Light',
    color: '#8338ec',
    fontSize: 22,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  login: {
    color: '#edf2f4',
  },
  loginText: {
    color: '#edf2f4',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Vazirmatn-Light'
  },
  loginT: {
    fontFamily: 'Vazirmatn-Bold'
  },
  error: {
    fontFamily: 'Vazirmatn-Light',
    color: '#ffb703',
  }
})