import { Image } from 'expo-image'
import { View, Text } from 'react-native'

import { styles } from './styles'

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${process.env.EXPO_PUBLIC_TEST}`}</Text>
      <Image source="strv_logo" contentFit="contain" style={styles.image} />
    </View>
  )
}
