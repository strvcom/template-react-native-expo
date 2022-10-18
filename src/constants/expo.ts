import Constants from 'expo-constants'

export const isExpoGo = Constants.appOwnership === 'expo'
export const isExpoDevClient = __DEV__ && !isExpoGo
