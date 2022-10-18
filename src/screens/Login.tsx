import { View, Text } from 'react-native'

import Button from 'src/components/Button'
import { useRootStore } from 'src/store/useRootStore'
import { ms } from 'src/utils/scale'

const Login = () => {
  const { setAccessToken } = useRootStore()
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

export default Login
