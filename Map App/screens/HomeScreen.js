import { View, Text,StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import { firebase } from "../firebaseConfig"
import React from 'react'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 32.103275, 
        longitude: 35.208971,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }} />
      <TouchableOpacity
        onPress={() => {firebase.auth().signOut()}}
      >
        <Text style={{fontSize:22, fontWeight:'bold',alignItems:'center'}}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '95%',
  },
});