import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import refreshTokens from "../utility/RefreshTokens";

function Test(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        delayPressIn={0}
        onPress={refreshTokens}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Refresh
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Dimensions.get("window").height * 0.08,
    width: "80%",
    marginTop: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Test;
