import { defineConfig } from 'eslint/config'
import reactNative from '@strv/eslint-config-react-native'
import testingLibrary from 'eslint-plugin-testing-library'

/** @type {import("eslint").Linter.Config} */
const project = {
  rules: {},
}

const testConfig = {
  ...testingLibrary.configs['flat/react'],
  files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
}

export default defineConfig([reactNative, project, testConfig])
