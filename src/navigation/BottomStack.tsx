import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Routes } from 'src/navigation/routes'
import type { BottomStackParamList } from 'src/navigation/types'
import { Dashboard } from 'src/screens/Dashboard'
import { Profile } from 'src/screens/Profile'

const Tab = createBottomTabNavigator<BottomStackParamList>()

export const BottomStack = () => (
  <Tab.Navigator initialRouteName={Routes.DASHBOARD}>
    <Tab.Screen name={Routes.DASHBOARD} component={Dashboard} />
    <Tab.Screen name={Routes.PROFILE} component={Profile} />
  </Tab.Navigator>
)
