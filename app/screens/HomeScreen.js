import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

function HomeScreen(props) {
  // const getToken = async () => {

  //   let refreshToken = await SecureStore.getItemAsync("refreshToken");
  //   let expirationTime = await SecureStore.getItemAsync("expirationTime");
  //   console.log(`the token is ${accessToken}`);
  //   console.log(`the refresh is ${refresh}`);
  //   console.log(`the expirationTime is ${expirationTime}`);
  // };

  const getPlaylist = async () => {
    try {
      let accessToken = await SecureStore.getItemAsync("accessToken");
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
      });
      const responseJson = await response.json();
      for (const element of responseJson.items) {
        console.log(element.name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
