import { View, Text } from 'react-native'

import { Button } from '~/components/Button'
import { useRootStore } from '~/store/useRootStore'
import { ms } from '~/utils/scale'

export const Login = () => {
  const setAccessToken = useRootStore((state) => state.setAccessToken)
  const handleSignIn = () => {
    setAccessToken('dummyToken')
  }

  return (
    <View>
      <Text style={{ fontSize: ms(20) }}>Login Screen</Text>
      <Button text="Sign in" onPress={handleSignIn} />
    </View>
  )
}
