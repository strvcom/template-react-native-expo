import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { isAndroid } from '~/constants/platform'
import { BottomStack } from '~/navigation/BottomStack'
import { Routes } from '~/navigation/routes'
import { type RootStackParamList } from '~/navigation/types'
import { Login } from '~/screens/Login'
import { NestedScreen } from '~/screens/NestedScreen'
import { useRootStore } from '~/store/useRootStore'

const Root = createNativeStackNavigator<RootStackParamList>()

export const RootStack = () => {
  const accessToken = useRootStore((state) => state.accessToken)
  const isLoggedIn = Boolean(accessToken)

  return (
    <Root.Navigator screenOptions={{ animation: isAndroid ? 'fade' : 'default' }}>
      {isLoggedIn ? (
        <>
          <Root.Screen
            name={Routes.BOTTOM_STACK}
            component={BottomStack}
            options={{ headerShown: false }}
          />
          <Root.Screen name={Routes.NESTED_SCREEN} component={NestedScreen} />
        </>
      ) : (
        <Root.Screen name={Routes.LOGIN} component={Login} />
      )}
    </Root.Navigator>
  )
}
