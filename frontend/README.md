 # Omigost

![Omigost logo](https://raw.githubusercontent.com/Omigost/Omigost/master/frontend/src/assets/img/omigost_logo.svg)

# About

This is project that provides user interface and client-side code for Omigost.

## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)

## Usage
**Development**

`yarn run start-dev`

* Build app continuously (HMR enabled)
* App served @ `http://localhost:8080`

**Production**

`yarn run start-prod`

* Build app once (HMR disabled)
* App served @ `http://localhost:3000`

---

**All commands**

Command | Description
--- | ---
`yarn run start-dev` | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`
`yarn run start-prod` | Build app once (HMR disabled) and serve @ `http://localhost:3000`
`yarn run build` | Build production-ready app to `/dist/` run tests and generate documentation in `/docs/`
`yarn run test` | Run tests
`yarn run lint` | Run Typescript linter
`yarn run start` | (alias of `yarn run start-dev`)