// eslint-disable-next-line import/no-unresolved
import { APP_ENV } from '@env'
import Constants from 'expo-constants'

export const env = { APP_ENV }
export const config = {
  applicationIdProd: 'com.expo.template',
  appleIdProd: '123456789',
  installedAppVersion: Constants.expoConfig?.version,
}
