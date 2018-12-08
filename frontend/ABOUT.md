<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

# Omigost

![media://omigost_logo.svg](media://omigost_logo.svg)

## See latest reports

<div class="ReportsButton">
    <a href="./report.html">
        <i class="fas fa-vial"></i>
        <span> Coverage </span>
    </a>
</div>

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