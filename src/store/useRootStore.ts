import zustandFlipper from 'react-native-flipper-zustand'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { mmkvStorage } from 'src/utils/storage'

import { authSlice } from './authSlice'
import { type IStore } from './types'

export const rootStore = create<IStore>()(
  zustandFlipper(
    persist(
      // you can create more slices for other app features
      (...args) => ({ ...authSlice(...args) }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => mmkvStorage),
        // allow only accessToken to be persisted on the device
        partialize: (state: IStore) => ({ accessToken: state.accessToken }),
      },
    ),
  ),
)

export const useRootStore = <T>(selector: (state: IStore) => T): T => rootStore(selector)
