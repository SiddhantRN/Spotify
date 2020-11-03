import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{ headerShown: false }}
      initialRouteName={"SignIn"}
    >
      <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default FeedNavigator;
