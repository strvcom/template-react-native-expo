# React Native Expo Template

**Table of Contents**

- [React Native Expo Template](#react-native-expo-template)
  - [Overview](#overview)
  - [Quick Start](#quick-start)
  - [Important Defaults - Configuration](#important-defaults---configuration)
    - [Expo Development Build](#expo-development-build)
    - [EAS Build Setup](#eas-build-setup)
    - [App Environments Setup](#app-environments-setup)
    - [Babel Plugins](#babel-plugins)
    - [Debugging - Expo Dev Plugins](#debugging---expo-dev-plugins)
    - [Linting Tools](#linting-tools)
  - [Important Defaults - APP](#important-defaults---app)
    - [Global State and User Persistence](#global-state-and-user-persistence)
    - [Over-the-Air Updates](#over-the-air-updates)
    - [Forced Update aka Minimum Version Check](#forced-update-aka-minimum-version-check)
    - [Offline Check](#offline-check)
    - [Maximum Font Scaling](#maximum-font-scaling)
    - [Size Scaling](#size-scaling)
  - [Other Recommended Solutions](#other-recommended-solutions)
  - [Adding new `ENV` variables:](#adding-new-env-variables)

## Overview

This template is a starting point for building a React Native app using Expo in STRV.

It provides a foundation for every stage of the development process:

🔧 For the project start and initial development:

- Expo Development build setup
- domain driven folder structure
- Storage service using MMKV
- Font and size scaling utilities

📏 For keeping the code quality high and enforcing code standards:

- basic unit test setup
- Linter and formatter setup
- pre push and pre commit hooks

🚀 For shipping and production maintenance:

- Github Actions for CI/CD
- App config ready for different environments
- Utilities for version check and forced updates in production

> ⚠️ We don't include any more opinionated solutions such as:
>
> - Styling and theming solution
> - State management library
> - Image loading library
> - E2E testing setup

## Quick Start

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. copy `.env.example` to `.env` using `cp .env.example .env`
4. run `pnpm ios/android` to start the development server and run the app on your device

To use the full CI/CD pipeline you also need to:

1. [Setup EAS and EAS credentials](docs/eas-setup.md)
2. [Setup Github environment](docs/github-setup.md)
3. [Setup Slack app for notifications (optional)](docs/slack-setup.md)
4. [Jira Setup (optional)](docs/jira-setup.md)

## Important Defaults - Configuration

### Expo Development Build

- The main benefit is better maintainability as most of the native setup is done through `app.config.ts` and community/custom config plugins. Updating Expo SDK mostly assures compatibility with majority of dependencies used, which is a common source of problem when upgrading React Native separately. You can use expo doctor to check for any issues with the setup and update the project accordingly.

### EAS Build Setup

- EAS helps with building and app submission. It can create and store all important credentials so that we don't have to distribute them among everyone.
- Default build profiles in `eas.json`:
  - `dev` - this profile will build an `expo-dev-client`, meaning that after installing the app, one can change non-native code and see changes reflected in the app
  - `staging` - should be distributed for testing, does not have a dev client, meaning it cannot be manipulated. It builds `com.xxx.xxx.staging` application which can be distributed through a link or a QR code.

> For iOS, we need to add devices for EAS testing (development, staging) via `eas device:create` (creates sharable registration link) and confirm the device has been added. It is good to write down your unique device ID to understand what is your device.

- `production` - non-distributable build that should be submitted to Play Store and App Store. Can be tested through Play Store internal testing track or Testflight. It builds the official `com.xxx.xxx` package later released to production.

### App Environments Setup

- Environment variables are managed by [Expo](https://docs.expo.dev/guides/environment-variables/), use `EXPO_PUBLIC` prefix to make them accessible in the app
- `app.config.ts` determines based on the environment a relevant **icon, app name and appIdentifier** to distinguish individual apps and allow installing side by side
- `eas.json` can set `APP_ENV` variable for each build profile to define environment

### Babel Plugins

- `babel-plugin-transform-remove-console` to remove console logs in production

### Debugging - Expo Dev Plugins

Dev plugins included in the template:

- [React Navigation](https://docs.expo.dev/debugging/devtools-plugins/#react-navigation) - to see navigation state, history, and params passed to screens
- [MMKV](https://github.com/expo/dev-plugins/blob/main/apps/example/src/app/react-native-mmkv/index.tsx) - to see MMKV store

Not included but useful:

- [React Query](https://github.com/bgaleotti/react-query-native-devtools)

### Linting Tools

- We are using @strv/eslint-config-react-native config which is an extension of Expo Universe config with couple of extra rule changes we have found useful.
- We are using mostly standard prettier config.
- Husky is used to run linting and formatting before committing and pushing code.
- Lint Staged is used to run linting and formatting before committing.

## Important Defaults - APP

### Global State and User Persistence

User persistence is setup through `MMKV` which is a **synchronized** and **faster** alternative to `AsyncStorage`.

### Over-the-Air Updates

`expo-updates` is used to deliver and check for new updates. `useOTAUpdates()` checks if the update is available on mount and whenever the app goes from background to foreground via `useOnForeground()` hook. If an update is available, we should show to the user screen/modal/alert that would suggest them to update (reload the app).

> ⚠️ The OTA updates are used for patches to javascript layer only which is convenient for small bug fixes and UI changes.

To deliver the update through `eas update` we need to target the right `channel` from `eas.json` and manage `runtimeVersion` in `app.config.ts` for **native layer compatibility** otherwise we risk updating incompatible environment resulting in app crashes.

> ⚠️ runtimeVersion should be changed whenever we change native layer, meaning a new native third party dependency is installed in package.json or we do native config changes in app.config.ts.

> ❓ A versioning strategy could be to bump minor version for every native change and bump patch version for every javascript change. Then `runtimeVersion` would change from `0.1.0` to `0.2.0`, while `version` could change as follows: `0.1.0` > `0.1.x` > `0.2.0`. This means `runtimeVersion` `0.1.0` is compatible with all `versions` `0.1.x`.

> ⚠️ if we run `eas update` locally, current `.env` file is used, so be careful not to publish to production development variables. Better to do it through a github action and setup environment variables as Github Secrets.

### Forced Update aka Minimum Version Check

**Before going to production** we should have a forced update functionality in place for cases such as when we introduce a major bug or our backend API is not backward compatible. `useStoreUpdate()` hook compares `minimumSupportedVersion` or `recommendedVersion` with `installedAppVersion` from `app.config.ts`. The minimum version should come either from some backend API or third party service such as `Firebase Remote Config` (good experience). If the app is outdated we should show to the user screen/modal/alert that would suggest them to update (redirect to store listing).
How such a modal could look like is included in the template.

### Offline Check

`useNetInfo()` provides information about current user's network connectivity. In case of `isConnected` returns false, we can provide a helpful hint (`<OfflineMessage/>` or full screen) to the user that they are disconnected from the internet so that they don't expect full app functionality. Also provide button to either `fetch()` the latest connection info or `reload` the app should they get stuck.

> True is the listener is not fully [reliable](https://github.com/react-native-netinfo/react-native-netinfo/issues/481) and I see on my Pixel that I am not connected when changing from background to foreground even though I am

### Maximum Font Scaling

React Native allows as default to scale the font significantly which will break the UI of the app. You should expect users to have font scaling up if your target group includes older generation. To allow some level of accessibility but prevent users from breaking the app UI, default scaling of maximum +25% is applied. You can increase it but be sure to control important parts of the application individually to keep UX in place.

### Size Scaling

To replicate Figma design consistently on majority of mobile screen sizes, we should apply size scaling to UI elements relative to actual device window width/height. This technique is not perfect and implements a subjective scaling factor, but prevents well having too small elements on larger screens. Inspiration: [article + library](https://github.com/nirsky/react-native-size-matters/blob/master/examples/BlogPost/README.md)

## Other Recommended Solutions

- **Styling**

  - [Restyle](https://github.com/Shopify/restyle), [Unistyles](https://www.unistyl.es/), [Nativewind](https://www.nativewind.dev/)

    > Restyle follows a defined theme with strict type safety resulting in consistent and quickly built UI. It is very helpful when a designer defines majority of text variants which can be plugged into the theme and reused super easily. It has also responsive utilities that can make potential transition to a tablet app easier. Unistyles takes a similar approach but is newer and doesn't require special components. Nativewind is a newer library that is based on Tailwind CSS.

- **Notifications**

  - [React Native Firebase Cloud Messaging](https://rnfirebase.io/messaging/usage) + [Notifee](https://github.com/invertase/notifee)

    > Both managed by Invertase with latest notification features. Notifee is needed to change Foreground notifications to local ones. Expo-notifications, alternative to both, is also an option but only with native tokens, because using ExpoPushTokens is a strong lock-in, not easily reverted.

- **Forms**

  - [React Hook Form](https://github.com/react-hook-form/react-hook-form) + [Zod](https://github.com/colinhacks/zod)

    > RHF offers many more utilities (and less bugs) than Formik, e.g. to name one, with `setFocus(fieldName)` one does not have to setup own refs for inputs. Zod for validation is typescript first and type inference is very reliable and useful.

- **Bottom Sheets and Modals**

  - [React Native Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet)

    > Reliable all-in-one solution with good Keyboard Handling options

- **Swiping content**

  - [React Native Pager View](https://github.com/callstack/react-native-pager-view)

    > From Callstack, actively maintained and already supporting the new Architecture, uses native components.

- **In-App Purchases**

  - [React Native Purchases](https://github.com/RevenueCat/react-native-purchases)

    > Ready-to-go solution from RevenueCat, used on Arnold and Showdown projects.

## Adding new `ENV` variables:

**Format**:

- All variables must use the `EXPO_PUBLIC` prefix! e.g., `EXPO_PUBLIC_API_URL`

**Github**:

- There are two options for adding/managing env credentials:

1. **Variables by a specific env**:

> Settings -> Environments -> Select/add Env (dev, staging, production) -> Add a new variable

2. **Shared variables**:

> Settings -> Secrets and Variables -> Actions -> Select Variables tab -> New repository variable

```

```
