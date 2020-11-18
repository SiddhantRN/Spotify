import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { AppLoading } from "expo";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

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
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
