import * as SecureStore from "expo-secure-store";
import refreshTokens from "./RefreshTokens";

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

export default checkSession;
