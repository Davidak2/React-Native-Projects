import { View, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { AuthenticatedUserContext } from '../../context/ContextAuth'
import { getDocs, query, where } from 'firebase/firestore'
import { userRef } from '../../firebase/config'

const userAvatar = require("../../assets/man.png")

const Home = () => {
  const Navigation = useNavigation()
  const {user, userAvatarUrl, setUserAvatarUrl} = useContext(AuthenticatedUserContext)

  useEffect(() => {
    Navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => Navigation.navigate("Profile")}>
          {!userAvatarUrl ? (<Image source = {userAvatar} className = 'h-10 w-10'/>) : (
            <Image source = {{uri: userAvatarUrl}} className = 'h-10 w-10 rounded-full' />
          )}
        </TouchableOpacity>
      )
    })
  }, [])

  useEffect(() => {
    if(!user) return

    const queryResult = query(userRef, where('email', '==', user.email))

    async function docFinder(queryResult) {
      const querySnapshot = await getDocs(queryResult)
      querySnapshot.forEach((doc) => {
        const {profilePic} = doc.data()
        setUserAvatarUrl(profilePic)
      })
    }
    docFinder(queryResult)
  }, [])

  return (
    <View className = 'flex-1'>
      <View className = ' flex-row-reverse absolute bottom-14 right-5 '>
        <TouchableOpacity onPress ={() =>Navigation.navigate("Search")} className = 'bg-green-500 h-16 w-16 rounded-full text-center items-center justify-center'>
          <Entypo name="chat" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home