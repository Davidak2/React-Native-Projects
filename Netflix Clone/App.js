import Login from "./src/screens/Login"
import Register from './src/screens/Register'
import About from './src/screens/About'
import Home from './src/screens/Home'
import Info from "./src/screens/Info"
import ShowInfo from "./src/screens/ShowInfo"
import Person from "./src/screens/Person"
import Search from "./src/screens/Search"
import Favorites from "./src/screens/Favorites"

import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthenticatedUserProvider, { AuthenticatedUserContext } from './context/ContextAuth';
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

const Stack = createNativeStackNavigator()
const loadingGif = require("./assets/loadingGif.gif")

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
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="ShowInfo" component={ShowInfo} />
      <Stack.Screen name="Person" component={Person} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Favorites" component={Favorites} />
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
