import { useRoute } from '@react-navigation/native'
import { View, Text } from 'react-native'

import type { RootStackScreenProps } from 'src/navigation/types'

const NestedScreen = () => {
  const route = useRoute<RootStackScreenProps<'NestedScreen'>['route']>()
  return (
    <View>
      <Text>NestedScreen with param isProfile: {String(route.params.isProfile)}</Text>
    </View>
  )
}

export default NestedScreen
