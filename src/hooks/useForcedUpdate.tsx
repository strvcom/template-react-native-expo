import Constants from 'expo-constants'
import { useState, useEffect } from 'react'
// eslint-disable-next-line prefer-named-capture-group
const SEMANTIC_VERSION_REGEX = /^([1-9][0-9]*|[0]+)\.([1-9][0-9]*|[0]+)\.([1-9][0-9]*|[0]+)$/u

const checkSemanticity = (version: string): boolean =>
  SEMANTIC_VERSION_REGEX.test(version.split('-')[0])

const getVersionAttributes = (version: string) => {
  const [major, minor, patch] = version.split('-')[0].split('.')
  return [Number(major), Number(minor), Number(patch)]
}

const getIsAppOutdated = (): boolean => {
  // potential firebase remote config implementation
  // await remoteConfigFirebase().fetch(1800)
  // await remoteConfigFirebase().activate()
  // void remoteConfigFirebase().ensureInitialized()
  // const minimumSupportedVersionKey = 'minimum_supported_version'
  // const minimumSupportedVersion = remoteConfigFirebase()
  //   .getValue(minimumSupportedVersionKey)
  //   .asString()

  const minimumSupportedVersion = '0.1.0'
  const installedAppVersion = Constants.manifest?.version

  if (!minimumSupportedVersion || !installedAppVersion) return false

  //   if the shape of versions is unexpected, no forced update prompted, expecting `major.minor.patch` with optional `-buildNumber`
  if (!checkSemanticity(installedAppVersion) || !checkSemanticity(minimumSupportedVersion))
    return false

  const [supportedMajor, supportedMinor, supportedPatch] =
    getVersionAttributes(minimumSupportedVersion)

  const [installedMajor, installedMinor, installedPatch] = getVersionAttributes(installedAppVersion)

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
}

export const useForcedUpdate = () => {
  const [isAppOutdated, setIsAppOutdated] = useState<boolean | null>(null)

  useEffect(() => setIsAppOutdated(getIsAppOutdated()), [])

  return isAppOutdated
}
