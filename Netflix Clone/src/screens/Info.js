import { View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../../theme'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast'
import Loading from '../components/Loading'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, image500 } from '../../api/movieDB'

var {width, height} = Dimensions.get('window')

export default function Info() {

  const navigation = useNavigation()

  const {params: item} = useRoute()

  const [isFavorite, setIsFavorite] = useState(false)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  useEffect(() => {
    console.log('Movie itemID:', item.id)
    setLoading(true)
    getMovieDetails(item.id)
    getMovieCredits(item.id)
  }, [item])

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id)
    console.log('got movie details: ', data)
    if(data) setMovie(data)
    setLoading(false)
  }

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id)
    //console.log('got movie credits: ', data)
    if(data && data.cast) setCast(data.cast)
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
              //source={require("../../assets/images/moviePoster2.png")}
              source={{uri:image500(movie?.poster_path || fallbackMoviePoster)}}
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

      {/* movie details */}
      <View style={{marginTop:-(height*0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-2xl font-bold tracking-wider">
          {
            movie?.title
          }
        </Text>

        {/* status/runtime/release */}
        {
          movie?.id?(
            <Text className ="text-neutral-300 font-semibold text-base text-center" >
              {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
            </Text>
          ):null
        }

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {
            movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length
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
            movie?.production_countries?.map((name) => {
              return(
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {name.name}
                </Text>
              )
            })
          }
        </View>

        {/* movie description */}
        <View>
          <Text className="text-neutral-400 mx-4 tracking-wide">
            {movie?.overview}
          </Text>
        </View>
      </View>

      {/* movie cast */}
      {movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
    </ScrollView>
  )
}