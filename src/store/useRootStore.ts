// @ts-nocheck
// TODO: wrap persist middleware with zustandFlipper once types are resolved for Zustand V4 to enable seeing zustand actions/state in flipper
// https://github.com/cmdominguez/react-native-flipper-zustand/issues/3

import zustandFlipper from 'react-native-flipper-zustand'
import create from 'zustand'
import { persist } from 'zustand/middleware'

import { mmkvStorage } from 'src/utils/storage'

import { authSlice } from './authSlice'
import type { IStore } from './types'

export const useRootStore = create<IStore>()(
  zustandFlipper(
    persist(
      // you can create more slices for other app features
      (...args) => ({ ...authSlice(...args) }),
      {
        name: 'app-storage',
        getStorage: () => mmkvStorage,
        // allow only accessToken to be persisted on the device
        partialize: (state: IStore) => ({ accessToken: state.accessToken }),
      },
    ),
  ),
)
