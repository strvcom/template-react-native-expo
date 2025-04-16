import { MMKV, useMMKVObject, useMMKVString } from 'react-native-mmkv'

export const storage = new MMKV()

export enum StorageKeys {
  AccessToken = 'accessToken',
  RecommendedUpdate = 'recommendedUpdate',
}

export const useStorageString = (key: StorageKeys) => useMMKVString(key)
export const useStorageObject = <T>(key: StorageKeys) => useMMKVObject<T>(key)

export function getItem(key: StorageKeys | string): string | null {
  return storage.getString(key) ?? null
}

export function setItem(key: StorageKeys | string, value: string) {
  storage.set(key, value)
}

function removeItem(key: StorageKeys | string) {
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
