export interface IAuthSlice {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  logoutUser: () => void
}

export type IStore = IAuthSlice
