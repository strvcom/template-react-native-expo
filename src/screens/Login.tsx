import { View, Text } from 'react-native'

import Button from 'src/components/Button'
import { useRootStore } from 'src/store/useRootStore'

const Login = () => {
  const { setAccessToken } = useRootStore()
  const handleSignIn = () => {
    setAccessToken('dummyToken')
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <Button text="Sign in" onPress={handleSignIn} />
    </View>
  )
}

export default Login
