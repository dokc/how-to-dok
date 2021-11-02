# Contributing

First off, thank you for considering contributing to Dok! It's people like you who make the community great.

* **Create an issue**: If you have noticed a bug, want to contribute features, or simply ask a question that for whatever reason you do not want to ask in the [DoK Slack workspace](https://dokcommunity.slack.com/), please [search the issue tracker](https://github.com/dokc/how-to-dok/issues) to see if someone else in the community has already created a ticket. If not, go ahead and [create an issue](https://github.com/dokc/how-to-dok/issues/new/choose).

* **Add yourself**: Add yourself to the [list of contributors](CONTRIBUTORS.md) along with your first pull request.

This document lays out how to get you started in contributing to DoK / How To DoK, so please read on.

### Fork Repositories and work in a branch

* Branch away from the `main` branch and use the following schema for naming your branches:
```
<github-issue-number>/<descriptive-name-with-dashes>

Example:
3/setup-argo-workflows
```

### Commiting code ###

```
git add .
git commit -m "add x" -s
git push
```

### Make a Pull Request

At this point, you should switch back to the `main` branch in your repository, and make sure it is up to date with `main` branch of how-to-dok:

```bash
git remote add upstream git@github.com:dokc/how-to-dok.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of `main` and push it:

```bash
git checkout 3/setup-argo-workflows
git rebase master
git push --set-upstream origin 3/setup-argo-workflows
```

Finally, go to GitHub and create a Pull Request.