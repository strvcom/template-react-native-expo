# EAS Build Setup

> ❓ EAS helps with building and app submission. It can create and store all important credentials so that we don't have to distribute them among everyone.

## eas.json config

- Default build profiles in `eas.json`:
  - `dev` - this profile will build an `expo-dev-client`, meaning that after installing the app, one can change non-native code and see changes reflected in the app
  - `staging` - should be distributed for testing, does not have a dev client, meaning it cannot be manipulated. It builds `com.xxx.xxx.staging` application which can be distributed through a link or a QR code.

> For iOS, we need to add devices for EAS testing (development, staging) via `eas device:create` (creates sharable registration link) and confirm the device has been added. It is good to write down your unique device ID to understand what is your device.

- `production` - non-distributable build that should be submitted to Play Store and App Store. Can be tested through Play Store internal testing track or Testflight. It builds the official `com.xxx.xxx` package later released to production.

### EAS account config

- Setup your project with your EAS account by running:
  ```
  npx eas init
  ```

### Credentials

- Set up` App Store Connect API Keys` for `staging` and `production` by running:
  ```
  npx eas credentials -p ios
  ```

### Before first build

To allow the GitHub Action to conduct builds, you must build the app for the first time using the `EAS` CLI. This will create the necessary credentials and allow the GitHub Action to access them.

Run the following commands:

```
npx eas build --platform ios --profile dev-sim
npx eas build --platform ios --profile dev
npx eas build --platform ios --profile staging --auto-submit
npx eas build --platform ios --profile production --auto-submit
```

### OTA updates setup

- Add the Expo URL to the `expoConfig` in` app.config.ts`.

```
 updates: {
    fallbackToCacheTimeout,
    url: 'https://u.expo.dev/project-id',
  },
```

- Before conducting over-the-air updates, validate that the channels are setup against correct branch (environment).

```
 npx eas channel:list
```

- if not, you can change it by running

```
 npx eas channel:edit
```
