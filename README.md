No longer being maintained. See https://github.com/hotosm/oam-api.

<h1 align="center">Token Manager</h1>

<div align="center">
  <h3>
  <a href="https://docs.openaerialmap.org/ecosystem/getting-started/">Ecosystem</a>
  <span> | </span>
  <a href="https://github.com/hotosm/oam-uploader-api">Uploader API</a>
  <span> | </span>
  <a href="https://github.com/hotosm/oam-uploader">Uploader Interface</a>
  </h3>
</div>

The Token Manager allows maintainers to issue authorization tokens used in the [Uploader Form](https://github.com/hotosm/oam-uploader). This web application requires the [Uploader API](https://github.com/hotosm/oam-uploader-api) to be running. Before proceeding, we suggest you read the ecosystem docs.


## Installation and Usage

The steps below will walk you through setting up your own instance of the oam-uploader-admin.

### Install Project Dependencies
To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) v4 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))

### Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:

```
nvm install
```

Install Node modules:

```
npm install
```

### Usage

#### Config files
All the config files can be found in `app/assets/scripts/config`.
After installing the projects there will be 3 main files:
  - `local.js` - Used only for local development. On production this file should not exist or be empty.
  - `staging.js`
  - `production.js`

The `production.js` file serves as base and the other 2 will override it as needed:
  - `staging.js` will be loaded whenever the env variable `DS_ENV` is set to staging.
  - `local.js` will be loaded if it exists.

The following options must be set: (The used file will depend on the context)
  - `OAMUploaderApi` - The address of the [Uploader Api](https://github.com/hotosm/oam-uploader-api).

Example:
``` 
module.exports = {
  OAMUploaderApi: 'http://localhost:4000'
};
``` 

#### Starting the app

```
npm run serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

# Deployment
To prepare the app for deployment run:

```
npm run build
```
This will package the app and place all the contents in the `dist` directory.
The app can then be run by any web server.

# License
Oam Uploader Admin is licensed under **BSD 3-Clause License**, see the [LICENSE](LICENSE) file for more details.
