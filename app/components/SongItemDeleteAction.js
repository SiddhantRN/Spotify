import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function SongItemDeleteAction({ onPress }) {
  return (
    <TouchableOpacity style={styles.delete} onPress={onPress} delayPressIn={1}>
      <MaterialCommunityIcons name="trash-can" size={30} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  delete: {
    backgroundColor: "#d32f2f",
    height: "70%",
    width: 70,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SongItemDeleteAction;
