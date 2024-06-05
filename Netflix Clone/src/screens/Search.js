import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../../api/movieDB'

var {width, height} = Dimensions.get('window')

export default function Search() {
    
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const onHandleSearch = value => {
        if(value && value.length > 2) {
            setLoading(true)
            searchMovies ({
                query: value,
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data => {
                setLoading(false)
                if(data && data.results) setResults(data.results)
                //console.log("got Results: ", data)
                //console.log("result: ", results)
                //console.log("value: ", value)
            })
            
        } else {
            setLoading(false)
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(onHandleSearch, 400), [])
    
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View className="mx-4 mb-3 flex-row justofy-between items-center border border-neutral-500 rounded-full">
        <TextInput 
            onChangeText={handleTextDebounce}
            placeholder='Search'
            placeholderTextColor={"lightgray"}
            className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-widest"
        />

        <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className = "rounded-full p-3 m-1 bg-neutral-500"
        >
            <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {
        loading? (
            <Loading />
        ): 
            results.length > 0 ? (/*console.log("results here: ", results),*/
                <ScrollView
                    className = "space-y-3"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:15}}
                    >
                        <Text className = "text-white font-semibold ml-1">
                            Results ({results.length})
                        </Text>
        
                    <View className="flex-row justify-between flex-wrap">
                        {
                            results.map((item, index) => {
                                return (
                                    <TouchableOpacity 
                                    key={index}
                                    onPress={() => navigation.push("Info", item)}
                                    >
                                        <View className="space-y-2 mb-4">
                                            <Image 
                                                className="rounded-3xl" 
                                                //source={require('../../assets/images/moviePoster2.png')}
                                                source={{uri: image185(item.poster_path) || fallbackMoviePoster}} 
                                                style={{width: width*0.44, height: height*0.3}}
                                            />
        
                                            <Text className="text-neutral-400 ml-1">
                                                {
                                                    item?.title.length > 15 ? item?.title.slice(0,15) + "..." : item?.title
                                                }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
        
                </ScrollView>
            ) : (
                <View >
                    <Image 
                        source={require("../../assets/images/movieTime.png")}
                        className="h-80 w-80"
                    />
                </View>
            )
        }
    </SafeAreaView>
  )
}