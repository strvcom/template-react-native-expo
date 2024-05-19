import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ForcedUpdate } from '~/components/ForcedUpdate'
import { OfflineMessage } from '~/components/OfflineMessage'
import { useCachedResources } from '~/hooks/useCachedResources'
import { useIsOnline } from '~/hooks/useIsOnline'
import { useOTAUpdates } from '~/hooks/useOTAUpdate'
import { useStoreUpdate } from '~/hooks/useStoreUpdate'
import { RootStack } from '~/navigation/RootStack'
import { navigationRef } from '~/navigation/utils'
import { setFontScaling } from '~/utils/setFontScaling'

setFontScaling()

const AppContent = () => {
  const isAppOutdated = useStoreUpdate('forced')
  const { isOnline } = useIsOnline()
  const { isLoadingComplete } = useCachedResources()
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="dark" backgroundColor="transparent" translucent animated />
        {/* isAppOutdated is null until logic runs */}
        {isLoadingComplete && isAppOutdated === false && <RootStack />}
      </NavigationContainer>
      {isAppOutdated && <ForcedUpdate />}
      {/* might be null initially or when unknown */}
      {isLoadingComplete && isOnline === false && <OfflineMessage />}
    </>
  )
}

const App = () => {
  useOTAUpdates()

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
