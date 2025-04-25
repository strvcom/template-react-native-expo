import { MMKV, useMMKVObject, useMMKVString } from 'react-native-mmkv'

export const storage = new MMKV()

export enum StorageKeys {
  AccessToken = 'accessToken',
  RecommendedUpdate = 'recommendedUpdate',
}

export const useStorageString = (key: StorageKeys) => useMMKVString(key)
export const useStorageObject = <T>(key: StorageKeys) => useMMKVObject<T>(key)

export function getItem(key: StorageKeys): string | undefined {
  return storage.getString(key)
}

export function setItem(key: StorageKeys, value: string) {
  storage.set(key, value)
}

function removeItem(key: StorageKeys) {
  storage.delete(key)
}

function clearAll() {
  storage.clearAll()
}

export const storageService = {
  setItem,
  getItem,
  removeItem,
  clearAll,
}
