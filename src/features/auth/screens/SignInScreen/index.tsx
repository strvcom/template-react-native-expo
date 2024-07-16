import { View, Text } from 'react-native'

import { Button } from '~/components/Button'
import { useAuth } from '~/features/auth/hooks/useAuth'
import { ms } from '~/utils/scale'

export const SignIn = () => {
  const { signIn } = useAuth()

  return (
    <View>
      <Text style={{ fontSize: ms(20) }}>Login Screen</Text>
      <Button text="Sign in" onPress={signIn} />
    </View>
  )
}
