import { Image } from 'expo-image'
import { View, Text } from 'react-native'

import { ms } from '~/utils/scale'

export const Dashboard = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: ms(20) }}>Dashboard</Text>
    </View>
  )
}
