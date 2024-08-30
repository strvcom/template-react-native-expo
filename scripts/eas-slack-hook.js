const fetch = require('node-fetch')

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/**/**'

async function sendSlackRequest({ text, blocks }) {
  const response = await fetch(SLACK_WEBHOOK_URL, {
    body: JSON.stringify({ text, blocks }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to send Slack message: ${response.statusText}`)
  }
}

function handleExpoStatus(build) {
  const text = `Build ${build.id} for ${build.metadata.buildProfile} completed.`
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Build ${build.id}* for *${build.metadata.buildProfile}* completed.`,
      },
    },
  ]

  return { text, blocks }
}

async function main() {
  console.log('--------------------Environment--------------------')
  console.log(JSON.stringify(process.env))
  console.log('--------------------Environment--------------------')
  const build = JSON.parse(process.env.EAS_BUILD)

  if (!['dev', 'dev-sim'].includes(build.metadata.buildProfile)) {
    console.log('Not a dev or dev-sim build')
    return
  }

  const slackPayload = handleExpoStatus(build)
  await sendSlackRequest(slackPayload)
  console.log('Slack message sent')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
