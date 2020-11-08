import React from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";

const screenHeight = Dimensions.get("window").height;

function Item({ name }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/music.png")}
        style={styles.image}
        resizeMode={"contain"}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
          marginLeft: 20,
        }}
      >
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    height: screenHeight * 0.09,
    width: screenHeight * 0.09,
    backgroundColor: "#424242",
  },
});

export default Item;
