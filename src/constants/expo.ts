import Constants, { ExecutionEnvironment } from 'expo-constants'

export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient
export const isExpoDevClient = __DEV__ && !isExpoGo
