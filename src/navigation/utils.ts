import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'

import type { RootStackParamList } from 'src/navigation/types'

export const navigationRef = createNavigationContainerRef()
export const navigationReset = (route: keyof RootStackParamList, params?: object) =>
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: route, params }],
    }),
  )
