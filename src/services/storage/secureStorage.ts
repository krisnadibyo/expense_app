import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const preferences = {
  async getValue(key: string) {
    if (isFromWeb()) {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  async setValue(key: string, value: string) {
    if (isFromWeb()) {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  async deleteValue(key: string) {
    if (isFromWeb()) {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
};

const isFromWeb = () => {
  return Platform.OS === 'web';
};
