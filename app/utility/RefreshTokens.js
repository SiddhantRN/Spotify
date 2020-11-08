import { encode as btoa } from "base-64";
import * as SecureStore from "expo-secure-store";

const setSecureItem = async (key, value) => {
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
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
      refresh_token: newRefreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    console.log(`new access token is ${newAccessToken}`);
    console.log(`new refresh token is ${newRefreshToken}`);
    console.log(`expiration time is ${expirationTime}`);

    //   setSecureItem("accessToken", accessToken);
    //   setSecureItem("refreshToken", refreshToken);
    //   setSecureItem("expirationTime", expirationTime);

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

//  const refreshTokens = async () => {
//     try {

//       const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
//       const refreshToken = await getUserData('refreshToken');
//       const response = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//           Authorization: `Basic ${credsB64}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
//       });
//       const responseJson = await response.json();
//       if (responseJson.error) {
//         await getTokens();
//       } else {
//         const {
//           access_token: newAccessToken,
//           refresh_token: newRefreshToken,
//           expires_in: expiresIn,
//         } = responseJson;

//         const expirationTime = new Date().getTime() + expiresIn * 1000;
//         await setUserData('accessToken', newAccessToken);
//         if (newRefreshToken) {
//           await setUserData('refreshToken', newRefreshToken);
//         }
//         await setUserData('expirationTime', expirationTime);
//     } catch (err) {
//       console.error(err);
//     }
// }
