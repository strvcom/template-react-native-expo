### JIRA Integration

- To track the progress of the project on the Jira board, follow the steps below:

1. Connect the Jira project with the GitHub repository via the `GitHub for Jira` App.
2. Go to `Settings` -> `Features`, scroll to the `Operation` section, and turn on the `Deployments` feature.

To track progress such as `Builds`, `Releases`, and `Commits`, both branch name and pull request title need to include the Jira ticket number in their titles:

Branch name example: `feat/ABC-1234-add-new-feature`
PR title example: `feat(ABC-1234): add new feature`

It is recommended to use the `Squash and merge` option for pull requests. This format is supported by the `release-it` Changelog plugin.
