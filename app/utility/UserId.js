import * as SecureStore from "expo-secure-store";

const setSecureItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const UserId = async () => {
  try {
    let accessToken = await SecureStore.getItemAsync("accessToken");
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken)}`,
      },
    });
    const responseJson = await response.json();
    await setSecureItem("userId", responseJson.id);
    let id = await SecureStore.getItemAsync("userId");
    // console.log(`tis the id${id}`);
  } catch (err) {
    console.error(err);
  }
};

export default UserId;
