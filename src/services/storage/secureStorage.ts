import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

class SharedPreferences {
  private dict: Record<string, string | null> = {};

  async getValue(key: string) {
    if (this.dict[key]) {
      return this.dict[key];
    }

    if (isFromWeb()) {
      this.dict[key] = localStorage.getItem(key);
    } else {
      this.dict[key] = await SecureStore.getItemAsync(key);
    }
    return this.dict[key];
  }

  async setValue(key: string, value: string) {
    this.dict[key] = value;
    if (isFromWeb()) {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }

  async deleteValue(key: string) {
    delete this.dict[key];
    if (isFromWeb()) {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }

  async clear() {
    if (isFromWeb()) {
      localStorage.clear();
    } else {
      const keys = Object.keys(this.dict);
      for (const key of keys) {
        await SecureStore.deleteItemAsync(key);
      }
    }
    this.dict = {};
  }
};

export const preferences = new SharedPreferences();

const isFromWeb = () => {
  return Platform.OS === 'web';
};
