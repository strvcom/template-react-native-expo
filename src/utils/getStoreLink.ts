import { getEnvironmentInfo } from 'app.config'
import easJson from 'eas.json'
import { Platform } from 'react-native'

const applicationIdProd = getEnvironmentInfo('production').appIdentifier
const appleIdProd = easJson.submit.production.ios.ascAppId

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
