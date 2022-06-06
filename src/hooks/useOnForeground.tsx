import { useState, useEffect } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState } from 'react-native'

import { useLatestValue } from 'src/hooks/useLatest'

export function useOnForeground(onForeground: () => void, includeFirstLoad = false) {
  const [appState, setAppState] = useState(AppState.currentState)

  const latestAppState = useLatestValue(appState)
  const latestOnForeground = useLatestValue(onForeground)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (latestAppState.current.match(/inactive|background/u) && nextAppState === 'active') {
        latestOnForeground.current()
      }
      setAppState(nextAppState)
    }

    if (includeFirstLoad) latestOnForeground.current()

    const subscription = AppState.addEventListener('change', handleAppStateChange)
    AppState.addEventListener('change', handleAppStateChange)

    return () => subscription.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
