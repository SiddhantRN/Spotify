import * as SecureStore from "expo-secure-store";

const getSecureItem = async (key) => {
  try {
    const item = await SecureStore.getItemAsync(key);
    return JSON.parse(item);
  } catch (e) {
    console.log(e);
  }
};

const setSecureItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export default {
  getSecureItem,
  setSecureItem,
};
