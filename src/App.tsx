import { useNetInfo } from '@react-native-community/netinfo'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import ForcedUpdate from 'src/components/ForcedUpdate'
import OfflineMessage from 'src/components/OfflineMessage'
import useCachedResources from 'src/hooks/useCachedResources'
import { useOTAUpdates } from 'src/hooks/useOTAUpdate'
import { useStoreUpdate } from 'src/hooks/useStoreUpdate'
import RootStack from 'src/navigation/RootStack'
import { navigationRef } from 'src/navigation/utils'
import { setFontScaling } from 'src/utils/setFontScaling'
import { storage } from 'src/utils/storage'

if (__DEV__) {
  initializeMMKVFlipper({ default: storage })
}

setFontScaling()

const AppContent = () => {
  const isAppOutdated = useStoreUpdate('forced')
  const netInfo = useNetInfo()
  const { isLoadingComplete } = useCachedResources()
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="dark" backgroundColor="transparent" translucent animated />
        {/* isAppOutdated is null until logic runs */}
        {isLoadingComplete && isAppOutdated === false && <RootStack />}
      </NavigationContainer>
      {isAppOutdated && <ForcedUpdate />}
      {/* netInfo.isConnected might be null initially or when unknown */}
      {isLoadingComplete && netInfo.isConnected === false && <OfflineMessage />}
    </>
  )
}

const App = () => {
  useFlipper(navigationRef)
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
