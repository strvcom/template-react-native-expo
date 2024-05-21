import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { authSlice } from './authSlice'
import { type IStore } from './types'

import { mmkvStorage } from '~/utils/storage'

export const rootStore = create<IStore>()(
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
)

export const useRootStore = <T>(selector: (state: IStore) => T): T => rootStore(selector)
