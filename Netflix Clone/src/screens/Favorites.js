import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../theme'

export default function Favorites() {

    const navigation = useNavigation()
    
  return (
    <View className = "flex-1 bg-neutral-900">
      <Text className = "text-white text-center text-2xl font bold tracking-wider">Favorites</Text>
      
      <View className = "w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
          <TouchableOpacity style={styles.background} onPress={()=> navigation.goBack()} className="rounded-xl p-1">
            <ChevronLeftIcon size="13" strokeWidth={4.5} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  )
}