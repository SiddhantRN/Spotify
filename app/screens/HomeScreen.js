import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { MaterialIcons } from "@expo/vector-icons";

import Item from "../components/Item";
import AppModal from "../components/AppModal";
import checkSession from "../utility/CheckSession";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

function HomeScreen(props) {
  const modalizeRef = React.createRef();

  const onOpen = (item) => {
    modalizeRef.current?.open();
    setCurrentPlaylists(item);
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylists] = useState({
    images: [],
    tracks: { total: 0 },
    name: "test",
  });
  const [playlistName, setPlaylistName] = useState();
  const [renameModal, setRenameModal] = useState(false);
  const [playlistModal, setPlaylistModal] = useState(false);

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {
    await checkSession();
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      console.log(`for api call ${JSON.parse(accessToken)}`);
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      });
      const responseJson = await response.json();
      setPlaylists(responseJson.items);
      // setCurrentPlaylists(responseJson.items[0]);
    } catch (err) {
      console.error(err);
    }
  };
  const refreshPlaylist = async () => {
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      });
      const responseJson = await response.json();
      setPlaylists(responseJson.items);
    } catch (err) {
      console.error(err);
    }
  };
  const updatePlaylist = async () => {
    await checkSession();
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      await fetch(
        `https://api.spotify.com/v1/playlists/${currentPlaylist.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
          }),
        }
      );
      await refreshPlaylist();
    } catch (err) {
      console.error(err);
    }
  };
  const createPlaylist = async () => {
    await checkSession();
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      let userId = await SecureStore.getItemAsync("userId");
      const response = await fetch(
        `https://api.spotify.com/v1/users/${JSON.parse(userId)}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            public: false,
          }),
        }
      );
      const responseJson = await response.json();
      await refreshPlaylist();
    } catch (err) {
      console.error(err);
    }
  };
  // if (Object.keys(currentPlaylist).length === 0) {
  //   return null;
  // }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Your Playlists
        </Text>
        <TouchableOpacity
          style={styles.addPlaylist}
          delayPressIn={0}
          onPress={() => setPlaylistModal(true)}
        >
          <AntDesign name="plus" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.playlist}>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <Item item={item} onLongPress={onOpen} />;
          }}
        />
      </View>

      <Modalize
        ref={modalizeRef}
        modalHeight={screenHeight * 0.45}
        modalStyle={{ backgroundColor: "#424242" }}
      >
        <View style={styles.playlistInfo}>
          <Image
            source={{
              uri:
                currentPlaylist.images.length !== 0
                  ? currentPlaylist.images[0].url
                  : "https://res.cloudinary.com/dy71m2dro/image/upload/v1605023139/spotify/music_fi8ayy.png",
            }}
            resizeMode={"contain"}
            style={styles.image}
          />
          <Text style={styles.playlistName} numberOfLines={1}>
            {currentPlaylist.name}
          </Text>
          <Text style={styles.songs}>{currentPlaylist.tracks.total} songs</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          delayPressIn={0}
          onPress={() => {
            setRenameModal(true);
            onClose();
          }}
        >
          <MaterialIcons name="edit" size={28} color="#c4c4c4" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
              marginLeft: "8%",
            }}
          >
            Rename
          </Text>
        </TouchableOpacity>
      </Modalize>

      <AppModal
        visible={renameModal}
        title={"Rename Playlist"}
        onCancel={setRenameModal}
        onSubmit={updatePlaylist}
        inputText={setPlaylistName}
        buttonOneName={"Rename"}
        buttonTwoName={"Cancel"}
      />
      <AppModal
        visible={playlistModal}
        title={"Create Playlist"}
        onCancel={setPlaylistModal}
        onSubmit={createPlaylist}
        inputText={setPlaylistName}
        buttonOneName={"Create Playlist"}
        buttonTwoName={"Cancel"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addPlaylist: {
    height: screenHeight * 0.08,
    width: screenHeight * 0.08,
    backgroundColor: "#424242",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#212121",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    marginTop: "5%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  playlist: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
    marginTop: "10%",
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
    marginTop: "10%",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  button2: {
    flexDirection: "row",
    marginTop: 20,
    marginTop: "5%",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: "lightpink",
  },
  image: {
    height: screenHeight * 0.15,
    width: screenHeight * 0.15,
  },
  playlistName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  playlistInfo: {
    width: screenWidth * 0.8,
    alignItems: "center",
    alignSelf: "center",
    marginTop: "5%",
  },
  songs: {
    color: "#c4c4c4",
  },
});

export default HomeScreen;
