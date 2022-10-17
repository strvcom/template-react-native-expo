declare module '@env' {
  export type Environment = 'dev' | 'staging' | 'production'

  export const APP_ENV: Environment
}
