import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";
import HomeScreen from "../screens/HomeScreen";
import Tracks from "../screens/Tracks";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{ headerShown: false }}
      initialRouteName={"SignIn"}
    >
      <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Tracks" component={Tracks}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
