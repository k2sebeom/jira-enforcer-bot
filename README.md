# jira-enforcer

> A GitHub App built with [Probot](https://github.com/probot/probot) that A Probot app

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
$ docker build -t jira-enforcer .

# 2. Start container
$ docker run -d \
        -e APP_ID=<APP_ID> \
        -e WEBHOOK_SECRET=<WEBHOOK_SERCRET> \
        -e LOG_LEVEL=info \
        -e PORT=3000 \
        --name jira-bot \
        -p 8080:3000 \
        jira-enforcer
```

## Contributing

If you have suggestions for how jira-enforcer could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 SeBeom Lee <moses97@gmail.com>
