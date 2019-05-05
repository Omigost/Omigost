# Omigost Project Backend

Build with:
```bash
./gradlew bootJar
```

To develop in IntelliJ:
```bash
./gradlew idea
```
and open existing project *'server.ipr'*.

## Setup

Configuration is available in `src/main/resources/application.properties` file.

## Running

```bash
docker-compose up -d
docker build -t omigost .
docker run --network="host" omigost
```

# Slack Bot setup

To be able to use Slack communication, first you need to enter https://api.slack.com/apps/
where you should create a new bot app in your Slack environment.

Then give it the following permissions:
- `chat:write:bot` (so we can chat with Slack users)
- `users:read` (so we can access users by their usernames)
- `bot` (so we can create a new bot in Slack)
- `im:write` (so we can create a new conversation with a user)

Then paste the OAuth Access Token to your `application.properties` file
under slack.oauth.bot.token.

