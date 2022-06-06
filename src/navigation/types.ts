import type { Routes } from 'src/navigation/routes'

export type RootStackParamList = {
  [Routes.LOGIN]: undefined
  [Routes.BOTTOM_STACK]: undefined
  [Routes.NESTED_SCREEN]: undefined
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type BottomStackParamList = {
  [Routes.DASHBOARD]: undefined
  [Routes.PROFILE]: undefined
}
