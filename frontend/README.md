# Omigost Project (Interface)

This project is still in heavy development phase.
Please note that the problems with Grommet dependency may occur.

### Preinstallation requirements

* **Node.js** at least 7.10.0
* **npm** at least 4.2.0

Please not that all the following commands should be correctly executed in your terminal:
```bash
    $ node -v
    $ npm -v
```

### Installation of dependencies

Please enter the cloned repo root directory and 
execute the following command in your terminal:
```bash
    $ npm install
```

### Development/production configuration

Please look into `./buildConfig.ini`
The file should look like a bit like this (some fields may be altered):

```ini
    [prod]
    $DEBUG=true
    $SENTRY=false
    $SENTRY_DSN=''
    $DEPLOY_URL=http://localhost
    $ROUTER_BASE=''
    $API_BASE=''
    $OUT_PATH=public

    [dev]
    $DEBUG=true
    $SENTRY=false
    $SENTRY_DSN=''
    $DEPLOY_URL=http://localhost
    $ROUTER_BASE=''
    $API_BASE=''
    $OUT_PATH=public
```

 
Firstly note that there are two kinds of evironment (production and development).
Development settings are used when you run the application locally and production is used...
obviously on production servers!
 
Then please take a look at ..._BASE settings.
Each of them stores root url path for the application component.
This settings are used e.g. when you deploy your application to subfolder/subroute
on your hosting (https://www.server.com/a/b/c/)
then you should change the settings to:

```js
'prod': {
    /* ... */
    "$ROUTER_BASE": "'/a/b/c/plinml2018'",
    "$API_BASE":    "'/a/b/c/plinml2018'",
    /* ... */
},
```

All of these properties are accessible from the level of Javascript.
You need to reference the variables directly:
```js
console.log($API_BASE);
```

For variables you are willing to hide inside environmental variables please do the following:
* Edit bin/configLoader.js and add entries to ENV_VARIABLES_MAPPING
* Add the values to buildConfig.ini

For eaxmple:

```js
ENV_VARIABLES_MAPPING = {
    '$DB_PASSWORD':   '$DB_PASSWORD_ENV_NAME'
};
```

Then inside buildConfig.ini:
```ini
   [prod]
   $DB_PASSWORD_ENV_NAME=MY_PASSWORD
```

Then during compile-time setup the env variable called 'MY_PASSWORD' will be saved into variable '$DB_PASSWORD' which you can access from the level of the code:
```js
  console.log($DB_PASSWORD);
```

The variables can be also accessed using config loader:
```js
  const prodConfig = (require('./bin/configLoader.js')).loadBuildConfig('prod');
  console.log(prodConfig['$DB_PASSWORD']);
```


## Development

The application contains live-reload development server to
make the life a bit easier.

Firstly run the following command to start development server:
```bash
    $ npm run dev
```

You can also build the application without launching development server:
```bash
    $ npm run build:dev
```

## Release the production! 

Firstly ensure the development server (see `npm run dev` command) is down
as it may affect the production build.

To build your application with production settings please use:
```bash
    $ npm run build:prod
```