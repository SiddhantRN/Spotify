import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import SignIn from "./app/screens/SignIn";
import AppNavigator from "./app/navigation/AppNavigator";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import HomeScreen from "./app/screens/HomeScreen";
import Test from "./app/screens/Test";

export default function App() {
  return (
    <Test />
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>
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
