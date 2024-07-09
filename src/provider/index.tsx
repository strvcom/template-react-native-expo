import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv'
import * as SplashScreen from 'expo-splash-screen'
import React, { PropsWithChildren, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ForcedUpdate } from '~/components/ForcedUpdate'
import { OfflineMessage } from '~/components/OfflineMessage'
import { useIsOnline } from '~/hooks/useIsOnline'
import { useOTAUpdates } from '~/hooks/useOTAUpdate'
import { useStoreUpdate } from '~/hooks/useStoreUpdate'
import { setFontScaling } from '~/utils/setFontScaling'

SplashScreen.preventAutoHideAsync()
setFontScaling()

export const Provider = ({ children }: PropsWithChildren) => {
  const isAppOutdated = useStoreUpdate('forced')
  const { isOnline } = useIsOnline()
  useMMKVDevTools()
  useOTAUpdates()

  useEffect(() => {
    // isAppOutdated is null until logic runs
    if (isAppOutdated !== null) {
      SplashScreen.hideAsync()
    }
  }, [isAppOutdated])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
      {isAppOutdated && <ForcedUpdate />}
      {isOnline === false && <OfflineMessage />}
    </GestureHandlerRootView>
  )
}
