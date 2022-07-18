// Import module
import React,{} from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import formik from 'formik'
import yup from 'yup'

// import Components


// body of Signin
export const Signin = (props) => {

  // return JSX
  return (
    <View style={styles.loginContainer}>
      <View>
        <Text style={styles.header}>SignIn</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={[styles.username, styles.inputs]}
          placeholder='Username'
          placeholderTextColor={'#8338ec'}
          contextMenuHidden={true}
          selectionColor={'#8338ec'}
        />
        <TextInput
          style={[styles.password, styles.inputs]}
          placeholder='Password'
          placeholderTextColor={'#8338ec'}
          contextMenuHidden={true}
          secureTextEntry={true}
          selectionColor={'#8338ec'}
        />
        <Pressable style={styles.forgotPass}
          onPress={() => {
            console.log('forgot pass')
          }}
        >
          <Text style={styles.forgotText}>forgot password ?</Text>
        </Pressable>
        <Pressable
          style={styles.login}
          onPress={() => props.navigation.navigate('home')}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  loginContainer: {
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
    color: '#8338ec',
    fontSize: 22,
  }
})