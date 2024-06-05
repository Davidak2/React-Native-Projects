import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { AuthenticatedUserContext } from '../../context/ContextAuth'
import { ScrollView } from 'react-native-gesture-handler'

const About = () => {
  const navigation = useNavigation()
  const {user, setUser} = useContext(AuthenticatedUserContext)
  if(!user) return

  useEffect(() => {
    if(!user) return;
}, [])

const handleSignOut = () => {
    signOut(auth).then(() => {
        setUser(null)
        navigation.navigate('Login')
    }).catch((error) => {
        Alert.Alert(error.message)
    })
}

  return (
    <ScrollView className = "bg-neutral-900 h-screen">
      <Text className="text-[#d60e45] text-2xl font-semibold text-center py-3 mt-1">
        This is an IMDB-like app that allows the user to search and view information about their favorite movie, tv show, or actor.
      </Text>

      <Text className="items-bottom text-[#f5f4f2] text-2xl font-semibold text-center py-3 mt-1">
        Copyright © {new Date().getFullYear()} 
        {"\n"}  David Aksel 
        {"\n"} {"\n"}  Student In The Department of Software Engineering,
        {"\n"} Ariel University, Israel
        {"\n"} {"\n"} Contact Email: Davidaksel2@gmail.com
      </Text>

      <TouchableOpacity onPress = {handleSignOut}
      className="bg-[#fac21a] py-2 rounded-lg w-60 mx-10 mt-5 mb-3">
            <Text className="text-center font-bold text-lg">
              Logout Here
            </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} 
      className="bg-[#fac21a] py-2 rounded-lg w-60 mx-10 mt-5 mb-3">
            <Text className="text-center font-bold text-lg">
                Continue To Home Screen
            </Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default About