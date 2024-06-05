import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { useNavigation} from "@react-navigation/native"
import { firebase } from "../firebaseConfig"

const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()

  const loginUser = async (email,password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    }catch (error){
      alert(error.message)
    }
  }

  return (
    <View style = {StyleSheet.conatiner}>
      <Text style = {{fontWeight:'bold', fontSize:20}}>
        Login
      </Text>

      <View style ={{marginTop:40}}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => loginUser(email,password)}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold', fontSize:22}}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{marginTop:20, alignItems:'center'}}
      >
        <Text style={{fontWeight:'bold', fontSize:16}}>
          Click Here To Sign-Up
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  conatiner: {
    flex:1,
    alignItems:'center',
    marginTop:100,
  },
  TextInput: {
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:"#000",
    marginBottom:10,
    textAlign:'center'
  },
  button: {
    marginTop:50,
    height:70,
    width:250,
    backgroundColor:'026efd',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  }
})