import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import SongItemDeleteAction from "./SongItemDeleteAction";

const screenHeight = Dimensions.get("window").height;

function SongItem({ item, onDelete, renderRight }) {
  return (
    <Swipeable renderRightActions={renderRight} friction={1}>
      <TouchableOpacity style={styles.container}>
        <Image
          source={{
            uri:
              item.track.album.images.length !== 0
                ? item.track.album.images[0].url
                : "https://res.cloudinary.com/dy71m2dro/image/upload/v1605023139/spotify/music_fi8ayy.png"
          }}
          style={styles.image}
          resizeMode={"contain"}
        />

        <Text
          style={{
            width: "75%",
            fontSize: 17,
            fontWeight: "bold",
            color: "#fff",
            marginLeft: 20
          }}
          numberOfLines={1}
        >
          {item.track.name}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingLeft: "5%"
  },
  image: {
    height: screenHeight * 0.07,
    width: screenHeight * 0.07,
    backgroundColor: "#424242"
  }
});

export default SongItem;
