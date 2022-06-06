import type { ExpoConfig, IOS, Android } from '@expo/config-types'

import 'dotenv/config'
import type { Environment } from 'src/types/types'

declare const process: {
  env: { APP_ENV: Environment }
}
const environment = process.env.APP_ENV

const getEnvironmentInfo = (): {
  name: ExpoConfig['name']
  appIdentifier: IOS['bundleIdentifier'] & Android['package']
  icon: ExpoConfig['icon']
} => {
  const appIdentifier = 'com.expo.template'
  const appName = 'Expo Template'

  if (environment === 'production')
    return {
      name: appName,
      appIdentifier,
      icon: './assets/icon.png',
    }

  return {
    name: `${appName} ${environment.toUpperCase()}`,
    appIdentifier: `${appIdentifier}.${environment}`,
    icon: `./assets/icon-${environment}.png`,
  }
}

const { name, appIdentifier, icon } = getEnvironmentInfo()

// use flipper only in DEV
const plugins: ExpoConfig['plugins'] = environment === 'dev' ? ['expo-community-flipper'] : []

const expoConfig: ExpoConfig = {
  name,
  slug: 'template-react-native-expo',
  version: '0.1.0',
  runtimeVersion: '0.1.0',
  orientation: 'portrait',
  icon,
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '1',
    supportsTablet: false,
    bundleIdentifier: appIdentifier,
  },
  android: {
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: appIdentifier,
    // necessary from Android 12
    intentFilters: [
      { action: 'VIEW', data: { scheme: 'mailto' } },
      { action: 'VIEW', data: { scheme: 'sms' } },
      { action: 'VIEW', data: { scheme: 'tel' } },
    ],
  },
  jsEngine: 'hermes',
  plugins,
}

export default expoConfig
