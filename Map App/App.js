import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, {useState, useEffect} from "react"
import { firebase } from "./firebaseConfig"

import LoginScreen from "./screens/LoginScreen"
import SignupScreen from "./screens/SignupScreen"
import HomeScreen from "./screens/HomeScreen"
import Header from "./components/Header"

const Stack = createStackNavigator()

function App()
{
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user)
  {
    setUser(user)
    if(initializing) setInitializing(false)
  }

  useEffect(() => {
    const user = firebase.auth().onAuthStateChanged(onAuthStateChanged)
    return user
  }, [])

  if (initializing) return null

  if(!user)
  {
    return(
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerTitle:()=> <Header name="Map Application"/>,
            headerStyle:{
              height:50,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#00e4d0',
              shadowColor:'#000',
              elevation:25
            }
          }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerTitle:() => <Header name="Map Application"/>,
            headerStyle:{
              height:20,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#00e4d0',
              shadowColor:'#000',
              elevation:25
            }
          }}
        />
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Home Screen"
          component={HomeScreen}
          options={{
            headerTitle:()=> <Header name="Map Application"/>,
            headerStyle:{
              height:20,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#00e4d0',
              shadowColor:'#000',
              elevation:25
            }
          }}
        />
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}