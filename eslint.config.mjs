import { defineConfig } from 'eslint/config'
import reactNative from '@strv/eslint-config-react-native'

/** @type {import("eslint").Linter.Config} */
const custom = { rules: {} }

export default defineConfig([reactNative, custom])
