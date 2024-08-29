import Constants from 'expo-constants'

const FEATURE_2 = 'feature2'

export const env = { APP_ENV: process.env.EXPO_PUBLIC_APP_ENV }

export const config = {
  applicationIdProd: 'com.expo.template',
  appleIdProd: '123456789',
  installedAppVersion: Constants.expoConfig?.version,
}
