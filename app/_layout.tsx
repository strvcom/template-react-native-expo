import { Stack } from 'expo-router'
import React from 'react'

import { Provider } from '~/provider'

const RootStack = () => {
  return (
    <Stack
      screenOptions={{
        title: `STRV's Expo Template`,
      }}
    />
  )
}

export default function Root() {
  return (
    <Provider>
      <RootStack />
    </Provider>
  )
}
