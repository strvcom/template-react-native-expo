### SLACK APP

- Create a new Slack App on https://api.slack.com/apps
- Select `Incoming Webhooks` and turn it on
- Wait for the approval
- Add `New Webhook to Workspace` and select the channel
- copy the` Webhook URL`

### CLOUDFLARE WORKERS

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
