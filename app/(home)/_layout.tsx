import { Redirect, Tabs } from 'expo-router'
import React from 'react'

import { useAuth } from '~/features/auth/hooks/useAuth'

export default function TabLayout() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        options={{
          title: 'Dashboard',
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          title: 'Profile',
        }}
        name="profile"
      />
    </Tabs>
  )
}
