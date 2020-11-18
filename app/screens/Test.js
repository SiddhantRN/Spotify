import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions
} from "react-native";
import checkSession from "../utility/CheckSession";
import UserId from "../utility/UserId";
import { Modalize } from "react-native-modalize";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

const screenHeight = Dimensions.get("window").height;

function Test(props) {
  const deleteSong = async () => {
    await checkSession();
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/3u1WZQmSaBN91KRrpiP34M/tracks`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            tracks: [{ uri: "spotify:track:0hVXuCcriWRGvwMV1r5Yn9" }]
          })
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (err) {
      console.error(err);
    }
  };

  const modalizeRef = React.createRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button2}
        delayPressIn={0}
        onPress={deleteSong}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          get Id
        </Text>
      </TouchableOpacity>
      <Modalize
        ref={modalizeRef}
        modalHeight={screenHeight * 0.45}
        modalStyle={{ backgroundColor: "#424242" }}
      >
        <View style={styles.playlistInfo}>
          <Image
            source={require("../assets/album.png")}
            resizeMode={"contain"}
            style={styles.image}
          />
          <Text style={styles.playlistName}>Chill</Text>
          <Text style={styles.songs}>28 songs</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          delayPressIn={0}
          onPress={onClose}
        >
          <MaterialIcons name="edit" size={28} color="#c4c4c4" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
              marginLeft: "8%"
            }}
          >
            Rename
          </Text>
        </TouchableOpacity>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
    marginTop: "5%",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  button2: {
    flexDirection: "row",
    marginTop: 20,
    marginTop: "5%",
    alignItems: "center",
    padding: 30,
    backgroundColor: "lightpink"
  },
  image: {
    height: screenHeight * 0.15,
    width: screenHeight * 0.15
  },
  playlistName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff"
  },
  playlistInfo: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: "5%"
  },
  songs: {
    color: "#c4c4c4"
  }
});

export default Test;
