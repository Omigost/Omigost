# Omigost Project Frontend

![Omigost logo](https://raw.githubusercontent.com/Omigost/Omigost/master/frontend/src/assets/img/omigost_logo.svg)

# About

This project provides frontend interface for Omigost platform.

## Development mode

To run the server with hot-reload and other features please run the following command:
```bash
    $ ./gradlew startFrontend
```
This command will launch the server on `http://localhost:8080/`

## Code style and static type validation

To run linter and check types please execute the following command:
```bash
    $ yarn run lint
```

You can launch linter in auto-fixing mode:
```bash
    $ yarn run lint-fix
```

## Storybook

To launch storybook please execute:
```bash
    $ yarn run storybook
```

## Testing

to launch Jest test please call:
```bash
    $ yarn run test
```