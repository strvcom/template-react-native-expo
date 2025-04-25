import * as Linking from 'expo-linking'
import { useEffect } from 'react'
import { View, Alert, AlertButton } from 'react-native'

import { getStoreLink } from '~/utils/getStoreLink'

export const ForcedUpdate = ({ cancelable = true }: { cancelable?: boolean }) => {
  useEffect(() => {
    const handleUpdate = async () => {
      const storeLink = getStoreLink()
      const canOpenUri = await Linking.canOpenURL(storeLink.storeURI)
      const validStoreLink = canOpenUri ? storeLink.storeURI : storeLink.storeURL

      if (validStoreLink) {
        void Linking.openURL(validStoreLink)
      }
    }

    const buttonCancel = {
      text: 'Not now',
      onPress: () => {},
    }

    const buttonUpdate = {
      text: 'Update',
      onPress: handleUpdate,
    }

    Alert.alert(
      'Update Available',
      'Updating to the latest version provides the newest features, security updates, and bug fixes. Tap below to update the app.',
      [cancelable && buttonCancel, buttonUpdate].filter(Boolean) as AlertButton[],
      { cancelable },
    )
  }, [cancelable])

  return <View />
}
