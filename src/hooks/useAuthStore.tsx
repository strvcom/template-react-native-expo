// import zustandFlipper from 'react-native-flipper-zustand'
import create from 'zustand'
import { persist } from 'zustand/middleware'

import { mmkvStorage } from 'src/utils/storage'

// TODO: wrap persist middleware with zustandFlipper once types are resolved for Zustand V4 to enable seeing zustand actions/state in flipper
// https://github.com/cmdominguez/react-native-flipper-zustand/issues/3
interface IAuthStore {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  logoutUser: () => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken) => {
        set({ accessToken })
      },
      logoutUser: () => {
        set({ accessToken: null })
      },
    }),
    {
      name: 'authStorage',
      getStorage: () => mmkvStorage,
      // allow only accessToken to be persisted on the device
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
)
