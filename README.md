# React Native Expo Template

This template bootstraps Expo Managed Workflow focused not only on solid project setup but also important app defaults such as Forced and OTA update functionality.

**Major dependencies:**

- Expo SDK 45
- React Native 0.68.2
- React 17.0.2

**Table of Contents**

- [React Native Expo Template](#react-native-expo-template)
  - [Important Defaults - SETUP](#important-defaults---setup)
    - [Expo Managed Workflow](#expo-managed-workflow)
    - [EAS Build Setup](#eas-build-setup)
    - [App Environments Setup](#app-environments-setup)
    - [Babel Plugins](#babel-plugins)
    - [Debugging - Flipper](#debugging---flipper)
    - [Linting Tools](#linting-tools)
    - [Github Actions](#github-actions)
  - [Important Defaults - APP](#important-defaults---app)
    - [React Navigation](#react-navigation)
    - [Global State and User Persistance](#global-state-and-user-persistance)
    - [Over-the-Air Updates](#over-the-air-updates)
    - [Forced Update aka Minimum Version Check](#forced-update-aka-minimum-version-check)
    - [Offline Check](#offline-check)
    - [Maximum Font Scaling](#maximum-font-scaling)

## Important Defaults - SETUP

### Expo Managed Workflow

- The main benefit is better maintainability as most of the native setup is done through `app.config.ts` and community/custom config plugins. Updating Expo SDK mostly assures compatibility with majority of dependencies used, which is a common source of problem when upgrading React Native separately - though [rnx-kit/dep-check](https://microsoft.github.io/rnx-kit/docs/tools/dep-check) can be now used.

### EAS Build Setup

- EAS helps with building and app submission. It can create and store all important credentials so that we don't have to distribute them among everyone.
- Free tier has only 30 builds per months so we might need the client to order `production` tier for $99 per month.
- Default build profiles in `eas.json`:
  - `dev` - this profile will build an `expo-dev-client`, meaning that after installing the app, one can change non-native code and see changes reflected in the app
  - `staging` - should be distributed for testing, does not have a dev client, meaning it cannot be manipulated. It builds `com.xxx.xxx.staging` application which can be distributed through a link or a QR code.

> For iOS, we need to add devices for EAS testing (development, staging) via `eas device:create` (creates sharable registration link) and confirm the device has been added. It is good to write down your unique device ID to understand what is your device.

- `production` - non-distributable build that should be submitted to Play Store and App Store. Can be tested through Play Store internal testing track or Testflight. It builds the official `com.xxx.xxx` package later released to production.

### App Environments Setup

- Environment variables are managed by `react-native-dotenv` importable from `@env` module. `APP_ENV` variable defines what environment we are running.
  > src/types/types.ts > `export type Environment = 'dev' | 'staging' | 'production'`
- `app.config.ts` determines based on the environment a relevant **icon, app name and appIdentifier** to distinguish individual apps and allow installing side by side
- `eas.json` can set `APP_ENV` variable for each build profile to define environment

### Babel Plugins

- `babel-plugin-module-resolver` for absolute imports
- `react-native-dotenv` for .env
- `babel-plugin-transform-remove-console` to remove console logs in production
- `react-native-reanimated/plugin` to support Reanimated 2

### Debugging - Flipper

Flipper is a default React Native debugging tool that monitors crashes, console, network and more. It is easily extensible with plugins. Expo does not include it, therefore to enable it, you need `expo-community-flipper` config plugin.

Flipper plugins included in the template:

- [React Navigation](https://reactnavigation.org/docs/devtools/) - to see navigation state, history, and params passed to screens
- [Zustand](https://github.com/cmdominguez/react-native-flipper-zustand) - to see Zustand store (TODO: await support for Zustand v4 [typescript support](https://github.com/cmdominguez/react-native-flipper-zustand/issues/3))
- [MMKV](https://github.com/muchobien/flipper-plugin-react-native-mmkv) - to see MMKV store

Not included but useful:

- [AsyncStorage](https://github.com/lbaldy/flipper-plugin-async-storage-advanced)
- [React Query](https://github.com/bgaleotti/react-query-native-devtools)

### Linting Tools

Typical STRV stack. Quite a few rules overrides in Eslint config.

- Eslint
- Prettier
- Husky
- Lint Staged

### Github Actions

Requires `Expo Access Token` set as Github secret to connect to EAS.

1.  **Expo Publish (over-the-air)**
    - env file is created with copying `.env.ci` file as `.env` and replacing dummy values with actual secrets from Github secrets
2.  **EAS Build**

    - ideally would run tests before building and have build cache logic

## Important Defaults - APP

### React Navigation

Ideally we keep number of stacks to minimum so that our `RootStack` contains majority of our screens. We can utilize [Group](https://reactnavigation.org/docs/group/) to apply common screen options and use conditional auth rendering to distinguish public and protected screen. `BottomStack` should be nested in the `RootStack` but screens within BottomStack that don't require bottom tabs should stay on the `RootStack` level - see `src/screens/NestedScreen.tsx`.

This flat screen structure allows us to type `useNavigation` hook and `navigationRef` with this [snippet](https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc)

```
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

### Global State and User Persistance

`Zustand` is used for global state as it is simple and does not need an extra provider. The state can be used through a `useAuthStore` hook within React render cycle or outside of it with its `useAuthStore.getState()` store method.

User persistance is setup through `MMKV` which is a **synchronized** and **faster** alternative to `AsyncStorage`. MMKV Storage is provided to Zustand `useAuthStore` and `partialize` method defines what data from Zustand store should be persisted (e.g. `accessToken`). Meaning upon user login we just need to update the Zustand store and the persistance is handled for us - no need to persist the user in MMKV separately.

### Over-the-Air Updates

`expo-updates` is used to deliver and check for new updates. `useOTAUpdates()` checks if the update is available on mount and whenever the app goes from background to foreground via `useOnForeground()` hook. If an update is available, we should show to the user screen/modal/alert that would suggest them to update (reload the app).

> ⚠️ The OTA updates are used for patches to javascript layer only which is convenient for small bug fixes and UI changes.

To deliver the update through `expo publish` we need to target the right `release channel` from `eas.json` and manage `runtimeVersion` in `app.config.ts` for **native layer compatibility** otherwise we risk updating incompatible environment resulting in app crashes.

> ⚠️ runtimeVersion should be changed whenever we change native layer, meaning a new third party dependency is installed in package.json or we do native config changes in app.config.ts.

> ❓ A versioning strategy could be to bump minor version for every native change and bump patch version for every javascript change. Then `runtimeVersion` would change from `0.1.0` to `0.2.0`, while `version` could change as follows: `0.1.0` > `0.1.x` > `0.2.0`. This means `runtimeVersion` `0.1.0` is compatible with all `versions` `0.1.x`.

> ⚠️ if we run `expo publish` locally, current `.env` file is used, so be careful not to publish to production development variables. Better to do it through a github action.

### Forced Update aka Minimum Version Check

**Before going to production** we should have a forced update functionality in place for cases such as when we introduce a major bug or our backend API is not backward compatible. `useForcedUpdate()` hook compares `minimumSupportedVersion` with `installedAppVersion` from `app.config.ts`. The minimum version should come either from our backend API or third party service such as `Firebase Remote Config` (good experience). If the app is outdated we should show to the user screen/modal/alert that would suggest them to update (redirect to store listing).

### Offline Check

`useNetInfo()` provides information about current user's network connectivity. In case of `isConnected` returns false, we can provide a helpful hint (`<OfflineMessage/>` or full screen) to the user that they are disconnected from the internet so that they don't expect full app functionality. Also provide button to either `fetch()` the latest connection info or `reload` the app should they get stuck.

> True is the listener is not fully [reliable](https://github.com/react-native-netinfo/react-native-netinfo/issues/481) and I see on my Pixel that I am not connected when changing from background to foreground even though I am

### Maximum Font Scaling

React Native allows as default to scale the font significantly which will break the UI of the app. You should expect users to have font scaling up if your target group includes older generation. To allow some level of accessibility but prevent users from breaking the app UI, default scaling of maximum +25% is applied. You can increase it but be sure to control important parts of the application individually to keep UX in place.
