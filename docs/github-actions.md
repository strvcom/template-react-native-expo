# Github Actions

> ❓ We have found github actions to be the best way to trigger the builds. It does not require any git knowledge to i.e push a tag so almost anyone
> with access can do it. We have created workflows that should work for almost any possible scenario.

### Development Build:

**Description**:

- Development are used for local development and testing on Simulator. This is the fastest way to iterate on the app.
- Development build should be created every time there is a change affecting Native code or when a new feature is added.

_- note: if you want to test the app on a real device, and your device is not registered in EAS, you can do it by running `npx eas device:create `_

**Steps**:

- Workflow: `Create dev build`
- Build type: `dev`(real device) | `dev-sim`(simulator)
- Platform: `all` | `ios` | `android`

### Staging Release:

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

### Build number:

Build number is stored in GitHub variables as `BUILD_NUMBER`. If it's not present, it creates a new one with version 1.
