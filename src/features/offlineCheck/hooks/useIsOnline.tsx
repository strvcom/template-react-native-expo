import { useNetInfo } from '@react-native-community/netinfo'

export const useIsOnline = () => {
  const { isInternetReachable } = useNetInfo()

  return { isOnline: isInternetReachable }
}
