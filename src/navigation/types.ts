import { type NavigationState, type PartialState } from '@react-navigation/native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'

import { type Routes } from '~/navigation/routes'

export type BottomStackParamList = {
  [Routes.DASHBOARD]: undefined
  [Routes.PROFILE]: undefined
}

export type RootStackParamList = {
  [Routes.LOGIN]: undefined
  [Routes.BOTTOM_STACK]: { screen?: keyof BottomStackParamList }
  [Routes.NESTED_SCREEN]: { isProfile: boolean }
}

export type ResetState = PartialState<NavigationState<RootStackParamList>>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

export type BottomStackScreenProps<T extends keyof BottomStackParamList> = NativeStackScreenProps<
  BottomStackParamList,
  T
>
