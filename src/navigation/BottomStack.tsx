import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Routes } from '~/navigation/routes'
import { type BottomStackParamList } from '~/navigation/types'
import { Dashboard } from '~/screens/Dashboard'
import { Profile } from '~/screens/Profile'

const Tab = createBottomTabNavigator<BottomStackParamList>()

export const BottomStack = () => (
  <Tab.Navigator initialRouteName={Routes.DASHBOARD}>
    <Tab.Screen name={Routes.DASHBOARD} component={Dashboard} />
    <Tab.Screen name={Routes.PROFILE} component={Profile} />
  </Tab.Navigator>
)
