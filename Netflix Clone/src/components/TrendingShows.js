import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../../api/movieDB';

var {width, height} = Dimensions.get('window')

export default function TrendingShows({data}) {
  const navigation = useNavigation()

  const onHandleClick = (item) => {
    navigation.navigate('ShowInfo', item)
  }

  return(
    <View className = "mb-8">
      <Text className = "text-white text-xl mx-4 mb-5">Trending Shows This Week</Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <ShowCard item = {item} onHandleClick={onHandleClick}/>}
        firstItem={1}
        inactiveSlideOpacity={0.50}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display:'flex', alignItems:'center'}}
        />
    </View>
  )
}

const ShowCard = ({item, onHandleClick}) => {
  //console.log("got item content:" , item)
  return (
    <TouchableWithoutFeedback onPress={()=> onHandleClick(item)}>
      <Image 
        source={{uri: image500(item.poster_path)}}
        style = {{
          width:width*0.6,
          height:height*0.4
        }}
        className = "rounded-3xl"
      />
    </TouchableWithoutFeedback>
  )
}