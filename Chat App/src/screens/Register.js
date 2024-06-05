import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

const backImage = require('../../assets/BG-Image.jpg')

const Register = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const onHandleRegister = () => {
        if(email !== "" && password !== "" && confirmPassword !== "")
        {
            if(password !== confirmPassword)
            {
                Alert.alert("Password Does Not Match")
            }else {
                createUserWithEmailAndPassword(auth, email, password).then(
                    async (res) => {
                        console.log("Resualt = ", res)
                        Alert.alert("User Created Successfully")
                        await addDoc(collection(db, 'Users'), {
                            userId: res.user.uid,
                            email: res.user.email,
                            username: res.user.email.split("@")[0],
                        })
                    }
                )
            }
        }
    }

  return (
    <KeyboardAwareScrollView className="bg-gray-500">
    <View>
      <Image source = {backImage} />
    </View>

    <View className = "bg-white h-screen rounded-t-3xl">
        <Text className = "text-[#d60e45] text-3xl font-semibold text-center py-3 mt-1">
           Register
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
                autoCapitalize = {false}
                textContentType = 'password'
                value = {password}
                onChangeText = {(text) => setPassword(text)}
            />
            <TextInput 
                className = "tracking-widest bg-gray-200 rounded-lg w-60 text-base py-2 px-3 mx-10 mb-5"
                placeholder = 'Confirm Password'
                secureTextEntry = {true}
                autoCorrect = {false}
                autoCapitalize = 'none'
                textContentType = 'password'
                value = {confirmPassword}
                onChangeText = {(text) => setConfirmPassword(text)}
            />
        </View>

        <TouchableOpacity onPress={onHandleRegister} className="bg-[#fac21a] py-2 rounded-lg w-60 mx-10 mt-5 mb-3">
            <Text className="text-center font-bold text-lg">
                Register
            </Text>
        </TouchableOpacity>

        <View className="flex-row space-x-4 justify-center">
            <Text>
                Already Have An Account? 
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-[#d60e45] font-medium">
                    Log In
                </Text>
            </TouchableOpacity>
        </View>
    </View>
    </KeyboardAwareScrollView>
  )
}

export default Register;