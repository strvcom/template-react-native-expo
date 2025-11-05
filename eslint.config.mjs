import { defineConfig } from 'eslint/config'
import reactNative from '@strv/eslint-config-react-native'

/** @type {import("eslint").Linter.Config} */
const project = {
  rules: {},
}

export default defineConfig([reactNative, project])
