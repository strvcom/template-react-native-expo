import { View, Text } from 'react-native'
import { Button } from 'src/components/Button'
import { navigationResetState, NESTED_ROUTE_RESET } from 'src/navigation/utils'
import { ms } from 'src/utils/scale'

export const Dashboard = () => {
  const handleNavigate = () => navigationResetState(NESTED_ROUTE_RESET)

  return (
    <View>
      <Text style={{ fontSize: ms(20) }}>Dashboard</Text>
      <Button text="Reset navigation to nested screen" onPress={handleNavigate} />
    </View>
  )
}
