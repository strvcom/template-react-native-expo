import { Platform } from 'react-native'

import { config } from '~/config'

const applicationIdProd = config.applicationIdProd
const appleIdProd = config.appleIdProd

type StoreLink = {
  storeURI: string
  storeURL: string
}

export const getStoreLink = (): StoreLink => {
  const appStoreURI = `itms-apps://apps.apple.com/app/id${appleIdProd}?mt=8`
  const appStoreURL = `https://apps.apple.com/app/id${appleIdProd}?mt=8`

  const playStoreURI = `https://play.google.com/store/apps/details?id=${applicationIdProd}`
  const playStoreURL = `https://play.google.com/store/apps/details?id=${applicationIdProd}`

  return Platform.select({
    ios: { storeURI: appStoreURI, storeURL: appStoreURL },
    android: { storeURI: playStoreURI, storeURL: playStoreURL },
  }) as StoreLink
}
