// Import module
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, TextInput, Image, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

// import Components

// api url
const url = 'http://194.62.43.26:1337/api'
const signup = '/users/signup'

// validation Schema
let formikSchema = yup.object().shape({
  firstname: yup.string().required('firtname is required'),
  lastname: yup.string().required('lastname is required'),
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required').min(4).max(14)
})

// body of Signin
export const Signup = (props) => {
  // state
  const [isUsername, setIsusername] = useState(false)

  // methods
  const signupHandler = async (values) => {
    try {
      const res = await axios.post(url + signup,
        {
          'firs_tname': values.firstname,
          'last_name': values.lastname,
          'username': values.username,
          'password': values.password
        })
      if (res.status == 201) {
        setIsusername(false)
        props.navigation.navigate({
          name: 'signin',
          params: 'newUser'
        })
      }
    } catch (e) {
      if (e.response.data.username) {
        setIsusername(true)
      }
    }
  }

  // return JSX
  return (
    <View style={styles.signinContainer}>
      <View>
        <Text style={styles.header}>Signup</Text>
      </View>
      <Formik
        validationSchema={formikSchema}
        initialValues={{ firstname: '', lastname: '', username: '', password: '' }}
        onSubmit={values => signupHandler(values)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <View style={styles.form}>
            <TextInput
              style={[styles.username, styles.inputs]}
              placeholder='First Name'
              placeholderTextColor={'#8338ec'}
              selectionColor={'#8338ec'}
              onChangeText={handleChange('firstname')}
              value={values.name}
            />
            {
              (errors.firstname && touched.firstname) &&
              <Text style={styles.error}>{errors.firstname}</Text>
            }
            <TextInput
              style={[styles.password, styles.inputs]}
              placeholder='Last Name'
              placeholderTextColor={'#8338ec'}
              selectionColor={'#8338ec'}
              onChangeText={handleChange('lastname')}
              value={values.email}
            />
            {
              (errors.lastname && touched.lastname) &&
              <Text style={styles.error}>{errors.lastname}</Text>
            }
            <TextInput
              style={[styles.username, styles.inputs]}
              placeholder='Username'
              placeholderTextColor={'#8338ec'}
              selectionColor={'#8338ec'}
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {
              (errors.username && touched.username) &&
              <Text style={styles.error}>{errors.username}</Text>
            }
            {
              (isUsername) &&
              <Text style={styles.error}>username Exists</Text>
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
              (errors.password && touched.password) &&
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
    fontFamily: 'Vazirmatn-Medium'
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