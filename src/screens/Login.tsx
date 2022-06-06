import { View, Text } from 'react-native'

import Button from 'src/components/Button'
import { useAuthStore } from 'src/hooks/useAuthStore'

const Login = () => {
  const { setAccessToken } = useAuthStore()
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
