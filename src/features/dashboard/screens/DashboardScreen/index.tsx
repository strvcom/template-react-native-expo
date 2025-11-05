import { Image } from 'expo-image'
import { View } from 'react-native'

import { styles } from './styles'

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Image contentFit="contain" source="strv_logo" style={styles.image} />
    </View>
  )
}
