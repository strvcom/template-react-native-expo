//

// import remoteConfig from '@react-native-firebase/remote-config'
import { useState, useEffect } from 'react'
// import { Platform } from 'react-native'

// import { config } from 'src/config'

// eslint-disable-next-line prefer-named-capture-group
const SEMANTIC_VERSION_REGEX = /^([1-9][0-9]*|[0]+)\.([1-9][0-9]*|[0]+)\.([1-9][0-9]*|[0]+)$/u

const checkSemanticity = (version: string): boolean =>
  SEMANTIC_VERSION_REGEX.test(version.split('-')[0])

const getVersionAttributes = (version: string) => {
  const [major, minor, patch] = version.split('-')[0].split('.')
  return [Number(major), Number(minor), Number(patch)]
}

type UpdateVariant = 'forced' | 'suggested'

// const minimumSupportedVersionKey = `minimum_supported_version_${Platform.OS}`
// const latestReleasedVersionKey = 'latest_released_version'

const getIsAppOutdated = async (_variant: UpdateVariant) => {
  try {
    // await remoteConfig().fetch(1800)
    // await remoteConfig().activate()
    // void remoteConfig().ensureInitialized()

    // const remoteConfigKey =
    //   variant === 'suggested' ? latestReleasedVersionKey : minimumSupportedVersionKey

    // const comparableVersion = remoteConfig().getValue(remoteConfigKey).asString()
    // const installedAppVersion = config.installedAppVersion

    const comparableVersion = '0.0.0'
    const installedAppVersion = '0.0.0'

    if (!comparableVersion || !installedAppVersion) return false

    //   if the shape of versions is unexpected, no forced update prompted, expecting `major.minor.patch` with optional `-buildNumber`
    if (!checkSemanticity(installedAppVersion) || !checkSemanticity(comparableVersion)) return false

    const [supportedMajor, supportedMinor, supportedPatch] = getVersionAttributes(comparableVersion)

    const [installedMajor, installedMinor, installedPatch] =
      getVersionAttributes(installedAppVersion)

    const hasMajorDiff = supportedMajor > installedMajor
    const hasMinorDif = supportedMajor === installedMajor && supportedMinor > installedMinor
    const hasPatchDif =
      supportedMajor === installedMajor &&
      supportedMinor === installedMinor &&
      supportedPatch > installedPatch

    if (hasMajorDiff || hasMinorDif || hasPatchDif) {
      return true
    }

    return false
  } catch (error) {
    // crashlytics.recordCatchError(error, `${variant} version flag could not be fetched`)
    return false
  }
}

export const useStoreUpdate = (variant: UpdateVariant) => {
  const [isAppOutdated, setIsAppOutdated] = useState<boolean | null>(null)

  useEffect(() => void getIsAppOutdated(variant).then(setIsAppOutdated), [variant])

  return isAppOutdated
}
