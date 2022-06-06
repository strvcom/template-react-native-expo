import * as Updates from 'expo-updates'
import { useCallback } from 'react'
import { Alert } from 'react-native'

import { useOnForeground } from 'src/hooks/useOnForeground'

export const useOTAUpdates = () => {
  const checkForOTAUpdate = useCallback(async () => {
    if (__DEV__) {
      return
    }
    const update = await Updates.checkForUpdateAsync()
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync()
      Alert.alert(
        'Update',
        'A new version is available. Click to update.',
        [{ text: 'Update', onPress: () => void Updates.reloadAsync() }],
        { cancelable: false },
      )
    }
  }, [])

  return useOnForeground(checkForOTAUpdate, true)
}
