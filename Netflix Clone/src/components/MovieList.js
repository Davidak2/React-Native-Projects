import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { image185 } from '../../api/movieDB'

export default function MovieList({title, data}) {

    const navigation = useNavigation()
    var {width, height} = Dimensions.get('window')

  return (
    <View className = "mv-8 space-y-y4">
      <View className = "mx-4 flex-row justify-between items-center">
        <Text className = "text-white text-xl">{title}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
        >
            {
                data.map((item, index) => {
                    return(
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate("Info", item)}
                        >
                            <View className = "space-y-1 mr-4">
                                <Image 
                                    //source={require("../../assets/images/moviePoster2.png")}
                                    source={{uri: image185(item.poster_path || fallbackMoviePoster)}}
                                    className = "rounded-3xl"
                                    style={{width:width*0.33, height:height*0.22}}/>

                                <Text
                                    className = "text-neutral-300 ml-1"
                                >{
                                    item.title.length > 14 ? item.title.slice(0,14) + "..." : item.title
                                }
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}