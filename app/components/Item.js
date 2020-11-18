import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;

function Item({ item, onLongPress }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => onLongPress(item)}
      onPress={() =>
        navigation.navigate("Tracks", {
          playlistId: item.id,
          playlistName: item.name,
        })
      }
    >
      <Image
        source={{
          uri:
            item.images.length !== 0
              ? item.images[0].url
              : "https://res.cloudinary.com/dy71m2dro/image/upload/v1605023139/spotify/music_fi8ayy.png",
        }}
        style={styles.image}
        resizeMode={"contain"}
      />

      <Text
        style={{
          width: "75%",
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          marginLeft: 20,
        }}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    height: screenHeight * 0.08,
    width: screenHeight * 0.08,
    backgroundColor: "#424242",
  },
});

export default Item;
