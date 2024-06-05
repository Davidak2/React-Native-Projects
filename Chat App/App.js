import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search'
import Chat from './src/screens/Chat';

import { Image, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticatedUserProvider, { AuthenticatedUserContext } from './context/ContextAuth';
import { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';


const loadingGif = require("./assets/loadingGif.gif")

const Stack = createNativeStackNavigator()

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {!user && isLoading === true ? (
        <Image source={loadingGif} className="h-full w-full" />
      ) : !user && isLoading === false ? (
        <AuthStack />
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Chat" component={Chat} options={{title:""}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
      <StatusBar barStyle={"default"} />
    </AuthenticatedUserProvider>
  );
}