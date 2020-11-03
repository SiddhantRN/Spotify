import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

function WelcomeScreen(props) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "bcb8d4c1006f46f6b3feff01ad66de2a",
      scopes: [
        "user-read-email",
        "playlist-modify-public",
        "playlist-read-private",
        "playlist-modify-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      // For usage in managed apps using the proxy
      redirectUri: "https://auth.expo.io/@v3n0m/Spotify",
    },
    discovery
  );
  const url = AuthSession.getRedirectUrl("redirect");

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        delayPressIn={0}
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: screenHeight * 0.08,
    width: "50%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
