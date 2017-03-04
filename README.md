# Complt

> A GTD SPA Made With React, Redux, PouchDB and CouchDB


[![build status](https://gitlab.com/mitchellhamilton/Complt/badges/master/build.svg)](https://gitlab.com/mitchellhamilton/Complt/commits/master)
[![codecov](https://codecov.io/gl/mitchellhamilton/Complt/branch/master/graph/badge.svg?token=jYe8LvuGPu)](https://codecov.io/gl/mitchellhamilton/Complt)
[![Airbnb JavaScript Style Guide](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

[app.complt.xyz](https://app.complt.xyz/)

The canonical source for this project is on [GitLab](https://gitlab.com/mitchellhamilton/Complt) but it is also mirrored to [GitHub](https://github.com/mitchellhamilton/Complt)

The front-end of this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) but then ejected. The front-end uses [Redux](http://redux.js.org/) along with PouchDB to store user data locally

The client communicates to [Cloudant Envoy](https://github.com/cloudant-labs/envoy), a CouchDB replication target which makes it look to clients as if they have their own database but stores the data in one CouchDB database.

The front-end is written in ES6, transpiled using [babel](https://babeljs.io/), bundled using [Webpack](https://webpack.github.io/) and follows [Airbnb's JavaScript style guide](https://github.com/airbnb/javascript) with a few small exceptions.

The app is tested and deployed using [GitLab CI](https://about.gitlab.com/gitlab-ci/). On all branches the unit tests are run with [Jest](https://facebook.github.io/jest/), the e2e tests are run with [WebdriverIO](http://webdriver.io) on [Sauce Labs](https://saucelabs.com), the coverage is uploaded to [Codecov](https://codecov.io/) and the code is linted with [ESLint](http://eslint.org/). On master, the front-end is also deployed to a [staging environment](https://staging.app.complt.xyz/) after the tests and linting pass, the front-end can also be deployed to [production](https://app.complt.xyz/) by starting the job manually.

## npm scripts

* ```npm start``` starts the development server
* ```npm run build``` packages the front-end, ready for deployment
* ```npm test``` runs the jest tests once
* ```npm run test:watch``` watches for changes to files and runs affected tests
* ```npm run deploy:web:staging``` deploys the front-end to the [staging environment](https://staging.app.complt.xyz/), this requires the ```NETLIFY_TOKEN``` environment variable to be set with a valid [Netlify](https://www.netlify.com/) Personal Access Token and should **not** be run locally
* ```npm run deploy:web:prod``` deploys the front-end to the [production environment](https://app.complt.xyz/), this requires the ```NETLIFY_TOKEN``` environment variable to be set with a valid [Netlify](https://www.netlify.com/) Personal Access Token and should **not** be run locally
* ```npm run coverage``` runs the tests once and generates a coverage report
* ```npm run codecov``` runs the tests once, generates a coverage report and uploads the report to [Codecov](https://codecov.io/), this should **not** be run locally
