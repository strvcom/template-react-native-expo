import { CommonActions, createNavigationContainerRef } from '@react-navigation/native'

import { Routes } from 'src/navigation/routes'
import type { ResetState, RootStackParamList } from 'src/navigation/types'

export const navigationRef = createNavigationContainerRef()

export const navigationReset = <TRoute extends keyof RootStackParamList>(
  route: TRoute,
  // if screen has extra parameter object, require it, else keep it optional
  ...params: RootStackParamList[TRoute] extends object ? [RootStackParamList[TRoute]] : []
) =>
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: route, params }],
    }),
  )

// use to have a screen to go back to
export const navigationResetState = (resetState: ResetState) =>
  navigationRef.dispatch(CommonActions.reset(resetState))

export const NESTED_ROUTE_RESET: ResetState = {
  index: 1,
  routes: [
    { name: Routes.BOTTOM_STACK, params: { screen: Routes.PROFILE } },
    { name: Routes.NESTED_SCREEN, params: { isProfile: false } },
  ],
}
