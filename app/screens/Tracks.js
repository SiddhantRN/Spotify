import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { MaterialIcons } from "@expo/vector-icons";

import SongItem from "../components/SongItem";
import checkSession from "../utility/CheckSession";
import SongItemDeleteAction from "../components/SongItemDeleteAction";

function Tracks({ navigation, route }) {
  const [tracks, setTracks] = useState([]);
  // const [songId, setSongId] = useState();

  useEffect(() => {
    getTracks();
  }, []);

  const deleteSong = async (songId) => {
    // console.log(songId);
    await checkSession();
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${route.params.playlistId}/tracks`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            tracks: [{ uri: `spotify:track:${songId}` }]
          })
        }
      );
      const responseJson = await response.json();
      await refreshTracks();
    } catch (err) {
      console.error(err);
    }
  };
  const getTracks = async () => {
    await checkSession();
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${route.params.playlistId}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`
          }
        }
      );
      const responseJson = await response.json();
      setTracks(responseJson.items);
    } catch (err) {
      console.error(err);
    }
  };
  const refreshTracks = async () => {
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${route.params.playlistId}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`
          }
        }
      );
      const responseJson = await response.json();
      setTracks(responseJson.items);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={34} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 32,
            marginLeft: "10%",
            fontWeight: "bold",
            color: "#fff"
          }}
        >
          {route.params.playlistName}
        </Text>
      </View>
      <View style={styles.playlist}>
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.track.id}
          renderItem={({ item }) => {
            return (
              <SongItem
                item={item}
                renderRight={() => (
                  <SongItemDeleteAction
                    onPress={() => deleteSong(item.track.id)}
                  />
                )}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#212121"
  },
  header: {
    flexDirection: "row",
    width: "90%",
    marginTop: "5%",
    alignSelf: "center",
    alignItems: "center"
  },
  playlist: {
    width: "100%",
    alignSelf: "center",
    flex: 1,
    marginTop: "10%"
  }
});

export default Tracks;
