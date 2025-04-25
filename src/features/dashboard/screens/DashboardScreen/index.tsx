import STRV_LOGO from 'assets/images/strv_logo.png'
import { Image } from 'expo-image'
import { View, Text } from 'react-native'

import { styles } from './styles'

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Image source={STRV_LOGO} contentFit="contain" style={styles.image} />
    </View>
  )
}
