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

### Admin name

To be able to receive notifications about budget requests you need to:
- use frontend to set up an admin user alongside other users,
- create communications for that user there,
- adjust `application.properties` `omigost.administratorUsername` property to reflect that user's name.

## Running

```bash
docker-compose up -d
docker build -t omigost .
docker run --network="host" omigost
```
