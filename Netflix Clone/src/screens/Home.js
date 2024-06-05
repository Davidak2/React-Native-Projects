import TrendingMovies from '../components/TrendingMovies'
import TrendingShows from '../components/TrendingShows'
import MovieList from '../components/MovieList'
import Loading from "../components/Loading"
import { fetchTrendingMovies, fetchTrendingShows, fetchUpcmongMovies } from '../../api/movieDB'

import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'

const Home = () => {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingShows, setTrendingShows] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies()
    getTrendingShows()
    getUpcomingMovies()
  }, [])

  const getTrendingMovies = async() => {
    const data = await fetchTrendingMovies()

    if(data && data.results) setTrendingMovies(data.results)
    setLoading(false)
  }

  const getTrendingShows = async() => {
    const data = await fetchTrendingShows()
    //console.log("got trending shows: ", data)

    if(data && data.results) setTrendingShows(data.results)
  }

  const getUpcomingMovies = async() => {
    const data = await fetchUpcmongMovies()

    if(data && data.results) setUpcomingMovies(data.results)
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView>
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity onPress={() => navigation.navigate("Favorites")} >
          <HeartIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>

          <Text className="text-red-500 text-2xl font bold">
            Shitflix
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="32" strokeWidth={2} color="white"/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading?(
          <Loading />
        ): (
            <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:10}}
          >
            {/*Trending Movies Carousel */}
            { trendingMovies.length > 0 && <TrendingMovies data={trendingMovies} />}

            {/*Trending Shows Carousel */}
            { trendingShows.length > 0 &&  <TrendingShows data={trendingShows} />}

            {/*Upcoming Movies Carousel */}
            <MovieList title="Upcoming Movies" data={upcomingMovies} />

        </ScrollView>

        )
      }
    </View>
  )
}

export default Home