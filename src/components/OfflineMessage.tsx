// import { fetch } from '@react-native-community/netinfo'
import * as Updates from 'expo-updates'
import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '~/styles/colors'

export const OfflineMessage = () => {
  const { bottom } = useSafeAreaInsets()
  const [showReload, setShowReload] = useState(false)

  const handleReload = () => void Updates.reloadAsync()
  // alternatively change reload to retry and fetch network
  // const handleReload = () => void fetch()

  useEffect(() => {
    const timer = setTimeout(() => setShowReload(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View
      style={{
        ...(bottom ? { paddingBottom: bottom, marginTop: -bottom + 5 } : {}),
        backgroundColor: colors.grey,
      }}
    >
      <Pressable
        hitSlop={3}
        onPress={handleReload}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Text>{`You are offline.${showReload ? ' Stuck?' : ''}`}</Text>
        {showReload && <Text>- try reloading the app</Text>}
      </Pressable>
    </View>
  )
}
