// Latest version
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { AppLoading } from "expo";

import SignIn from "./app/screens/SignIn";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import HomeScreen from "./app/screens/HomeScreen";
import Test from "./app/screens/Test";
import { version } from "react";

export default function App() {
  const [user, setUser] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const getUser = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (refreshToken) {
        setUser(true);
        console.log("this executed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (!isReady)
    return (
      <AppLoading startAsync={getUser} onFinish={() => setIsReady(true)} />
    );
  return (
    // <HomeScreen />
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
