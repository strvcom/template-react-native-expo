import { useEffect, useRef } from 'react'
import { AppState, type AppStateStatus } from 'react-native'

import { useLatestValue } from '~/hooks/useLatest'

export function useOnForeground(onForeground: () => void, includeFirstLoad = false) {
  const appState = useRef(AppState.currentState)
  const latestOnForeground = useLatestValue(onForeground)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/u) && nextAppState === 'active') {
        latestOnForeground.current()
      }
      appState.current = nextAppState
    }

    if (includeFirstLoad) latestOnForeground.current()

    const subscription = AppState.addEventListener('change', handleAppStateChange)

    return () => subscription.remove()
  }, [includeFirstLoad, latestOnForeground])
}
