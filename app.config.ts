/* eslint-disable import/consistent-type-specifier-style */
import { ExpoConfig, IOS } from '@expo/config-types'

import type { OtaUpdatePriority } from '~/hooks/useOTAUpdate'
import { Environment } from '~/types/env'

declare const process: {
  env: { EXPO_PUBLIC_APP_ENV: Environment }
}
const environment = process.env.EXPO_PUBLIC_APP_ENV

// your custom fonts
const fonts = ['./assets/fonts/Domine-Bold.ttf']

// prefetched/embedded assets, can be referenced as source='rn_meme' https://docs.expo.dev/versions/latest/sdk/asset/#configurable-properties
const assets = ['./assets/images/rn_meme.jpg']

const getEnvironmentInfo = (): {
  name: ExpoConfig['name']
  appIdentifier: IOS['bundleIdentifier']
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

const plugins: ExpoConfig['plugins'] = [
  ['expo-build-properties'],
  ['expo-font', { fonts }],
  ['expo-asset', { assets }],
]

// UPDATE VERSION AND BUILDNUMBER
const version = '0.1.0'
const buildNumber = 1
// calculated from version to replace patch version with 0: 0.1.1 >> 0.1.0 -- read Readme
const runtimeVersion = `${version.split('.').slice(0, 2).join('.')}.0`
// this can be length of splashscreen during which app can download and run OTA update version
const fallbackToCacheTimeout = 0
const otaUpdatePriority: OtaUpdatePriority = 'normal'

const expoConfig: ExpoConfig = {
  name,
  slug: 'template-react-native-expo',
  version,
  runtimeVersion,
  orientation: 'portrait',
  icon,
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: String(buildNumber),
    supportsTablet: false,
    bundleIdentifier: appIdentifier,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      LSApplicationQueriesSchemes: ['itms-apps'],
    },
  },
  android: {
    versionCode: buildNumber,
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
  extra: {
    fallbackToCacheTimeout,
    otaUpdatePriority,
  },
  experiments: {
    tsconfigPaths: true,
  },
}

export default expoConfig
