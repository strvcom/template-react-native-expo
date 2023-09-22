import { type StateCreator } from 'zustand'

import { type IStore, type IAuthSlice } from './types'

export const authSlice: StateCreator<IStore, [['zustand/persist', unknown]], [], IAuthSlice> = (
  set,
) => ({
  accessToken: null,
  setAccessToken: (accessToken) => {
    set({ accessToken })
  },
  logoutUser: () => {
    set({ accessToken: null })
  },
})
