import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv'
import * as SplashScreen from 'expo-splash-screen'
import React, { PropsWithChildren, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { OfflineMessage } from '~/features/offlineCheck/components/OfflineMessage'
import { useIsOnline } from '~/features/offlineCheck/hooks/useIsOnline'
import { commonStyles } from '~/features/ui/styles/common'
import { ForcedUpdate } from '~/features/versionCheck/components/ForcedUpdate'
import { useOTAUpdates } from '~/features/versionCheck/hooks/useOTAUpdate'
import { useStoreUpdate } from '~/features/versionCheck/hooks/useStoreUpdate'
import { setFontScaling } from '~/utils/setFontScaling'

void SplashScreen.preventAutoHideAsync()
setFontScaling()

export const Provider = ({ children }: PropsWithChildren) => {
  const { shouldForceUpdate, shouldRecommendUpdate } = useStoreUpdate({
    data: {
      recommendedIOSVersion: '1.0.0',
      recommendedAndroidVersion: '1.0.0',
      minIOSVersion: '0.0.0',
      minAndroidVersion: '0.0.0',
    },
    loading: false,
  })
  const { isOnline } = useIsOnline()
  useMMKVDevTools()
  useOTAUpdates()

  useEffect(() => {
    // isAppOutdated is null until logic runs
    if (!shouldForceUpdate && !shouldRecommendUpdate) {
      void SplashScreen.hideAsync()
    }
  }, [shouldForceUpdate, shouldRecommendUpdate])

  return (
    <GestureHandlerRootView style={commonStyles.f1}>
      {children}
      {shouldForceUpdate && <ForcedUpdate cancelable={false} />}
      {shouldRecommendUpdate && <ForcedUpdate />}
      {isOnline === false && <OfflineMessage />}
    </GestureHandlerRootView>
  )
}
