import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "./src/surfaces/Login";
import { Feed } from "./src/surfaces/Feed";
import { Profile } from "./src/surfaces/Profile";
import { Favorites } from "./src/surfaces/Favorites";
import { AddPost } from "./src/surfaces/AddPost";
import { ConversationsNavigation } from "./src/surfaces/ConversationsNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context"; 
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import { UserListContext } from "./src/Context";
import users from "./docs/users.json";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(255, 255, 255)",
  },
};

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Conversations") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#25A0B0",
        tabBarInactiveTintColor: "#000000",
        tabBarShowLabel: false,
        headerTransparent: true,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          paddingTop: 140,
          paddingBottom: 40,
          textAlign: 'left',
          fontWeight: 'bold',
        }
      })}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Conversations" component={ConversationsNavigation} />
      <Tab.Screen name="AddPost" component={AddPost} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userLoggedIn, setIsUserLoggedIn] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <UserListContext.Provider value={{ userList: users }}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            {!userLoggedIn ? (
              <Stack.Screen name="Login" component={Login} />
            ) : (
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserListContext.Provider>
    </SafeAreaProvider>
  );
}