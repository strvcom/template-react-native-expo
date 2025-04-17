# GitHub Setup Instructions

## Expo Access Token

1. Create a new token in the Expo dashboard.
2. Add the token to the GitHub secrets as `EXPO_TOKEN`.

## GitHub Workflow Permissions

1. Go to `Settings` > `Actions` > `General` > `Workflow permissions`.
2. Check `Read and write permissions`.

## GitHub Personal Access Token

1. Navigate to your GitHub profile > `Settings` > `Developer settings` > `Personal access tokens` > `Fine-grained tokens`.
2. Click on `Generate a new token`.
3. Set the permissions as shown in the table below.
4. Add the token to the GitHub secrets as `GT_PAT`.

#### Required Permissions Table

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

## Github Deploy Key

This is necessary for release builds to allow Github Actions to bypass branch protection rules to push the changelog and updated version directly to main.

1. generate a new SSH key pair on your machine:

```bash
ssh-keygen -t rsa -b 4096 -C "example@email.com"
```

- Follow the steps and save the key pair in the `~/.ssh` directory.
- Be sure not to set a passcode on your key otherwise it will not work.
- This will generate two files: `id_rsa` (private key) and `id_rsa.pub` (public key).

1. Add the public key to the repository settings:

- Go to the repository settings > Deploy keys > Add deploy key
- Paste the public key
- Check the `Allow write access` option

2. Add the private key to the Github secrets:

- Go to the repository settings > Secrets > Actions > New repository secret
- Name the secret `SSH_PRIVATE_KEY` and paste the private key
- Be sure to paste the entire content of the file, starting with `-----BEGIN OPENSSH PRIVATE KEY-----` and ending with `-----END OPENSSH PRIVATE KEY-----`

Then when you create rule sets in the branch protection rules, you select the `Deploy keys` option to allow release build action to bypass them and push changelog and updated version directly to main.
