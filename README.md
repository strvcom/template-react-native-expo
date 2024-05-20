# React Native Expo Template

This template bootstraps Expo Managed Workflow focused not only on solid project setup but also important app defaults such as Forced and OTA update functionality.

> To start using it, create a .env file with `APP_ENV=dev`.
> Also to use EAS, install `eas-cli` globally (`yarn global add eas-cli`).

**Major dependencies:**

- Expo SDK 51
- React Native 0.74.1
- React 18.2.0

**Table of Contents**

- [React Native Expo Template](#react-native-expo-template)
  - [Important Defaults - SETUP](#important-defaults---setup)
    - [Expo Managed Workflow](#expo-managed-workflow)
    - [Native Folders](#native-folders)
    - [EAS Build Setup](#eas-build-setup)
    - [App Environments Setup](#app-environments-setup)
    - [Babel Plugins](#babel-plugins)
    - [Debugging - Expo Dev Plugins](#debugging---expo-dev-plugins)
    - [Linting Tools](#linting-tools)
    - [Github Actions](#github-actions)
  - [Important Defaults - APP](#important-defaults---app)
    - [React Navigation](#react-navigation)
    - [Global State and User Persistance](#global-state-and-user-persistance)
    - [Over-the-Air Updates](#over-the-air-updates)
    - [Forced Update aka Minimum Version Check](#forced-update-aka-minimum-version-check)
    - [Offline Check](#offline-check)
    - [Maximum Font Scaling](#maximum-font-scaling)
    - [Size Scaling](#size-scaling)
  - [Other Recommended Solutions](#other-recommended-solutions)

## Important Defaults - SETUP

### Expo Managed Workflow

- The main benefit is better maintainability as most of the native setup is done through `app.config.ts` and community/custom config plugins. Updating Expo SDK mostly assures compatibility with majority of dependencies used, which is a common source of problem when upgrading React Native separately - though [rnx-kit/dep-check](https://microsoft.github.io/rnx-kit/docs/tools/dep-check) can be now used.

### Native Folders

- Once you create a development build, in practice iOS and Android folders with native code are not needed anymore and you could delete them, but you would have to delete them after each new local build. For convenience, they are moved to `.gitignore`.
- It is good to remove them **temporarily** from .gitignore when setting up a config plugin and you need to see the native code git changes.
- Also when you need to regenerate the native code because your build is somehow cached, you may remove the folders and run a fresh build, or run `yarn expo prebuild --clean`.

### EAS Build Setup

- EAS helps with building and app submission. It can create and store all important credentials so that we don't have to distribute them among everyone.
- Free tier has only 30 builds per months so we might need the client to order `production` tier for $99 per month.
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

Flipper was removed from React Native, therefore Expo dev plugins are started to fill the gap since SDK 50. All plugins are listed in this [repository](https://github.com/expo/dev-plugins?tab=readme-ov-file#awesome-plugins)

Dev plugins included in the template:

- [React Navigation](https://docs.expo.dev/debugging/devtools-plugins/#react-navigation) - to see navigation state, history, and params passed to screens
- [MMKV](https://github.com/expo/dev-plugins/blob/main/apps/example/src/app/react-native-mmkv/index.tsx) - to see MMKV store

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

1.  **EAS Update (over-the-air)**
    - env values are [prepended](https://docs.expo.dev/eas-update/environment-variables/#setting-and-getting-environment-variables-when-publishing) to the `eas update` command
2.  **EAS Build**
    - ideally would run tests before submitting an app and have build cache logic

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

`Zustand` is used for global state as it is simple and does not need an extra provider. The state can be used through a `useRootStore` hook within React render cycle or outside of it with its `useRootStore.getState()` store method.

User persistance is setup through `MMKV` which is a **synchronized** and **faster** alternative to `AsyncStorage`. MMKV Storage is provided to Zustand `useRootStore` and `partialize` method defines what data from Zustand store should be persisted (e.g. `accessToken`). Meaning upon user login we just need to update the Zustand store and the persistance is handled for us - no need to persist the user in MMKV separately. The store is divided by slices to distinguish features.

### Over-the-Air Updates

`expo-updates` is used to deliver and check for new updates. `useOTAUpdates()` checks if the update is available on mount and whenever the app goes from background to foreground via `useOnForeground()` hook. If an update is available, we should show to the user screen/modal/alert that would suggest them to update (reload the app).

> ⚠️ The OTA updates are used for patches to javascript layer only which is convenient for small bug fixes and UI changes.

To deliver the update through `eas update` we need to target the right `channel` from `eas.json` and manage `runtimeVersion` in `app.config.ts` for **native layer compatibility** otherwise we risk updating incompatible environment resulting in app crashes.

> ⚠️ runtimeVersion should be changed whenever we change native layer, meaning a new native third party dependency is installed in package.json or we do native config changes in app.config.ts.

> ❓ A versioning strategy could be to bump minor version for every native change and bump patch version for every javascript change. Then `runtimeVersion` would change from `0.1.0` to `0.2.0`, while `version` could change as follows: `0.1.0` > `0.1.x` > `0.2.0`. This means `runtimeVersion` `0.1.0` is compatible with all `versions` `0.1.x`.

> ⚠️ if we run `eas update` locally, current `.env` file is used, so be careful not to publish to production development variables. Better to do it through a github action and setup environment variables as Github Secrets.

### Forced Update aka Minimum Version Check

**Before going to production** we should have a forced update functionality in place for cases such as when we introduce a major bug or our backend API is not backward compatible. `useStoreUpdate('forced' | 'suggested')` hook compares `minimumSupportedVersion` with `installedAppVersion` from `app.config.ts`. The minimum version should come either from our backend API or third party service such as `Firebase Remote Config` (good experience). If the app is outdated we should show to the user screen/modal/alert that would suggest them to update (redirect to store listing).

We can also set `suggested` version to signal users that there is a new version available (e.g. in profile)

### Offline Check

`useNetInfo()` provides information about current user's network connectivity. In case of `isConnected` returns false, we can provide a helpful hint (`<OfflineMessage/>` or full screen) to the user that they are disconnected from the internet so that they don't expect full app functionality. Also provide button to either `fetch()` the latest connection info or `reload` the app should they get stuck.

> True is the listener is not fully [reliable](https://github.com/react-native-netinfo/react-native-netinfo/issues/481) and I see on my Pixel that I am not connected when changing from background to foreground even though I am

### Maximum Font Scaling

React Native allows as default to scale the font significantly which will break the UI of the app. You should expect users to have font scaling up if your target group includes older generation. To allow some level of accessibility but prevent users from breaking the app UI, default scaling of maximum +25% is applied. You can increase it but be sure to control important parts of the application individually to keep UX in place.

### Size Scaling

To replicate Figma design consistently on majority of mobile screen sizes, we should apply size scaling to UI elements relative to actual device window width/height. This technique is not perfect and implements a subjective scaling factor, but prevents well having too small elements on larger screens. Inspiration: [article + library](https://github.com/nirsky/react-native-size-matters/blob/master/examples/BlogPost/README.md)

## Other Recommended Solutions

- **Styling**

  - [Restyle](https://github.com/Shopify/restyle) or [Styled Components](https://github.com/styled-components/styled-components)

    > Restyle follows a defined theme with strict type safety resulting in consistent and quickly built UI. It is very helpeful when a designer defines majority of text variants which can be plugged into the theme and reused super easily. It has also responsive utilities that can make potential transition to a tablet app easier. Styled components or its variations are known to Web colleagues, so the familiarity may help in transition to React Native.

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
