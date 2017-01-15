# Oak

> A GTD SPA Made With React, Redux, Apollo, GraphQL and Serverless.


[![build status](https://gitlab.com/mitchellhamilton/Oak/badges/master/build.svg)](https://gitlab.com/mitchellhamilton/Oak/commits/master)
[![codecov](https://codecov.io/gl/mitchellhamilton/Oak/branch/master/graph/badge.svg?token=jYe8LvuGPu)](https://codecov.io/gl/mitchellhamilton/Oak)
[![Airbnb JavaScript Style Guide](https://img.shields.io/badge/code%20style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

[oak.mitchellhamilton.me](https://oak.mitchellhamilton.me/)

The front-end of this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) but then ejected. The front-end uses [Redux](http://redux.js.org/) for state managment with [Apollo](http://dev.apollodata.com/react/) for communicating with the GraphQL API.

The [GraphQL](http://graphql.org/) api is written in [Node](https://nodejs.org/)(JavaScript). Authentication is handled by [Auth0](https://auth0.com/). The api is deployed to [AWS Lambda](https://aws.amazon.com/lambda/) and [AWS API Gateway](https://aws.amazon.com/api-gateway/) using [Serverless](https://serverless.com/).

The front-end and the api are written in ES6, transpiled using [babel](https://babeljs.io/), bundled using [Webpack](https://webpack.github.io/) and follow [Airbnb's JavaScript style guide](https://github.com/airbnb/javascript) with a few small exceptions.

The app is tested and deployed using [GitLab CI](https://about.gitlab.com/gitlab-ci/). On all branches the tests are run with [Jest](https://facebook.github.io/jest/), the coverage is uploaded to [Codecov](https://codecov.io/) and the code is linted with [ESLint](http://eslint.org/). On master, the front-end is also deployed to a [staging environment](https://staging.oak.mitchellhamilton.me/) after the tests and linting pass, the front-end and the api can also be deployed to [production](https://oak.mitchellhamilton.me/) by starting their jobs manually.

## npm scripts

* ```npm start``` starts the front-end development server
* ```npm run start:prod``` starts the front-end development server with the production api
* ```npm run build``` packages the front-end, ready for deployment
* ```npm test``` runs the jest tests once
* ```npm run test:watch``` watches for changes to files and runs affected tests
* ```npm run deploy:web:staging``` deploys the front-end to the [staging environment](https://staging.oak.mitchellhamilton.me/), this requires the ```NETLIFY_TOKEN``` environment variable to be set with a valid [Netlify](https://www.netlify.com/) Personal Access Token and should **not** be run locally
* ```npm run deploy:web:prod``` deploys the front-end to the [production environment](https://oak.mitchellhamilton.me/), this requires the ```NETLIFY_TOKEN``` environment variable to be set with a valid [Netlify](https://www.netlify.com/) Personal Access Token and should **not** be run locally
* ```npm run coverage``` runs the tests once and generates a coverage report
* ```npm run codecov``` runs the tests once, generates a coverage report and uploads the report to [Codecov](https://codecov.io/), this should **not** be run locally
