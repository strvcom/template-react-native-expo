# React Native Expo Template

This template bootstraps Expo Managed Workflow focused not only on solid project setup but also important app defaults such as Forced and OTA update functionality.

> To start using it, create a .env file with `APP_ENV=dev`. Install pnpm via ``brew install pnpm`, if not yet installed, and run `pnpm install` to install dependencies.
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
    - [Global State and User Persistance](#global-state-and-user-persistance)
    - [Over-the-Air Updates](#over-the-air-updates)
    - [Forced Update aka Minimum Version Check](#forced-update-aka-minimum-version-check)
    - [Offline Check](#offline-check)
    - [Maximum Font Scaling](#maximum-font-scaling)
    - [Size Scaling](#size-scaling)
  - [Other Recommended Solutions](#other-recommended-solutions)
  - [Release Process](#release-process)
    - [Prerequisites](#prerequisites)
    - [Adding new ENV variables](#adding-new-env-variables)
    - [Development Build](#development-build)
    - [Staging Release](#staging-release)
    - [Production Submit](#production-submit)
    - [Release process example](#example-of-_ideal_-scenario)
    - [Hotfix Scenario example](#hotfix-scenario)
    - [JIRA Integration](#jira-integration)
    - [Slack Integration](#slack-integration)
    - [DEV build distribution](#dev-build-distribution)

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

## Release Process

---

### Prerequisites:

### GitHub Setup Instructions

### Expo Access Token

1. Create a new token in the Expo dashboard.
2. Add the token to the GitHub secrets as `EXPO_TOKEN`.

### GitHub Workflow Permissions

1. Go to `Settings` > `Actions` > `Workflow permissions`.
2. Check `Read and write permissions`.

### GitHub Personal Access Token

1. Navigate to your GitHub profile > `Settings` > `Developer settings` > `Personal access tokens` > `Fine-grained tokens`.
2. Click on `Generate a new token`.
3. Select the repository under `STRV's` organization.
4. Set the permissions as shown in the table below.
5. Wait for the approval.
6. Add the token to the GitHub secrets as `GT_PAT`.

## Required Permissions Table

When setting up the Fine-grained Personal Access Token, ensure you select the following permissions:

| Permission      | Access Level   |
| --------------- | -------------- |
| Actions         | Read and write |
| Commit statuses | Read and write |
| Contents        | Read and write |
| Deployments     | Read and write |
| Environments    | Read and write |
| Merge queues    | Read and write |
| Metadata        | Read-only      |
| Pull requests   | Read and write |
| Secrets         | Read and write |
| Variables       | Read and write |
| Webhooks        | Read and write |

### EAS BUILD

### Credentials

- Set up iOS credentials by running:
  ```
  npx eas credentials -p ios
  ```

### Builds and Submission

To allow the GitHub Action to conduct builds, you must build the app for the first time using the `EAS` CLI. This will create the necessary credentials and allow the GitHub Action to access them.

Run the following commands:

```
npx eas build --platform ios --profile dev-sim
npx eas build --platform ios --profile dev
npx eas build --platform ios --profile staging --auto-submit
npx eas build --platform ios --profile production --auto-submit
```

### OTA-UPDATE

- Before conducting over-the-air updates, validate that the channels are setup against correct branch (environment).

```
 npx eas channel:list
```

- if not, you can change it by running

```
 npx eas channel:edit
```

---

### Adding new `ENV` variables:

**Format**:

- All variables must use the `EXPO_PUBLIC` prefix! e.g., `EXPO_PUBLIC_API_URL`

**Github**:

- There are two options for adding/managing env credentials:

1. **Variables by a specific env**:

> Settings -> Environments -> Select/add Env (dev, staging, prod) -> Add a new variable

2. **Shared variables**:

> Settings -> Secrets and Variables -> Actions -> Select Variables tab -> New repository variable

### Development Build:

**Description**:

- Development are used for local development and testing on Simulator. This is the fastest way to iterate on the app.
- Development build should be created everytime there is a change affecting Native code or when a new feature is added.

_- note: if you want to test the app on a real device, and your device is not registered in EAS, you can do it by running `npx eas device:create `_

**Steps**:

- Workflow: `Create dev build`
- Build type: `dev`(real device) | `dev-sim`(simulator)
- Platform: `all` | `ios` | `android`

### Staging Release:

### WARNING

**- Right now, we have not added any logic to allow` GitHub Actions` to bypass` Github's rulesets`. Therefore, the ruleset must be always disabled before running the action to allow workflow to push the changes back to the `main` branch.**

**Description**:

- Staging builds are used for testing new features and bug fixes before they are released to production.
- After the staging build is created, the new release is created with the changelogs and it shared via Testflight or Play Store internal testing track.

**Steps**:

- Workflow: `Create release`
- Deployment environment: `staging`
- Version bump type: `patch` | `minor` | `major` | `none`
- Action type: `build and submit` | `ota update`
- Platform: `all` | `ios` | `android`

### Production Submit:

**Description**:

- After the staging build is tested and approved, we are ready to submit the build to the stores.

**Steps**:

- Workflow: `Production submit` (triggered from the `tag` branch chosen via `Use workflow from` dropdown)
- Platform: `all` | `ios` | `android`

### Example of _ideal_ scenario:

Working on a new feature (v. `1.2.1`)

- **Create dev build** Select `dev` for device build or `dev-sim` for simulator build and `platform`
  - This creates a dev build that serves for local development
- After the feature is finished and merged to `main`, we trigger **Create release** and we select -> `staging` platform, version bump type `minor`, and action type will be `build and submit`
- This creates a new build, submits it for testing, and creates a new release `1.3.0` with `changelogs`
- After QA testing, we are ready for production submission via `Production submit` flow. This will create a new build with the version of the selected `tag` branch and submit it to the stores

### Hotfix Scenario:

- We found a bug in version `1.3.0` - we create a new branch from the `1.3.0` `tag` branch
- Fix the bug and create a **PR**
- Review the **PR** and then we create a `hotfix` by triggering **Hotfix release**, selecting the current Hotfix branch and selecting the `build type` (either OTA or Normal)
- This creates a new tag `1.3.0-hotfix.1` but no release
- Merge the hotfix branch to `main`

### JIRA Integration

- To track the progress of the project on the Jira board, follow the steps below:

1. Connect the Jira project with the GitHub repository via the `GitHub for Jira` App.
2. Go to `Settings` -> `Features`, scroll to the `Operation` section, and turn on the `Deployments` feature.

To track progress such as `Builds`, `Releases`, and `Commits`, both branch name and pull request title need to include the Jira ticket number in their titles:

Branch name example: `feat/ABC-1234-add-new-feature`
PR title example: `feat(ABC-1234): add new feature`

It is recommended to use the `Squash and merge` option for pull requests. This format is supported by the `release-it` Changelog plugin.

### Slack Integration

- **Staging and Production Notifications:**

1.  Open Slack
2.  In the left sidebar, click on `... More` and select `Automations`
3.  Click on `New Workflow`
4.  name it `[App name] [Env] [Release]`
5.  Choose `from a webhook` option
6.  add data variables for `version` - string and `changelog`(optional) - string
7.  add `Messages` step and select the `channel` where you want to send the message
8.  Add the message

Example message:

```
Hey @channel, :rocket:

We’re excited to announce the release of the new EXPO-TEMPLATE app version!

Latest version: {{version}}
Changelog: https://github.com/strvcom/{repository-name}/releases/tag/v{{version}}
```

- you must create workflow for both `staging` and `production` environments

- Copy the `webhook URL` and add it
- for [STAGING](.release-it.json) - `line 34`
- for [PRODUCTION](.github/workflows/production-submit.yml) - `line 64`

`IN PROGRESS`

### DEV BUILD DISTRIBUTION

- the dev distribution builds are triggered by the `Create dev build` workflow
- To distribute the dev builds to among the team members, choose one of the options and follow the steps below:

### SLACK APP

- Create a new Slack App on https://api.slack.com/apps
- Select `Incoming Webhooks` and turn it on
- Wait for the approval
- Add `New Webhook to Workspace` and select the channel
- copy the` Webhook URL`

### CLOUDFLARE WORKERS

- Create a new Cloudflare Worker
- Copy the worker functionality from the [worker.js](docs/cloudflare-worker.txt)
- replace `SLACK_WEBHOOK_URL` variable with yours
- deploy the worker

### EAS SETUP

- create a new webhook via EAS CLI and the worker url `https//your-worker.account-name.workers.dev`

```
eas webhook:create
```
