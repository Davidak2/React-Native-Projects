import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import loadingGif from "../../assets/loadingGif.gif"

var {width, height} = Dimensions.get('window')

export default function Loading() {
  return (
    <View style={{height, width}} className = "absolute flex-row justify-center items-center">
      <Image source={loadingGif} />
    </View>
  )
}