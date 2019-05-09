# Omigost Project Backend

![Omigost logo](https://raw.githubusercontent.com/Omigost/Omigost/master/frontend/src/assets/img/omigost_logo.svg)

## About

This project provides backend services for Omigost platform.

## Running locally

You must have running Docker deamon to run local instance of Omigost.
Local setup (Spring `dev` profile) uses Testcontainers to setup all required dependencies so only one thing you must do is to run the following command:
```bash
    $ ./gradlew startBackend
```

This command runs backend under `http://localhost:8080/`

## Building jar

To build executable jar you must execute the following command:
```bash
    $ ./gradlew bootJar
```
The jar will be created in `build/libs/` directory.
Note that running this command directly is never required.
The jar itself should be created on CI via `./gradlew buildDockerImages` (see deployment/README.md for further details)

## Support for IntelliJ

To start development process in IntelliJ please run the following command:
```bash
./gradlew idea
```
and open existing project *'server.ipr'*.

## Setup

Configuration is available in `src/main/resources/application.properties` file.

### Admin name

To be able to receive notifications about budget requests you need to:
- use frontend to set up an admin user alongside other users,
- create communications for that user there,
- adjust `application.properties` `omigost.administratorUsername` property to reflect that user's name.

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
