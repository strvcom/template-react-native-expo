import packageJson from 'package.json'
import { useCallback } from 'react'
import { Platform } from 'react-native'
import semver from 'semver'

import { useStorageString, StorageKeys } from '~/services/storage'

const getIfVersionIsSupported = (version: string | undefined, appVersion = packageJson.version) => {
  if (!version) return true
  if (semver.valid(version) === null) return true
  return semver.gte(appVersion, version)
}

type UseStoreUpdateProps = {
  loading?: boolean
  data?: {
    recommendedIOSVersion: string
    recommendedAndroidVersion: string
    minIOSVersion: string
    minAndroidVersion: string
  }
}

export const useStoreUpdate = ({ data, loading }: UseStoreUpdateProps) => {
  const [recommendedUpdate, setRecommendedUpdate] = useStorageString(StorageKeys.RecommendedUpdate)

  const recommendedVersion = Platform.select({
    ios: data?.recommendedIOSVersion,
    android: data?.recommendedAndroidVersion,
  })

  const forceUpdateVersion = Platform.select({
    ios: data?.minIOSVersion,
    android: data?.minAndroidVersion,
  })

  const shouldForceUpdate = !getIfVersionIsSupported(forceUpdateVersion)

  const markRecommendedUpdate = useCallback(() => {
    void setRecommendedUpdate(recommendedVersion)
  }, [recommendedVersion, setRecommendedUpdate])

  const shouldRecommendUpdate =
    shouldForceUpdate || recommendedUpdate === recommendedVersion
      ? false
      : !getIfVersionIsSupported(recommendedVersion)

  return {
    loading,
    shouldRecommendUpdate,
    shouldForceUpdate,
    recommendedVersion,
    forceUpdateVersion,
    markRecommendedUpdate,
  }
}
