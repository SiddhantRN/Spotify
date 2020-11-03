import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import { encode as btoa } from "base-64";
import * as SecureStore from "expo-secure-store";

const scopesArr = [
  "user-read-email",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
];
const scopes = scopesArr.join(" ");

let authCode;

function SignIn({ navigation }) {
  const getAuthorizationCode = async () => {
    try {
      const result = await AuthSession.startAsync({
        authUrl:
          "https://accounts.spotify.com/authorize" +
          "?response_type=code" +
          "&client_id=" +
          "bcb8d4c1006f46f6b3feff01ad66de2a" +
          (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
          "&redirect_uri=" +
          "https://auth.expo.io/@v3n0m/Spotify",
      });
      authCode = result.params.code;
    } catch (err) {
      console.error(err);
    }
    getTokens();
  };

  const setSecureItem = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const getTokens = async () => {
    try {
      const credsB64 = btoa(
        "bcb8d4c1006f46f6b3feff01ad66de2a:91e6b05dee4042bbb10213de4db2ea7c"
      );
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credsB64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${authCode}&redirect_uri=https://auth.expo.io/@v3n0m/Spotify`,
      });
      const responseJson = await response.json();

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      console.log(accessToken);
      console.log(refreshToken);
      console.log(expirationTime);

      setSecureItem("accessToken", accessToken);
      setSecureItem("refreshToken", refreshToken);
      setSecureItem("expirationTime", expirationTime);
    } catch (err) {
      console.error(err);
    }

    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        delayPressIn={0}
        onPress={() => {
          getAuthorizationCode();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        delayPressIn={0}
        onPress={() => {
          getTokens();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Get Tokens
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1}
        delayPressIn={0}
        onPress={() => {
          getPlaylist();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Get playlists
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Dimensions.get("window").height * 0.08,
    width: "50%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightpink",
  },
  button1: {
    height: Dimensions.get("window").height * 0.08,
    width: "50%",
    marginTop: "5%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightpink",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
