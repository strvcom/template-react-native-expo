import { defineConfig } from 'eslint/config'
import reactNative from '@strv/eslint-config-react-native'
import testingLibrary from 'eslint-plugin-testing-library'


/** @type {import("eslint").Linter.Config} */
const project = {
  rules: {},
}

const testConfig = {
  files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  ...testingLibrary.configs['flat/react'],
}

export default defineConfig([reactNative, project, testConfig])
