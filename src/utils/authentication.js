// @flow
import { AsyncStorage } from 'react-native';

// const AUTHENTICATION_STORAGE_KEY: string = 'eNcounter:Authentication';
// const CHOOSE_LANGUAGE_KEY: string = 'eNcounter:ChooseLanguage';


export function getStorage(key, defValue) {
  return AsyncStorage.getItem(key, defValue);
}

export async function setStorage(key, value) {
  return AsyncStorage.setItem(key, value);
}

export async function clearStorage() {
  return AsyncStorage.clear();
}
