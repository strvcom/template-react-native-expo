import { router } from 'expo-router'

import { useRootStore } from '~/store/useRootStore'

export const useAuth = () => {
  const accessToken = useRootStore((state) => state.accessToken)
  const setAccessToken = useRootStore((state) => state.setAccessToken)

  const signOut = useRootStore((state) => state.logoutUser)
  const signIn = () => {
    setAccessToken('dummyToken')
    router.replace('/')
  }

  return {
    isSignIn: Boolean(accessToken),
    signOut,
    signIn,
  }
}
