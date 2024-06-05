import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

const backImage = require('../../assets/BG-Image.jpg')

const Login = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onHandleLogin = () => {
        if(email !== "" && password !== "")
        {
            signInWithEmailAndPassword(auth, email, password).then(() => Alert.alert("Log In Successfull"))
        }
    }
  return (
    <KeyboardAwareScrollView className="bg-gray-500">
        
    <View>
      <Image source = {backImage} />
    </View>

    <View className = "bg-white h-screen rounded-t-3xl">
        <Text className = "text-[#d60e45] text-3xl font-semibold text-center py-3 mt-1">
           Log In
        </Text>

        <View>
            <TextInput 
                className = "tracking-widest bg-gray-200 rounded-lg w-60 text-base py-2 px-3 mx-10 mb-5"
                placeholder = 'Enter Email'
                keyboardType = 'email-address'
                textContentType = 'emailAddress'
                value = {email}
                onChangeText = {(text) => setEmail(text)}
            />
            <TextInput 
                className = "tracking-widest bg-gray-200 rounded-lg w-60 text-base py-2 px-3 mx-10 mb-5"
                placeholder = 'Enter Password'
                secureTextEntry = {true}
                autoCorrect = {false}
                autoCapitalize = 'none'
                textContentType = 'password'
                value = {password}
                onChangeText = {(text) => setPassword(text)}
            />
        </View>

        <TouchableOpacity onPress = {onHandleLogin} className="bg-[#fac21a] py-2 rounded-lg w-60 mx-10 mt-5 mb-3">
            <Text className="text-center font-bold text-lg">
                Login
            </Text>
        </TouchableOpacity>

        <View className="flex-row space-x-4 justify-center">
            <Text>
                Don't Have An Account? 
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-[#d60e45] font-medium">
                    Click Here
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    </KeyboardAwareScrollView>
  )
}

export default Login