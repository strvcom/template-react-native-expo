import { useNetInfo } from '@react-native-community/netinfo'
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import ForcedUpdate from 'src/components/ForcedUpdate'
import OfflineMessage from 'src/components/OfflineMessage'
import useCachedResources from 'src/hooks/useCachedResources'
import { useForcedUpdate } from 'src/hooks/useForcedUpdate'
import { useOTAUpdates } from 'src/hooks/useOTAUpdate'
import RootStack from 'src/navigation/RootStack'
import { navigationRef } from 'src/navigation/utils'
import { setFontScaling } from 'src/utils/setFontScaling'
import { storage } from 'src/utils/storage'

if (__DEV__) {
  initializeMMKVFlipper({ default: storage })
}

setFontScaling()

export const App = () => {
  useFlipper(navigationRef)
  useOTAUpdates()
  const isAppOutdated = useForcedUpdate()
  const netInfo = useNetInfo()
  const { isLoadingComplete } = useCachedResources()

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="dark" backgroundColor="transparent" translucent animated />
        {/* isAppOutdated is null until logic runs */}
        {isLoadingComplete && isAppOutdated === false && <RootStack />}
      </NavigationContainer>
      {isAppOutdated && <ForcedUpdate />}
      {/* netInfo.isConnected might be null initially or when unknown */}
      {isLoadingComplete && netInfo.isConnected === false && <OfflineMessage />}
    </SafeAreaProvider>
  )
}

export default App
