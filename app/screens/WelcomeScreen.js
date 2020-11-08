import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#616161", "#212121"]} style={styles.container}>
      <Text>Sign in with Facebook</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
