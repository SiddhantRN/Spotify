import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import { encode as btoa } from "base-64";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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
    <LinearGradient colors={["#616161", "#212121"]} style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logo.png")}
          resizeMode={"contain"}
          style={styles.image}
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#fff",
            marginLeft: 10,
          }}
        >
          Spotify
        </Text>
      </View>
      <Text style={styles.text}>Manage your Spotify Playlists</Text>
      <View style={styles.buttonBox}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          Sign in to your account
        </Text>
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
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Dimensions.get("window").height * 0.08,
    width: "80%",
    marginTop: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
  },
  buttonBox: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    bottom: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  image: {
    height: screenHeight * 0.08,
    width: screenHeight * 0.08,
    marginLeft: 20,
  },
  logo: {
    flexDirection: "row",
    marginTop: "10%",
    alignItems: "center",
  },
  text: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 20,
    width: "70%",
    marginTop: "10%",
  },
});

export default SignIn;
