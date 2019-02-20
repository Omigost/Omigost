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
