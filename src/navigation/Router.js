// navigation/Router.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Leaderboard from "../screens/Leaderboard";
import History from "../screens/History";
import Preparation from "../screens/Preparation";
import Quiz from "../screens/Quiz";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack untuk Home (biar bisa ke Preparation, Quiz, dan Result)
function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false, // NONAKTIFKAN GESTURE SWIPE BACK
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen 
        name="Preparation" 
        component={Preparation} 
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={Quiz} 
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}

export default function Router() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        gestureEnabled: false, // NONAKTIFKAN DI TAB JUGA

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Leaderboard") iconName = "trophy";
          else if (route.name === "History") iconName = "time";

          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            </View>
          );
        },

        tabBarActiveTintColor: "#800000",
        tabBarInactiveTintColor: "#999",

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: 2,
          textAlign: "center",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}