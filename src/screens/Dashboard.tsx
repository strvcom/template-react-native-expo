import { Image } from 'expo-image'
import { View, Text } from 'react-native'

import { Button } from '~/components/Button'
import { navigationResetState, NESTED_ROUTE_RESET } from '~/navigation/utils'
import { ms } from '~/utils/scale'

export const Dashboard = () => {
  const handleNavigate = () => navigationResetState(NESTED_ROUTE_RESET)

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: ms(20) }}>Dashboard</Text>
      <Image source="rn_meme" style={{ height: 400, width: 300 }} />
      <Button text="Reset navigation to nested screen" onPress={handleNavigate} />
    </View>
  )
}
