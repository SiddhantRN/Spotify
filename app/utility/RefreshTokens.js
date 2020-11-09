import { encode as btoa } from "base-64";
import * as SecureStore from "expo-secure-store";

const setSecureItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const refreshTokens = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    console.log(
      `we were able to access refresh token and it was ${refreshToken}`
    );
    const credsB64 = btoa(
      "bcb8d4c1006f46f6b3feff01ad66de2a:91e6b05dee4042bbb10213de4db2ea7c"
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${JSON.parse(
        refreshToken
      )}`,
    });
    const responseJson = await response.json();

    const {
      access_token: newAccessToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    console.log(`new access token is ${newAccessToken}`);
    console.log(`expiration time is ${expirationTime}`);

    setSecureItem("accessToken", newAccessToken);
    setSecureItem("expirationTime", expirationTime);

    //   await setUserData('accessToken', newAccessToken);
    //     if (newRefreshToken) {
    //       await setUserData('refreshToken', newRefreshToken);
    //     }
    //     await setUserData('expirationTime', expirationTime);
  } catch (err) {
    console.error(err);
  }
};

export default refreshTokens;
