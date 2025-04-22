Template github actions support several notification types to Slack to notify the team about the build status.
But there is some additional setup both in Slack and on EAS to make this work.

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

**Dev build notifications**

- the dev distribution builds are triggered by the `Create dev build` workflow
- To distribute the dev builds to among the team members, choose one of the options and follow the steps below:

### SLACK APP

- Create a new Slack App on https://api.slack.com/apps
- Select `Incoming Webhooks` and turn it on
- Wait for the approval
- Add `New Webhook to Workspace` and select the channel
- copy the` Webhook URL`

### CLOUDFLARE WORKERS

This is necessary to include the QR code to download the app in the notification message.

- Go to https://www.cloudflare.com/
- Create a new Cloudflare Worker
- Copy the worker functionality from the [worker.js](docs/cloudflare-worker.txt)
- replace `SLACK_WEBHOOK_URL` variable with yours
- deploy the worker

### EAS SETUP

- create a new webhook via EAS CLI and the worker url `https//your-worker.account-name.workers.dev`

```
eas webhook:create
```
