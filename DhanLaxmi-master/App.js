import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";

import firebase from "firebase";

import LogIn from "./screens/LogIn";
import SignUp from "./screens/SignUp";
import Buy from "./screens/Buy";
import Sell from "./screens/Sell";
import Coin from "./screens/Coin";
import AddMoney from "./screens/AddMoney";
import Home from "./screens/Home";
import Market from "./screens/Market";
import Profile from "./screens/Profile";
import News from "./screens/News";
import Portfolio from "./screens/Portfolio";
import About from "./screens/About";
import Exchanges from "./screens/Exchanges";
import AdminPanel from "./screens/AdminPanel";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { LogBox } from 'react-native';

LogBox.ignoreLogs([`Can't perform a React state update on an unmounted component`]);

const firebaseConfig = {
  apiKey: "AIzaSyCqJGwSrm2VPjj6GYN_RRgEKUE3uMTb_zo",
  authDomain: "dhanlaxminew-36ddd.firebaseapp.com",
  databaseURL: "https://dhanlaxminew-36ddd-default-rtdb.firebaseio.com",
  projectId: "dhanlaxminew-36ddd",
  storageBucket: "dhanlaxminew-36ddd.appspot.com",
  messagingSenderId: "258662593110",
  appId: "1:258662593110:web:6240c198e245631eea01f7"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const Tab = createBottomTabNavigator();
  const MainTabNavigator = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: "absolute",
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 45,
            height: 70,
            marginBottom:7,
            marginHorizontal:10
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 17,
                    height: 17,
                    tintColor: focused ? '#2150f5' : "gray",
                  }}
                />
                <Text
                  style={{ color: focused ? '#2150f5' : "gray", fontSize: 10 }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Market"
          component={MarketStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/prices.png")}
                  resizeMode="contain"
                  style={{
                    width: 17,
                    height: 17,
                    tintColor: focused ? '#2150f5' : "gray",
                  }}
                />
                <Text
                  style={{ color: focused ? '#2150f5' : "gray", fontSize: 10 }}
                >
                  Market
                </Text>
              </View>
            ),
          }}
        />
                <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/portfolio.png")}
                  resizeMode="contain"
                  style={{
                    width: 17,
                    height: 17,
                    tintColor: focused ? '#2150f5' : "gray",
                  }}
                />
                <Text
                  style={{ color: focused ? '#2150f5' : "gray", fontSize: 10 }}
                >
                  Protfolio
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="News"
          component={News}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/news.jpg")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#2150f5' : "gray",
                  }}
                />
                <Text
                  style={{ color: focused ? '#2150f5' : "gray", fontSize: 10 }}
                >
                  News
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settinge"
          component={SettingNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("./assets/settings.png")}
                  resizeMode="contain"
                  style={{
                    width: 17,
                    height: 17,
                    tintColor: focused ? '#2150f5' : "gray",
                  }}
                />
                <Text
                  style={{ color: focused ? '#2150f5' : "gray", fontSize: 10 }}
                >
                  Settings
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const SettingStack = createStackNavigator();
  const SettingNavigator = () => {
    return (
      <SettingStack.Navigator>
        <SettingStack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <SettingStack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
        <SettingStack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{ headerShown: false }}
        />
      </SettingStack.Navigator>
    );
  };

  const AuthStack = createStackNavigator();
  const AuthNavigator = () => {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="login"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="signup"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  const HomeStack = createStackNavigator();

  const HomeStackScreen = () => (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AddMoney" component={AddMoney} />
      <HomeStack.Screen name="ActiveCryptos" component={Market} />
      <HomeStack.Screen name="ActiveExchanges" component={Exchanges} />
      <HomeStack.Screen name="Coin" component={Coin} />
      <HomeStack.Screen name="Buy" component={Buy} />
      <HomeStack.Screen name="Sell" component={Sell} />

    </HomeStack.Navigator>
  );

  const MarketStack = createStackNavigator();

  const MarketStackScreen = () => (
    <MarketStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MarketStack.Screen name="Market" component={Market} />
      <MarketStack.Screen name="Coin" component={Coin} />
      <MarketStack.Screen name="Buy" component={Buy} />
      <MarketStack.Screen name="Sell" component={Sell} />
    </MarketStack.Navigator>
  );

  const Navigation = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
      const unsuscribe = firebase.auth().onAuthStateChanged((userExist) => {
        if (userExist) {
          setUser(userExist);
        } else {
          setUser("");
        }
      });
      return unsuscribe;
    }, []);

    return (
      <NavigationContainer>
        {user ? <MainTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  };

  return (
    <>
      <Navigation />
    </>
  );
}
