## API DataSource

[![CircleCI](https://circleci.com/gh/lapnap/grafana-tail-datasource/tree/master.svg?style=svg)](https://circleci.com/gh/lapnap/grafana-tail-datasource/tree/master)
[![dependencies Status](https://david-dm.org/lapnap/grafana-tail-datasource/status.svg)](https://david-dm.org/lapnap/grafana-tail-datasource)
[![devDependencies Status](https://david-dm.org/lapnap/grafana-tail-datasource/dev-status.svg)](https://david-dm.org/lapnap/grafana-tail-datasource?type=dev)
[![Coverage](https://circleci.com/api/v1.1/project/github/lapnap/grafana-tail-datasource/latest/artifacts/0/home/circleci/repo/coverage/badge-lines.svg)](https://circleci.com/api/v1.1/project/github/lapnap/grafana-tail-datasource/latest/artifacts/0/home/circleci/repo/coverage/lcov-report/index.html)

API datasource

Github

jsonata:

```
data.repository.ref.target.history.nodes.{
    "date":authoredDate,
    "oid":oid,
    "url":commitUrl,
    "author":author.user.login,
    "authorAvatar":author.user.avatarUrl,
    "committer":committer.user.login,
    "committerAvatar":committer.user.avatarUrl,
    "messageHeadline":messageHeadline,
    "messageBody":messageBody,
    "pr":associatedPullRequests.edges[0].node.number,
    "pr_title":associatedPullRequests.edges[0].node.title
}
```

```
{
"fields": [
  {"name":"date", "type":"time" },
  {"name":"oid", "type":"string"},
  {"name":"url", "type":"string"},
  {"name":"author", "type":"string"},
  {"name":"authorAvatar", "type":"string"},
  {"name":"committer", "type":"string"},
  {"name":"committerAvatar", "type":"string"},
  {"name":"messageHeadline", "type":"string"},
  {"name":"messageBody", "type":"string"},
  {"name":"pr", "type":"number"},
  {"name":"pr_title", "type":"string"}
],
"rows":
  data.repository.ref.target.history.nodes.
  [ $toMillis(authoredDate),
    oid,
    commitUrl,
    author.user.login,
    author.user.avatarUrl,
    committer.user.login,
    committer.user.avatarUrl,
    messageHeadline,
    messageBody,
    associatedPullRequests.edges[0].node.number,
    associatedPullRequests.edges[0].node.title
  ],
  "meta": {
    "branch": data.repository.ref.name
  }
}
```

```
query ($owner: String!, $name: String!, $branch: String!) {
  repository(owner: $owner, name: $name) {
    ref(qualifiedName: $branch) {
      name
      target {
        ... on Commit {
          history(first: 5) {
            nodes {
              oid
              commitUrl
              author {
                user {
                  login
                  avatarUrl
                }
              }
              status {
                state
              }
              authoredDate
              messageHeadline
              messageBody
              committer {
                user {
                  login
                  avatarUrl
                }
              }
              associatedPullRequests(first: 3) {
                edges {
                  node {
                    title
                    number
                  }
                }
              }
            }
            totalCount
            pageInfo {
              endCursor
              startCursor
            }
          }
        }
      }
    }
  }
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
}
```

```
{
  "owner": "grafana",
  "name": "grafana",
  "branch": "master"
}
```
