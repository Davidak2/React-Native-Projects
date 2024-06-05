import { View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast' 
import Loading from '../components/Loading'
import { fetchShowDetails,  fetchShowCredits,  image500, fallbackMoviePoster } from '../../api/movieDB'

var {width, height} = Dimensions.get('window')

export default function Info() {

  const navigation = useNavigation()

  const {params: item} = useRoute()
  const [isFavorite, setIsFavorite] = useState(false)
  const [cast, setCast] = useState([]) 

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState({})

  useEffect(() => {
    console.log('Show itemID:', item.id)
    setLoading(true)
    getShowDetails(item.id)
     getShowCredits(item.id) 
  }, [item])

  const getShowDetails = async id => {
    const data = await fetchShowDetails(id)
    if(data) setShow(data)
    console.log("Show Details: ", data)
    setLoading(false)
  }

   const getShowCredits = async id => {
    const data = await fetchShowCredits(id)
    if(data && data.cast) setCast(data.cast)
    //console.log('show credits1: ', data)
    //console.log('show credits2: ', data.cast)
    setLoading(false)
  } 

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom:20}}
      className = "flex-1 bg-neutral-900"
    >
      {/**back button and poster */}
      <View className = "w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
          <TouchableOpacity style={styles.background} onPress={()=> navigation.goBack()} className="rounded-xl p-1">
            <ChevronLeftIcon size="13" strokeWidth={4.5} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size="22" color={isFavorite? theme.background : "orange"} />
          </TouchableOpacity>
        </SafeAreaView>

        {
          loading ? (
            <Loading />
          ): (
          <View>
            <Image
              source={{uri:image500(show?.poster_path || fallbackMoviePoster)}}
              //source={require("../../assets/images/showPoster2.png")}
              style={{width, height:height*0.7}}
              />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{width, height:height*0.4}}
                start={{x:0.5, y:0}}
                end={{x:0.5, y:1}}
                className="absolute bottom-0"
              />
          </View>
          )
        }

      </View>

      {/* show details */}
      <View style={{marginTop:-(height*0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-2xl font-bold tracking-wider">
          {
            show?.name
          }
        </Text>

        {/* status/runtime/release */}
        {
          show?.id?(
            <Text className ="text-neutral-400 font-semibold text-base text-center" >
              {show?.status} • {show?.first_air_date?.split('-')[0]} • {show?.episode_run_time} min
            </Text>
          ):null
        }

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {
            show?.genres?.map((genre, index) => {
              let showDot = index + 1 != show.genres.length
              return(
                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                 {genre?.name} {showDot? "•" : null}
                </Text>
              )
            })
          }
        </View>

        {/* production countries */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {
            show?.production_countries?.map((name) => {
              return(
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {name.name}
                </Text>
              )
            })
          }
        </View>

        {/* show description */}
        <View>
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {show?.overview}
          </Text>
        </View>
      </View>

      {/* show cast */}
      { show?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast}/>}

    </ScrollView>
  )
}