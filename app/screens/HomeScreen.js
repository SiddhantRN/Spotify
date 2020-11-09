import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import Item from "../components/Item";
import refreshTokens from "../utility/RefreshTokens";

const screenHeight = Dimensions.get("window").height;

function HomeScreen(props) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylist();
  }, []);

  const checkSession = async () => {
    const item = await SecureStore.getItemAsync("expirationTime");
    const tokenExpirationTime = JSON.parse(item);
    console.log(`expiration time is ${tokenExpirationTime}`);
    if (new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    } else {
      return;
    }
    return;
  };

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
    } catch (err) {
      console.error(err);
    }
  };

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
          onPress={() => console.log(`current time is ${new Date().getTime()}`)}
        >
          <AntDesign name="plus" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.playlist}>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <Item name={item.name} />;
          }}
        />
      </View>
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
});

export default HomeScreen;
