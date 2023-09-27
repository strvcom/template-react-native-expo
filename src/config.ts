import Constants from 'expo-constants'

export const env = { APP_ENV: process.env.EXPO_PUBLIC_APP_ENV }

export const config = {
  applicationIdProd: 'com.expo.template',
  appleIdProd: '123456789',
  installedAppVersion: Constants.expoConfig?.version,
}
