import { Platform } from 'react-native';

export const isFromWeb = () => {
  return Platform.OS === 'web';
};
