/* eslint-disable import/consistent-type-specifier-style */
import { ExpoConfig, IOS } from '@expo/config-types'

import packageJson from './package.json'

import type { OtaUpdatePriority } from '~/hooks/useOTAUpdate'
import { Environment } from '~/types/env'

declare const process: {
  env: {
    EXPO_PUBLIC_APP_ENV: Environment
    EXPO_PUBLIC_APP_VERSION: string
    EXPO_PUBLIC_BUILD_NUMBER: string
  }
}
const environment = process.env.EXPO_PUBLIC_APP_ENV || 'dev'

// your custom fonts
const fonts = ['./assets/fonts/Domine-Bold.ttf']

// prefetched/embedded assets, can be referenced as source='rn_meme' https://docs.expo.dev/versions/latest/sdk/asset/#configurable-properties
const assets = ['./assets/images/rn_meme.jpg']

const getEnvironmentInfo = (): {
  name: ExpoConfig['name']
  appIdentifier: IOS['bundleIdentifier']
  icon: ExpoConfig['icon']
} => {
  const appIdentifier = 'com.strv.rntemplate'
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
  ['expo-router'],
]

// UPDATE VERSION AND BUILDNUMBER
const version = process.env.EXPO_PUBLIC_APP_VERSION || packageJson.version
const buildNumber = process.env.EXPO_PUBLIC_BUILD_NUMBER || '1'

const fallbackToCacheTimeout = 0
const otaUpdatePriority: OtaUpdatePriority = 'normal'

const expoConfig: ExpoConfig = {
  owner: 'strv-internal',
  name,
  slug: 'template-react-native-expo',
  version,
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  scheme: 'template-react-native-expo',
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
    buildNumber,
    supportsTablet: false,
    bundleIdentifier: appIdentifier,
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      LSApplicationQueriesSchemes: ['itms-apps'],
    },
  },
  web: {
    bundler: 'metro',
  },
  android: {
    versionCode: parseInt(buildNumber, 10),
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
    eas: {
      projectId: '46e1c780-9495-4650-93c8-7f465bf4e1d0',
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
}

export default expoConfig
