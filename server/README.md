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
