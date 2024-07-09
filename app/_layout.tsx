import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const RootStack = () => {
  return <Stack />
}

export default () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <RootStack />
  </GestureHandlerRootView>
)
