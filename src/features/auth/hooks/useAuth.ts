import { useRouter } from 'expo-router'
import { useMMKVString } from 'react-native-mmkv'

export const useAuth = () => {
  const [accessToken, setAccessToken] = useMMKVString('accessToken')
  const router = useRouter()

  const signIn = () => {
    setAccessToken('dummyToken')
    router.dismissTo('/')
  }

  const signOut = () => {
    setAccessToken(undefined)
  }

  return {
    isSignedIn: Boolean(accessToken),
    signIn,
    signOut,
  }
}
