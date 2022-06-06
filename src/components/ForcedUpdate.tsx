import * as Linking from 'expo-linking'
import { useEffect } from 'react'
import { View, Alert } from 'react-native'

import { getStoreLink } from 'src/utils/getStoreLink'

const ForcedUpdate = () => {
  useEffect(() => {
    const handleUpdate = async () => {
      const storeLink = getStoreLink()
      const canOpenUri = await Linking.canOpenURL(storeLink.storeURI)
      const validStoreLink = canOpenUri ? storeLink.storeURI : storeLink.storeURL

      if (validStoreLink) {
        void Linking.openURL(validStoreLink)
      }
    }

    Alert.alert(
      'Update Available',
      'Updating to the latest version provides the newest features, security updates, and bug fixes. Tap below to update the app.',
      [
        {
          text: 'Update',
          onPress: handleUpdate,
        },
      ],
      { cancelable: false },
    )
  }, [])

  return <View />
}

export default ForcedUpdate
